// CarePulse Campus Indoor GPS & Interactive Wayfinder Engine
import { DEMO_WHATSAPP, DEMO_PHONE } from './config.js';
import { showToast, escapeHtml } from './utils.js';

const CampusWayfinderEngine = {
  currentFloor: 'G',
  startPoint: 'main-gate',
  destPoint: 'room-101',
  wheelchairMode: false,

  floors: {
    'G': {
      title: 'Ground Floor (Level 0)',
      sub: 'Out-Patient Department (OPD), Casualty & Pharmacy',
      rooms: [
        { id: 'main-gate', label: 'Main Gate 1', sub: 'Reception & Helpdesk', x: 40, y: 350, w: 120, h: 70, fill: '#1e293b', stroke: '#10b981', type: 'entrance' },
        { id: 'casualty-ramp', label: 'Casualty Ramp', sub: '24/7 Emergency Entry', x: 40, y: 90, w: 120, h: 70, fill: '#1e293b', stroke: '#ef4444', type: 'emergency' },
        { id: 'triage', label: 'Triage Bay', sub: 'Emergency Resus & Beds', x: 190, y: 90, w: 110, h: 70, fill: '#1e293b', stroke: '#ef4444', type: 'emergency' },
        { id: 'room-101', label: 'Room 101', sub: 'Dr. Rajesh Sharma (Med)', x: 330, y: 90, w: 120, h: 70, fill: '#1e293b', stroke: '#3b82f6', type: 'doctor' },
        { id: 'room-104', label: 'Room 104', sub: 'Dr. Priya Nair (Cardio)', x: 480, y: 90, w: 120, h: 70, fill: '#1e293b', stroke: '#3b82f6', type: 'doctor' },
        { id: 'pharmacy', label: 'Pharmacy', sub: '24/7 Doorstep Dispense', x: 220, y: 350, w: 140, h: 70, fill: '#1e293b', stroke: '#10b981', type: 'service' },
        { id: 'lift-lobby', label: 'Lift & Stairs', sub: 'Vertical Transit Lobby', x: 480, y: 350, w: 120, h: 70, fill: '#1e293b', stroke: '#8b5cf6', type: 'transit' }
      ],
      nodes: {
        'main-gate': { x: 100, y: 350 },
        'casualty-ramp': { x: 100, y: 160 },
        'triage': { x: 245, y: 160 },
        'room-101': { x: 390, y: 160 },
        'room-104': { x: 540, y: 160 },
        'pharmacy': { x: 290, y: 350 },
        'lift-lobby': { x: 540, y: 350 },
        'corridor-center': { x: 340, y: 250 },
        'corridor-left': { x: 100, y: 250 },
        'corridor-right': { x: 540, y: 250 }
      }
    },
    '1': {
      title: '1st Floor (Level 1)',
      sub: 'Diagnostics, Pathology & Blood Bank',
      rooms: [
        { id: 'lift-lobby-1', label: 'Lift & Stairs', sub: 'From Ground Floor', x: 480, y: 350, w: 120, h: 70, fill: '#1e293b', stroke: '#8b5cf6', type: 'transit' },
        { id: 'pathology', label: 'Pathology Lab', sub: 'Sample Collection Desk', x: 60, y: 90, w: 150, h: 80, fill: '#1e293b', stroke: '#3b82f6', type: 'lab' },
        { id: 'blood-bank', label: 'Blood Bank', sub: 'Component Unit & Testing', x: 240, y: 90, w: 150, h: 80, fill: '#1e293b', stroke: '#ef4444', type: 'emergency' },
        { id: 'radiology', label: 'Radiology Suite', sub: 'MRI & 128-Slice CT Scan', x: 60, y: 340, w: 160, h: 80, fill: '#1e293b', stroke: '#3b82f6', type: 'lab' },
        { id: 'daycare', label: 'Day Care Ward', sub: 'Infusion & Dialysis Unit', x: 250, y: 340, w: 140, h: 80, fill: '#1e293b', stroke: '#10b981', type: 'ward' }
      ],
      nodes: {
        'lift-lobby-1': { x: 540, y: 350 },
        'pathology': { x: 135, y: 170 },
        'blood-bank': { x: 315, y: 170 },
        'radiology': { x: 140, y: 340 },
        'daycare': { x: 320, y: 340 },
        'corridor-center-1': { x: 320, y: 255 },
        'corridor-right-1': { x: 540, y: 255 }
      }
    },
    '2': {
      title: '2nd Floor (Level 2)',
      sub: 'Modular Surgical OTs & Intensive Care Units',
      rooms: [
        { id: 'lift-lobby-2', label: 'Lift & Stairs', sub: 'Central Access', x: 480, y: 350, w: 120, h: 70, fill: '#1e293b', stroke: '#8b5cf6', type: 'transit' },
        { id: 'icu-a', label: 'ICU Bay A', sub: 'Intensive Critical Care', x: 60, y: 90, w: 150, h: 80, fill: '#1e293b', stroke: '#ef4444', type: 'emergency' },
        { id: 'ot-1', label: 'OT Complex 1', sub: 'Modular Laminar OT', x: 240, y: 90, w: 150, h: 80, fill: '#1e293b', stroke: '#06b6d4', type: 'surgical' },
        { id: 'cardiac-ccu', label: 'Coronary CCU', sub: 'Cardiac Intensive Unit', x: 60, y: 340, w: 160, h: 80, fill: '#1e293b', stroke: '#ef4444', type: 'emergency' },
        { id: 'recovery-bay', label: 'Recovery Bay', sub: 'Post-Op Observation', x: 250, y: 340, w: 140, h: 80, fill: '#1e293b', stroke: '#10b981', type: 'ward' }
      ],
      nodes: {
        'lift-lobby-2': { x: 540, y: 350 },
        'icu-a': { x: 135, y: 170 },
        'ot-1': { x: 315, y: 170 },
        'cardiac-ccu': { x: 140, y: 340 },
        'recovery-bay': { x: 320, y: 340 },
        'corridor-center-2': { x: 320, y: 255 },
        'corridor-right-2': { x: 540, y: 255 }
      }
    }
  },

  open(dest) {
    const modal = document.getElementById('campus-wayfinder-modal');
    if (!modal) return;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    if (dest) {
      this.destPoint = dest;
      const destSelect = document.getElementById('wayfinder-dest-select');
      if (destSelect) destSelect.value = dest;
      if (['pathology', 'blood-bank', 'radiology'].includes(dest)) {
        this.currentFloor = '1';
      } else if (['icu-a', 'ot-1', 'cardiac-ccu'].includes(dest)) {
        this.currentFloor = '2';
      } else {
        this.currentFloor = 'G';
      }
    }

    this.render();
  },

  close() {
    const modal = document.getElementById('campus-wayfinder-modal');
    if (modal) modal.classList.remove('active');
    document.body.style.overflow = '';
  },

  setFloor(floorKey) {
    this.currentFloor = floorKey;
    ['g', '1', '2'].forEach(f => {
      const btn = document.getElementById(`floor-tab-${f}`);
      if (btn) btn.classList.toggle('active', f.toUpperCase() === floorKey.toUpperCase());
    });
    this.render();
  },

  onRouteSelectChange() {
    const startSelect = document.getElementById('wayfinder-start-select');
    const destSelect = document.getElementById('wayfinder-dest-select');
    if (startSelect) this.startPoint = startSelect.value;
    if (destSelect) {
      this.destPoint = destSelect.value;
      if (['pathology', 'blood-bank', 'radiology'].includes(this.destPoint)) {
        this.currentFloor = '1';
      } else if (['icu-a', 'ot-1', 'cardiac-ccu'].includes(this.destPoint)) {
        this.currentFloor = '2';
      } else {
        this.currentFloor = 'G';
      }
      this.setFloor(this.currentFloor);
    }
    this.render();
  },

  toggleWheelchair(isChecked) {
    this.wheelchairMode = isChecked;
    this.render();
  },

  render() {
    const floor = this.floors[this.currentFloor] || this.floors['G'];
    const floorInd = document.getElementById('wayfinder-floor-indicator');
    if (floorInd) floorInd.innerText = `Floor: ${floor.title}`;

    const svgWrap = document.getElementById('wayfinder-svg-container');
    if (!svgWrap) return;

    const roomsSvg = floor.rooms.map(r => {
      const isTarget = r.id === this.destPoint;
      const isStart = r.id === this.startPoint;
      return `
        <g class="room-group" data-action="wayfinder-room-click" data-id="${r.id}">
          <rect class="room-rect ${isTarget ? 'active-target' : ''}" x="${r.x}" y="${r.y}" width="${r.w}" height="${r.h}" rx="8" style="${isStart ? 'stroke: #10b981; stroke-width: 2.5;' : ''}"></rect>
          <text class="room-label" x="${r.x + r.w / 2}" y="${r.y + r.h / 2 - 4}">${escapeHtml(r.label)}</text>
          <text class="room-sub-label" x="${r.x + r.w / 2}" y="${r.y + r.h / 2 + 12}">${escapeHtml(r.sub)}</text>
        </g>
      `;
    }).join('');

    const pathData = this.calculateRoutePath(floor);

    svgWrap.innerHTML = `
      <svg viewBox="0 0 640 460" xmlns="http://www.w3.org/2000/svg">
        <rect width="640" height="460" fill="#090e17" rx="12"></rect>
        <path d="M 40 250 L 600 250" stroke="#1e293b" stroke-width="28" stroke-linecap="round"></path>
        <path d="M 100 130 L 100 370" stroke="#1e293b" stroke-width="24" stroke-linecap="round"></path>
        <path d="M 540 130 L 540 370" stroke="#1e293b" stroke-width="24" stroke-linecap="round"></path>
        <path d="M 330 130 L 330 370" stroke="#1e293b" stroke-width="24" stroke-linecap="round"></path>
        ${roomsSvg}
        ${pathData ? `<path class="walking-path-line" d="${pathData.d}"></path>` : ''}
        ${pathData && pathData.startCircle ? pathData.startCircle : ''}
        ${pathData && pathData.endCircle ? pathData.endCircle : ''}
      </svg>
    `;

    this.updateRouteInstructions();
  },

  onRoomClick(roomId) {
    const destSelect = document.getElementById('wayfinder-dest-select');
    if (destSelect) {
      destSelect.value = roomId;
      this.destPoint = roomId;
      this.render();
    }
  },

  calculateRoutePath(floor) {
    let startCoords = { x: 100, y: 350 };
    let endCoords = { x: 390, y: 160 };

    if (this.currentFloor === 'G') {
      if (this.startPoint === 'casualty-ramp') startCoords = { x: 100, y: 160 };
      else if (this.startPoint === 'lift-lobby') startCoords = { x: 540, y: 350 };
      else startCoords = { x: 100, y: 350 };

      if (this.destPoint === 'room-101') endCoords = { x: 390, y: 160 };
      else if (this.destPoint === 'room-104') endCoords = { x: 540, y: 160 };
      else if (this.destPoint === 'pharmacy') endCoords = { x: 290, y: 350 };
      else if (this.destPoint === 'triage') endCoords = { x: 245, y: 160 };
      else endCoords = { x: 540, y: 350 };
    } else if (this.currentFloor === '1') {
      startCoords = { x: 540, y: 350 };
      if (this.destPoint === 'pathology') endCoords = { x: 135, y: 170 };
      else if (this.destPoint === 'blood-bank') endCoords = { x: 315, y: 170 };
      else if (this.destPoint === 'radiology') endCoords = { x: 140, y: 340 };
      else endCoords = { x: 320, y: 340 };
    } else {
      startCoords = { x: 540, y: 350 };
      if (this.destPoint === 'icu-a') endCoords = { x: 135, y: 170 };
      else if (this.destPoint === 'ot-1') endCoords = { x: 315, y: 170 };
      else if (this.destPoint === 'cardiac-ccu') endCoords = { x: 140, y: 340 };
      else endCoords = { x: 320, y: 340 };
    }

    const midY = 250;
    const d = `M ${startCoords.x} ${startCoords.y} L ${startCoords.x} ${midY} L ${endCoords.x} ${midY} L ${endCoords.x} ${endCoords.y}`;
    const startCircle = `<circle cx="${startCoords.x}" cy="${startCoords.y}" r="7" fill="#10b981" stroke="#ffffff" stroke-width="2.5"></circle>`;
    const endCircle = `<circle cx="${endCoords.x}" cy="${endCoords.y}" r="8" fill="#06b6d4" stroke="#ffffff" stroke-width="2.5"><animate attributeName="r" values="7;11;7" dur="1.5s" repeatCount="indefinite"/></circle>`;

    return { d, startCircle, endCircle };
  },

  updateRouteInstructions() {
    const list = document.getElementById('wayfinder-steps-list');
    const distEl = document.getElementById('route-metric-dist');
    const timeEl = document.getElementById('route-metric-time');
    const accessEl = document.getElementById('route-metric-access');
    if (!list) return;

    let dist = '45 m';
    let time = '1.5 min';
    let steps = [];

    const destName = document.querySelector(`#wayfinder-dest-select option[value="${this.destPoint}"]`)?.innerText || 'Selected Chamber';

    if (this.currentFloor === 'G') {
      dist = this.destPoint === 'pharmacy' ? '30 m' : '55 m';
      time = '1 min';
      steps = [
        { icon: '🚶', text: 'Start at Main Entrance Gate 1 (Reception Counter).' },
        { icon: '⬆️', text: 'Head straight down the central ground-floor corridor (15 meters).' },
        { icon: '↗️', text: `Turn right at the OPD corridor and proceed directly to ${destName}.` },
        { icon: '🏁', text: 'Destination arrived. Sanitize hands before entering.' }
      ];
    } else if (this.currentFloor === '1') {
      dist = '85 m';
      time = '2.5 min';
      steps = [
        { icon: '🚶', text: 'Start at Main Reception and proceed to Central Lift Lobby A.' },
        { icon: '🛗', text: this.wheelchairMode ? 'Take Lift A to 1st Floor (Level 1 Wheelchair Ramp accessible).' : 'Take Lift A or Stairway 2 to 1st Floor.' },
        { icon: '⬆️', text: `Exit lift and proceed down Diagnostics Wing towards ${destName}.` },
        { icon: '🏁', text: 'Arrival at testing chamber. Hand over your token slip.' }
      ];
    } else {
      dist = '95 m';
      time = '3 min';
      steps = [
        { icon: '🚶', text: 'Start at Ground Floor Casualty / Reception Desk.' },
        { icon: '🛗', text: 'Take Dedicated Critical Care Lift B to 2nd Floor (Surgical / ICU Wing).' },
        { icon: '⚠️', text: 'Sterile Barrier Zone: Wear visitor shoe covers and face mask.' },
        { icon: '🏁', text: `Arrive at ${destName}. Check-in with ICU Attendant desk.` }
      ];
    }

    if (distEl) distEl.innerText = dist;
    if (timeEl) timeEl.innerText = time;
    if (accessEl) accessEl.innerText = this.wheelchairMode ? 'Wheelchair OK' : 'Ramp / Lift';

    list.innerHTML = steps.map((s, i) => `
      <div class="step-card">
        <div class="step-number">${i + 1}</div>
        <div>
          <span style="font-weight: 700; margin-right: 4px;">${s.icon}</span>
          <span>${escapeHtml(s.text)}</span>
        </div>
      </div>
    `).join('');
  },

  speakDirections() {
    const destName = document.querySelector(`#wayfinder-dest-select option[value="${this.destPoint}"]`)?.innerText || 'your destination';
    const text = `Navigating to ${destName}. Proceed straight down the main corridor, follow the cyan walking line to your room. CarePulse staff is available at every corridor to assist you.`;
    
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      utter.rate = 0.95;
      utter.pitch = 1.0;
      utter.lang = 'en-IN';
      window.speechSynthesis.speak(utter);
      showToast('🔊 Speaking turn-by-turn indoor directions...', 'info');
    } else {
      showToast('Speech synthesis not supported in this browser.', 'warn');
    }
  },

  shareRouteWhatsApp() {
    const destName = document.querySelector(`#wayfinder-dest-select option[value="${this.destPoint}"]`)?.innerText || 'Destination';
    const floor = this.floors[this.currentFloor]?.title || 'Ground Floor';
    const msg = `*CarePulse Hospital Indoor Navigation (Demo)*%0A*Campus:* GT Road, Phagwara%0A*Destination:* ${destName}%0A*Floor:* ${floor}%0A*Demo Helpline:* ${DEMO_PHONE}%0A%0AShow this at reception desk for instant guide assistance.`;
    window.open(`https://wa.me/?text=${msg}`, '_blank');
  }
};

window.CampusWayfinderEngine = CampusWayfinderEngine;
const openWayfinderModal = window.openWayfinderModal = function (dest) { CampusWayfinderEngine.open(dest); };
const closeWayfinderModal = window.closeWayfinderModal = function () { CampusWayfinderEngine.close(); };

// ==========================================================================
// 22. DigitalHealthCardEngine (ABHA & Emergency Medical ID Pass)
// ==========================================================================


export {
  CampusWayfinderEngine,
  openWayfinderModal,
  closeWayfinderModal
};
