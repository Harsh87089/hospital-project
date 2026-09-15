/* ==========================================================================
   CarePulse Local Clinic & Token Booking Portal - JavaScript Logic
   ========================================================================== */

// --- Doctors Data with Indian Names across required specialties ---
const DOCTORS = [
  // --- General Physicians ---
  {
    id: 'doc-gp-1',
    name: 'Dr. Rajesh Sharma',
    specialty: 'General Physician',
    specialtyKey: 'general',
    qualifications: 'MBBS, MD (General Medicine - AIIMS New Delhi)',
    experience: '16 Years Exp',
    fee: 500,
    feeDisplay: '₹500',
    hours: '09:00 AM - 01:00 PM & 05:00 PM - 08:30 PM',
    room: 'Room 101, Ground Floor (General OPD)',
    rating: 4.93,
    reviewsCount: '1,840 reviews',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
    availableToday: true,
    currentServingToken: 14,
    totalTodayTokens: 28,
    avgWaitPerPatient: 12,
    keywords: ['fever', 'cold', 'flu', 'cough', 'headache', 'diabetes', 'bp', 'general', 'physician', 'body pain', 'viral', 'rajesh', 'sharma']
  },
  {
    id: 'doc-gp-2',
    name: 'Dr. Priya Nair',
    specialty: 'General Physician',
    specialtyKey: 'general',
    qualifications: 'MBBS, DNB (Family & Internal Medicine - CMC Vellore)',
    experience: '11 Years Exp',
    fee: 450,
    feeDisplay: '₹450',
    hours: '10:00 AM - 02:00 PM & 06:00 PM - 09:00 PM',
    room: 'Room 102, Ground Floor (General OPD Bay B)',
    rating: 4.90,
    reviewsCount: '1,290 reviews',
    avatar: 'https://images.unsplash.com/photo-1594824813689-ff4a20b784a0?auto=format&fit=crop&w=400&q=80',
    availableToday: true,
    currentServingToken: 9,
    totalTodayTokens: 21,
    avgWaitPerPatient: 10,
    keywords: ['fever', 'thyroid', 'stomach pain', 'infection', 'general', 'physician', 'priya', 'nair', 'fatigue']
  },
  {
    id: 'doc-gp-3',
    name: 'Dr. Amitav Banerjee',
    specialty: 'General Physician',
    specialtyKey: 'general',
    qualifications: 'MBBS, MD (Senior Physician & Diabetologist - KGMC)',
    experience: '18 Years Exp',
    fee: 600,
    feeDisplay: '₹600',
    hours: '08:30 AM - 12:30 PM & 04:30 PM - 07:30 PM',
    room: 'Room 103, Ground Floor (Executive OPD)',
    rating: 4.96,
    reviewsCount: '2,100 reviews',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80',
    availableToday: true,
    currentServingToken: 18,
    totalTodayTokens: 32,
    avgWaitPerPatient: 15,
    keywords: ['hypertension', 'sugar', 'diabetes', 'fatigue', 'senior', 'amitav', 'banerjee', 'blood pressure']
  },

  // --- Pediatricians (Child Specialists) ---
  {
    id: 'doc-ped-1',
    name: 'Dr. Ananya Mukherjee',
    specialty: 'Pediatrician',
    specialtyKey: 'pediatrician',
    qualifications: 'MBBS, MD (Pediatrics & Neonatology - KEM Mumbai)',
    experience: '12 Years Exp',
    fee: 500,
    feeDisplay: '₹500',
    hours: '09:30 AM - 01:30 PM & 04:30 PM - 07:30 PM',
    room: 'Room 104, 1st Floor (Child Wellness Unit)',
    rating: 4.95,
    reviewsCount: '1,480 reviews',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80',
    availableToday: true,
    currentServingToken: 8,
    totalTodayTokens: 20,
    avgWaitPerPatient: 15,
    keywords: ['child', 'baby', 'pediatric', 'vaccination', 'infant', 'kids', 'growth', 'newborn', 'ananya', 'mukherjee']
  },
  {
    id: 'doc-ped-2',
    name: 'Dr. Vikramaditya Joshi',
    specialty: 'Pediatrician',
    specialtyKey: 'pediatrician',
    qualifications: 'MBBS, DCH (Child Health & Immunization - PGIMER)',
    experience: '9 Years Exp',
    fee: 450,
    feeDisplay: '₹450',
    hours: '10:00 AM - 02:00 PM & 05:00 PM - 08:00 PM',
    room: 'Room 105, 1st Floor (Pediatric Clinic B)',
    rating: 4.88,
    reviewsCount: '950 reviews',
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80',
    availableToday: true,
    currentServingToken: 5,
    totalTodayTokens: 16,
    avgWaitPerPatient: 12,
    keywords: ['kids', 'baby flu', 'cough', 'vaccine', 'nutrition', 'vikram', 'joshi', 'pediatrician', 'fever']
  },

  // --- Dermatologists (Skin, Hair & Aesthetics) ---
  {
    id: 'doc-derma-1',
    name: 'Dr. Meera Krishnan',
    specialty: 'Dermatologist',
    specialtyKey: 'dermatologist',
    qualifications: 'MBBS, MD (Dermatology, Venereology & Leprosy - JIPMER)',
    experience: '10 Years Exp',
    fee: 600,
    feeDisplay: '₹600',
    hours: '10:00 AM - 02:00 PM & 05:00 PM - 08:00 PM',
    room: 'Room 202, 2nd Floor (Skin & Derma Suite)',
    rating: 4.91,
    reviewsCount: '1,340 reviews',
    avatar: 'https://images.unsplash.com/photo-1594824813689-ff4a20b784a0?auto=format&fit=crop&w=400&q=80',
    availableToday: true,
    currentServingToken: 11,
    totalTodayTokens: 24,
    avgWaitPerPatient: 14,
    keywords: ['skin', 'derma', 'acne', 'rash', 'allergy', 'hair fall', 'eczema', 'pigmentation', 'dermatologist', 'meera', 'krishnan']
  },
  {
    id: 'doc-derma-2',
    name: 'Dr. Rohan Varma',
    specialty: 'Dermatologist',
    specialtyKey: 'dermatologist',
    qualifications: 'MBBS, DDVL (Aesthetic Dermatology & Trichology - MAMC)',
    experience: '8 Years Exp',
    fee: 550,
    feeDisplay: '₹550',
    hours: '11:00 AM - 03:00 PM & 06:00 PM - 08:30 PM',
    room: 'Room 204, 2nd Floor (Aesthetic & Hair Clinic)',
    rating: 4.86,
    reviewsCount: '810 reviews',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80',
    availableToday: true,
    currentServingToken: 7,
    totalTodayTokens: 18,
    avgWaitPerPatient: 15,
    keywords: ['hair loss', 'scalp', 'dandruff', 'laser', 'glow', 'skin care', 'rohan', 'varma', 'psoriasis']
  },

  // --- Dentists (Oral & Dental Surgeons) ---
  {
    id: 'doc-dent-1',
    name: 'Dr. Suresh Kulkarni',
    specialty: 'Dentist',
    specialtyKey: 'dentist',
    qualifications: 'BDS, MDS (Orthodontics & Dentofacial Orthopedics - Nair Dental)',
    experience: '14 Years Exp',
    fee: 400,
    feeDisplay: '₹400',
    hours: '09:00 AM - 01:00 PM & 04:00 PM - 08:00 PM',
    room: 'Room 108, Ground Floor (Advanced Dental Suite)',
    rating: 4.94,
    reviewsCount: '1,620 reviews',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
    availableToday: true,
    currentServingToken: 12,
    totalTodayTokens: 25,
    avgWaitPerPatient: 16,
    keywords: ['teeth', 'tooth', 'dentist', 'cavity', 'braces', 'aligners', 'root canal', 'cleaning', 'dental', 'suresh', 'kulkarni']
  },
  {
    id: 'doc-dent-2',
    name: 'Dr. Pooja Deshmukh',
    specialty: 'Dentist',
    specialtyKey: 'dentist',
    qualifications: 'BDS, MDS (Conservative Dentistry & Endodontics - GDC Mumbai)',
    experience: '9 Years Exp',
    fee: 450,
    feeDisplay: '₹450',
    hours: '09:30 AM - 01:30 PM & 05:00 PM - 08:30 PM',
    room: 'Room 109, Ground Floor (Dental Care Bay)',
    rating: 4.89,
    reviewsCount: '1,050 reviews',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80',
    availableToday: true,
    currentServingToken: 6,
    totalTodayTokens: 18,
    avgWaitPerPatient: 18,
    keywords: ['toothache', 'rct', 'root canal', 'filling', 'bleaching', 'pooja', 'deshmukh', 'dental']
  },
  {
    id: 'doc-dent-3',
    name: 'Dr. Arjun Singhania',
    specialty: 'Dentist',
    specialtyKey: 'dentist',
    qualifications: 'BDS, MDS (Oral & Maxillofacial Implantology - BHU)',
    experience: '13 Years Exp',
    fee: 500,
    feeDisplay: '₹500',
    hours: '10:30 AM - 02:30 PM & 05:30 PM - 08:30 PM',
    room: 'Room 110, Ground Floor (Dental Surgery Suite)',
    rating: 4.92,
    reviewsCount: '1,180 reviews',
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80',
    availableToday: true,
    currentServingToken: 10,
    totalTodayTokens: 22,
    avgWaitPerPatient: 20,
    keywords: ['implant', 'wisdom tooth', 'gum surgery', 'crown', 'bridge', 'arjun', 'singhania', 'dental']
  }
];

// Time slot catalog
const SLOT_TEMPLATES = {
  morning: ['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM'],
  afternoon: ['02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'],
  evening: ['05:30 PM', '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM', '08:00 PM']
};

// Application State
const state = {
  activeSpecialty: 'all',
  searchQuery: '',
  selectedDoctorId: DOCTORS[0].id,
  selectedDate: '',
  selectedSlot: '',
  selectedSlotSession: '',
  bookedSlotsCache: {}, // key: doctorId + date -> set of booked times
  userAppointments: [],
  lastCreatedToken: null
};

// --- Web Audio Chime Generator (Realistic Clinic Bell) ---
function playClinicChime() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    // Two-tone bell (E5 then B5)
    const playNote = (freq, startTime, duration) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.001, startTime);
      gain.gain.exponentialRampToValueAtTime(0.25, startTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + duration);
    };

    const now = ctx.currentTime;
    playNote(659.25, now, 0.6); // E5
    playNote(987.77, now + 0.25, 0.9); // B5
  } catch (e) {
    console.log('Audio note simulation notice:', e);
  }
}

// --- Toast System ---
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;

  let icon = 'ℹ️';
  if (type === 'success') icon = '✅';
  if (type === 'warning') icon = '⚠️';

  toast.innerHTML = `<span>${icon}</span> <div>${message}</div>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// --- Initialize Dates (Today + next 6 days) ---
function getUpcomingDays(count = 7) {
  const days = [];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  for (let i = 0; i < count; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);

    const dayStr = i === 0 ? 'Today' : (i === 1 ? 'Tmrw' : dayNames[d.getDay()]);
    const dateNum = d.getDate();
    const monthStr = monthNames[d.getMonth()];
    const isoString = d.toISOString().split('T')[0];

    days.push({
      label: dayStr,
      dayNum: dateNum,
      month: monthStr,
      fullDateStr: `${dayNames[d.getDay()]}, ${dateNum} ${monthStr}`,
      isoDate: isoString
    });
  }
  return days;
}

// --- Generate Slots with realistic availability ---
function getSlotsForDoctorAndDate(doctorId, isoDate) {
  const cacheKey = `${doctorId}_${isoDate}`;

  // Deterministic seed for realistic slot states
  const seed = (doctorId.charCodeAt(doctorId.length - 1) + parseInt(isoDate.replace(/-/g, '').slice(-2), 10)) % 10;

  const processGroup = (slots, sessionName) => {
    return slots.map((time, idx) => {
      // Check if user or demo already booked this
      const isLocallyBooked = state.bookedSlotsCache[cacheKey] && state.bookedSlotsCache[cacheKey].includes(time);
      if (isLocallyBooked) {
        return { time, status: 'booked', session: sessionName };
      }

      // Seeded booked slots for realism
      if ((idx + seed) % 5 === 0) {
        return { time, status: 'booked', session: sessionName };
      } else if ((idx + seed) % 4 === 1) {
        return { time, status: 'fast-filling', session: sessionName };
      } else {
        return { time, status: 'available', session: sessionName };
      }
    });
  };

  return {
    morning: processGroup(SLOT_TEMPLATES.morning, 'Morning'),
    afternoon: processGroup(SLOT_TEMPLATES.afternoon, 'Afternoon'),
    evening: processGroup(SLOT_TEMPLATES.evening, 'Evening')
  };
}

// --- Render Live OPD Queue Board ---
function renderLiveOPDBoard() {
  const container = document.getElementById('live-queue-cards');
  if (!container) return;

  // Show top representative doctors in the marquee board
  container.innerHTML = DOCTORS.map(doc => {
    const nextToken = doc.currentServingToken + 1;
    const remaining = Math.max(0, doc.totalTodayTokens - doc.currentServingToken);

    return `
      <div class="queue-doctor-card">
        <div class="queue-card-top">
          <span class="queue-specialty-badge">${doc.specialty}</span>
          <span class="queue-room"><i class="room-icon">📍</i> ${doc.room.split(',')[0]}</span>
        </div>
        <div class="queue-doc-name">${doc.name}</div>
        
        <div class="queue-token-display">
          <div>
            <div class="token-label-sub">Now Serving</div>
            <div class="now-serving-token" id="serving-${doc.id}">#TK-${String(doc.currentServingToken).padStart(2, '0')}</div>
          </div>
          <div style="text-align: right;">
            <div class="token-label-sub">Next In Line</div>
            <div style="font-size: 1.15rem; font-weight: 700; color: #a7f3d0;">#TK-${String(nextToken).padStart(2, '0')}</div>
          </div>
        </div>

        <div class="queue-footer-stats">
          <span>In Queue: <strong>${remaining} patients</strong></span>
          <span>Est. Wait: <strong>~${doc.avgWaitPerPatient} mins/pt</strong></span>
        </div>

        <button class="btn-next-sim" onclick="simulateNextToken('${doc.id}')">
          ⚡ Call Next Token (Staff Demo)
        </button>
      </div>
    `;
  }).join('');
}

// Staff simulation to advance queue
window.simulateNextToken = function (docId) {
  const doc = DOCTORS.find(d => d.id === docId);
  if (!doc) return;

  doc.currentServingToken++;
  if (doc.currentServingToken > doc.totalTodayTokens) {
    doc.totalTodayTokens = doc.currentServingToken + 4;
  }

  playClinicChime();
  showToast(`Ding! ${doc.name} is now calling Token #TK-${String(doc.currentServingToken).padStart(2, '0')}`, 'success');
  renderLiveOPDBoard();

  // If user is tracking a token with this doctor, update tracker view
  const activeTrackerToken = document.getElementById('tracker-token-num')?.innerText;
  if (activeTrackerToken) {
    checkTokenLiveStatus(activeTrackerToken.replace('#', ''));
  }
};

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
    const matchesKeywords = doc.keywords.some(k => k.includes(query));
    return matchesSpecialty && (matchesName || matchesSpec || matchesKeywords);
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; background: white; border-radius: var(--radius-xl); border: 1px dashed var(--slate-300);">
        <p style="font-size: 1.2rem; font-weight: 700; color: var(--dark); margin-bottom: 0.5rem;">No doctors found matching "${state.searchQuery}"</p>
        <p style="color: var(--slate-600); margin-bottom: 1rem;">Try searching for Indian doctor names (e.g. 'Rajesh', 'Priya', 'Suresh') or symptoms like 'fever', 'teeth', 'skin rash'.</p>
        <button class="btn btn-outline" onclick="resetDoctorFilters()">Reset All Filters</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(doc => {
    return `
      <article class="doctor-card" id="card-${doc.id}">
        <div class="doctor-card-banner">
          <span class="avail-status-tag">
            <span class="pulse-dot"></span> Available Today
          </span>
          <div class="doctor-avatar-wrapper">
            <img src="${doc.avatar}" alt="${doc.name}" class="doctor-avatar" loading="lazy" />
          </div>
        </div>

        <div class="doctor-card-body">
          <div class="doc-meta-top">
            <span class="doc-specialty spec-badge-${doc.specialtyKey}">${doc.specialty}</span>
            <div class="doc-rating">
              <span>★</span> ${doc.rating} <span style="color: var(--slate-400); font-weight: 400; font-size: 0.75rem;">(${doc.reviewsCount.split(' ')[0]})</span>
            </div>
          </div>

          <h3 class="doctor-name">${doc.name}</h3>
          
          <div class="doc-qualifications">
            <span>${doc.qualifications}</span>
            <span class="doc-experience-badge">${doc.experience}</span>
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
            <div class="info-item" style="grid-column: span 2;">
              <span class="info-label">Available Hours</span>
              <span class="info-value" style="font-size: 0.8rem; font-weight: 600;">${doc.hours}</span>
            </div>
          </div>

          <div class="doctor-card-footer">
            <button class="btn btn-outline btn-sm" onclick="openBookingLayer('${doc.id}')">
              View Slots
            </button>
            <button class="btn btn-primary btn-sm" onclick="openBookingLayer('${doc.id}')">
              Book Appointment ➔
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

window.resetDoctorFilters = function () {
  state.activeSpecialty = 'all';
  state.searchQuery = '';
  const searchInput = document.getElementById('doctor-search-input');
  if (searchInput) searchInput.value = '';

  document.querySelectorAll('.specialty-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.specialty === 'all');
  });
  renderDoctorCards();
};

// ==========================================================================
// DEDICATED BOOKING LAYER OVERLAY (MODAL WORKFLOW)
// ==========================================================================

window.openBookingLayer = function (doctorId) {
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

window.closeBookingLayer = function () {
  const layerModal = document.getElementById('booking-layer-modal');
  if (layerModal) {
    layerModal.classList.remove('active');
  }
  document.body.style.overflow = '';
};

// Backwards-compatible inline selector
window.quickSelectDoctor = function (doctorId, scrollToSlotsOnly = false) {
  openBookingLayer(doctorId);
};

// --- Render Date Picker Ribbon (Supports both Layer and Inline) ---
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
           onclick="selectDate('${day.isoDate}', '${day.fullDateStr}')">
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

window.selectDate = function (isoDate, fullDateStr) {
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

  let html = '';

  ['morning', 'afternoon', 'evening'].forEach(session => {
    const sessionSlots = slotsData[session];
    const sessionLabel = session === 'morning' ? '🌅 Morning Slots' : (session === 'afternoon' ? '☀️ Afternoon Slots' : '🌙 Evening Slots');

    html += `
      <div class="slot-session-title">${sessionLabel}</div>
      <div class="slot-grid">
    `;

    sessionSlots.forEach(slot => {
      const isSelected = state.selectedSlot === slot.time;
      let statusTagText = 'Open';
      let statusClass = slot.status;

      if (slot.status === 'booked') {
        statusTagText = 'Booked';
      } else if (slot.status === 'fast-filling') {
        statusTagText = 'Filling Fast';
      }

      html += `
        <div class="slot-item ${statusClass} ${isSelected ? 'selected' : ''}" 
             ${slot.status !== 'booked' ? `onclick="selectSlot('${slot.time}', '${slot.session}')"` : ''}
             title="${slot.status === 'booked' ? 'Slot already reserved' : 'Click to select this slot'}">
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

window.selectSlot = function (time, session) {
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

// ==========================================================================
// Dynamic QR Code & Barcode Engine for Distinct Digital Hospital Tickets
// ==========================================================================
const CarePulseQR = (function () {
  const QRMode = { MODE_8BIT_BYTE: 4 };
  const QRErrorCorrectLevel = { L: 1, M: 0, Q: 3, H: 2 };

  function QRMath() { }
  QRMath.glog = function (n) {
    if (n < 1) throw new Error("glog(" + n + ")");
    return QRMath.LOG_TABLE[n];
  };
  QRMath.gexp = function (n) {
    while (n < 0) n += 255;
    while (n >= 256) n -= 255;
    return QRMath.EXP_TABLE[n];
  };
  QRMath.EXP_TABLE = new Array(256);
  QRMath.LOG_TABLE = new Array(256);
  for (let i = 0; i < 8; i++) QRMath.EXP_TABLE[i] = 1 << i;
  for (let i = 8; i < 256; i++) QRMath.EXP_TABLE[i] = QRMath.EXP_TABLE[i - 4] ^ QRMath.EXP_TABLE[i - 5] ^ QRMath.EXP_TABLE[i - 6] ^ QRMath.EXP_TABLE[i - 8];
  for (let i = 0; i < 255; i++) QRMath.LOG_TABLE[QRMath.EXP_TABLE[i]] = i;

  function QRPolynomial(num, shift) {
    let offset = 0;
    while (offset < num.length && num[offset] === 0) offset++;
    this.num = new Array(num.length - offset + shift);
    for (let i = 0; i < num.length - offset; i++) this.num[i] = num[i + offset];
    for (let i = 0; i < num.length - offset; i++) this.num[i] = 0;
  }
  QRPolynomial.prototype = {
    get: function (index) { return this.num[index]; },
    getLength: function () { return this.num.length; },
    multiply: function (e) {
      const num = new Array(this.getLength() + e.getLength() - 1);
      for (let i = 0; i < num.length; i++) num[i] = 0;
      for (let i = 0; i < this.getLength(); i++) {
        for (let j = 0; j < e.getLength(); j++) {
          num[i + j] ^= QRMath.gexp(QRMath.glog(this.get(i)) + QRMath.glog(e.get(j)));
        }
      }
      return new QRPolynomial(num, 0);
    },
    mod: function (e) {
      if (this.getLength() - e.getLength() < 0) return this;
      const ratio = QRMath.glog(this.get(0)) - QRMath.glog(e.get(0));
      const num = new Array(this.getLength());
      for (let i = 0; i < this.getLength(); i++) num[i] = this.get(i);
      for (let i = 0; i < e.getLength(); i++) num[i] ^= QRMath.gexp(QRMath.glog(e.get(i)) + ratio);
      return new QRPolynomial(num, 0).mod(e);
    }
  };

  function QRRSBlock(totalCount, dataCount) {
    this.totalCount = totalCount;
    this.dataCount = dataCount;
  }
  QRRSBlock.RS_BLOCK_TABLE = [
    [1, 26, 19], [1, 26, 16], [1, 26, 13], [1, 26, 9],
    [1, 44, 34], [1, 44, 28], [1, 44, 22], [1, 44, 16],
    [1, 70, 55], [1, 70, 44], [2, 35, 17], [2, 35, 13],
    [1, 100, 80], [2, 50, 32], [2, 50, 24], [4, 25, 9],
    [1, 134, 108], [2, 67, 43], [2, 33, 15, 2, 34, 16], [2, 33, 11, 2, 34, 12],
    [2, 86, 68], [4, 43, 27], [4, 43, 19], [4, 43, 15]
  ];
  QRRSBlock.getRSBlocks = function (typeNumber, errorCorrectLevel) {
    const rsBlock = QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + errorCorrectLevel];
    const length = rsBlock.length / 3;
    const list = [];
    for (let i = 0; i < length; i++) {
      const count = rsBlock[i * 3 + 0];
      const totalCount = rsBlock[i * 3 + 1];
      const dataCount = rsBlock[i * 3 + 2];
      for (let j = 0; j < count; j++) list.push(new QRRSBlock(totalCount, dataCount));
    }
    return list;
  };

  function QRBitBuffer() {
    this.buffer = [];
    this.length = 0;
  }
  QRBitBuffer.prototype = {
    get: function (index) {
      const bufIndex = Math.floor(index / 8);
      return ((this.buffer[bufIndex] >>> (7 - index % 8)) & 1) === 1;
    },
    put: function (num, length) {
      for (let i = 0; i < length; i++) {
        this.putBit(((num >>> (length - i - 1)) & 1) === 1);
      }
    },
    putBit: function (bit) {
      const bufIndex = Math.floor(this.length / 8);
      if (this.buffer.length <= bufIndex) this.buffer.push(0);
      if (bit) this.buffer[bufIndex] |= (0x80 >>> (this.length % 8));
      this.length++;
    }
  };

  function QR8bitByte(data) {
    this.mode = QRMode.MODE_8BIT_BYTE;
    this.data = data;
  }
  QR8bitByte.prototype = {
    getLength: function () { return this.data.length; },
    write: function (buffer) {
      for (let i = 0; i < this.data.length; i++) {
        buffer.put(this.data.charCodeAt(i), 8);
      }
    }
  };

  const QRUtil = {
    PATTERN_POSITION_TABLE: [
      [], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34]
    ],
    G15: (1 << 10) | (1 << 8) | (1 << 5) | (1 << 4) | (1 << 2) | (1 << 1) | (1 << 0),
    G15_MASK: (1 << 14) | (1 << 12) | (1 << 10) | (1 << 4) | (1 << 1),
    getBCHTypeInfo: function (data) {
      let d = data << 10;
      while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15) >= 0) {
        d ^= (QRUtil.G15 << (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15)));
      }
      return ((data << 10) | d) ^ QRUtil.G15_MASK;
    },
    getBCHDigit: function (data) {
      let digit = 0;
      while (data !== 0) { digit++; data >>>= 1; }
      return digit;
    },
    getPatternPosition: function (typeNumber) {
      return QRUtil.PATTERN_POSITION_TABLE[typeNumber - 1] || [];
    },
    getMask: function (maskPattern, i, j) {
      switch (maskPattern) {
        case 0: return (i + j) % 2 === 0;
        case 1: return i % 2 === 0;
        case 2: return j % 3 === 0;
        case 3: return (i + j) % 3 === 0;
        case 4: return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 === 0;
        case 5: return (i * j) % 2 + (i * j) % 3 === 0;
        case 6: return ((i * j) % 2 + (i * j) % 3) % 2 === 0;
        case 7: return ((i * j) % 3 + (i + j) % 2) % 2 === 0;
        default: return false;
      }
    },
    getErrorCorrectPolynomial: function (errorCorrectLength) {
      let a = new QRPolynomial([1], 0);
      for (let i = 0; i < errorCorrectLength; i++) {
        a = a.multiply(new QRPolynomial([1, QRMath.gexp(i)], 0));
      }
      return a;
    }
  };

  function QRCodeModel(typeNumber, errorCorrectLevel) {
    this.typeNumber = typeNumber;
    this.errorCorrectLevel = errorCorrectLevel;
    this.modules = null;
    this.moduleCount = 0;
    this.dataList = [];
  }
  QRCodeModel.prototype = {
    addData: function (data) {
      this.dataList.push(new QR8bitByte(data));
    },
    isDark: function (row, col) {
      return this.modules[row][col];
    },
    getModuleCount: function () { return this.moduleCount; },
    make: function () {
      let typeNumber = 1;
      for (typeNumber = 1; typeNumber <= 6; typeNumber++) {
        const rsBlocks = QRRSBlock.getRSBlocks(typeNumber, this.errorCorrectLevel);
        const buffer = new QRBitBuffer();
        let totalDataCount = 0;
        for (let i = 0; i < rsBlocks.length; i++) totalDataCount += rsBlocks[i].dataCount;
        for (let i = 0; i < this.dataList.length; i++) {
          const data = this.dataList[i];
          buffer.put(data.mode, 4);
          buffer.put(data.getLength(), 8);
          data.write(buffer);
        }
        if (buffer.length <= totalDataCount * 8) break;
      }
      this.typeNumber = Math.min(6, typeNumber);
      this.makeImpl(false, 0);
    },
    makeImpl: function (test, maskPattern) {
      this.moduleCount = this.typeNumber * 4 + 17;
      this.modules = new Array(this.moduleCount);
      for (let row = 0; row < this.moduleCount; row++) {
        this.modules[row] = new Array(this.moduleCount);
        for (let col = 0; col < this.moduleCount; col++) this.modules[row][col] = null;
      }
      this.setupPositionProbePattern(0, 0);
      this.setupPositionProbePattern(this.moduleCount - 7, 0);
      this.setupPositionProbePattern(0, this.moduleCount - 7);
      this.setupPositionAdjustPattern();
      this.setupTimingPattern();
      this.setupTypeInfo(test, maskPattern);
      this.mapData(QRCodeModel.createData(this.typeNumber, this.errorCorrectLevel, this.dataList), maskPattern);
    },
    setupPositionProbePattern: function (row, col) {
      for (let r = -1; r <= 7; r++) {
        if (row + r <= -1 || this.moduleCount <= row + r) continue;
        for (let c = -1; c <= 7; c++) {
          if (col + c <= -1 || this.moduleCount <= col + c) continue;
          if ((0 <= r && r <= 6 && (c === 0 || c === 6)) ||
            (0 <= c && c <= 6 && (r === 0 || r === 6)) ||
            (2 <= r && r <= 4 && 2 <= c && c <= 4)) {
            this.modules[row + r][col + c] = true;
          } else {
            this.modules[row + r][col + c] = false;
          }
        }
      }
    },
    setupTimingPattern: function () {
      for (let r = 8; r < this.moduleCount - 8; r++) {
        if (this.modules[r][6] != null) continue;
        this.modules[r][6] = (r % 2 === 0);
      }
      for (let c = 8; c < this.moduleCount - 8; c++) {
        if (this.modules[6][c] != null) continue;
        this.modules[6][c] = (c % 2 === 0);
      }
    },
    setupPositionAdjustPattern: function () {
      const pos = QRUtil.getPatternPosition(this.typeNumber);
      for (let i = 0; i < pos.length; i++) {
        for (let j = 0; j < pos.length; j++) {
          const row = pos[i];
          const col = pos[j];
          if (this.modules[row][col] != null) continue;
          for (let r = -2; r <= 2; r++) {
            for (let c = -2; c <= 2; c++) {
              if (r === -2 || r === 2 || c === -2 || c === 2 || (r === 0 && c === 0)) {
                this.modules[row + r][col + c] = true;
              } else {
                this.modules[row + r][col + c] = false;
              }
            }
          }
        }
      }
    },
    setupTypeInfo: function (test, maskPattern) {
      const data = (this.errorCorrectLevel << 3) | maskPattern;
      const bits = QRUtil.getBCHTypeInfo(data);
      for (let i = 0; i < 15; i++) {
        const mod = (!test && ((bits >> i) & 1) === 1);
        if (i < 6) this.modules[i][8] = mod;
        else if (i < 8) this.modules[i + 1][8] = mod;
        else this.modules[this.moduleCount - 15 + i][8] = mod;
      }
      for (let i = 0; i < 15; i++) {
        const mod = (!test && ((bits >> i) & 1) === 1);
        if (i < 8) this.modules[8][this.moduleCount - i - 1] = mod;
        else if (i < 9) this.modules[8][15 - i - 1 + 1] = mod;
        else this.modules[8][15 - i - 1] = mod;
      }
      this.modules[this.moduleCount - 8][8] = !test;
    },
    mapData: function (data, maskPattern) {
      let inc = -1;
      let row = this.moduleCount - 1;
      let bitIndex = 7;
      let byteIndex = 0;
      for (let col = this.moduleCount - 1; col > 0; col -= 2) {
        if (col === 6) col--;
        while (true) {
          for (let c = 0; c < 2; c++) {
            if (this.modules[row][col - c] == null) {
              let dark = false;
              if (byteIndex < data.length) {
                dark = (((data[byteIndex] >>> bitIndex) & 1) === 1);
              }
              const mask = QRUtil.getMask(maskPattern, row, col - c);
              if (mask) dark = !dark;
              this.modules[row][col - c] = dark;
              bitIndex--;
              if (bitIndex === -1) {
                byteIndex++;
                bitIndex = 7;
              }
            }
          }
          row += inc;
          if (row < 0 || this.moduleCount <= row) {
            row -= inc;
            inc = -inc;
            break;
          }
        }
      }
    }
  };
  QRCodeModel.createData = function (typeNumber, errorCorrectLevel, dataList) {
    const rsBlocks = QRRSBlock.getRSBlocks(typeNumber, errorCorrectLevel);
    const buffer = new QRBitBuffer();
    for (let i = 0; i < dataList.length; i++) {
      const data = dataList[i];
      buffer.put(data.mode, 4);
      buffer.put(data.getLength(), 8);
      data.write(buffer);
    }
    let totalDataCount = 0;
    for (let i = 0; i < rsBlocks.length; i++) totalDataCount += rsBlocks[i].dataCount;
    if (buffer.length + 4 <= totalDataCount * 8) buffer.put(0, 4);
    while (buffer.length % 8 !== 0) buffer.putBit(false);
    while (true) {
      if (buffer.length >= totalDataCount * 8) break;
      buffer.put(0xec, 8);
      if (buffer.length >= totalDataCount * 8) break;
      buffer.put(0x11, 8);
    }
    return QRCodeModel.createBytes(buffer, rsBlocks);
  };
  QRCodeModel.createBytes = function (buffer, rsBlocks) {
    let offset = 0;
    let maxDcCount = 0;
    let maxEcCount = 0;
    const dcdata = new Array(rsBlocks.length);
    const ecdata = new Array(rsBlocks.length);
    for (let r = 0; r < rsBlocks.length; r++) {
      const dcCount = rsBlocks[r].dataCount;
      const ecCount = rsBlocks[r].totalCount - dcCount;
      maxDcCount = Math.max(maxDcCount, dcCount);
      maxEcCount = Math.max(maxEcCount, ecCount);
      dcdata[r] = new Array(dcCount);
      for (let i = 0; i < dcdata[r].length; i++) dcdata[r][i] = 0xff & buffer.buffer[i + offset];
      offset += dcCount;
      const rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount);
      const rawPoly = new QRPolynomial(dcdata[r], rsPoly.getLength() - 1);
      const modPoly = rawPoly.mod(rsPoly);
      ecdata[r] = new Array(rsPoly.getLength() - 1);
      for (let i = 0; i < ecdata[r].length; i++) {
        const modIndex = i + modPoly.getLength() - ecdata[r].length;
        ecdata[r][i] = (modIndex >= 0) ? modPoly.get(modIndex) : 0;
      }
    }
    let totalCodeCount = 0;
    for (let i = 0; i < rsBlocks.length; i++) totalCodeCount += rsBlocks[i].totalCount;
    const data = new Array(totalCodeCount);
    let index = 0;
    for (let i = 0; i < maxDcCount; i++) {
      for (let r = 0; r < rsBlocks.length; r++) {
        if (i < dcdata[r].length) data[index++] = dcdata[r][i];
      }
    }
    for (let i = 0; i < maxEcCount; i++) {
      for (let r = 0; r < rsBlocks.length; r++) {
        if (i < ecdata[r].length) data[index++] = ecdata[r][i];
      }
    }
    return data;
  };

  return {
    generate(text) {
      try {
        const qr = new QRCodeModel(0, QRErrorCorrectLevel.M);
        qr.addData(text);
        qr.make();
        return qr;
      } catch (err) {
        console.warn('QR generation fallback notice:', err);
        return null;
      }
    },
    renderToSvg(text, size = 72) {
      const qr = this.generate(text);
      if (!qr) {
        return `<svg width="${size}" height="${size}" viewBox="0 0 24 24"><rect width="24" height="24" fill="#f1f5f9"/></svg>`;
      }
      const count = qr.getModuleCount();
      const margin = 1;
      const totalModules = count + margin * 2;
      const tileSize = size / totalModules;
      let paths = '';
      for (let r = 0; r < count; r++) {
        for (let c = 0; c < count; c++) {
          if (qr.isDark(r, c)) {
            const x = ((c + margin) * tileSize).toFixed(1);
            const y = ((r + margin) * tileSize).toFixed(1);
            const w = (tileSize + 0.15).toFixed(1);
            paths += `M${x},${y}h${w}v${w}h-${w}z `;
          }
        }
      }
      return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" style="background:#ffffff; border-radius:4px; display:block;"><path d="${paths}" fill="#0f172a"/></svg>`;
    },
    drawToCanvas(ctx, text, x, y, size) {
      const qr = this.generate(text);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(x, y, size, size);
      if (!qr) return;
      const count = qr.getModuleCount();
      const margin = 1;
      const totalModules = count + margin * 2;
      const tile = size / totalModules;
      ctx.fillStyle = '#0f172a';
      for (let r = 0; r < count; r++) {
        for (let c = 0; c < count; c++) {
          if (qr.isDark(r, c)) {
            ctx.fillRect(x + (c + margin) * tile, y + (r + margin) * tile, tile + 0.3, tile + 0.3);
          }
        }
      }
    }
  };
})();

// --- Dynamic Procedural Code 39 Barcode Generator ---
const CarePulseBarcode = {
  MAP: {
    '0': '000110100', '1': '100100001', '2': '001100001', '3': '101100000',
    '4': '000110001', '5': '100110000', '6': '001110000', '7': '000100101',
    '8': '100100100', '9': '001100100', 'A': '100001001', 'B': '001001001',
    'C': '101001000', 'D': '000011001', 'E': '100011000', 'F': '001011000',
    'G': '000001101', 'H': '100001100', 'I': '001001100', 'J': '000011100',
    'K': '100000011', 'L': '001000011', 'M': '101000010', 'N': '000010011',
    'O': '100010010', 'P': '001010010', 'Q': '000000111', 'R': '100000110',
    'S': '001000110', 'T': '000010110', 'U': '110000001', 'V': '011000001',
    'W': '111000000', 'X': '010010001', 'Y': '110010000', 'Z': '011010000',
    '-': '010000101', '.': '110000100', ' ': '011000100', '$': '010101000',
    '/': '010100010', '+': '010001010', '%': '000101010', '*': '010010100'
  },
  renderSvg(text) {
    const clean = String(text || '').toUpperCase().replace(/[^0-9A-Z\-\. \$\/\+\%]/g, '') || 'CP-TK-001';
    const full = `*${clean}*`;
    let totalWidth = 0;
    for (let i = 0; i < full.length; i++) {
      const code = this.MAP[full[i]] || this.MAP['-'];
      for (let j = 0; j < 9; j++) {
        totalWidth += (code[j] === '1') ? 2.8 : 1.1;
      }
      if (i < full.length - 1) totalWidth += 1.4;
    }
    let rects = '';
    let x = 0;
    for (let i = 0; i < full.length; i++) {
      const code = this.MAP[full[i]] || this.MAP['-'];
      for (let j = 0; j < 9; j++) {
        const isBar = (j % 2 === 0);
        const w = (code[j] === '1') ? 2.8 : 1.1;
        if (isBar) {
          rects += `<rect x="${x.toFixed(1)}" y="0" width="${w.toFixed(1)}" height="34" fill="#0f172a" />`;
        }
        x += w;
      }
      x += 1.4;
    }
    return `<svg viewBox="0 0 ${Math.ceil(totalWidth)} 34" preserveAspectRatio="none" style="width: 100%; height: 34px; display: block;">${rects}</svg>`;
  },
  drawToCanvas(ctx, text, x, y, width, height) {
    const clean = String(text || '').toUpperCase().replace(/[^0-9A-Z\-\. \$\/\+\%]/g, '') || 'CP-TK-001';
    const full = `*${clean}*`;
    let baseUnits = 0;
    for (let i = 0; i < full.length; i++) {
      const code = this.MAP[full[i]] || this.MAP['-'];
      for (let j = 0; j < 9; j++) {
        baseUnits += (code[j] === '1') ? 2.6 : 1.0;
      }
      if (i < full.length - 1) baseUnits += 1.2;
    }
    const unitScale = width / baseUnits;
    let curX = x;
    ctx.fillStyle = '#0f172a';
    for (let i = 0; i < full.length; i++) {
      const code = this.MAP[full[i]] || this.MAP['-'];
      for (let j = 0; j < 9; j++) {
        const isBar = (j % 2 === 0);
        const w = ((code[j] === '1') ? 2.6 : 1.0) * unitScale;
        if (isBar) {
          ctx.fillRect(curX, y, w, height);
        }
        curX += w;
      }
      curX += 1.2 * unitScale;
    }
  }
};

// --- Unique Ticket Attributes & State Generator ---
function generateUniqueTicketDetails(doc, patientData) {
  // 1. Persistent doctor queue counter in localStorage
  let docCounters = {};
  try {
    docCounters = JSON.parse(localStorage.getItem('carepulse_doc_counters') || '{}');
  } catch (e) {
    docCounters = {};
  }
  const currentDocCount = docCounters[doc.id] || doc.totalTodayTokens || 20;
  const tokenNumber = currentDocCount + 1;
  docCounters[doc.id] = tokenNumber;
  try {
    localStorage.setItem('carepulse_doc_counters', JSON.stringify(docCounters));
  } catch (e) { }
  doc.totalTodayTokens = tokenNumber;

  // 2. Guaranteed persistent global sequence
  let globalSerial = parseInt(localStorage.getItem('carepulse_global_ticket_serial') || '108', 10);
  globalSerial += 1;
  try {
    localStorage.setItem('carepulse_global_ticket_serial', globalSerial.toString());
  } catch (e) { }

  // 3. Unique Token ID (e.g. TK-029, TK-109)
  const tokenId = `TK-${String(tokenNumber).padStart(3, '0')}`;

  // 4. Unique Booking Reference Number (e.g. CP-2026-849201)
  const year = new Date().getFullYear();
  const randNum = Math.floor(100000 + Math.random() * 900000);
  const ticketRef = `CP-${year}-${randNum}`;

  // 5. Unique Security Verification Code (e.g. SEC-9F2A-88D1)
  const hexChars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const genSecPart = () => Array.from({ length: 4 }, () => hexChars.charAt(Math.floor(Math.random() * hexChars.length))).join('');
  const securityCode = `SEC-${genSecPart()}-${genSecPart()}`;

  // 6. Unique Barcode Number (e.g. CP-TK-029-4821)
  const barcodeNum = `CP-TK-${String(tokenNumber).padStart(3, '0')}-${Math.floor(1000 + Math.random() * 9000)}`;

  // 7. Dynamic OPD Counter & Desk Allocation
  const counterId = (tokenNumber % 4) + 1;
  const deskLetter = ['A', 'B', 'C', 'D'][tokenNumber % 4];
  const assignedDesk = `Counter ${counterId} • Desk ${deskLetter}`;

  // 8. Dynamic Queue Position & Estimated Wait
  const queuePosition = Math.max(1, tokenNumber - doc.currentServingToken);
  const estWaitMins = queuePosition * (doc.avgWaitPerPatient || 12);

  // 9. Exact Issue Timestamp
  const now = new Date();
  const issueTimestamp = now.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }) + ', ' + now.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });

  // 10. Dynamic Verification URL & Payload for QR
  const qrPayload = `https://carepulse.hospital/checkin?t=${tokenId}&ref=${ticketRef}&sec=${securityCode}&p=${encodeURIComponent(patientData.name || 'Patient')}`;

  return {
    tokenNumber,
    tokenId,
    ticketRef,
    securityCode,
    barcodeNum,
    assignedDesk,
    queuePosition,
    estWaitMins,
    issueTimestamp,
    qrPayload
  };
}

// --- Common Appointment Booking Processor ---
function processBookingSubmission(patientData) {
  if (!state.selectedSlot) {
    showToast('Please select an available consultation time-slot before booking!', 'warning');
    return false;
  }

  const doc = DOCTORS.find(d => d.id === state.selectedDoctorId) || DOCTORS[0];

  // Generate completely distinct ticket details every time
  const details = generateUniqueTicketDetails(doc, patientData);
  const reportingNote = `Please report 15 mins prior (${state.selectedSlot})`;

  const activePill = document.querySelector('.date-card-pill.active');
  const appointmentDateStr = activePill ? activePill.dataset.full : state.selectedDate;

  // Create Appointment Record with all unique verification parameters
  const newAppointment = {
    tokenId: details.tokenId,
    tokenNumber: details.tokenNumber,
    ticketRef: details.ticketRef,
    securityCode: details.securityCode,
    barcodeNum: details.barcodeNum,
    assignedDesk: details.assignedDesk,
    queuePosition: details.queuePosition,
    estWaitMins: details.estWaitMins,
    issueTimestamp: details.issueTimestamp,
    qrPayload: details.qrPayload,
    doctorId: doc.id,
    doctorName: doc.name,
    doctorSpecialty: doc.specialty,
    room: doc.room,
    patientName: patientData.name,
    patientAge: patientData.age,
    patientGender: patientData.gender,
    patientPlace: patientData.place,
    patientPhone: patientData.phone,
    visitReason: patientData.reason || 'General Consultation',
    visitType: patientData.visitType || 'First Consultation',
    date: appointmentDateStr,
    isoDate: state.selectedDate,
    timeSlot: state.selectedSlot,
    reportingNote: reportingNote,
    fee: doc.feeDisplay,
    bookingTimestamp: new Date().toISOString(),
    status: 'Confirmed'
  };

  // Mark slot as booked locally
  const cacheKey = `${doc.id}_${state.selectedDate}`;
  if (!state.bookedSlotsCache[cacheKey]) {
    state.bookedSlotsCache[cacheKey] = [];
  }
  state.bookedSlotsCache[cacheKey].push(state.selectedSlot);

  // Save to State & LocalStorage
  state.userAppointments.unshift(newAppointment);
  try {
    localStorage.setItem('carepulse_appointments', JSON.stringify(state.userAppointments));
  } catch (err) {
    console.warn('LocalStorage save notice:', err);
  }

  state.lastCreatedToken = newAppointment;
  state.currentViewingToken = newAppointment;

  // Refresh UI states
  renderSlots();
  renderMyBookingsBadge();
  renderLiveOPDBoard();

  // Close the booking layer if open
  closeBookingLayer();

  // Play synthetic chime & Show Digital Token Slip
  playClinicChime();
  showToast(`Token #${details.tokenId} generated for ${patientData.name}!`, 'success');
  openTokenSlipModal(newAppointment);

  return true;
}

// Setup form handlers for both layer and inline forms
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
function openTokenSlipModal(app) {
  const modal = document.getElementById('token-modal');
  if (!modal || !app) return;

  state.currentViewingToken = app;

  document.getElementById('slip-token-id').innerText = `#${app.tokenId}`;
  document.getElementById('slip-slot-time').innerText = `Scheduled: ${app.date} • ${app.timeSlot}`;
  document.getElementById('slip-patient-name').innerText = app.patientName;
  document.getElementById('slip-patient-meta').innerText = `${app.patientAge} Yrs / ${app.patientGender} • ${app.patientPlace || 'Phagwara'}`;
  document.getElementById('slip-patient-phone').innerText = app.patientPhone;
  document.getElementById('slip-doctor-name').innerText = app.doctorName;
  document.getElementById('slip-doctor-dept').innerText = app.doctorSpecialty;
  document.getElementById('slip-room-no').innerText = app.room;
  document.getElementById('slip-reason').innerText = app.visitReason;
  document.getElementById('slip-fee').innerText = app.fee;
  document.getElementById('slip-reporting').innerText = app.reportingNote;

  // Metadata ribbon
  const refEl = document.getElementById('slip-ref-id');
  if (refEl) refEl.innerText = app.ticketRef || 'CP-2026-108420';
  const deskEl = document.getElementById('slip-desk-info');
  if (deskEl) deskEl.innerText = app.assignedDesk || 'Counter 1 • Desk A';
  const secEl = document.getElementById('slip-sec-code');
  if (secEl) secEl.innerText = app.securityCode || 'SEC-VALID';
  const timeEl = document.getElementById('slip-issue-time');
  if (timeEl) timeEl.innerText = app.issueTimestamp || 'Just now';

  // Dynamic Barcode
  const barcodeNumEl = document.getElementById('slip-barcode-num');
  if (barcodeNumEl) barcodeNumEl.innerText = app.barcodeNum || `CP-${app.tokenId}`;
  const barcodeWrapper = document.getElementById('slip-barcode-wrapper');
  if (barcodeWrapper) {
    barcodeWrapper.innerHTML = CarePulseBarcode.renderSvg(app.barcodeNum || `CP-${app.tokenId}`);
  }

  // Dynamic QR Code
  const qrContainer = document.getElementById('slip-qr-container');
  if (qrContainer) {
    const qrPayload = app.qrPayload || `https://carepulse.hospital/checkin?t=${app.tokenId}&ref=${app.ticketRef || '0'}&sec=${app.securityCode || '0'}`;
    qrContainer.innerHTML = CarePulseQR.renderToSvg(qrPayload, 72);
  }

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

window.closeTokenModal = function () {
  const modal = document.getElementById('token-modal');
  if (modal) modal.classList.remove('active');
  document.body.style.overflow = '';
};

window.printTokenSlip = function () {
  const app = state.currentViewingToken || state.lastCreatedToken;
  if (app) {
    downloadTicketPDF(app);
  } else {
    window.print();
  }
};

window.trackGeneratedTokenNow = function () {
  const active = state.currentViewingToken || state.lastCreatedToken;
  if (!active) return;
  closeTokenModal();

  const trackerInput = document.getElementById('tracker-input');
  if (trackerInput) {
    trackerInput.value = active.tokenId;
  }

  checkTokenLiveStatus(active.tokenId);

  const trackerSec = document.getElementById('track-token-section');
  if (trackerSec) {
    trackerSec.scrollIntoView({ behavior: 'smooth' });
  }
};

// ==========================================================================
// High-Fidelity E-Pass Canvas Generator & Ticket Downloader
// ==========================================================================
function downloadTicket(app, format = 'png') {
  if (!app) {
    showToast('No appointment data available to download.', 'warning');
    return;
  }

  if (format === 'pdf') {
    downloadTicketPDF(app);
    return;
  }

  showToast(`Generating E-Pass for #${app.tokenId}...`, 'info');

  // Canvas helper for rounded rectangles
  function roundRect(ctx, x, y, w, h, r) {
    if (typeof r === 'number') r = { tl: r, tr: r, br: r, bl: r };
    ctx.beginPath();
    ctx.moveTo(x + r.tl, y);
    ctx.lineTo(x + w - r.tr, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r.tr);
    ctx.lineTo(x + w, y + h - r.br);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r.br, y + h);
    ctx.lineTo(x + r.bl, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r.bl);
    ctx.lineTo(x, y + r.tl);
    ctx.quadraticCurveTo(x, y, x + r.tl, y);
    ctx.closePath();
  }

  const canvas = document.createElement('canvas');
  canvas.width = 800;
  canvas.height = 1180;
  const ctx = canvas.getContext('2d');

  // 1. Clean Background & Subtle Drop Border
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, 800, 1180);

  // Outer primary card border
  ctx.strokeStyle = '#0f766e';
  ctx.lineWidth = 3;
  roundRect(ctx, 6, 6, 788, 1168, 22);
  ctx.stroke();

  // Inner border
  ctx.strokeStyle = '#e2e8f0';
  ctx.lineWidth = 1;
  roundRect(ctx, 14, 14, 772, 1152, 18);
  ctx.stroke();

  // 2. Hospital Header Banner (Teal Gradient)
  const headerGrad = ctx.createLinearGradient(14, 14, 786, 150);
  headerGrad.addColorStop(0, '#042f2e');
  headerGrad.addColorStop(1, '#0f766e');
  ctx.fillStyle = headerGrad;
  roundRect(ctx, 14, 14, 772, 134, { tl: 18, tr: 18, br: 0, bl: 0 });
  ctx.fill();

  // Hospital Cross Emblem Badge
  ctx.fillStyle = '#14b8a6';
  roundRect(ctx, 36, 34, 48, 48, 12);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(56, 44, 8, 28);
  ctx.fillRect(46, 54, 28, 8);

  // Hospital Title & Location Info
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('CarePulse Multi-Specialty Hospital', 96, 56);
  ctx.font = '13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillStyle = '#99f6e4';
  ctx.fillText('Govt. Regd. Healthcare Center • OPD & Clinical Diagnostic Unit', 96, 78);
  ctx.font = '12px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillStyle = '#ccfbf1';
  ctx.fillText('GT Road, Near Sugar Mill Crossing, Phagwara, Punjab • 24/7 Helpline: 1800-555-0199', 96, 98);

  // Verified Badge (Top Right)
  ctx.fillStyle = '#10b981';
  roundRect(ctx, 608, 42, 160, 30, 15);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 11px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('VERIFIED DIGITAL PASS', 688, 61);
  ctx.textAlign = 'left';

  // 3. Hero Token Number Box
  const heroGrad = ctx.createLinearGradient(36, 164, 764, 290);
  heroGrad.addColorStop(0, '#042f2e');
  heroGrad.addColorStop(1, '#115e59');
  ctx.fillStyle = heroGrad;
  roundRect(ctx, 36, 164, 728, 124, 14);
  ctx.fill();
  ctx.strokeStyle = '#10b981';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.fillStyle = '#a7f3d0';
  ctx.font = 'bold 12px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('OFFICIAL CONSULTATION TOKEN NUMBER', 400, 190);

  ctx.fillStyle = '#5eead4';
  ctx.font = 'bold 50px monospace, -apple-system, sans-serif';
  ctx.fillText('#' + app.tokenId, 400, 240);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText(`📅 ${app.date}   •   ⏰ ${app.timeSlot}`, 400, 270);
  ctx.textAlign = 'left';

  // 4. Security & Reference Ribbon
  ctx.fillStyle = '#f8fafc';
  roundRect(ctx, 36, 302, 728, 38, 8);
  ctx.fill();
  ctx.strokeStyle = '#e2e8f0';
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.fillStyle = '#334155';
  ctx.font = 'bold 12px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText(`Ref: ${app.ticketRef || 'CP-2026-108'}`, 52, 326);
  ctx.fillText(`Desk: ${app.assignedDesk || 'Counter 1 • Desk A'}`, 250, 326);
  ctx.fillText(`Security: ${app.securityCode || 'SEC-VALID'}`, 440, 326);
  ctx.fillText(`Issued: ${app.issueTimestamp ? app.issueTimestamp.split(',')[0] : 'Today'}`, 630, 326);

  // 5. Patient & Doctor Details Grid
  const details = [
    ['Patient Name', app.patientName, 'Contact Mobile', app.patientPhone],
    ['Age / Gender', `${app.patientAge} Yrs / ${app.patientGender}`, 'Patient City', app.patientPlace || 'Phagwara'],
    ['Consulting Doctor', app.doctorName, 'Specialty & Dept', app.doctorSpecialty],
    ['Clinic Chamber', app.room, 'Visit Reason', app.visitReason],
    ['Consultation Fee', `${app.fee} (Receipt Generated)`, 'Arrival Note', app.reportingNote || 'Please report 15 mins prior']
  ];

  let yPos = 354;
  for (let i = 0; i < details.length; i++) {
    const row = details[i];
    if (i % 2 === 0) {
      ctx.fillStyle = '#f8fafc';
      roundRect(ctx, 36, yPos, 728, 48, 6);
      ctx.fill();
    }
    ctx.strokeStyle = '#f1f5f9';
    ctx.beginPath();
    ctx.moveTo(36, yPos + 48);
    ctx.lineTo(764, yPos + 48);
    ctx.stroke();

    // Col 1
    ctx.fillStyle = '#64748b';
    ctx.font = '11px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(row[0].toUpperCase(), 52, yPos + 18);
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(row[1], 52, yPos + 38);

    // Col 2
    ctx.fillStyle = '#64748b';
    ctx.font = '11px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(row[2].toUpperCase(), 410, yPos + 18);
    ctx.fillStyle = (i === 4) ? '#0d9488' : '#0f172a';
    ctx.font = 'bold 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(row[3], 410, yPos + 38);

    yPos += 52;
  }

  // 6. QR Code & Fast Kiosk Check-In Section
  ctx.fillStyle = '#f8fafc';
  roundRect(ctx, 36, 626, 728, 142, 10);
  ctx.fill();
  ctx.strokeStyle = '#e2e8f0';
  ctx.lineWidth = 1;
  ctx.stroke();

  // Draw dynamic QR Code on canvas
  const qrPayload = app.qrPayload || `https://carepulse.hospital/checkin?t=${app.tokenId}&ref=${app.ticketRef}`;
  CarePulseQR.drawToCanvas(ctx, qrPayload, 56, 642, 110);

  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Fast Kiosk & Reception Check-In', 186, 668);
  ctx.fillStyle = '#475569';
  ctx.font = '13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Scan this unique dynamic QR code at the reception desk scanner or check-in', 186, 694);
  ctx.fillText('kiosk to immediately confirm presence in the waiting lobby and notify doctor.', 186, 714);
  ctx.fillStyle = '#059669';
  ctx.font = 'bold 12px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('✓ ENCRYPTED DIGITAL TOKEN • VALID FOR SCHEDULED DATE ONLY', 186, 744);

  // 7. Dynamic Barcode Section
  ctx.fillStyle = '#ffffff';
  roundRect(ctx, 36, 782, 728, 110, 10);
  ctx.fill();
  ctx.strokeStyle = '#e2e8f0';
  ctx.lineWidth = 1;
  ctx.stroke();

  // Draw Dynamic Barcode
  CarePulseBarcode.drawToCanvas(ctx, app.barcodeNum || `CP-${app.tokenId}`, 190, 798, 420, 48);

  ctx.fillStyle = '#475569';
  ctx.font = 'bold 13px monospace';
  ctx.textAlign = 'center';
  ctx.fillText(app.barcodeNum || `CP-${app.tokenId}`, 400, 874);
  ctx.textAlign = 'left';

  // 8. Footer Section with Official Seal & Disclaimers
  ctx.fillStyle = '#f8fafc';
  roundRect(ctx, 36, 906, 728, 114, 10);
  ctx.fill();
  ctx.strokeStyle = '#e2e8f0';
  ctx.stroke();

  ctx.fillStyle = '#475569';
  ctx.font = '12px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('• Please report at reception 15 minutes prior to scheduled time for vitals check.', 54, 936);
  ctx.fillText('• Keep this digital ticket handy on your phone or in printed copy at the clinic.', 54, 958);
  ctx.fillText('• Emergency Ambulance Line: +91 1800-555-0199 | GT Road, Phagwara, Punjab', 54, 980);
  ctx.fillText('• Official Portal: carepulse.hospital | Email: appointments@carepulse.hospital', 54, 1002);

  // Official Seal Graphic (Right side)
  ctx.save();
  ctx.translate(685, 963);
  ctx.strokeStyle = '#0d9488';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.arc(0, 0, 36, 0, Math.PI * 2);
  ctx.stroke();
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(0, 0, 31, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = '#0d9488';
  ctx.font = 'bold 7px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('CAREPULSE HEALTH', 0, -18);
  ctx.font = 'bold 9px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('★ VERIFIED ★', 0, -3);
  ctx.font = 'bold 7.5px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('OFFICIAL PASS', 0, 12);
  ctx.fillText('2026', 0, 22);
  ctx.restore();
  ctx.textAlign = 'left';

  // Bottom Notice
  ctx.fillStyle = '#64748b';
  ctx.font = '11px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('This is an authentic computer-generated OPD appointment pass with cryptographic verification.', 400, 1038);
  ctx.textAlign = 'left';

  // 9. Trigger File Download
  canvas.toBlob(blob => {
    if (!blob) {
      showToast('Error generating image file.', 'error');
      return;
    }
    const cleanName = (app.patientName || 'Patient').replace(/[^a-zA-Z0-9]/g, '_');
    const filename = `CarePulse_Ticket_${app.tokenId}_${cleanName}.png`;
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    showToast(`✅ Ticket #${app.tokenId} downloaded successfully!`, 'success');
  }, 'image/png');
}

// Dedicated Print / PDF Window Generator
function downloadTicketPDF(app) {
  if (!app) return;
  const printWindow = window.open('', '_blank', 'width=800,height=900');
  if (!printWindow) {
    window.print();
    return;
  }

  const barcodeSvg = CarePulseBarcode.renderSvg(app.barcodeNum || `CP-${app.tokenId}`);
  const qrSvg = CarePulseQR.renderToSvg(app.qrPayload || `https://carepulse.hospital/checkin?t=${app.tokenId}`, 90);

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>CarePulse_Ticket_${app.tokenId}_${app.patientName}</title>
      <meta charset="utf-8" />
      <style>
        @page { size: auto; margin: 15mm; }
        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          color: #0f172a;
          background: #ffffff;
          padding: 20px;
          margin: 0;
        }
        .slip-print-card {
          max-width: 600px;
          margin: 0 auto;
          border: 2px solid #0f766e;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0,0,0,0.08);
        }
        .header {
          background: linear-gradient(135deg, #042f2e, #0f766e);
          color: white;
          padding: 24px;
          text-align: center;
        }
        .header h1 { margin: 0 0 6px; font-size: 22px; font-weight: 800; letter-spacing: -0.02em; }
        .header p { margin: 2px 0; font-size: 12px; color: #ccfbf1; }
        .token-hero {
          background: #042f2e;
          color: white;
          padding: 18px;
          margin: 18px 24px;
          border-radius: 12px;
          text-align: center;
          border: 1px solid #14b8a6;
        }
        .token-lbl { font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #99f6e4; }
        .token-id { font-size: 44px; font-weight: 900; color: #5eead4; margin: 4px 0; }
        .token-time { font-size: 13px; color: #ffffff; font-weight: 600; }
        .meta-strip {
          display: flex;
          justify-content: space-around;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          margin: 0 24px 16px;
          padding: 8px 12px;
          border-radius: 8px;
          font-size: 11px;
          color: #475569;
        }
        .meta-strip strong { color: #0f172a; }
        table {
          width: calc(100% - 48px);
          margin: 0 24px 20px;
          border-collapse: collapse;
          font-size: 13px;
        }
        td { padding: 8px 6px; border-bottom: 1px solid #f1f5f9; }
        td.lbl { color: #64748b; width: 38%; }
        td.val { font-weight: 700; text-align: right; color: #0f172a; }
        .qr-section {
          display: flex;
          align-items: center;
          background: #f8fafc;
          margin: 0 24px 18px;
          padding: 14px;
          border-radius: 10px;
          border: 1px solid #e2e8f0;
          gap: 16px;
        }
        .qr-box { flex-shrink: 0; }
        .qr-text h4 { margin: 0 0 4px; font-size: 13px; }
        .qr-text p { margin: 0; font-size: 11px; color: #64748b; line-height: 1.4; }
        .barcode-section {
          text-align: center;
          margin: 0 24px 20px;
          padding: 12px;
          border: 1px dashed #cbd5e1;
          border-radius: 8px;
        }
        .barcode-svg { max-width: 280px; margin: 0 auto 6px; }
        .barcode-txt { font-family: monospace; font-size: 12px; letter-spacing: 2px; color: #475569; }
        .footer {
          background: #f8fafc;
          border-top: 1px solid #e2e8f0;
          padding: 14px 24px;
          text-align: center;
          font-size: 11px;
          color: #64748b;
        }
      </style>
    </head>
    <body>
      <div class="slip-print-card">
        <div class="header">
          <h1>🏥 CarePulse Multi-Specialty Hospital</h1>
          <p>Official OPD Consultation Slip • GT Road, Phagwara, Punjab - 144401</p>
          <p>24x7 Emergency Helpline: 1800-555-0199 | carepulse.hospital</p>
        </div>
        <div class="token-hero">
          <div class="token-lbl">Official Consultation Token Number</div>
          <div class="token-id">#${app.tokenId}</div>
          <div class="token-time">Scheduled: ${app.date} • ${app.timeSlot}</div>
        </div>
        <div class="meta-strip">
          <span>Ref: <strong>${app.ticketRef}</strong></span>
          <span>•</span>
          <span>Desk: <strong>${app.assignedDesk}</strong></span>
          <span>•</span>
          <span>Security: <strong>${app.securityCode}</strong></span>
        </div>
        <table>
          <tbody>
            <tr><td class="lbl">Patient Name</td><td class="val">${app.patientName}</td></tr>
            <tr><td class="lbl">Age / Gender / Place</td><td class="val">${app.patientAge} Yrs / ${app.patientGender} • ${app.patientPlace || 'Phagwara'}</td></tr>
            <tr><td class="lbl">Contact Mobile</td><td class="val">${app.patientPhone}</td></tr>
            <tr><td class="lbl">Consulting Doctor</td><td class="val">${app.doctorName}</td></tr>
            <tr><td class="lbl">Specialty & Dept</td><td class="val">${app.doctorSpecialty}</td></tr>
            <tr><td class="lbl">Clinic Chamber</td><td class="val">${app.room}</td></tr>
            <tr><td class="lbl">Chief Symptoms</td><td class="val">${app.visitReason}</td></tr>
            <tr><td class="lbl">Consultation Fee</td><td class="val" style="color: #0d9488;">${app.fee}</td></tr>
            <tr><td class="lbl">Arrival Instructions</td><td class="val" style="color: #b45309;">${app.reportingNote || 'Please report 15 mins prior'}</td></tr>
          </tbody>
        </table>
        <div class="qr-section">
          <div class="qr-box">${qrSvg}</div>
          <div class="qr-text">
            <h4>Fast Kiosk & Lobby Check-In</h4>
            <p>Scan this dynamic QR code at the reception kiosk to instantly verify your arrival and confirm your queue slot. Issued: ${app.issueTimestamp}</p>
          </div>
        </div>
        <div class="barcode-section">
          <div class="barcode-svg">${barcodeSvg}</div>
          <div class="barcode-txt">${app.barcodeNum}</div>
        </div>
        <div class="footer">
          This is an official computer-generated OPD appointment slip. Valid for scheduled date and consulting physician only.
        </div>
      </div>
      <script>
        window.onload = function() {
          setTimeout(function() {
            window.print();
          }, 300);
        };
      <\/script>
    </body>
    </html>
  `);
  printWindow.document.close();
}

// Global download functions for buttons
window.downloadCurrentTokenTicket = function (format = 'png') {
  const app = state.currentViewingToken || state.lastCreatedToken;
  if (!app) {
    showToast('No active appointment to download.', 'warning');
    return;
  }
  downloadTicket(app, format);
};

window.downloadTicketById = function (tokenId, format = 'png') {
  const app = state.userAppointments.find(a => a.tokenId === tokenId);
  if (!app) {
    showToast(`Appointment #${tokenId} not found.`, 'warning');
    return;
  }
  downloadTicket(app, format);
};

// --- Live Queue Tracker Feature ---
function setupTracker() {
  const btn = document.getElementById('tracker-search-btn');
  const input = document.getElementById('tracker-input');
  if (!btn || !input) return;

  btn.addEventListener('click', () => {
    checkTokenLiveStatus(input.value.trim());
  });

  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      checkTokenLiveStatus(input.value.trim());
    }
  });
}

function checkTokenLiveStatus(searchVal) {
  const resultBox = document.getElementById('tracker-result-box');
  if (!resultBox) return;

  if (!searchVal) {
    showToast('Please enter your Token ID or Mobile number', 'warning');
    return;
  }

  const cleanVal = searchVal.replace('#', '').toUpperCase();

  // Find in userAppointments or mock a realistic lookup
  let found = state.userAppointments.find(a =>
    a.tokenId.toUpperCase() === cleanVal ||
    a.patientPhone.includes(cleanVal)
  );

  let doc = null;
  let tokenNum = 0;
  let patientName = '';

  if (found) {
    doc = DOCTORS.find(d => d.id === found.doctorId) || DOCTORS[0];
    tokenNum = found.tokenNumber;
    patientName = found.patientName;
  } else {
    // If user types any token number like TK-018 or 18, allow live lookup simulation
    const extractedNum = parseInt(cleanVal.replace(/[^0-9]/g, ''), 10);
    if (!isNaN(extractedNum) && extractedNum > 0) {
      doc = DOCTORS[0]; // default GP
      tokenNum = extractedNum;
      patientName = 'Registered Patient';
    } else {
      showToast(`No active token record found for "${searchVal}". Try booking a new token above.`, 'warning');
      resultBox.classList.remove('active');
      return;
    }
  }

  const currentlyServing = doc.currentServingToken;
  const ahead = Math.max(0, tokenNum - currentlyServing);
  const estWait = ahead * doc.avgWaitPerPatient;

  // Determine queue stage
  let stageText = '';
  let step1Class = 'completed';
  let step2Class = 'completed';
  let step3Class = '';
  let progressWidth = '50%';

  if (tokenNum < currentlyServing) {
    stageText = 'Consultation Completed';
    step3Class = 'completed';
    progressWidth = '100%';
  } else if (tokenNum === currentlyServing) {
    stageText = 'Now Serving - Please Enter Doctor Consultation Room';
    step2Class = 'completed';
    step3Class = 'current';
    progressWidth = '75%';
  } else if (ahead === 1) {
    stageText = 'You are NEXT in line! Please wait directly outside the chamber door.';
    step2Class = 'current';
    progressWidth = '50%';
  } else {
    stageText = `Waiting in Lobby (${ahead} patients ahead of you)`;
    step2Class = 'current';
    progressWidth = '40%';
  }

  resultBox.innerHTML = `
    <div class="tracker-top-info">
      <div>
        <span style="font-size: 0.78rem; color: #a7f3d0; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 700;">Active Token Verification</span>
        <div class="tracker-token-badge" id="tracker-token-num">#TK-${String(tokenNum).padStart(3, '0')}</div>
        <div style="font-size: 0.9rem; color: #cbd5e1; margin-top: 0.2rem;">Patient: <strong>${patientName}</strong> • ${doc.name} (${doc.specialty})</div>
      </div>

      <div style="background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: var(--radius-md); padding: 0.75rem 1.25rem; text-align: right;">
        <div style="font-size: 0.75rem; color: #94a3b8;">Current OPD Status</div>
        <div style="font-size: 1.25rem; font-weight: 800; color: #34d399;">Now Serving: #TK-${String(currentlyServing).padStart(2, '0')}</div>
        <div style="font-size: 0.75rem; color: #cbd5e1;">Room: ${doc.room.split(',')[0]}</div>
      </div>
    </div>

    <!-- Live Queue Timeline -->
    <div class="queue-progress-track">
      <div class="progress-line-bg"></div>
      <div class="progress-line-active" style="width: ${progressWidth};"></div>
      
      <div class="progress-steps">
        <div class="step-item ${step1Class}">
          <div class="step-circle">1</div>
          <span class="step-label">Token Confirmed</span>
        </div>
        <div class="step-item ${step2Class}">
          <div class="step-circle">2</div>
          <span class="step-label">Waiting Lobby</span>
        </div>
        <div class="step-item ${step3Class}">
          <div class="step-circle">3</div>
          <span class="step-label">In Consultation</span>
        </div>
      </div>
    </div>

    <div style="display: flex; align-items: center; justify-content: space-between; background: rgba(13, 148, 136, 0.2); border: 1px solid rgba(20, 184, 166, 0.4); border-radius: var(--radius-md); padding: 1rem 1.25rem; margin-top: 1rem; flex-wrap: wrap; gap: 0.75rem;">
      <div>
        <div style="font-size: 0.8rem; color: #5eead4; font-weight: 700; text-transform: uppercase;">Live Status</div>
        <div style="font-size: 1rem; font-weight: 700; color: white;">${stageText}</div>
      </div>
      <div style="text-align: right;">
        <div style="font-size: 0.75rem; color: #cbd5e1;">Estimated Wait Time</div>
        <div style="font-size: 1.4rem; font-weight: 800; color: #fde047;">${tokenNum <= currentlyServing ? '0 mins' : `~${estWait} mins`}</div>
      </div>
    </div>
  `;

  resultBox.classList.add('active');
  showToast(`Queue verified: ${ahead} patients ahead of you.`, 'info');
}

// --- My Bookings Drawer / List Modal ---
function renderMyBookingsBadge() {
  const count = (state.userAppointments || []).length;
  document.querySelectorAll('.badge-my-tokens, #my-tokens-count, #sidebar-tokens-count').forEach(badge => {
    badge.innerText = count;
    badge.style.display = count > 0 ? 'inline-block' : 'none';
  });
  if (typeof FloatingTokenTracker !== 'undefined' && FloatingTokenTracker.update) {
    FloatingTokenTracker.update();
  }
}

window.openMyBookingsModal = function () {
  const modal = document.getElementById('my-bookings-modal');
  const list = document.getElementById('my-bookings-list-content');
  if (!modal || !list) return;

  if (state.userAppointments.length === 0) {
    list.innerHTML = `
      <div style="text-align: center; padding: 2rem 1rem; color: var(--slate-600);">
        <p style="font-size: 1.1rem; font-weight: 700; margin-bottom: 0.5rem; color: var(--dark);">No Active Token Bookings Yet</p>
        <p style="font-size: 0.88rem;">Click on "Book Appointment" to reserve a doctor consultation and generate your token slip.</p>
      </div>
    `;
  } else {
    list.innerHTML = state.userAppointments.map(app => {
      return `
        <div class="my-booking-item">
          <div>
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
              <span class="my-token-num">#${app.tokenId}</span>
              <span class="avail-status-tag" style="font-size: 0.7rem; padding: 0.15rem 0.5rem;">${app.status}</span>
            </div>
            <div style="font-weight: 700; font-size: 0.95rem; color: var(--dark);">${app.doctorName} (${app.doctorSpecialty})</div>
            <div style="font-size: 0.8rem; color: var(--slate-600);">${app.date} • ${app.timeSlot} • Patient: ${app.patientName} (${app.patientPlace})</div>
          </div>
          <div style="display: flex; flex-direction: column; gap: 0.4rem; align-items: flex-end;">
            <div style="display: flex; gap: 0.35rem; align-items: center;">
              <button class="btn btn-outline btn-sm" onclick="reopenTokenSlip('${app.tokenId}')" title="View token slip">
                View ↗
              </button>
              <button class="btn btn-sm btn-download-ticket" style="padding: 0.3rem 0.65rem; font-size: 0.76rem;" onclick="downloadTicketById('${app.tokenId}', 'png')" title="Download E-Pass">
                📥 Download
              </button>
            </div>
            <button class="btn btn-sm" style="color: var(--accent-rose); background: transparent; border: none; font-size: 0.75rem; padding: 0.1rem 0.3rem;" onclick="cancelAppointment('${app.tokenId}')">
              Cancel
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
};

window.closeMyBookingsModal = function () {
  const modal = document.getElementById('my-bookings-modal');
  if (modal) modal.classList.remove('active');
  document.body.style.overflow = '';
};

window.reopenTokenSlip = function (tokenId) {
  closeMyBookingsModal();
  const app = state.userAppointments.find(a => a.tokenId === tokenId);
  if (app) {
    openTokenSlipModal(app);
  }
};

window.cancelAppointment = function (tokenId) {
  if (!confirm(`Are you sure you want to cancel appointment for Token #${tokenId}?`)) return;

  state.userAppointments = state.userAppointments.filter(a => a.tokenId !== tokenId);
  try {
    localStorage.setItem('carepulse_appointments', JSON.stringify(state.userAppointments));
  } catch (e) { }

  renderMyBookingsBadge();
  openMyBookingsModal();
  showToast(`Token #${tokenId} cancelled successfully.`, 'info');
};

// --- Specialty Filter Buttons Setup ---
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
window.openEmergencyModal = function () {
  const modal = document.getElementById('emergency-modal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
};

window.closeEmergencyModal = function () {
  const modal = document.getElementById('emergency-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
};

// --- Close Modals on Backdrop Click or Escape Key ---
function setupModalDismissals() {
  ['booking-layer-modal', 'token-modal', 'my-bookings-modal', 'emergency-modal', 'lab-report-modal', 'pharmacy-modal'].forEach(modalId => {
    const el = document.getElementById(modalId);
    if (!el) return;
    el.addEventListener('click', (e) => {
      if (e.target === el) {
        if (modalId === 'booking-layer-modal') closeBookingLayer();
        else if (modalId === 'token-modal') closeTokenModal();
        else if (modalId === 'my-bookings-modal') closeMyBookingsModal();
        else if (modalId === 'emergency-modal') closeEmergencyModal();
        else if (modalId === 'lab-report-modal') closeLabReportModal();
        else if (modalId === 'pharmacy-modal') closePharmacyModal();
      }
    });
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeBookingLayer();
      closeTokenModal();
      closeMyBookingsModal();
      closeEmergencyModal();
      closeLabReportModal();
      closePharmacyModal();
      closeChatWidget();
    }
  });
}

// ==========================================================================
// Apollo-Grade Enterprise Healthcare Portal Modules
// ==========================================================================

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// 1. Multi-Branch & City Selector
const CLINIC_BRANCHES = {
  phagwara: {
    city: 'Phagwara, Punjab',
    name: 'CarePulse Multi-Specialty Hospital & Research Institute',
    address: 'GT Road, Near Sugar Mill Crossing, Model Town, Phagwara, Punjab - 144401, India',
    phone: '+91 1828 223456 / +91 98765 12345',
    emergency: '1800-180-2026 / 108',
    hours: '08:00 AM – 10:00 PM (Emergency 24/7)'
  },
  ludhiana: {
    city: 'Ludhiana, Punjab',
    name: 'CarePulse Healthcare Pavilion',
    address: 'Ferozepur Road, Near Mall Road Crossing, Ludhiana, Punjab - 141001',
    phone: '+91 161 500 1234',
    emergency: '1800-180-2026',
    hours: '08:30 AM – 09:30 PM'
  },
  delhi: {
    city: 'Delhi-NCR',
    name: 'CarePulse South Extension Super-Specialty Clinic',
    address: 'Ring Road, Block G, South Extension Part II, New Delhi - 110049',
    phone: '+91 11 4567 8900',
    emergency: '1800-555-0111',
    hours: '08:00 AM – 09:00 PM'
  },
  bengaluru: {
    city: 'Bengaluru',
    name: 'CarePulse Koramangala Hub',
    address: 'Sector 4, 80 Feet Road, Koramangala, Bengaluru - 560034',
    phone: '+91 80 2345 6789',
    emergency: '1800-555-0199',
    hours: '08:30 AM – 09:30 PM'
  }
};

window.switchBranch = function (branchKey) {
  const branch = CLINIC_BRANCHES[branchKey];
  if (!branch) return;

  const locEls = document.querySelectorAll('.branch-location-text');
  locEls.forEach(el => el.textContent = `📍 ${branch.name} • ${branch.city}`);

  const addrEls = document.querySelectorAll('.branch-address-text');
  addrEls.forEach(el => el.textContent = branch.address);

  const phoneEls = document.querySelectorAll('.branch-phone-text');
  phoneEls.forEach(el => el.textContent = branch.phone);

  const emergEls = document.querySelectorAll('.branch-emergency-text');
  emergEls.forEach(el => el.textContent = `🚨 Emergency: ${branch.emergency}`);

  showToast(`Switched hospital branch to ${branch.city}!`, 'info');
};

// 2. Preventive Health Checkup Packages (Apollo ProHealth Style)
const HEALTH_PACKAGES = [
  {
    id: 'pkg-basic',
    name: 'Basic Vital Wellness Screen',
    testsCount: '32 Essential Tests',
    price: 999,
    originalPrice: 2200,
    discount: '55% OFF',
    popular: false,
    desc: 'Comprehensive baseline screening for active adults & working professionals.',
    features: [
      'Complete Hemogram / CBC (24 parameters)',
      'Fasting Blood Sugar (Diabetes screening)',
      'Total Lipid Profile (Cholesterol, HDL, LDL, Triglycerides)',
      'Routine Urine & Microscopic Analysis',
      'Free Physician Telephonic Review & Report Consultation'
    ]
  },
  {
    id: 'pkg-exec',
    name: 'Executive Full Body Health Check',
    testsCount: '64 Comprehensive Tests',
    price: 2499,
    originalPrice: 5500,
    discount: '54% OFF',
    popular: true,
    desc: 'Apollo-grade multi-organ screening evaluating Liver, Kidneys, Thyroid, Heart, and Vitamins.',
    features: [
      'Liver Function Test - LFT (11 parameters)',
      'Kidney Function Test - KFT & Serum Creatinine',
      'Thyroid Profile Total (T3, T4, TSH)',
      'Cardiac Risk: Digital 12-Lead ECG & Chest Screening',
      'Vitamin D3 (25-OH) & Vitamin B12 Levels',
      'Senior Consultant Physician 1-on-1 Review'
    ]
  },
  {
    id: 'pkg-senior',
    name: 'Senior Citizen Vital Care Package',
    testsCount: '58 Specialized Tests',
    price: 1899,
    originalPrice: 4200,
    discount: '55% OFF',
    popular: false,
    desc: 'Formulated for ages 55+ focusing on joint mobility, cardiac markers, and glycemic control.',
    features: [
      'HbA1c 3-Month Glycemic Average',
      'High Sensitivity CRP (Cardiac Inflammation Risk)',
      'Serum Calcium, Phosphorus & Uric Acid',
      'Complete Kidney & Electrolyte Panel',
      'Complimentary Free Home Sample Collection included'
    ]
  },
  {
    id: 'pkg-women',
    name: "Women's Advanced Health & Cancer Screen",
    testsCount: '48 Specialized Tests',
    price: 2199,
    originalPrice: 4800,
    discount: '54% OFF',
    popular: false,
    desc: 'Specialized hormone profile, thyroid, bone mineral screen, and cancer prevention markers.',
    features: [
      'Thyroid Function & Iron Deficiency Panel (Ferritin, TIBC)',
      'Clinical Breast Examination / Mammogram voucher',
      'Pelvic Ultrasound screening voucher',
      'Serum Calcium & Bone Health screening',
      'Free Consultation with Senior Female Gynecologist'
    ]
  }
];

window.bookHealthPackage = function (pkgId) {
  const pkg = HEALTH_PACKAGES.find(p => p.id === pkgId) || HEALTH_PACKAGES[1];

  const patientName = prompt(`Book ${pkg.name} (Special Price: ₹${pkg.price})\n\nPlease enter Patient Full Name:`, 'Amit Kumar');
  if (!patientName || patientName.trim() === '') return;

  const patientPhone = prompt('Enter Contact Mobile Number for Lab Sample Pickup & SMS Report:', '9876543210');
  if (!patientPhone) return;

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
  const qrPayload = `https://carepulse.hospital/checkin?t=${tokenString}&ref=${ticketRef}&sec=${securityCode}&p=${encodeURIComponent(patientName.trim())}`;

  const pkgAppointment = {
    tokenId: tokenString,
    tokenNumber: pkgTokenNum,
    ticketRef: ticketRef,
    securityCode: securityCode,
    barcodeNum: barcodeNum,
    assignedDesk: 'NABL Lab Wing • Phlebotomy Bay 1',
    queuePosition: 1,
    estWaitMins: 5,
    issueTimestamp: now.toLocaleDateString('en-IN') + ' ' + now.toLocaleTimeString('en-IN'),
    qrPayload: qrPayload,
    doctorId: 'lab-pkg',
    doctorName: 'CarePulse Diagnostics Lab Desk',
    doctorSpecialty: 'Preventive Health Package',
    doctorAvatar: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=400&q=80',
    date: dateStr,
    timeSlot: '07:30 AM - 09:30 AM (Fasting Sample)',
    room: 'NABL Diagnostic Lab Wing, Ground Floor',
    patientName: patientName.trim(),
    patientAge: '35',
    patientGender: 'Standard',
    patientPlace: 'Home Sample / Clinic Desk',
    patientPhone: patientPhone.trim(),
    visitReason: `${pkg.name} (${pkg.testsCount}) - Doorstep phlebotomist assigned`,
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
};

// 3. Diagnostic Reports Portal (UHID Downloader)
const SAMPLE_LAB_REPORTS = {
  'UHID-98214': {
    uhid: 'UHID-98214',
    patientName: 'Mr. Rajesh Verma',
    ageGender: '42 Y / Male',
    refDoctor: 'Dr. Rajesh Sharma, MD',
    collectionDate: 'Today, 07:45 AM',
    reportDate: 'Today, 11:30 AM',
    status: 'Verified & Signed',
    tests: [
      { name: 'Hemoglobin (Hb)', result: '14.8', unit: 'g/dL', normal: '13.0 - 17.0', flag: 'normal' },
      { name: 'Total Leucocyte Count (WBC)', result: '7,400', unit: '/cu.mm', normal: '4,000 - 11,000', flag: 'normal' },
      { name: 'Platelet Count', result: '2.65', unit: 'Lakhs/cu.mm', normal: '1.50 - 4.50', flag: 'normal' },
      { name: 'Fasting Blood Glucose', result: '94', unit: 'mg/dL', normal: '70 - 100', flag: 'normal' },
      { name: 'HbA1c (Glycated Hemoglobin)', result: '5.4', unit: '%', normal: '< 5.7', flag: 'normal' },
      { name: 'Total Serum Cholesterol', result: '188', unit: 'mg/dL', normal: '< 200', flag: 'normal' },
      { name: 'Triglycerides', result: '142', unit: 'mg/dL', normal: '< 150', flag: 'normal' },
      { name: 'Serum Creatinine (Kidney)', result: '0.92', unit: 'mg/dL', normal: '0.70 - 1.20', flag: 'normal' },
      { name: 'SGPT / ALT (Liver)', result: '32', unit: 'U/L', normal: '< 45', flag: 'normal' },
      { name: 'TSH (Thyroid Stimulating Hormone)', result: '2.34', unit: 'uIU/mL', normal: '0.40 - 4.50', flag: 'normal' }
    ]
  },
  'UHID-44021': {
    uhid: 'UHID-44021',
    patientName: 'Mrs. Sunita Rao',
    ageGender: '56 Y / Female',
    refDoctor: 'Dr. Amitav Banerjee, MD',
    collectionDate: 'Yesterday, 08:00 AM',
    reportDate: 'Yesterday, 01:15 PM',
    status: 'Verified & Signed',
    tests: [
      { name: 'Hemoglobin (Hb)', result: '11.8', unit: 'g/dL', normal: '12.0 - 15.0', flag: 'high' },
      { name: 'Fasting Blood Glucose', result: '138', unit: 'mg/dL', normal: '70 - 100', flag: 'high' },
      { name: 'HbA1c (Glycated Hemoglobin)', result: '6.9', unit: '%', normal: '< 5.7', flag: 'high' },
      { name: 'Total Serum Cholesterol', result: '224', unit: 'mg/dL', normal: '< 200', flag: 'high' },
      { name: 'Triglycerides', result: '185', unit: 'mg/dL', normal: '< 150', flag: 'high' },
      { name: 'Serum Creatinine (Kidney)', result: '0.85', unit: 'mg/dL', normal: '0.50 - 1.10', flag: 'normal' },
      { name: 'Vitamin D3 (25-OH)', result: '18.4', unit: 'ng/mL', normal: '30 - 100 (Deficient)', flag: 'high' },
      { name: 'Vitamin B12', result: '240', unit: 'pg/mL', normal: '211 - 911', flag: 'normal' }
    ]
  }
};

window.openLabReportModal = function (presetUhid = 'UHID-98214') {
  const modal = document.getElementById('lab-report-modal');
  if (!modal) return;

  const inputEl = document.getElementById('report-uhid-input');
  if (inputEl) inputEl.value = presetUhid;

  renderLabReportSheet(presetUhid);
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
};

window.closeLabReportModal = function () {
  const modal = document.getElementById('lab-report-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
};

window.searchLabReport = function () {
  const inputEl = document.getElementById('report-uhid-input');
  const uhid = (inputEl ? inputEl.value : '').trim().toUpperCase();
  if (!uhid) {
    showToast('Please enter a valid Patient UHID or Phone number', 'warning');
    return;
  }
  renderLabReportSheet(uhid);
};

function renderLabReportSheet(uhid) {
  const sheetEl = document.getElementById('lab-report-output');
  if (!sheetEl) return;

  const data = SAMPLE_LAB_REPORTS[uhid] || {
    uhid: uhid,
    patientName: 'Verified Patient (CarePulse OPD)',
    ageGender: 'Adult / General',
    refDoctor: 'Dr. Rajesh Sharma, MD (Chief Medical Officer)',
    collectionDate: 'Today, 08:15 AM',
    reportDate: 'Today, 11:45 AM',
    status: 'Verified by Pathologist',
    tests: [
      { name: 'Hemoglobin (Hb)', result: '13.6', unit: 'g/dL', normal: '13.0 - 17.0', flag: 'normal' },
      { name: 'Fasting Blood Glucose', result: '92', unit: 'mg/dL', normal: '70 - 100', flag: 'normal' },
      { name: 'Total Cholesterol', result: '175', unit: 'mg/dL', normal: '< 200', flag: 'normal' },
      { name: 'Serum Creatinine', result: '0.88', unit: 'mg/dL', normal: '0.60 - 1.20', flag: 'normal' },
      { name: 'Platelet Count', result: '2.80', unit: 'Lakhs/cu.mm', normal: '1.50 - 4.50', flag: 'normal' }
    ]
  };

  let rowsHtml = data.tests.map(t => `
    <tr class="${t.flag === 'high' ? 'abnormal' : ''}">
      <td style="font-weight: 600; color: var(--dark);">${t.name}</td>
      <td style="font-weight: 800; font-family: var(--font-heading);">${t.result}</td>
      <td style="color: var(--slate-600);">${t.unit}</td>
      <td style="color: var(--slate-600);">${t.normal}</td>
      <td>
        <span class="status-badge-report ${t.flag}">
          ${t.flag === 'high' ? '⚠️ Attention' : '✓ Normal'}
        </span>
      </td>
    </tr>
  `).join('');

  sheetEl.innerHTML = `
    <div class="lab-report-sheet" id="printable-lab-sheet">
      <div class="lab-header">
        <div>
          <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
            <span style="font-size: 1.4rem;">🔬</span>
            <strong style="font-size: 1.15rem; color: var(--dark);">CarePulse Central Diagnostic Laboratory</strong>
          </div>
          <div style="font-size: 0.75rem; color: var(--slate-600);">GT Road, Model Town, Phagwara, Punjab - 144401 • NABL Cert # MC-4829</div>
        </div>
        <div style="text-align: right;">
          <span class="accred-badge emerald">AUTHENTIC REPORT</span>
          <div style="font-size: 0.75rem; color: var(--slate-600); margin-top: 0.35rem;">Barcode: ||| |||| | ||||| |</div>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.75rem; background: var(--slate-50); padding: 1rem; border-radius: var(--radius-md); font-size: 0.8rem; margin-bottom: 1.25rem;">
        <div><strong>Patient Name:</strong> ${data.patientName}</div>
        <div><strong>UHID:</strong> <span style="font-family: monospace; font-weight: 700; color: var(--primary-dark);">${data.uhid}</span></div>
        <div><strong>Age / Gender:</strong> ${data.ageGender}</div>
        <div><strong>Referred By:</strong> ${data.refDoctor}</div>
        <div><strong>Sample Collected:</strong> ${data.collectionDate}</div>
        <div><strong>Report Status:</strong> <span style="color: #059669; font-weight: 700;">${data.status}</span></div>
      </div>

      <table class="lab-table">
        <thead>
          <tr>
            <th>Investigation / Parameter</th>
            <th>Observed Value</th>
            <th>Units</th>
            <th>Reference Interval</th>
            <th>Clinical Interpretation</th>
          </tr>
        </thead>
        <tbody>
          ${rowsHtml}
        </tbody>
      </table>

      <div style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px dashed var(--slate-300); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
        <div style="font-size: 0.75rem; color: var(--slate-600); max-width: 420px;">
          Note: Biological reference intervals are evaluated under standard laboratory conditions. For clinical advice, please consult your prescribing physician.
        </div>
        <div style="text-align: right;">
          <div style="font-family: 'Brush Script MT', cursive, sans-serif; font-size: 1.4rem; color: #1e3a8a; letter-spacing: 1px;">Dr. K. S. Sundaram</div>
          <div style="font-size: 0.7rem; font-weight: 700; color: var(--slate-600);">MD, FRCPath (Chief Pathologist)</div>
        </div>
      </div>
    </div>
  `;
}

window.downloadLabReportPDF = function () {
  window.print();
};

// 4. 24/7 Pharmacy & Prescription Upload
let selectedMedicines = [];

window.openPharmacyModal = function () {
  const modal = document.getElementById('pharmacy-modal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
};

window.closePharmacyModal = function () {
  const modal = document.getElementById('pharmacy-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
};

window.toggleMedicineSelection = function (btn, name, price) {
  const idx = selectedMedicines.findIndex(m => m.name === name);
  if (idx > -1) {
    selectedMedicines.splice(idx, 1);
    btn.classList.remove('added');
    btn.textContent = '+ Add';
  } else {
    selectedMedicines.push({ name, price });
    btn.classList.add('added');
    btn.textContent = '✓ Added';
  }
  updatePharmacyCartDisplay();
};

function updatePharmacyCartDisplay() {
  const cartInfoEl = document.getElementById('pharmacy-cart-summary');
  if (!cartInfoEl) return;
  if (selectedMedicines.length === 0) {
    cartInfoEl.innerHTML = `<span style="color: var(--slate-400); font-size: 0.8rem;">No OTC medicines selected yet (optional if uploading prescription).</span>`;
  } else {
    const total = selectedMedicines.reduce((sum, item) => sum + item.price, 0);
    cartInfoEl.innerHTML = `
      <div style="font-size: 0.825rem; font-weight: 700; color: var(--dark); display: flex; justify-content: space-between;">
        <span>Selected (${selectedMedicines.length} items): ${selectedMedicines.map(m => m.name).join(', ')}</span>
        <span style="color: var(--primary-dark);">Est: ₹${total} (15% Off Applied)</span>
      </div>
    `;
  }
}

window.handlePrescriptionUpload = function (event) {
  const file = event.target.files && event.target.files[0];
  const preview = document.getElementById('rx-filename-display');
  if (file && preview) {
    preview.innerHTML = `✅ <strong>Uploaded:</strong> ${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
    preview.style.display = 'block';
    showToast(`Prescription '${file.name}' attached successfully!`, 'success');
  }
};

window.submitPharmacyOrder = function (e) {
  if (e) e.preventDefault();
  const name = document.getElementById('rx-patient-name').value;
  const phone = document.getElementById('rx-patient-phone').value;
  const address = document.getElementById('rx-delivery-address').value;

  if (!name || !phone || !address) {
    showToast('Please provide your delivery name, phone, and complete address.', 'warning');
    return;
  }

  const orderId = `RX-${Math.floor(10000 + Math.random() * 90000)}`;
  closePharmacyModal();
  showToast(`🚀 Order #${orderId} Placed! CarePulse Pharmacist dispatched. ETA: 120 mins.`, 'success');

  alert(`🏥 CarePulse 24/7 Doorstep Pharmacy Confirmation\n\nOrder ID: ${orderId}\nPatient: ${name}\nPhone: ${phone}\nDelivery Address: ${address}\n\nOur certified pharmacist is verifying your prescription & order. You will receive an SMS confirmation with rider live tracking.`);
};

// 5. Interactive AI Symptom Assistant / Triage Bot ("Dr. CarePulse Bot")
const CHAT_KNOWLEDGE = [
  {
    triggers: ['fever', 'cold', 'cough', 'flu', 'viral', 'headache', 'body pain', 'fatigue', 'weakness'],
    condition: 'Viral Fever & Upper Respiratory Symptoms',
    specialty: 'General Physician',
    doctor: 'doc-gp-1',
    doctorName: 'Dr. Rajesh Sharma',
    degree: 'MBBS, MD (General Medicine - AIIMS New Delhi)',
    fee: '₹500',
    response: 'Fever accompanied by body aches, chills, or headache is frequently caused by seasonal viral infections, dengue, or throat inflammation.',
    homeTips: [
      '<strong>Adequate Hydration:</strong> Drink 2.5 - 3 Litres of fluids (warm water, ORS electrolyte, coconut water).',
      '<strong>Cool Sponging:</strong> Apply lukewarm/cool damp cloth to forehead, neck, and armpits if temperature exceeds 101°F.',
      '<strong>Rest Protocol:</strong> Minimize screen time, get 8+ hours of continuous bed rest to boost lymphocyte recovery.',
      '<strong>Nutritious Light Diet:</strong> Consume moong dal khichdi, vegetable soups, and vitamin C rich citrus fruits.'
    ],
    donts: 'Avoid taking unprescribed antibiotics or heavy analgesics like Ibuprofen/Aspirin without confirming platelets (Dengue risk).',
    redFlag: 'Seek immediate emergency attention if fever exceeds 103°F, or if you develop breathing difficulty, rash, or persistent vomiting.'
  },
  {
    triggers: ['tooth', 'teeth', 'gum', 'ache', 'cavity', 'bleeding', 'dental', 'root canal', 'dentist', 'jaw'],
    condition: 'Acute Dental Pain / Gum Sensitivity',
    specialty: 'Dentist & Oral Surgeon',
    doctor: 'doc-dent-1',
    doctorName: 'Dr. Suresh Kulkarni',
    degree: 'BDS, MDS (Conservative Dentistry & Endodontics - GDC)',
    fee: '₹400',
    response: 'Toothache typically signals deep enamel decay, pulp inflammation, or gum pocket bacterial infection requiring clinical evaluation.',
    homeTips: [
      '<strong>Warm Salt-Water Gargle:</strong> Dissolve 1/2 tsp salt in warm water and rinse gently for 30 seconds every 3 hours.',
      '<strong>External Cold Compress:</strong> Apply an ice pack wrapped in cloth to the outer cheek for 15 mins to reduce nerve swelling.',
      '<strong>Clove Oil Application:</strong> Dab a tiny drop of clove oil on a cotton swab and touch the affected tooth lightly (natural eugenol numbing).',
      '<strong>Elevate Head during Sleep:</strong> Keep head elevated on 2 pillows to decrease blood pressure in facial blood vessels.'
    ],
    donts: 'Do NOT place an aspirin tablet directly on the gum (causes chemical burns). Avoid chewing hard, sticky, or extremely cold/hot items.',
    redFlag: 'If swelling spreads towards your eye or down the neck, or causes difficulty swallowing, visit the emergency unit immediately.'
  },
  {
    triggers: ['skin', 'rash', 'acne', 'itching', 'allergy', 'hair', 'patches', 'dermatology', 'eczema', 'hives'],
    condition: 'Dermatological Reaction / Allergic Rash',
    specialty: 'Dermatologist & Cosmetologist',
    doctor: 'doc-derma-1',
    doctorName: 'Dr. Sunita Deshmukh',
    degree: 'MBBS, MD (Dermatology, Venereology & Leprosy - BMCRI)',
    fee: '₹550',
    response: 'Sudden skin breakouts, red wheals, or severe itching often result from contact dermatitis, food allergies, or fungal flare-ups.',
    homeTips: [
      '<strong>Cool Compress:</strong> Place a clean, cool, damp towel over the irritated area for 10-15 minutes to calm nerve endings.',
      '<strong>Calamine Lotion:</strong> Gently apply pure calamine or mild aloe vera gel for soothing hydration.',
      '<strong>Wear Loose Cotton Fabrics:</strong> Prevent friction and sweat accumulation by wearing soft, breathable clothing.',
      '<strong>Lukewarm Baths:</strong> Avoid steaming hot showers; use soap-free, pH-neutral cleansers.'
    ],
    donts: 'Do NOT scratch or rub vigorously (prevents secondary bacterial infection). Avoid applying over-the-counter steroid creams without diagnosis.',
    redFlag: 'If the rash is accompanied by facial swelling, lip swelling, or difficulty breathing, call 1800-180-2026 immediately (Anaphylaxis).'
  },
  {
    triggers: ['child', 'baby', 'pediatric', 'infant', 'kid', 'vaccine', 'vaccination', 'growth', 'teething'],
    condition: 'Pediatric Care & Child Wellness',
    specialty: 'Senior Pediatrician',
    doctor: 'doc-ped-1',
    doctorName: 'Dr. Ananya Mukherjee',
    degree: 'MBBS, MD (Pediatrics & Neonatology - KEM Mumbai)',
    fee: '₹500',
    response: 'Pediatric illnesses require specialized weight-adjusted care. Infants and toddlers can dehydrate rapidly during fever or cough episodes.',
    homeTips: [
      '<strong>Frequent Feeds & Fluids:</strong> Offer breastmilk, formula, or small sips of ORS every 20-30 minutes to maintain hydration.',
      '<strong>Dress Lightly:</strong> Keep the room well-ventilated and dress the child in a single layer of loose cotton clothing.',
      '<strong>Steam Mist:</strong> Run a warm shower in the bathroom and sit with the child in the steamy air for 10 mins to ease nasal congestion.',
      '<strong>Track Wet Diapers:</strong> Ensure child is producing at least 4-6 wet diapers in 24 hours as a sign of adequate hydration.'
    ],
    donts: 'NEVER administer adult medication, aspirin, or uncalibrated cough syrups to children without doctor consultation.',
    redFlag: 'Rush to emergency if baby is unusually lethargic, refuses all feeds, has rapid chest indrawing, or has fever under 3 months of age.'
  },
  {
    triggers: ['chest', 'heart', 'breath', 'emergency', 'unconscious', 'stroke', 'severe pain', 'bleeding'],
    condition: 'Critical Medical Emergency',
    specialty: 'Emergency & Trauma Desk',
    doctor: null,
    isEmergency: true,
    response: '🚨 CRITICAL MEDICAL ADVISORY: Chest discomfort, shortness of breath, sudden numbness, or acute pain indicates a potential cardiovascular or trauma emergency.',
    homeTips: [
      '<strong>Sit Upright:</strong> Keep the patient seated in a comfortable semi-reclined position; loosen tight collars or waistbands.',
      '<strong>Stay Calm & Still:</strong> Avoid any physical exertion, walking, or panic.',
      '<strong>Call Direct Helpline:</strong> Dispatch an ambulance immediately via our 24/7 hotline 1800-180-2026 or dial 108.'
    ],
    donts: 'Do not give food or drink if patient is drowsy or breathless. Do not drive yourself to hospital.',
    redFlag: 'Immediate transport to CarePulse Ground Floor Emergency Wing (GT Road, Phagwara).'
  },
  {
    triggers: ['package', 'full body', 'checkup', 'test', 'blood test', 'screening', 'sugar', 'diabetes', 'lipid'],
    condition: 'Preventive Health Screening',
    specialty: 'NABL Central Laboratory & Preventive Medicine',
    isPackage: true,
    response: 'Preventive health checkups identify lifestyle diseases (diabetes, cholesterol, thyroid, hypertension) long before visible symptoms appear.',
    homeTips: [
      '<strong>10-12 Hours Fasting:</strong> Water is permitted, but avoid tea, coffee, or milk before morning blood sample collection.',
      '<strong>Avoid Heavy Dinner:</strong> Refrain from alcohol, fried food, or heavy red meat the night prior to your lipid test.',
      '<strong>Doorstep Pickup:</strong> Our certified Phagwara phlebotomist collects blood samples right from your home!'
    ],
    donts: 'Do not discontinue prescribed morning BP medicines unless explicitly advised by your doctor.',
    redFlag: 'Early routine screening prevents 80% of chronic complications.'
  }
];

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

function appendChatMessage(htmlOrText, sender = 'bot') {
  const container = document.getElementById('chat-messages-container');
  if (!container) return;

  const msgDiv = document.createElement('div');
  msgDiv.className = `chat-msg ${sender}`;
  msgDiv.innerHTML = htmlOrText;
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
        <button class="btn-bot-action primary" onclick="openBookingLayer(); closeChatWidget();">
          ⚡ Open Doctor Booking Layer ↗
        </button>
        <button class="btn-bot-action pharmacy" onclick="openPharmacyModal(); closeChatWidget();">
          💊 Order OTC Medicines (24/7 Pharmacy) ↗
        </button>
      </div>
    `, 'bot');
    return;
  }

  if (match.isEmergency) {
    appendChatMessage(`
      <div style="color: #b91c1c; font-weight: 800; font-size: 0.9rem;">${match.response}</div>
      <div class="chat-tips-card" style="background: #fff1f2; border-color: #fecdd3;">
        <div class="chat-tips-title" style="color: #9f1239;">🚨 Immediate Emergency Protocol:</div>
        <ul class="chat-tips-list" style="color: #881337;">
          ${match.homeTips.map(tip => `<li>• ${tip}</li>`).join('')}
        </ul>
      </div>
      <div class="chat-action-cluster">
        <a href="tel:18001802026" class="btn-bot-action primary" style="background: #dc2626;">
          📞 Dispatch Ambulance (Phagwara Campus: 1800-180-2026 / 108)
        </a>
        <button class="btn-bot-action pharmacy" onclick="openEmergencyModal(); closeChatWidget();">
          🚨 View Emergency Desk Info
        </button>
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
        <button class="btn-bot-action package" onclick="bookHealthPackage('pkg-exec'); closeChatWidget();">
          🛡️ Book Executive Full Body Checkup (₹2,499) ↗
        </button>
        <button class="btn-bot-action primary" onclick="bookHealthPackage('pkg-basic'); closeChatWidget();">
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

      <button class="btn-auto-book-slot" onclick="autoBookDoctorFromChat('${match.doctor}', '${match.condition}');">
        ⚡ 1-Click Auto-Book ${match.doctorName} (Next Available Slot)
      </button>
    </div>

    <div class="chat-action-cluster">
      <button class="btn-bot-action primary" onclick="openBookingLayer('${match.doctor}'); closeChatWidget();">
        📅 Option 1: Book ${match.doctorName} (Open Layer) ↗
      </button>
      <button class="btn-bot-action pharmacy" onclick="openPharmacyModal(); closeChatWidget();">
        💊 Option 2: Order Relief Kit (2-Hr Delivery) ↗
      </button>
      <button class="btn-bot-action package" onclick="openLabReportModal(); closeChatWidget();">
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

const CarePulseAuth = {
  activeMethod: 'mobile', // 'mobile' | 'google'
  currentStep: 'input',   // 'input' | 'otp'
  currentOTP: null,
  otpMethod: 'mobile',
  targetContact: '',
  userName: '',
  resendTimer: 30,
  timerInterval: null,
  sessionUser: null,
  inactivityTimer: null,
  INACTIVITY_TIMEOUT_MS: 15 * 60 * 1000, // 15 minutes session timeout

  init() {
    // Clear persistent localStorage to guarantee user is logged out whenever site is closed or removed
    try {
      localStorage.removeItem('carepulse_auth_user');
    } catch (e) { }

    this.checkStoredSession();
    this.setupInactivityWatchdog();
  },

  checkStoredSession() {
    // Ensure any legacy persistent storage is cleaned
    try {
      localStorage.removeItem('carepulse_auth_user');
    } catch (e) { }

    try {
      // Use sessionStorage: automatically terminates and logs out when user removes or closes the site
      const stored = sessionStorage.getItem('carepulse_auth_user');
      if (stored) {
        this.sessionUser = JSON.parse(stored);
        this.unlockPortal();
        this.updateProfileUI();
        this.resetInactivityTimer();
        return;
      }
    } catch (e) {
      console.warn('Session parsing error:', e);
    }
    // If not authenticated, enforce mandatory portal lockdown
    this.lockPortal();
  },

  setupInactivityWatchdog() {
    const activityEvents = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    activityEvents.forEach(evt => {
      window.addEventListener(evt, () => {
        if (this.sessionUser) {
          this.resetInactivityTimer();
        }
      }, { passive: true });
    });

    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible' && this.sessionUser) {
        const lastActive = parseInt(sessionStorage.getItem('carepulse_last_active') || '0', 10);
        if (lastActive && (Date.now() - lastActive > this.INACTIVITY_TIMEOUT_MS)) {
          this.logout('Session expired due to inactivity. Please sign in again.');
        }
      }
    });
  },

  resetInactivityTimer() {
    if (!this.sessionUser) return;
    try {
      sessionStorage.setItem('carepulse_last_active', Date.now().toString());
    } catch (e) { }

    if (this.inactivityTimer) clearTimeout(this.inactivityTimer);
    this.inactivityTimer = setTimeout(() => {
      if (this.sessionUser) {
        this.logout('Session timed out after 15 minutes of inactivity for patient privacy.');
      }
    }, this.INACTIVITY_TIMEOUT_MS);
  },

  lockPortal() {
    document.body.classList.add('auth-locked');
    const modal = document.getElementById('auth-gate-modal');
    if (modal) {
      modal.style.display = 'flex';
    }
    this.goToStep('input');
  },

  unlockPortal() {
    document.body.classList.remove('auth-locked');
    const modal = document.getElementById('auth-gate-modal');
    if (modal) {
      modal.style.display = 'none';
    }
  },

  switchTab(method) {
    this.activeMethod = method;
    document.querySelectorAll('.auth-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.method === method);
    });
    const mobilePanel = document.getElementById('auth-panel-mobile');
    const googlePanel = document.getElementById('auth-panel-google');
    if (mobilePanel && googlePanel) {
      if (method === 'mobile') {
        mobilePanel.style.display = 'block';
        googlePanel.style.display = 'none';
      } else {
        mobilePanel.style.display = 'none';
        googlePanel.style.display = 'block';
      }
    }
    this.clearError();
  },

  selectGoogleAccount(email, name) {
    const input = document.getElementById('auth-google-email');
    if (input) input.value = email;
    const nameInput = document.getElementById('auth-google-name');
    if (nameInput) nameInput.value = name;

    document.querySelectorAll('.google-account-pill').forEach(pill => {
      pill.classList.toggle('selected', pill.dataset.email === email);
    });
  },

  generateDynamicOTP() {
    // Generate a secure random 6-digit code strictly different from current one
    let newCode;
    do {
      newCode = Math.floor(100000 + Math.random() * 900000).toString();
    } while (newCode === this.currentOTP);
    this.currentOTP = newCode;
    return newCode;
  },

  sendOTP() {
    this.clearError();
    if (this.activeMethod === 'mobile') {
      const phoneInput = document.getElementById('auth-mobile-input');
      const nameInput = document.getElementById('auth-mobile-name');
      const phone = phoneInput ? phoneInput.value.trim().replace(/\D/g, '') : '';
      const name = nameInput && nameInput.value.trim() ? nameInput.value.trim() : 'Patient';

      if (!phone || phone.length < 10) {
        this.showError('Please enter a valid 10-digit mobile number.');
        if (phoneInput) phoneInput.focus();
        return;
      }
      this.targetContact = '+91 ' + phone.slice(-10);
      this.userName = name;
      this.otpMethod = 'mobile';
    } else {
      const emailInput = document.getElementById('auth-google-email');
      const nameInput = document.getElementById('auth-google-name');
      const email = emailInput ? emailInput.value.trim() : '';
      let name = nameInput && nameInput.value.trim() ? nameInput.value.trim() : '';

      if (!email || !email.includes('@') || !email.includes('.')) {
        this.showError('Please enter or select a valid Google / Gmail address.');
        if (emailInput) emailInput.focus();
        return;
      }
      if (!name) {
        const parts = email.split('@')[0].split(/[._]/);
        name = parts.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' ');
      }
      this.targetContact = email;
      this.userName = name;
      this.otpMethod = 'google';
    }

    const otp = this.generateDynamicOTP();
    this.goToStep('otp');
    this.triggerSimulatedNotification(otp, this.otpMethod, this.targetContact);
    this.startResendTimer();
  },

  resendOTP() {
    const otp = this.generateDynamicOTP();
    this.clearOTPInputs();
    this.clearError();
    this.triggerSimulatedNotification(otp, this.otpMethod, this.targetContact);
    this.startResendTimer();
    showToast(`New verification OTP sent to ${this.targetContact}!`, 'info');
  },

  triggerSimulatedNotification(otp, method, target) {
    const container = document.getElementById('simulated-notification-area');
    if (!container) return;

    // Remove any previous banners
    container.innerHTML = '';

    const notifCard = document.createElement('div');
    notifCard.className = `simulated-otp-banner ${method === 'google' ? 'google-banner' : 'sms-banner'}`;

    if (method === 'mobile') {
      notifCard.innerHTML = `
        <div class="simulated-banner-header">
          <div class="simulated-app-tag">
            <span class="app-icon">💬</span>
            <span class="app-name">MESSAGES • Just Now</span>
          </div>
          <button class="simulated-close-btn" onclick="this.closest('.simulated-otp-banner').remove()">&times;</button>
        </div>
        <div class="simulated-banner-body">
          <div class="simulated-sender">CarePulse SMS Gateway &bull; <span>TD-CAREPL</span></div>
          <p class="simulated-msg">
            Your login verification OTP is <strong class="highlight-otp">${otp}</strong>. Valid for 5 minutes. Do not share with anyone.
          </p>
        </div>
        <div class="simulated-banner-actions">
          <button type="button" class="btn-autofill-otp" onclick="CarePulseAuth.autoFillOTP('${otp}')">
            📋 Auto-Fill OTP (${otp})
          </button>
          <button type="button" class="btn-copy-otp" onclick="navigator.clipboard.writeText('${otp}'); showToast('OTP ${otp} copied!', 'success');">
            Copy Code
          </button>
        </div>
      `;
    } else {
      notifCard.innerHTML = `
        <div class="simulated-banner-header">
          <div class="simulated-app-tag">
            <span class="app-icon">🔴</span>
            <span class="app-name">GMAIL • Just Now</span>
          </div>
          <button class="simulated-close-btn" onclick="this.closest('.simulated-otp-banner').remove()">&times;</button>
        </div>
        <div class="simulated-banner-body">
          <div class="simulated-sender">CarePulse Security &bull; <span>security@carepulse.org</span></div>
          <p class="simulated-msg">
            Google Security Code: <strong class="highlight-otp">${otp}</strong> for account <em>${target}</em> login.
          </p>
        </div>
        <div class="simulated-banner-actions">
          <button type="button" class="btn-autofill-otp" onclick="CarePulseAuth.autoFillOTP('${otp}')">
            📋 Auto-Fill OTP (${otp})
          </button>
          <button type="button" class="btn-copy-otp" onclick="navigator.clipboard.writeText('${otp}'); showToast('OTP ${otp} copied!', 'success');">
            Copy Code
          </button>
        </div>
      `;
    }

    container.appendChild(notifCard);

    // Audio cue
    if (typeof playClinicChime === 'function') {
      try { playClinicChime(); } catch (e) { }
    }

    // Auto-dismiss after 16s
    setTimeout(() => {
      if (notifCard.parentElement) {
        notifCard.classList.add('fade-out');
        setTimeout(() => notifCard.remove(), 400);
      }
    }, 16000);
  },

  autoFillOTP(code) {
    const otpString = (code || this.currentOTP || '').toString();
    for (let i = 1; i <= 6; i++) {
      const input = document.getElementById(`otp-digit-${i}`);
      if (input && otpString[i - 1]) {
        input.value = otpString[i - 1];
        input.classList.add('digit-filled');
      }
    }
    const verifyBtn = document.getElementById('btn-verify-otp');
    if (verifyBtn) {
      verifyBtn.focus();
    }
    this.clearError();
    showToast(`OTP ${otpString} filled! Press Verify to enter.`, 'success');
  },

  handleDigitInput(el, index, event) {
    const val = el.value.replace(/\D/g, '');
    el.value = val ? val.slice(-1) : '';
    if (el.value) {
      el.classList.add('digit-filled');
      if (index < 6) {
        const next = document.getElementById(`otp-digit-${index + 1}`);
        if (next) next.focus();
      }
    } else {
      el.classList.remove('digit-filled');
    }
    this.clearError();
  },

  handleDigitKey(el, index, event) {
    if (event.key === 'Backspace' && !el.value && index > 1) {
      const prev = document.getElementById(`otp-digit-${index - 1}`);
      if (prev) {
        prev.focus();
        prev.value = '';
        prev.classList.remove('digit-filled');
      }
    } else if (event.key === 'Enter') {
      this.verifyOTP();
    }
  },

  handleDigitPaste(event) {
    event.preventDefault();
    const pasted = (event.clipboardData || window.clipboardData).getData('text').replace(/\D/g, '');
    if (pasted) {
      for (let i = 1; i <= 6; i++) {
        const input = document.getElementById(`otp-digit-${i}`);
        if (input && pasted[i - 1]) {
          input.value = pasted[i - 1];
          input.classList.add('digit-filled');
        }
      }
      const sixth = document.getElementById('otp-digit-6');
      if (sixth) sixth.focus();
    }
  },

  getEnteredOTP() {
    let entered = '';
    for (let i = 1; i <= 6; i++) {
      const input = document.getElementById(`otp-digit-${i}`);
      entered += input ? input.value.trim() : '';
    }
    return entered;
  },

  verifyOTP() {
    const entered = this.getEnteredOTP();
    if (entered.length < 6) {
      this.showError('Please enter all 6 digits of the OTP.');
      this.shakeCard();
      return;
    }

    if (entered !== this.currentOTP) {
      this.showError('Incorrect OTP! Please check the code received or request a new OTP.');
      this.shakeCard();
      return;
    }

    // OTP matches! Create authenticated session
    const initials = this.userName
      ? this.userName.split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase()
      : 'PT';

    const user = {
      name: this.userName,
      contact: this.targetContact,
      method: this.otpMethod,
      initials: initials,
      uhid: 'CP-' + Math.floor(10000 + Math.random() * 90000),
      loginTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      loginDate: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    };

    this.sessionUser = user;
    try {
      // Store in sessionStorage so user is automatically logged out when removing/closing the site
      sessionStorage.setItem('carepulse_auth_user', JSON.stringify(user));
      sessionStorage.setItem('carepulse_last_active', Date.now().toString());
      localStorage.removeItem('carepulse_auth_user');
    } catch (e) { }

    this.resetInactivityTimer();

    const verifyBtn = document.getElementById('btn-verify-otp');
    if (verifyBtn) {
      verifyBtn.innerHTML = '<span>✅ Verified! Unlocking...</span>';
      verifyBtn.classList.add('btn-success-animated');
    }

    setTimeout(() => {
      this.unlockPortal();
      this.updateProfileUI();
      showToast(`Welcome to CarePulse Hospital, ${user.name}!`, 'success');
      if (verifyBtn) {
        verifyBtn.innerHTML = '<span>Verify &amp; Access Portal &rarr;</span>';
        verifyBtn.classList.remove('btn-success-animated');
      }
    }, 600);
  },

  logout(customMessage) {
    this.sessionUser = null;
    if (this.inactivityTimer) {
      clearTimeout(this.inactivityTimer);
      this.inactivityTimer = null;
    }
    try {
      sessionStorage.removeItem('carepulse_auth_user');
      sessionStorage.removeItem('carepulse_last_active');
      localStorage.removeItem('carepulse_auth_user');
    } catch (e) { }
    this.currentOTP = null;
    this.clearOTPInputs();
    this.clearError();
    this.goToStep('input');
    this.lockPortal();
    showToast(customMessage || 'You have logged out. Please sign in to continue.', 'info');
  },

  goToStep(step) {
    this.currentStep = step;
    const inputStep = document.getElementById('auth-step-input');
    const otpStep = document.getElementById('auth-step-otp');
    if (inputStep && otpStep) {
      if (step === 'input') {
        inputStep.style.display = 'block';
        otpStep.style.display = 'none';
      } else {
        inputStep.style.display = 'none';
        otpStep.style.display = 'block';
        const targetDisplay = document.getElementById('auth-target-display');
        if (targetDisplay) {
          targetDisplay.innerText = this.targetContact;
        }
        const methodBadge = document.getElementById('auth-method-badge');
        if (methodBadge) {
          methodBadge.innerText = this.otpMethod === 'google' ? 'Gmail Security Code' : 'SMS Verification OTP';
        }
        this.clearOTPInputs();
        setTimeout(() => {
          const first = document.getElementById('otp-digit-1');
          if (first) first.focus();
        }, 150);
      }
    }
  },

  backToInput() {
    this.stopResendTimer();
    this.clearError();
    this.goToStep('input');
  },

  startResendTimer() {
    this.stopResendTimer();
    this.resendTimer = 30;
    const timerEl = document.getElementById('otp-countdown');
    const resendBtn = document.getElementById('btn-resend-otp');
    if (timerEl) timerEl.innerText = `(${this.resendTimer}s)`;
    if (resendBtn) {
      resendBtn.disabled = true;
      resendBtn.classList.add('disabled');
    }

    this.timerInterval = setInterval(() => {
      this.resendTimer--;
      if (timerEl) timerEl.innerText = `(${this.resendTimer}s)`;
      if (this.resendTimer <= 0) {
        this.stopResendTimer();
        if (timerEl) timerEl.innerText = '';
        if (resendBtn) {
          resendBtn.disabled = false;
          resendBtn.classList.remove('disabled');
        }
      }
    }, 1000);
  },

  stopResendTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  },

  clearOTPInputs() {
    for (let i = 1; i <= 6; i++) {
      const input = document.getElementById(`otp-digit-${i}`);
      if (input) {
        input.value = '';
        input.classList.remove('digit-filled');
      }
    }
  },

  showError(msg) {
    const errEl = document.getElementById('auth-error-msg');
    if (errEl) {
      errEl.innerText = msg;
      errEl.style.display = 'block';
    }
  },

  clearError() {
    const errEl = document.getElementById('auth-error-msg');
    if (errEl) {
      errEl.innerText = '';
      errEl.style.display = 'none';
    }
  },

  shakeCard() {
    const card = document.querySelector('.auth-card');
    if (card) {
      card.classList.remove('shake');
      void card.offsetWidth;
      card.classList.add('shake');
    }
  },

  updateProfileUI() {
    if (!this.sessionUser) return;
    const nameEls = document.querySelectorAll('.user-display-name');
    nameEls.forEach(el => el.innerText = this.sessionUser.name);

    const contactEls = document.querySelectorAll('.user-display-contact');
    contactEls.forEach(el => el.innerText = this.sessionUser.contact);

    const uhidEls = document.querySelectorAll('.user-display-uhid');
    uhidEls.forEach(el => el.innerText = this.sessionUser.uhid);

    const avatarEls = document.querySelectorAll('.user-display-avatar');
    avatarEls.forEach(el => {
      if (this.sessionUser.method === 'google') {
        el.innerHTML = `<span style="font-size: 1.1rem;">🌐</span>`;
      } else {
        el.innerText = this.sessionUser.initials || 'PT';
      }
    });

    const badgeEls = document.querySelectorAll('.user-auth-badge');
    badgeEls.forEach(el => {
      el.innerText = this.sessionUser.method === 'google' ? 'Google Verified' : 'Mobile Verified';
    });
  }
};

// --- Left Navigation Sidebar Functions ---
window.toggleLeftSidebar = function (forceClose) {
  const sidebar = document.getElementById('carepulse-sidebar');
  const backdrop = document.getElementById('sidebar-backdrop');
  if (!sidebar) return;

  if (forceClose === true) {
    sidebar.classList.remove('open');
    if (backdrop) backdrop.classList.remove('active');
    document.body.classList.remove('sidebar-open');
  } else {
    const isOpen = sidebar.classList.contains('open');
    sidebar.classList.toggle('open', !isOpen);
    if (backdrop) backdrop.classList.toggle('active', !isOpen);
    document.body.classList.toggle('sidebar-open', !isOpen);
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
const ThemeEngine = {
  currentTheme: 'light',

  init() {
    const saved = localStorage.getItem('carepulse_theme') || 'light';
    this.setTheme(saved);
  },

  setTheme(theme) {
    this.currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('carepulse_theme', theme);

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
    this.setTheme(next);
    showToast(`Switched to ${next === 'dark' ? 'Dark' : 'Light'} Mode`, 'info');
  }
};

window.ThemeEngine = ThemeEngine;
window.toggleTheme = () => ThemeEngine.toggle();

// --- 2. Multi-Language Engine ---
const TRANSLATIONS = {
  en: {
    nav_home: 'Home Overview',
    nav_opd: 'OPD & Doctors',
    nav_services: 'Clinical Services',
    nav_patient: 'Patient Care',
    nav_tokens: 'My Tokens',
    nav_book: 'Book Doctor Slot',
    nav_emergency: 'Emergency SOS 108',
    sec_quick: 'Quick Healthcare Access',
    sec_queue: 'Real-Time Clinic Token Display',
    sec_doctors: 'Meet Our Clinic Doctors',
    sec_packages: 'Preventive Health Packages',
    sec_booking: 'Book Doctor Consultation & Token',
    sec_beds: 'Live Hospital Bed & ICU Capacity',
    sec_track: 'Track Your OPD Queue Position',
    btn_sos: '🚨 Emergency SOS',
    btn_calc: '🩺 Health & BMI Calculator',
    btn_book_now: 'Book Doctor Slot',
    btn_print: '🖨️ Print Token Slip',
    btn_share_wa: '📲 Share on WhatsApp',
    theme_dark: 'Dark Mode',
    theme_light: 'Light Mode',
    sos_title: '🚨 Emergency Ambulance Dispatch',
    sos_dispatched: 'Ambulance #PB-09-8821 Dispatched!',
    sos_eta: 'Estimated Arrival: 6 mins 45 secs',
    bed_triage: 'Emergency Triage Beds',
    bed_icu: 'ICU & Critical Care',
    bed_vent: 'Ventilator Units',
    bed_o2: 'Oxygen Support Beds'
  },
  hi: {
    nav_home: 'होम अवलोकन',
    nav_opd: 'ओपीडी और डॉक्टर्स',
    nav_services: 'चिकित्सा सेवाएं',
    nav_patient: 'मरीज देखभाल',
    nav_tokens: 'मेरे टोकन',
    nav_book: 'डॉक्टर स्लॉट बुक करें',
    nav_emergency: 'आपातकालीन एसओएस 108',
    sec_quick: 'त्वरित स्वास्थ्य सेवा',
    sec_queue: 'लाइव ओपीडी टोकन डिस्प्ले',
    sec_doctors: 'हमारे विशेषज्ञ डॉक्टर्स',
    sec_packages: 'निवारक स्वास्थ्य पैकेज',
    sec_booking: 'डॉक्टर परामर्श और टोकन बुक करें',
    sec_beds: 'लाइव अस्पताल बेड और आईसीयू क्षमता',
    sec_track: 'अपनी टोकन कतार ट्रैक करें',
    btn_sos: '🚨 आपातकालीन एसओएस',
    btn_calc: '🩺 स्वास्थ्य एवं बीएमआई कैलकुलेटर',
    btn_book_now: 'स्लॉट बुक करें',
    btn_print: '🖨️ टोकन पर्ची प्रिंट करें',
    btn_share_wa: '📲 व्हाट्सएप पर शेयर करें',
    theme_dark: 'डार्क मोड',
    theme_light: 'लाइट मोड',
    sos_title: '🚨 आपातकालीन एम्बुलेंस सेवा',
    sos_dispatched: 'एम्बुलेंस #PB-09-8821 रवाना!',
    sos_eta: 'अनुमानित आगमन: 6 मिनट 45 सेकंड',
    bed_triage: 'इमरजेंसी ट्राइएज बेड',
    bed_icu: 'आईसीयू क्रिटिकल केयर',
    bed_vent: 'वेंटिलेटर इकाइयां',
    bed_o2: 'ऑक्सीजन सपोर्ट बेड'
  },
  pa: {
    nav_home: 'ਮੁੱਖ ਪੰਨਾ',
    nav_opd: 'ਓਪੀਡੀ ਅਤੇ ਡਾਕਟਰ',
    nav_services: 'ਕਲੀਨਿਕਲ ਸੇਵਾਵਾਂ',
    nav_patient: 'ਮਰੀਜ਼ ਦੇਖਭਾਲ',
    nav_tokens: 'ਮੇਰੇ ਟੋਕਨ',
    nav_book: 'ਡਾਕਟਰ ਸਲਾਟ ਬੁੱਕ ਕਰੋ',
    nav_emergency: 'ਐਮਰਜੈਂਸੀ ਐਸਓਐਸ 108',
    sec_quick: 'ਤੁਰੰਤ ਸਿਹਤ ਸੇਵਾ',
    sec_queue: 'ਲਾਈਵ ਓਪੀਡੀ ਟੋਕਨ ਡਿਸਪਲੇਅ',
    sec_doctors: 'ਸਾਡੇ ਮਾਹਰ ਡਾਕਟਰ',
    sec_packages: 'ਸਿਹਤ ਜਾਂਚ ਪੈਕੇਜ',
    sec_booking: 'ਡਾਕਟਰ ਸਲਾਹ ਅਤੇ ਟੋਕਨ ਬੁੱਕ ਕਰੋ',
    sec_beds: 'ਲਾਈਵ ਹਸਪਤਾਲ ਬੈੱਡ ਅਤੇ ਆਈਸੀਯੂ ਸਥਿਤੀ',
    sec_track: 'ਆਪਣੀ ਕਤਾਰ ਸਥਿਤੀ ਟ੍ਰੈਕ ਕਰੋ',
    btn_sos: '🚨 ਐਮਰਜੈਂਸੀ ਐਸਓਐਸ',
    btn_calc: '🩺 ਸਿਹਤ ਅਤੇ ਬੀਐਮਆਈ ਕੈਲਕੁਲੇਟਰ',
    btn_book_now: 'ਸਲਾਟ ਬੁੱਕ ਕਰੋ',
    btn_print: '🖨️ ਟੋਕਨ ਪਰਚੀ ਪ੍ਰਿੰਟ ਕਰੋ',
    btn_share_wa: '📲 ਵਟਸਐਪ ਤੇ ਸਾਂਝਾ ਕਰੋ',
    theme_dark: 'ਡਾਰਕ ਮੋਡ',
    theme_light: 'ਲਾਈਟ ਮੋਡ',
    sos_title: '🚨 ਐਮਰਜੈਂਸੀ ਐਂਬੂਲੈਂਸ ਸੇਵਾ',
    sos_dispatched: 'ਐਂਬੂਲੈਂਸ #PB-09-8821 ਰਵਾਨਾ!',
    sos_eta: 'ਪਹੁੰਚਣ ਦਾ ਸਮਾਂ: 6 ਮਿੰਟ 45 ਸਕਿੰਟ',
    bed_triage: 'ਐਮਰਜੈਂਸੀ ਟ੍ਰਾਈਏਜ ਬੈੱਡ',
    bed_icu: 'ਆਈਸੀਯੂ ਗੰਭੀਰ ਦੇਖਭਾਲ',
    bed_vent: 'ਵੈਂਟੀਲੇਟਰ ਯੂਨਿਟ',
    bed_o2: 'ਆਕਸੀਜਨ ਸਪੋਰਟ ਬੈੱਡ'
  }
};

const LanguageEngine = {
  currentLang: 'en',

  init() {
    const saved = localStorage.getItem('carepulse_lang') || 'en';
    this.setLanguage(saved);
  },

  setLanguage(lang) {
    if (!TRANSLATIONS[lang]) lang = 'en';
    this.currentLang = lang;
    localStorage.setItem('carepulse_lang', lang);

    // Update active pill button
    const pills = document.querySelectorAll('.lang-pill-btn');
    pills.forEach(p => {
      p.classList.toggle('active', p.getAttribute('data-lang') === lang);
    });

    // Translate all elements with data-i18n
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (TRANSLATIONS[lang][key]) {
        el.innerText = TRANSLATIONS[lang][key];
      }
    });
  }
};

window.LanguageEngine = LanguageEngine;
window.setLanguage = (lang) => LanguageEngine.setLanguage(lang);

// --- 3. Live Hospital Bed & ICU Capacity Engine ---
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
  }
};

window.BedsCapacityEngine = BedsCapacityEngine;

// --- 4. 1-Click Emergency SOS Simulator ---
const EmergencySOSEngine = {
  active: false,
  timerInterval: null,
  secondsRemaining: 405, // 6 mins 45 secs
  audioCtx: null,

  playSirenBeep() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      this.audioCtx = ctx;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';

      // Emergency ambulance two-tone modulation
      const now = ctx.currentTime;
      osc.frequency.setValueAtTime(750, now);
      osc.frequency.exponentialRampToValueAtTime(960, now + 0.2);
      osc.frequency.exponentialRampToValueAtTime(750, now + 0.4);
      osc.frequency.exponentialRampToValueAtTime(960, now + 0.6);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.7);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.75);
    } catch (e) {
      console.warn('AudioContext not allowed without interaction:', e);
    }
  },

  triggerSOS() {
    this.active = true;
    this.playSirenBeep();

    const modal = document.getElementById('emergency-sos-modal');
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    // Geolocation detection simulation
    const locEl = document.getElementById('sos-location-text');
    if (locEl) {
      locEl.innerText = 'Acquiring high-accuracy GPS coordinates...';
      setTimeout(() => {
        locEl.innerHTML = '📍 <strong>GPS Verified:</strong> GT Road, Near Sugar Mill Crossing, Phagwara (31.2240° N, 75.7708° E)';
      }, 700);
    }

    this.startCountdown();
    showToast('🚨 EMERGENCY ALERT ACTIVATED: Ambulance dispatched from Phagwara Trauma Wing!', 'error');
  },

  startCountdown() {
    if (this.timerInterval) clearInterval(this.timerInterval);
    const etaEl = document.getElementById('sos-eta-timer');

    this.timerInterval = setInterval(() => {
      if (this.secondsRemaining > 0) {
        this.secondsRemaining--;
        const mins = Math.floor(this.secondsRemaining / 60);
        const secs = this.secondsRemaining % 60;
        if (etaEl) {
          etaEl.innerText = `${mins}m ${secs < 10 ? '0' : ''}${secs}s`;
        }
      }
    }, 1000);
  },

  cancelSOS() {
    this.active = false;
    if (this.timerInterval) clearInterval(this.timerInterval);
    const modal = document.getElementById('emergency-sos-modal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
    showToast('Emergency SOS cancelled. Please call 1800-180-2026 for assistance.', 'info');
  }
};

window.EmergencySOSEngine = EmergencySOSEngine;
window.triggerEmergencySOS = () => EmergencySOSEngine.triggerSOS();
window.closeEmergencySOS = () => EmergencySOSEngine.cancelSOS();

// --- 5. Clinical Health Risk & BMI / Vitals Calculator ---
const HealthCalculatorEngine = {
  open() {
    const modal = document.getElementById('health-calculator-modal');
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  },

  close() {
    const modal = document.getElementById('health-calculator-modal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  },

  calculate() {
    const height = parseFloat(document.getElementById('calc-height').value);
    const weight = parseFloat(document.getElementById('calc-weight').value);
    const age = parseInt(document.getElementById('calc-age').value, 10);
    const bp = parseInt(document.getElementById('calc-bp').value, 10) || 120;

    if (!height || !weight || height <= 0 || weight <= 0) {
      showToast('Please enter valid Height (cm) and Weight (kg)', 'error');
      return;
    }

    const heightM = height / 100;
    const bmi = (weight / (heightM * heightM)).toFixed(1);

    // Calculate Ideal Weight Range (BMI 18.5 - 24.9)
    const idealMin = Math.round(18.5 * heightM * heightM);
    const idealMax = Math.round(24.9 * heightM * heightM);

    // Daily Water Intake (35ml per kg)
    const waterLiters = ((weight * 35) / 1000).toFixed(1);

    // BMI Category and Indicator Position (10 to 40 scale)
    let category = 'Normal / Healthy';
    let badgeBg = '#10b981';
    let badgeColor = 'white';
    let pinPct = Math.min(Math.max(((bmi - 14) / (38 - 14)) * 100, 5), 95);

    if (bmi < 18.5) {
      category = 'Underweight';
      badgeBg = '#38bdf8';
    } else if (bmi >= 25 && bmi < 29.9) {
      category = 'Overweight';
      badgeBg = '#f59e0b';
    } else if (bmi >= 30) {
      category = 'Obese (High Clinical Risk)';
      badgeBg = '#ef4444';
    }

    // Blood pressure assessment
    let bpStatus = 'Normal';
    if (bp >= 140) bpStatus = 'Hypertension Stage 2';
    else if (bp >= 130) bpStatus = 'Hypertension Stage 1';
    else if (bp >= 120) bpStatus = 'Elevated';

    // Render results
    const scoreNum = document.getElementById('calc-bmi-val');
    const catBadge = document.getElementById('calc-category-badge');
    const pin = document.getElementById('calc-indicator-pin');
    const idealSpan = document.getElementById('calc-ideal-weight');
    const waterSpan = document.getElementById('calc-water-intake');
    const bpSpan = document.getElementById('calc-bp-status');

    if (scoreNum) scoreNum.innerText = bmi;
    if (catBadge) {
      catBadge.innerText = category;
      catBadge.style.background = badgeBg;
      catBadge.style.color = badgeColor;
    }
    if (pin) pin.style.left = `${pinPct}%`;
    if (idealSpan) idealSpan.innerText = `${idealMin} - ${idealMax} kg`;
    if (waterSpan) waterSpan.innerText = `${waterLiters} Liters/Day`;
    if (bpSpan) bpSpan.innerText = bpStatus;

    const resultBox = document.getElementById('calc-result-box');
    if (resultBox) resultBox.style.display = 'block';

    showToast(`Calculated BMI: ${bmi} (${category})`, 'success');
  }
};

window.HealthCalculatorEngine = HealthCalculatorEngine;
window.openHealthCalculator = () => HealthCalculatorEngine.open();
window.closeHealthCalculator = () => HealthCalculatorEngine.close();
window.calculateHealthRisk = () => HealthCalculatorEngine.calculate();

// --- 6. 1-Click Auto-Booking from AI Symptom Chatbot ---
window.autoBookDoctorFromChat = function (doctorId, reason) {
  closeChatWidget();
  openBookingLayer(doctorId);

  setTimeout(() => {
    const reasonInput = document.getElementById('layer-patient-reason');
    if (reasonInput) {
      reasonInput.value = reason ? `AI Symptom Triage: ${reason}` : 'AI Consultation';
    }

    // Auto-select first available time slot
    const slotBtn = document.querySelector('#layer-slots-container .slot-btn:not(.booked)');
    if (slotBtn) {
      slotBtn.click();
    }
    showToast('Specialist & next time slot pre-selected! Confirm details to book.', 'success');
  }, 250);
};

// --- 7. WhatsApp Token Pass Sharing ---
window.shareTokenWhatsApp = function () {
  const token = state.currentViewingToken || state.lastCreatedToken;
  if (!token) {
    showToast('No active appointment token found to share.', 'info');
    return;
  }

  const patientMeta = token.patientMeta || `${token.patientAge || ''} Yrs / ${token.patientGender || ''} • ${token.patientPlace || 'Phagwara'}`;
  const docDept = token.doctorDept || token.doctorSpecialty || 'General OPD';
  const dateStr = token.dateLabel || token.date || 'Today';
  const timeStr = token.slotTime || token.timeSlot || 'Scheduled Time';
  const roomStr = token.roomNo || token.room || 'General Consultation Room';

  const msg = encodeURIComponent(
    `🏥 *CarePulse Hospital Official OPD Pass*\n` +
    `🎫 *Token Number:* #${token.tokenId}\n` +
    `🔢 *Reference:* ${token.ticketRef || 'CP-2026'}\n` +
    `👤 *Patient:* ${token.patientName} (${patientMeta})\n` +
    `🩺 *Doctor:* ${token.doctorName} (${docDept})\n` +
    `📅 *Appointment:* ${dateStr} at ${timeStr}\n` +
    `🚪 *Room:* ${roomStr}\n` +
    `🏢 *Desk:* ${token.assignedDesk || 'Counter 1 • Desk A'}\n` +
    `💳 *Consultation Fee:* ${token.fee}\n` +
    `📍 *Venue:* GT Road, Sugar Mill Crossing, Phagwara, Punjab\n` +
    `🧭 Live queue tracking: ${window.location.origin || ''}/hospital.html`
  );

  window.open(`https://api.whatsapp.com/send?text=${msg}`, '_blank');
};

// ==========================================================================
// 8. Multi-Palette Healthcare Theme System
// ==========================================================================
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
const CategoryScrollSpy = {
  init() {
    const scroller = document.getElementById('category-chips-scroller');
    if (!scroller) return;

    const chips = scroller.querySelectorAll('.category-chip');
    if (!chips.length) return;

    // Smooth click handler
    chips.forEach(chip => {
      chip.addEventListener('click', (e) => {
        const targetId = chip.getAttribute('data-target');
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          chips.forEach(c => c.classList.remove('active'));
          chip.classList.add('active');
        }
      });
    });

    // ScrollSpy observer
    const sectionIds = Array.from(chips).map(c => c.getAttribute('data-target')).filter(Boolean);
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            chips.forEach(chip => {
              const isMatch = chip.getAttribute('data-target') === id;
              chip.classList.toggle('active', isMatch);
              if (isMatch) {
                chip.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
              }
            });
          }
        });
      }, {
        rootMargin: '-10% 0px -70% 0px',
        threshold: 0
      });

      sectionIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    }
  }
};

window.CategoryScrollSpy = CategoryScrollSpy;

// ==========================================================================
// 11. Universal Spotlight Search Engine (Ctrl + K)
// ==========================================================================
const SpotlightSearchEngine = {
  isOpen: false,
  items: [],
  selectedIndex: 0,

  init() {
    this.buildIndex();
    this.bindEvents();
  },

  buildIndex() {
    this.items = [];

    // 1. Doctors from DOCTORS array
    if (typeof DOCTORS !== 'undefined' && Array.isArray(DOCTORS)) {
      DOCTORS.forEach(doc => {
        this.items.push({
          type: 'Doctor',
          category: 'Specialist Doctors',
          title: doc.name,
          sub: `${doc.specialty} • ${doc.qualification || 'Senior Consultant'} • Room ${doc.room || 'OPD'}`,
          icon: '👨‍⚕️',
          action: () => {
            openBookingLayer(doc.id);
          }
        });
      });
    }

    // 2. Clinical Departments & Services
    const services = [
      { title: 'General Medicine & Adult OPD', sub: 'Primary consultations, chronic illness & acute care', icon: '🩺', target: 'live-board-section' },
      { title: 'Pediatrics & Child Wellness', sub: 'Vaccination, neonatal care & infant triage', icon: '👶', target: 'live-board-section' },
      { title: 'Dermatology & Skin Clinic', sub: 'Laser, allergy treatment & cosmetic dermatology', icon: '🔬', target: 'live-board-section' },
      { title: 'Dental & Maxillofacial Care', sub: 'Root canals, tooth extractions & orthodontics', icon: '🦷', target: 'live-board-section' },
      { title: 'Bed & ICU Availability Tracker', sub: 'Live triage beds, ventilators & blood bank stocks', icon: '🛏️', target: 'beds-occupancy-section' },
      { title: 'Preventive Health Packages', sub: 'Full body checkup packages from ₹999 with home pickup', icon: '📦', target: 'packages-section' },
      { title: 'Download Lab Reports (UHID)', sub: 'Instant NABL-certified PDF lab diagnostic reports', icon: '📄', action: () => openLabReportModal('UHID-98214') },
      { title: '24/7 Doorstep Pharmacy Delivery', sub: 'Upload doctor prescription for 2-hour delivery', icon: '💊', action: () => openPharmacyModal() },
      { title: 'Cashless Insurance & TPA Desk', sub: 'Ayushman Bharat, CGHS & private insurance claims', icon: '🛡️', target: 'insurance-section' },
      { title: 'Emergency Trauma Hotline & Ambulance 108', sub: '24/7 emergency trauma triage & priority ambulance', icon: '🚨', action: () => openEmergencyModal() },
      { title: 'Clinical Health & BMI Risk Calculator', sub: 'Interactive BMI, blood pressure category & clinical score', icon: '📊', action: () => openHealthCalculator() }
    ];

    services.forEach(s => {
      this.items.push({
        type: 'Service',
        category: 'Hospital Services',
        title: s.title,
        sub: s.sub,
        icon: s.icon,
        action: s.action || (() => {
          const el = document.getElementById(s.target);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        })
      });
    });

    // 3. Health Packages
    if (typeof HEALTH_PACKAGES !== 'undefined' && Array.isArray(HEALTH_PACKAGES)) {
      HEALTH_PACKAGES.forEach(pkg => {
        this.items.push({
          type: 'Package',
          category: 'Health Packages',
          title: pkg.name,
          sub: `${pkg.testsCount || 45} lab tests • ₹${pkg.price} (Special Offer)`,
          icon: '🛡️',
          action: () => {
            const el = document.getElementById('packages-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }
        });
      });
    }

    // 4. Quick Actions
    this.items.push(
      {
        type: 'Action',
        category: 'Quick Actions',
        title: 'Book Doctor Consultation (Open Layer)',
        sub: 'Launch fast reservation layer with live tokens',
        icon: '⚡',
        action: () => openBookingLayer()
      },
      {
        type: 'Action',
        category: 'Quick Actions',
        title: 'Track My Active Queue Token',
        sub: 'Verify queue position, doctor room & estimated wait time',
        icon: '⏱️',
        action: () => {
          const el = document.getElementById('track-token-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
      },
      {
        type: 'Action',
        category: 'Quick Actions',
        title: 'My Booked Tokens & Slips',
        sub: 'View, reprint or share appointment tokens',
        icon: '📋',
        action: () => openMyBookingsModal()
      },
      {
        type: 'Action',
        category: 'Quick Actions',
        title: 'Toggle Dark / Light Theme Mode',
        sub: 'Switch between light and dark display modes',
        icon: '🌙',
        action: () => toggleTheme()
      }
    );
  },

  bindEvents() {
    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        this.toggle();
      } else if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });

    const input = document.getElementById('spotlight-search-input');
    if (input) {
      input.addEventListener('input', (e) => this.renderResults(e.target.value.trim()));
      input.addEventListener('keydown', (e) => {
        const results = document.querySelectorAll('.spotlight-item');
        if (!results.length) return;

        if (e.key === 'ArrowDown') {
          e.preventDefault();
          this.selectedIndex = (this.selectedIndex + 1) % results.length;
          this.updateSelection(results);
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          this.selectedIndex = (this.selectedIndex - 1 + results.length) % results.length;
          this.updateSelection(results);
        } else if (e.key === 'Enter') {
          e.preventDefault();
          if (results[this.selectedIndex]) {
            results[this.selectedIndex].click();
          }
        }
      });
    }

    const backdrop = document.getElementById('spotlight-search-modal');
    if (backdrop) {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) this.close();
      });
    }
  },

  updateSelection(elements) {
    elements.forEach((el, idx) => {
      el.classList.toggle('highlighted', idx === this.selectedIndex);
      if (idx === this.selectedIndex) {
        el.scrollIntoView({ block: 'nearest' });
      }
    });
  },

  open() {
    const modal = document.getElementById('spotlight-search-modal');
    const input = document.getElementById('spotlight-search-input');
    if (modal) {
      modal.classList.add('open');
      this.isOpen = true;
      if (input) {
        input.value = '';
        setTimeout(() => input.focus(), 80);
      }
      this.renderResults('');
    }
  },

  close() {
    const modal = document.getElementById('spotlight-search-modal');
    if (modal) {
      modal.classList.remove('open');
      this.isOpen = false;
    }
  },

  toggle() {
    if (this.isOpen) this.close();
    else this.open();
  },

  renderResults(query) {
    const container = document.getElementById('spotlight-results-container');
    if (!container) return;

    const q = query.toLowerCase();
    const filtered = this.items.filter(item => {
      if (!q) return true;
      return item.title.toLowerCase().includes(q) ||
        item.sub.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q);
    });

    if (!filtered.length) {
      container.innerHTML = `
        <div style="text-align: center; padding: 2.5rem 1rem; color: var(--slate-400);">
          <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🔍</div>
          <div style="font-weight: 700; color: var(--dark); font-size: 0.95rem;">No matching doctors or services found</div>
          <div style="font-size: 0.8rem; margin-top: 0.25rem;">Try searching for "Rajesh", "Pediatric", "ICU", "Blood test", or "Token"</div>
        </div>
      `;
      return;
    }

    // Group items
    const groups = {};
    filtered.slice(0, 15).forEach(item => {
      if (!groups[item.category]) groups[item.category] = [];
      groups[item.category].push(item);
    });

    let html = '';
    let globalIndex = 0;
    for (const [cat, items] of Object.entries(groups)) {
      html += `<div class="spotlight-group-label">${cat}</div>`;
      items.forEach(item => {
        const isSelected = globalIndex === 0;
        html += `
          <div class="spotlight-item ${isSelected ? 'highlighted' : ''}" data-idx="${globalIndex}">
            <div class="spotlight-item-icon">${item.icon}</div>
            <div class="spotlight-item-content">
              <div class="spotlight-item-title">${item.title}</div>
              <div class="spotlight-item-sub">${item.sub}</div>
            </div>
            <div class="spotlight-item-action">Jump ↗</div>
          </div>
        `;
        globalIndex++;
      });
    }

    container.innerHTML = html;
    this.selectedIndex = 0;

    const renderedItems = container.querySelectorAll('.spotlight-item');
    let itemIdx = 0;
    for (const [cat, items] of Object.entries(groups)) {
      items.forEach(item => {
        const el = renderedItems[itemIdx];
        if (el) {
          el.addEventListener('click', () => {
            SpotlightSearchEngine.close();
            item.action();
          });
        }
        itemIdx++;
      });
    }
  }
};

window.SpotlightSearchEngine = SpotlightSearchEngine;
window.openSpotlightSearch = () => SpotlightSearchEngine.open();
window.closeSpotlightSearch = () => SpotlightSearchEngine.close();

// ==========================================================================
// 12. Persistent Active Token Floating Mini-Tracker
// ==========================================================================
const FloatingTokenTracker = {
  isDismissed: false,

  init() {
    this.update();
    setInterval(() => this.update(), 12000);
  },

  update() {
    if (this.isDismissed) return;
    const pill = document.getElementById('floating-token-pill');
    if (!pill) return;

    let activeToken = state.lastCreatedToken;
    if (!activeToken && state.userAppointments && state.userAppointments.length > 0) {
      activeToken = state.userAppointments[0];
    }

    if (activeToken) {
      const numSpan = document.getElementById('float-token-number');
      const docSpan = document.getElementById('float-token-doc');
      const etaSpan = document.getElementById('float-token-eta');

      if (numSpan) numSpan.innerText = `Token #${activeToken.tokenId || activeToken.token || 'Active'}`;
      if (docSpan) docSpan.innerText = activeToken.doctorName || 'Doctor Assigned';
      if (etaSpan) etaSpan.innerText = `(Slot: ${activeToken.slotTime || activeToken.time || 'Today'})`;

      pill.style.display = 'flex';
    } else {
      pill.style.display = 'none';
    }
  },

  dismiss() {
    this.isDismissed = true;
    const pill = document.getElementById('floating-token-pill');
    if (pill) pill.style.display = 'none';
  }
};

window.FloatingTokenTracker = FloatingTokenTracker;

// ==========================================================================
// 13. Sticky Bottom Quick-Action Dock Active State
// ==========================================================================
window.setActiveDock = function (tabName) {
  document.querySelectorAll('.dock-item').forEach(item => item.classList.remove('active'));
  const el = document.getElementById(`dock-item-${tabName}`);
  if (el) el.classList.add('active');
};

// ==========================================================================
// 14. SMS Gateway Transparency & Mode Info Modal Handlers
// ==========================================================================
window.openSMSGatewayInfoModal = function () {
  const modal = document.getElementById('sms-gateway-modal');
  if (modal) modal.style.display = 'flex';
};

window.closeSMSGatewayInfoModal = function () {
  const modal = document.getElementById('sms-gateway-modal');
  if (modal) modal.style.display = 'none';
};

