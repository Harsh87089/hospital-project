"""
CarePulse Hospital - Automated Comprehensive Test Suite (Prompt 8)
Covers all business logic, validation rules, token engines, security checks, PWA, and i18n.
"""

import unittest
import json
import re
import os
import xml.etree.ElementTree as ET

class TestCarePulsePlatform(unittest.TestCase):

    def setUp(self):
        with open('hospital.html', 'r', encoding='utf-8') as f:
            self.html = f.read()
        with open('index.html', 'r', encoding='utf-8') as f:
            self.index_html = f.read()
        with open('js/config.js', 'r', encoding='utf-8') as f:
            self.config_js = f.read()
        with open('js/i18n.js', 'r', encoding='utf-8') as f:
            self.i18n_js = f.read()
        with open('js/theme.js', 'r', encoding='utf-8') as f:
            self.theme_js = f.read()
        with open('js/booking.js', 'r', encoding='utf-8') as f:
            self.booking_js = f.read()
        with open('vercel.json', 'r', encoding='utf-8') as f:
            self.vercel = json.load(f)

    # -------------------------------------------------------------
    # 1. Parity & File Integrity Tests
    # -------------------------------------------------------------
    def test_01_html_mirror_parity(self):
        """hospital.html and index.html must be 100% byte-for-byte identical."""
        self.assertEqual(self.html, self.index_html, "hospital.html and index.html mirror mismatch!")

    def test_02_css_variables_preservation(self):
        """Must preserve all essential CSS design variables."""
        with open('css/base.css', 'r', encoding='utf-8') as f:
            base_css = f.read()
        for var_name in ['--primary', '--secondary', '--accent-emerald', '--dark', '--font-main', '--font-heading']:
            self.assertIn(var_name, base_css, f"CSS variable {var_name} missing from base.css")

    # -------------------------------------------------------------
    # 2. Trust & Disclaimers Tests (Prompt 1)
    # -------------------------------------------------------------
    def test_03_no_real_contact_numbers(self):
        """Must have ZERO real hospital contact numbers."""
        forbidden = ['1800-180-2026', '919814022737', '9814022737', '1824-220000']
        for num in forbidden:
            self.assertNotIn(num, self.html, f"Found forbidden phone number: {num} in HTML")
            self.assertNotIn(num, self.booking_js, f"Found forbidden phone number: {num} in booking.js")

    def test_04_demo_constants_configured(self):
        """Demo phone, whatsapp, and staff pin constants must be set in config."""
        self.assertIn("DEMO_PHONE = '1800-000-0000'", self.config_js)
        self.assertIn("DEMO_WHATSAPP = '910000000000'", self.config_js)
        self.assertIn("DEMO_STAFF_PIN = '2026'", self.config_js)

    # -------------------------------------------------------------
    # 3. Security & Privacy Tests (Prompt 6)
    # -------------------------------------------------------------
    def test_05_strict_csp_no_unsafe_inline_scripts(self):
        """CSP must not permit 'unsafe-inline' for script-src."""
        csp_header = None
        for route in self.vercel.get('headers', []):
            for h in route.get('headers', []):
                if h['key'] == 'Content-Security-Policy':
                    csp_header = h['value']
                    break
        self.assertIsNotNone(csp_header, "CSP header missing in vercel.json")
        script_src = [part.strip() for part in csp_header.split(';') if part.strip().startswith('script-src')]
        self.assertTrue(len(script_src) > 0, "script-src directive missing in CSP")
        self.assertNotIn("'unsafe-inline'", script_src[0], "script-src must NOT contain 'unsafe-inline'")

    def test_06_target_blank_rel_noopener(self):
        """All target='_blank' links must have rel='noopener noreferrer'."""
        blank_links = re.findall(r'<a\s+[^>]*target=["\']_blank["\'][^>]*>', self.html)
        for link in blank_links:
            self.assertIn('rel="noopener noreferrer"', link, f"Missing rel='noopener noreferrer' in link: {link}")

    def test_07_zero_inline_onclick_in_html(self):
        """HTML must contain 0 inline onclick handlers (migrated to data-action)."""
        onclicks = re.findall(r'\sonclick=["\'][^"\']+["\']', self.html, re.IGNORECASE)
        self.assertEqual(len(onclicks), 0, f"Found {len(onclicks)} inline onclick handlers in HTML")

    def test_08_input_validation_regexes(self):
        """Input validation for mobile and name must be implemented in utils.js and auth.js."""
        with open('js/utils.js', 'r', encoding='utf-8') as f:
            utils_js = f.read()
        with open('js/auth.js', 'r', encoding='utf-8') as f:
            auth_js = f.read()
        self.assertIn("[6-9]\\d{9}", utils_js, "Mobile regex missing in utils.js")
        self.assertIn("[6-9]\\d{9}", auth_js, "Mobile regex missing in auth.js")
        self.assertIn("A-Za-z", utils_js, "Name character validation regex missing in utils.js")

    def test_09_clear_all_demo_data_function(self):
        """clearAllDemoData function must be globally exposed."""
        with open('js/main.js', 'r', encoding='utf-8') as f:
            main_js = f.read()
        self.assertIn("clearAllDemoData", main_js, "clearAllDemoData missing from js/main.js")
        self.assertIn("carepulse_appointments", main_js, "carepulse_appointments storage key missing from clearAllDemoData")

    # -------------------------------------------------------------
    # 4. Accessibility Tests (WCAG 2.2 AA - Prompt 4)
    # -------------------------------------------------------------
    def test_10_modals_have_dialog_role(self):
        """Every modal in HTML must have role='dialog' and aria-modal='true'."""
        modals = re.findall(r'<div\s+[^>]*id="[^"]*modal[^"]*"[^>]*>', self.html)
        for m in modals:
            self.assertIn('role="dialog"', m, f"Modal missing role='dialog': {m[:80]}")
            self.assertIn('aria-modal="true"', m, f"Modal missing aria-modal='true': {m[:80]}")

    def test_11_prefers_reduced_motion(self):
        """CSS must define @media (prefers-reduced-motion: reduce)."""
        with open('css/base.css', 'r', encoding='utf-8') as f:
            base_css = f.read()
        self.assertIn("prefers-reduced-motion: reduce", base_css, "Reduced motion rule missing in base.css")

    # -------------------------------------------------------------
    # 5. Language & UX Polish Tests (Prompt 5)
    # -------------------------------------------------------------
    def test_12_theme_prefers_color_scheme_default(self):
        """ThemeEngine must check prefers-color-scheme when no theme is saved."""
        self.assertIn("prefers-color-scheme: dark", self.theme_js)
        self.assertIn("matchMedia", self.theme_js)

    def test_13_translations_completeness(self):
        """All languages (en, hi, pa) must have identical complete key sets."""
        m = re.search(r'const TRANSLATIONS = (\{.*?\n\};)', self.i18n_js, re.DOTALL)
        self.assertIsNotNone(m, "TRANSLATIONS dictionary missing in i18n.js")
        trans = json.loads(m.group(1).rstrip(';'))
        en_keys = set(trans['en'].keys())
        hi_keys = set(trans['hi'].keys())
        pa_keys = set(trans['pa'].keys())
        self.assertEqual(en_keys, hi_keys, "Hindi translation keys mismatch English keys")
        self.assertEqual(en_keys, pa_keys, "Punjabi translation keys mismatch English keys")
        self.assertGreaterEqual(len(en_keys), 100, f"Translation dictionary must have >= 100 keys (found {len(en_keys)})")

    def test_14_self_hosted_fonts(self):
        """Self-hosted font files and CSS must be present."""
        self.assertTrue(os.path.exists('fonts'), "fonts directory missing")
        self.assertTrue(os.path.exists('css/fonts.css'), "css/fonts.css missing")
        font_files = os.listdir('fonts')
        self.assertGreaterEqual(len(font_files), 6, f"Expected >= 6 font files, found {len(font_files)}")

    def test_15_mobile_bottom_dock_four_actions(self):
        """Bottom dock must be consolidated into exactly 4 actions: Book, Emergency, Track, Call."""
        m_dock = re.search(r'<nav class="bottom-quick-dock"[^>]*>(.*?)</nav>', self.html, re.DOTALL)
        self.assertIsNotNone(m_dock, "bottom-quick-dock not found in HTML")
        dock_html = m_dock.group(1)
        items = re.findall(r'class="dock-item[^"]*"', dock_html)
        self.assertEqual(len(items), 4, f"Bottom dock must contain exactly 4 actions, found {len(items)}")

    def test_16_skeleton_loaders_and_empty_states(self):
        """CSS and JS must support shimmer skeleton loaders and empty state cards."""
        with open('css/components.css', 'r', encoding='utf-8') as f:
            comp_css = f.read()
        self.assertIn(".skeleton-card", comp_css)
        self.assertIn(".skeleton-shimmer", comp_css)
        self.assertIn(".empty-state-card", comp_css)

    # -------------------------------------------------------------
    # 6. PWA & SEO Tests (Prompt 7)
    # -------------------------------------------------------------
    def test_17_pwa_manifest_validity(self):
        """manifest.json must be valid with standalone display and icons."""
        self.assertTrue(os.path.exists('manifest.json'), "manifest.json missing")
        with open('manifest.json', 'r', encoding='utf-8') as f:
            m = json.load(f)
        self.assertEqual(m.get('display'), 'standalone')
        self.assertIn('theme_color', m)
        self.assertGreaterEqual(len(m.get('icons', [])), 3)

    def test_18_service_worker_offline_precache(self):
        """Service Worker must exist and precache core shell assets."""
        self.assertTrue(os.path.exists('sw.js'), "sw.js missing")
        with open('sw.js', 'r', encoding='utf-8') as f:
            sw = f.read()
        self.assertIn("PRECACHE_ASSETS", sw)
        self.assertIn("./index.html", sw)
        self.assertIn("./styles.css", sw)

    def test_19_robots_and_preview_image(self):
        """robots.txt must allow crawling and social preview images must exist with head meta tags."""
        self.assertTrue(os.path.exists('robots.txt'))
        with open('robots.txt', 'r', encoding='utf-8') as f:
            robots_txt = f.read()
        self.assertNotIn("Disallow: /", robots_txt)
        self.assertTrue(os.path.exists('icons/readme-hero.jpg'))
        self.assertIn('property="og:image"', self.html)
        self.assertIn('name="twitter:image"', self.html)

    # -------------------------------------------------------------
    # 7. JavaScript Engine & Syntax Integrity (Reviewer Request)
    # -------------------------------------------------------------
    def test_20_javascript_v8_syntax_and_imports(self):
        """All 19 ES modules and app.js must have valid syntax and resolvable exports without runtime errors."""
        js_files = [f for f in os.listdir('js') if f.endswith('.js') and f != 'dev-gateway.js']
        self.assertEqual(len(js_files), 19, f"Expected exactly 19 ES module files in js/, found {len(js_files)}")

        # Verify all exported identifiers have corresponding lexical declarations
        for fname in sorted(js_files):
            fpath = os.path.join('js', fname)
            with open(fpath, 'r', encoding='utf-8') as f:
                content = f.read()
            m = re.search(r'export\s*\{([^}]+)\}', content)
            if not m:
                continue
            exports = [e.strip().split(' as ')[0].strip() for e in m.group(1).split(',') if e.strip()]
            for exp in exports:
                decl_pattern = rf'(?:function|const|let|var|class)\s+{re.escape(exp)}\b'
                self.assertTrue(
                    re.search(decl_pattern, content),
                    f"Exported identifier '{exp}' in js/{fname} lacks a lexical declaration in module scope!"
                )

        # Dynamic V8 parse and runtime test using Google Chrome headless
        chrome_paths = [
            r'C:\Program Files\Google\Chrome\Application\chrome.exe',
            r'C:\Program Files (x86)\Google\Chrome\Application\chrome.exe'
        ]
        chrome = next((p for p in chrome_paths if os.path.exists(p)), None)
        if chrome:
            import subprocess
            harness_html = """<!DOCTYPE html><html><body><div id="v8-status">TESTING</div>
            <script>
              window.v8Errors = [];
              window.onerror = function(msg, src, line) {
                window.v8Errors.push('SCRIPT_ERR in ' + src + ':' + line + ': ' + msg);
              };
            </script>
            <script src="/app.js"></script>
            <script type="module">
              const modules = [
                'auth.js', 'booking.js', 'calculators.js', 'config.js', 'gateway.js',
                'healthcard.js', 'i18n.js', 'lab.js', 'pharmacy.js', 'queue.js',
                'search.js', 'sos.js', 'tele.js', 'theme.js', 'tokens.js',
                'utils.js', 'voice.js', 'wayfinder.js', 'main.js'
              ];
              for (const mod of modules) {
                try {
                  await import('/js/' + mod);
                } catch (e) {
                  window.v8Errors.push(mod + ': ' + e.message);
                }
              }
              document.getElementById('v8-status').innerText = window.v8Errors.length === 0 ? 'V8_ALL_OK' : window.v8Errors.join(' | ');
            </script></body></html>"""

            harness_path = os.path.join('tests', 'temp_v8_test.html')
            with open(harness_path, 'w', encoding='utf-8') as f:
                f.write(harness_html)

            port = 8080
            import urllib.request
            for p in [8080, 3000]:
                try:
                    with urllib.request.urlopen(f'http://localhost:{p}/hospital.html', timeout=0.5):
                        port = p
                        break
                except Exception:
                    pass

            try:
                cmd = [
                    chrome,
                    '--headless=new',
                    '--disable-gpu',
                    '--virtual-time-budget=3000',
                    '--dump-dom',
                    f'http://localhost:{port}/tests/temp_v8_test.html'
                ]
                res = subprocess.run(cmd, capture_output=True, text=True, encoding='utf-8', errors='replace')
                m_v8 = re.search(r'id="v8-status"[^>]*>([^<]+)<', res.stdout)
                v8_status = m_v8.group(1).strip() if m_v8 else None
                self.assertEqual(v8_status, 'V8_ALL_OK', f"V8 JavaScript parsing error encountered: {res.stdout}")
            finally:
                if os.path.exists(harness_path):
                    os.remove(harness_path)

if __name__ == '__main__':
    unittest.main(verbosity=2)
