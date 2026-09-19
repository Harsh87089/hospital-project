// CarePulse Theme, Color Palette & Accessibility Font Scale Engines
import { showToast } from './utils.js';

const ThemeEngine = {
  currentTheme: 'light',

  init() {
    const saved = localStorage.getItem('carepulse_theme');
    if (saved) {
      this.setTheme(saved, false);
    } else {
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.setTheme(prefersDark ? 'dark' : 'light', false);
    }

    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('carepulse_theme')) {
          this.setTheme(e.matches ? 'dark' : 'light', false);
        }
      });
    }
  },

  setTheme(theme, persist = true) {
    this.currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    if (persist) {
      try {
        localStorage.setItem('carepulse_theme', theme);
      } catch (e) {}
    }

    // Update all theme toggle buttons
    const buttons = document.querySelectorAll('.theme-toggle-btn');
    buttons.forEach(btn => {
      if (theme === 'dark') {
        btn.innerHTML = '<span>☀️</span> <span class="theme-label" data-i18n="theme_light">Light Mode</span>';
      } else {
        btn.innerHTML = '<span>🌙</span> <span class="theme-label" data-i18n="theme_dark">Dark Mode</span>';
      }
    });
  },

  toggle() {
    const next = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(next, true);
    const toastKey = next === 'dark' ? 'toast_theme_dark' : 'toast_theme_light';
    const fallbackMsg = `Switched to ${next === 'dark' ? 'Dark' : 'Light'} Mode`;
    showToast(toastKey, 'info');
  }
};

window.ThemeEngine = ThemeEngine;
window.toggleTheme = () => ThemeEngine.toggle();

// --- 2. Multi-Language Engine ---


const PaletteEngine = {
  currentPalette: 'teal',

  init() {
    const saved = localStorage.getItem('carepulse_palette') || 'teal';
    this.setPalette(saved, false);
  },

  setPalette(palette, notify = true) {
    this.currentPalette = palette;
    if (palette === 'teal') {
      document.documentElement.removeAttribute('data-palette');
    } else {
      document.documentElement.setAttribute('data-palette', palette);
    }
    try {
      localStorage.setItem('carepulse_palette', palette);
    } catch (e) { }

    const selects = document.querySelectorAll('.palette-select');
    selects.forEach(sel => {
      sel.value = palette;
    });

    if (notify) {
      const names = {
        teal: 'Teal Mint (Standard)',
        blue: 'Royal Sapphire Blue',
        purple: 'Lavender & Rose Care',
        amber: 'Ayush Warm Amber'
      };
      showToast(`Theme palette changed to: ${names[palette] || palette}`, 'info');
    }
  }
};

window.PaletteEngine = PaletteEngine;
window.setPaletteTheme = (val) => PaletteEngine.setPalette(val);

// ==========================================================================
// 9. Senior Accessibility Font Scaling Toolbar
// ==========================================================================


const FontScaleEngine = {
  currentScale: 'md',
  scales: ['sm', 'md', 'lg', 'xl'],

  init() {
    const saved = localStorage.getItem('carepulse_font_scale') || 'md';
    this.setScale(saved, false);
  },

  setScale(scale, notify = true) {
    this.currentScale = scale;
    this.scales.forEach(s => document.documentElement.classList.remove(`font-scale-${s}`));
    document.documentElement.classList.add(`font-scale-${scale}`);
    try {
      localStorage.setItem('carepulse_font_scale', scale);
    } catch (e) { }

    document.querySelectorAll('.font-scale-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.scale === scale);
    });

    if (notify) {
      const labels = { sm: 'Compact (14.5px)', md: 'Default (16px)', lg: 'Large / Senior (17.5px)', xl: 'Extra Large (19px)' };
      showToast(`Text size set to: ${labels[scale] || scale}`, 'info');
    }
  }
};

window.FontScaleEngine = FontScaleEngine;
window.setFontScale = (scale) => FontScaleEngine.setScale(scale);

// ==========================================================================
// 10. Sticky Horizontal Category Chips Scroller & ScrollSpy
// ==========================================================================


export {
  ThemeEngine,
  toggleTheme,
  PaletteEngine,
  setPaletteTheme,
  FontScaleEngine,
  setFontScale
};
