// CarePulse Tele-Consultation & Virtual Prescription Engine
import { DEMO_PHONE, DEMO_WHATSAPP, DOCTORS } from './config.js';
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
    { name: 'Syp. Grilinctus 10 ml', dosage: '0-0-1 (At Bedtime)', duration: '5 Days' }
  ],

  open(doctorId = null) {
    if (doctorId) {
      this.activeDoctorId = doctorId;
    } else if (!this.activeDoctorId) {
      this.activeDoctorId = (DOCTORS[0] && DOCTORS[0].id) || 'doc-gp-1';
    }

    const doc = DOCTORS.find(d => d.id === this.activeDoctorId) || DOCTORS[0];
    const modal = document.getElementById('tele-consult-modal');
    if (!modal) return;

    // Populate Doctor Data
    const badgeName = document.getElementById('tele-doc-badge-name');
    const badgeSpec = document.getElementById('tele-doc-badge-spec');
    const screenName = document.getElementById('tele-doc-screen-name');
    const screenDesc = document.getElementById('tele-doc-screen-desc');
    const docAvatar = document.getElementById('tele-doc-avatar');
    const rxDocName = document.getElementById('rx-header-doc-name');
    const rxDocReg = document.getElementById('rx-header-doc-reg');
    const rxSigName = document.getElementById('rx-sig-name');

    if (badgeName) badgeName.innerText = doc.name;
    if (badgeSpec) badgeSpec.innerText = `${doc.specialty} • ${doc.regNo || 'Demo Faculty'}`;
    if (screenName) screenName.innerText = doc.name;
    if (screenDesc) screenDesc.innerText = `${doc.qualifications} • Live Tele-Consultation`;
    if (docAvatar && doc.avatar) docAvatar.src = doc.avatar;
    if (rxDocName) rxDocName.innerText = doc.name;
    if (rxDocReg) rxDocReg.innerText = `${doc.qualifications} • ${doc.regNo || 'Faculty ID: CP-MED-101'}`;
    if (rxSigName) rxSigName.innerText = doc.name;

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
    this.initCameraStream();

    showToast(`📹 Connected to Dr. ${doc.name.split(' ').pop()}'s Virtual Consultation Room`, 'success');
  },

  close() {
    this.stopCameraStream();
    this.stopCallTimer();
    const modal = document.getElementById('tele-consult-modal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  },

  initCameraStream() {
    const videoEl = document.getElementById('patient-webcam-video');
    const fallbackEl = document.getElementById('patient-webcam-fallback');

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
          this.mediaStream = stream;
          if (videoEl) {
            videoEl.srcObject = stream;
            videoEl.style.display = 'block';
          }
          if (fallbackEl) fallbackEl.style.display = 'none';
        })
        .catch(err => {
          console.warn('Webcam permission denied or unavailable, using simulation:', err);
          if (videoEl) videoEl.style.display = 'none';
          if (fallbackEl) fallbackEl.style.display = 'flex';
        });
    } else {
      if (videoEl) videoEl.style.display = 'none';
      if (fallbackEl) fallbackEl.style.display = 'flex';
    }
  },

  stopCameraStream() {
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(track => track.stop());
      this.mediaStream = null;
    }
    const videoEl = document.getElementById('patient-webcam-video');
    if (videoEl) videoEl.srcObject = null;
  },

  toggleMic() {
    this.isMicMuted = !this.isMicMuted;
    if (this.mediaStream) {
      this.mediaStream.getAudioTracks().forEach(t => t.enabled = !this.isMicMuted);
    }
    const btn = document.getElementById('btn-tele-mic');
    if (btn) {
      btn.innerHTML = this.isMicMuted ? '🔇' : '🎙️';
      btn.classList.toggle('off', this.isMicMuted);
      btn.title = this.isMicMuted ? 'Unmute Microphone' : 'Mute Microphone';
    }
    showToast(this.isMicMuted ? 'Microphone muted' : 'Microphone unmuted', 'info');
  },

  toggleCamera() {
    this.isCamOff = !this.isCamOff;
    if (this.mediaStream) {
      this.mediaStream.getVideoTracks().forEach(t => t.enabled = !this.isCamOff);
    }
    const btn = document.getElementById('btn-tele-cam');
    const videoEl = document.getElementById('patient-webcam-video');
    const fallbackEl = document.getElementById('patient-webcam-fallback');

    if (btn) {
      btn.innerHTML = this.isCamOff ? '🚫' : '📹';
      btn.classList.toggle('off', this.isCamOff);
      btn.title = this.isCamOff ? 'Turn Camera On' : 'Turn Camera Off';
    }
    if (this.isCamOff) {
      if (videoEl) videoEl.style.display = 'none';
      if (fallbackEl) fallbackEl.style.display = 'flex';
      showToast('Camera stream disabled', 'info');
    } else {
      if (this.mediaStream && videoEl) {
        videoEl.style.display = 'block';
        if (fallbackEl) fallbackEl.style.display = 'none';
      }
      showToast('Camera stream enabled', 'info');
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
    if (this.vitalsInterval) clearInterval(this.vitalsInterval);
    this.vitalsInterval = null;
  },

  startVitalsSimulation() {
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

  simulateVitalsSpike() {
    const hrEl = document.getElementById('tele-vital-hr');
    const spo2El = document.getElementById('tele-vital-spo2');
    this.currentVitals.hr = 88;
    this.currentVitals.spo2 = 99;
    if (hrEl) hrEl.innerText = `88 BPM (Pulsing)`;
    if (spo2El) spo2El.innerText = `SpO2 99%`;
    showToast('🩺 Live clinical vitals checked: Heart Rate 88 BPM, SpO2 99%, Normal Sinus Rhythm', 'success');
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
    const [name, dosage, duration] = select.value.split('|');
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
    const patientName = (user && user.name) ? user.name : 'Self (Demo Patient)';

    const printWin = window.open('', '_blank', 'width=800,height=900');
    if (!printWin) {
      alert('Please allow popups to download/print the demo prescription.');
      return;
    }

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
        <title>Prescription - CarePulse Hospital - ${patientName}</title>
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
            <p>GT Road, Near Sugar Mill Crossing, Phagwara, Punjab 144401</p>
            <p>Emergency & Trauma: 108 / 112 &bull; Demo Helpline: ${DEMO_PHONE} &bull; Telehealth Prototype</p>
          </div>
          <div class="doc-info">
            <h3>${escapeHtml(doc.name)}</h3>
            <p style="margin: 2px 0; font-size: 13px; font-weight: 600;">${escapeHtml(doc.specialty)}</p>
            <p style="margin: 0; font-size: 12px; color: #64748b;">${escapeHtml(doc.regNo || 'Faculty ID: CP-MED-101')}</p>
          </div>
        </div>

        <div class="patient-box">
          <div><strong>Patient Name:</strong> ${escapeHtml(patientName)}</div>
          <div><strong>Date:</strong> ${new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
          <div><strong>Consultation:</strong> Virtual Video Tele-Consult</div>
          <div><strong>Token Ref:</strong> #TK-TELE-${Math.floor(1000 + Math.random() * 9000)}</div>
        </div>

        <div style="background: #fffbeb; border: 1px solid #fef3c7; border-radius: 6px; padding: 10px 14px; margin-bottom: 20px; font-size: 13px;">
          <strong>Clinical Diagnosis:</strong> Acute Upper Respiratory Tract Infection (URTI) with mild pyrexia. Advised oral hydration and rest.
        </div>

        <h3 style="font-family: Georgia, serif; color: #0d9488; font-size: 20px; margin: 0 0 10px;">℞ Prescribed Medications</h3>
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
            <div class="sig-line">${escapeHtml(doc.name)}</div>
            <div style="font-size: 12px; font-weight: 700; color: #0f172a;">${escapeHtml(doc.name)}</div>
            <div style="font-size: 11px; color: #64748b;">Faculty ID: ${escapeHtml(doc.regNo || 'CP-MED-101')}</div>
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
    const medList = this.prescriptions.map((m, i) => `${i + 1}. ${m.name} (${m.dosage} x ${m.duration})`).join('%0A');
    const text = `*CarePulse Hospital Tele-Consultation Prescription (Demo)*%0A*Doctor:* ${doc.name} (${doc.specialty})%0A*Faculty ID:* ${doc.regNo || 'CP-MED-101'}%0A*Date:* ${new Date().toLocaleDateString('en-GB')}%0A%0A*Rx Medicines:*%0A${medList}%0A%0A*Demo Helpline:* ${DEMO_PHONE}%0A*Address:* GT Road, Phagwara, Punjab`;
    window.open(`https://wa.me/?text=${text}`, '_blank');
  },

  endConsultation() {
    const doc = DOCTORS.find(d => d.id === this.activeDoctorId) || DOCTORS[0];
    this.stopCameraStream();
    this.stopCallTimer();
    showToast(`✅ Video consultation with ${doc.name} completed successfully. Please review or download your prescription.`, 'success');
  }
};

window.TeleConsultEngine = TeleConsultEngine;
const openTeleConsultModal = window.openTeleConsultModal = function (docId) { TeleConsultEngine.open(docId); };
const closeTeleConsultModal = window.closeTeleConsultModal = function () { TeleConsultEngine.close(); };

// ==========================================================================
// 21. CampusWayfinderEngine (Indoor GPS & Multi-Floor Navigation)
// ==========================================================================


export {
  TeleConsultEngine,
  openTeleConsultModal,
  closeTeleConsultModal
};
