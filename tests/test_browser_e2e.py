"""
CarePulse Hospital - Automated Real-Browser End-to-End Test Suite
Executes real browser engine (Google Chrome or Microsoft Edge) in headless mode
against live application runtime, validating:
1. Emergency SOS Disclaimer modal presentation & ARIA dialog focus management
2. Multi-lingual dynamic runtime language switching (en -> hi -> pa)
3. Appointment booking submission, DPDP consent, and E-Pass Token generation
"""

import os
import sys
import time
import urllib.request
import subprocess
import re

PORT = 3000
BASE_URL = f"http://localhost:{PORT}"
ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def find_browser():
    candidates = [
        r"C:\Program Files\Google\Chrome\Application\chrome.exe",
        r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
        r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
        r"C:\Program Files\Microsoft\Edge\Application\msedge.exe"
    ]
    for c in candidates:
        if os.path.exists(c):
            return c
    return None

def is_server_running():
    try:
        req = urllib.request.Request(f"{BASE_URL}/index.html", headers={'User-Agent': 'Browser-Test-Runner'})
        with urllib.request.urlopen(req, timeout=1) as resp:
            return resp.getcode() == 200
    except Exception:
        return False

def main():
    print("=" * 70)
    print("  CAREPULSE REAL-BROWSER E2E TEST ENGINE")
    print("=" * 70)

    browser_bin = find_browser()
    if not browser_bin:
        print("  [ERROR] Neither Google Chrome nor Microsoft Edge found on host machine.")
        sys.exit(1)

    browser_name = "Google Chrome" if "chrome.exe" in browser_bin.lower() else "Microsoft Edge"
    print(f"  Browser Engine Detected: {browser_name} ({browser_bin})")

    server_process = None
    if not is_server_running():
        print(f"  Local test server on port {PORT} not running. Starting background HTTP server...")
        server_process = subprocess.Popen(
            [sys.executable, "-m", "http.server", str(PORT)],
            cwd=ROOT_DIR,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL
        )
        time.sleep(1.5)
        if not is_server_running():
            print("  [ERROR] Failed to start local server on port 3000.")
            sys.exit(1)
        print("  Local test server successfully started.")
    else:
        print("  Existing local server detected on port 3000.")

    runner_url = f"{BASE_URL}/tests/browser_e2e_runner.html"
    print(f"  Launching headless browser targeting: {runner_url}")

    cmd = [
        browser_bin,
        "--headless=new",
        "--disable-gpu",
        "--no-first-run",
        "--no-default-browser-check",
        "--virtual-time-budget=6000",
        "--dump-dom",
        runner_url
    ]

    try:
        result = subprocess.run(cmd, capture_output=True, text=True, encoding="utf-8", timeout=25)
        dom_output = result.stdout

        print("\n--- In-Browser Test Execution Log ---")
        passes = re.findall(r'\[PASS\] (.*?)(?:<|$)', dom_output)
        fails = re.findall(r'\[FAIL\] (.*?)(?:<|$)', dom_output)

        for p in passes:
            print(f"  [PASS] {p.strip()}")

        for f in fails:
            print(f"  [FAIL] {f.strip()}")

        status_match = re.search(r'data-status="([^"]+)"', dom_output)
        status = status_match.group(1) if status_match else "UNKNOWN"

        print("\n" + "=" * 70)
        print(f"  BROWSER RUN SUMMARY: {len(passes)} PASSED | {len(fails)} FAILED | STATUS: {status}")
        print("=" * 70)

        success = (status == "PASSED" and len(fails) == 0 and len(passes) >= 8)
        if success:
            print("  [SUCCESS] All in-browser end-to-end user journeys executed successfully!")
            return 0
        else:
            print(f"  [FAILURE] Browser E2E execution did not meet passing criteria (status={status}).")
            return 1

    except Exception as ex:
        print(f"  [ERROR] Browser execution encountered an unexpected exception: {ex}")
        return 1

    finally:
        if server_process:
            server_process.terminate()
            print("  Background test server terminated.")

if __name__ == '__main__':
    sys.exit(main())
