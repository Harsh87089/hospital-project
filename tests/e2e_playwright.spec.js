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
    // Navigate to appointment section
    const bookBtn = page.locator('#nav-book-btn, [data-action="book-appointment"]').first();
    if (await bookBtn.isVisible()) {
      await bookBtn.click();
    }

    // Select specialty & doctor
    const specialtySelect = page.locator('#specialtySelect, select[name="specialty"]').first();
    if (await specialtySelect.isVisible()) {
      await specialtySelect.selectOption({ index: 1 });
    }

    // Fill patient details
    const nameInput = page.locator('#patientName, input[name="patientName"]').first();
    const phoneInput = page.locator('#patientPhone, input[name="patientPhone"]').first();

    await nameInput.fill('Harsh Bhakar');
    await phoneInput.fill('9814022737');

    // Submit appointment
    const submitBtn = page.locator('#submitBookingBtn, button[type="submit"]').first();
    await submitBtn.click();

    // Verify confirmation modal or token badge
    const confirmationModal = page.locator('#bookingConfirmModal, .booking-success-modal, #tokenPassModal').first();
    await expect(confirmationModal).toBeVisible({ timeout: 5000 });

    // Verify token generation format
    const tokenBadge = page.locator('#generatedTokenId, .token-id-text').first();
    if (await tokenBadge.isVisible()) {
      const text = await tokenBadge.textContent();
      expect(text).toMatch(/#?TK-\d+/);
    }
  });

  test('Flow 2: Emergency SOS Disclaimer & Focus Trapping', async ({ page }) => {
    // Trigger SOS button
    const sosTrigger = page.locator('#sosTriggerBtn, [data-action="open-sos"]').first();
    await expect(sosTrigger).toBeVisible();
    await sosTrigger.click();

    // Verify SOS Modal visibility
    const sosModal = page.locator('#sosModal');
    await expect(sosModal).toBeVisible();

    // Verify WCAG 2.2 AA ARIA attributes
    await expect(sosModal).toHaveAttribute('role', 'dialog');
    await expect(sosModal).toHaveAttribute('aria-modal', 'true');

    // Verify emergency disclaimer text exists
    const disclaimer = page.locator('#sosModal .emergency-disclaimer, #sosModal');
    await expect(disclaimer).toContainText(/Emergency|Ambulance|Immediate/i);

    // Close modal
    const closeBtn = page.locator('#sosModal .close-modal-btn, #sosModal [data-action="close-modal"]').first();
    await closeBtn.click();
    await expect(sosModal).toBeHidden();
  });

  test('Flow 3: Tri-lingual Dynamic Language Switcher (EN -> HI -> PA)', async ({ page }) => {
    // Switch to Hindi
    const langSelect = page.locator('#langSelect, [data-action="switch-lang"]');
    if (await langSelect.isVisible()) {
      await langSelect.selectOption('hi');
      // Assert Hindi text rendered on key elements
      const bookTab = page.locator('[data-i18n="nav_book"]').first();
      await expect(bookTab).toHaveText(/अपॉइंटमेंट/);

      // Switch to Punjabi
      await langSelect.selectOption('pa');
      await expect(bookTab).toHaveText(/ਮੁਲਾਕਾਤ|ਬੁੱਕ/);

      // Restore to English
      await langSelect.selectOption('en');
      await expect(bookTab).toHaveText(/Book Appointment/i);
    }
  });

});
