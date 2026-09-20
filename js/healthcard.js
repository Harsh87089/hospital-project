// CarePulse Smart Health Card (ABHA) Engine
import { DEMO_PHONE, DEMO_WHATSAPP_DISPLAY } from './config.js';
import { showToast, escapeHtml } from './utils.js';

const DigitalHealthCardEngine = {
  currentProfile: 'self',

  profiles: {
    self: {
      name: 'Rajesh Kumar',
      demographics: 'Male • 42 Yrs • UHID: #CP-84920',
      abha: 'ABHA: 00-0000-0000-0001 (Demo Sample)',
      blood: 'O+ Positive',
      allergies: 'Penicillin, Sulfa',
      condition: 'Hypertension',
      phone: DEMO_WHATSAPP_DISPLAY,
      initials: 'RK'
    },
    mother: {
      name: 'Smt. Gurpreet Kaur',
      demographics: 'Female • 68 Yrs • UHID: #CP-84921',
      abha: 'ABHA: 00-0000-0000-0002 (Demo Sample)',
      blood: 'B+ Positive',
      allergies: 'Aspirin (Severe)',
      condition: 'Type 2 Diabetes, Arthritis',
      phone: DEMO_WHATSAPP_DISPLAY,
      initials: 'GK'
    },
    child: {
      name: 'Master Aarav Kumar',
      demographics: 'Male • 9 Yrs • UHID: #CP-84922',
      abha: 'ABHA: 00-0000-0000-0003 (Demo Sample)',
      blood: 'O+ Positive',
      allergies: 'Peanuts (Mild)',
      condition: 'None (Healthy Child)',
      phone: DEMO_WHATSAPP_DISPLAY,
      initials: 'AK'
    }
  },

  open(profileId = 'self') {
    const modal = document.getElementById('health-card-modal');
    if (!modal) return;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    this.switchProfile(profileId);
  },

  close() {
    const modal = document.getElementById('health-card-modal');
    if (modal) modal.classList.remove('active');
    document.body.style.overflow = '';
  },

  switchProfile(profileId) {
    this.currentProfile = profileId;
    ['self', 'mother', 'child'].forEach(id => {
      const btn = document.getElementById(`profile-btn-${id}`);
      if (btn) btn.classList.toggle('active', id === profileId);
    });

    const p = this.profiles[profileId] || this.profiles.self;
    const nameEl = document.getElementById('pass-name');
    const demoEl = document.getElementById('pass-demographics');
    const abhaEl = document.getElementById('pass-abha');
    const bloodEl = document.getElementById('pass-blood');
    const allerEl = document.getElementById('pass-allergies');
    const condEl = document.getElementById('pass-condition');
    const phoneEl = document.getElementById('pass-emergency-phone');
    const imgEl = document.getElementById('pass-avatar-img');
    const qrContainer = document.getElementById('pass-qr-container');

    if (nameEl) nameEl.innerText = p.name;
    if (demoEl) demoEl.innerText = p.demographics;
    if (abhaEl) abhaEl.innerText = p.abha;
    if (bloodEl) bloodEl.innerText = p.blood;
    if (allerEl) allerEl.innerText = p.allergies;
    if (condEl) condEl.innerText = p.condition;
    if (phoneEl) {
      phoneEl.innerText = p.phone;
      phoneEl.href = `tel:${p.phone.replace(/\s+/g, '')}`;
    }
    if (imgEl) {
      if (imgEl.tagName === 'IMG') {
        imgEl.src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"><rect width="80" height="80" rx="16" fill="%230f766e"/><text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="28" font-weight="bold" fill="%23ffffff">${escapeHtml(p.initials || 'PT')}</text></svg>`;
      } else {
        imgEl.innerText = p.initials || 'PT';
      }
    }

    if (qrContainer) {
      qrContainer.innerHTML = this.generateQRCodeSVG(p.abha);
    }
  },

  generateQRCodeSVG(payload) {
    return `
      <svg viewBox="0 0 25 25" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" fill="#042f2e">
        <rect x="1" y="1" width="7" height="7" rx="1" fill="#042f2e"></rect>
        <rect x="2" y="2" width="5" height="5" rx="0.5" fill="#ffffff"></rect>
        <rect x="3" y="3" width="3" height="3" fill="#042f2e"></rect>
        <rect x="17" y="1" width="7" height="7" rx="1" fill="#042f2e"></rect>
        <rect x="18" y="2" width="5" height="5" rx="0.5" fill="#ffffff"></rect>
        <rect x="19" y="3" width="3" height="3" fill="#042f2e"></rect>
        <rect x="1" y="17" width="7" height="7" rx="1" fill="#042f2e"></rect>
        <rect x="2" y="18" width="5" height="5" rx="0.5" fill="#ffffff"></rect>
        <rect x="3" y="19" width="3" height="3" fill="#042f2e"></rect>
        <rect x="10" y="2" width="2" height="2" fill="#042f2e"></rect>
        <rect x="13" y="2" width="2" height="2" fill="#042f2e"></rect>
        <rect x="10" y="5" width="2" height="2" fill="#042f2e"></rect>
        <rect x="9" y="8" width="3" height="2" fill="#042f2e"></rect>
        <rect x="13" y="9" width="2" height="2" fill="#042f2e"></rect>
        <rect x="17" y="10" width="3" height="2" fill="#042f2e"></rect>
        <rect x="9" y="12" width="2" height="3" fill="#042f2e"></rect>
        <rect x="12" y="12" width="3" height="3" fill="#042f2e"></rect>
        <rect x="16" y="13" width="2" height="2" fill="#042f2e"></rect>
        <rect x="20" y="13" width="2" height="2" fill="#042f2e"></rect>
        <rect x="10" y="17" width="2" height="2" fill="#042f2e"></rect>
        <rect x="14" y="17" width="2" height="3" fill="#042f2e"></rect>
        <rect x="18" y="17" width="2" height="2" fill="#042f2e"></rect>
        <rect x="10" y="21" width="3" height="2" fill="#042f2e"></rect>
        <rect x="17" y="21" width="4" height="2" fill="#042f2e"></rect>
      </svg>
    `;
  },

  downloadPass() {
    const p = this.profiles[this.currentProfile] || this.profiles.self;
    showToast(`📥 Saving Digital Health Pass for ${p.name} as wallet document...`, 'success');
    this.printPass();
  },

  printPass() {
    const p = this.profiles[this.currentProfile] || this.profiles.self;
    const printWin = window.open('', '_blank', 'width=700,height=500');
    if (!printWin) {
      showToast('Pop-up blocked. Please allow popups to print your Health Pass.', 'warn');
      return;
    }
    printWin.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>CarePulse Smart Health Pass - ${escapeHtml(p.name)}</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 40px; margin: 0; background: #f8fafc; }
          .card { position: relative; overflow: hidden; max-width: 480px; margin: 0 auto; background: linear-gradient(135deg, #022c22, #0f766e); color: white; border-radius: 16px; padding: 24px; box-shadow: 0 10px 25px rgba(0,0,0,0.2); }
          .card::after {
            content: "DEMO - NOT A REAL APPOINTMENT OR REPORT";
            position: absolute;
            inset: 40% 0 auto;
            text-align: center;
            font: 800 18px system-ui, sans-serif;
            color: rgba(220, 38, 38, 0.22);
            transform: rotate(-18deg);
            pointer-events: none;
            z-index: 99;
          }
          .top { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.2); padding-bottom: 12px; margin-bottom: 16px; }
          .grid { display: grid; grid-template-columns: 2fr 1fr; gap: 16px; }
          .meta-item { margin-bottom: 8px; font-size: 13px; }
          .label { font-size: 10px; text-transform: uppercase; color: #a7f3d0; font-weight: 700; }
          .val { font-size: 14px; font-weight: 800; margin-top: 2px; }
          @media print { body { background: white; padding: 0; } .card { box-shadow: none; } }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="top">
            <div>
              <h3 style="margin: 0; font-size: 18px;">🏥 CarePulse Smart Health Pass</h3>
              <p style="margin: 2px 0 0; font-size: 11px; color: #a7f3d0;">GT Road, Phagwara, Punjab • Demo Helpline: ${DEMO_PHONE}</p>
            </div>
            <div style="font-size: 10px; background: rgba(255,255,255,0.2); padding: 4px 8px; border-radius: 99px; font-weight: 700;">ABHA DEMO FORMAT</div>
          </div>
          <div class="grid">
            <div>
              <div class="meta-item"><div class="label">Patient Name</div><div class="val">${escapeHtml(p.name)}</div></div>
              <div class="meta-item"><div class="label">Demographics</div><div class="val">${escapeHtml(p.demographics)}</div></div>
              <div class="meta-item"><div class="label">ABHA ID</div><div class="val" style="font-family: monospace;">${escapeHtml(p.abha)}</div></div>
              <div class="meta-item"><div class="label">Blood Group</div><div class="val">${escapeHtml(p.blood)}</div></div>
              <div class="meta-item"><div class="label">Critical Allergies</div><div class="val" style="color: #fef08a;">${escapeHtml(p.allergies)}</div></div>
              <div class="meta-item"><div class="label">Emergency Contact</div><div class="val">${escapeHtml(p.phone)}</div></div>
            </div>
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; background: white; padding: 10px; border-radius: 12px;">
              ${this.generateQRCodeSVG(p.abha)}
              <span style="color: #042f2e; font-size: 9px; font-weight: 800; margin-top: 6px; letter-spacing: 0.5px;">DEMO QR</span>
            </div>
          </div>
        </div>
        <script>
          window.onload = function() { window.print(); }
        </script>
      </body>
      </html>
    `);
    printWin.document.close();
  },

  addToWalletDemo() {
    showToast('📱 Pass added to Apple / Google Wallet demonstration profile!', 'success');
  }
};

window.DigitalHealthCardEngine = DigitalHealthCardEngine;
const openHealthCardModal = window.openHealthCardModal = function (profileId) { DigitalHealthCardEngine.open(profileId); };
const closeHealthCardModal = window.closeHealthCardModal = function () { DigitalHealthCardEngine.close(); };



export {
  DigitalHealthCardEngine,
  openHealthCardModal,
  closeHealthCardModal
};
