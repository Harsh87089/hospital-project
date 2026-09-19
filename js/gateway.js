// CarePulse Delivery Gateway Simulation Engine
import { showToast } from './utils.js';

const DeliveryGateway = {
  STORAGE_KEY: 'carepulse_delivery_gateway',

  config: {
    mode: 'auto', // 'real' | 'simulated' | 'auto'
    emailjsServiceId: '',
    emailjsTemplateId: '',
    emailjsPublicKey: '',
    firebaseApiKey: '',
    firebaseAuthDomain: '',
    firebaseProjectId: ''
  },

  init() {
    this.loadConfig();
    this.initEmailJS();
    this.initFirebase();
    this.updateUIBadge();
  },

  loadConfig() {
    try {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      if (saved) {
        this.config = { ...this.config, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn('Failed to load gateway config:', e);
    }
  },

  saveConfig(newConfig) {
    this.config = { ...this.config, ...newConfig };
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.config));
    } catch (e) { }
    this.initEmailJS();
    this.initFirebase();
    this.updateUIBadge();
  },

  isEmailConfigured() {
    return Boolean(this.config.emailjsPublicKey && this.config.emailjsServiceId && this.config.emailjsTemplateId);
  },

  isFirebaseConfigured() {
    return Boolean(this.config.firebaseApiKey && this.config.firebaseProjectId);
  },

  initEmailJS() {
    if (window.emailjs && this.config.emailjsPublicKey) {
      try {
        window.emailjs.init({ publicKey: this.config.emailjsPublicKey });
      } catch (e) {
        console.warn('EmailJS init warning:', e);
      }
    }
  },

  initFirebase() {
    if (window.firebase && this.config.firebaseApiKey && this.config.firebaseProjectId) {
      try {
        if (!firebase.apps || !firebase.apps.length) {
          firebase.initializeApp({
            apiKey: this.config.firebaseApiKey,
            authDomain: this.config.firebaseAuthDomain || `${this.config.firebaseProjectId}.firebaseapp.com`,
            projectId: this.config.firebaseProjectId
          });
        }
      } catch (e) {
        console.warn('Firebase init warning:', e);
      }
    }
  },

  selectMode(mode) {
    this.config.mode = mode;
    const cardReal = document.getElementById('mode-card-real');
    const cardDemo = document.getElementById('mode-card-demo');
    if (cardReal) cardReal.classList.toggle('active', mode === 'real');
    if (cardDemo) cardDemo.classList.toggle('active', mode === 'simulated');
  },

  saveFromForm() {
    const emailService = document.getElementById('cfg-emailjs-service')?.value.trim() || '';
    const emailTemplate = document.getElementById('cfg-emailjs-template')?.value.trim() || '';
    const emailPublic = document.getElementById('cfg-emailjs-public')?.value.trim() || '';
    const firebaseApi = document.getElementById('cfg-firebase-api')?.value.trim() || '';
    const firebaseProject = document.getElementById('cfg-firebase-project')?.value.trim() || '';
    const firebaseDomain = document.getElementById('cfg-firebase-domain')?.value.trim() || '';

    this.saveConfig({
      emailjsServiceId: emailService,
      emailjsTemplateId: emailTemplate,
      emailjsPublicKey: emailPublic,
      firebaseApiKey: firebaseApi,
      firebaseProjectId: firebaseProject,
      firebaseAuthDomain: firebaseDomain
    });

    closeDeliveryGatewayModal();
    showToast('Delivery Gateway configuration updated and active!', 'success');
  },

  populateForm() {
    const cardReal = document.getElementById('mode-card-real');
    const cardDemo = document.getElementById('mode-card-demo');
    if (cardReal) cardReal.classList.toggle('active', this.config.mode === 'real');
    if (cardDemo) cardDemo.classList.toggle('active', this.config.mode !== 'real');

    const setVal = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.value = val || '';
    };

    setVal('cfg-emailjs-service', this.config.emailjsServiceId);
    setVal('cfg-emailjs-template', this.config.emailjsTemplateId);
    setVal('cfg-emailjs-public', this.config.emailjsPublicKey);
    setVal('cfg-firebase-api', this.config.firebaseApiKey);
    setVal('cfg-firebase-project', this.config.firebaseProjectId);
    setVal('cfg-firebase-domain', this.config.firebaseAuthDomain);
  },

  updateUIBadge() {
    const isLive = this.config.mode === 'real' ||
      (this.config.mode === 'auto' && (this.isEmailConfigured() || this.isFirebaseConfigured()));

    document.querySelectorAll('.gateway-status-badge').forEach(badge => {
      badge.className = `gateway-status-badge ${isLive ? 'live' : 'demo'}`;
      if (isLive) {
        badge.innerHTML = '<span class="status-dot green"></span> Gateway: <strong>Live Real Delivery</strong>';
      } else {
        badge.innerHTML = '<span class="status-dot amber"></span> Gateway: <strong>Simulated Demo</strong>';
      }
    });
  },

  async dispatchOTP(otp, method, target, patientName) {
    const isEmail = method === 'google';
    const canSendRealEmail = isEmail && (this.config.mode === 'real' || this.config.mode === 'auto') && this.isEmailConfigured();
    const canSendRealSms = !isEmail && (this.config.mode === 'real' || this.config.mode === 'auto') && this.isFirebaseConfigured();

    if (canSendRealEmail) {
      await this.sendEmailJS(otp, target, patientName);
    } else if (canSendRealSms) {
      await this.sendFirebaseSMS(target, otp);
    } else {
      CarePulseAuth.triggerSimulatedNotification(otp, method, target);
      if (this.config.mode === 'real') {
        showToast(`Real delivery selected, but ${isEmail ? 'EmailJS' : 'Firebase'} credentials are empty. Showing demo code.`, 'warning');
      }
    }
  },

  async sendEmailJS(otp, email, patientName) {
    showToast(`📨 Sending real OTP email to ${email} via EmailJS...`, 'info');
    try {
      if (!window.emailjs) throw new Error('EmailJS library not loaded');
      this.initEmailJS();
      await window.emailjs.send(this.config.emailjsServiceId, this.config.emailjsTemplateId, {
        to_email: email,
        otp_code: otp,
        patient_name: patientName || 'Patient',
        hospital_name: 'CarePulse Hospital',
        valid_minutes: 5,
        year: new Date().getFullYear()
      });
      showToast(`✅ Real OTP email delivered to ${email}! Check your inbox/spam.`, 'success');
    } catch (err) {
      console.error('EmailJS error:', err);
      showToast(`EmailJS failed (${err.text || err.message}). Showing backup code on screen.`, 'warning');
      CarePulseAuth.triggerSimulatedNotification(otp, 'google', email);
    }
  },

  async sendFirebaseSMS(phone, fallbackOtp) {
    const rawDigits = phone.replace(/\D/g, '').slice(-10);
    const formatted = '+91' + rawDigits;
    showToast(`📱 Contacting Google Firebase SMS Gateway for ${formatted}...`, 'info');

    try {
      if (!window.firebase || !firebase.auth) throw new Error('Firebase SDK not loaded');
      this.initFirebase();

      const recaptchaEl = document.getElementById('recaptcha-container');
      if (!recaptchaEl) throw new Error('reCAPTCHA container missing');

      if (!window.carepulseRecaptchaVerifier) {
        window.carepulseRecaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
          size: 'invisible'
        });
      }

      const confirmation = await firebase.auth().signInWithPhoneNumber(formatted, window.carepulseRecaptchaVerifier);
      window.carepulseConfirmationResult = confirmation;
      showToast(`✅ Real cellular SMS dispatched to ${formatted}!`, 'success');
    } catch (err) {
      console.error('Firebase SMS error:', err);
      showToast(`Firebase error (${err.message}). Showing backup code on screen.`, 'warning');
      CarePulseAuth.triggerSimulatedNotification(fallbackOtp, 'mobile', phone);
    }
  },

  async testDispatchCurrent() {
    const method = CarePulseAuth.activeMethod || 'mobile';
    let target = '';
    if (method === 'mobile') {
      const phoneInput = document.getElementById('auth-mobile-input');
      target = phoneInput ? phoneInput.value.trim() : '9876543210';
      if (!target) target = '9876543210';
    } else {
      const emailInput = document.getElementById('auth-google-email');
      target = emailInput ? emailInput.value.trim() : 'user@gmail.com';
      if (!target) target = 'user@gmail.com';
    }

    const testOtp = Math.floor(100000 + Math.random() * 900000).toString();
    showToast(`Testing ${method === 'google' ? 'Email' : 'SMS'} dispatch to ${target}...`, 'info');
    await this.dispatchOTP(testOtp, method, target, 'Test User');
  }
};

window.DeliveryGateway = DeliveryGateway;

window.openDeliveryGatewayModal = function () {
  DeliveryGateway.populateForm();
  const modal = document.getElementById('delivery-gateway-modal');
  if (modal) modal.style.display = 'flex';
};

window.closeDeliveryGatewayModal = function () {
  const modal = document.getElementById('delivery-gateway-modal');
  if (modal) modal.style.display = 'none';
};

// Backwards compatibility alias
window.openSMSGatewayInfoModal = window.openDeliveryGatewayModal;
window.closeSMSGatewayInfoModal = window.closeDeliveryGatewayModal;

/* ==========================================================================
   19. COMPETITION WINNING ENGINES:
   A. PublicAddressEngine (Audible PA Token Callout & Speech Synthesis)
   B. VoiceAIEngine (Trilingual Voice Search, Booking & Intent Parser)
   ========================================================================== */



export {
  DeliveryGateway,
  openDeliveryGatewayModal,
  closeDeliveryGatewayModal,
  openSMSGatewayInfoModal,
  closeSMSGatewayInfoModal
};
