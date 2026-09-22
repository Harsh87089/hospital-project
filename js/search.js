// CarePulse Spotlight Quick Search & ScrollSpy Engines
import { DOCTORS } from './config.js';

const CategoryScrollSpy = {
  init() {
    const scroller = document.getElementById('category-chips-scroller');
    if (!scroller) return;

    const chips = scroller.querySelectorAll('.category-chip');
    if (!chips.length) return;

    // Smooth click handler with visual feedback pulse
    chips.forEach(chip => {
      chip.addEventListener('click', (e) => {
        const targetId = chip.getAttribute('data-target') || (chip.getAttribute('href') ? chip.getAttribute('href').replace(/^#/, '').split('?')[0] : null);
        if (!targetId) return;

        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          if (chip.tagName === 'A' || !chip.getAttribute('data-action')) {
            e.preventDefault();
          }
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });

          // Trigger target pulse highlight
          targetEl.classList.remove('highlight-target');
          void targetEl.offsetWidth; // force DOM reflow
          targetEl.classList.add('highlight-target');
          setTimeout(() => targetEl.classList.remove('highlight-target'), 1500);

          chips.forEach(c => c.classList.remove('active'));
          chip.classList.add('active');
        }
      });
    });

    // ScrollSpy observer
    const sectionIds = Array.from(chips)
      .map(c => c.getAttribute('data-target') || (c.getAttribute('href') ? c.getAttribute('href').replace(/^#/, '').split('?')[0] : null))
      .filter(Boolean);

    const uniqueIds = Array.from(new Set(sectionIds));

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            chips.forEach(chip => {
              const chipTarget = chip.getAttribute('data-target') || (chip.getAttribute('href') ? chip.getAttribute('href').replace(/^#/, '').split('?')[0] : null);
              const isMatch = chipTarget === id;
              if (isMatch) {
                chips.forEach(c => c.classList.remove('active'));
                chip.classList.add('active');
                chip.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
              }
            });
          }
        });
      }, {
        rootMargin: '-15% 0px -65% 0px',
        threshold: 0.1
      });

      uniqueIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    }
  }
};

window.CategoryScrollSpy = CategoryScrollSpy;

// ==========================================================================
// 11. Universal Spotlight Search Engine (Ctrl + K)
// ==========================================================================


const SpotlightSearchEngine = {
  isOpen: false,
  items: [],
  selectedIndex: 0,

  init() {
    this.buildIndex();
    this.bindEvents();
  },

  buildIndex() {
    this.items = [];

    // 1. Doctors from DOCTORS array
    if (typeof DOCTORS !== 'undefined' && Array.isArray(DOCTORS)) {
      DOCTORS.forEach(doc => {
        this.items.push({
          type: 'Doctor',
          category: 'Specialist Doctors',
          title: doc.name,
          sub: `${doc.specialty} • ${doc.qualification || 'Senior Consultant'} • Room ${doc.room || 'OPD'}`,
          icon: '👨‍⚕️',
          action: () => {
            openBookingLayer(doc.id);
          }
        });
      });
    }

    // 2. Clinical Departments & Services
    const services = [
      { title: 'General Medicine & Adult OPD', sub: 'Primary consultations, chronic illness & acute care', icon: '🩺', action: () => openLiveQueueModal() },
      { title: 'Pediatrics & Child Wellness', sub: 'Vaccination, neonatal care & infant triage', icon: '👶', action: () => openLiveQueueModal() },
      { title: 'Dermatology & Skin Clinic', sub: 'Laser, allergy treatment & cosmetic dermatology', icon: '🔬', action: () => openLiveQueueModal() },
      { title: 'Dental & Maxillofacial Care', sub: 'Root canals, tooth extractions & orthodontics', icon: '🦷', action: () => openLiveQueueModal() },
      { title: 'Bed & ICU Availability Tracker', sub: 'Live triage beds, ventilators & blood bank stocks', icon: '🛏️', action: () => openBedsModal() },
      { title: 'Preventive Health Packages', sub: 'Full body checkup packages from ₹999 with home pickup', icon: '📦', action: () => openPackagesModal() },
      { title: 'Download Lab Reports (UHID)', sub: 'Instant certified PDF lab diagnostic reports', icon: '📄', action: () => openLabReportModal('UHID-98214') },
      { title: '24/7 Doorstep Pharmacy Delivery', sub: 'Upload doctor prescription for 2-hour delivery', icon: '💊', action: () => openPharmacyModal() },
      { title: 'Cashless Insurance & TPA Desk', sub: 'Ayushman Bharat, CGHS & private insurance claims', icon: '🛡️', action: () => openInsuranceModal() },
      { title: 'Emergency Trauma Hotline & Ambulance 108', sub: '24/7 emergency trauma triage & priority ambulance', icon: '🚨', action: () => openEmergencyModal() },
      { title: 'Clinical Health & BMI Risk Calculator', sub: 'Interactive BMI, blood pressure category & clinical score', icon: '📊', action: () => openHealthCalculator() }
    ];

    services.forEach(s => {
      this.items.push({
        type: 'Service',
        category: 'Hospital Services',
        title: s.title,
        sub: s.sub,
        icon: s.icon,
        action: s.action
      });
    });

    // 3. Health Packages
    if (typeof HEALTH_PACKAGES !== 'undefined' && Array.isArray(HEALTH_PACKAGES)) {
      HEALTH_PACKAGES.forEach(pkg => {
        this.items.push({
          type: 'Package',
          category: 'Health Packages',
          title: pkg.name,
          sub: `${pkg.testsCount || 45} lab tests • ₹${pkg.price} (Special Offer)`,
          icon: '🛡️',
          action: () => openPackagesModal()
        });
      });
    }

    // 4. Quick Actions
    this.items.push(
      {
        type: 'Action',
        category: 'Quick Actions',
        title: 'Book Doctor Consultation',
        sub: 'Instant doctor OPD reservation with live token confirmation',
        icon: '⚡',
        action: () => openBookingLayer()
      },
      {
        type: 'Action',
        category: 'Quick Actions',
        title: 'Track My Active Queue Token',
        sub: 'Verify queue position, doctor room & estimated wait time',
        icon: '⏱️',
        action: () => openTrackTokenModal()
      },
      {
        type: 'Action',
        category: 'Quick Actions',
        title: 'My Booked Tokens & Slips',
        sub: 'View, reprint or share appointment tokens',
        icon: '📋',
        action: () => openMyBookingsModal()
      },
      {
        type: 'Action',
        category: 'Quick Actions',
        title: 'Toggle Dark / Light Theme Mode',
        sub: 'Switch between light and dark display modes',
        icon: '🌙',
        action: () => toggleTheme()
      }
    );
  },

  bindEvents() {
    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        this.toggle();
      } else if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });

    const input = document.getElementById('spotlight-search-input');
    if (input) {
      input.addEventListener('input', (e) => this.renderResults(e.target.value.trim()));
      input.addEventListener('keydown', (e) => {
        const results = document.querySelectorAll('.spotlight-item');
        if (!results.length) return;

        if (e.key === 'ArrowDown') {
          e.preventDefault();
          this.selectedIndex = (this.selectedIndex + 1) % results.length;
          this.updateSelection(results);
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          this.selectedIndex = (this.selectedIndex - 1 + results.length) % results.length;
          this.updateSelection(results);
        } else if (e.key === 'Enter') {
          e.preventDefault();
          if (results[this.selectedIndex]) {
            results[this.selectedIndex].click();
          }
        }
      });
    }

    const backdrop = document.getElementById('spotlight-search-modal');
    if (backdrop) {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) this.close();
      });
    }
  },

  updateSelection(elements) {
    elements.forEach((el, idx) => {
      el.classList.toggle('highlighted', idx === this.selectedIndex);
      if (idx === this.selectedIndex) {
        el.scrollIntoView({ block: 'nearest' });
      }
    });
  },

  open() {
    const modal = document.getElementById('spotlight-search-modal');
    const input = document.getElementById('spotlight-search-input');
    if (modal) {
      modal.classList.add('open');
      this.isOpen = true;
      if (input) {
        input.value = '';
        setTimeout(() => input.focus(), 80);
      }
      this.renderResults('');
    }
  },

  close() {
    const modal = document.getElementById('spotlight-search-modal');
    if (modal) {
      modal.classList.remove('open');
      this.isOpen = false;
    }
  },

  toggle() {
    if (this.isOpen) this.close();
    else this.open();
  },

  renderResults(query) {
    const container = document.getElementById('spotlight-results-container');
    if (!container) return;

    const q = query.toLowerCase();
    const filtered = this.items.filter(item => {
      if (!q) return true;
      return item.title.toLowerCase().includes(q) ||
        item.sub.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q);
    });

    if (!filtered.length) {
      container.innerHTML = `
        <div style="text-align: center; padding: 2.5rem 1rem; color: var(--slate-400);">
          <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🔍</div>
          <div style="font-weight: 700; color: var(--dark); font-size: 0.95rem;">No matching doctors or services found</div>
          <div style="font-size: 0.8rem; margin-top: 0.25rem;">Try searching for "Rajesh", "Pediatric", "ICU", "Blood test", or "Token"</div>
        </div>
      `;
      return;
    }

    // Group items
    const groups = {};
    filtered.slice(0, 15).forEach(item => {
      if (!groups[item.category]) groups[item.category] = [];
      groups[item.category].push(item);
    });

    let html = '';
    let globalIndex = 0;
    for (const [cat, items] of Object.entries(groups)) {
      html += `<div class="spotlight-group-label">${cat}</div>`;
      items.forEach(item => {
        const isSelected = globalIndex === 0;
        html += `
          <div class="spotlight-item ${isSelected ? 'highlighted' : ''}" data-idx="${globalIndex}">
            <div class="spotlight-item-icon">${item.icon}</div>
            <div class="spotlight-item-content">
              <div class="spotlight-item-title">${item.title}</div>
              <div class="spotlight-item-sub">${item.sub}</div>
            </div>
            <div class="spotlight-item-action">Jump ↗</div>
          </div>
        `;
        globalIndex++;
      });
    }

    container.innerHTML = html;
    this.selectedIndex = 0;

    const renderedItems = container.querySelectorAll('.spotlight-item');
    let itemIdx = 0;
    for (const [cat, items] of Object.entries(groups)) {
      items.forEach(item => {
        const el = renderedItems[itemIdx];
        if (el) {
          el.addEventListener('click', () => {
            SpotlightSearchEngine.close();
            item.action();
          });
        }
        itemIdx++;
      });
    }
  }
};

window.SpotlightSearchEngine = SpotlightSearchEngine;
const openSpotlightSearch = window.openSpotlightSearch = () => SpotlightSearchEngine.open();
const closeSpotlightSearch = window.closeSpotlightSearch = () => SpotlightSearchEngine.close();

// ==========================================================================
// 12. Persistent Active Token Floating Mini-Tracker
// ==========================================================================


const setActiveDock = window.setActiveDock = function (tabName) {
  document.querySelectorAll('.dock-item').forEach(item => item.classList.remove('active'));
  const el = document.getElementById(`dock-item-${tabName}`);
  if (el) el.classList.add('active');
};

// ==========================================================================
// 14. Real OTP Delivery Gateway (EmailJS for Gmail & Firebase for SMS)
// ==========================================================================


export {
  CategoryScrollSpy,
  SpotlightSearchEngine,
  openSpotlightSearch,
  closeSpotlightSearch,
  setActiveDock
};
