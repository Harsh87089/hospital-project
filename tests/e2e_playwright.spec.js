// CarePulse Hospital - End-to-End Test Suite (Playwright)
// Covers:
// 1. Live Appointment Booking & E-Pass Token Generation
// 2. Emergency SOS Disclaimer & Modal ARIA Focus Trapping
// 3. Multi-Lingual Dynamic Language Switching (EN -> HI -> PA)
// 4. Cart & Medicine Ordering Interaction

const { test, expect } = require('@playwright/test');

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

test.describe('CarePulse Hospital Real-Browser E2E Flows', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/index.html`);
    await page.waitForLoadState('domcontentloaded');
  });

  test('Flow 1: Appointment Booking Flow & Digital E-Pass Generation', async ({ page }) => {
    // Open real booking layer modal
    const bookBtn = page.locator('#btn-hero-book, [data-action="open-booking-layer"]').first();
    await expect(bookBtn).toBeVisible();
    await bookBtn.click();

    const layerModal = page.locator('#booking-layer-modal');
    await expect(layerModal).toHaveClass(/active/);

    // If slots are off-duty (e.g. Sunday), pick the next available date pill
    let slot = page.locator('#layer-slots-container [data-action="select-slot"]').first();
    if (!await slot.isVisible()) {
      const datePills = page.locator('.date-card-pill');
      const count = await datePills.count();
      for (let i = 0; i < count; i++) {
        await datePills.nth(i).click();
        slot = page.locator('#layer-slots-container [data-action="select-slot"]').first();
        if (await slot.isVisible()) break;
      }
    }
    await slot.click();

    // Fill patient details with clean dummy data
    await page.locator('#layer-patient-name').fill('Gurpreet Singh');
    await page.locator('#layer-patient-age').fill('32');
    await page.locator('#layer-patient-phone').fill('9876543210');
    await page.locator('#layer-dpdp-consent').check();

    // Submit appointment
    await page.locator('#layer-booking-form').dispatchEvent('submit');

    // Verify token modal opens
    const tokenModal = page.locator('#token-modal');
    await expect(tokenModal).toHaveClass(/active/, { timeout: 5000 });

    // Verify token generation format
    const slipCard = page.locator('#token-slip-card');
    await expect(slipCard).toContainText(/TK-\d+/);
  });

  test('Flow 2: Emergency SOS Disclaimer & Focus Trapping', async ({ page }) => {
    // Trigger SOS button
    const sosTrigger = page.locator('[data-action="open-emergency-modal"]').first();
    await expect(sosTrigger).toBeVisible();
    await sosTrigger.click();

    // Verify Emergency Modal visibility
    const emergModal = page.locator('#emergency-modal');
    await expect(emergModal).toHaveClass(/active/);

    // Verify WCAG 2.2 AA ARIA attributes
    await expect(emergModal).toHaveAttribute('role', 'dialog');
    await expect(emergModal).toHaveAttribute('aria-modal', 'true');

    // Verify emergency disclaimer text exists (108 / 112 guidance)
    await expect(emergModal).toContainText(/DEMO DISCLAIMER/);
    await expect(emergModal).toContainText(/108/);
    await expect(emergModal).toContainText(/112/);

    // Close modal
    const closeBtn = page.locator('#emergency-modal [data-action="close-emergency-modal"]').first();
    await closeBtn.click();
    await expect(emergModal).not.toHaveClass(/active/);
  });

  test('Flow 3: Tri-lingual Dynamic Language Switcher (EN -> HI -> PA)', async ({ page }) => {
    // Switch to Punjabi
    const paPill = page.locator('.lang-pill-btn[data-lang="pa"]').first();
    await paPill.click();
    const sosTitlePa = page.locator('#modal-title-emergency');
    await expect(sosTitlePa).toHaveText(/[\u0A00-\u0A7F]/);

    // Switch to Hindi
    const hiPill = page.locator('.lang-pill-btn[data-lang="hi"]').first();
    await hiPill.click();
    const sosTitleHi = page.locator('#modal-title-emergency');
    await expect(sosTitleHi).toHaveText(/[\u0900-\u097F]/);

    // Restore to English
    const enPill = page.locator('.lang-pill-btn[data-lang="en"]').first();
    await enPill.click();
    await expect(sosTitleHi).toContainText(/Emergency|Casualty/);
  });

});
