"""
test_no_overclaims.py - regression guard for the CarePulse demo-honesty fixes.

Drop this into your tests folder (anywhere inside the repo). It finds the repo
root by walking up until it sees index.html, then checks that:
  * phrases that present the demo as a real hospital never come back,
  * the head metadata still carries the demo wording and noindex,
  * the sample documents keep their data-demo markers,
  * vercel.json still ships the security headers.

Markdown files are scanned but any block wrapped in:
  <!-- overclaims:allow-start --> ... <!-- overclaims:allow-end -->
is stripped before the phrase check, so the README's honesty-markers table
can quote the exact banned strings without tripping the guard.

The allow-marker escape hatch is itself guarded:
  - markers must be balanced in every file that uses them,
  - only README.md may contain them.

Run with:  python -m unittest test_no_overclaims -v
"""
import json
import re
import unittest
from pathlib import Path


def find_repo_root() -> Path:
    here = Path(__file__).resolve().parent
    for candidate in [here, *here.parents]:
        if (candidate / "index.html").exists():
            return candidate
    raise RuntimeError("index.html not found above " + str(here))


ROOT = find_repo_root()
SKIP_DIRS = {".git", "node_modules", "tests", "test", "__pycache__", ".vercel"}
TEXT_EXTS = {".html", ".js", ".css", ".json", ".md", ".txt", ".xml"}

BANNED_PHRASES = [
    "strictly comply",
    "Verified Session",
    "Super Speciality",
    "Amoxicillin",
    "Azithromycin",
    "PMC-38214",
    "PMC Verified",
    "api.qrserver.com",
    "Official OPD Token Slip",
    "Official Hospital E-Pass",
    "Fetch Verified Report",
    "100% Genuine",
    "Encrypted Patient Verification",
    "Audio Encrypted",
    "Digitally Signed & Encrypted",
    "Compliant Demo",
    "ABHA Empanelled",
]

DEMO_MARKED_IDS = [
    "tele-rx-panel",
    "smart-health-pass-card",
    "token-slip-card",
    "lab-report-output",
]

# Strips <!-- overclaims:allow-start --> ... <!-- overclaims:allow-end --> blocks.
_ALLOW_BLOCK = re.compile(
    r"<!--\s*overclaims:allow-start\s*-->.*?<!--\s*overclaims:allow-end\s*-->",
    re.S,
)


def scannable_text(path: Path) -> str:
    """Return file text with any overclaims:allow blocks removed (for .md only)."""
    text = path.read_text(encoding="utf-8", errors="ignore")
    if path.suffix.lower() == ".md":
        return _ALLOW_BLOCK.sub("", text)
    return text


def repo_text_files():
    for path in ROOT.rglob("*"):
        if not path.is_file() or path.suffix.lower() not in TEXT_EXTS:
            continue
        if any(part in SKIP_DIRS for part in path.relative_to(ROOT).parts):
            continue
        if path.name == Path(__file__).name:
            continue
        yield path


class NoOverclaimsTest(unittest.TestCase):

    def test_banned_phrases_absent(self):
        """No banned overclaiming phrases in any repo source file.
        In .md files, content inside overclaims:allow blocks is exempt."""
        hits = []
        for path in repo_text_files():
            text = scannable_text(path)
            for phrase in BANNED_PHRASES:
                if phrase in text:
                    hits.append(f"{path.relative_to(ROOT)}: {phrase!r}")
        self.assertEqual(
            hits, [],
            "Overclaiming or removed copy is back:\n" + "\n".join(hits),
        )

    def test_allow_markers_balanced_and_readme_only(self):
        """Escape-hatch guard: allow markers must be balanced, and may only
        appear in README.md - not in any other .md file."""
        for path in repo_text_files():
            if path.suffix.lower() != ".md":
                continue
            text = path.read_text(encoding="utf-8", errors="ignore")
            starts = text.count("overclaims:allow-start")
            ends = text.count("overclaims:allow-end")
            self.assertEqual(
                starts, ends,
                f"{path.relative_to(ROOT)}: unbalanced overclaims:allow markers "
                f"({starts} start, {ends} end)",
            )
            if path.name.lower() != "readme.md":
                self.assertEqual(
                    starts, 0,
                    f"{path.relative_to(ROOT)}: overclaims:allow markers are only "
                    f"permitted in README.md",
                )

    def test_head_metadata_is_demo_labelled(self):
        html = (ROOT / "index.html").read_text(encoding="utf-8")
        self.assertRegex(html, r'<meta\s+name="robots"\s+content="[^"]*noindex')
        desc = re.search(r'<meta\s+name="description"\s+content="([^"]*)"', html)
        self.assertIsNotNone(desc, "meta description missing")
        self.assertRegex(desc.group(1).lower(), r"fictional|demo|prototype")
        self.assertNotIn("github.io", html, "stale github.io URL in index.html")

    def test_sample_documents_are_marked(self):
        html = (ROOT / "index.html").read_text(encoding="utf-8")
        for element_id in DEMO_MARKED_IDS:
            tag = re.search(r'<[^>]*\bid="%s"[^>]*>' % re.escape(element_id), html)
            self.assertIsNotNone(tag, f"#{element_id} not found")
            self.assertIn(
                "data-demo=", tag.group(0),
                f"#{element_id} lost its data-demo marker",
            )

    def test_security_headers_present(self):
        config = json.loads((ROOT / "vercel.json").read_text(encoding="utf-8"))
        keys = {
            header["key"].lower()
            for rule in config.get("headers", [])
            for header in rule.get("headers", [])
        }
        for required in (
            "x-content-type-options",
            "x-frame-options",
            "referrer-policy",
            "permissions-policy",
        ):
            self.assertIn(required, keys, f"{required} missing from vercel.json")

    def test_html_mirror_is_identical(self):
        self.assertEqual(
            (ROOT / "index.html").read_bytes(),
            (ROOT / "hospital.html").read_bytes(),
            "hospital.html drifted from index.html",
        )


if __name__ == "__main__":
    unittest.main()

