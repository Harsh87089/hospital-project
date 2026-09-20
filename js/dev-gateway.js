// CarePulse Developer Preview Gateway Modal (Loaded dynamically only with ?dev=1)
(function () {
  if (document.getElementById('delivery-gateway-modal')) return;

  const html = `
    <!-- Real OTP Delivery Gateway Manager Modal (EmailJS & Firebase) -->
    <div id="delivery-gateway-modal" class="modal-backdrop u-display-none" role="dialog" aria-modal="true"
        aria-labelledby="gateway-modal-title">
        <div class="modal-card u-modal-w-620px">
            <div class="modal-header">
                <h3 id="gateway-modal-title" class="u-flex-box-299">
                    <span>⚙️</span> Real OTP Delivery Gateway Manager
                </h3>
                <button class="modal-close-btn" data-action="close-delivery-gateway">&times;</button>
            </div>
            <div class="modal-body u-box-font-size-300">
                <div style="background: #fffbeb; border: 1px solid #fef3c7; border-radius: 8px; padding: 0.75rem 1rem; margin-bottom: 1rem; font-size: 0.82rem; color: #92400e; line-height: 1.45;">
                    <strong>⚠️ Developer Environment Notice:</strong> This configuration console is restricted to developer preview (<code>?dev=1</code>). Only public client-safe API credentials belong here (e.g. EmailJS Public Key, Firebase Public Config). Never store secret API keys, private tokens, or production service account credentials in browser storage.
                </div>
                <p class="u-margin-bottom-1rem">
                    Configure how CarePulse delivers login verification codes. You can enable <strong>Real
                        Delivery</strong> to send live SMS to phones and emails to Gmail, or use <strong>Interactive
                        Demo Mode</strong> for instant testing.
                </p>

                <!-- Mode Selector Cards -->
                <div class="gateway-mode-selector">
                    <div class="gateway-mode-card" id="mode-card-real" data-action="gateway-mode" data-mode="real">
                        <div class="u-box-font-weight-301">
                            🟢 Real Delivery Mode
                        </div>
                        <div class="u-box-font-size-302">
                            Sends real cellular SMS (+91) via Google Firebase &amp; real emails to Gmail via EmailJS.
                        </div>
                    </div>
                    <div class="gateway-mode-card active" id="mode-card-demo"
                        data-action="gateway-mode" data-mode="simulated">
                        <div class="u-box-font-weight-301">
                            🟡 Instant Demo Mode
                        </div>
                        <div class="u-box-font-size-302">
                            Shows on-screen simulated notification banner with 1-click Auto-Fill &amp; Copy buttons.
                        </div>
                    </div>
                </div>

                <!-- Section 1: EmailJS for Real Gmail Delivery -->
                <div class="gateway-section-card">
                    <div class="gateway-section-title">
                        <span>📧 1. Real Gmail Delivery (EmailJS API)</span>
                        <a href="https://dashboard.emailjs.com/sign-up" target="_blank" rel="noopener noreferrer"
                            class="gateway-helper-link">
                            🔗 Get Free Keys (No Card Required)
                        </a>
                    </div>
                    <p class="u-box-font-size-303">
                        EmailJS provides <strong>200 free emails/month</strong>. Connect your Gmail in EmailJS, create
                        an OTP template with <code>{{otp_code}}</code>, and paste your keys below:
                    </p>
                    <div class="u-grid-box-304">
                        <div class="gateway-input-group">
                            <label for="cfg-emailjs-service">Service ID</label>
                            <input type="text" id="cfg-emailjs-service" placeholder="e.g. service_carepulse" />
                        </div>
                        <div class="gateway-input-group">
                            <label for="cfg-emailjs-template">Template ID</label>
                            <input type="text" id="cfg-emailjs-template" placeholder="e.g. template_otp" />
                        </div>
                    </div>
                    <div class="gateway-input-group u-margin-bottom-0">
                        <label for="cfg-emailjs-public">Public Key (Account User ID)</label>
                        <input type="text" id="cfg-emailjs-public" placeholder="e.g. u_aB1c2D3e4F5..." />
                    </div>
                </div>

                <!-- Section 2: Firebase Phone Auth for Real Cellular SMS -->
                <div class="gateway-section-card">
                    <div class="gateway-section-title">
                        <span>📱 2. Real Mobile SMS Delivery (Google Firebase)</span>
                        <a href="https://console.firebase.google.com/" target="_blank" rel="noopener noreferrer"
                            class="gateway-helper-link">
                            🔗 Firebase Console (Free 10K SMS)
                        </a>
                    </div>
                    <p class="u-box-font-size-303">
                        Google Firebase sends <strong>10,000 free cellular SMS/month</strong> globally. In Firebase
                        Console, create a project, go to Authentication &rarr; Sign-in method, and enable
                        <strong>Phone</strong>:
                    </p>
                    <div class="u-grid-box-304">
                        <div class="gateway-input-group">
                            <label for="cfg-firebase-api">Firebase API Key</label>
                            <input type="text" id="cfg-firebase-api" placeholder="e.g. AIzaSyB3..." />
                        </div>
                        <div class="gateway-input-group">
                            <label for="cfg-firebase-project">Project ID</label>
                            <input type="text" id="cfg-firebase-project" placeholder="e.g. carepulse-hospital" />
                        </div>
                    </div>
                    <div class="gateway-input-group u-margin-bottom-0">
                        <label for="cfg-firebase-domain">Auth Domain (Optional)</label>
                        <input type="text" id="cfg-firebase-domain"
                            placeholder="e.g. carepulse-hospital.firebaseapp.com" />
                    </div>
                </div>

            </div>
            <div class="modal-footer u-flex-box-306">
                <button type="button" class="btn btn-outline btn-sm" data-action="gateway-test">
                    🧪 Test Delivery Now
                </button>
                <div class="u-flex-box-172">
                    <button type="button" class="btn btn-outline btn-sm" data-action="close-delivery-gateway">
                        Close
                    </button>
                    <button type="button" class="btn btn-primary btn-sm" data-action="gateway-save">
                        💾 Save &amp; Activate Settings
                    </button>
                </div>
            </div>
        </div>
    </div>`;

  document.body.insertAdjacentHTML('beforeend', html);
  if (window.DeliveryGateway && typeof window.DeliveryGateway.populateForm === 'function') {
    window.DeliveryGateway.populateForm();
  }
})();
