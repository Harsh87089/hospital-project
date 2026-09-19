// CarePulse Authentication Gate Engine
import { DEMO_STAFF_PIN, state } from './config.js';
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

  init() {
    // Clear persistent localStorage to guarantee user is logged out whenever site is closed or removed
    try {
      localStorage.removeItem('carepulse_auth_user');
    } catch (e) { }

    this.checkStoredSession();
    this.setupInactivityWatchdog();
    if (typeof DeliveryGateway !== 'undefined' && DeliveryGateway.init) {
      DeliveryGateway.init();
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
    // Visitors browse freely without initial block!
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
    // Only used when explicit sign-in is required
    this.openModal();
  },

  openModal(postAuthAction = null) {
    this.postAuthCallback = postAuthAction;
    const modal = document.getElementById('auth-gate-modal');
    if (modal) {
      modal.style.display = 'flex';
      document.body.classList.add('auth-modal-open');
    }
    this.goToStep('input');
  },

  closeModal() {
    const modal = document.getElementById('auth-gate-modal');
    if (modal) {
      modal.style.display = 'none';
      document.body.classList.remove('auth-modal-open');
    }
    document.body.classList.remove('auth-locked');
    this.postAuthCallback = null;
  },

  requireAuth(callback) {
    if (this.sessionUser) {
      callback(this.sessionUser);
    } else {
      showToast('Please verify your mobile number or sign in to proceed.', 'info');
      this.openModal(callback);
    }
  },

  unlockPortal() {
    document.body.classList.remove('auth-locked');
    document.body.classList.remove('auth-modal-open');
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
            <span class="demo-simulated-tag" style="background: #fef08a; color: #854d0e; font-size: 0.68rem; font-weight: 700; padding: 2px 6px; border-radius: 4px; margin-left: 6px;">DEMO – no SMS/email was actually sent</span>
          </div>
          <button class="simulated-close-btn" onclick="this.closest('.simulated-otp-banner').remove()">&times;</button>
        </div>
        <div class="simulated-banner-body">
          <div class="simulated-sender">CarePulse Security &bull; <span>security@carepulse.org</span></div>
          <p class="simulated-msg">
            Google Security Code: <strong class="highlight-otp">${otp}</strong> for account <em>${escapeHtml(target)}</em> login.
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

  async verifyOTP() {
    const entered = this.getEnteredOTP();
    if (entered.length < 6) {
      this.showError('Please enter all 6 digits of the OTP.');
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

// --- Left Navigation Sidebar Functions (Desktop Collapse + Mobile Drawer) ---

// Show subtle toast feedback when toggling sidebar


export { CarePulseAuth };
