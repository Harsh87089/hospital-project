// CarePulse Tele-Consultation & Virtual Prescription Engine
import { DEMO_PHONE, DOCTORS } from './config.js';
import { showToast, escapeHtml } from './utils.js';

const TeleConsultEngine = {
  activeDoctorId: 'doc-gp-1',
  mediaStream: null,
  isMicMuted: false,
  isCamOff: false,
  timerInterval: null,
  elapsedSeconds: 0,
  vitalsInterval: null,
  currentVitals: { hr: 74, spo2: 98, bp: '120/80' },

  prescriptions: [
    { name: 'Tab. Paracetamol 650 mg', dosage: '1-0-1 (After Food)', duration: '3 Days' },
    { name: 'Tab. Vitamin C 500 mg', dosage: '1-0-0 (After Food)', duration: '5 Days' },
    { name: 'Syp. Cough Formulation 10 ml (Generic Sample)', dosage: '0-0-1 (At Bedtime)', duration: '5 Days' }
  ],
  sessionId: 0,
  tokenRef: null,

  open(doctorId = null) {
    if (doctorId) {
      this.activeDoctorId = doctorId;
    } else if (!this.activeDoctorId) {
      this.activeDoctorId = (DOCTORS[0] && DOCTORS[0].id) || 'doc-gp-1';
    }

    const doc = DOCTORS.find(d => d.id === this.activeDoctorId) || DOCTORS[0];
    const modal = document.getElementById('tele-consult-modal');
    if (!modal) return;

    // Reset session tokenRef freshly for every consult session
    this.tokenRef = `#TK-TELE-${Math.floor(1000 + Math.random() * 9000)}`;
    const rxTokenEl = document.getElementById('rx-token-num');
    if (rxTokenEl) rxTokenEl.innerText = this.tokenRef;

    // Populate Doctor Data
    const badgeName = document.getElementById('tele-doc-badge-name');
    const badgeSpec = document.getElementById('tele-doc-badge-spec');
    const screenName = document.getElementById('tele-doc-screen-name');
    const screenDesc = document.getElementById('tele-doc-screen-desc');
    const docAvatar = document.getElementById('tele-doc-avatar');
    const rxDocName = document.getElementById('rx-header-doc-name');
    const rxDocReg = document.getElementById('rx-header-doc-reg');
    const rxSigName = document.getElementById('rx-sig-name');

    if (badgeName) badgeName.innerText = doc ? doc.name : 'Consultant Doctor';
    if (badgeSpec) badgeSpec.innerText = `${doc ? doc.specialty : 'General OPD'} • ${doc?.regNo || 'Demo ID: CP-MED-101 (Sample Profile)'}`;
    if (screenName) screenName.innerText = doc ? doc.name : 'Consultant Doctor';
    if (screenDesc) screenDesc.innerText = `${doc ? doc.qualifications : 'MBBS'} • Demo Consultation (Simulated)`;
    if (docAvatar && doc?.avatar) docAvatar.src = doc.avatar;
    if (rxDocName) rxDocName.innerText = doc ? doc.name : 'Consultant Doctor';
    if (rxDocReg) rxDocReg.innerText = `${doc ? doc.qualifications : 'MBBS'} • ${doc?.regNo || 'Demo ID: CP-MED-101 (Sample Profile)'}`;
    if (rxSigName) rxSigName.innerText = doc ? doc.name : 'Consultant Doctor';

    // Patient info
    const user = window.CarePulseAuth ? CarePulseAuth.sessionUser : null;
    const patientNameEl = document.getElementById('rx-tele-patient-name') || document.getElementById('rx-patient-name');
    if (patientNameEl) {
      patientNameEl.innerText = (user && user.name) ? `${user.name} (Demo)` : 'Self (Demo Patient)';
    }

    // Date
    const dateStamp = document.getElementById('rx-date-stamp');
    if (dateStamp) {
      const today = new Date();
      dateStamp.innerText = today.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    }

    // Render medicines list
    this.renderPrescriptions();

    // Start video & timers
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    this.startCallTimer();
    this.startVitalsSimulation();
    this.resetControls();
    this.initCameraStream();

    showToast(`📹 Connected to Dr. ${doc ? doc.name.split(' ').pop() : 'Consultant'}'s Demo Consultation Room`, 'success');
  },

  resetControls() {
    this.isMicMuted = false;
    this.isCamOff = false;
    const mic = document.getElementById('btn-tele-mic');
    const cam = document.getElementById('btn-tele-cam');
    if (mic) {
      mic.innerHTML = '🎙️';
      mic.classList.remove('off');
      mic.title = 'Audio simulated in demo (mic not captured)';
    }
    if (cam) {
      cam.innerHTML = '📹';
      cam.classList.remove('off');
      cam.title = 'Turn Camera Off';
    }
  },

  close() {
    this.sessionId++;
    this.stopCameraStream();
    this.stopCallTimer();
    this.stopVitals();
    const modal = document.getElementById('tele-consult-modal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  },

  initCameraStream() {
    const sid = ++this.sessionId;
    const videoEl = document.getElementById('patient-webcam-video');
    const fallbackEl = document.getElementById('patient-webcam-fallback');
    const showFallback = () => {
      if (videoEl) videoEl.style.display = 'none';
      if (fallbackEl) fallbackEl.style.display = 'flex';
    };

    if (!navigator.mediaDevices?.getUserMedia) {
      showFallback();
      return;
    }

    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        if (sid !== this.sessionId || document.hidden) {
          stream.getTracks().forEach(t => t.stop());
          return;
        }
        this.mediaStream = stream;
        this.isCamOff = false;
        if (videoEl) {
          videoEl.srcObject = stream;
          videoEl.style.display = 'block';
        }
        if (fallbackEl) fallbackEl.style.display = 'none';
        const btn = document.getElementById('btn-tele-cam');
        if (btn) {
          btn.innerHTML = '📹';
          btn.classList.remove('off');
          btn.title = 'Turn Camera Off';
        }
      })
      .catch(err => {
        if (sid !== this.sessionId) return;
        console.warn('Webcam unavailable, using simulation:', err);
        showFallback();
        showToast(err?.name === 'NotAllowedError' ? 'Camera permission denied. Showing simulated view.' : 'No camera available. Showing simulated view.', 'info');
      });
  },

  stopCameraStream() {
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(track => track.stop());
      this.mediaStream = null;
    }
    const videoEl = document.getElementById('patient-webcam-video');
    if (videoEl) videoEl.srcObject = null;
  },

  setCamera(on) {
    this.isCamOff = !on;
    const btn = document.getElementById('btn-tele-cam');
    if (btn) {
      btn.innerHTML = on ? '📹' : '🚫';
      btn.classList.toggle('off', !on);
      btn.title = on ? 'Turn Camera Off' : 'Turn Camera On';
    }
    if (on) {
      this.initCameraStream();
    } else {
      this.stopCameraStream();
      const v = document.getElementById('patient-webcam-video');
      const f = document.getElementById('patient-webcam-fallback');
      if (v) v.style.display = 'none';
      if (f) f.style.display = 'flex';
    }
  },

  toggleCamera() {
    this.setCamera(this.isCamOff);
  },

  toggleMic() {
    showToast('Audio is simulated in this demo — microphone is not captured or transmitted.', 'info');
    const btn = document.getElementById('btn-tele-mic');
    if (btn) {
      btn.title = 'Audio simulated in demo (mic not captured)';
    }
  },

  startCallTimer() {
    this.elapsedSeconds = 0;
    this.stopCallTimer();
    const timerEl = document.getElementById('tele-call-timer');
    this.timerInterval = setInterval(() => {
      this.elapsedSeconds++;
      const mins = String(Math.floor(this.elapsedSeconds / 60)).padStart(2, '0');
      const secs = String(this.elapsedSeconds % 60).padStart(2, '0');
      if (timerEl) timerEl.innerText = `${mins}:${secs}`;
    }, 1000);
  },

  stopCallTimer() {
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.timerInterval = null;
  },

  startVitalsSimulation() {
    this.stopVitals();
    const hrEl = document.getElementById('tele-vital-hr');
    const spo2El = document.getElementById('tele-vital-spo2');
    const bpEl = document.getElementById('tele-vital-bp');

    this.vitalsInterval = setInterval(() => {
      this.currentVitals.hr = 72 + Math.floor(Math.random() * 6);
      this.currentVitals.spo2 = 97 + Math.floor(Math.random() * 3);
      if (hrEl) hrEl.innerText = `${this.currentVitals.hr} BPM`;
      if (spo2El) spo2El.innerText = `SpO2 ${this.currentVitals.spo2}%`;
      if (bpEl) bpEl.innerText = `BP 120/80`;
    }, 4000);
  },

  stopVitals() {
    if (this.vitalsInterval) clearInterval(this.vitalsInterval);
    this.vitalsInterval = null;
  },

  simulateVitalsSpike() {
    const hrEl = document.getElementById('tele-vital-hr');
    const spo2El = document.getElementById('tele-vital-spo2');
    this.currentVitals.hr = 88;
    this.currentVitals.spo2 = 99;
    if (hrEl) hrEl.innerText = `88 BPM (Pulsing)`;
    if (spo2El) spo2El.innerText = `SpO2 99%`;
    showToast('🩺 Simulated vitals updated: Heart Rate 88 BPM, SpO2 99% (Demo telemetry)', 'info');
  },

  renderPrescriptions() {
    const container = document.getElementById('rx-items-list');
    if (!container) return;

    if (this.prescriptions.length === 0) {
      container.innerHTML = `<div style="text-align: center; color: var(--slate-500); padding: 1rem; font-size: 0.78rem;">No medicines prescribed yet. Select from below to add.</div>`;
      return;
    }

    container.innerHTML = this.prescriptions.map((item, idx) => `
      <div class="rx-item-card">
        <div>
          <div class="rx-med-name">${idx + 1}. ${escapeHtml(item.name)}</div>
          <div class="rx-med-dose">${escapeHtml(item.dosage)} &bull; Duration: ${escapeHtml(item.duration)}</div>
        </div>
        <button type="button" class="rx-item-remove" data-action="remove-prescription" data-idx="${idx}" title="Remove item">&times;</button>
      </div>
    `).join('');
  },

  addSelectedMedicine() {
    const select = document.getElementById('rx-quick-select');
    if (!select) return;
    const [name, dosage, duration] = (select.value || '').split('|');
    if (!name || !dosage || !duration) return;
    if (this.prescriptions.some(p => p.name === name)) {
      showToast(`${name} is already on the prescription`, 'info');
      return;
    }
    this.prescriptions.push({ name, dosage, duration });
    this.renderPrescriptions();
    showToast(`Added ${name} to digital prescription`, 'success');
  },

  removePrescription(index) {
    this.prescriptions.splice(index, 1);
    this.renderPrescriptions();
  },

  downloadPrescriptionPDF() {
    const doc = DOCTORS.find(d => d.id === this.activeDoctorId) || DOCTORS[0];
    const user = window.CarePulseAuth ? CarePulseAuth.sessionUser : null;
    const rawPatientName = (user && user.name) ? user.name : 'Self (Demo Patient)';
    const patientName = rawPatientName.endsWith('(Demo)') ? rawPatientName : `${rawPatientName} (Demo)`;
    const safeName = escapeHtml(patientName);
    this.tokenRef ??= `#TK-TELE-${Math.floor(1000 + Math.random() * 9000)}`;

    const printWin = window.open('', '_blank', 'width=800,height=900');
    if (!printWin) {
      showToast('Please allow popups to download/print the demo prescription.', 'warning');
      return;
    }

    const safeDocName = escapeHtml(doc ? doc.name : 'Consultant Doctor');
    const safeDocSpec = escapeHtml(doc ? doc.specialty : 'General OPD');
    const safeDocReg = escapeHtml(doc?.regNo || 'Demo ID: CP-MED-101 (Sample Profile)');
    const safePhone = escapeHtml(DEMO_PHONE);
    const safeTokenRef = escapeHtml(this.tokenRef);

    const itemsHtml = this.prescriptions.map((m, i) => `
      <tr style="border-bottom: 1px solid #e2e8f0;">
        <td style="padding: 8px 12px; font-weight: 700;">${i + 1}. ${escapeHtml(m.name)}</td>
        <td style="padding: 8px 12px;">${escapeHtml(m.dosage)}</td>
        <td style="padding: 8px 12px;">${escapeHtml(m.duration)}</td>
      </tr>
    `).join('');

    printWin.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Prescription - CarePulse Hospital - ${safeName}</title>
        <style>
          body { font-family: system-ui, -apple-system, sans-serif; padding: 30px; color: #0f172a; line-height: 1.5; position: relative; }
          body::after {
            content: "DEMO - NOT A REAL APPOINTMENT OR REPORT";
            position: fixed;
            inset: 40% 0 auto;
            text-align: center;
            font: 800 24px system-ui, sans-serif;
            color: rgba(220, 38, 38, 0.18);
            transform: rotate(-18deg);
            pointer-events: none;
            z-index: 999;
          }
          .header { border-bottom: 3px solid #0d9488; padding-bottom: 16px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: flex-start; }
          .brand h1 { margin: 0; color: #0f172a; font-size: 24px; }
          .brand p { margin: 4px 0 0; color: #475569; font-size: 13px; }
          .doc-info { text-align: right; }
          .doc-info h3 { margin: 0; color: #0d9488; font-size: 18px; }
          .patient-box { background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 12px 16px; display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 13px; margin-bottom: 24px; }
          .rx-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px; }
          .rx-table th { background: #f1f5f9; padding: 10px 12px; text-align: left; border-bottom: 2px solid #cbd5e1; }
          .footer { border-top: 1px dashed #cbd5e1; padding-top: 20px; margin-top: 40px; display: flex; justify-content: space-between; align-items: flex-end; }
          .signature { text-align: right; }
          .sig-line { font-family: cursive; font-size: 22px; color: #0d9488; margin-bottom: 4px; }
          @media print { .no-print { display: none; } body { padding: 0; } }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="brand">
            <h1>🏥 CarePulse Multi-Specialty Hospital</h1>
            <p>Simulated CarePulse Campus, Sector 9 (Demo Facility), Phagwara, Punjab 144401</p>
            <p>Emergency & Trauma: 108 / 112 &bull; Demo Helpline: ${safePhone} &bull; Telehealth Prototype</p>
          </div>
          <div class="doc-info">
            <h3>${safeDocName}</h3>
            <p style="margin: 2px 0; font-size: 13px; font-weight: 600;">${safeDocSpec}</p>
            <p style="margin: 0; font-size: 12px; color: #64748b;">${safeDocReg}</p>
          </div>
        </div>

        <div class="patient-box">
          <div><strong>Patient Name:</strong> ${safeName}</div>
          <div><strong>Date:</strong> ${new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
          <div><strong>Consultation:</strong> Virtual Video Tele-Consult (Demo)</div>
          <div><strong>Token Ref:</strong> ${safeTokenRef}</div>
        </div>

        <div style="background: #fffbeb; border: 1px solid #fef3c7; border-radius: 6px; padding: 10px 14px; margin-bottom: 20px; font-size: 13px;">
          <strong>Sample Diagnosis:</strong> Acute Upper Respiratory Tract Infection (URTI) with mild pyrexia (Sample diagnosis only). Advised oral hydration and rest.
        </div>

        <h3 style="font-family: Georgia, serif; color: #0d9488; font-size: 20px; margin: 0 0 10px;">℞ Prescribed Medications (Sample)</h3>
        <table class="rx-table">
          <thead>
            <tr>
              <th>Medicine Name</th>
              <th>Dosage & Frequency</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>

        <div class="footer">
          <div style="font-size: 12px; color: #64748b;">
            <p style="margin: 0;">🔒 Simulated Demo Prescription Pad - Portfolio prototype simulation.</p>
            <p style="margin: 2px 0 0;">Not a real medical prescription or valid for dispensing.</p>
          </div>
          <div class="signature">
            <div class="sig-line">${safeDocName}</div>
            <div style="font-size: 12px; font-weight: 700; color: #0f172a;">${safeDocSpec}</div>
            <div style="font-size: 11px; color: #64748b;">${safeDocReg}</div>
          </div>
        </div>

        <div class="no-print" style="margin-top: 30px; text-align: center;">
          <button data-action="print-rx" style="background: #0d9488; color: white; border: none; padding: 10px 24px; font-size: 15px; font-weight: 700; border-radius: 6px; cursor: pointer;">
            🖨️ Print Prescription
          </button>
        </div>
      </body>
      </html>
    `);
    printWin.document.close();
    printWin.document.querySelector('[data-action="print-rx"]')
      ?.addEventListener('click', () => printWin.print());
  },

  orderPrescriptionPharmacy() {
    this.close();
    if (typeof openPharmacyModal === 'function') {
      openPharmacyModal();
      showToast('🛒 Prescribed medicines transferred to CarePulse 24/7 Pharmacy cart!', 'success');
    }
  },

  sharePrescriptionWhatsApp() {
    const doc = DOCTORS.find(d => d.id === this.activeDoctorId) || DOCTORS[0];
    const lines = [
      '*CarePulse Hospital Tele-Consultation Prescription (Demo)*',
      '⚠️ Sample prescription for demonstration only — not a valid medical prescription.',
      `*Doctor:* ${doc ? doc.name : 'Consultant'} (${doc ? doc.specialty : 'General OPD'})`,
      `*Demo ID:* ${doc?.regNo || 'CP-MED-101'}`,
      `*Date:* ${new Date().toLocaleDateString('en-GB')}`,
      '',
      '*Rx Medicines (Sample):*',
      ...this.prescriptions.map((m, i) => `${i + 1}. ${m.name} (${m.dosage} x ${m.duration})`),
      '',
      `*Demo Helpline:* ${DEMO_PHONE}`,
      '*Facility:* Simulated CarePulse Campus (Demo Facility), Phagwara'
    ];
    window.open(`https://wa.me/?text=${encodeURIComponent(lines.join('\n'))}`, '_blank', 'noopener');
  },

  endConsultation() {
    this.sessionId++;
    this.stopCameraStream();
    this.stopCallTimer();
    this.stopVitals();
    const v = document.getElementById('patient-webcam-video');
    const f = document.getElementById('patient-webcam-fallback');
    if (v) v.style.display = 'none';
    if (f) f.style.display = 'flex';
    showToast('✅ Demo consultation concluded. Sample prescription generated for preview.', 'success');
  }
};

window.TeleConsultEngine = TeleConsultEngine;
const openTeleConsultModal = window.openTeleConsultModal = function (docId) { TeleConsultEngine.open(docId); };
const closeTeleConsultModal = window.closeTeleConsultModal = function () { TeleConsultEngine.close(); };

// Ensure media tracks are terminated on page unload or visibility change
window.addEventListener('pagehide', () => {
  if (TeleConsultEngine.mediaStream) {
    TeleConsultEngine.stopCameraStream();
  }
});
document.addEventListener('visibilitychange', () => {
  if (document.hidden && TeleConsultEngine.mediaStream) {
    TeleConsultEngine.setCamera(false);
    showToast('Camera paused while tab was hidden. Tap 📹 to resume.', 'info');
  }
});

export {
  TeleConsultEngine,
  openTeleConsultModal,
  closeTeleConsultModal
};
