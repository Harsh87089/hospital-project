// CarePulse Clinical Health Risk Calculators
import { showToast } from './utils.js';

// --- WHO Asia-Pacific / Indian Consensus BMI & Adult BP Classification Helpers ---
function calcBMI(heightCm, weightKg) {
  const h = Number(heightCm) / 100;
  const w = Number(weightKg);
  if (!(h > 0.5 && h < 2.6) || !(w > 10 && w < 400)) return null;
  return Math.round((w / (h * h)) * 10) / 10;
}

// WHO Asia-Pacific classification (Overweight from 23, Obese from 25)
function classifyBMI(bmi) {
  if (bmi === null || bmi === undefined || isNaN(bmi)) return null;
  if (bmi < 18.5) return { key: 'underweight', label: 'Underweight' };
  if (bmi < 23)   return { key: 'normal',      label: 'Normal / Healthy' };
  if (bmi < 25)   return { key: 'overweight',  label: 'Overweight (at risk)' };
  if (bmi < 30)   return { key: 'obese1',      label: 'Obese - Class I' };
  return             { key: 'obese2',      label: 'Obese - Class II' };
}

// Healthy weight band for a given height (BMI 18.5 to 22.9)
function healthyWeightRange(heightCm) {
  const h = Number(heightCm) / 100;
  if (!(h > 0.5 && h < 2.6)) return null;
  return {
    min: Math.round(18.5 * h * h),
    max: Math.round(22.9 * h * h)
  };
}

// Adult BP categories (ACC/AHA 2017 style with systolic and optional diastolic)
function classifyBP(systolic, diastolic) {
  const s = Number(systolic);
  const d = diastolic === '' || diastolic === null || diastolic === undefined ? NaN : Number(diastolic);
  if (!(s > 40 && s < 300)) return null;
  const hasD = d > 20 && d < 200;
  const systolicOnly = !hasD;

  let key, label;
  if (s >= 180 || (hasD && d >= 120)) {
    key = 'crisis';  label = 'Very high - seek urgent medical care';
  } else if (s >= 140 || (hasD && d >= 90)) {
    key = 'high2';   label = 'High (Stage 2)';
  } else if (s >= 130 || (hasD && d >= 80)) {
    key = 'high1';   label = 'High (Stage 1)';
  } else if (s >= 120) {
    key = 'elevated'; label = 'Elevated';
  } else {
    key = 'normal';  label = 'Normal';
  }
  return { key: key, label: label + (systolicOnly ? ' (systolic only)' : ''), systolicOnly: systolicOnly };
}

const CarePulseHealth = {
  calcBMI,
  classifyBMI,
  healthyWeightRange,
  classifyBP
};
window.CarePulseHealth = CarePulseHealth;

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
    const bpInput = document.getElementById('calc-bp');
    const bpSystolic = bpInput ? bpInput.value : 120;
    const bpDiastolicInput = document.getElementById('calc-bp-diastolic');
    const bpDiastolic = bpDiastolicInput ? bpDiastolicInput.value : '';

    const bmi = CarePulseHealth.calcBMI(height, weight);
    if (bmi === null) {
      showToast('Please enter valid Height (cm) and Weight (kg)', 'error');
      return;
    }

    const bmiClass = CarePulseHealth.classifyBMI(bmi);
    const weightRange = CarePulseHealth.healthyWeightRange(height);
    const bpClass = CarePulseHealth.classifyBP(bpSystolic, bpDiastolic) || { label: 'Normal' };

    // Daily Water Intake (35ml per kg)
    const waterLiters = ((weight * 35) / 1000).toFixed(1);

    // BMI Category and Indicator Position (14 to 38 scale)
    const category = bmiClass.label;
    let badgeBg = '#10b981';
    let badgeColor = 'white';
    let pinPct = Math.min(Math.max(((bmi - 14) / (38 - 14)) * 100, 5), 95);

    if (bmiClass.key === 'underweight') {
      badgeBg = '#38bdf8';
    } else if (bmiClass.key === 'normal') {
      badgeBg = '#10b981';
    } else if (bmiClass.key === 'overweight') {
      badgeBg = '#f59e0b';
    } else {
      badgeBg = '#ef4444';
    }

    // Render results
    const scoreNum = document.getElementById('calc-bmi-val');
    const catBadge = document.getElementById('calc-category-badge');
    const pin = document.getElementById('calc-indicator-pin');
    const idealSpan = document.getElementById('calc-ideal-weight');
    const waterSpan = document.getElementById('calc-water-intake');
    const bpSpan = document.getElementById('calc-bp-status');

    if (scoreNum) scoreNum.innerText = bmi.toFixed(1);
    if (catBadge) {
      catBadge.innerText = category;
      catBadge.style.background = badgeBg;
      catBadge.style.color = badgeColor;
    }
    if (pin) pin.style.left = `${pinPct}%`;
    if (idealSpan && weightRange) idealSpan.innerText = `${weightRange.min} - ${weightRange.max} kg`;
    if (waterSpan) waterSpan.innerText = `${waterLiters} Liters/Day`;
    if (bpSpan) bpSpan.innerText = bpClass.label;

    const resultBox = document.getElementById('calc-result-box');
    if (resultBox) resultBox.style.display = 'block';

    showToast(`Calculated BMI: ${bmi.toFixed(1)} (${category})`, 'success');
  }
};

window.HealthCalculatorEngine = HealthCalculatorEngine;
const openHealthCalculator = window.openHealthCalculator = () => HealthCalculatorEngine.open();
const closeHealthCalculator = window.closeHealthCalculator = () => HealthCalculatorEngine.close();
const calculateHealthRisk = window.calculateHealthRisk = () => HealthCalculatorEngine.calculate();

export {
  HealthCalculatorEngine,
  CarePulseHealth,
  openHealthCalculator,
  closeHealthCalculator,
  calculateHealthRisk
};
