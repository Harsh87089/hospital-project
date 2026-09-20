// CarePulse Live OPD Queue & Reception Desk Engine
import { DOCTORS, DEMO_STAFF_PIN, state } from './config.js';
import { escapeHtml, showToast, playClinicChime } from './utils.js';

function renderQueueSkeletons(count = 4) {
  const container = document.getElementById('live-queue-cards');
  if (!container) return;
  container.innerHTML = Array(count).fill(0).map(() => `
    <div class="skeleton-card">
      <div style="display: flex; gap: 1rem; align-items: center;">
        <div class="skeleton-shimmer skeleton-avatar"></div>
        <div style="flex: 1; display: flex; flex-direction: column; gap: 0.5rem;">
          <div class="skeleton-shimmer skeleton-badge"></div>
          <div class="skeleton-shimmer skeleton-title"></div>
          <div class="skeleton-shimmer skeleton-text"></div>
        </div>
      </div>
      <div class="skeleton-shimmer skeleton-hud"></div>
      <div class="skeleton-shimmer skeleton-btn"></div>
    </div>
  `).join('');
}

function renderLiveOPDBoard() {
  const container = document.getElementById('live-queue-cards');
  if (!container) return;

  // Calculate high-level live metrics
  const totalChambers = DOCTORS.length;
  const totalServingNow = DOCTORS.reduce((sum, d) => sum + (d.currentServingToken || 0), 0);
  const totalIssuedToday = DOCTORS.reduce((sum, d) => sum + (d.totalTodayTokens || 0), 0);
  const avgWait = Math.round(DOCTORS.reduce((sum, d) => sum + (d.avgWaitPerPatient || 12), 0) / (DOCTORS.length || 1));

  // Update summary badges if present
  const statChambers = document.getElementById('queue-stat-chambers');
  if (statChambers) statChambers.innerText = `${totalChambers} Chambers`;

  const statTokens = document.getElementById('queue-stat-tokens');
  if (statTokens) statTokens.innerText = `${totalServingNow} / ${totalIssuedToday}`;

  const statWait = document.getElementById('queue-stat-wait');
  if (statWait) statWait.innerText = `~${avgWait} Mins`;

  // Filter based on selected specialty & search query
  const filter = state.queueSpecialty || 'all';
  const query = (state.queueSearch || '').toLowerCase().trim();

  const filtered = DOCTORS.filter(doc => {
    const matchesSpec = filter === 'all' || doc.specialtyKey === filter;
    if (!query) return matchesSpec;
    const matchesName = doc.name.toLowerCase().includes(query);
    const matchesSpecName = doc.specialty.toLowerCase().includes(query);
    const matchesRoom = (doc.room || '').toLowerCase().includes(query);
    return matchesSpec && (matchesName || matchesSpecName || matchesRoom);
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-state-card">
        <div class="empty-state-icon" aria-hidden="true">🩺</div>
        <div class="empty-state-title" data-i18n="empty_queue_title">No Active Consultation Chambers Found</div>
        <div class="empty-state-desc" data-i18n="empty_queue_desc">No active chamber matches "${escapeHtml(state.queueSearch)}". Try clearing your search query or switching to All Chambers.</div>
        <button class="btn btn-primary btn-sm" data-action="filter-queue-specialty" data-specialty="all" data-i18n="btn_reset_filters">
          Reset Chamber Filters
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(doc => {
    const nextToken = doc.currentServingToken + 1;
    const remaining = Math.max(0, doc.totalTodayTokens - doc.currentServingToken);
    const total = doc.totalTodayTokens || 25;
    const pct = Math.min(100, Math.round((doc.currentServingToken / total) * 100));

    let badgeClass = 'spec-gp';
    if (doc.specialtyKey === 'pediatrician') badgeClass = 'spec-ped';
    else if (doc.specialtyKey === 'dermatologist') badgeClass = 'spec-derma';
    else if (doc.specialtyKey === 'dentist') badgeClass = 'spec-dent';

    return `
      <div class="queue-doctor-card" data-doctor-id="${doc.id}">
        <!-- Card Header: Avatar, Name, Specialty, Room -->
        <div class="queue-card-header">
          <div class="queue-avatar-wrap">
            <img src="${doc.avatar}" alt="${doc.name}" class="queue-doc-avatar" loading="lazy" />
            <span class="queue-avatar-pulse" title="Doctor is active in consultation"></span>
          </div>
          <div class="queue-header-info">
            <div class="queue-card-badges">
              <span class="queue-specialty-badge ${badgeClass}">${doc.specialty}</span>
              <span class="queue-status-live">
                <span class="pulse-dot"></span> In Chamber
              </span>
            </div>
            <div class="queue-doc-name" title="${doc.name}">${doc.name}</div>
            <div class="queue-doc-meta">
              <span>${doc.experience || 'Specialist'}</span>
              <span class="queue-divider">•</span>
              <span class="queue-room"><i class="room-icon">📍</i> ${doc.room ? doc.room.split(',')[0] : 'Chamber'}</span>
            </div>
          </div>
        </div>

        <!-- Center Digital Display HUD -->
        <div class="queue-token-display">
          <div>
            <div class="token-label-sub">
              <span class="pulse-emerald-dot"></span> Now Serving
            </div>
            <div class="now-serving-token" id="serving-${doc.id}">#TK-${String(doc.currentServingToken).padStart(2, '0')}</div>
          </div>
          <div style="text-align: right;">
            <div class="token-label-sub">Next In Line</div>
            <div class="next-token-badge">#TK-${String(nextToken).padStart(2, '0')}</div>
          </div>
        </div>

        <!-- Progress of daily tokens -->
        <div class="queue-progress-container">
          <div class="queue-progress-labels">
            <span>Tokens Today: <strong>${doc.currentServingToken} / ${total}</strong></span>
            <span><strong>${pct}%</strong> Served</span>
          </div>
          <div class="queue-progress-track">
            <div class="queue-progress-fill" style="width: ${pct}%;"></div>
          </div>
        </div>

        <!-- Queue Stats: In Hall & Est Wait -->
        <div class="queue-footer-stats">
          <div>
            <span class="queue-stat-label">In Waiting Area:</span>
            <strong class="queue-stat-val">👥 ${remaining} patients</strong>
          </div>
          <div style="text-align: right;">
            <span class="queue-stat-label">Est. Wait Time:</span>
            <strong class="queue-stat-val">⏱️ ~${doc.avgWaitPerPatient} mins/pt</strong>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="queue-card-actions">
          <button class="btn-book-from-queue" data-action="queue-book-doc" data-id="${doc.id}" style="width: 100%; justify-content: center; font-weight: 700;" title="Book consultation appointment slot with this specialist">
            📅 Book Consultation Slot ➔
          </button>
        </div>
      </div>
    `;
  }).join('');
}

// Global Filter & Search handlers for Live Queue
const filterQueueSpecialty = window.filterQueueSpecialty = function (specialty) {
  state.queueSpecialty = specialty;
  document.querySelectorAll('.queue-chip').forEach(chip => {
    chip.classList.toggle('active', chip.dataset.queueSpecialty === specialty);
  });
  renderLiveOPDBoard();
};

const handleQueueSearch = window.handleQueueSearch = function (query) {
  state.queueSearch = query;
  renderLiveOPDBoard();
};

const toggleQueueAutoSim = window.toggleQueueAutoSim = function () {
  const btn = document.getElementById('btn-queue-auto-sim');
  if (state.queueAutoSimInterval) {
    clearInterval(state.queueAutoSimInterval);
    state.queueAutoSimInterval = null;
    if (btn) {
      btn.classList.remove('active');
      btn.innerHTML = '⚡ Auto-Simulate (Off)';
    }
    showToast('Auto-simulation paused', 'info');
  } else {
    showToast('Live Auto-simulation active! Chambers calling tokens every 7s with chimes', 'success');
    if (btn) {
      btn.classList.add('active');
      btn.innerHTML = '⏸️ Auto-Simulating...';
    }
    state.queueAutoSimInterval = setInterval(() => {
      const modal = document.getElementById('live-queue-modal');
      if (!modal || !modal.classList.contains('active')) {
        clearInterval(state.queueAutoSimInterval);
        state.queueAutoSimInterval = null;
        if (btn) {
          btn.classList.remove('active');
          btn.innerHTML = '⚡ Auto-Simulate (Off)';
        }
        return;
      }
      const randomDoc = DOCTORS[Math.floor(Math.random() * DOCTORS.length)];
      if (randomDoc) {
        simulateNextToken(randomDoc.id);
      }
    }, 7000);
  }
};

// Staff simulation to advance queue
const simulateNextToken = window.simulateNextToken = function (docId) {
  const doc = DOCTORS.find(d => d.id === docId);
  if (!doc) return;

  doc.currentServingToken++;
  if (doc.currentServingToken > doc.totalTodayTokens) {
    doc.totalTodayTokens = doc.currentServingToken + 4;
  }

  if (window.PublicAddressEngine) {
    PublicAddressEngine.announceToken(doc, doc.currentServingToken);
  } else {
    playClinicChime();
  }
  showToast(`Ding! ${doc.name} (${doc.room.split(',')[0]}) is now calling Token #TK-${String(doc.currentServingToken).padStart(2, '0')}`, 'success');
  renderLiveOPDBoard();

  // If user is tracking a token with this doctor, update tracker view
  const activeTrackerToken = document.getElementById('tracker-token-num')?.innerText;
  if (activeTrackerToken) {
    checkTokenLiveStatus(activeTrackerToken.replace('#', ''));
  }
};

function renderDoctorSkeletons(count = 4) {
  const grid = document.getElementById('doctors-grid');
  if (!grid) return;
  grid.innerHTML = Array(count).fill(0).map(() => `
    <div class="skeleton-card">
      <div style="display: flex; gap: 1rem; align-items: center;">
        <div class="skeleton-shimmer skeleton-avatar"></div>
        <div style="flex: 1; display: flex; flex-direction: column; gap: 0.5rem;">
          <div class="skeleton-shimmer skeleton-badge"></div>
          <div class="skeleton-shimmer skeleton-title"></div>
          <div class="skeleton-shimmer skeleton-text"></div>
        </div>
      </div>
      <div class="skeleton-shimmer" style="height: 40px; border-radius: 8px;"></div>
      <div class="skeleton-shimmer skeleton-btn"></div>
    </div>
  `).join('');
}

// --- Render Doctor Profile Cards ---
function renderDoctorCards() {
  const grid = document.getElementById('doctors-grid');
  if (!grid) return;

  const filtered = DOCTORS.filter(doc => {
    const matchesSpecialty = state.activeSpecialty === 'all' || doc.specialtyKey === state.activeSpecialty;
    const query = state.searchQuery.toLowerCase().trim();
    if (!query) return matchesSpecialty;

    const matchesName = doc.name.toLowerCase().includes(query);
    const matchesSpec = doc.specialty.toLowerCase().includes(query);
    const matchesKeywords = doc.keywords && doc.keywords.some(k => k.includes(query));
    return matchesSpecialty && (matchesName || matchesSpec || matchesKeywords);
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="empty-state-card">
        <div class="empty-state-icon" aria-hidden="true">👨‍⚕️</div>
        <div class="empty-state-title" data-i18n="empty_doctors_title">No Specialists Found Matching Your Search</div>
        <div class="empty-state-desc" data-i18n="empty_doctors_desc">No consultant match found for "${escapeHtml(state.searchQuery)}". Search by consultant name, specialty, or condition.</div>
        <button class="btn btn-primary btn-sm" data-action="reset-doctor-filters" data-i18n="btn_reset_filters">Reset All Filters</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(doc => {
    return `
      <article class="doctor-card" id="card-${doc.id}">
        <div class="doctor-card-banner">
          <span class="avail-status-tag ${doc.status === 'In Surgery' ? 'status-surgery' : ''}">
            <span class="pulse-dot ${doc.status === 'In Surgery' ? 'amber-pulse' : ''}"></span> ${doc.status || 'In OPD Today'}
          </span>
          <div class="doctor-avatar-wrapper">
            <img src="${doc.avatar}" alt="${doc.name}" class="doctor-avatar" loading="lazy" />
          </div>
        </div>

        <div class="doctor-card-body">
          <div class="doc-meta-top">
            <span class="doc-specialty spec-badge-${doc.specialtyKey}">${doc.specialty}</span>
            <div class="doc-rating">
              <span>★</span> ${doc.rating} <span style="color: var(--slate-400); font-weight: 400; font-size: 0.75rem;">(${doc.reviewsCount})</span>
            </div>
          </div>

          <h3 class="doctor-name">${doc.name}</h3>
          
          <div class="doc-qualifications">
            <span>${doc.qualifications}</span>
            <span class="doc-experience-badge">${doc.experience}</span>
          </div>

          <div class="doc-reg-pill" style="margin: 0.35rem 0 0.65rem; font-size: 0.72rem; color: #0369a1; background: #e0f2fe; padding: 0.2rem 0.5rem; border-radius: 4px; display: inline-block; font-weight: 600;">
            🛡️ Reg: ${doc.regNo || 'PMC Certified Specialist'}
          </div>

          <div class="doc-info-grid">
            <div class="info-item">
              <span class="info-label">Consultation Fee</span>
              <span class="info-value fee-highlight">${doc.feeDisplay}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Clinic Room</span>
              <span class="info-value">${doc.room.split(',')[0]}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Consultation Days</span>
              <span class="info-value" style="font-size: 0.8rem; font-weight: 600; color: #047857;">${doc.days || 'Mon - Sat'}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Languages</span>
              <span class="info-value" style="font-size: 0.78rem;">${doc.languages || 'English, Hindi, Punjabi'}</span>
            </div>
            <div class="info-item" style="grid-column: span 2;">
              <span class="info-label">OPD Timing</span>
              <span class="info-value" style="font-size: 0.78rem; font-weight: 600;">${doc.hours}</span>
            </div>
          </div>

          <div class="doctor-card-footer">
            <button class="btn btn-outline btn-sm" data-action="open-booking-doc" data-id="${doc.id}" title="Book In-Person OPD Appointment">
              In-Person OPD
            </button>
            <button class="btn btn-primary btn-sm" data-action="open-teleconsult-doc" data-id="${doc.id}" style="background: linear-gradient(135deg, #0d9488 0%, #0284c7 100%); border: none;" title="Start Instant Video Tele-Consultation">
              📹 Video Consult
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

const resetDoctorFilters = window.resetDoctorFilters = function () {
  state.activeSpecialty = 'all';
  state.searchQuery = '';
  const searchInput = document.getElementById('doctor-search-input');
  if (searchInput) searchInput.value = '';

  document.querySelectorAll('.specialty-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.specialty === 'all');
  });
  renderDoctorCards();
};



const openLiveQueueModal = window.openLiveQueueModal = function () {
  const modal = document.getElementById('live-queue-modal');
  if (!modal) return;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  renderQueueSkeletons(4);
  setTimeout(() => {
    if (typeof renderLiveOPDBoard === 'function') renderLiveOPDBoard();
  }, 120);
};

const closeLiveQueueModal = window.closeLiveQueueModal = function () {
  const modal = document.getElementById('live-queue-modal');
  if (modal) modal.classList.remove('active');
  document.body.style.overflow = '';
  if (state.queueAutoSimInterval) {
    clearInterval(state.queueAutoSimInterval);
    state.queueAutoSimInterval = null;
    const btn = document.getElementById('btn-queue-auto-sim');
    if (btn) {
      btn.classList.remove('active');
      btn.innerHTML = '⚡ Auto-Simulate (Off)';
    }
  }
};



const QUEUE_CHANNEL_NAME = 'carepulse_queue_sync_bus';
let queueSyncChannel = null;
try {
  if ('BroadcastChannel' in window) {
    queueSyncChannel = new BroadcastChannel(QUEUE_CHANNEL_NAME);
    queueSyncChannel.onmessage = function (e) {
      handleRemoteQueueSync(e.data);
    };
  }
} catch (e) { }

window.addEventListener('storage', function (e) {
  if (e.key === 'carepulse_queue_ping' || e.key === 'carepulse_appointments') {
    reloadAppointmentsFromStorage();
    renderLiveOPDBoard();
    renderReceptionDashboard();
    if (typeof activeTrackerToken !== 'undefined' && activeTrackerToken) {
      checkTokenLiveStatus(activeTrackerToken.replace('#', ''));
    }
  }
});

function broadcastQueueUpdate(type, payload) {
  try {
    localStorage.setItem('carepulse_queue_ping', Date.now().toString());
    if (queueSyncChannel) {
      queueSyncChannel.postMessage({ type, payload, timestamp: Date.now() });
    }
  } catch (e) { }
  renderLiveOPDBoard();
  renderReceptionDashboard();
}

function handleRemoteQueueSync(data) {
  if (!data) return;
  if (data.type === 'CALL_NEXT' && data.payload) {
    const doc = DOCTORS.find(d => d.id === data.payload.doctorId);
    if (doc) {
      doc.currentServingToken = data.payload.servingToken;
      showToast(`🔔 Live Queue Update: ${doc.name} (${doc.room.split(',')[0]}) is now calling Token #TK-${String(doc.currentServingToken).padStart(2, '0')}`, 'info');
    }
  }
  reloadAppointmentsFromStorage();
  renderLiveOPDBoard();
  renderReceptionDashboard();
  if (typeof activeTrackerToken !== 'undefined' && activeTrackerToken) {
    checkTokenLiveStatus(activeTrackerToken.replace('#', ''));
  }
}

function reloadAppointmentsFromStorage() {
  try {
    const stored = localStorage.getItem('carepulse_appointments');
    if (stored) {
      state.userAppointments = JSON.parse(stored);
    }
  } catch (e) { }
}

function requireStaffAuth() {
  if (!sessionStorage.getItem('carepulse_staff_auth')) {
    showToast('Staff authentication required. Please unlock console.', 'error');
    return false;
  }
  return true;
}

const openReceptionDesk = window.openReceptionDesk = function () {
  const isAuth = sessionStorage.getItem('carepulse_staff_auth');
  if (!isAuth) {
    const pin = typeof window.prompt === 'function' ? window.prompt(`🔒 CarePulse Staff Console [Simulated Demo Role]\n\nEnter Staff Security PIN (Demo PIN: ${DEMO_STAFF_PIN}):`) : null;
    if (pin !== DEMO_STAFF_PIN) {
      if (pin !== null) showToast('⛔ Access Denied: Invalid Staff Security PIN', 'error');
      return;
    }
    sessionStorage.setItem('carepulse_staff_auth', 'true');
    showToast('🔓 Staff Session Authorized: Reception Desk Active', 'success');
  }
  const modal = document.getElementById('reception-modal');
  if (!modal) return;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  renderReceptionDashboard();
};

const logoutReceptionStaff = window.logoutReceptionStaff = function () {
  sessionStorage.removeItem('carepulse_staff_auth');
  window.closeReceptionDesk();
  showToast('Staff console session locked.', 'info');
};

const closeReceptionDesk = window.closeReceptionDesk = function () {
  const modal = document.getElementById('reception-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
};

const callNextPatientToken = window.callNextPatientToken = function (doctorId) {
  if (!requireStaffAuth()) return;
  const doc = DOCTORS.find(d => d.id === doctorId);
  if (!doc) return;

  // Advance counter, skipping any cancelled, completed, or no-show tokens
  let nextToken = (doc.currentServingToken || 0) + 1;
  while (true) {
    const skippedApp = state.userAppointments.find(a => a.doctorId === doctorId && a.tokenNumber === nextToken);
    if (skippedApp && (skippedApp.status === 'Cancelled' || skippedApp.status === 'No-Show' || skippedApp.status === 'Completed')) {
      nextToken++;
    } else {
      break;
    }
  }

  doc.currentServingToken = nextToken;
  if (doc.currentServingToken > doc.totalTodayTokens) {
    doc.totalTodayTokens = doc.currentServingToken + 2;
  }

  // Find if a patient appointment matches this token number
  const app = state.userAppointments.find(a => a.doctorId === doctorId && a.tokenNumber === doc.currentServingToken);
  if (app) {
    app.status = 'Serving';
    try {
      localStorage.setItem('carepulse_appointments', JSON.stringify(state.userAppointments));
    } catch (e) { }
  }

  if (window.PublicAddressEngine) {
    PublicAddressEngine.announceToken(doc, doc.currentServingToken, app ? app.patientName : null);
  } else if (typeof playClinicChime === 'function') {
    try { playClinicChime(); } catch (e) { }
  }

  showToast(`🔔 Counter Called: Token #TK-${String(doc.currentServingToken).padStart(2, '0')} for ${doc.name} (${doc.room.split(',')[0]})`, 'success');
  broadcastQueueUpdate('CALL_NEXT', { doctorId, servingToken: doc.currentServingToken });
};

const markTokenCompleted = window.markTokenCompleted = function (tokenId) {
  if (!requireStaffAuth()) return;
  const app = state.userAppointments.find(a => a.tokenId === tokenId);
  if (app) {
    app.status = 'Completed';
    try {
      localStorage.setItem('carepulse_appointments', JSON.stringify(state.userAppointments));
    } catch (e) { }
    showToast(`Token #${tokenId} marked as consultation Completed.`, 'success');
    broadcastQueueUpdate('STATUS_CHANGE', { tokenId, status: 'Completed' });
  }
};

const markTokenNoShow = window.markTokenNoShow = function (tokenId) {
  if (!requireStaffAuth()) return;
  const app = state.userAppointments.find(a => a.tokenId === tokenId);
  if (app) {
    app.status = 'No-Show';
    try {
      localStorage.setItem('carepulse_appointments', JSON.stringify(state.userAppointments));
    } catch (e) { }
    showToast(`Token #${tokenId} marked as No-Show.`, 'warning');
    broadcastQueueUpdate('STATUS_CHANGE', { tokenId, status: 'No-Show' });
  }
};

const issueWalkinToken = window.issueWalkinToken = function (doctorId) {
  if (!requireStaffAuth()) return;
  const doc = DOCTORS.find(d => d.id === doctorId) || DOCTORS[0];
  let patientName = 'Walk-in Patient';
  let phone = '9876543210';
  try {
    const inputName = typeof window.prompt === 'function' ? window.prompt(`Issue Walk-in OPD Token for ${doc.name}\n\nEnter Patient Name:`, 'Walk-in Patient') : 'Walk-in Patient';
    if (inputName === null) return; // User pressed Cancel
    if (inputName && inputName.trim()) patientName = inputName.trim();

    const inputPhone = typeof window.prompt === 'function' ? window.prompt('Enter Patient Phone Number:', '9876543210') : '9876543210';
    if (inputPhone && inputPhone.trim()) phone = inputPhone.trim();
  } catch (e) {
    // Fallback if browser blocks modal prompts
  }
  const tokenNum = doc.totalTodayTokens + 1;
  doc.totalTodayTokens++;

  const newApp = {
    tokenId: `TK-${String(tokenNum).padStart(3, '0')}`,
    tokenNumber: tokenNum,
    doctorId: doc.id,
    doctorName: doc.name,
    doctorSpecialty: doc.specialty,
    room: doc.room,
    patientName: patientName.trim(),
    patientPhone: phone.trim(),
    patientAge: '30',
    patientGender: 'Male',
    patientPlace: 'Phagwara Walk-in Desk',
    date: 'Today',
    timeSlot: 'Walk-in OPD Priority',
    fee: doc.feeDisplay,
    status: 'Confirmed',
    isWalkin: true
  };

  state.userAppointments.unshift(newApp);
  try {
    localStorage.setItem('carepulse_appointments', JSON.stringify(state.userAppointments));
  } catch (e) { }

  showToast(`Walk-in Token #${newApp.tokenId} issued for ${patientName}!`, 'success');
  broadcastQueueUpdate('WALKIN_ISSUED', { doctorId, token: newApp });
};

const setDoctorStatus = window.setDoctorStatus = function (doctorId, status) {
  const doc = DOCTORS.find(d => d.id === doctorId);
  if (!doc) return;
  doc.status = status;
  showToast(`${doc.name} status set to: ${status}`, 'info');
  renderDoctorCards();
  broadcastQueueUpdate('DOC_STATUS', { doctorId, status });
};

function renderReceptionDashboard() {
  const container = document.getElementById('reception-doc-grid');
  if (!container) return;

  container.innerHTML = DOCTORS.map(doc => {
    const servingApp = state.userAppointments.find(a => a.doctorId === doc.id && a.tokenNumber === doc.currentServingToken);

    return `
      <div class="reception-doc-card" style="background: white; border: 1px solid var(--slate-200); border-radius: var(--radius-lg); padding: 1.25rem; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem;">
          <div>
            <h4 style="margin: 0; font-size: 1.05rem; color: var(--dark);">${doc.name}</h4>
            <div style="font-size: 0.78rem; color: var(--slate-600);">${doc.specialty} • ${doc.room.split(',')[0]}</div>
          </div>
          <select onchange="setDoctorStatus('${doc.id}', this.value)" style="font-size: 0.75rem; padding: 0.25rem 0.5rem; border-radius: 4px; border: 1px solid var(--slate-300); font-weight: 700; background: ${doc.status === 'In Surgery' ? '#fef3c7' : '#f0fdf4'}; color: ${doc.status === 'In Surgery' ? '#b45309' : '#15803d'};">
            <option value="In OPD" ${doc.status === 'In OPD' ? 'selected' : ''}>In OPD</option>
            <option value="In Surgery" ${doc.status === 'In Surgery' ? 'selected' : ''}>In Surgery</option>
            <option value="On Break" ${doc.status === 'On Break' ? 'selected' : ''}>On Break</option>
            <option value="On Leave" ${doc.status === 'On Leave' ? 'selected' : ''}>On Leave</option>
          </select>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; background: var(--slate-50); padding: 0.75rem; border-radius: var(--radius-md); margin-bottom: 1rem; text-align: center;">
          <div>
            <span style="font-size: 0.7rem; color: var(--slate-600); text-transform: uppercase; font-weight: 700; display: block;">Serving Now</span>
            <strong style="font-size: 1.4rem; color: var(--primary-dark); font-family: var(--font-heading);">#TK-${String(doc.currentServingToken).padStart(2, '0')}</strong>
          </div>
          <div>
            <span style="font-size: 0.7rem; color: var(--slate-600); text-transform: uppercase; font-weight: 700; display: block;">Today's Total</span>
            <strong style="font-size: 1.4rem; color: var(--dark); font-family: var(--font-heading);">${doc.totalTodayTokens}</strong>
          </div>
        </div>

        ${servingApp ? `
          <div style="background: #e0f2fe; padding: 0.5rem 0.75rem; border-radius: var(--radius-sm); font-size: 0.78rem; color: #0369a1; margin-bottom: 0.75rem;">
            👤 Patient: <strong>${escapeHtml(servingApp.patientName)}</strong> (${escapeHtml(servingApp.patientPhone)})
          </div>
        ` : ''}

        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <button class="btn btn-primary btn-sm" data-action="call-next-patient" data-id="${doc.id}" style="flex: 1; font-weight: 700;">
            🔔 Call Next (#TK-${String(doc.currentServingToken + 1).padStart(2, '0')})
          </button>
          <button class="btn btn-outline btn-sm" data-action="issue-walkin-token" data-id="${doc.id}" style="font-size: 0.75rem;">
            ➕ Walk-In
          </button>
        </div>
      </div>
    `;
  }).join('');

  // Render recent tokens table
  const tableBody = document.getElementById('reception-tokens-table-body');
  if (tableBody) {
    if (state.userAppointments.length === 0) {
      tableBody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 1.5rem; color: var(--slate-400);">No active patient bookings today.</td></tr>';
    } else {
      tableBody.innerHTML = state.userAppointments.slice(0, 15).map(a => `
        <tr>
          <td><strong style="font-family: monospace; color: var(--primary-dark);">${escapeHtml(a.tokenId)}</strong></td>
          <td><strong>${escapeHtml(a.patientName)}</strong><br /><span style="font-size: 0.75rem; color: var(--slate-600);">${escapeHtml(a.patientPhone)}</span></td>
          <td>${escapeHtml(a.doctorName)}<br /><span style="font-size: 0.72rem; color: var(--slate-600);">${escapeHtml((a.room || '').split(',')[0])}</span></td>
          <td>${escapeHtml(a.timeSlot)}</td>
          <td>
            <span class="status-badge-report ${a.status === 'Completed' ? 'normal' : a.status === 'Cancelled' ? 'abnormal' : 'high'}">
              ${escapeHtml(a.status)}
            </span>
          </td>
          <td>
            <div style="display: flex; gap: 0.25rem;">
              <button class="btn-rx-add" data-action="mark-token-completed" data-id="${escapeHtml(a.tokenId)}" title="Mark consultation done">✓ Done</button>
              <button class="btn-rx-add" data-action="mark-token-no-show" data-id="${escapeHtml(a.tokenId)}" style="color: #b91c1c;" title="Mark patient absent">✗ No-Show</button>
            </div>
          </td>
        </tr>
      `).join('');
    }
  }
}

// --- Live Queue Tracker Feature ---


function setupSpecialtyFilters() {
  const buttons = document.querySelectorAll('.specialty-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.activeSpecialty = btn.dataset.specialty;
      renderDoctorCards();
    });
  });

  const searchInput = document.getElementById('doctor-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      renderDoctorCards();
    });
  }
}

// --- Emergency Modal ---


export {
  renderQueueSkeletons,
  renderDoctorSkeletons,
  renderLiveOPDBoard,
  filterQueueSpecialty,
  handleQueueSearch,
  toggleQueueAutoSim,
  simulateNextToken,
  renderDoctorCards,
  resetDoctorFilters,
  openLiveQueueModal,
  closeLiveQueueModal,
  setupSpecialtyFilters,
  broadcastQueueUpdate,
  handleRemoteQueueSync,
  reloadAppointmentsFromStorage,
  requireStaffAuth,
  openReceptionDesk,
  logoutReceptionStaff,
  closeReceptionDesk,
  callNextPatientToken,
  markTokenCompleted,
  markTokenNoShow,
  issueWalkinToken,
  setDoctorStatus,
  renderReceptionDashboard
};
