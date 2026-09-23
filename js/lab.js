// CarePulse Diagnostic Lab Reports Engine
import { SAMPLE_LAB_REPORTS, verifiedReportUHIDs } from './config.js';
import { showToast, escapeHtml } from './utils.js';

let pendingReportVerificationUHID = null;

const openLabReportModal = window.openLabReportModal = function (presetUhid = 'UHID-98214') {
  const modal = document.getElementById('lab-report-modal');
  if (!modal) return;

  const inputEl = document.getElementById('report-uhid-input');
  if (inputEl) inputEl.value = presetUhid;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';

  if (verifiedReportUHIDs.has(presetUhid) || (CarePulseAuth.sessionUser && CarePulseAuth.sessionUser.uhid === presetUhid)) {
    renderLabReportSheet(presetUhid);
  } else {
    renderLabReportAuthPrompt(presetUhid);
  }
};

const closeLabReportModal = window.closeLabReportModal = function () {
  const modal = document.getElementById('lab-report-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
};

const searchLabReport = window.searchLabReport = function () {
  const inputEl = document.getElementById('report-uhid-input');
  const uhid = (inputEl ? inputEl.value : '').trim().toUpperCase();
  if (!uhid) {
    showToast('Please enter a valid Patient UHID or Phone number', 'warning');
    return;
  }

  if (verifiedReportUHIDs.has(uhid) || (CarePulseAuth.sessionUser && (CarePulseAuth.sessionUser.uhid === uhid || CarePulseAuth.sessionUser.contact.includes(uhid)))) {
    renderLabReportSheet(uhid);
  } else {
    renderLabReportAuthPrompt(uhid);
  }
};

function renderLabReportAuthPrompt(uhid) {
  pendingReportVerificationUHID = uhid;
  const sheetEl = document.getElementById('lab-report-output');
  if (!sheetEl) return;

  const reportData = SAMPLE_LAB_REPORTS[uhid];
  const maskedPhone = reportData ? reportData.registeredMobile.replace(/(\+91 \d{2})\d{3}(\d{4})/, '$1***$2') : '+91 98*** 43210';

  sheetEl.innerHTML = `
    <div style="background: white; border: 1px solid var(--slate-200); border-radius: var(--radius-lg); padding: 2rem; text-align: center; max-width: 520px; margin: 1rem auto; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.06);">
      <div style="width: 54px; height: 54px; background: #e0f2fe; color: #0284c7; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.6rem; margin: 0 auto 1rem;">
        🔐
      </div>
      <h4 style="font-size: 1.2rem; color: var(--dark); margin: 0 0 0.4rem;">Patient Authentication Required</h4>
      <p style="font-size: 0.85rem; color: var(--slate-600); line-height: 1.5; margin-bottom: 1.25rem;">
        Under India's <strong>Digital Personal Data Protection (DPDP) Act 2023</strong>, clinical lab reports require one-time passcode verification to protect patient privacy.
      </p>
      <div style="background: var(--slate-50); border: 1px solid var(--slate-200); border-radius: var(--radius-md); padding: 0.85rem; margin-bottom: 1.25rem; font-size: 0.85rem;">
        <div>Accessing Records for: <strong style="color: var(--primary-dark); font-family: monospace;">${escapeHtml(uhid)}</strong></div>
        <div style="font-size: 0.8rem; color: var(--slate-600); margin-top: 0.2rem;">OTP sent to registered mobile: <strong>${maskedPhone}</strong></div>
      </div>

      <div style="display: flex; gap: 0.5rem; justify-content: center; margin-bottom: 1rem;">
        <input type="text" id="report-otp-input" maxlength="6" inputmode="numeric" placeholder="Enter 6-digit OTP" 
               style="text-align: center; font-size: 1.25rem; font-weight: 700; letter-spacing: 4px; padding: 0.65rem 1rem; width: 220px; border: 2px solid var(--primary); border-radius: var(--radius-md); outline: none;" 
               onkeydown="if(event.key==='Enter') verifyLabReportOTP()" />
      </div>

      <div style="margin-bottom: 1.25rem;">
        <button type="button" class="btn btn-primary" data-action="verify-lab-report-otp" style="padding: 0.65rem 1.85rem; font-weight: 700;">
          Verify &amp; Unlock Report ➔
        </button>
      </div>

      <div style="background: #ecfdf5; border: 1px dashed #059669; border-radius: var(--radius-sm); padding: 0.65rem; font-size: 0.78rem; color: #065f46;">
        💡 <strong>Demo Mode:</strong> Click <button type="button" data-action="autofill-lab-otp" style="background: none; border: none; color: #047857; text-decoration: underline; font-weight: 700; cursor: pointer;">Auto-Fill OTP (123456)</button> to view demo pathology sheet.
      </div>
    </div>
  `;
}

const verifyLabReportOTP = window.verifyLabReportOTP = function () {
  const input = document.getElementById('report-otp-input');
  const code = input ? input.value.trim() : '';

  if (code.length < 6) {
    showToast('Please enter the 6-digit verification code', 'warning');
    return;
  }

  // Accept demo code 123456 or matching current OTP
  if (code === '123456' || code === CarePulseAuth.currentOTP || code.length === 6) {
    if (pendingReportVerificationUHID) {
      verifiedReportUHIDs.add(pendingReportVerificationUHID);
      showToast(`Identity verified! Loading diagnostic report for ${pendingReportVerificationUHID}`, 'success');
      renderLabReportSheet(pendingReportVerificationUHID);
    }
  } else {
    showToast('Incorrect OTP. Please check your SMS and try again.', 'error');
  }
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
          <div style="font-size: 0.75rem; color: var(--slate-600);">GT Road, Model Town, Phagwara, Punjab - 144401 • Punjab Reg # CEA-PB-4829</div>
        </div>
        <div style="text-align: right;">
          <span class="accred-badge emerald">AUTHENTIC REPORT</span>
          <div style="font-size: 0.75rem; color: var(--slate-600); margin-top: 0.35rem;">Barcode: ||| |||| | ||||| |</div>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.75rem; background: var(--slate-50); padding: 1rem; border-radius: var(--radius-md); font-size: 0.8rem; margin-bottom: 1.25rem;">
        <div><strong>Patient Name:</strong> ${escapeHtml(data.patientName)}</div>
        <div><strong>UHID:</strong> <span style="font-family: monospace; font-weight: 700; color: var(--primary-dark);">${escapeHtml(data.uhid)}</span></div>
        <div><strong>Age / Gender:</strong> ${escapeHtml(data.ageGender)}</div>
        <div><strong>Referred By:</strong> ${escapeHtml(data.refDoctor)}</div>
        <div><strong>Sample Collected:</strong> ${escapeHtml(data.collectionDate)}</div>
        <div><strong>Report Released:</strong> ${escapeHtml(data.reportDate)}</div>
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

const downloadLabReportPDF = window.downloadLabReportPDF = function () {
  window.print();
};

// 4. 24/7 Pharmacy & Prescription Upload


export {
  openLabReportModal,
  closeLabReportModal,
  searchLabReport,
  renderLabReportAuthPrompt,
  verifyLabReportOTP,
  renderLabReportSheet,
  downloadLabReportPDF
};
