# CarePulse Multi-Specialty Hospital & Research Institute

> **Demonstration Web Portal Prototype & Live OPD Queue Management System**  
> Flagship Campus: GT Road, Near Sugar Mill Crossing, Model Town, Phagwara, Punjab - 144401.

---

## 1. Project Overview

CarePulse is a modern, high-performance, client-side healthcare web portal prototype. It provides interactive patient appointment scheduling, real-time simulated OPD queue token generation, downloadable digital E-Passes, 24/7 emergency trauma guidance, trilingual localization (English, Hindi, Punjabi), and DPDP Act 2023 privacy controls.

---

## 2. Technical Architecture & Dependencies

* **Frontend Architecture**: Pure Vanilla JavaScript (Modern ES2022 Modules via 19 modular files in `js/` with an automated fallback bundle in `app.js`).
* **Design & Styling**: Modular Vanilla CSS3 design system organized across `css/base.css`, `css/components.css`, `css/modals.css`, `css/themes.css`, and `css/fonts.css`.
* **Zero Framework & Heavy Runtime Dependencies**:
  * **No Frontend Frameworks**: Zero React, Angular, Vue, or TailwindCSS.
  * **Native Canvas 2D Pass Rendering**: Digital appointment E-Passes and QR/barcode tokens are generated entirely client-side using the browser's native **HTML5 Canvas 2D API** (`document.createElement('canvas')`) with `window.print()` — eliminating third-party PDF or rasterization libraries like jsPDF or html2canvas.
  * **Native SVGs & Typography**: All iconography is rendered via lightweight inline SVG paths and system emojis (no heavy icon font stylesheets).
* **External Integration Endpoints (Allowlisted via CSP)**:
  * **EmailJS SDK**: Client-side demo notification dispatching (`https://cdn.jsdelivr.net`, `https://api.emailjs.com`).
  * **Firebase Compat SDK**: Optional cloud authentication/state demonstration (`https://www.gstatic.com`, `https://identitytoolkit.googleapis.com`).
  * **Unsplash CDN**: Hospital environment and staff sample photography (`https://images.unsplash.com`).
  * **QRServer API**: Optional fallback QR code endpoint (`https://api.qrserver.com`); primary QR codes are generated directly in-memory via client-side Canvas. All QR payloads consist strictly of opaque tracking and appointment reference IDs (`?track=...&ref=...`) with zero personal health information (PHI).

---

## 3. Security Architecture & Content Security Policy (CSP)

CarePulse deploys security headers configured via [`vercel.json`](vercel.json):

* **Strict Script Execution Policy**: The `script-src` directive strictly permits only `'self'` and explicitly trusted CDNs (`https://cdn.jsdelivr.net`, `https://www.gstatic.com`). It strictly disallows `'unsafe-inline'` and `'unsafe-eval'`. All inline HTML event handlers (`onclick=...`) have been migrated to decoupled `data-action` listeners.
* **Style Policy**: `style-src` permits `'self'`, Google Fonts, and `'unsafe-inline'` to support dynamic CSSOM DOM style manipulation (e.g. modal visibility toggles, dynamic theme transitions, progress bars).
* **Network & Image Domain Lockdown**:
  * `img-src`: Strictly confined to `'self'`, `data:`, `blob:`, `https://images.unsplash.com`, and `https://api.qrserver.com`.
  * `connect-src`: Strictly pinned to `'self'`, `https://api.emailjs.com`, `https://identitytoolkit.googleapis.com`, `https://securetoken.googleapis.com`, and `https://*.firebaseio.com`.
* **Defensive Headers**: Includes `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy: strict-origin-when-cross-origin`, and `Permissions-Policy: camera=(self), microphone=(self), geolocation=()`.
* **Privacy Controls (DPDP Act 2023)**: User consent checkbox on booking and a dedicated one-click user data purge function (`clearAllDemoData()`) that purges all tracked local storage keys.

---

## 4. Accessibility Statement (WCAG 2.2 AA Foundation)

The platform implements core WCAG 2.2 AA accessibility foundations:
* **Modal Dialog Semantics**: All 28 modals enforce `role="dialog"`, `aria-modal="true"`, and `aria-labelledby`.
* **Keyboard Navigation**: Automated keyboard focus trapping (cycling `Tab` / `Shift+Tab`) inside open modal dialogs, with global `Escape` key dismissal.
* **Touch Targets**: Minimum 44×44px interactive touch targets across mobile bottom dock navigation and buttons.
* **Motion Sensitivity**: `@media (prefers-reduced-motion: reduce)` rules disable decorative keyframe animations and transforms for users with vestibular sensitivity.
* *Note on Compliance*: Automated tests verify structural ARIA markup, keyboard listeners, and CSS media queries. Full WCAG 2.2 AA certification additionally requires independent manual assistive technology (screen-reader) verification.

---

## 5. Offline Progressive Web App (PWA)

* **Web App Manifest**: Full PWA manifest at [`manifest.json`](manifest.json) configured with standalone display, theme colors, and icons.
* **Service Worker Engine**: Offline asset caching engine at [`sw.js`](sw.js) declaring **39 precached assets** for instantaneous offline availability:
  * HTML shells (`./index.html`, `./hospital.html`) and manifests (`./manifest.json`, `./styles.css`).
  * 5 CSS stylesheets and 6 essential offline font files (Noto Sans Devanagari & Gurmukhi 400/600/700w).
  * 18 core ES JavaScript modules, `app.js` fallback bundle, and vector/raster PWA icons.
  * (Additional non-blocking fonts and modules are cached dynamically on first use).

---

## 6. Local Setup & Testing Guide

### Prerequisites
* Python 3.10+ (standard library only; no pip dependencies required for tests).
* Google Chrome or Microsoft Edge (installed in default location for real-browser E2E testing).

### Running Locally
To launch the local HTTP server, run in the project root:
```bash
python -m http.server 3000
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

> **Important**: The CLI deep validation suite automatically spins up a background HTTP server thread if port 3000 is not already running, making the test suite completely self-contained and automated.

---

### Running the Test Suites

#### 1. Unit & Functional Test Suite (26 Tests)
Validates core configuration, sanitization, DPDP compliance, CSP configuration, V8 syntax parsing, and appointment booking logic:
```bash
python -m unittest discover -s tests
```

#### 2. Deep CLI Verification Suite (104 Checks)
Tests live HTTP endpoints, asset references on disk, service worker precaching, DOM ID uniqueness, trilingual key completeness, and HTML mirror parity:
```bash
python tests/cli_deep_validation.py
```

#### 3. Real-Browser End-to-End Test Suite (Headless Chrome / Edge)
Launches real headless Google Chrome or Microsoft Edge to execute actual in-browser user flows (Emergency SOS disclaimer modal, language switching, and appointment booking):
```bash
python tests/test_browser_e2e.py
```

#### 4. Playwright Specification
For CI/CD environments running Playwright:
```bash
# Optional: if Playwright is installed
npx playwright test tests/e2e_playwright.spec.js
```

---

## 7. Mirror Parity Architecture

The project maintains two synchronized entry points: [`index.html`](index.html) and [`hospital.html`](hospital.html). Both files are bit-for-bit SHA-256 identical, verified automatically in every test run.
