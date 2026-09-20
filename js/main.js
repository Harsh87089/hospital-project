// CarePulse Main Application Entry Point & Module Assembler
import * as Config from './config.js';
import * as Utils from './utils.js';
import * as Auth from './auth.js';
import * as Booking from './booking.js';
import * as Queue from './queue.js';
import * as Tokens from './tokens.js';
import * as Pharmacy from './pharmacy.js';
import * as Lab from './lab.js';
import * as SOS from './sos.js';
import * as Calculators from './calculators.js';
import * as Theme from './theme.js';
import * as I18n from './i18n.js';
import * as Search from './search.js';
import * as Voice from './voice.js';
import * as Tele from './tele.js';
import * as Wayfinder from './wayfinder.js';
import * as HealthCard from './healthcard.js';
import * as Gateway from './gateway.js';

// Bind all module exports to window for global interoperability
Object.assign(window, Config, Utils, Auth, Booking, Queue, Tokens, Pharmacy, Lab, SOS, Calculators, Theme, I18n, Search, Voice, Tele, Wayfinder, HealthCard, Gateway);

// Skeleton loader for Beds & ICU Capacity
function renderBedSkeletons(count = 4) {
  const container = document.getElementById('beds-capacity-grid');
  if (!container) return;
  container.innerHTML = Array(count).fill(0).map(() => `
    <div class="skeleton-card">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div class="skeleton-shimmer" style="width: 140px; height: 24px;"></div>
        <div class="skeleton-shimmer" style="width: 80px; height: 20px; border-radius: 9999px;"></div>
      </div>
      <div class="skeleton-shimmer" style="height: 36px; width: 60%; margin: 0.5rem 0;"></div>
      <div class="skeleton-shimmer" style="height: 12px; border-radius: 9999px;"></div>
      <div class="skeleton-shimmer" style="height: 18px; width: 40%; margin-top: 0.5rem;"></div>
    </div>
  `).join('');
}
window.renderBedSkeletons = renderBedSkeletons;

// Additional window modal openers/closers
window.openBedsModal = function () {
  const modal = document.getElementById('beds-modal');
  if (!modal) return;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  renderBedSkeletons(4);
  setTimeout(() => {
    if (window.BedsCapacityEngine && typeof window.BedsCapacityEngine.render === 'function') {
      window.BedsCapacityEngine.render();
      setTimeout(() => {
        window.BedsCapacityEngine.startECGMonitor();
      }, 50);
    }
  }, 120);
};

window.closeBedsModal = function () {
  const modal = document.getElementById('beds-modal');
  if (modal) modal.classList.remove('active');
  document.body.style.overflow = '';
  if (window.BedsCapacityEngine && typeof window.BedsCapacityEngine.stopECGMonitor === 'function') {
    window.BedsCapacityEngine.stopECGMonitor();
  }
};

window.openDoctorsModal = function (specialtyFilter = null) {
  const modal = document.getElementById('doctors-modal');
  if (!modal) return;
  if (specialtyFilter) {
    state.activeSpecialty = specialtyFilter;
    const btns = document.querySelectorAll('#doctors-modal .specialty-btn');
    btns.forEach(b => {
      b.classList.toggle('active', b.dataset.specialty === specialtyFilter);
    });
  }
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  if (typeof renderDoctorSkeletons === 'function') renderDoctorSkeletons(4);
  setTimeout(() => {
    if (typeof renderDoctorCards === 'function') renderDoctorCards();
  }, 120);
};

window.closeDoctorsModal = function () {
  const modal = document.getElementById('doctors-modal');
  if (modal) modal.classList.remove('active');
  document.body.style.overflow = '';
};

window.openPackagesModal = function () {
  const modal = document.getElementById('packages-modal');
  if (!modal) return;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
};

window.closePackagesModal = function () {
  const modal = document.getElementById('packages-modal');
  if (modal) modal.classList.remove('active');
  document.body.style.overflow = '';
};


window.openInsuranceModal = function () {
  const modal = document.getElementById('insurance-modal');
  if (!modal) return;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
};

window.closeInsuranceModal = function () {
  const modal = document.getElementById('insurance-modal');
  if (modal) modal.classList.remove('active');
  document.body.style.overflow = '';
};

window.openGuidelinesModal = function () {
  const modal = document.getElementById('guidelines-modal');
  if (!modal) return;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
};

window.closeGuidelinesModal = function () {
  const modal = document.getElementById('guidelines-modal');
  if (modal) modal.classList.remove('active');
  document.body.style.overflow = '';
};

// Backwards-compatible inline selector
window.quickSelectDoctor = function (doctorId, scrollToSlotsOnly = false) {
  openBookingLayer(doctorId);
};

// --- Render Date Picker Ribbon (Supports both Layer and Inline) ---

// --- Unified Accessible Modal Engine (WCAG 2.2 AA Focus Trap, Opener Return & Scroll Lock) ---
let activeModalOpener = null;
let currentActiveModal = null;

window.openModal = function (modalId, triggerElement) {
  const modal = typeof modalId === 'string' ? document.getElementById(modalId) : modalId;
  if (!modal) return;

  activeModalOpener = triggerElement || document.activeElement;
  currentActiveModal = modal;

  modal.classList.add('active');
  modal.classList.remove('u-display-none');
  modal.setAttribute('aria-hidden', 'false');

  document.body.classList.add('modal-open');
  document.body.style.overflow = 'hidden';

  // Focus trap initiation: focus first interactive element inside modal
  const focusable = modal.querySelectorAll('button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])');
  if (focusable.length > 0) {
    focusable[0].focus();
  } else {
    modal.setAttribute('tabindex', '-1');
    modal.focus();
  }
};

window.closeModal = function (modalId) {
  const modal = typeof modalId === 'string' ? document.getElementById(modalId) : (modalId || currentActiveModal);
  if (!modal) return;

  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');

  const openModals = document.querySelectorAll('.modal-backdrop.active, .service-layer-modal.active, .booking-layer-modal.active, .spotlight-backdrop.active, .voice-modal-backdrop.active');
  if (openModals.length === 0) {
    document.body.classList.remove('modal-open');
    document.body.style.overflow = '';
    currentActiveModal = null;
  } else {
    currentActiveModal = openModals[openModals.length - 1];
  }

  if (activeModalOpener && typeof activeModalOpener.focus === 'function') {
    activeModalOpener.focus();
    activeModalOpener = null;
  }
};

function setupModalDismissals() {
  const allModalIds = [
    'booking-layer-modal', 'token-modal', 'my-bookings-modal', 'emergency-modal',
    'lab-report-modal', 'pharmacy-modal', 'health-calculator-modal',
    'live-queue-modal', 'beds-modal', 'doctors-modal', 'packages-modal',
    'track-token-modal', 'insurance-modal', 'guidelines-modal', 'tele-consult-modal',
    'campus-wayfinder-modal', 'health-card-modal', 'reschedule-dialog-modal',
    'cancel-dialog-modal', 'package-booking-modal', 'privacy-modal', 'terms-modal',
    'reception-modal', 'spotlight-search-modal', 'voice-assistant-modal',
    'delivery-gateway-modal', 'emergency-sos-modal'
  ];

  allModalIds.forEach(modalId => {
    const el = document.getElementById(modalId);
    if (!el) return;
    el.addEventListener('click', (e) => {
      if (e.target === el) {
        window.closeModal(el);
      }
    });
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (currentActiveModal) {
        window.closeModal(currentActiveModal);
      } else {
        allModalIds.forEach(id => {
          const el = document.getElementById(id);
          if (el && el.classList.contains('active')) {
            window.closeModal(el);
          }
        });
      }
      if (typeof closeChatWidget === 'function') closeChatWidget();
    } else if (e.key === 'Tab' && currentActiveModal) {
      const focusable = Array.from(currentActiveModal.querySelectorAll('button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')).filter(el => el.offsetParent !== null);
      if (focusable.length === 0) return;

      const firstEl = focusable[0];
      const lastEl = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    }
  });
}

  // Deep Link & Hash Routing handler
  window.handleHashRouting = function () {
    const hash = (window.location.hash || '').toLowerCase();
    const searchParams = new URLSearchParams(window.location.search);
    const docParam = searchParams.get('doctor') || (hash.includes('doctor=') ? hash.split('doctor=')[1].split('&')[0] : null);
    const specParam = searchParams.get('specialty') || searchParams.get('dept') || (hash.includes('specialty=') ? hash.split('specialty=')[1].split('&')[0] : null);

    if (docParam) {
      setTimeout(() => openBookingLayer(docParam), 400);
      return;
    }
    if (specParam) {
      setTimeout(() => openDoctorsModal(specParam), 400);
      return;
    }

    if (!hash) return;
    if (hash === '#doctors' || hash === '#doctors-section') openDoctorsModal();
    else if (hash === '#queue' || hash === '#live-board-section' || hash === '#live-queue') openLiveQueueModal();
    else if (hash === '#beds' || hash === '#beds-occupancy-section') openBedsModal();
    else if (hash === '#packages' || hash === '#packages-section') openPackagesModal();
    else if (hash === '#booking' || hash === '#booking-section') openBookingLayer();
    else if (hash === '#track' || hash === '#track-token-section') openTrackTokenModal();
    else if (hash === '#insurance' || hash === '#insurance-section') openInsuranceModal();
    else if (hash === '#reports' || hash === '#lab-reports') openLabReportModal();
    else if (hash === '#pharmacy') openPharmacyModal();
    else if (hash === '#emergency') openEmergencySOS();
    else if (hash === '#calculator' || hash === '#bmi') openHealthCalculator();
    else if (hash === '#tokens' || hash === '#my-bookings') openMyBookingsModal();
  };

  window.addEventListener('hashchange', window.handleHashRouting);
  setTimeout(window.handleHashRouting, 300);

// ==========================================================================
// CarePulse Enterprise Healthcare Portal Modules
// ==========================================================================



// 1. Multi-Branch & City Selector

window.toggleChatWidget = function () {
  const windowEl = document.getElementById('chat-window-layer');
  if (!windowEl) return;
  windowEl.classList.toggle('active');
  if (windowEl.classList.contains('active')) {
    const input = document.getElementById('chat-user-input');
    if (input) setTimeout(() => input.focus(), 150);
  }
};

window.closeChatWidget = function () {
  const windowEl = document.getElementById('chat-window-layer');
  if (windowEl) windowEl.classList.remove('active');
};

window.handleChatChip = function (query) {
  const input = document.getElementById('chat-user-input');
  if (input) {
    input.value = query;
    sendChatMessage();
  }
};

window.sendChatMessage = function () {
  const input = document.getElementById('chat-user-input');
  if (!input) return;
  const message = input.value.trim();
  if (!message) return;

  appendChatMessage(escapeHtml(message), 'user');
  input.value = '';

  setTimeout(() => {
    botTriageProcess(message);
  }, 450);
};

function readAloudChatText(btn) {
  const msgParent = btn.closest('.chat-msg');
  if (!msgParent) return;
  const clone = msgParent.cloneNode(true);
  clone.querySelectorAll('button, .chat-action-cluster, .chat-tips-list').forEach(el => el.remove());
  const text = clone.innerText.trim();
  if (text && window.PublicAddressEngine) {
    btn.classList.add('speaking');
    PublicAddressEngine.speakText(text);
    setTimeout(() => btn.classList.remove('speaking'), 4000);
  }
}

function appendChatMessage(htmlOrText, sender = 'bot') {
  const container = document.getElementById('chat-messages-container');
  if (!container) return;

  const msgDiv = document.createElement('div');
  msgDiv.className = `chat-msg ${sender}`;
  let finalHtml = htmlOrText;
  if (sender === 'bot') {
    finalHtml += `<div><button type="button" class="btn-read-aloud" data-action="read-aloud-chat"><span>🔊 Listen</span></button></div>`;
  }
  msgDiv.innerHTML = finalHtml;
  container.appendChild(msgDiv);
  container.scrollTop = container.scrollHeight;
}

function botTriageProcess(userQuery) {
  const lower = userQuery.toLowerCase();

  let match = CHAT_KNOWLEDGE.find(item =>
    item.triggers.some(keyword => lower.includes(keyword))
  );

  if (!match) {
    appendChatMessage(`
      <div>I've noted your query: "<em>${escapeHtml(userQuery)}</em>".</div>
      <div style="margin-top: 0.5rem;">At CarePulse Multi-Specialty Hospital, Phagwara, we have doctors on duty for:</div>
      <ul style="margin: 0.4rem 0 0.5rem 1.2rem; font-size: 0.8rem;">
        <li>🩺 <strong>General Physicians</strong> (Fever, infections, diabetes, BP)</li>
        <li>👶 <strong>Pediatricians</strong> (Child health & painless vaccinations)</li>
        <li>✨ <strong>Dermatologists</strong> (Skin rashes, acne & hair treatments)</li>
        <li>🦷 <strong>Dental Surgeons</strong> (Toothache, root canal & cleaning)</li>
      </ul>
      <div class="chat-action-cluster">
        <button class="btn-bot-action primary" data-action="chat-book-opd">
          ⚡ Open Doctor Booking Layer ↗
        </button>
        <button class="btn-bot-action pharmacy" data-action="chat-open-pharmacy">
          💊 Order OTC Medicines (24/7 Pharmacy) ↗
        </button>
      </div>
    `, 'bot');
    return;
  }

  if (match.isEmergency) {
    appendChatMessage(`
      <div style="background: #fee2e2; border: 2px solid #ef4444; border-radius: 8px; padding: 1rem; color: #991b1b; margin-bottom: 0.5rem;">
        <div style="display: flex; align-items: center; gap: 0.5rem; font-weight: 800; font-size: 1rem; margin-bottom: 0.35rem;">
          <span>🚨</span> CRITICAL MEDICAL EMERGENCY
        </div>
        <p style="margin: 0 0 0.75rem; font-size: 0.85rem; color: #7f1d1d; line-height: 1.4;">
          ${match.response}
        </p>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 0.75rem;">
          <a href="tel:108" class="btn btn-primary btn-sm" style="background: #dc2626; text-decoration: none; font-weight: 800; padding: 0.5rem 0.85rem;">
            📞 Call 108 (Ambulance)
          </a>
          <a href="tel:112" class="btn btn-primary btn-sm" style="background: #b91c1c; text-decoration: none; font-weight: 800; padding: 0.5rem 0.85rem;">
            📞 Call 112 (Emergency)
          </a>
          <a href="tel:${DEMO_PHONE_RAW}" class="btn btn-primary btn-sm" style="background: #991b1b; text-decoration: none; font-weight: 800; padding: 0.5rem 0.85rem;">
            📞 Demo Desk: ${DEMO_PHONE}
          </a>
          <button type="button" class="btn btn-outline btn-sm" data-action="chat-open-sos" style="border-color: #dc2626; color: #dc2626; font-weight: 700;">
            🚨 GPS Emergency Hub
          </button>
        </div>
      </div>
      <div class="chat-tips-card" style="background: #fff1f2; border-color: #fecdd3;">
        <div class="chat-tips-title" style="color: #9f1239;">🚨 Immediate Emergency First-Aid:</div>
        <ul class="chat-tips-list" style="color: #881337;">
          ${match.homeTips.map(tip => `<li>• ${tip}</li>`).join('')}
        </ul>
      </div>
    `, 'bot');
    return;
  }

  if (match.isPackage) {
    appendChatMessage(`
      <div><strong>${match.condition}</strong>: ${match.response}</div>
      <div class="chat-tips-card">
        <div class="chat-tips-title">💡 Preparation Tips for Diagnostic Tests:</div>
        <ul class="chat-tips-list">
          ${match.homeTips.map(tip => `<li>✓ ${tip}</li>`).join('')}
        </ul>
      </div>
      <div class="chat-action-cluster">
        <button class="btn-bot-action package" data-action="chat-book-package" data-package="pkg-exec">
          🛡️ Book Executive Full Body Checkup (₹2,499) ↗
        </button>
        <button class="btn-bot-action primary" data-action="chat-book-package" data-package="pkg-basic">
          🩸 Book Basic Wellness Screen (₹999) ↗
        </button>
      </div>
    `, 'bot');
    return;
  }

  // Doctor match with comprehensive Home Relief Tips + Do's & Don'ts + Multi-Action Buttons
  const tipsHtml = match.homeTips ? `
    <div class="chat-tips-card">
      <div class="chat-tips-title">💡 Immediate Home Relief Tips:</div>
      <ul class="chat-tips-list">
        ${match.homeTips.map(tip => `<li>✓ ${tip}</li>`).join('')}
      </ul>
    </div>
  ` : '';

  const dontsHtml = match.donts ? `
    <div class="chat-dont-card">
      <strong>⚠️ What to Avoid:</strong> ${match.donts}
    </div>
  ` : '';

  appendChatMessage(`
    <div style="margin-bottom: 0.35rem;">
      <span class="chat-triage-severity ${match.isEmergency ? 'triage-severity-emergency' : match.homeTips ? 'triage-severity-moderate' : 'triage-severity-routine'}">
        ● Clinical Triage: ${match.isEmergency ? 'High Emergency' : match.homeTips ? 'Moderate (OPD Consultation Recommended)' : 'Routine Care'}
      </span>
    </div>
    <div>
      <strong style="color: var(--dark); font-size: 0.9rem;">${match.condition}</strong>
      <p style="margin-top: 0.25rem; font-size: 0.8rem; color: var(--slate-600);">${match.response}</p>
    </div>

    ${tipsHtml}
    ${dontsHtml}

    <div style="margin-top: 0.75rem; background: var(--slate-100); padding: 0.75rem; border-radius: var(--radius-md); border-left: 3px solid var(--primary);">
      <div style="font-weight: 800; color: var(--dark); font-size: 0.825rem;">Recommended Consulting Specialist:</div>
      <div style="color: var(--primary-dark); font-weight: 800; margin-top: 0.15rem;">${match.doctorName}</div>
      <div style="font-size: 0.72rem; color: var(--slate-600);">${match.degree}</div>
      <div style="font-size: 0.75rem; font-weight: 700; color: #059669; margin-top: 0.2rem;">Consultation Fee: ${match.fee}</div>

      <button class="btn-auto-book-slot" data-action="auto-book-from-chat" data-doctor="${match.doctor}" data-condition="${match.condition}">
        ⚡ 1-Click Auto-Book ${match.doctorName} (Next Available Slot)
      </button>
    </div>

    <div class="chat-action-cluster">
      <button class="btn-bot-action primary" data-action="chat-book-opd" data-doctor="${match.doctor}">
        📅 Option 1: Book Consultation with ${match.doctorName} ➔
      </button>
      <button class="btn-bot-action pharmacy" data-action="chat-open-pharmacy">
        💊 Option 2: Order Relief Kit (2-Hr Delivery) ↗
      </button>
      <button class="btn-bot-action package" data-action="chat-open-lab">
        🔬 Option 3: Check Lab Reports & Diagnostic Tests ↗
      </button>
    </div>
  `, 'bot');
}

/* ==========================================================================
   CarePulse Authentication & Dynamic OTP Verification Engine
   Supports: Mandatory Portal Lockdown, Mobile (+91) OTP, Google Account OTP,
   Random Dynamic 6-digit OTP generation, Realistic Simulated SMS/Gmail Banners,
   1-Click Auto-Fill, Session Persistence, and Logout / Account Switch.
   ========================================================================== */


function showSidebarToast(message) {
  let toast = document.getElementById('sidebar-toggle-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'sidebar-toggle-toast';
    toast.className = 'sidebar-toggle-toast';
    document.body.appendChild(toast);
  }
  toast.innerText = message;
  toast.classList.add('show');
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 2200);
}

// Update all button states and labels across header, status bar, and footer
function updateSidebarToggleState() {
  const isCollapsed = document.body.classList.contains('sidebar-collapsed');
  const collapseBtn = document.getElementById('sidebar-collapse-btn');
  const statusBarText = document.getElementById('status-bar-sidebar-text');
  const restoreBtn = document.getElementById('sidebar-restore-btn');

  if (collapseBtn) {
    collapseBtn.setAttribute('aria-expanded', isCollapsed ? 'false' : 'true');
    collapseBtn.setAttribute('title', isCollapsed ? 'Show Sidebar (Ctrl+\\)' : 'Hide Sidebar (Ctrl+\\)');
  }

  if (statusBarText) {
    statusBarText.innerText = isCollapsed ? 'Show Menu' : 'Hide Menu';
  }

  if (restoreBtn) {
    restoreBtn.setAttribute('aria-expanded', isCollapsed ? 'false' : 'true');
  }
}

// Universal Toggle Sidebar Collapse / Hide Function
window.toggleSidebarCollapse = function (forceState) {
  const isMobile = window.innerWidth < 1024;
  const sidebar = document.getElementById('carepulse-sidebar');
  const backdrop = document.getElementById('sidebar-backdrop');

  if (isMobile) {
    // Mobile Off-Canvas Drawer Behavior
    if (typeof forceState === 'boolean') {
      if (forceState) {
        sidebar?.classList.remove('open');
        backdrop?.classList.remove('active');
        document.body.classList.remove('sidebar-open');
      } else {
        sidebar?.classList.add('open');
        backdrop?.classList.add('active');
        document.body.classList.add('sidebar-open');
      }
    } else {
      const isOpen = sidebar?.classList.contains('open');
      sidebar?.classList.toggle('open', !isOpen);
      backdrop?.classList.toggle('active', !isOpen);
      document.body.classList.toggle('sidebar-open', !isOpen);
    }
  } else {
    // Desktop Full Sidebar Collapse Behavior
    const isCurrentlyCollapsed = document.body.classList.contains('sidebar-collapsed');
    const shouldCollapse = typeof forceState === 'boolean' ? forceState : !isCurrentlyCollapsed;

    if (shouldCollapse) {
      document.body.classList.add('sidebar-collapsed');
      try {
        localStorage.setItem('carepulse_sidebar_collapsed', 'true');
      } catch (e) {}
      showSidebarToast('Sidebar hidden (Press Ctrl+\\ to show)');
    } else {
      document.body.classList.remove('sidebar-collapsed');
      try {
        localStorage.setItem('carepulse_sidebar_collapsed', 'false');
      } catch (e) {}
      showSidebarToast('Sidebar restored');
    }

    updateSidebarToggleState();
  }
};

// Backwards compatibility alias for existing links
window.toggleLeftSidebar = function (forceClose) {
  if (window.innerWidth < 1024) {
    window.toggleSidebarCollapse(forceClose === true ? true : undefined);
  } else if (forceClose === true) {
    // Nav links clicked on desktop keep desktop sidebar open
  } else {
    window.toggleSidebarCollapse();
  }
};

window.toggleSidebarDropdown = function (groupHeader) {
  const group = groupHeader.closest('.sidebar-dropdown-group');
  if (!group) return;

  const wasOpen = group.classList.contains('open');
  document.querySelectorAll('.sidebar-dropdown-group').forEach(g => {
    if (g !== group) g.classList.remove('open');
  });
  group.classList.toggle('open', !wasOpen);
};

// Expose CarePulseAuth to window
window.CarePulseAuth = CarePulseAuth;

// --- Initial Bootstrapping ---

const BedsCapacityEngine = {
  data: {
    triage: { available: 14, total: 20, name: 'Emergency Triage Beds', dept: 'Trauma Wing - Ground Flr', icon: '🚨' },
    icu: { available: 4, total: 16, name: 'ICU & Critical Care', dept: 'Intensive Unit - 2nd Flr', icon: '🩺' },
    ventilator: { available: 3, total: 8, name: 'Advanced Ventilator Units', dept: 'Critical Respiratory Bay', icon: '🫁' },
    oxygen: { available: 22, total: 35, name: 'Oxygen Supported Beds', dept: 'In-Patient Ward - 1st Flr', icon: '💨' }
  },

  bloodReserves: [
    { group: 'O+', units: 18, status: 'Good' },
    { group: 'A+', units: 12, status: 'Adequate' },
    { group: 'B+', units: 24, status: 'Surplus' },
    { group: 'AB+', units: 8, status: 'Adequate' },
    { group: 'O-', units: 4, status: 'Rare Stock' }
  ],

  activeBay: 1,
  icuBays: {
    1: { name: 'Bay 01 (ICU-A)', hr: 78, spo2: '98%', bp: '122/80', rr: 16, iv: 68, rate: '75 ml/hr', fluid: 'Saline 0.9% NaCl', rhythm: 'Sinus Rhythm Normal' },
    2: { name: 'Bay 02 (ICU-B)', hr: 84, spo2: '96%', bp: '130/85', rr: 18, iv: 42, rate: '100 ml/hr', fluid: 'Ringer Lactate', rhythm: 'Mild Sinus Tachycardia' },
    3: { name: 'Bay 03 (Ventilator)', hr: 92, spo2: '99%', bp: '115/75', rr: 20, iv: 85, rate: '50 ml/hr', fluid: 'Dextrose 5% Water', rhythm: 'Controlled Mechanical Vent' },
    4: { name: 'Bay 04 (CCU)', hr: 72, spo2: '97%', bp: '118/78', rr: 15, iv: 55, rate: '60 ml/hr', fluid: 'Saline 0.9% NaCl', rhythm: 'Sinus Rhythm Stable' }
  },

  ecgAnimId: null,
  ecgX: 0,
  ecgPrevY: 55,

  init() {
    this.render();
    // Simulate live heartbeat capacity updates every 45s
    setInterval(() => {
      this.simulateFluctuation();
    }, 45000);
  },

  render() {
    const container = document.getElementById('beds-capacity-grid');
    if (!container) return;

    container.innerHTML = Object.entries(this.data).map(([key, item]) => {
      const pct = Math.round((item.available / item.total) * 100);
      let statusClass = 'status-good';
      let statusText = '🟢 Available';
      if (pct < 30) {
        statusClass = 'status-critical';
        statusText = '🔴 Critical Low';
      } else if (pct < 50) {
        statusClass = 'status-warn';
        statusText = '🟡 Limited';
      }

      return `
        <div class="bed-capacity-card" id="bed-card-${key}">
          <div class="bed-card-header">
            <div class="bed-type-info">
              <div class="bed-type-icon">${item.icon}</div>
              <div>
                <div class="bed-type-name">${item.name}</div>
                <div class="bed-type-dept">${item.dept}</div>
              </div>
            </div>
            <span class="badge ${statusClass === 'status-good' ? 'badge-confirmed' : statusClass === 'status-warn' ? 'badge-waiting' : 'badge-cancelled'}">${statusText}</span>
          </div>

          <div class="bed-stat-counter">
            <span class="bed-stat-num" id="bed-num-${key}">${item.available}</span>
            <span class="bed-stat-total">/ ${item.total} Units Available</span>
          </div>

          <div class="bed-meter-track">
            <div class="bed-meter-fill ${statusClass}" id="bed-fill-${key}" style="width: ${pct}%;"></div>
          </div>

          <div class="bed-footer-meta">
            <span style="color: var(--slate-400); font-size: 0.72rem;">Live Auto-Sync</span>
            <span style="color: var(--primary); font-weight: 700;">${pct}% Available</span>
          </div>
        </div>
      `;
    }).join('');

    // Render Blood Bank Strip
    const bloodContainer = document.getElementById('blood-units-container');
    if (bloodContainer) {
      bloodContainer.innerHTML = this.bloodReserves.map(b => `
        <div class="blood-group-chip">
          <span style="font-weight: 800;">${b.group}</span>: ${b.units} Units (${b.status})
        </div>
      `).join('');
    }

    this.updateICUDisplay();
  },

  selectICUBay(bayId) {
    this.activeBay = bayId;
    for (let i = 1; i <= 4; i++) {
      const btn = document.getElementById(`btn-icu-bay-${i}`);
      if (btn) btn.classList.toggle('active', i === bayId);
    }
    this.updateICUDisplay();
  },

  updateICUDisplay() {
    const bay = this.icuBays[this.activeBay] || this.icuBays[1];
    const hrEl = document.getElementById('icu-stat-hr');
    const spo2El = document.getElementById('icu-stat-spo2');
    const bpEl = document.getElementById('icu-stat-bp');
    const rrEl = document.getElementById('icu-stat-rr');
    const rhythmEl = document.getElementById('icu-ecg-status');
    const ivLabel = document.getElementById('icu-iv-label');
    const ivFill = document.getElementById('icu-iv-fill');

    if (hrEl) hrEl.innerText = bay.hr;
    if (spo2El) spo2El.innerText = bay.spo2;
    if (bpEl) bpEl.innerText = bay.bp;
    if (rrEl) rrEl.innerText = bay.rr;
    if (rhythmEl) rhythmEl.innerText = `Rhythm: ${bay.rhythm}`;
    if (ivLabel) ivLabel.innerText = `${bay.iv}% Remaining • ${bay.rate}`;
    if (ivFill) ivFill.style.width = `${bay.iv}%`;
  },

  startECGMonitor() {
    this.stopECGMonitor();
    const canvas = document.getElementById('icu-ecg-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.parentElement ? canvas.parentElement.clientWidth - 16 : 580;
    canvas.height = 110;
    ctx.fillStyle = '#02060d';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    this.ecgX = 0;
    this.ecgPrevY = canvas.height / 2;

    const baseLine = canvas.height / 2;
    const renderFrame = () => {
      const w = canvas.width;
      const h = canvas.height;
      
      // Clear a small leading gap
      ctx.fillStyle = '#02060d';
      ctx.fillRect(this.ecgX, 0, 16, h);

      // Compute P-Q-R-S-T curve based on cycle phase (cycle repeats every 80px)
      const phase = this.ecgX % 80;
      let targetY = baseLine;

      if (phase >= 18 && phase < 26) {
        // P Wave
        targetY = baseLine - 6 * Math.sin(((phase - 18) / 8) * Math.PI);
      } else if (phase >= 32 && phase < 35) {
        // Q dip
        targetY = baseLine + 5;
      } else if (phase >= 35 && phase < 40) {
        // R peak (tall spike)
        targetY = baseLine - 36;
      } else if (phase >= 40 && phase < 44) {
        // S dip
        targetY = baseLine + 12;
      } else if (phase >= 54 && phase < 66) {
        // T wave
        targetY = baseLine - 10 * Math.sin(((phase - 54) / 12) * Math.PI);
      } else {
        // Baseline noise
        targetY = baseLine + (Math.random() * 2 - 1);
      }

      ctx.beginPath();
      ctx.strokeStyle = '#22c55e';
      ctx.shadowColor = '#4ade80';
      ctx.shadowBlur = 6;
      ctx.lineWidth = 2.2;
      ctx.lineCap = 'round';
      ctx.moveTo(this.ecgX === 0 ? 0 : this.ecgX - 2, this.ecgPrevY);
      ctx.lineTo(this.ecgX, targetY);
      ctx.stroke();
      ctx.shadowBlur = 0;

      this.ecgPrevY = targetY;
      this.ecgX += 2;
      if (this.ecgX >= w) {
        this.ecgX = 0;
      }

      this.ecgAnimId = requestAnimationFrame(renderFrame);
    };

    this.ecgAnimId = requestAnimationFrame(renderFrame);
  },

  stopECGMonitor() {
    if (this.ecgAnimId) {
      cancelAnimationFrame(this.ecgAnimId);
      this.ecgAnimId = null;
    }
  },

  reserveCriticalBed() {
    const bay = this.icuBays[this.activeBay] || this.icuBays[1];
    showToast(`🚨 Emergency Allocation Initialized for ${bay.name}. Triage Nurse & Physician dispatched.`, 'info');
    setTimeout(() => {
      closeBedsModal();
      if (typeof openBookingLayer === 'function') {
        openBookingLayer();
        const reasonInput = document.getElementById('booking-reason');
        if (reasonInput) reasonInput.value = `Critical Care ICU Admission Request (${bay.name})`;
      }
    }, 900);
  },

  simulateFluctuation() {
    // Minor fluctuation to show judges live real-time synchronization
    const keys = Object.keys(this.data);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    const delta = Math.random() > 0.5 ? 1 : -1;
    const item = this.data[randomKey];
    if (item.available + delta > 1 && item.available + delta < item.total) {
      item.available += delta;
      const numEl = document.getElementById(`bed-num-${randomKey}`);
      const fillEl = document.getElementById(`bed-fill-${randomKey}`);
      if (numEl) numEl.innerText = item.available;
      if (fillEl) fillEl.style.width = `${Math.round((item.available / item.total) * 100)}%`;
    }

    // Fluctuate active bay vitals slightly
    const bay = this.icuBays[this.activeBay];
    if (bay) {
      bay.hr = Math.max(65, Math.min(105, bay.hr + (Math.floor(Math.random() * 3) - 1)));
      const hrEl = document.getElementById('icu-stat-hr');
      if (hrEl) hrEl.innerText = bay.hr;
    }
  }
};

window.clearAllDemoData = function () {
  const confirmed = window.confirm('Are you sure you want to permanently erase all demo data (appointments, active tokens, and session history) from this browser?');
  if (!confirmed) return;

  const knownKeys = [
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
  ];
  knownKeys.forEach(k => {
    try { localStorage.removeItem(k); } catch (e) {}
  });

  const toRemove = [];
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k && (k.startsWith('carepulse_') || k.startsWith('carepulse-'))) {
      toRemove.push(k);
    }
  }
  toRemove.forEach(k => {
    try { localStorage.removeItem(k); } catch (e) {}
  });

  try {
    sessionStorage.removeItem('carepulse_auth_user');
    sessionStorage.removeItem('carepulse_last_active');
  } catch (e) {}

  if (typeof state !== 'undefined') {
    state.userAppointments = [];
    state.bookedSlotsCache = {};
  }

  if (typeof CarePulseAuth !== 'undefined') {
    CarePulseAuth.sessionUser = null;
    if (typeof CarePulseAuth.updateProfileUI === 'function') {
      CarePulseAuth.updateProfileUI();
    }
  }

  if (typeof window.renderMyBookingsModal === 'function') {
    window.renderMyBookingsModal();
  }
  if (typeof window.renderMyBookingsBadge === 'function') {
    window.renderMyBookingsBadge();
  }
  if (typeof window.renderLiveOPDBoard === 'function') {
    window.renderLiveOPDBoard();
  }

  if (typeof showToast === 'function') {
    showToast('All CarePulse demo data has been cleared from this browser.', 'info');
  }
};

// Initial Bootstrapping
document.addEventListener('DOMContentLoaded', () => {
  // Enforce authentication gate & load session
  CarePulseAuth.init();

  // Load stored appointments
  try {
    const saved = localStorage.getItem('carepulse_appointments');
    if (saved) {
      state.userAppointments = JSON.parse(saved);
    }
  } catch (e) {
    state.userAppointments = [];
  }

  renderLiveOPDBoard();
  renderDoctorCards();
  renderDateRibbon();
  populateDoctorDropdowns();
  updateDoctorInfoBanner();
  renderSlots();
  setupBookingForms();
  setupTracker();
  setupSpecialtyFilters();
  renderMyBookingsBadge();
  setupModalDismissals();

  // Initialize Competition Winning Engines
  ThemeEngine.init();
  LanguageEngine.init();
  BedsCapacityEngine.init();

  // Initialize UI/UX, Navigation & Search Engines
  PaletteEngine.init();
  FontScaleEngine.init();
  CategoryScrollSpy.init();
  SpotlightSearchEngine.init();
  FloatingTokenTracker.init();

  // Initialize Voice AI & Real Public Address Audio Engines
  PublicAddressEngine.init();
  VoiceAIEngine.init();

  // Enter key support for AI Symptom Chatbot
  const chatInput = document.getElementById('chat-user-input');
  if (chatInput) {
    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        sendChatMessage();
      }
    });
  }

  // Mobile sidebar toggle button
  const sidebarToggle = document.getElementById('sidebar-mobile-toggle');
  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', () => {
      toggleLeftSidebar();
    });
  }

  // Backdrop click to close sidebar
  const sidebarBackdrop = document.getElementById('sidebar-backdrop');
  if (sidebarBackdrop) {
    sidebarBackdrop.addEventListener('click', () => {
      toggleLeftSidebar(true);
    });
  }

  // Restore saved sidebar collapsed state on desktop
  try {
    const savedSidebarState = localStorage.getItem('carepulse_sidebar_collapsed');
    if (savedSidebarState === 'true' && window.innerWidth >= 1024) {
      document.body.classList.add('sidebar-collapsed');
    }
  } catch (e) {}
  updateSidebarToggleState();

  // Keyboard shortcuts: Ctrl+\ for Sidebar, Ctrl+M for Voice AI
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey && e.key === '\\') || (e.altKey && (e.key === 's' || e.key === 'S'))) {
      e.preventDefault();
      toggleSidebarCollapse();
    }
    if (e.ctrlKey && (e.key === 'm' || e.key === 'M')) {
      e.preventDefault();
      VoiceAIEngine.open();
    }
  });
});


/* ==========================================================================
   COMPETITION WINNING JAVASCRIPT MODULES
   1. ThemeEngine (Dark / Light Theme)
   2. LanguageEngine (English / Hindi / Punjabi)
   3. BedsCapacityEngine (Live ICU & Bed Occupancy)
   4. EmergencySOSEngine (1-Click Audio Siren & Live GPS Dispatch)
   5. HealthCalculatorEngine (Clinical Health Risk & BMI / Vitals)
   6. WhatsApp Token Sharing & Auto-Booking from AI Chatbot
   ========================================================================== */

// --- 1. Theme Engine ---


// Centralized Delegated Action Dispatcher
// --- Centralized Delegated Action Dispatcher ---
document.addEventListener('click', function (e) {
  const target = e.target.closest('[data-action]');
  if (!target) return;

  const action = target.getAttribute('data-action');
  const d = target.dataset;

  if (target.tagName === 'A' && (target.getAttribute('href') === '#' || target.getAttribute('href')?.startsWith('javascript:'))) {
    e.preventDefault();
  }

  switch (action) {
    case 'open-booking-layer':
      if (typeof window.openBookingLayer === 'function') window.openBookingLayer(d.doctorId || null);
      break;
    case 'close-booking-layer':
      if (typeof window.closeBookingLayer === 'function') window.closeBookingLayer();
      break;
    case 'open-emergency-modal':
      if (typeof window.openEmergencyModal === 'function') window.openEmergencyModal();
      break;
    case 'close-emergency-modal':
      if (typeof window.closeEmergencyModal === 'function') window.closeEmergencyModal();
      break;
    case 'open-emergency-sos':
      if (typeof window.openEmergencySOS === 'function') window.openEmergencySOS();
      break;
    case 'close-emergency-sos':
      if (typeof window.closeEmergencySOS === 'function') window.closeEmergencySOS();
      break;
    case 'trigger-emergency-sos':
      if (typeof window.triggerEmergencySOS === 'function') window.triggerEmergencySOS();
      break;
    case 'open-my-bookings-modal':
      if (typeof window.openMyBookingsModal === 'function') window.openMyBookingsModal();
      break;
    case 'close-my-bookings-modal':
      if (typeof window.closeMyBookingsModal === 'function') window.closeMyBookingsModal();
      break;
    case 'open-live-queue-modal':
      if (typeof window.openLiveQueueModal === 'function') window.openLiveQueueModal();
      break;
    case 'close-live-queue-modal':
      if (typeof window.closeLiveQueueModal === 'function') window.closeLiveQueueModal();
      break;
    case 'open-doctors-modal':
      if (typeof window.openDoctorsModal === 'function') window.openDoctorsModal(d.specialty || null);
      break;
    case 'close-doctors-modal':
      if (typeof window.closeDoctorsModal === 'function') window.closeDoctorsModal();
      break;
    case 'open-beds-modal':
      if (typeof window.openBedsModal === 'function') window.openBedsModal();
      break;
    case 'close-beds-modal':
      if (typeof window.closeBedsModal === 'function') window.closeBedsModal();
      break;
    case 'open-track-token-modal':
      if (typeof window.openTrackTokenModal === 'function') window.openTrackTokenModal();
      break;
    case 'close-track-token-modal':
      if (typeof window.closeTrackTokenModal === 'function') window.closeTrackTokenModal();
      break;
    case 'open-insurance-modal':
      if (typeof window.openInsuranceModal === 'function') window.openInsuranceModal();
      break;
    case 'close-insurance-modal':
      if (typeof window.closeInsuranceModal === 'function') window.closeInsuranceModal();
      break;
    case 'open-packages-modal':
      if (typeof window.openPackagesModal === 'function') window.openPackagesModal();
      break;
    case 'close-packages-modal':
      if (typeof window.closePackagesModal === 'function') window.closePackagesModal();
      break;
    case 'open-pharmacy-modal':
      if (typeof window.openPharmacyModal === 'function') window.openPharmacyModal();
      break;
    case 'close-pharmacy-modal':
      if (typeof window.closePharmacyModal === 'function') window.closePharmacyModal();
      break;
    case 'open-lab-report-modal':
      if (typeof window.openLabReportModal === 'function') window.openLabReportModal(d.uhid || 'UHID-98214');
      break;
    case 'close-lab-report-modal':
      if (typeof window.closeLabReportModal === 'function') window.closeLabReportModal();
      break;
    case 'open-health-card-modal':
      if (typeof window.openHealthCardModal === 'function') window.openHealthCardModal(d.profile || 'carepulse-self');
      break;
    case 'close-health-card-modal':
      if (typeof window.closeHealthCardModal === 'function') window.closeHealthCardModal();
      break;
    case 'open-wayfinder-modal':
      if (typeof window.openWayfinderModal === 'function') window.openWayfinderModal();
      break;
    case 'close-wayfinder-modal':
      if (typeof window.closeWayfinderModal === 'function') window.closeWayfinderModal();
      break;
    case 'open-teleconsult-modal':
    case 'open-tele-consult-modal':
      if (typeof window.openTeleConsultModal === 'function') window.openTeleConsultModal();
      break;
    case 'close-teleconsult-modal':
      if (typeof window.closeTeleConsultModal === 'function') window.closeTeleConsultModal();
      break;
    case 'open-reception-desk':
      if (typeof window.openReceptionDesk === 'function') window.openReceptionDesk();
      break;
    case 'close-reception-desk':
      if (typeof window.closeReceptionDesk === 'function') window.closeReceptionDesk();
      break;
    case 'open-spotlight-search':
      if (typeof window.openSpotlightSearch === 'function') window.openSpotlightSearch();
      break;
    case 'close-spotlight-search':
      if (typeof window.closeSpotlightSearch === 'function') window.closeSpotlightSearch();
      break;
    case 'open-health-calculator':
      if (typeof window.openHealthCalculator === 'function') window.openHealthCalculator();
      break;
    case 'close-health-calculator':
      if (typeof window.closeHealthCalculator === 'function') window.closeHealthCalculator();
      break;
    case 'open-guidelines-modal':
      if (typeof window.openGuidelinesModal === 'function') window.openGuidelinesModal();
      break;
    case 'close-guidelines-modal':
      if (typeof window.closeGuidelinesModal === 'function') window.closeGuidelinesModal();
      break;
    case 'close-token-modal':
      if (typeof window.closeTokenModal === 'function') window.closeTokenModal();
      break;
    case 'close-package-booking-modal':
      if (typeof window.closePackageBookingModal === 'function') window.closePackageBookingModal();
      break;
    case 'close-cancel-modal':
      if (typeof window.closeCancelModal === 'function') window.closeCancelModal();
      break;
    case 'confirm-cancellation':
      if (typeof window.confirmCancellation === 'function') window.confirmCancellation();
      break;
    case 'close-reschedule-modal':
      if (typeof window.closeRescheduleModal === 'function') window.closeRescheduleModal();
      break;
    case 'confirm-reschedule':
      if (typeof window.confirmReschedule === 'function') window.confirmReschedule();
      break;
    case 'cancel-appointment':
      if (typeof window.cancelAppointment === 'function') window.cancelAppointment();
      break;
    case 'reschedule-appointment':
      if (typeof window.rescheduleAppointment === 'function') window.rescheduleAppointment();
      break;
    case 'toggle-theme':
      if (typeof window.toggleTheme === 'function') window.toggleTheme();
      break;
    case 'toggle-sidebar-collapse':
      if (typeof window.toggleSidebarCollapse === 'function') window.toggleSidebarCollapse();
      break;
    case 'toggle-sidebar-dropdown':
      if (typeof window.toggleSidebarDropdown === 'function') window.toggleSidebarDropdown(target);
      break;
    case 'close-left-sidebar':
      if (typeof window.toggleLeftSidebar === 'function') window.toggleLeftSidebar(true);
      break;
    case 'close-sidebar-mobile':
      if (window.innerWidth < 1024 && typeof window.toggleLeftSidebar === 'function') window.toggleLeftSidebar(true);
      break;
    case 'toggle-chat-widget':
      if (typeof window.toggleChatWidget === 'function') window.toggleChatWidget();
      break;
    case 'close-chat-widget':
      if (typeof window.closeChatWidget === 'function') window.closeChatWidget();
      break;
    case 'send-chat-message':
      if (typeof window.sendChatMessage === 'function') window.sendChatMessage();
      break;
    case 'print-token-slip':
      if (typeof window.printTokenSlip === 'function') window.printTokenSlip();
      break;
    case 'share-token-whatsapp':
      if (typeof window.shareTokenWhatsApp === 'function') window.shareTokenWhatsApp();
      break;
    case 'track-generated-token-now':
      if (typeof window.trackGeneratedTokenNow === 'function') window.trackGeneratedTokenNow();
      break;
    case 'download-lab-report-pdf':
      if (typeof window.downloadLabReportPDF === 'function') window.downloadLabReportPDF();
      break;
    case 'search-lab-report':
      if (typeof window.searchLabReport === 'function') window.searchLabReport();
      break;
    case 'render-reception-dashboard':
      if (typeof window.renderReceptionDashboard === 'function') window.renderReceptionDashboard();
      break;
    case 'logout-reception-staff':
      if (typeof window.logoutReceptionStaff === 'function') window.logoutReceptionStaff();
      break;
    case 'calculate-health-risk':
      if (typeof window.calculateHealthRisk === 'function') window.calculateHealthRisk();
      break;
    case 'floating-token-dismiss':
      if (window.FloatingTokenTracker && typeof window.FloatingTokenTracker.dismiss === 'function') window.FloatingTokenTracker.dismiss();
      break;
    case 'pa-toggle-mute':
      if (window.PublicAddressEngine && typeof window.PublicAddressEngine.toggleMute === 'function') window.PublicAddressEngine.toggleMute();
      break;
    case 'sos-copy-coords':
      if (window.EmergencySOSEngine && typeof window.EmergencySOSEngine.copyCoordinatesFor108 === 'function') window.EmergencySOSEngine.copyCoordinatesFor108();
      break;
    case 'sos-share-wa':
      if (window.EmergencySOSEngine && typeof window.EmergencySOSEngine.shareEmergencyWhatsApp === 'function') window.EmergencySOSEngine.shareEmergencyWhatsApp();
      break;
    case 'sos-toggle-demo':
      if (window.EmergencySOSEngine && typeof window.EmergencySOSEngine.toggleSimulationDemo === 'function') window.EmergencySOSEngine.toggleSimulationDemo();
      break;
    case 'auth-send-otp':
      if (window.CarePulseAuth && typeof window.CarePulseAuth.sendOTP === 'function') window.CarePulseAuth.sendOTP();
      break;
    case 'auth-verify-otp':
      if (window.CarePulseAuth && typeof window.CarePulseAuth.verifyOTP === 'function') window.CarePulseAuth.verifyOTP();
      break;
    case 'auth-resend-otp':
      if (window.CarePulseAuth && typeof window.CarePulseAuth.resendOTP === 'function') window.CarePulseAuth.resendOTP();
      break;
    case 'auth-close-modal':
      if (window.CarePulseAuth && typeof window.CarePulseAuth.closeModal === 'function') window.CarePulseAuth.closeModal();
      break;
    case 'auth-logout':
      if (window.CarePulseAuth && typeof window.CarePulseAuth.logout === 'function') window.CarePulseAuth.logout();
      break;
    case 'auth-back':
      if (window.CarePulseAuth && typeof window.CarePulseAuth.backToInput === 'function') window.CarePulseAuth.backToInput();
      break;
    case 'auth-switch-tab':
      if (window.CarePulseAuth && typeof window.CarePulseAuth.switchTab === 'function') window.CarePulseAuth.switchTab(d.tab);
      break;
    case 'beds-reserve':
      if (window.BedsCapacityEngine && typeof window.BedsCapacityEngine.reserveCriticalBed === 'function') window.BedsCapacityEngine.reserveCriticalBed();
      break;
    case 'beds-select-bay':
      if (window.BedsCapacityEngine && typeof window.BedsCapacityEngine.selectICUBay === 'function') window.BedsCapacityEngine.selectICUBay(parseInt(d.bay, 10));
      break;
    case 'wayfinder-share-wa':
      if (window.CampusWayfinderEngine && typeof window.CampusWayfinderEngine.shareRouteWhatsApp === 'function') window.CampusWayfinderEngine.shareRouteWhatsApp();
      break;
    case 'wayfinder-speak':
      if (window.CampusWayfinderEngine && typeof window.CampusWayfinderEngine.speakDirections === 'function') window.CampusWayfinderEngine.speakDirections();
      break;
    case 'wayfinder-floor':
      if (window.CampusWayfinderEngine && typeof window.CampusWayfinderEngine.setFloor === 'function') window.CampusWayfinderEngine.setFloor(d.floor);
      break;
    case 'healthcard-download':
      if (window.DigitalHealthCardEngine && typeof window.DigitalHealthCardEngine.downloadPass === 'function') window.DigitalHealthCardEngine.downloadPass();
      break;
    case 'healthcard-print':
      if (window.DigitalHealthCardEngine && typeof window.DigitalHealthCardEngine.printPass === 'function') window.DigitalHealthCardEngine.printPass();
      break;
    case 'healthcard-wallet':
      if (window.DigitalHealthCardEngine && typeof window.DigitalHealthCardEngine.addToWalletDemo === 'function') window.DigitalHealthCardEngine.addToWalletDemo();
      break;
    case 'healthcard-profile':
      if (window.DigitalHealthCardEngine && typeof window.DigitalHealthCardEngine.switchProfile === 'function') window.DigitalHealthCardEngine.switchProfile(d.profile);
      break;
    case 'tele-mic':
      if (window.TeleConsultEngine && typeof window.TeleConsultEngine.toggleMic === 'function') window.TeleConsultEngine.toggleMic();
      break;
    case 'tele-cam':
      if (window.TeleConsultEngine && typeof window.TeleConsultEngine.toggleCamera === 'function') window.TeleConsultEngine.toggleCamera();
      break;
    case 'tele-vitals':
      if (window.TeleConsultEngine && typeof window.TeleConsultEngine.simulateVitalsSpike === 'function') window.TeleConsultEngine.simulateVitalsSpike();
      break;
    case 'tele-end':
      if (window.TeleConsultEngine && typeof window.TeleConsultEngine.endConsultation === 'function') window.TeleConsultEngine.endConsultation();
      break;
    case 'tele-add-medicine':
      if (window.TeleConsultEngine && typeof window.TeleConsultEngine.addSelectedMedicine === 'function') window.TeleConsultEngine.addSelectedMedicine();
      break;
    case 'tele-order-pharmacy':
      if (window.TeleConsultEngine && typeof window.TeleConsultEngine.orderPrescriptionPharmacy === 'function') window.TeleConsultEngine.orderPrescriptionPharmacy();
      break;
    case 'tele-share-wa':
      if (window.TeleConsultEngine && typeof window.TeleConsultEngine.sharePrescriptionWhatsApp === 'function') window.TeleConsultEngine.sharePrescriptionWhatsApp();
      break;
    case 'tele-download-pdf':
      if (window.TeleConsultEngine && typeof window.TeleConsultEngine.downloadPrescriptionPDF === 'function') window.TeleConsultEngine.downloadPrescriptionPDF();
      break;
    case 'voice-ai-open':
      if (window.VoiceAIEngine && typeof window.VoiceAIEngine.open === 'function') window.VoiceAIEngine.open();
      break;
    case 'voice-ai-close':
      if (window.VoiceAIEngine && typeof window.VoiceAIEngine.close === 'function') window.VoiceAIEngine.close();
      break;
    case 'voice-ai-toggle':
      if (window.VoiceAIEngine && typeof window.VoiceAIEngine.toggleListening === 'function') window.VoiceAIEngine.toggleListening();
      break;
    case 'voice-ai-backdrop-close':
      if (e.target === target && window.VoiceAIEngine && typeof window.VoiceAIEngine.close === 'function') window.VoiceAIEngine.close();
      break;
    case 'voice-ai-lang':
      if (window.VoiceAIEngine && typeof window.VoiceAIEngine.setLanguage === 'function') window.VoiceAIEngine.setLanguage(d.lang, target);
      break;
    case 'voice-ai-cmd':
      if (window.VoiceAIEngine && typeof window.VoiceAIEngine.executeCommand === 'function') window.VoiceAIEngine.executeCommand(d.cmd);
      break;
    case 'gateway-save':
      if (window.DeliveryGateway && typeof window.DeliveryGateway.saveFromForm === 'function') window.DeliveryGateway.saveFromForm();
      break;
    case 'gateway-test':
      if (window.DeliveryGateway && typeof window.DeliveryGateway.testDispatchCurrent === 'function') window.DeliveryGateway.testDispatchCurrent();
      break;
    case 'close-delivery-gateway':
      if (typeof window.closeDeliveryGatewayModal === 'function') window.closeDeliveryGatewayModal();
      break;
    case 'gateway-mode':
      if (window.DeliveryGateway && typeof window.DeliveryGateway.selectMode === 'function') window.DeliveryGateway.selectMode(d.mode);
      break;
    case 'trigger-rx-upload':
      document.getElementById('rx-file-input')?.click();
      break;
    case 'open-privacy-modal':
      if (typeof window.openPrivacyModal === 'function') window.openPrivacyModal();
      else document.getElementById('privacy-modal')?.classList.add('active');
      break;
    case 'close-privacy-modal':
      if (typeof window.closePrivacyModal === 'function') window.closePrivacyModal();
      else document.getElementById('privacy-modal')?.classList.remove('active');
      break;
    case 'open-terms-modal':
      if (typeof window.openTermsModal === 'function') window.openTermsModal();
      else document.getElementById('terms-modal')?.classList.add('active');
      break;
    case 'close-terms-modal':
      if (typeof window.closeTermsModal === 'function') window.closeTermsModal();
      else document.getElementById('terms-modal')?.classList.remove('active');
      break;
    case 'emergency-to-sos':
      if (typeof window.closeEmergencyModal === 'function') window.closeEmergencyModal();
      if (typeof window.triggerEmergencySOS === 'function') window.triggerEmergencySOS();
      break;
    case 'queue-to-booking':
      if (typeof window.closeLiveQueueModal === 'function') window.closeLiveQueueModal();
      if (typeof window.openBookingLayer === 'function') window.openBookingLayer();
      break;
    case 'queue-to-track':
      if (typeof window.closeLiveQueueModal === 'function') window.closeLiveQueueModal();
      if (typeof window.openTrackTokenModal === 'function') window.openTrackTokenModal();
      break;
    case 'calc-to-package':
      if (typeof window.closeHealthCalculator === 'function') window.closeHealthCalculator();
      if (typeof window.bookHealthPackage === 'function') window.bookHealthPackage(d.pkg || 'pkg-exec');
      break;
    case 'calc-to-booking':
      if (typeof window.closeHealthCalculator === 'function') window.closeHealthCalculator();
      if (typeof window.openBookingLayer === 'function') window.openBookingLayer();
      break;
    case 'set-active-dock':
      if (typeof window.setActiveDock === 'function') window.setActiveDock(d.tab);
      break;
    case 'filter-queue-specialty':
      if (typeof window.filterQueueSpecialty === 'function') window.filterQueueSpecialty(d.specialty);
      break;
    case 'set-language':
      if (typeof window.setLanguage === 'function') window.setLanguage(d.lang);
      break;
    case 'set-font-scale':
      if (typeof window.setFontScale === 'function') window.setFontScale(d.scale);
      break;
    case 'chat-chip':
      if (typeof window.handleChatChip === 'function') window.handleChatChip(d.text);
      break;
    case 'download-token-ticket':
      if (typeof window.downloadCurrentTokenTicket === 'function') window.downloadCurrentTokenTicket(d.format);
      break;
    case 'add-to-calendar':
      if (typeof window.addToCalendar === 'function') window.addToCalendar('', d.mode);
      break;
    case 'book-package':
      if (typeof window.closePackagesModal === 'function') window.closePackagesModal();
      if (typeof window.bookHealthPackage === 'function') window.bookHealthPackage(d.pkg);
      break;
    case 'clear-demo-data':
      if (typeof window.clearAllDemoData === 'function') window.clearAllDemoData();
      break;
    case 'open-delivery-gateway':
      if (typeof window.openDeliveryGatewayModal === 'function') window.openDeliveryGatewayModal();
      break;
    case 'select-date':
      if (typeof window.selectDate === 'function') window.selectDate(d.date, d.full);
      break;
    case 'select-slot':
      if (typeof window.selectSlot === 'function') window.selectSlot(d.time, d.session);
      break;
    case 'reopen-token-slip':
      if (typeof window.reopenTokenSlip === 'function') window.reopenTokenSlip(d.id);
      break;
    case 'download-token':
      if (typeof window.downloadTicketById === 'function') window.downloadTicketById(d.id, 'png');
      break;
    case 'cancel-appointment':
      if (typeof window.cancelAppointment === 'function') window.cancelAppointment(d.id);
      break;
    case 'queue-book-doc':
      if (typeof window.closeLiveQueueModal === 'function') window.closeLiveQueueModal();
      if (typeof window.openBookingLayer === 'function') window.openBookingLayer(d.id);
      break;
    case 'reset-doctor-filters':
      if (typeof window.resetDoctorFilters === 'function') window.resetDoctorFilters();
      break;
    case 'open-booking-doc':
      if (typeof window.openBookingLayer === 'function') window.openBookingLayer(d.id);
      break;
    case 'open-teleconsult-doc':
      if (typeof window.openTeleConsultModal === 'function') window.openTeleConsultModal(d.id);
      break;
    case 'call-next-patient':
      if (typeof window.callNextPatientToken === 'function') window.callNextPatientToken(d.id);
      break;
    case 'issue-walkin-token':
      if (typeof window.issueWalkinToken === 'function') window.issueWalkinToken(d.id);
      break;
    case 'mark-token-completed':
      if (typeof window.markTokenCompleted === 'function') window.markTokenCompleted(d.id);
      break;
    case 'mark-token-no-show':
      if (typeof window.markTokenNoShow === 'function') window.markTokenNoShow(d.id);
      break;
    case 'verify-lab-report-otp':
      if (typeof window.verifyLabReportOTP === 'function') window.verifyLabReportOTP();
      break;
    case 'autofill-lab-otp':
      {
        const inp = document.getElementById('report-otp-input');
        if (inp) inp.value = '123456';
        if (typeof window.verifyLabReportOTP === 'function') window.verifyLabReportOTP();
      }
      break;
    case 'remove-prescription':
      if (window.TeleConsultEngine && typeof window.TeleConsultEngine.removePrescription === 'function') {
        window.TeleConsultEngine.removePrescription(parseInt(d.idx, 10));
      }
      break;
    case 'print-rx':
      window.print();
      break;
    case 'wayfinder-room-click':
      if (window.CampusWayfinderEngine && typeof window.CampusWayfinderEngine.onRoomClick === 'function') {
        window.CampusWayfinderEngine.onRoomClick(d.id);
      }
      break;
    case 'read-aloud-chat':
      if (typeof window.readAloudChatText === 'function') window.readAloudChatText(target);
      break;
    case 'chat-book-opd':
      if (typeof window.openBookingLayer === 'function') window.openBookingLayer(d.doctor || null);
      if (typeof window.closeChatWidget === 'function') window.closeChatWidget();
      break;
    case 'chat-open-pharmacy':
      if (typeof window.openPharmacyModal === 'function') window.openPharmacyModal();
      if (typeof window.closeChatWidget === 'function') window.closeChatWidget();
      break;
    case 'chat-open-sos':
      if (typeof window.openEmergencySOS === 'function') window.openEmergencySOS();
      if (typeof window.closeChatWidget === 'function') window.closeChatWidget();
      break;
    case 'chat-book-package':
      if (typeof window.bookHealthPackage === 'function') window.bookHealthPackage(d.package || 'pkg-basic');
      if (typeof window.closeChatWidget === 'function') window.closeChatWidget();
      break;
    case 'auto-book-from-chat':
      if (typeof window.autoBookDoctorFromChat === 'function') window.autoBookDoctorFromChat(d.doctor, d.condition);
      break;
    case 'chat-open-lab':
      if (typeof window.openLabReportModal === 'function') window.openLabReportModal();
      if (typeof window.closeChatWidget === 'function') window.closeChatWidget();
      break;
    case 'dismiss-simulated-banner':
      target.closest('.simulated-otp-banner')?.remove();
      break;
    case 'autofill-otp':
      if (window.CarePulseAuth && typeof window.CarePulseAuth.autoFillOTP === 'function') {
        window.CarePulseAuth.autoFillOTP(d.otp);
      }
      break;
    case 'copy-otp':
      if (navigator.clipboard) {
        navigator.clipboard.writeText(d.otp || '');
        if (typeof window.showToast === 'function') window.showToast('OTP ' + d.otp + ' copied!', 'success');
      }
      break;
    case 'toggle-medicine':
      if (typeof window.toggleMedicineSelection === 'function') window.toggleMedicineSelection(target, d.name, parseFloat(d.price));
      break;
  }

  if (d.closeSidebar === 'true') {
    if (window.innerWidth < 1024 && typeof window.toggleLeftSidebar === 'function') {
      window.toggleLeftSidebar(true);
    }
  }
});

// Register PWA Service Worker
if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(reg => {
        if (window.location.search.includes('dev=1')) {
          console.log('[SW] ServiceWorker registered with scope:', reg.scope);
        }
      })
      .catch(err => {
        if (window.location.search.includes('dev=1')) {
          console.log('[SW] ServiceWorker registration error:', err);
        }
      });
  });
}





