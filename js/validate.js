// CarePulse Accessible Form Validation Engine
export const rules = {
  name: v => /^[A-Za-z\u0900-\u097F\u0A00-\u0A7F .'-]{2,60}$/.test((v || '').trim()) || 'Enter a valid name (2–60 letters).',
  age: v => (+v >= 1 && +v <= 120) || 'Age must be between 1 and 120.',
  mobile: v => /^[6-9]\d{9}$/.test((v || '').replace(/\D/g, '').slice(-10)) || 'Enter a valid 10-digit Indian mobile number.'
};

export function validate(form) {
  if (!form) return false;
  let firstBad = null;
  for (const [field, check] of Object.entries(rules)) {
    const input = form.elements[field] ||
      form.querySelector(`[name="${field}"]`) ||
      form.querySelector(`#layer-patient-${field === 'mobile' ? 'phone' : field}`) ||
      form.querySelector(`#patient-${field === 'mobile' ? 'phone' : field}`);
    if (!input) continue;
    const res = check(input.value);
    let err = input.parentElement ? input.parentElement.querySelector('.field-error, .field-error-msg') : null;
    if (res !== true) {
      if (!err && input.parentElement) {
        err = Object.assign(document.createElement('p'), { className: 'field-error', id: `${field}-err` });
        input.parentElement.append(err);
      }
      if (err) {
        err.textContent = res;
        err.classList.add('visible');
        if (!err.id) err.id = `${field}-err`;
      }
      input.setAttribute('aria-invalid', 'true');
      input.classList.add('input-error');
      if (err) input.setAttribute('aria-describedby', err.id);
      firstBad ??= input;
    } else {
      if (err) {
        err.textContent = '';
        err.classList.remove('visible');
      }
      input.removeAttribute('aria-invalid');
      input.classList.remove('input-error');
    }
  }
  firstBad?.focus();
  return !firstBad;
}

if (typeof window !== 'undefined') {
  window.CarePulseValidate = { rules, validate };
}
