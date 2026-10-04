// CarePulse Authentication Gate Engine
import { DEMO_STAFF_PIN, state, FIREBASE_CONFIG } from './config.js';
import { escapeHtml, showToast } from './utils.js';

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
  firebaseInitialized: false,

  init() {
    // Clear persistent localStorage to guarantee user is logged out whenever site is closed or removed
    try {
      localStorage.removeItem('carepulse_auth_user');
    } catch (e) { }

    this.checkStoredSession();
    this.setupInactivityWatchdog();
    this.initFirebase();
    if (typeof DeliveryGateway !== 'undefined' && DeliveryGateway.init) {
      DeliveryGateway.init();
    }
  },

  ensureFirebaseLoaded() {
    return new Promise((resolve, reject) => {
      if (window.firebase && window.firebase.auth) {
        if (!firebase.apps || !firebase.apps.length) {
          firebase.initializeApp(FIREBASE_CONFIG);
        }
        return resolve(window.firebase);
      }
      const s1 = document.createElement('script');
      s1.src = 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js';
      s1.crossOrigin = 'anonymous';
      s1.onload = () => {
        const s2 = document.createElement('script');
        s2.src = 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth-compat.js';
        s2.crossOrigin = 'anonymous';
        s2.onload = () => {
          try {
            if (!firebase.apps || !firebase.apps.length) {
              firebase.initializeApp(FIREBASE_CONFIG);
            }
            resolve(window.firebase);
          } catch (err) {
            resolve(window.firebase);
          }
        };
        s2.onerror = reject;
        document.head.appendChild(s2);
      };
      s1.onerror = reject;
      document.head.appendChild(s1);
    });
  },

  async initFirebase() {
    try {
      await this.ensureFirebaseLoaded();
      if (window.firebase && firebase.auth) {
        this.firebaseInitialized = true;
        firebase.auth().onAuthStateChanged((fbUser) => {
          if (fbUser) {
            this.handleFirebaseUser(fbUser);
          }
        });
      }
    } catch (e) {
      console.warn('Firebase lazy-load deferred:', e);
    }
  },

  handleFirebaseUser(fbUser) {
    const displayName = fbUser.displayName || (fbUser.email ? fbUser.email.split('@')[0] : 'Patient');
    const initials = displayName.split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase() || 'PT';
    this.sessionUser = {
      name: displayName,
      email: fbUser.email || '',
      phone: fbUser.phoneNumber || '',
      contact: fbUser.email || fbUser.phoneNumber || 'Verified Patient',
      photoURL: fbUser.photoURL || '',
      uid: fbUser.uid,
      method: fbUser.phoneNumber ? 'mobile' : 'google',
      initials: initials,
      uhid: 'CP-' + (fbUser.uid ? fbUser.uid.slice(0, 5).toUpperCase() : Math.floor(10000 + Math.random() * 90000)),
      loginTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      loginDate: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    };
    try {
      sessionStorage.setItem('carepulse_auth_user', JSON.stringify(this.sessionUser));
    } catch (e) { }
    this.updateProfileUI();
    this.autoFillPatientForms();
  },

  autoFillPatientForms() {
    if (!this.sessionUser) return;
    const name = this.sessionUser.name;
    const phone = this.sessionUser.phone ? this.sessionUser.phone.replace('+91', '').trim() : '';

    const layerName = document.getElementById('layer-patient-name');
    if (layerName && !layerName.value && name && name !== 'Patient' && name !== 'Guest Patient') {
      layerName.value = name;
    }
    const inlineName = document.getElementById('patient-name');
    if (inlineName && !inlineName.value && name && name !== 'Patient' && name !== 'Guest Patient') {
      inlineName.value = name;
    }

    if (phone) {
      const layerPhone = document.getElementById('layer-patient-phone');
      if (layerPhone && !layerPhone.value) layerPhone.value = phone;
      const inlinePhone = document.getElementById('patient-phone');
      if (inlinePhone && !inlinePhone.value) inlinePhone.value = phone;
    }
  },

  async signInWithGoogle() {
    this.clearError();
    const btn = document.getElementById('btn-google-signin');
    const originalText = btn ? btn.innerHTML : '';
    try {
      if (btn) {
        btn.innerHTML = '<span>⏳ Connecting to Google...</span>';
        btn.disabled = true;
      }
      showToast('Opening secure Google Sign-In...', 'info');
      await this.ensureFirebaseLoaded();
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      const result = await firebase.auth().signInWithPopup(provider);
      const fbUser = result.user;
      this.handleFirebaseUser(fbUser);
      this.closeModal();
      showToast(`Welcome to CarePulse Hospital, ${fbUser.displayName || 'Patient'}!`, 'success');
      if (typeof this.postAuthCallback === 'function') {
        const cb = this.postAuthCallback;
        this.postAuthCallback = null;
        try { cb(this.sessionUser); } catch (e) { console.error('Post-auth callback error:', e); }
      }
    } catch (err) {
      console.error('Google Sign-In Error:', err);
      if (btn) {
        btn.innerHTML = originalText;
        btn.disabled = false;
      }
      if (err.code === 'auth/popup-closed-by-user') {
        this.showError('Google sign-in was closed before completing. Please try again.');
      } else if (err.code === 'auth/unauthorized-domain') {
        this.showError('Domain authorization pending: please add "hospital-project-tawny.vercel.app" in Firebase Console > Authentication > Settings > Authorized domains.');
      } else {
        this.showError(`Google Sign-In: ${err.message}`);
      }
    }
  },

  async sendPhoneOTP() {
    this.clearError();
    const phoneInput = document.getElementById('auth-mobile-phone-input');
    const rawPhone = phoneInput ? phoneInput.value.trim() : '';
    const phone = rawPhone.replace(/\D/g, '');
    if (!/^[6-9]\d{9}$/.test(phone)) {
      this.showError('Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.');
      if (phoneInput) phoneInput.focus();
      return;
    }
    const sendBtn = document.getElementById('btn-send-phone-otp');
    const originalText = sendBtn ? sendBtn.innerHTML : '';
    try {
      if (sendBtn) {
        sendBtn.innerHTML = '<span>⏳ Contacting SMS gateway...</span>';
        sendBtn.disabled = true;
      }
      await this.ensureFirebaseLoaded();
      if (!window.carepulseRecaptchaVerifier) {
        window.carepulseRecaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-auth-container', {
          size: 'invisible'
        });
      }
      const formatted = '+91' + phone;
      const confirmation = await firebase.auth().signInWithPhoneNumber(formatted, window.carepulseRecaptchaVerifier);
      window.carepulseConfirmationResult = confirmation;
      this.targetContact = formatted;
      const targetEl = document.getElementById('auth-phone-target');
      if (targetEl) targetEl.innerText = formatted;
      const step1 = document.getElementById('auth-phone-step');
      const step2 = document.getElementById('auth-verify-step');
      if (step1) step1.style.display = 'none';
      if (step2) step2.style.display = 'block';
      showToast(`SMS OTP sent to ${formatted}!`, 'info');
      const otpInput = document.getElementById('auth-otp-input');
      if (otpInput) {
        otpInput.value = '';
        otpInput.focus();
      }
    } catch (err) {
      console.error('Firebase Phone Auth Error:', err);
      if (sendBtn) {
        sendBtn.innerHTML = originalText;
        sendBtn.disabled = false;
      }
      this.showError(`SMS Error: ${err.message}`);
    }
  },

  async confirmPhoneOTP() {
    this.clearError();
    const otpInput = document.getElementById('auth-otp-input');
    const code = otpInput ? otpInput.value.trim() : '';
    if (!/^\d{6}$/.test(code)) {
      this.showError('Please enter all 6 numeric digits of the OTP.');
      if (otpInput) otpInput.focus();
      return;
    }
    const confirmBtn = document.getElementById('btn-confirm-phone-otp');
    const originalText = confirmBtn ? confirmBtn.innerHTML : '';
    try {
      if (confirmBtn) {
        confirmBtn.innerHTML = '<span>⏳ Verifying OTP...</span>';
        confirmBtn.disabled = true;
      }
      if (!window.carepulseConfirmationResult) {
        throw new Error('No active verification session. Please request OTP again.');
      }
      const result = await window.carepulseConfirmationResult.confirm(code);
      window.carepulseConfirmationResult = null;
      const fbUser = result.user;
      this.handleFirebaseUser(fbUser);
      this.closeModal();
      showToast('Phone verified successfully! Welcome to CarePulse.', 'success');
      if (typeof this.postAuthCallback === 'function') {
        const cb = this.postAuthCallback;
        this.postAuthCallback = null;
        try { cb(this.sessionUser); } catch (e) { console.error('Post-auth callback error:', e); }
      }
    } catch (err) {
      console.error('OTP confirmation error:', err);
      if (confirmBtn) {
        confirmBtn.innerHTML = originalText;
        confirmBtn.disabled = false;
      }
      this.showError(`Verification failed: ${err.message}`);
    }
  },

  backToPhoneInput() {
    this.clearError();
    const step1 = document.getElementById('auth-phone-step');
    const step2 = document.getElementById('auth-verify-step');
    if (step1) step1.style.display = 'block';
    if (step2) step2.style.display = 'none';
  },

  continueAsGuest() {
    this.sessionUser = {
      name: 'Guest Patient',
      contact: 'Walk-in / Guest',
      method: 'guest',
      initials: 'GP',
      uhid: 'CP-' + Math.floor(10000 + Math.random() * 90000),
      loginTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      loginDate: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    };
    try {
      sessionStorage.setItem('carepulse_auth_user', JSON.stringify(this.sessionUser));
    } catch (e) { }
    this.closeModal();
    this.updateProfileUI();
    showToast('Continuing as Guest Patient for this booking.', 'info');
    if (typeof this.postAuthCallback === 'function') {
      const cb = this.postAuthCallback;
      this.postAuthCallback = null;
      try { cb(this.sessionUser); } catch (e) { console.error('Post-auth callback error:', e); }
    }
  },

  postAuthCallback: null,

  checkStoredSession() {
    try {
      const stored = sessionStorage.getItem('carepulse_auth_user') || localStorage.getItem('carepulse_auth_user');
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
    this.unlockPortal();
    this.updateProfileUI();
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
    // Demo login portal is removed; visitors browse freely
  },

  openModal(postAuthAction = null) {
    this.postAuthCallback = postAuthAction;
    this.clearError();
    this.backToPhoneInput();
    const modal = document.getElementById('auth-gate-modal');
    if (modal) {
      modal.style.display = 'flex';
      modal.classList.add('active');
      document.body.classList.add('modal-open');
    } else if (typeof postAuthAction === 'function') {
      postAuthAction(this.sessionUser);
      this.postAuthCallback = null;
    }
  },

  closeModal() {
    const modal = document.getElementById('auth-gate-modal');
    if (modal) {
      modal.style.display = 'none';
      modal.classList.remove('active');
      document.body.classList.remove('modal-open');
    }
    document.body.classList.remove('auth-locked');
    this.postAuthCallback = null;
    this.clearError();
  },

  requireAuth(callback) {
    if (this.sessionUser) {
      if (typeof callback === 'function') callback(this.sessionUser);
    } else {
      this.openModal(callback);
    }
  },

  unlockPortal() {
    document.body.classList.remove('auth-locked');
    document.body.classList.remove('auth-modal-open');
    const modal = document.getElementById('auth-gate-modal');
    if (modal) {
      modal.style.display = 'none';
      modal.classList.remove('active');
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
      const rawPhone = phoneInput ? phoneInput.value.trim() : '';
      let phone = rawPhone.replace(/\D/g, '');
      if (phone.startsWith('91') && phone.length === 12) phone = phone.slice(2);
      else if (phone.startsWith('0') && phone.length === 11) phone = phone.slice(1);

      const rawName = nameInput ? nameInput.value.trim() : '';
      if (rawName && !/^[A-Za-z\s.]{2,50}$/.test(rawName)) {
        this.showError('Patient name must contain only letters, spaces, or dots (2-50 characters).');
        if (nameInput) {
          nameInput.classList.add('input-error');
          nameInput.focus();
        }
        return;
      }

      if (!/^[6-9]\d{9}$/.test(phone)) {
        this.showError('Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.');
        if (phoneInput) {
          phoneInput.classList.add('input-error');
          phoneInput.focus();
        }
        return;
      }
      this.targetContact = '+91 ' + phone;
      this.userName = rawName || 'Patient';
      this.otpMethod = 'mobile';
    } else {
      const emailInput = document.getElementById('auth-google-email');
      const nameInput = document.getElementById('auth-google-name');
      const email = emailInput ? emailInput.value.trim() : '';
      let name = nameInput && nameInput.value.trim() ? nameInput.value.trim() : '';

      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        this.showError('Please enter or select a valid Google / Gmail address.');
        if (emailInput) {
          emailInput.classList.add('input-error');
          emailInput.focus();
        }
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
    if (typeof DeliveryGateway !== 'undefined' && DeliveryGateway.dispatchOTP) {
      DeliveryGateway.dispatchOTP(otp, this.otpMethod, this.targetContact, this.userName);
    } else {
      this.triggerSimulatedNotification(otp, this.otpMethod, this.targetContact);
    }
    this.startResendTimer();
  },

  resendOTP() {
    const otp = this.generateDynamicOTP();
    this.clearOTPInputs();
    this.clearError();
    if (typeof DeliveryGateway !== 'undefined' && DeliveryGateway.dispatchOTP) {
      DeliveryGateway.dispatchOTP(otp, this.otpMethod, this.targetContact, this.userName);
    } else {
      this.triggerSimulatedNotification(otp, this.otpMethod, this.targetContact);
    }
    this.startResendTimer();
    showToast(`New verification OTP requested for ${this.targetContact}!`, 'info');
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
            <span class="demo-simulated-tag" style="background: #fef08a; color: #854d0e; font-size: 0.68rem; font-weight: 700; padding: 2px 6px; border-radius: 4px; margin-left: 6px;">DEMO – no SMS/email was actually sent</span>
          </div>
          <button type="button" class="simulated-close-btn" data-action="dismiss-simulated-banner">&times;</button>
        </div>
        <div class="simulated-banner-body">
          <div class="simulated-sender">CarePulse SMS Gateway &bull; <span>TD-CAREPL</span></div>
          <p class="simulated-msg">
            Your login verification OTP is <strong class="highlight-otp">${otp}</strong>. Valid for 5 minutes. Do not share with anyone.
          </p>
        </div>
        <div class="simulated-banner-actions">
          <button type="button" class="btn-autofill-otp" data-action="autofill-otp" data-otp="${otp}">
            📋 Auto-Fill OTP (${otp})
          </button>
          <button type="button" class="btn-copy-otp" data-action="copy-otp" data-otp="${otp}">
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
            <span class="demo-simulated-tag" style="background: #fef08a; color: #854d0e; font-size: 0.68rem; font-weight: 700; padding: 2px 6px; border-radius: 4px; margin-left: 6px;">DEMO – no SMS/email was actually sent</span>
          </div>
          <button type="button" class="simulated-close-btn" data-action="dismiss-simulated-banner">&times;</button>
        </div>
        <div class="simulated-banner-body">
          <div class="simulated-sender">CarePulse Security &bull; <span>security@carepulse.org</span></div>
          <p class="simulated-msg">
            Google Security Code: <strong class="highlight-otp">${otp}</strong> for account <em>${escapeHtml(target)}</em> login.
          </p>
        </div>
        <div class="simulated-banner-actions">
          <button type="button" class="btn-autofill-otp" data-action="autofill-otp" data-otp="${otp}">
            📋 Auto-Fill OTP (${otp})
          </button>
          <button type="button" class="btn-copy-otp" data-action="copy-otp" data-otp="${otp}">
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

  async verifyOTP() {
    const entered = this.getEnteredOTP();
    if (entered.length !== 6 || !/^\d{6}$/.test(entered)) {
      this.showError('Please enter all 6 numeric digits of the OTP.');
      this.shakeCard();
      return;
    }

    // If real Firebase confirmation exists and real delivery was active
    if (window.carepulseConfirmationResult && typeof DeliveryGateway !== 'undefined' && DeliveryGateway.config.mode === 'real') {
      try {
        showToast('Verifying code with Google Firebase...', 'info');
        await window.carepulseConfirmationResult.confirm(entered);
        window.carepulseConfirmationResult = null;
        showToast('Mobile verified via Google Firebase!', 'success');
      } catch (err) {
        console.error('Firebase verification failed:', err);
        this.showError('Invalid OTP code. Please check your SMS message and re-enter.');
        this.shakeCard();
        return;
      }
    } else {
      if (entered !== this.currentOTP) {
        this.showError('Incorrect OTP! Please check the code received or request a new OTP.');
        this.shakeCard();
        return;
      }
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
      if (typeof this.postAuthCallback === 'function') {
        const cb = this.postAuthCallback;
        this.postAuthCallback = null;
        try { cb(user); } catch (e) { console.error('Post-auth callback error:', e); }
      }
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
    this.sessionUser = null;
    this.closeModal();
    this.updateProfileUI();
    showToast(customMessage || 'You have signed out successfully.', 'info');
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
    const user = this.sessionUser;

    // Desktop navbar auth status button
    const deskBtn = document.getElementById('btn-desktop-auth-action');
    if (deskBtn) {
      if (user && user.method !== 'guest') {
        const shortName = escapeHtml(user.name.split(' ')[0]);
        deskBtn.innerHTML = `<span>👤 ${shortName}</span> <span style="font-size:0.75rem; opacity:0.8; margin-left:4px;">(Sign Out)</span>`;
        deskBtn.title = `Signed in as ${user.name} (${user.contact}). Click to sign out.`;
      } else {
        deskBtn.innerHTML = `<span>🔐 Patient Sign In</span>`;
        deskBtn.title = 'Sign in with Google or Phone';
      }
    }

    // Mobile navbar auth status button
    const mobBtn = document.getElementById('btn-mobile-auth-action');
    if (mobBtn) {
      if (user && user.method !== 'guest') {
        mobBtn.innerHTML = `<span>🚪 Sign Out</span>`;
      } else {
        mobBtn.innerHTML = `<span>🔐 Sign In</span>`;
      }
    }

    const defaultUser = user || {
      name: 'Patient Session',
      contact: 'Authorized Patient',
      uhid: 'CP-98214',
      initials: 'PT',
      method: 'simulated'
    };

    const nameEls = document.querySelectorAll('.user-display-name');
    nameEls.forEach(el => el.innerText = user ? user.name : 'Welcome, Patient');

    const contactEls = document.querySelectorAll('.user-display-contact');
    contactEls.forEach(el => el.innerText = defaultUser.contact);

    const uhidEls = document.querySelectorAll('.user-display-uhid');
    uhidEls.forEach(el => el.innerText = defaultUser.uhid);

    const avatarEls = document.querySelectorAll('.user-display-avatar');
    avatarEls.forEach(el => {
      if (defaultUser.photoURL) {
        el.innerHTML = `<img src="${defaultUser.photoURL}" alt="${escapeHtml(defaultUser.name)}" style="width:24px;height:24px;border-radius:50%;object-fit:cover;">`;
      } else if (defaultUser.method === 'google') {
        el.innerHTML = `<span style="font-size: 1.1rem;">🌐</span>`;
      } else {
        el.innerText = defaultUser.initials || 'PT';
      }
    });

    const badgeEls = document.querySelectorAll('.user-auth-badge');
    badgeEls.forEach(el => {
      el.innerText = defaultUser.method === 'google' ? 'Google Verified' : (defaultUser.method === 'mobile' ? 'Mobile Verified' : 'Simulated Session');
    });

    this.autoFillPatientForms();
  }
};

// --- Left Navigation Sidebar Functions (Desktop Collapse + Mobile Drawer) ---

// Show subtle toast feedback when toggling sidebar


export { CarePulseAuth };
