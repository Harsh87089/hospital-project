// tests/e2e_real_page.spec.js
//
// Drives the REAL served index.html (no hand-written fixture DOM) and asserts on
// what the app itself does. Every app-specific locator lives in SEL below, so if
// the markup differs from what these assume, fix it in one place.
//
// Run:  npm i -D @playwright/test @axe-core/playwright
//       npx playwright install chromium
//       npx playwright test
//
// NOTE: written without access to the page's raw HTML. Locators are based on the
// visible labels/text on the live site. Expect to adjust SEL on the first run.

const { test, expect } = require('@playwright/test');

const FAKE = { name: 'Test Patient', phone: '9000000000', age: '30', place: 'Test Town' };
const DEVANAGARI = /[\u0900-\u097F]/;
const GURMUKHI = /[\u0A00-\u0A7F]/;

const SEL = {
  openDialogs: '[role="dialog"]:visible',
  emergencyTrigger: (page) => page.locator('button:visible', { hasText: /Emergency SOS/i }).first(),
  bookTrigger: (page) =>
    page.locator('button:visible, a:visible', { hasText: /Book (Doctor Slot|OPD Consultation)/ }).first(),
  bookingDialog: (page) => page.locator(SEL.openDialogs).filter({ hasText: 'Patient Details' }),
  timeSlot: (scope) =>
    scope.locator('button:not([disabled])', { hasText: /^\s*\d{1,2}:\d{2}\s*(AM|PM)/i }).first(),
  tokenDialog: (page) => page.locator(SEL.openDialogs).filter({ hasText: /TK-\d+/ }),
  langButton: (page, label) => page.locator('button:visible', { hasText: label }).first(),
  privacyLink: (page) => page.getByRole('link', { name: /DPDP Privacy Policy/ }).first(),
  eraseButton: (page) => page.getByRole('button', { name: /Erase All Stored Demo Data/ }),
};

test.use({ serviceWorkers: 'block' }); // keep runs deterministic; SW is covered separately

const dialogs = (page) => page.locator(SEL.openDialogs);
const storedAppointments = (page) =>
  page.evaluate(() => JSON.parse(localStorage.getItem('carepulse_appointments') || '[]'));

async function load(page) {
  await page.goto('/index.html');
  await page.waitForLoadState('load');
  // If the demo sign-in dialog is showing, dismiss it the way a user would.
  if (await dialogs(page).filter({ hasText: 'Patient Sign-In' }).count()) {
    await page.keyboard.press('Escape');
  }
}

const countScript = (page, re) =>
  page.evaluate(
    (src) => {
      const rx = new RegExp(src);
      return [...document.querySelectorAll('[data-i18n]')].filter((e) => rx.test(e.textContent)).length;
    },
    re.source
  );

// ---------------------------------------------------------------------------
// 1. The page actually runs: no uncaught JS errors, no CSP violations.
//    (This is the test that would have caught the app.js syntax errors.)
// ---------------------------------------------------------------------------
test('loads with no uncaught JS errors and no CSP violations', async ({ page }) => {
  const hard = [];
  const soft = [];
  page.on('pageerror', (e) => hard.push(`pageerror: ${e.message}`));
  page.on('console', (m) => {
    if (m.type() !== 'error') return;
    const text = m.text();
    (/Content Security Policy|Refused to/i.test(text) ? hard : soft).push(`console: ${text}`);
  });

  await load(page);
  await page.waitForLoadState('networkidle');

  if (soft.length) {
    test.info().annotations.push({ type: 'other console errors', description: soft.join(' | ') });
  }
  expect(hard, hard.join('\n')).toEqual([]);
});

// ---------------------------------------------------------------------------
// 2. Emergency modal: real disclaimer, ARIA, focus trap, Esc, focus restore.
// ---------------------------------------------------------------------------
test('Emergency SOS: demo disclaimer, focus trap, Esc closes, focus restored', async ({ page }) => {
  await load(page);
  const trigger = SEL.emergencyTrigger(page);
  await trigger.click();

  const dlg = dialogs(page).first();
  await expect(dlg).toBeVisible();
  await expect(dlg).toContainText(/DEMO/);
  await expect(dlg).toContainText('108');
  await expect(dlg).toContainText('112');
  await expect(dlg).toHaveAttribute('aria-modal', 'true');

  const labelledBy = await dlg.getAttribute('aria-labelledby');
  expect(labelledBy, 'dialog needs aria-labelledby').toBeTruthy();
  await expect(page.locator('#' + labelledBy)).not.toBeEmpty();

  for (let i = 1; i <= 25; i++) {
    await page.keyboard.press('Tab');
    const inside = await dlg.evaluate((el) => el.contains(document.activeElement));
    expect(inside, `focus left the dialog on Tab #${i}`).toBe(true);
  }

  await page.keyboard.press('Escape');
  await expect(dialogs(page)).toHaveCount(0);
  await expect(trigger).toBeFocused();
});

// ---------------------------------------------------------------------------
// 3. Language switching translates the real DOM and persists across reload.
// ---------------------------------------------------------------------------
test('language switch translates data-i18n nodes and persists after reload', async ({ page }) => {
  await load(page);
  const baseDeva = await countScript(page, DEVANAGARI);
  const baseGurm = await countScript(page, GURMUKHI);

  await SEL.langButton(page, 'हिन्दी').click();
  expect(await countScript(page, DEVANAGARI)).toBeGreaterThan(baseDeva);

  await SEL.langButton(page, 'ਪੰਜਾਬੀ').click();
  expect(await countScript(page, GURMUKHI)).toBeGreaterThan(baseGurm);
  expect(await countScript(page, DEVANAGARI)).toBe(baseDeva); // Hindi text is gone

  await page.reload();
  expect(await page.evaluate(() => localStorage.getItem('carepulse_lang'))).toBe('pa');
  expect(await countScript(page, GURMUKHI)).toBeGreaterThan(baseGurm);

  await SEL.langButton(page, /^EN$/).click();
  expect(await countScript(page, GURMUKHI)).toBe(baseGurm);
});

// ---------------------------------------------------------------------------
// 4. Booking through the real form, plus a privacy check: nothing the patient
//    typed may appear in any request that leaves the origin (URL or body).
// ---------------------------------------------------------------------------
test('booking: bad phone rejected, valid booking stores a token, no PII sent off-site', async ({
  page,
  baseURL,
}) => {
  const origin = new URL(baseURL).origin;
  const external = [];
  page.on('request', (r) => {
    const u = r.url();
    if (u.startsWith(origin) || u.startsWith('data:') || u.startsWith('blob:')) return;
    external.push({ url: u, body: r.postData() || '' });
  });

  await load(page);
  await SEL.bookTrigger(page).click();
  const form = SEL.bookingDialog(page);
  await expect(form).toBeVisible();

  await SEL.timeSlot(form).click();
  await form.getByLabel(/Patient Full Name/).fill(FAKE.name);
  await form.getByLabel(/Age \(Years\)/).fill(FAKE.age);
  await form.getByLabel(/Gender/).selectOption({ label: 'Male' });
  await form.getByLabel(/Place \/ Locality/).fill(FAKE.place);
  await form.getByLabel(/Mobile Number/).fill('12345'); // invalid on purpose
  await form.getByLabel(/I consent to CarePulse/).check();
  await form.getByRole('button', { name: /Confirm Appointment/ }).click();

  expect(await storedAppointments(page), 'invalid phone must not create a booking').toHaveLength(0);
  await expect(SEL.tokenDialog(page)).toHaveCount(0);

  await form.getByLabel(/Mobile Number/).fill(FAKE.phone);
  await form.getByRole('button', { name: /Confirm Appointment/ }).click();

  const pass = SEL.tokenDialog(page);
  await expect(pass).toBeVisible();
  await expect(pass).toContainText(FAKE.name);

  const saved = await storedAppointments(page);
  expect(saved).toHaveLength(1);
  expect(JSON.stringify(saved[0])).toContain(FAKE.name);

  await page.waitForLoadState('networkidle'); // let QR/image requests finish
  const needles = [FAKE.name, encodeURIComponent(FAKE.name), FAKE.name.replace(/ /g, '+'), FAKE.phone];
  const leaks = external.filter((r) => needles.some((n) => (r.url + r.body).includes(n)));
  test.info().annotations.push({
    type: 'external hosts contacted',
    description: [...new Set(external.map((r) => new URL(r.url).host))].join(', ') || '(none)',
  });
  expect(leaks, JSON.stringify(leaks, null, 2)).toEqual([]);
});

// ---------------------------------------------------------------------------
// 5. DPDP erase button really clears every carepulse_* key.
// ---------------------------------------------------------------------------
test('DPDP erase removes all carepulse_* keys from local and session storage', async ({ page }) => {
  page.on('dialog', (d) => d.accept()); // in case the app uses confirm()
  await load(page);
  await page.evaluate(() => {
    localStorage.setItem('carepulse_appointments', '[{"id":"TK-1"}]');
    localStorage.setItem('carepulse_lang', 'hi');
    sessionStorage.setItem('carepulse_auth_user', '{"name":"x"}');
  });

  await SEL.privacyLink(page).click();
  await SEL.eraseButton(page).click();

  const left = await page.evaluate(() => [
    ...Object.keys(localStorage).filter((k) => k.startsWith('carepulse_')),
    ...Object.keys(sessionStorage).filter((k) => k.startsWith('carepulse_')),
  ]);
  expect(left).toEqual([]);
});

// ---------------------------------------------------------------------------
// 6. Optional real accessibility scan (home page only). Skips if axe missing.
// ---------------------------------------------------------------------------
test('axe: no serious or critical WCAG A/AA violations on the home page', async ({ page }) => {
  let AxeBuilder;
  try {
    ({ AxeBuilder } = require('@axe-core/playwright'));
  } catch {
    test.skip(true, 'npm i -D @axe-core/playwright to enable this test');
  }
  await load(page);
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
    .analyze();
  const bad = results.violations
    .filter((v) => ['serious', 'critical'].includes(v.impact))
    .map((v) => `${v.id} (${v.impact}): ${v.nodes.length} node(s)`);
  expect(bad).toEqual([]);
});
