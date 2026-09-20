// CarePulse Appointment Booking & Scheduling Engine
import { DOCTORS, HEALTH_PACKAGES, state } from './config.js';
import { escapeHtml, showToast, getUpcomingDays, getSlotsForDoctorAndDate } from './utils.js';

const openBookingLayer = window.openBookingLayer = function (doctorId) {
  if (doctorId) {
    state.selectedDoctorId = doctorId;
  }

  const layerModal = document.getElementById('booking-layer-modal');
  if (!layerModal) return;

  // Sync dropdowns
  const selectElem = document.getElementById('layer-doctor-select');
  if (selectElem) selectElem.value = state.selectedDoctorId;

  const inlineSelect = document.getElementById('doctor-select');
  if (inlineSelect) inlineSelect.value = state.selectedDoctorId;

  updateDoctorInfoBanner();
  renderDateRibbon();
  renderSlots();

  layerModal.classList.add('active');
  document.body.style.overflow = 'hidden';

  const doc = DOCTORS.find(d => d.id === state.selectedDoctorId);
  if (doc) {
    showToast(`Booking Layer opened for ${doc.name}`, 'info');
  }
};

const closeBookingLayer = window.closeBookingLayer = function () {
  const layerModal = document.getElementById('booking-layer-modal');
  if (layerModal) {
    layerModal.classList.remove('active');
  }
  document.body.style.overflow = '';
};

/* --- Modular Service Layer Modal Controllers --- */


function renderDateRibbon() {
  const ribbons = [
    document.getElementById('layer-date-ribbon'),
    document.getElementById('date-ribbon')
  ].filter(Boolean);

  if (ribbons.length === 0) return;

  const days = getUpcomingDays(7);
  if (!state.selectedDate) {
    state.selectedDate = days[0].isoDate;
  }

  const ribbonHTML = days.map((day, idx) => {
    const isActive = day.isoDate === state.selectedDate;
    return `
      <div class="date-card-pill ${isActive ? 'active' : ''}" 
           data-date="${day.isoDate}" 
           data-full="${day.fullDateStr}"
           data-action="select-date">
        <span class="date-pill-day">${day.label}</span>
        <span class="date-pill-num">${day.dayNum}</span>
        <span class="date-pill-month">${day.month}</span>
      </div>
    `;
  }).join('');

  ribbons.forEach(ribbon => {
    ribbon.innerHTML = ribbonHTML;
  });
}

const selectDate = window.selectDate = function (isoDate, fullDateStr) {
  state.selectedDate = isoDate;
  state.selectedSlot = ''; // reset slot on date change

  // Update all active pills
  document.querySelectorAll('.date-card-pill').forEach(pill => {
    pill.classList.toggle('active', pill.dataset.date === isoDate);
  });

  renderSlots();
  updateSummaryBox();
};

// --- Render Time Slots Grid (Supports both Layer and Inline) ---
function renderSlots() {
  const containers = [
    document.getElementById('layer-slots-container'),
    document.getElementById('slots-container')
  ].filter(Boolean);

  if (containers.length === 0) return;

  const slotsData = getSlotsForDoctorAndDate(state.selectedDoctorId, state.selectedDate);

  if (slotsData.offDuty) {
    const offDutyHtml = `
      <div style="grid-column: 1 / -1; padding: 1.5rem; text-align: center; background: #fff1f2; border: 1px solid #fecdd3; border-radius: 8px; color: #9f1239; font-size: 0.9rem; font-weight: 600; line-height: 1.5;">
        ⚠️ ${escapeHtml(slotsData.offDutyMessage)}
      </div>
    `;
    containers.forEach(container => {
      container.innerHTML = offDutyHtml;
    });
    updateSummaryBox();
    return;
  }

  let html = '';

  ['morning', 'afternoon', 'evening'].forEach(session => {
    const sessionSlots = slotsData[session] || [];
    if (sessionSlots.length === 0) return;

    const sessionLabel = session === 'morning' ? '🌅 Morning Slots' : (session === 'afternoon' ? '☀️ Afternoon Slots' : '🌙 Evening Slots');

    html += `
      <div class="slot-session-title">${sessionLabel}</div>
      <div class="slot-grid">
    `;

    sessionSlots.forEach(slot => {
      const isSelected = state.selectedSlot === slot.time;
      let statusTagText = 'Open';
      let statusClass = slot.status;

      if (slot.status === 'past') {
        statusTagText = 'Passed';
        statusClass = 'booked past-slot';
      } else if (slot.status === 'booked') {
        statusTagText = 'Booked';
      } else if (slot.status === 'fast-filling') {
        statusTagText = 'Filling Fast';
      }

      const isSelectable = slot.status !== 'booked' && slot.status !== 'past';

      html += `
        <div class="slot-item ${statusClass} ${isSelected ? 'selected' : ''}" 
             ${isSelectable ? `data-action="select-slot" data-time="${slot.time}" data-session="${slot.session}"` : 'style="opacity: 0.45; cursor: not-allowed;"'}
             title="${slot.status === 'past' ? 'This slot time has already passed for today' : (slot.status === 'booked' ? 'Slot already reserved' : 'Click to select this slot')}">
          <span class="slot-time">${slot.time}</span>
          <span class="slot-status-tag">${isSelected ? '✓ Selected' : statusTagText}</span>
        </div>
      `;
    });

    html += `</div>`;
  });

  containers.forEach(container => {
    container.innerHTML = html;
  });

  updateSummaryBox();
}

const selectSlot = window.selectSlot = function (time, session) {
  const slotsData = getSlotsForDoctorAndDate(state.selectedDoctorId, state.selectedDate);
  const allSlots = [...(slotsData.morning || []), ...(slotsData.afternoon || []), ...(slotsData.evening || [])];
  const target = allSlots.find(s => s.time === time);
  if (target && (target.status === 'booked' || target.status === 'past')) {
    showToast(target.status === 'past' ? 'This slot time has already passed for today.' : 'This slot is already reserved.', 'warning');
    return;
  }
  state.selectedSlot = time;
  state.selectedSlotSession = session;
  renderSlots();
  showToast(`Time slot ${time} selected!`, 'info');
};

// --- Update Summary Box in Booking Forms ---
function updateSummaryBox() {
  const doc = DOCTORS.find(d => d.id === state.selectedDoctorId) || DOCTORS[0];
  const activePill = document.querySelector('.date-card-pill.active');
  const dateStr = activePill ? activePill.dataset.full : state.selectedDate;

  // Layer Summary
  const layerDocElem = document.getElementById('layer-summary-doc');
  const layerDateElem = document.getElementById('layer-summary-date');
  const layerSlotElem = document.getElementById('layer-summary-slot');
  const layerFeeElem = document.getElementById('layer-summary-fee');
  const layerWaitElem = document.getElementById('layer-summary-wait');

  if (layerDocElem) layerDocElem.innerText = `${doc.name} (${doc.specialty})`;
  if (layerDateElem) layerDateElem.innerText = dateStr;
  if (layerSlotElem) {
    layerSlotElem.innerText = state.selectedSlot ? state.selectedSlot : 'Select a slot on left';
    layerSlotElem.style.color = state.selectedSlot ? '#0f766e' : '#94a3b8';
  }
  if (layerFeeElem) layerFeeElem.innerText = doc.feeDisplay;
  if (layerWaitElem) layerWaitElem.innerText = `~${doc.avgWaitPerPatient} mins`;

  // Inline Summary
  const docElem = document.getElementById('summary-doc');
  const dateElem = document.getElementById('summary-date');
  const slotElem = document.getElementById('summary-slot');
  const feeElem = document.getElementById('summary-fee');
  const estWaitElem = document.getElementById('summary-wait');

  if (docElem) docElem.innerText = `${doc.name} (${doc.specialty})`;
  if (dateElem) dateElem.innerText = dateStr;
  if (slotElem) {
    slotElem.innerText = state.selectedSlot ? state.selectedSlot : 'Please select a slot';
    slotElem.style.color = state.selectedSlot ? '#0f766e' : '#94a3b8';
  }
  if (feeElem) feeElem.innerText = doc.feeDisplay;
  if (estWaitElem) estWaitElem.innerText = `~${doc.avgWaitPerPatient} mins per patient`;
}

// --- Populate Doctor Select Dropdowns ---
function populateDoctorDropdowns() {
  const dropdowns = [
    document.getElementById('layer-doctor-select'),
    document.getElementById('doctor-select')
  ].filter(Boolean);

  const optionsHTML = DOCTORS.map(doc => {
    return `<option value="${doc.id}" ${doc.id === state.selectedDoctorId ? 'selected' : ''}>${doc.name} - ${doc.specialty} (${doc.feeDisplay})</option>`;
  }).join('');

  dropdowns.forEach(selectElem => {
    selectElem.innerHTML = optionsHTML;
    selectElem.addEventListener('change', (e) => {
      state.selectedDoctorId = e.target.value;
      state.selectedSlot = '';

      dropdowns.forEach(other => {
        if (other !== e.target) other.value = e.target.value;
      });

      updateDoctorInfoBanner();
      renderSlots();
    });
  });
}

function updateDoctorInfoBanner() {
  const doc = DOCTORS.find(d => d.id === state.selectedDoctorId);
  if (!doc) return;

  const banners = [
    document.getElementById('layer-doctor-banner'),
    document.getElementById('selected-doctor-banner')
  ].filter(Boolean);

  const bannerHTML = `
    <div style="display: flex; align-items: center; gap: 1rem; background: white; border: 1px solid var(--slate-200); border-radius: var(--radius-md); padding: 0.85rem; margin-bottom: 1.25rem;">
      <img src="${doc.avatar}" style="width: 52px; height: 52px; border-radius: var(--radius-sm); object-fit: cover;" alt="${doc.name}" />
      <div style="flex: 1;">
        <div style="font-weight: 800; font-size: 1.05rem; color: var(--dark);">${doc.name}</div>
        <div style="font-size: 0.825rem; color: var(--primary); font-weight: 600;">${doc.specialty} • ${doc.qualifications}</div>
        <div style="font-size: 0.75rem; color: var(--slate-600);">${doc.room}</div>
      </div>
      <div style="text-align: right;">
        <span style="font-size: 0.72rem; color: var(--slate-600); display: block;">Consultation</span>
        <span style="font-size: 1.15rem; font-weight: 800; color: var(--primary-dark);">${doc.feeDisplay}</span>
      </div>
    </div>
  `;

  banners.forEach(b => {
    b.innerHTML = bannerHTML;
  });
}



function setupBookingForms() {
  // 1. Layer Booking Form
  const layerForm = document.getElementById('layer-booking-form');
  if (layerForm) {
    layerForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const patientData = {
        name: document.getElementById('layer-patient-name').value.trim(),
        age: document.getElementById('layer-patient-age').value.trim(),
        gender: document.getElementById('layer-patient-gender').value,
        place: document.getElementById('layer-patient-place').value.trim(),
        phone: document.getElementById('layer-patient-phone').value.trim(),
        visitType: document.getElementById('layer-visit-type').value,
        reason: document.getElementById('layer-patient-reason').value.trim()
      };
      const ok = processBookingSubmission(patientData);
      if (ok) layerForm.reset();
    });
  }

  // 2. Inline Booking Form
  const inlineForm = document.getElementById('patient-booking-form');
  if (inlineForm) {
    inlineForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const patientData = {
        name: document.getElementById('patient-name').value.trim(),
        age: document.getElementById('patient-age').value.trim(),
        gender: document.getElementById('patient-gender').value,
        place: document.getElementById('patient-place').value.trim(),
        phone: document.getElementById('patient-phone').value.trim(),
        visitType: document.getElementById('visit-type').value,
        reason: document.getElementById('patient-reason').value.trim()
      };
      const ok = processBookingSubmission(patientData);
      if (ok) inlineForm.reset();
    });
  }
}

// --- Digital Token Slip Modal Handler ---


const bookHealthPackage = window.bookHealthPackage = function (pkgId) {
  openPackageBookingModal(pkgId);
};

const openPackageBookingModal = window.openPackageBookingModal = function (pkgId) {
  const pkg = HEALTH_PACKAGES.find(p => p.id === pkgId) || HEALTH_PACKAGES[1];
  activePackageBooking = pkg;

  const modal = document.getElementById('package-booking-modal');
  if (!modal) {
    // Fallback if modal HTML not yet injected
    submitDirectPackageBooking(pkg);
    return;
  }

  document.getElementById('pkg-modal-title').textContent = pkg.name;
  document.getElementById('pkg-modal-price').textContent = `₹${pkg.price}`;
  document.getElementById('pkg-modal-desc').textContent = `${pkg.testsCount} • ${pkg.desc}`;

  // Prefill user details if logged in
  if (CarePulseAuth.sessionUser) {
    const nameInput = document.getElementById('pkg-patient-name');
    const phoneInput = document.getElementById('pkg-patient-phone');
    if (nameInput && CarePulseAuth.sessionUser.name) nameInput.value = CarePulseAuth.sessionUser.name;
    if (phoneInput && CarePulseAuth.sessionUser.contact) phoneInput.value = CarePulseAuth.sessionUser.contact;
  }

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
};

const closePackageBookingModal = window.closePackageBookingModal = function () {
  const modal = document.getElementById('package-booking-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
};

window.openPrivacyModal = function () {
  const modal = document.getElementById('privacy-modal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
};

window.closePrivacyModal = function () {
  const modal = document.getElementById('privacy-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
};

window.openTermsModal = function () {
  const modal = document.getElementById('terms-modal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
};

window.closeTermsModal = function () {
  const modal = document.getElementById('terms-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
};

const submitPackageBookingForm = window.submitPackageBookingForm = function (e) {
  if (e) e.preventDefault();
  const pkg = activePackageBooking || HEALTH_PACKAGES[1];

  const name = document.getElementById('pkg-patient-name').value.trim();
  const phone = document.getElementById('pkg-patient-phone').value.trim();
  const age = document.getElementById('pkg-patient-age').value.trim() || '35';
  const gender = document.getElementById('pkg-patient-gender').value || 'Male';
  const collectionType = document.getElementById('pkg-collection-type').value;
  const address = document.getElementById('pkg-patient-address').value.trim();
  const timeSlot = document.getElementById('pkg-time-slot').value;

  if (!name || !phone) {
    showToast('Please enter patient name and contact phone number', 'warning');
    return;
  }

  const pkgTokenNum = Math.floor(1000 + Math.random() * 9000);
  const tokenString = `PKG-${pkgTokenNum}`;
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
  const year = now.getFullYear();
  const randNum = Math.floor(100000 + Math.random() * 900000);
  const ticketRef = `CP-${year}-${randNum}`;
  const hexChars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const genSecPart = () => Array.from({ length: 4 }, () => hexChars.charAt(Math.floor(Math.random() * hexChars.length))).join('');
  const securityCode = `SEC-${genSecPart()}-${genSecPart()}`;
  const barcodeNum = `CP-PKG-${pkgTokenNum}-${Math.floor(1000 + Math.random() * 9000)}`;
  const qrPayload = `https://carepulse.hospital/checkin?t=${tokenString}&ref=${ticketRef}&sec=${securityCode}&p=${encodeURIComponent(name)}`;

  const pkgAppointment = {
    tokenId: tokenString,
    tokenNumber: pkgTokenNum,
    ticketRef: ticketRef,
    securityCode: securityCode,
    barcodeNum: barcodeNum,
    assignedDesk: collectionType === 'home' ? 'Phlebotomy Van #3 • Doorstep Collector' : 'Hospital Central Lab • Bay 1',
    queuePosition: 1,
    estWaitMins: 5,
    issueTimestamp: now.toLocaleDateString('en-IN') + ', ' + now.toLocaleTimeString('en-IN'),
    qrPayload: qrPayload,
    doctorId: 'lab-pkg',
    doctorName: 'CarePulse Diagnostics Lab Desk',
    doctorSpecialty: 'CarePulse ProHealth Package',
    doctorAvatar: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=400&q=80',
    date: dateStr,
    timeSlot: timeSlot,
    room: collectionType === 'home' ? `Home Sample Pickup (${address || 'Phagwara'})` : 'Ground Floor, Clinical Lab Wing',
    patientName: name,
    patientAge: age,
    patientGender: gender,
    patientPlace: collectionType === 'home' ? (address || 'Phagwara Home Pickup') : 'Hospital Walk-in',
    patientPhone: phone,
    visitReason: `${pkg.name} (${pkg.testsCount}) • ${collectionType === 'home' ? 'Home Sample Pickup' : 'Hospital Central Lab'}`,
    reportingNote: '10-12 hours fasting mandatory before sample collection. Water permitted.',
    fee: `₹${pkg.price}`,
    bookedAt: new Date().toISOString(),
    status: 'Confirmed'
  };

  state.userAppointments.unshift(pkgAppointment);
  try {
    localStorage.setItem('carepulse_appointments', JSON.stringify(state.userAppointments));
  } catch (e) { }

  closePackageBookingModal();
  renderMyBookingsBadge();
  openTokenSlipModal(pkgAppointment);
  showToast(`🎉 ${pkg.name} reserved! Token ${tokenString} generated.`, 'success');
};

function submitDirectPackageBooking(pkg) {
  const patientName = CarePulseAuth.sessionUser ? CarePulseAuth.sessionUser.name : 'Patient';
  const patientPhone = CarePulseAuth.sessionUser ? CarePulseAuth.sessionUser.contact : '9876543210';
  const pkgTokenNum = Math.floor(1000 + Math.random() * 9000);
  const tokenString = `PKG-${pkgTokenNum}`;
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
  const year = now.getFullYear();
  const ticketRef = `CP-${year}-${Math.floor(100000 + Math.random() * 900000)}`;
  const hexChars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const genSecPart = () => Array.from({ length: 4 }, () => hexChars.charAt(Math.floor(Math.random() * hexChars.length))).join('');
  const securityCode = `SEC-${genSecPart()}-${genSecPart()}`;
  const barcodeNum = `CP-PKG-${pkgTokenNum}-${Math.floor(1000 + Math.random() * 9000)}`;

  const pkgAppointment = {
    tokenId: tokenString,
    tokenNumber: pkgTokenNum,
    ticketRef: ticketRef,
    securityCode: securityCode,
    barcodeNum: barcodeNum,
    assignedDesk: 'Phlebotomy Bay 1 • Doorstep Sample Desk',
    queuePosition: 1,
    estWaitMins: 5,
    issueTimestamp: now.toLocaleDateString('en-IN') + ', ' + now.toLocaleTimeString('en-IN'),
    qrPayload: `https://carepulse.hospital/checkin?t=${tokenString}&ref=${ticketRef}`,
    doctorId: 'lab-pkg',
    doctorName: 'CarePulse Diagnostics Lab Desk',
    doctorSpecialty: 'CarePulse ProHealth Package',
    doctorAvatar: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=400&q=80',
    date: dateStr,
    timeSlot: '07:30 AM - 08:30 AM (Fasting Sample)',
    room: 'Home Sample Collection / Clinical Lab Wing',
    patientName: patientName,
    patientAge: '35',
    patientGender: 'Male',
    patientPlace: 'Model Town, Phagwara',
    patientPhone: patientPhone,
    visitReason: `${pkg.name} (${pkg.testsCount}) - Doorstep Sample`,
    reportingNote: '10-12 hours fasting required before sample collection',
    fee: `₹${pkg.price}`,
    bookedAt: new Date().toISOString(),
    status: 'Confirmed'
  };

  state.userAppointments.unshift(pkgAppointment);
  try {
    localStorage.setItem('carepulse_appointments', JSON.stringify(state.userAppointments));
  } catch (e) { }

  renderMyBookingsBadge();
  openTokenSlipModal(pkgAppointment);
  showToast(`🎉 ${pkg.name} reserved! Token ${tokenString} issued.`, 'success');
}

// 3. Diagnostic Reports Portal (Authenticated with Patient OTP)


export {
  openBookingLayer,
  closeBookingLayer,
  renderDateRibbon,
  selectDate,
  renderSlots,
  selectSlot,
  updateSummaryBox,
  populateDoctorDropdowns,
  updateDoctorInfoBanner,
  setupBookingForms,
  bookHealthPackage,
  openPackageBookingModal,
  closePackageBookingModal,
  submitPackageBookingForm,
  submitDirectPackageBooking
};
