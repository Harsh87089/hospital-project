// CarePulse Pharmacy & Prescription Engine
import { showToast, escapeHtml } from './utils.js';

let selectedMedicines = [];

const openPharmacyModal = window.openPharmacyModal = function () {
  const modal = document.getElementById('pharmacy-modal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
};

const closePharmacyModal = window.closePharmacyModal = function () {
  const modal = document.getElementById('pharmacy-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
};

const toggleMedicineSelection = window.toggleMedicineSelection = function (btn, name, price) {
  const idx = selectedMedicines.findIndex(m => m.name === name);
  if (idx > -1) {
    selectedMedicines.splice(idx, 1);
    btn.classList.remove('added');
    btn.textContent = '+ Add';
  } else {
    selectedMedicines.push({ name, price });
    btn.classList.add('added');
    btn.textContent = '✓ Added';
  }
  updatePharmacyCartDisplay();
};

function updatePharmacyCartDisplay() {
  const cartInfoEl = document.getElementById('pharmacy-cart-summary');
  if (!cartInfoEl) return;
  if (selectedMedicines.length === 0) {
    cartInfoEl.innerHTML = `<span style="color: var(--slate-400); font-size: 0.8rem;">No OTC medicines selected yet (optional if uploading prescription).</span>`;
  } else {
    const total = selectedMedicines.reduce((sum, item) => sum + item.price, 0);
    cartInfoEl.innerHTML = `
      <div style="font-size: 0.825rem; font-weight: 700; color: var(--dark); display: flex; justify-content: space-between;">
        <span>Selected (${selectedMedicines.length} items): ${selectedMedicines.map(m => m.name).join(', ')}</span>
        <span style="color: var(--primary-dark);">Est: ₹${total} (15% Off Applied)</span>
      </div>
    `;
  }
}

const handlePrescriptionUpload = window.handlePrescriptionUpload = function (event) {
  const file = event.target.files && event.target.files[0];
  const preview = document.getElementById('rx-filename-display');
  if (file && preview) {
    preview.innerHTML = `✅ <strong>Uploaded:</strong> ${escapeHtml(file.name)} (${(file.size / 1024).toFixed(1)} KB)`;
    preview.style.display = 'block';
    showToast(`Prescription '${file.name}' attached successfully!`, 'success');
  }
};

const submitPharmacyOrder = window.submitPharmacyOrder = function (e) {
  if (e) e.preventDefault();
  const name = document.getElementById('rx-patient-name').value;
  const phone = document.getElementById('rx-patient-phone').value;
  const address = document.getElementById('rx-delivery-address').value;

  if (!name || !phone || !address) {
    showToast('Please provide your delivery name, phone, and complete address.', 'warning');
    return;
  }

  const orderId = `RX-${Math.floor(10000 + Math.random() * 90000)}`;
  closePharmacyModal();
  showToast(`🚀 Order #${orderId} Placed! CarePulse Pharmacist dispatched. ETA: 120 mins.`, 'success');

  alert(`🏥 CarePulse 24/7 Doorstep Pharmacy Confirmation\n\nOrder ID: ${orderId}\nPatient: ${name}\nPhone: ${phone}\nDelivery Address: ${address}\n\nOur certified pharmacist is verifying your prescription & order. You will receive an SMS confirmation with rider live tracking.`);
};

// 5. Interactive AI Symptom Assistant / Triage Bot ("Dr. CarePulse Bot")


export {
  selectedMedicines,
  openPharmacyModal,
  closePharmacyModal,
  toggleMedicineSelection,
  updatePharmacyCartDisplay,
  handlePrescriptionUpload,
  submitPharmacyOrder
};
