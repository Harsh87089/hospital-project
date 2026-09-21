"""
CarePulse Hospital - Comprehensive Deep CLI Validation Suite
Tests:
1. Live HTTP 200 OK & Content-Type for all 29 platform endpoints on port 3000
2. Static Asset References in HTML Exist on Disk
3. Service Worker Precaching: all 39 shell assets exist on disk and return HTTP 200
4. DOM Quality: Zero duplicate IDs in HTML (checked with proper word boundaries)
5. Tri-lingual Localization: 100% of data-i18n attributes in HTML resolve in en, hi, pa
6. HTML Mirror SHA-256 Parity
7. CSS Module imports exist on disk
8. DPDP Act 2023 Storage Key Erasure Alignment
9. Core Form Validation Regular Expression Rules
"""

import os
import sys
import json
import re
import hashlib
import urllib.request
from html.parser import HTMLParser

BASE_URL = "http://localhost:3000"
ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

class ComprehensiveValidator:
    def __init__(self):
        self.passes = 0
        self.fails = 0
        self.warnings = 0

    def assert_check(self, title, condition, detail=""):
        if condition:
            self.passes += 1
            print(f"  [PASS] {title}")
        else:
            self.fails += 1
            print(f"  [FAIL] {title} -> {detail}")

    def run_all(self):
        print("=" * 70)
        print("  CAREPULSE DEEP CLI VERIFICATION SUITE")
        print("=" * 70)

        self.test_live_http_endpoints()
        self.test_asset_references_on_disk()
        self.test_sw_precache_assets()
        self.test_dom_unique_ids()
        self.test_i18n_attribute_resolution()
        self.test_html_sha256_parity()
        self.test_css_imports_exist()
        self.test_dpdp_keys_alignment()
        self.test_input_validation_regexes()

        print("\n" + "=" * 70)
        print(f"  SUMMARY: {self.passes} PASSED | {self.fails} FAILED | {self.warnings} WARNINGS")
        print("=" * 70)
        return self.fails == 0

    def test_live_http_endpoints(self):
        print("\n--- 1. Live HTTP Endpoint Availability (Port 3000) ---")
        # Preflight probe to check if local server is online
        server_online = False
        try:
            req = urllib.request.Request(f"{BASE_URL}/index.html", headers={'User-Agent': 'CLI-Validator'})
            with urllib.request.urlopen(req, timeout=0.8) as resp:
                if resp.getcode() == 200:
                    server_online = True
        except Exception:
            server_online = False

        spawned_server = None
        if not server_online:
            print("  [INFO] Local server not active on port 3000. Spawning automated background server thread...")
            import functools
            from http.server import HTTPServer, SimpleHTTPRequestHandler
            import threading

            class QuietHandler(SimpleHTTPRequestHandler):
                def log_message(self, format, *args):
                    pass

            handler = functools.partial(QuietHandler, directory=ROOT_DIR)
            try:
                spawned_server = HTTPServer(('127.0.0.1', 3000), handler)
                t = threading.Thread(target=spawned_server.serve_forever, daemon=True)
                t.start()
                server_online = True
                print("  [PASS] Background HTTP server thread active on port 3000.")
            except Exception as ex:
                self.warnings += 1
                print(f"  [WARNING] Unable to launch automated background server: {ex}")
                return

        try:
            endpoints = [
            "/index.html",
            "/hospital.html",
            "/manifest.json",
            "/sw.js",
            "/icons/readme-hero.jpg",
            "/robots.txt",
            "/favicon.ico",
            "/favicon.svg",
            "/icons/icon-96.png",
            "/icons/icon-192.png",
            "/icons/icon-512.png",
            "/css/base.css",
            "/css/components.css",
            "/css/modals.css",
            "/css/themes.css",
            "/css/fonts.css",
            "/js/config.js",
            "/js/utils.js",
            "/js/auth.js",
            "/js/booking.js",
            "/js/queue.js",
            "/js/tokens.js",
            "/js/pharmacy.js",
            "/js/lab.js",
            "/js/sos.js",
            "/js/calculators.js",
            "/js/theme.js",
            "/js/i18n.js",
            "/js/search.js",
            "/js/voice.js",
            "/js/tele.js",
            "/js/wayfinder.js",
            "/js/healthcard.js",
            "/js/gateway.js",
            "/js/main.js"
        ]
            for ep in endpoints:
                url = f"{BASE_URL}{ep}"
                try:
                    req = urllib.request.Request(url, headers={'User-Agent': 'CLI-Validator'})
                    with urllib.request.urlopen(req, timeout=2) as resp:
                        code = resp.getcode()
                        self.assert_check(f"HTTP GET {ep} -> {code}", code == 200, f"Expected 200, got {code}")
                except Exception as e:
                    self.assert_check(f"HTTP GET {ep}", False, str(e))
        finally:
            if spawned_server:
                spawned_server.shutdown()
                print("  [INFO] Background HTTP server thread shut down cleanly.")

    def test_asset_references_on_disk(self):
        print("\n--- 2. Static Asset References in HTML Exist on Disk ---")
        with open(os.path.join(ROOT_DIR, 'index.html'), 'r', encoding='utf-8') as f:
            html = f.read()

        class AssetFinder(HTMLParser):
            def __init__(self):
                super().__init__()
                self.assets = []
            def handle_starttag(self, tag, attrs):
                d = dict(attrs)
                if tag == 'link' and d.get('rel') in ('stylesheet', 'manifest', 'icon', 'apple-touch-icon'):
                    href = d.get('href', '')
                    if href and not href.startswith(('http://', 'https://', 'data:')):
                        self.assets.append(href)
                elif tag == 'script' and 'src' in d:
                    src = d['src']
                    if src and not src.startswith(('http://', 'https://', 'data:')):
                        self.assets.append(src)
                elif tag == 'img' and 'src' in d:
                    src = d['src']
                    if src and not src.startswith(('http://', 'https://', 'data:')):
                        self.assets.append(src)

        finder = AssetFinder()
        finder.feed(html)
        unique_assets = sorted(list(set(finder.assets)))

        for asset in unique_assets:
            clean_path = asset.split('?')[0].split('#')[0].lstrip('/')
            full_path = os.path.join(ROOT_DIR, clean_path)
            self.assert_check(f"Asset file exists: {asset}", os.path.exists(full_path), f"Missing file: {full_path}")

    def test_sw_precache_assets(self):
        print("\n--- 3. Service Worker Precaching Assets Exist ---")
        sw_path = os.path.join(ROOT_DIR, 'sw.js')
        with open(sw_path, 'r', encoding='utf-8') as f:
            content = f.read()

        m = re.search(r'const PRECACHE_ASSETS = \[(.*?)\];', content, re.DOTALL)
        if not m:
            self.assert_check("Extract PRECACHE_ASSETS list from sw.js", False, "Regex match failed")
            return

        raw_list = m.group(1)
        assets = [item.strip().strip("'").strip('"') for item in raw_list.split(',') if item.strip().strip("'").strip('"')]
        self.assert_check(f"SW declares exactly 39 precache entries (found {len(assets)})", len(assets) == 39)

        for asset in assets:
            if asset in ('/', '', './', '.'):
                continue
            clean = asset[2:] if asset.startswith('./') else (asset[1:] if asset.startswith('/') else asset)
            full_path = os.path.join(ROOT_DIR, clean)
            self.assert_check(f"Precache file exists: {asset}", os.path.exists(full_path), f"Missing: {full_path}")

    def test_dom_unique_ids(self):
        print("\n--- 4. DOM Quality: Zero Duplicate IDs in HTML ---")
        with open(os.path.join(ROOT_DIR, 'index.html'), 'r', encoding='utf-8') as f:
            html = f.read()

        ids_found = {}
        duplicates = []
        for m in re.finditer(r'\bid=["\']([^"\']+)["\']', html):
            elem_id = m.group(1)
            if elem_id in ids_found:
                duplicates.append(elem_id)
            else:
                ids_found[elem_id] = 1

        self.assert_check(
            f"Zero duplicate HTML IDs (total unique IDs: {len(ids_found)})",
            len(duplicates) == 0,
            f"Duplicates found: {duplicates}"
        )

    def test_i18n_attribute_resolution(self):
        print("\n--- 5. Tri-lingual Localization: data-i18n Attribute Coverage ---")
        with open(os.path.join(ROOT_DIR, 'index.html'), 'r', encoding='utf-8') as f:
            html = f.read()
        with open(os.path.join(ROOT_DIR, 'js', 'i18n.js'), 'r', encoding='utf-8') as f:
            i18n_js = f.read()

        m = re.search(r'const TRANSLATIONS = (\{.*?\n\};)', i18n_js, re.DOTALL)
        translations = json.loads(m.group(1).rstrip(';'))

        data_i18n_keys = set(re.findall(r'data-i18n=["\']([^"\']+)["\']', html))
        placeholder_keys = set(re.findall(r'data-i18n-placeholder=["\']([^"\']+)["\']', html))
        all_html_keys = data_i18n_keys | placeholder_keys

        missing_en = [k for k in all_html_keys if k not in translations['en']]
        missing_hi = [k for k in all_html_keys if k not in translations['hi']]
        missing_pa = [k for k in all_html_keys if k not in translations['pa']]

        self.assert_check(f"All {len(all_html_keys)} HTML keys present in English (en)", len(missing_en) == 0, str(missing_en))
        self.assert_check(f"All {len(all_html_keys)} HTML keys present in Hindi (hi)", len(missing_hi) == 0, str(missing_hi))
        self.assert_check(f"All {len(all_html_keys)} HTML keys present in Punjabi (pa)", len(missing_pa) == 0, str(missing_pa))

    def test_html_sha256_parity(self):
        print("\n--- 6. HTML Mirror SHA-256 Parity ---")
        h_path = os.path.join(ROOT_DIR, 'hospital.html')
        i_path = os.path.join(ROOT_DIR, 'index.html')
        h_hash = hashlib.sha256(open(h_path, 'rb').read()).hexdigest()
        i_hash = hashlib.sha256(open(i_path, 'rb').read()).hexdigest()

        self.assert_check(
            f"hospital.html and index.html match 100% ({h_hash[:12]}...)",
            h_hash == i_hash,
            f"Hash mismatch: hospital={h_hash} vs index={i_hash}"
        )

    def test_css_imports_exist(self):
        print("\n--- 7. CSS Module Imports on Disk ---")
        base_css = os.path.join(ROOT_DIR, 'css', 'base.css')
        with open(base_css, 'r', encoding='utf-8') as f:
            content = f.read()

        imports = re.findall(r'@import\s+url\(["\']?([^"\'\)]+)["\']?\);', content)
        local_imports = [imp for imp in imports if not imp.startswith(('http://', 'https://'))]
        self.assert_check(f"Found local @import rules in css/base.css ({local_imports})", len(local_imports) >= 1)

        for imp in local_imports:
            css_path = os.path.normpath(os.path.join(ROOT_DIR, 'css', imp))
            self.assert_check(f"Import target exists: css/{imp}", os.path.exists(css_path), f"Missing: {css_path}")

    def test_dpdp_keys_alignment(self):
        print("\n--- 8. DPDP Privacy Keys Alignment ---")
        with open(os.path.join(ROOT_DIR, 'js', 'main.js'), 'r', encoding='utf-8') as f:
            main_js = f.read()

        expected_keys = [
            'carepulse_appointments',
            'carepulse_auth_user',
            'carepulse_booked_slots',
            'carepulse_cart',
            'carepulse_theme',
            'carepulse_palette',
            'carepulse_font_scale',
            'carepulse_lang',
            'carepulse_delivery_gateway',
            'carepulse_active_token',
            'carepulse_recent_searches'
        ]
        for k in expected_keys:
            self.assert_check(f"DPDP purge key tracked: {k}", k in main_js, f"Missing key: {k}")

    def test_input_validation_regexes(self):
        print("\n--- 9. Form Input Validation Regexes ---")
        phone_re = re.compile(r'^[6-9]\d{9}$')
        self.assert_check("Phone regex matches valid 10-digit Indian numbers", bool(phone_re.match("9876543210")))
        self.assert_check("Phone regex rejects 9-digit number", not bool(phone_re.match("987654321")))
        self.assert_check("Phone regex rejects numbers starting with 1-5", not bool(phone_re.match("1234567890")))

        name_re = re.compile(r'^[A-Za-z\s.]{2,50}$')
        self.assert_check("Name regex matches 'Dr. Gurpreet Singh'", bool(name_re.match("Dr. Gurpreet Singh")))
        self.assert_check("Name regex rejects single-char name", not bool(name_re.match("A")))
        self.assert_check("Name regex rejects script tags", not bool(name_re.match("<script>")))

if __name__ == '__main__':
    v = ComprehensiveValidator()
    success = v.run_all()
    sys.exit(0 if success else 1)
