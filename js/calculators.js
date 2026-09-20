// CarePulse Clinical Health Risk Calculators
import { showToast } from './utils.js';

const HealthCalculatorEngine = {
  open() {
    const modal = document.getElementById('health-calculator-modal');
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  },

  close() {
    const modal = document.getElementById('health-calculator-modal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  },

  calculate() {
    const height = parseFloat(document.getElementById('calc-height').value);
    const weight = parseFloat(document.getElementById('calc-weight').value);
    const age = parseInt(document.getElementById('calc-age').value, 10);
    const bp = parseInt(document.getElementById('calc-bp').value, 10) || 120;

    if (!height || !weight || height <= 0 || weight <= 0) {
      showToast('Please enter valid Height (cm) and Weight (kg)', 'error');
      return;
    }

    const heightM = height / 100;
    const bmi = (weight / (heightM * heightM)).toFixed(1);

    // Calculate Ideal Weight Range (BMI 18.5 - 24.9)
    const idealMin = Math.round(18.5 * heightM * heightM);
    const idealMax = Math.round(24.9 * heightM * heightM);

    // Daily Water Intake (35ml per kg)
    const waterLiters = ((weight * 35) / 1000).toFixed(1);

    // BMI Category and Indicator Position (10 to 40 scale)
    let category = 'Normal / Healthy';
    let badgeBg = '#10b981';
    let badgeColor = 'white';
    let pinPct = Math.min(Math.max(((bmi - 14) / (38 - 14)) * 100, 5), 95);

    if (bmi < 18.5) {
      category = 'Underweight';
      badgeBg = '#38bdf8';
    } else if (bmi >= 25 && bmi < 29.9) {
      category = 'Overweight';
      badgeBg = '#f59e0b';
    } else if (bmi >= 30) {
      category = 'Obese (High Clinical Risk)';
      badgeBg = '#ef4444';
    }

    // Blood pressure assessment
    let bpStatus = 'Normal';
    if (bp >= 140) bpStatus = 'Hypertension Stage 2';
    else if (bp >= 130) bpStatus = 'Hypertension Stage 1';
    else if (bp >= 120) bpStatus = 'Elevated';

    // Render results
    const scoreNum = document.getElementById('calc-bmi-val');
    const catBadge = document.getElementById('calc-category-badge');
    const pin = document.getElementById('calc-indicator-pin');
    const idealSpan = document.getElementById('calc-ideal-weight');
    const waterSpan = document.getElementById('calc-water-intake');
    const bpSpan = document.getElementById('calc-bp-status');

    if (scoreNum) scoreNum.innerText = bmi;
    if (catBadge) {
      catBadge.innerText = category;
      catBadge.style.background = badgeBg;
      catBadge.style.color = badgeColor;
    }
    if (pin) pin.style.left = `${pinPct}%`;
    if (idealSpan) idealSpan.innerText = `${idealMin} - ${idealMax} kg`;
    if (waterSpan) waterSpan.innerText = `${waterLiters} Liters/Day`;
    if (bpSpan) bpSpan.innerText = bpStatus;

    const resultBox = document.getElementById('calc-result-box');
    if (resultBox) resultBox.style.display = 'block';

    showToast(`Calculated BMI: ${bmi} (${category})`, 'success');
  }
};

window.HealthCalculatorEngine = HealthCalculatorEngine;
const openHealthCalculator = window.openHealthCalculator = () => HealthCalculatorEngine.open();
const closeHealthCalculator = window.closeHealthCalculator = () => HealthCalculatorEngine.close();
const calculateHealthRisk = window.calculateHealthRisk = () => HealthCalculatorEngine.calculate();

// --- 6. 1-Click Auto-Booking from AI Symptom Chatbot ---


export {
  HealthCalculatorEngine,
  openHealthCalculator,
  closeHealthCalculator,
  calculateHealthRisk
};
