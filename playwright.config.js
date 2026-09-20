// playwright.config.js
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  testMatch: /e2e_real_page\.spec\.js/,
  retries: 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  webServer: {
    command: 'python -m http.server 3000',
    url: 'http://localhost:3000/index.html',
    reuseExistingServer: true,
  },
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'retain-on-failure',
  },
  // Desktop only for now: the mobile layout swaps the sidebar for a 4-item dock,
  // so add a mobile project once the desktop locators are stable.
  projects: [{ name: 'desktop-chrome', use: { ...devices['Desktop Chrome'] } }],
});
