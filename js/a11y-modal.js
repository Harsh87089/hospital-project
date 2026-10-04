// CarePulse Reusable Accessible Modal Engine (WCAG 2.1 / 2.2 AA Focus Trap, Esc, and Focus Return)
const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';
let lastFocus = null;

function trap(e) {
  const modal = e.currentTarget;
  if (e.key === 'Escape') {
    e.stopPropagation();
    return closeModal(modal);
  }
  if (e.key !== 'Tab') return;
  const items = [...modal.querySelectorAll(FOCUSABLE)].filter(el => el.offsetParent !== null);
  if (!items.length) return;
  const first = items[0];
  const last = items[items.length - 1];
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
}

export function openModal(target, opener) {
  const modal = typeof target === 'string' ? document.getElementById(target) : target;
  if (!modal) return;

  lastFocus = opener || document.activeElement;
  modal.hidden = false;
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-hidden', 'false');
  modal.classList.add('active');
  modal.classList.remove('u-display-none');

  document.body.classList.add('modal-open');
  document.body.style.overflow = 'hidden';

  const firstFocusable = modal.querySelector(FOCUSABLE);
  if (firstFocusable && typeof firstFocusable.focus === 'function') {
    firstFocusable.focus();
  } else {
    modal.setAttribute('tabindex', '-1');
    modal.focus();
  }

  modal.removeEventListener('keydown', trap);
  modal.addEventListener('keydown', trap);
  return modal;
}

export function closeModal(target) {
  const modal = typeof target === 'string' ? document.getElementById(target) : target;
  if (!modal) return;

  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  modal.removeEventListener('keydown', trap);

  const openModals = document.querySelectorAll('.modal-backdrop.active, .service-layer-modal.active, .booking-layer-modal.active, .spotlight-backdrop.active, .voice-modal-backdrop.active');
  if (openModals.length === 0) {
    document.body.classList.remove('modal-open');
    document.body.style.overflow = '';
  }

  if (lastFocus && typeof lastFocus.focus === 'function') {
    try {
      lastFocus.focus();
    } catch (_) {
      // Ignored if element was detached
    }
  }
}

if (typeof window !== 'undefined') {
  window.A11yModal = { openModal, closeModal, trap };
}
