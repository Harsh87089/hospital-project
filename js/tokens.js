// CarePulse Token Slip, PDF E-Pass & Reschedule/Cancel Engine
import { DEMO_WHATSAPP, DOCTORS, state } from './config.js';
import { escapeHtml, showToast, getSlotsForDoctorAndDate, CarePulseQR, CarePulseBarcode } from './utils.js';

window.openTrackTokenModal = function (presetTokenId = null) {
  const modal = document.getElementById('track-token-modal');
  if (!modal) return;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  if (presetTokenId) {
    const input = document.getElementById('tracker-input');
    if (input) {
      input.value = presetTokenId;
      checkTokenLiveStatus(presetTokenId);
    }
  }
};

window.closeTrackTokenModal = function () {
  const modal = document.getElementById('track-token-modal');
  if (modal) modal.classList.remove('active');
  document.body.style.overflow = '';
};



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

  openTrackTokenModal(active.tokenId);
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
  ctx.fillText('CarePulse Hospital Clinical UX Demo • Simulated OPD E-Pass', 96, 78);
  ctx.font = '12px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillStyle = '#ccfbf1';
  ctx.fillText(`GT Road, Near Sugar Mill Crossing, Phagwara, Punjab • 24/7 Helpline: ${DEMO_PHONE}`, 96, 98);

  // Demo Prototype Badge (Top Right)
  ctx.fillStyle = '#dc2626';
  roundRect(ctx, 608, 42, 160, 30, 15);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 11px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('DEMO PROTOTYPE', 688, 61);
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
  const qrPayload = app.qrPayload || `https://hospital-project-tawny.vercel.app/?track=${app.tokenId}&ref=${app.ticketRef}`;
  CarePulseQR.drawToCanvas(ctx, qrPayload, 56, 642, 110);

  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Fast Kiosk & Reception Check-In', 186, 668);
  ctx.fillStyle = '#475569';
  ctx.font = '13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Scan this unique dynamic QR code at the reception desk scanner or check-in', 186, 694);
  ctx.fillText('kiosk to immediately confirm presence in the waiting lobby and notify doctor.', 186, 714);
  ctx.fillStyle = '#b45309';
  ctx.font = 'bold 12px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('DEMO PROTOTYPE • SIMULATED DIGITAL TOKEN FOR CLINICAL UX PREVIEW', 186, 744);

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
  ctx.fillText('• Keep this digital ticket handy on your phone or in printed copy at the hospital.', 54, 958);
  ctx.fillText(`• Emergency Ambulance: 108 / 112 | Demo Line: ${DEMO_PHONE}`, 54, 980);
  ctx.fillText('• Demonstration Prototype – Not an active commercial clinic | Real emergencies dial 108 / 112', 54, 1002);

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
  const qrSvg = CarePulseQR.renderToSvg(app.qrPayload || `https://hospital-project-tawny.vercel.app/?track=${app.tokenId}&ref=${app.ticketRef || '0'}`, 90);

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>CarePulse_Ticket_${escapeHtml(app.tokenId)}_${escapeHtml(app.patientName)}</title>
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
        .demo-tag-bar {
          background: #fee2e2;
          border: 1px solid #f87171;
          color: #991b1b;
          font-size: 11px;
          font-weight: 800;
          text-align: center;
          padding: 6px 12px;
          margin: 12px 24px 0;
          border-radius: 6px;
          letter-spacing: 0.5px;
        }
        .token-hero {
          background: #042f2e;
          color: white;
          padding: 18px;
          margin: 14px 24px 18px;
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
          <p>CarePulse Clinical UX Prototype • GT Road, Phagwara, Punjab - 144401</p>
          <p>Real Emergency: 108 / 112 | Demo Helpline: ${DEMO_PHONE}</p>
        </div>
        <div class="demo-tag-bar">
          ⚠️ DEMO PROTOTYPE &bull; NOT A VALID MEDICAL OR HOSPITAL ADMISSION PASS
        </div>
        <div class="token-hero">
          <div class="token-lbl">Official Consultation Token Number</div>
          <div class="token-id">#${escapeHtml(app.tokenId)}</div>
          <div class="token-time">Scheduled: ${escapeHtml(app.date)} • ${escapeHtml(app.timeSlot)}</div>
        </div>
        <div class="meta-strip">
          <span>Ref: <strong>${escapeHtml(app.ticketRef)}</strong></span>
          <span>•</span>
          <span>Desk: <strong>${escapeHtml(app.assignedDesk)}</strong></span>
          <span>•</span>
          <span>Security: <strong>${escapeHtml(app.securityCode)}</strong></span>
        </div>
        <table>
          <tbody>
            <tr><td class="lbl">Patient Name</td><td class="val">${escapeHtml(app.patientName)}</td></tr>
            <tr><td class="lbl">Age / Gender / Place</td><td class="val">${escapeHtml(app.patientAge)} Yrs / ${escapeHtml(app.patientGender)} • ${escapeHtml(app.patientPlace || 'Phagwara')}</td></tr>
            <tr><td class="lbl">Contact Mobile</td><td class="val">${escapeHtml(app.patientPhone)}</td></tr>
            <tr><td class="lbl">Consulting Doctor</td><td class="val">${escapeHtml(app.doctorName)}</td></tr>
            <tr><td class="lbl">Specialty & Dept</td><td class="val">${escapeHtml(app.doctorSpecialty)}</td></tr>
            <tr><td class="lbl">Clinic Chamber</td><td class="val">${escapeHtml((app.room || '').split(',')[0])}</td></tr>
            <tr><td class="lbl">Chief Symptoms</td><td class="val">${escapeHtml(app.visitReason || 'General Consultation')}</td></tr>
            <tr><td class="lbl">Consultation Fee</td><td class="val" style="color: #0d9488;">${escapeHtml(app.fee)}</td></tr>
            <tr><td class="lbl">Arrival Instructions</td><td class="val" style="color: #b45309;">${escapeHtml(app.reportingNote || 'Please report 15 mins prior')}</td></tr>
          </tbody>
        </table>
        <div class="qr-section">
          <div class="qr-box">${qrSvg}</div>
          <div class="qr-text">
            <h4>Fast Kiosk & Lobby Check-In</h4>
            <p>Scan this dynamic QR code at the reception kiosk to instantly verify your arrival and confirm your queue slot. Issued: ${escapeHtml(app.issueTimestamp)}</p>
          </div>
        </div>
        <div class="barcode-section">
          <div class="barcode-svg">${barcodeSvg}</div>
          <div class="barcode-txt">${escapeHtml(app.barcodeNum)}</div>
        </div>
        <div class="footer">
          Demonstration Project • Not an active commercial clinic. For actual medical emergencies in India, dial 108 or 112.
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

// ==========================================================================
// ==========================================================================
// TOKEN ACTIONS: RESCHEDULE, CANCEL, ADD TO CALENDAR (In-Page Modal UI)
// ==========================================================================



function populateRescheduleSlots(doctorId, isoDate) {
  const slotEl = document.getElementById('reschedule-slot-select');
  if (!slotEl) return;
  const slotsData = getSlotsForDoctorAndDate(doctorId, isoDate);
  if (slotsData.offDuty) {
    slotEl.innerHTML = `<option value="">Doctor Off-Duty on this day</option>`;
    return;
  }
  const allSlots = [...(slotsData.morning || []), ...(slotsData.afternoon || []), ...(slotsData.evening || [])];
  const available = allSlots.filter(s => s.status !== 'booked' && s.status !== 'past');
  if (available.length === 0) {
    slotEl.innerHTML = `<option value="">No open consultation slots available</option>`;
    return;
  }
  slotEl.innerHTML = available.map(s => `<option value="${s.time}">${s.session}: ${s.time}</option>`).join('');
}

window.openRescheduleModal = function (app) {
  state.pendingActionAppointment = app;
  const modal = document.getElementById('reschedule-dialog-modal');
  if (modal) {
    const docEl = document.getElementById('reschedule-doc-name');
    const tokEl = document.getElementById('reschedule-token-val');
    const dateEl = document.getElementById('reschedule-date-input');
    if (docEl) docEl.textContent = app.doctorName;
    if (tokEl) tokEl.textContent = `#${app.tokenId}`;
    
    const tmrw = new Date(getISTDate().getTime() + 86400000);
    const tmrwIso = getISTIsoDate(tmrw);
    if (dateEl) {
      dateEl.value = tmrwIso;
      dateEl.min = getISTIsoDate();
      dateEl.onchange = function () {
        populateRescheduleSlots(app.doctorId, dateEl.value);
      };
    }
    populateRescheduleSlots(app.doctorId, dateEl ? dateEl.value : tmrwIso);
    modal.style.display = 'flex';
  } else {
    // Direct in-page safe reschedule
    const nextDay = new Date(getISTDate().getTime() + 86400000);
    const nextIso = getISTIsoDate(nextDay);
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const formatted = `${dayNames[nextDay.getDay()]}, ${nextDay.getDate()} ${monthNames[nextDay.getMonth()]}`;

    app.isoDate = nextIso;
    app.date = formatted;
    app.status = 'Rescheduled';
    try {
      localStorage.setItem('carepulse_appointments', JSON.stringify(state.userAppointments));
    } catch (e) { }
    showToast(`Token #${app.tokenId} rescheduled to ${formatted} (${app.timeSlot})!`, 'success');
    openTokenSlipModal(app);
  }
};

window.closeRescheduleModal = function () {
  const modal = document.getElementById('reschedule-dialog-modal');
  if (modal) modal.style.display = 'none';
};

window.confirmReschedule = function () {
  const app = state.pendingActionAppointment || state.currentViewingToken || state.lastCreatedToken;
  if (!app) return;
  const dateInput = document.getElementById('reschedule-date-input');
  const slotInput = document.getElementById('reschedule-slot-select');
  const newDateIso = (dateInput && dateInput.value) ? dateInput.value : getISTIsoDate();
  const newSlot = (slotInput && slotInput.value) ? slotInput.value : '';

  if (!newSlot || newSlot.includes('Off-Duty') || newSlot.includes('No open')) {
    showToast('Please select an available consultation slot.', 'warning');
    return;
  }

  // 1. Free up previous slot from cache
  const oldCacheKey = `${app.doctorId}_${app.isoDate || app.date}`;
  if (state.bookedSlotsCache[oldCacheKey]) {
    state.bookedSlotsCache[oldCacheKey] = state.bookedSlotsCache[oldCacheKey].filter(s => s !== app.timeSlot);
  }

  // 2. Reserve new slot in cache
  const newCacheKey = `${app.doctorId}_${newDateIso}`;
  if (!state.bookedSlotsCache[newCacheKey]) state.bookedSlotsCache[newCacheKey] = [];
  if (!state.bookedSlotsCache[newCacheKey].includes(newSlot)) {
    state.bookedSlotsCache[newCacheKey].push(newSlot);
  }
  try {
    localStorage.setItem('carepulse_booked_slots', JSON.stringify(state.bookedSlotsCache));
  } catch (e) { }

  // 3. Format human date
  const dateObj = new Date(newDateIso + 'T12:00:00Z');
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const formattedDate = `${dayNames[dateObj.getUTCDay()]}, ${dateObj.getUTCDate()} ${monthNames[dateObj.getUTCMonth()]}`;

  app.isoDate = newDateIso;
  app.date = formattedDate;
  app.timeSlot = newSlot;
  app.reportingNote = `Rescheduled: Please report 15 mins prior (${newSlot})`;
  app.status = 'Rescheduled';

  try {
    localStorage.setItem('carepulse_appointments', JSON.stringify(state.userAppointments));
  } catch (e) { }

  broadcastQueueUpdate('RESCHEDULE', { tokenId: app.tokenId, newDate: formattedDate, newSlot });
  showToast(`Token #${app.tokenId} rescheduled to ${formattedDate} at ${newSlot}!`, 'success');
  closeRescheduleModal();
  openTokenSlipModal(app);
};

window.rescheduleAppointment = function (tokenId) {
  const app = (tokenId ? state.userAppointments.find(a => a.tokenId === tokenId) : null) || state.currentViewingToken || state.lastCreatedToken;
  if (!app) {
    showToast('No active appointment to reschedule.', 'warning');
    return;
  }
  openRescheduleModal(app);
};

window.openCancelModal = function (app) {
  state.pendingActionAppointment = app;
  const modal = document.getElementById('cancel-dialog-modal');
  if (modal) {
    const docEl = document.getElementById('cancel-doc-name');
    const tokEl = document.getElementById('cancel-token-val');
    if (docEl) docEl.textContent = app.doctorName;
    if (tokEl) tokEl.textContent = `#${app.tokenId}`;
    modal.style.display = 'flex';
  } else {
    app.status = 'Cancelled';
    const cacheKey = `${app.doctorId}_${app.isoDate || app.date}`;
    if (state.bookedSlotsCache[cacheKey]) {
      state.bookedSlotsCache[cacheKey] = state.bookedSlotsCache[cacheKey].filter(s => s !== app.timeSlot);
      try {
        localStorage.setItem('carepulse_booked_slots', JSON.stringify(state.bookedSlotsCache));
      } catch (e) { }
    }
    try {
      localStorage.setItem('carepulse_appointments', JSON.stringify(state.userAppointments));
    } catch (e) { }
    showToast(`Appointment #${app.tokenId} cancelled. Consultation slot has been freed.`, 'info');
    openTokenSlipModal(app);
  }
};

window.closeCancelModal = function () {
  const modal = document.getElementById('cancel-dialog-modal');
  if (modal) modal.style.display = 'none';
};

window.confirmCancellation = function () {
  const app = state.pendingActionAppointment || state.currentViewingToken || state.lastCreatedToken;
  if (!app) return;
  const reasonInput = document.getElementById('cancel-reason-select');
  const reason = (reasonInput && reasonInput.value) ? reasonInput.value : 'Personal emergency / Rescheduling later';

  app.status = 'Cancelled';
  app.cancelReason = reason;

  // Free up slot cache and persist
  const cacheKey = `${app.doctorId}_${app.isoDate || app.date}`;
  if (state.bookedSlotsCache[cacheKey]) {
    state.bookedSlotsCache[cacheKey] = state.bookedSlotsCache[cacheKey].filter(s => s !== app.timeSlot);
    try {
      localStorage.setItem('carepulse_booked_slots', JSON.stringify(state.bookedSlotsCache));
    } catch (e) { }
  }

  try {
    localStorage.setItem('carepulse_appointments', JSON.stringify(state.userAppointments));
  } catch (e) { }

  broadcastQueueUpdate('CANCEL', { tokenId: app.tokenId });
  showToast(`Appointment #${app.tokenId} cancelled. Consultation slot has been freed.`, 'info');
  closeCancelModal();
  openTokenSlipModal(app);
};

window.cancelAppointment = function (tokenId) {
  const app = (tokenId ? state.userAppointments.find(a => a.tokenId === tokenId) : null) || state.currentViewingToken || state.lastCreatedToken;
  if (!app) {
    showToast('No active appointment to cancel.', 'warning');
    return;
  }
  openCancelModal(app);
};

window.addToCalendar = function (tokenId, mode = 'ics') {
  const app = (tokenId ? state.userAppointments.find(a => a.tokenId === tokenId) : null) || state.currentViewingToken || state.lastCreatedToken;
  if (!app) {
    showToast('No appointment found to add to calendar.', 'warning');
    return;
  }

  // Parse appointment date & time slot for valid DTSTART / DTEND
  const dateStr = app.isoDate || getISTIsoDate();
  const timeStr = app.timeSlot || '09:00 AM';
  const parts = timeStr.trim().split(' ');
  const timeParts = (parts[0] || '09:00').split(':');
  let h = parseInt(timeParts[0], 10) || 9;
  const m = parseInt(timeParts[1], 10) || 0;
  if (parts[1] === 'PM' && h < 12) h += 12;
  if (parts[1] === 'AM' && h === 12) h = 0;

  // In IST (UTC+5:30)
  const [y, mon, d] = dateStr.split('-').map(n => parseInt(n, 10));
  // Convert IST to UTC timestamp
  const startDate = new Date(Date.UTC(y, mon - 1, d, h - 5, m - 30));
  const endDate = new Date(startDate.getTime() + 30 * 60000); // 30 min consultation

  const formatICSDate = (dt) => {
    return dt.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const dtStart = formatICSDate(startDate);
  const dtEnd = formatICSDate(endDate);

  const title = `CarePulse OPD: ${app.doctorName} (${app.tokenId})`;
  const desc = `Consultation with ${app.doctorName}\\nDepartment: ${app.doctorSpecialty}\\nRoom: ${app.room}\\nToken: ${app.tokenId}\\nDemo Helpline: ${DEMO_PHONE}\\nPortal: https://hospital-project-tawny.vercel.app/`;
  const loc = `CarePulse Multi-Specialty Hospital, GT Road, Near Sugar Mill Crossing, Phagwara, Punjab - 144401`;

  if (mode === 'google') {
    const datesParam = `${dtStart}/${dtEnd}`;
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${datesParam}&details=${encodeURIComponent(desc)}&location=${encodeURIComponent(loc)}`;
    window.open(url, '_blank');
    return;
  }

  // Standard iCalendar (.ics) download
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//CarePulse Multi-Specialty Hospital//EN',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:cp-${app.tokenId}-${Date.now()}@carepulse.hospital`,
    `DTSTAMP:${formatICSDate(new Date())}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${desc.replace(/\n/g, '\\n')}`,
    `LOCATION:${loc}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `CarePulse_Appointment_${app.tokenId}.ics`;
  a.click();
  showToast('Calendar invite (.ics) downloaded with scheduled date & time!', 'success');
};

// ==========================================================================
// RECEPTION DESK & REALTIME OPD QUEUE CONTROLLER
// ==========================================================================



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

  if (!searchVal || !searchVal.trim()) {
    showToast('Please enter your Token ID (e.g. TK-014) or registered 10-digit mobile number', 'warning');
    return;
  }

  const cleanVal = searchVal.replace('#', '').trim().toUpperCase();
  const cleanPhone = searchVal.replace(/[^0-9]/g, '');

  // Find strictly in user appointments
  const found = state.userAppointments.find(a =>
    a.tokenId.toUpperCase() === cleanVal ||
    (cleanPhone.length === 10 && (a.patientPhone || '').replace(/[^0-9]/g, '') === cleanPhone)
  );

  if (!found) {
    showToast(`No appointment record found for "${escapeHtml(searchVal)}". Please verify your token number or book a new appointment.`, 'warning');
    resultBox.classList.remove('active');
    activeTrackerToken = null;
    return;
  }

  activeTrackerToken = found.tokenId;
  const doc = DOCTORS.find(d => d.id === found.doctorId) || DOCTORS[0];
  const tokenNum = found.tokenNumber;
  const patientName = found.patientName || 'Registered Patient';

  const todayIST = getISTIsoDate();
  const isToday = (found.isoDate === todayIST || found.date?.includes('Today'));

  const currentlyServing = doc.currentServingToken || 0;
  const ahead = Math.max(0, tokenNum - currentlyServing);
  const estWait = ahead * (doc.avgWaitPerPatient || 12);

  // Determine queue stage based on whether consultation is today or a future date
  let stageText = '';
  let waitDisplay = '';
  let step1Class = 'completed';
  let step2Class = 'completed';
  let step3Class = '';
  let progressWidth = '50%';

  if (!isToday) {
    stageText = `📅 Scheduled for ${escapeHtml(found.date)} (${escapeHtml(found.timeSlot)}). Live counter activates on appointment day.`;
    waitDisplay = 'Upcoming';
    step1Class = 'completed';
    step2Class = '';
    step3Class = '';
    progressWidth = '25%';
  } else if (found.status === 'Completed' || tokenNum < currentlyServing) {
    stageText = 'Consultation Completed';
    waitDisplay = '0 mins';
    step2Class = 'completed';
    step3Class = 'completed';
    progressWidth = '100%';
  } else if (found.status === 'Cancelled') {
    stageText = 'Appointment Cancelled';
    waitDisplay = 'Cancelled';
    step2Class = '';
    step3Class = '';
    progressWidth = '0%';
  } else if (tokenNum === currentlyServing) {
    stageText = 'Now Serving - Please Enter Doctor Consultation Room';
    waitDisplay = 'Now Serving';
    step2Class = 'completed';
    step3Class = 'current';
    progressWidth = '75%';
  } else if (ahead === 1) {
    stageText = 'You are NEXT in line! Please wait directly outside the chamber door.';
    waitDisplay = `~${doc.avgWaitPerPatient || 12} mins`;
    step2Class = 'current';
    progressWidth = '50%';
  } else {
    stageText = `Waiting in Lobby (${ahead} patients ahead of you)`;
    waitDisplay = `~${estWait} mins`;
    step2Class = 'current';
    progressWidth = '40%';
  }

  resultBox.innerHTML = `
    <div class="tracker-top-info">
      <div>
        <span style="font-size: 0.78rem; color: #a7f3d0; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 700;">Verified Token Status</span>
        <div class="tracker-token-badge" id="tracker-token-num">#${escapeHtml(found.tokenId)}</div>
        <div style="font-size: 0.9rem; color: #cbd5e1; margin-top: 0.2rem;">Patient: <strong>${escapeHtml(patientName)}</strong> • ${escapeHtml(doc.name)} (${escapeHtml(doc.specialty)})</div>
      </div>

      <div style="background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: var(--radius-md); padding: 0.75rem 1.25rem; text-align: right;">
        <div style="font-size: 0.75rem; color: #94a3b8;">${isToday ? 'Current OPD Status' : 'Scheduled Date'}</div>
        <div style="font-size: 1.25rem; font-weight: 800; color: #34d399;">${isToday ? `Now Serving: #TK-${String(currentlyServing).padStart(2, '0')}` : escapeHtml(found.date)}</div>
        <div style="font-size: 0.75rem; color: #cbd5e1;">Room: ${escapeHtml((doc.room || '').split(',')[0])}</div>
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
        <div style="font-size: 1.4rem; font-weight: 800; color: #fde047;">${waitDisplay}</div>
      </div>
    </div>
  `;

  resultBox.classList.add('active');
  if (isToday) {
    showToast(`Queue verified: ${ahead} patients ahead of you.`, 'info');
  } else {
    showToast(`Appointment confirmed for ${found.date}!`, 'info');
  }
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
      const safeTokenId = escapeHtml(app.tokenId);
      const safeStatus = escapeHtml(app.status || 'Active');
      const safeDocName = escapeHtml(app.doctorName);
      const safeDocSpec = escapeHtml(app.doctorSpecialty);
      const safeDate = escapeHtml(app.date);
      const safeSlot = escapeHtml(app.timeSlot);
      const safePatientName = escapeHtml(app.patientName);
      const safePatientPlace = escapeHtml(app.patientPlace || 'Phagwara');
      return `
        <div class="my-booking-item">
          <div>
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
              <span class="my-token-num">#${safeTokenId}</span>
              <span class="avail-status-tag" style="font-size: 0.7rem; padding: 0.15rem 0.5rem;">${safeStatus}</span>
            </div>
            <div style="font-weight: 700; font-size: 0.95rem; color: var(--dark);">${safeDocName} (${safeDocSpec})</div>
            <div style="font-size: 0.8rem; color: var(--slate-600);">${safeDate} • ${safeSlot} • Patient: ${safePatientName} (${safePatientPlace})</div>
          </div>
          <div style="display: flex; flex-direction: column; gap: 0.4rem; align-items: flex-end;">
            <div style="display: flex; gap: 0.35rem; align-items: center;">
              <button class="btn btn-outline btn-sm" onclick="reopenTokenSlip('${safeTokenId}')" title="View token slip">
                View ↗
              </button>
              <button class="btn btn-sm btn-download-ticket" style="padding: 0.3rem 0.65rem; font-size: 0.76rem;" onclick="downloadTicketById('${safeTokenId}', 'png')" title="Download E-Pass">
                📥 Download
              </button>
            </div>
            <button class="btn btn-sm" style="color: var(--accent-rose); background: transparent; border: none; font-size: 0.75rem; padding: 0.1rem 0.3rem;" onclick="cancelAppointment('${safeTokenId}')">
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



// --- Specialty Filter Buttons Setup ---


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


export {
  openTrackTokenModal,
  closeTrackTokenModal,
  openTokenSlipModal,
  closeTokenModal,
  printTokenSlip,
  trackGeneratedTokenNow,
  downloadTicket,
  downloadTicketPDF,
  downloadCurrentTokenTicket,
  downloadTicketById,
  populateRescheduleSlots,
  openRescheduleModal,
  closeRescheduleModal,
  confirmReschedule,
  rescheduleAppointment,
  openCancelModal,
  closeCancelModal,
  confirmCancellation,
  cancelAppointment,
  addToCalendar,
  setupTracker,
  checkTokenLiveStatus,
  renderMyBookingsBadge,
  openMyBookingsModal,
  closeMyBookingsModal,
  reopenTokenSlip,
  FloatingTokenTracker
};
