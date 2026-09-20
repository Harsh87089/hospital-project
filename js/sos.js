// CarePulse Emergency Casualty & SOS Engine
import { DEMO_PHONE, DEMO_WHATSAPP } from './config.js';
import { showToast } from './utils.js';

const openEmergencyModal = window.openEmergencyModal = function () {
  const modal = document.getElementById('emergency-modal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
};

const closeEmergencyModal = window.closeEmergencyModal = function () {
  const modal = document.getElementById('emergency-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
};

// --- Close Modals on Backdrop Click or Escape Key ---


const EmergencySOSEngine = {
  active: false,
  timerInterval: null,
  secondsRemaining: 405, // 6 mins 45 secs for demo mode
  audioCtx: null,
  userCoords: null,

  playSirenBeep() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      this.audioCtx = ctx;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';

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
    this.openEmergencyHub();
  },

  openEmergencyHub() {
    this.active = true;
    const modal = document.getElementById('emergency-sos-modal');
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
    this.detectGPSLocation();
  },

  detectGPSLocation() {
    const locEl = document.getElementById('sos-location-text');
    if (!locEl) return;
    locEl.innerHTML = '🔄 Detecting live GPS coordinates...';

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          const lat = pos.coords.latitude.toFixed(5);
          const lng = pos.coords.longitude.toFixed(5);
          this.userCoords = { lat, lng };
          locEl.innerHTML = `📍 <strong>Detected GPS:</strong> ${lat}° N, ${lng}° E • <a href="https://www.google.com/maps?q=${lat},${lng}" target="_blank" rel="noopener" style="color: #2563eb; text-decoration: underline; font-weight: 600;">Open Map ↗</a>`;
        },
        err => {
          console.warn('Geolocation error:', err);
          locEl.innerHTML = `📍 <strong>Hospital Campus:</strong> GT Road, Near Sugar Mill Crossing, Phagwara, Punjab - 144401`;
        },
        { timeout: 10000, enableHighAccuracy: true }
      );
    } else {
      locEl.innerHTML = `📍 <strong>Hospital Campus:</strong> GT Road, Near Sugar Mill Crossing, Phagwara, Punjab - 144401`;
    }
  },

  copyCoordinatesFor108() {
    const text = this.userCoords
      ? `Patient Emergency at GPS: ${this.userCoords.lat}, ${this.userCoords.lng}. CarePulse GT Road Phagwara Demo Desk: ${DEMO_PHONE}.`
      : `Patient Emergency at GT Road, Near Sugar Mill Crossing, Phagwara, Punjab. Demo Desk: ${DEMO_PHONE}.`;
    navigator.clipboard.writeText(text);
    showToast('Emergency location copied! Read to 108 emergency operator.', 'success');
  },

  shareEmergencyWhatsApp() {
    const coordsStr = this.userCoords ? `https://www.google.com/maps?q=${this.userCoords.lat},${this.userCoords.lng}` : 'GT Road, Near Sugar Mill Crossing, Phagwara, Punjab';
    const text = encodeURIComponent(`🚨 EMERGENCY MEDICAL ALERT: Immediate ambulance assistance required!\nLocation: ${coordsStr}\nCarePulse Demo Helpline: ${DEMO_PHONE}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  },

  toggleSimulationDemo() {
    const demoCard = document.getElementById('sos-demo-simulation-card');
    if (!demoCard) return;
    const isHidden = demoCard.style.display === 'none' || !demoCard.style.display;
    demoCard.style.display = isHidden ? 'block' : 'none';
    if (isHidden) {
      this.playSirenBeep();
      this.startCountdown();
      showToast('⚠️ DEMO SIMULATION: Testing interface preview only (No vehicle dispatched)', 'warning');
    } else {
      if (this.timerInterval) clearInterval(this.timerInterval);
    }
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
    showToast(`Emergency desk dialog closed. Demo helpline is ${DEMO_PHONE}. (For real emergency, dial 108)`, 'info');
  }
};

window.EmergencySOSEngine = EmergencySOSEngine;
const triggerEmergencySOS = window.triggerEmergencySOS = () => EmergencySOSEngine.openEmergencyHub();
const closeEmergencySOS = window.closeEmergencySOS = () => EmergencySOSEngine.cancelSOS();

// --- 5. Clinical Health Risk & BMI / Vitals Calculator ---


export {
  openEmergencyModal,
  closeEmergencyModal,
  EmergencySOSEngine,
  triggerEmergencySOS,
  closeEmergencySOS
};
