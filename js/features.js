/**
 * CarePulse Enhanced Features Engine
 * 1. Animated Statistics Counter
 * 2. Symptom Checker Engine
 * 3. Doctor Ratings & Reviews Engine
 * 4. First-Visit Onboarding Tour Engine
 * 5. Patient Testimonials Renderer
 */

/* ============================================================
   1. ANIMATED STATISTICS COUNTER
   ============================================================ */
(function initStatCounters() {
  const DURATION = 1400;

  function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

  function animateCount(el) {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    if (isNaN(target)) return;
    el.classList.add('counted');
    el.closest('.hero-stat-item')?.classList.add('counted');
    const start = performance.now();
    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / DURATION, 1);
      el.textContent = Math.round(easeOutCubic(progress) * target) + suffix;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target + suffix;
    }
    requestAnimationFrame(step);
  }

  function observeStats() {
    const statEls = document.querySelectorAll('.stat-number[data-count]');
    if (!statEls.length) return;
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !entry.target.dataset.animated) {
            entry.target.dataset.animated = '1';
            animateCount(entry.target);
          }
        });
      }, { threshold: 0.6 });
      statEls.forEach(el => io.observe(el));
    } else {
      statEls.forEach(el => { el.dataset.animated = '1'; animateCount(el); });
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', observeStats);
  else observeStats();
})();


/* ============================================================
   2. SYMPTOM CHECKER ENGINE
   ============================================================ */
const SymptomCheckerEngine = (function () {
  let selectedArea = null;
  let selectedSeverity = null;

  const SPECIALTY_MAP = {
    heart:   { icon: '\u2764\ufe0f', dept: 'Cardiology Department',         desc: 'Your symptoms suggest a cardiac evaluation. Our interventional cardiologists offer ECG, 2D Echo and stress tests.', docId: 'cardiology' },
    bones:   { icon: '\U0001f9b4', dept: 'Orthopedics & Joint Surgery',     desc: 'Bone and joint discomfort should be assessed by our senior orthopedic surgeon for early diagnosis.', docId: 'orthopedics' },
    skin:    { icon: '\u2728',      dept: 'Dermatology & Cosmetology',       desc: 'Skin, hair, and nail concerns are best evaluated by our consultant dermatologist.', docId: 'dermatologist' },
    stomach: { icon: '\U0001fac1', dept: 'General Medicine / Gastro',       desc: 'Abdominal and digestive symptoms warrant thorough examination by our general physicians.', docId: 'general' },
    child:   { icon: '\U0001f476', dept: 'Pediatrics (Child Specialist)',   desc: 'Our senior pediatricians provide comprehensive child health care from newborns to teenagers.', docId: 'pediatrician' },
    womens:  { icon: '\U0001f338', dept: 'Obstetrics & Gynecology',         desc: 'Our gynecologists specialize in reproductive health, prenatal care, and women\'s wellness.', docId: 'gynecology' },
    ent:     { icon: '\U0001f442', dept: 'ENT (Ear, Nose & Throat)',        desc: 'Hearing, sinus, and throat conditions are handled by our specialist ENT surgeon.', docId: 'ent' },
    eye:     { icon: '\U0001f441\ufe0f', dept: 'Ophthalmology & Eye Care', desc: 'Vision problems and eye conditions are managed by our ophthalmology team.', docId: 'ophthalmology' },
    dental:  { icon: '\U0001f9b7', dept: 'Dental & Oral Surgery',           desc: 'Our cosmetic and restorative dentists handle fillings, extractions, and implant procedures.', docId: 'dentist' },
    general: { icon: '\U0001fa7a', dept: 'General Medicine',                desc: 'Our senior consultant physicians manage fever, fatigue, diabetes, and general health assessments.', docId: 'general' }
  };

  const EMERGENCY_RESULT = { icon: '\U0001f6a8', dept: 'Emergency & Trauma (24/7)', desc: 'Your symptoms suggest URGENT evaluation. Please proceed to our 24/7 Emergency Bay or call Ambulance 108 immediately.', isEmergency: true };

  function showStep(stepId) {
    document.querySelectorAll('.symptom-tree-step').forEach(s => s.classList.remove('active'));
    document.getElementById('symptom-step-' + stepId)?.classList.add('active');
    const dots = document.querySelectorAll('#symptom-progress .symptom-progress-dot');
    const map = { '1': 0, '2': 1, 'result': 2 };
    const active = map[String(stepId)] ?? 2;
    dots.forEach((d, i) => {
      d.classList.remove('active', 'done');
      if (i < active) d.classList.add('done');
      else if (i === active) d.classList.add('active');
    });
  }

  function showResult() {
    const result = selectedSeverity === 'emergency' ? EMERGENCY_RESULT : (SPECIALTY_MAP[selectedArea] || SPECIALTY_MAP.general);
    document.getElementById('symptom-result-icon').textContent = result.icon;
    document.getElementById('symptom-result-dept').textContent = result.dept;
    document.getElementById('symptom-result-desc').textContent = result.desc;
    const bookBtn = document.getElementById('symptom-book-btn');
    const docBtn  = document.getElementById('symptom-doc-btn');
    if (result.isEmergency) {
      bookBtn.textContent = '\U0001f6a8 Call Emergency (108)';
      bookBtn.dataset.action = 'open-emergency-sos';
      if (docBtn) docBtn.style.display = 'none';
    } else {
      bookBtn.textContent = 'Book Appointment \u279c';
      bookBtn.dataset.action = 'open-booking-layer';
      if (result.docId) bookBtn.dataset.id = result.docId;
      if (docBtn) { docBtn.style.display = ''; if (result.docId) docBtn.dataset.specialty = result.docId; }
    }
    showStep('result');
  }

  function open() {
    const modal = document.getElementById('symptom-checker-modal');
    if (!modal) return;
    selectedArea = null; selectedSeverity = null;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    showStep('1');
  }

  function close() {
    document.getElementById('symptom-checker-modal')?.classList.remove('active');
    document.body.style.overflow = '';
  }

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.symptom-option-btn');
    if (btn && document.getElementById('symptom-checker-modal')?.classList.contains('active')) {
      btn.closest('.symptom-options-grid')?.querySelectorAll('.symptom-option-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      if (btn.dataset.area) selectedArea = btn.dataset.area;
      if (btn.dataset.severity) selectedSeverity = btn.dataset.severity;
      setTimeout(() => {
        if (btn.dataset.next === 'result') showResult();
        else if (btn.dataset.next) showStep(btn.dataset.next);
      }, 220);
    }
    if (e.target.closest('#symptom-back-btn-2')) showStep('1');
    if (e.target.closest('#symptom-back-btn-result')) { if (selectedArea) showStep('2'); else showStep('1'); }
  });

  return { open, close };
})();
window.SymptomCheckerEngine = SymptomCheckerEngine;


/* ============================================================
   3. DOCTOR RATINGS & REVIEWS ENGINE
   ============================================================ */
const DoctorRatingsEngine = (function () {
  const STORAGE_KEY = 'carepulse_doctor_reviews_v1';
  let currentDoctorId = null;
  let pendingRating = 0;

  const DEFAULTS = {
    'dr-rajesh-sharma': [
      { name: 'Harpreet K.', rating: 5, text: 'Very thorough and patient. Explained everything clearly.', date: '2 days ago' },
      { name: 'Simran D.',   rating: 4, text: 'Good consultation. Waiting time was minimal with the token system.', date: '1 week ago' }
    ],
    'dr-manpreet-singh': [
      { name: 'Suresh P.', rating: 5, text: 'Exceptional cardiologist. Explained my ECG results simply.', date: '3 days ago' },
      { name: 'Ranjit K.', rating: 5, text: 'Very reassuring. Highly recommend for cardiac concerns.', date: '5 days ago' }
    ]
  };

  function load() { try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch { return {}; } }
  function save(d) { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(d)); } catch {} }
  function getReviews(id) { return [...(load()[id] || []), ...(DEFAULTS[id] || [])]; }
  function getAvg(id) { const r = getReviews(id); return r.length ? Math.round(r.reduce((a, x) => a + x.rating, 0) / r.length * 10) / 10 : 4.8; }

  function stars(n) { return Array.from({length:5},(_,i)=>`<span class="star${i<Math.round(n)?'':' empty'}">&#9733;</span>`).join(''); }

  function injectCards() {
    document.querySelectorAll('[data-doctor-id]').forEach(card => {
      const id = card.dataset.doctorId;
      if (!id || card.querySelector('.doctor-rating-stars')) return;
      const avg = getAvg(id); const cnt = getReviews(id).length;
      const el = document.createElement('div');
      el.className = 'doctor-rating-stars';
      el.innerHTML = `${stars(avg)}<span class="rating-count">${avg} (${cnt})</span><button class="rating-badge" data-action="open-review-modal" data-doc-id="${id}" style="margin-left:0.35rem;cursor:pointer;">&#9733; Rate</button>`;
      const nm = card.querySelector('h3, .doctor-name, .doc-name');
      if (nm) nm.after(el); else card.prepend(el);
    });
  }

  function renderList(id) {
    const panel = document.getElementById('doctor-reviews-panel');
    if (!panel) return;
    const revs = getReviews(id);
    if (!revs.length) { panel.innerHTML = '<p style="text-align:center;color:var(--slate-400);padding:1rem;font-size:0.875rem;">No reviews yet. Be the first!</p>'; return; }
    panel.innerHTML = `<h4 style="font-size:0.875rem;font-weight:700;color:var(--dark);margin:1rem 0 0.5rem;">Recent Reviews (Demo)</h4>` +
      revs.map(r => `<div class="doctor-review-item"><div class="review-item-header"><span class="review-item-name">${r.name}</span><span>${stars(r.rating)}</span><span class="review-item-date">${r.date}</span></div><div class="review-item-text">${r.text}</div></div>`).join('');
  }

  function openModal(id) {
    currentDoctorId = id; pendingRating = 0;
    const modal = document.getElementById('doctor-review-modal');
    if (!modal) return;
    modal.classList.add('active'); document.body.style.overflow = 'hidden';
    document.querySelectorAll('#review-star-row .review-star-btn').forEach(b => b.classList.remove('lit'));
    const t = document.getElementById('review-text-input'); if (t) t.value = '';
    renderList(id);
  }

  function closeModal() {
    document.getElementById('doctor-review-modal')?.classList.remove('active');
    document.body.style.overflow = ''; currentDoctorId = null; pendingRating = 0;
  }

  function submit() {
    if (!currentDoctorId || !pendingRating) { if (typeof window.showToast === 'function') window.showToast('Please select a star rating first!', 'error'); return; }
    const text = document.getElementById('review-text-input')?.value.trim() || '';
    const stored = load();
    if (!stored[currentDoctorId]) stored[currentDoctorId] = [];
    stored[currentDoctorId].unshift({ name: 'You (Demo)', rating: pendingRating, text: text || '(No comment)', date: 'Just now' });
    save(stored);
    if (typeof window.showToast === 'function') window.showToast(`\u2b50 ${pendingRating}-star review saved (demo).`, 'success');
    closeModal();
    setTimeout(injectCards, 300);
  }

  document.addEventListener('click', (e) => {
    const starBtn = e.target.closest('#review-star-row .review-star-btn');
    if (starBtn) {
      pendingRating = parseInt(starBtn.dataset.star, 10);
      document.querySelectorAll('#review-star-row .review-star-btn').forEach((b, i) => b.classList.toggle('lit', i < pendingRating));
    }
  });

  const dm = document.getElementById('doctors-modal');
  if (dm) new MutationObserver(injectCards).observe(dm, { childList: true, subtree: true });

  return { openModal, closeModal, submit, injectCards };
})();
window.DoctorRatingsEngine = DoctorRatingsEngine;


/* ============================================================
   4. FIRST-VISIT ONBOARDING TOUR ENGINE
   ============================================================ */
const FeatureTourEngine = (function () {
  const TOUR_KEY = 'carepulse_tour_done_v1';
  let currentStep = 0; let overlayEl = null; let spotlightEl = null; let tooltipEl = null;

  const STEPS = [
    { targetId: 'quick-services', title: '\u26a1 Quick Services Hub',       desc: 'Access all hospital services in one place \u2014 book appointments, track tokens, check beds, order medicines and much more.', pos: 'bottom' },
    { targetId: 'booking',        title: '\U0001f4c5 Book a Doctor Slot',   desc: 'Click this tile to instantly reserve a confirmed OPD slot with a real-time digital token. No waiting in queues!', pos: 'bottom' },
    { targetId: 'queue',          title: '\u23f1\ufe0f Live OPD Queue',      desc: 'See real-time waiting status for every doctor chamber, with estimated wait times and current token numbers.', pos: 'bottom' },
    { targetId: 'symptom-checker-fab', title: '\U0001fa7a Symptom Checker', desc: 'Not sure which doctor to see? Use our Symptom Checker to get an instant department recommendation based on your symptoms.', pos: 'top' },
    { targetId: 'sidebar-palette-select', title: '\U0001f3a8 Personalize', desc: 'Switch between 4 color palettes, toggle dark mode, adjust font size, or switch to Hindi / Punjabi.', pos: 'bottom' }
  ];

  function createEls() {
    overlayEl = document.createElement('div'); overlayEl.className = 'tour-overlay'; overlayEl.id = 'tour-overlay';
    spotlightEl = document.createElement('div'); spotlightEl.className = 'tour-spotlight';
    overlayEl.appendChild(spotlightEl); document.body.appendChild(overlayEl);
    tooltipEl = document.createElement('div'); tooltipEl.className = 'tour-tooltip'; tooltipEl.id = 'tour-tooltip';
    document.body.appendChild(tooltipEl);
  }

  function updateSpot(el) {
    if (!el || !spotlightEl) return;
    const r = el.getBoundingClientRect(); const P = 8;
    spotlightEl.style.cssText = `top:${r.top+window.scrollY-P}px;left:${r.left-P}px;width:${r.width+P*2}px;height:${r.height+P*2}px;`;
  }

  function renderTip(step, idx, total) {
    if (!tooltipEl) return;
    const isLast = idx === total - 1;
    const dots = Array.from({length:total},(_,i)=>`<div class="tour-progress-dot ${i<idx?'done':i===idx?'active':''}"></div>`).join('');
    tooltipEl.innerHTML = `<div class="tour-progress-dots">${dots}</div><div class="tour-step-badge">STEP ${idx+1} / ${total}</div><div class="tour-title">${step.title}</div><div class="tour-desc">${step.desc}</div><div class="tour-actions"><button class="tour-next-btn" id="tour-next-btn">${isLast?'\u2705 Finish Tour':'Next \u279c'}</button><button class="tour-skip-btn" id="tour-skip-btn">Skip Tour</button></div>`;
    document.getElementById('tour-next-btn')?.addEventListener('click', () => isLast ? end(true) : go(idx+1));
    document.getElementById('tour-skip-btn')?.addEventListener('click', () => end(false));
  }

  function posTip(el, pos) {
    if (!tooltipEl || !el) return;
    const r = el.getBoundingClientRect(); const P = 16;
    tooltipEl.className = 'tour-tooltip arrow-' + (pos==='top'?'bottom':'top');
    if (pos==='bottom') { tooltipEl.style.top=(r.bottom+window.scrollY+P)+'px'; tooltipEl.style.left=Math.max(16,r.left-10)+'px'; }
    else { tooltipEl.style.top=(r.top+window.scrollY-tooltipEl.offsetHeight-P)+'px'; tooltipEl.style.left=Math.max(16,r.left-10)+'px'; }
    const tr = tooltipEl.getBoundingClientRect();
    if (tr.right > window.innerWidth-16) tooltipEl.style.left=(window.innerWidth-16-tooltipEl.offsetWidth)+'px';
  }

  function go(idx) {
    if (idx >= STEPS.length) { end(true); return; }
    currentStep = idx;
    const step = STEPS[idx]; const el = document.getElementById(step.targetId);
    if (!el) { go(idx+1); return; }
    el.scrollIntoView({ behavior:'smooth', block:'center' });
    setTimeout(() => { updateSpot(el); renderTip(step, idx, STEPS.length); posTip(el, step.pos); }, 400);
  }

  function end(done) {
    if (done) {
      try { localStorage.setItem(TOUR_KEY, '1'); } catch {}
      if (typeof window.showToast === 'function') window.showToast('\U0001f389 Tour complete! You\'re all set to explore CarePulse.', 'success');
    }
    overlayEl?.remove(); tooltipEl?.remove(); overlayEl = null; tooltipEl = null;
  }

  function startTour() { if (overlayEl) end(false); createEls(); go(0); }

  function autoLaunch() {
    try { if (!localStorage.getItem(TOUR_KEY)) setTimeout(startTour, 3000); } catch {}
  }

  return { startTour, autoLaunch };
})();
window.FeatureTourEngine = FeatureTourEngine;
FeatureTourEngine.autoLaunch();


/* ============================================================
   5. PATIENT TESTIMONIALS RENDERER
   ============================================================ */
(function renderTestimonials() {
  const DATA = [
    { name:'Harpreet Kaur',  initials:'HK', dept:'Cardiology OPD',     rating:5, date:'2 days ago',   text:'The token system is revolutionary! I booked online, arrived at my exact time, and was seen within 8 minutes. Dr. Singh explained my ECG with such patience.' },
    { name:'Vivek Malhotra', initials:'VM', dept:'Orthopedics',         rating:5, date:'4 days ago',   text:'After struggling with knee pain for 2 years, the orthopedic team gave me a clear diagnosis and a treatment plan. The OPD experience was seamless.' },
    { name:'Simran Dhaliwal',initials:'SD', dept:'Pediatrics',          rating:5, date:'1 week ago',   text:'Brought my 2-year-old with fever. The pediatrician was incredibly gentle and thorough. Live queue updates on my phone made the wait stress-free.' },
    { name:'Rakesh Kumar',   initials:'RK', dept:'General Medicine',    rating:4, date:'10 days ago',  text:'Very organized hospital. Lab reports were ready within hours and available digitally. The WhatsApp share feature for the token pass is a great touch.' },
    { name:'Anita Sharma',   initials:'AS', dept:'Dermatology',         rating:5, date:'2 weeks ago',  text:'Finally found a dermatologist who listens! Clear skincare plan and no unnecessary tests. The indoor wayfinder helped me find the clinic on 2nd floor.' },
    { name:'Gurdeep Singh',  initials:'GS', dept:'Dental OPD',          rating:5, date:'3 weeks ago',  text:'Root canal done painlessly by Dr. Mehra. Digital prescription was on my phone instantly via tele-consult follow-up. Modern healthcare at its best!' }
  ];

  function stars(n) { return Array.from({length:5},(_,i)=>`<span class="star${i<n?'':' empty'}">&#9733;</span>`).join(''); }

  function init() {
    const grid = document.getElementById('testimonials-grid');
    if (!grid) return;
    grid.innerHTML = DATA.map(t => `
      <div class="testimonial-card">
        <div class="testimonial-stars">${stars(t.rating)}</div>
        <p class="testimonial-text">&ldquo;${t.text}&rdquo;</p>
        <div class="testimonial-author">
          <div class="testimonial-avatar">${t.initials}</div>
          <div>
            <div class="testimonial-name">${t.name}</div>
            <div class="testimonial-meta">${t.date}</div>
            <span class="testimonial-tag">&#10003; ${t.dept}</span>
          </div>
        </div>
      </div>
    `).join('');
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();


/* ============================================================
   6. DISPATCHER HOOKS
   ============================================================ */
document.addEventListener('click', function (e) {
  const target = e.target.closest('[data-action]');
  if (!target) return;
  switch (target.dataset.action) {
    case 'open-symptom-checker':  SymptomCheckerEngine.open();  break;
    case 'close-symptom-checker': SymptomCheckerEngine.close(); break;
    case 'open-review-modal':     DoctorRatingsEngine.openModal(target.dataset.docId || 'dr-rajesh-sharma'); break;
    case 'close-review-modal':    DoctorRatingsEngine.closeModal(); break;
    case 'submit-doctor-review':  DoctorRatingsEngine.submit(); break;
    case 'start-feature-tour':    FeatureTourEngine.startTour(); break;
  }
});

// Ctrl+Shift+T = launch tour
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.shiftKey && e.key === 'T') { e.preventDefault(); FeatureTourEngine.startTour(); }
});
