// CarePulse Utilities, QR & Barcode Generator
import { DEMO_PHONE, DOCTORS, SLOT_TEMPLATES, state } from './config.js';

function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Indian Standard Time (Asia/Kolkata = UTC+5:30) Date Utilities
function getISTDate(date = new Date()) {
  const utc = date.getTime() + (date.getTimezoneOffset() * 60000);
  return new Date(utc + (330 * 60000));
}

function getISTIsoDate(date = new Date()) {
  const ist = getISTDate(date);
  const y = ist.getFullYear();
  const m = String(ist.getMonth() + 1).padStart(2, '0');
  const d = String(ist.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

// Global reference for active tracker token


function playClinicChime() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    // Two-tone bell (E5 then B5)
    const playNote = (freq, startTime, duration) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.001, startTime);
      gain.gain.exponentialRampToValueAtTime(0.25, startTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + duration);
    };

    const now = ctx.currentTime;
    playNote(659.25, now, 0.6); // E5
    playNote(987.77, now + 0.25, 0.9); // B5
  } catch (e) {
    console.log('Audio note simulation notice:', e);
  }
}

// --- Toast System (XSS-Safe DOM Construction) ---
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-live', 'polite');

  let icon = 'ℹ️';
  if (type === 'success') icon = '✅';
  if (type === 'warning') icon = '⚠️';
  if (type === 'error') icon = '⛔';

  const iconSpan = document.createElement('span');
  iconSpan.textContent = icon;
  const msgDiv = document.createElement('div');
  const translatedMsg = (window.t && typeof window.t === 'function') ? window.t(message, message) : message;
  msgDiv.textContent = translatedMsg; // Safe against script injection attacks and translated via i18n

  toast.appendChild(iconSpan);
  toast.appendChild(msgDiv);
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// --- Initialize Dates in Indian Standard Time (Today + next 6 days) ---
function getUpcomingDays(count = 7) {
  const days = [];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const istNow = getISTDate();

  for (let i = 0; i < count; i++) {
    const d = new Date(istNow);
    d.setDate(istNow.getDate() + i);

    const dayStr = i === 0 ? 'Today' : (i === 1 ? 'Tmrw' : dayNames[d.getDay()]);
    const dateNum = d.getDate();
    const monthStr = monthNames[d.getMonth()];
    const isoString = getISTIsoDate(d);

    days.push({
      label: dayStr,
      dayNum: dateNum,
      month: monthStr,
      fullDateStr: `${dayNames[d.getDay()]}, ${dateNum} ${monthStr}`,
      isoDate: isoString
    });
  }
  return days;
}

// --- Generate Slots with realistic availability & doctor schedule enforcement ---
function getSlotsForDoctorAndDate(doctorId, isoDate) {
  const doc = DOCTORS.find(d => d.id === doctorId) || DOCTORS[0];
  const targetDateIso = isoDate || getISTIsoDate();
  const cacheKey = `${doctorId}_${targetDateIso}`;

  // 1. Verify if doctor is working on this day of week
  const dateObj = new Date(targetDateIso + 'T12:00:00Z');
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dayName = dayNames[dateObj.getUTCDay()];

  let isWorking = true;
  if (doc.days) {
    if (doc.days === 'Mon - Sat' && dayName === 'Sun') isWorking = false;
    else if (doc.days === 'Mon - Fri' && (dayName === 'Sat' || dayName === 'Sun')) isWorking = false;
    else if (doc.days === 'Tue - Sun' && dayName === 'Mon') isWorking = false;
    else if (doc.days.includes(',')) {
      const allowed = doc.days.split(',').map(s => s.trim());
      isWorking = allowed.includes(dayName);
    }
  }

  if (!isWorking) {
    return {
      offDuty: true,
      offDutyMessage: `${doc.name} is off-duty on ${dateObj.toLocaleDateString('en-IN', { weekday: 'long' })} (Weekly OPD: ${doc.days}). Please select another date above.`,
      morning: [],
      afternoon: [],
      evening: []
    };
  }

  // 2. Check if doctor takes afternoon sessions
  const hoursLower = (doc.hours || '').toLowerCase();
  const hasAfternoon = hoursLower.includes('02:') || hoursLower.includes('03:') || hoursLower.includes('11:00 am - 03:00 pm') || hoursLower.includes('10:30 am - 02:30 pm');

  // 3. Past slots check for today in IST
  const todayISTIso = getISTIsoDate();
  const isToday = (targetDateIso === todayISTIso);
  const istNow = getISTDate();
  const currentMinutesIST = istNow.getHours() * 60 + istNow.getMinutes();

  const parseSlotMinutes = (slotStr) => {
    const parts = slotStr.trim().split(' ');
    const tp = (parts[0] || '09:00').split(':');
    let h = parseInt(tp[0], 10) || 9;
    const m = parseInt(tp[1], 10) || 0;
    if (parts[1] === 'PM' && h < 12) h += 12;
    if (parts[1] === 'AM' && h === 12) h = 0;
    return h * 60 + m;
  };

  // Deterministic seed for realistic slot states
  const seed = (doctorId.charCodeAt(doctorId.length - 1) + parseInt(targetDateIso.replace(/-/g, '').slice(-2), 10)) % 10;

  const processGroup = (slots, sessionName) => {
    return slots.map((time, idx) => {
      // Check if past for today in IST
      if (isToday && parseSlotMinutes(time) <= currentMinutesIST) {
        return { time, status: 'past', session: sessionName };
      }

      // Check if user or demo already booked this in persistent cache
      const isLocallyBooked = state.bookedSlotsCache[cacheKey] && state.bookedSlotsCache[cacheKey].includes(time);
      if (isLocallyBooked) {
        return { time, status: 'booked', session: sessionName };
      }

      // Seeded booked slots for realism
      if ((idx + seed) % 5 === 0) {
        return { time, status: 'booked', session: sessionName };
      } else if ((idx + seed) % 4 === 1) {
        return { time, status: 'fast-filling', session: sessionName };
      } else {
        return { time, status: 'available', session: sessionName };
      }
    });
  };

  return {
    offDuty: false,
    morning: processGroup(SLOT_TEMPLATES.morning, 'Morning'),
    afternoon: hasAfternoon ? processGroup(SLOT_TEMPLATES.afternoon, 'Afternoon') : [],
    evening: processGroup(SLOT_TEMPLATES.evening, 'Evening')
  };
}

// --- Render Live OPD Queue Board ---


const CarePulseQR = (function () {
  const QRMode = { MODE_8BIT_BYTE: 4 };
  const QRErrorCorrectLevel = { L: 1, M: 0, Q: 3, H: 2 };

  function QRMath() { }
  QRMath.glog = function (n) {
    if (n < 1) return 0;
    return QRMath.LOG_TABLE[n] || 0;
  };
  QRMath.gexp = function (n) {
    while (n < 0) n += 255;
    while (n >= 256) n -= 255;
    return QRMath.EXP_TABLE[n];
  };
  QRMath.EXP_TABLE = new Array(256);
  QRMath.LOG_TABLE = new Array(256);
  for (let i = 0; i < 8; i++) QRMath.EXP_TABLE[i] = 1 << i;
  for (let i = 8; i < 256; i++) QRMath.EXP_TABLE[i] = QRMath.EXP_TABLE[i - 4] ^ QRMath.EXP_TABLE[i - 5] ^ QRMath.EXP_TABLE[i - 6] ^ QRMath.EXP_TABLE[i - 8];
  for (let i = 0; i < 255; i++) QRMath.LOG_TABLE[QRMath.EXP_TABLE[i]] = i;

  function QRPolynomial(num, shift) {
    let offset = 0;
    while (offset < num.length && num[offset] === 0) offset++;
    this.num = new Array(num.length - offset + shift);
    for (let i = 0; i < num.length - offset; i++) this.num[i] = num[i + offset];
    for (let i = num.length - offset; i < this.num.length; i++) this.num[i] = 0;
  }
  QRPolynomial.prototype = {
    get: function (index) { return this.num[index]; },
    getLength: function () { return this.num.length; },
    multiply: function (e) {
      const num = new Array(this.getLength() + e.getLength() - 1);
      for (let i = 0; i < num.length; i++) num[i] = 0;
      for (let i = 0; i < this.getLength(); i++) {
        for (let j = 0; j < e.getLength(); j++) {
          num[i + j] ^= QRMath.gexp(QRMath.glog(this.get(i)) + QRMath.glog(e.get(j)));
        }
      }
      return new QRPolynomial(num, 0);
    },
    mod: function (e) {
      if (this.getLength() - e.getLength() < 0) return this;
      const ratio = QRMath.glog(this.get(0)) - QRMath.glog(e.get(0));
      const num = new Array(this.getLength());
      for (let i = 0; i < this.getLength(); i++) num[i] = this.get(i);
      for (let i = 0; i < e.getLength(); i++) num[i] ^= QRMath.gexp(QRMath.glog(e.get(i)) + ratio);
      return new QRPolynomial(num, 0).mod(e);
    }
  };

  function QRRSBlock(totalCount, dataCount) {
    this.totalCount = totalCount;
    this.dataCount = dataCount;
  }
  QRRSBlock.RS_BLOCK_TABLE = [
    [1, 26, 19], [1, 26, 16], [1, 26, 13], [1, 26, 9],
    [1, 44, 34], [1, 44, 28], [1, 44, 22], [1, 44, 16],
    [1, 70, 55], [1, 70, 44], [2, 35, 17], [2, 35, 13],
    [1, 100, 80], [2, 50, 32], [2, 50, 24], [4, 25, 9],
    [1, 134, 108], [2, 67, 43], [2, 33, 15, 2, 34, 16], [2, 33, 11, 2, 34, 12],
    [2, 86, 68], [4, 43, 27], [4, 43, 19], [4, 43, 15]
  ];
  QRRSBlock.getRSBlocks = function (typeNumber, errorCorrectLevel) {
    const rsBlock = QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + errorCorrectLevel];
    const length = rsBlock.length / 3;
    const list = [];
    for (let i = 0; i < length; i++) {
      const count = rsBlock[i * 3 + 0];
      const totalCount = rsBlock[i * 3 + 1];
      const dataCount = rsBlock[i * 3 + 2];
      for (let j = 0; j < count; j++) list.push(new QRRSBlock(totalCount, dataCount));
    }
    return list;
  };

  function QRBitBuffer() {
    this.buffer = [];
    this.length = 0;
  }
  QRBitBuffer.prototype = {
    get: function (index) {
      const bufIndex = Math.floor(index / 8);
      return ((this.buffer[bufIndex] >>> (7 - index % 8)) & 1) === 1;
    },
    put: function (num, length) {
      for (let i = 0; i < length; i++) {
        this.putBit(((num >>> (length - i - 1)) & 1) === 1);
      }
    },
    putBit: function (bit) {
      const bufIndex = Math.floor(this.length / 8);
      if (this.buffer.length <= bufIndex) this.buffer.push(0);
      if (bit) this.buffer[bufIndex] |= (0x80 >>> (this.length % 8));
      this.length++;
    }
  };

  function QR8bitByte(data) {
    this.mode = QRMode.MODE_8BIT_BYTE;
    this.data = data;
  }
  QR8bitByte.prototype = {
    getLength: function () { return this.data.length; },
    write: function (buffer) {
      for (let i = 0; i < this.data.length; i++) {
        buffer.put(this.data.charCodeAt(i), 8);
      }
    }
  };

  const QRUtil = {
    PATTERN_POSITION_TABLE: [
      [], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34]
    ],
    G15: (1 << 10) | (1 << 8) | (1 << 5) | (1 << 4) | (1 << 2) | (1 << 1) | (1 << 0),
    G15_MASK: (1 << 14) | (1 << 12) | (1 << 10) | (1 << 4) | (1 << 1),
    getBCHTypeInfo: function (data) {
      let d = data << 10;
      while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15) >= 0) {
        d ^= (QRUtil.G15 << (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15)));
      }
      return ((data << 10) | d) ^ QRUtil.G15_MASK;
    },
    getBCHDigit: function (data) {
      let digit = 0;
      while (data !== 0) { digit++; data >>>= 1; }
      return digit;
    },
    getPatternPosition: function (typeNumber) {
      return QRUtil.PATTERN_POSITION_TABLE[typeNumber - 1] || [];
    },
    getMask: function (maskPattern, i, j) {
      switch (maskPattern) {
        case 0: return (i + j) % 2 === 0;
        case 1: return i % 2 === 0;
        case 2: return j % 3 === 0;
        case 3: return (i + j) % 3 === 0;
        case 4: return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 === 0;
        case 5: return (i * j) % 2 + (i * j) % 3 === 0;
        case 6: return ((i * j) % 2 + (i * j) % 3) % 2 === 0;
        case 7: return ((i * j) % 3 + (i + j) % 2) % 2 === 0;
        default: return false;
      }
    },
    getErrorCorrectPolynomial: function (errorCorrectLength) {
      let a = new QRPolynomial([1], 0);
      for (let i = 0; i < errorCorrectLength; i++) {
        a = a.multiply(new QRPolynomial([1, QRMath.gexp(i)], 0));
      }
      return a;
    }
  };

  function QRCodeModel(typeNumber, errorCorrectLevel) {
    this.typeNumber = typeNumber;
    this.errorCorrectLevel = errorCorrectLevel;
    this.modules = null;
    this.moduleCount = 0;
    this.dataList = [];
  }
  QRCodeModel.prototype = {
    addData: function (data) {
      this.dataList.push(new QR8bitByte(data));
    },
    isDark: function (row, col) {
      return this.modules[row][col];
    },
    getModuleCount: function () { return this.moduleCount; },
    make: function () {
      let typeNumber = 1;
      for (typeNumber = 1; typeNumber <= 6; typeNumber++) {
        const rsBlocks = QRRSBlock.getRSBlocks(typeNumber, this.errorCorrectLevel);
        const buffer = new QRBitBuffer();
        let totalDataCount = 0;
        for (let i = 0; i < rsBlocks.length; i++) totalDataCount += rsBlocks[i].dataCount;
        for (let i = 0; i < this.dataList.length; i++) {
          const data = this.dataList[i];
          buffer.put(data.mode, 4);
          buffer.put(data.getLength(), 8);
          data.write(buffer);
        }
        if (buffer.length <= totalDataCount * 8) break;
      }
      this.typeNumber = Math.min(6, typeNumber);
      this.makeImpl(false, 0);
    },
    makeImpl: function (test, maskPattern) {
      this.moduleCount = this.typeNumber * 4 + 17;
      this.modules = new Array(this.moduleCount);
      for (let row = 0; row < this.moduleCount; row++) {
        this.modules[row] = new Array(this.moduleCount);
        for (let col = 0; col < this.moduleCount; col++) this.modules[row][col] = null;
      }
      this.setupPositionProbePattern(0, 0);
      this.setupPositionProbePattern(this.moduleCount - 7, 0);
      this.setupPositionProbePattern(0, this.moduleCount - 7);
      this.setupPositionAdjustPattern();
      this.setupTimingPattern();
      this.setupTypeInfo(test, maskPattern);
      this.mapData(QRCodeModel.createData(this.typeNumber, this.errorCorrectLevel, this.dataList), maskPattern);
    },
    setupPositionProbePattern: function (row, col) {
      for (let r = -1; r <= 7; r++) {
        if (row + r <= -1 || this.moduleCount <= row + r) continue;
        for (let c = -1; c <= 7; c++) {
          if (col + c <= -1 || this.moduleCount <= col + c) continue;
          if ((0 <= r && r <= 6 && (c === 0 || c === 6)) ||
            (0 <= c && c <= 6 && (r === 0 || r === 6)) ||
            (2 <= r && r <= 4 && 2 <= c && c <= 4)) {
            this.modules[row + r][col + c] = true;
          } else {
            this.modules[row + r][col + c] = false;
          }
        }
      }
    },
    setupTimingPattern: function () {
      for (let r = 8; r < this.moduleCount - 8; r++) {
        if (this.modules[r][6] != null) continue;
        this.modules[r][6] = (r % 2 === 0);
      }
      for (let c = 8; c < this.moduleCount - 8; c++) {
        if (this.modules[6][c] != null) continue;
        this.modules[6][c] = (c % 2 === 0);
      }
    },
    setupPositionAdjustPattern: function () {
      const pos = QRUtil.getPatternPosition(this.typeNumber);
      for (let i = 0; i < pos.length; i++) {
        for (let j = 0; j < pos.length; j++) {
          const row = pos[i];
          const col = pos[j];
          if (this.modules[row][col] != null) continue;
          for (let r = -2; r <= 2; r++) {
            for (let c = -2; c <= 2; c++) {
              if (r === -2 || r === 2 || c === -2 || c === 2 || (r === 0 && c === 0)) {
                this.modules[row + r][col + c] = true;
              } else {
                this.modules[row + r][col + c] = false;
              }
            }
          }
        }
      }
    },
    setupTypeInfo: function (test, maskPattern) {
      const data = (this.errorCorrectLevel << 3) | maskPattern;
      const bits = QRUtil.getBCHTypeInfo(data);
      for (let i = 0; i < 15; i++) {
        const mod = (!test && ((bits >> i) & 1) === 1);
        if (i < 6) this.modules[i][8] = mod;
        else if (i < 8) this.modules[i + 1][8] = mod;
        else this.modules[this.moduleCount - 15 + i][8] = mod;
      }
      for (let i = 0; i < 15; i++) {
        const mod = (!test && ((bits >> i) & 1) === 1);
        if (i < 8) this.modules[8][this.moduleCount - i - 1] = mod;
        else if (i < 9) this.modules[8][15 - i - 1 + 1] = mod;
        else this.modules[8][15 - i - 1] = mod;
      }
      this.modules[this.moduleCount - 8][8] = !test;
    },
    mapData: function (data, maskPattern) {
      let inc = -1;
      let row = this.moduleCount - 1;
      let bitIndex = 7;
      let byteIndex = 0;
      for (let col = this.moduleCount - 1; col > 0; col -= 2) {
        if (col === 6) col--;
        while (true) {
          for (let c = 0; c < 2; c++) {
            if (this.modules[row][col - c] == null) {
              let dark = false;
              if (byteIndex < data.length) {
                dark = (((data[byteIndex] >>> bitIndex) & 1) === 1);
              }
              const mask = QRUtil.getMask(maskPattern, row, col - c);
              if (mask) dark = !dark;
              this.modules[row][col - c] = dark;
              bitIndex--;
              if (bitIndex === -1) {
                byteIndex++;
                bitIndex = 7;
              }
            }
          }
          row += inc;
          if (row < 0 || this.moduleCount <= row) {
            row -= inc;
            inc = -inc;
            break;
          }
        }
      }
    }
  };
  QRCodeModel.createData = function (typeNumber, errorCorrectLevel, dataList) {
    const rsBlocks = QRRSBlock.getRSBlocks(typeNumber, errorCorrectLevel);
    const buffer = new QRBitBuffer();
    for (let i = 0; i < dataList.length; i++) {
      const data = dataList[i];
      buffer.put(data.mode, 4);
      buffer.put(data.getLength(), 8);
      data.write(buffer);
    }
    let totalDataCount = 0;
    for (let i = 0; i < rsBlocks.length; i++) totalDataCount += rsBlocks[i].dataCount;
    if (buffer.length + 4 <= totalDataCount * 8) buffer.put(0, 4);
    while (buffer.length % 8 !== 0) buffer.putBit(false);
    while (true) {
      if (buffer.length >= totalDataCount * 8) break;
      buffer.put(0xec, 8);
      if (buffer.length >= totalDataCount * 8) break;
      buffer.put(0x11, 8);
    }
    return QRCodeModel.createBytes(buffer, rsBlocks);
  };
  QRCodeModel.createBytes = function (buffer, rsBlocks) {
    let offset = 0;
    let maxDcCount = 0;
    let maxEcCount = 0;
    const dcdata = new Array(rsBlocks.length);
    const ecdata = new Array(rsBlocks.length);
    for (let r = 0; r < rsBlocks.length; r++) {
      const dcCount = rsBlocks[r].dataCount;
      const ecCount = rsBlocks[r].totalCount - dcCount;
      maxDcCount = Math.max(maxDcCount, dcCount);
      maxEcCount = Math.max(maxEcCount, ecCount);
      dcdata[r] = new Array(dcCount);
      for (let i = 0; i < dcdata[r].length; i++) dcdata[r][i] = 0xff & buffer.buffer[i + offset];
      offset += dcCount;
      const rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount);
      const rawPoly = new QRPolynomial(dcdata[r], rsPoly.getLength() - 1);
      const modPoly = rawPoly.mod(rsPoly);
      ecdata[r] = new Array(rsPoly.getLength() - 1);
      for (let i = 0; i < ecdata[r].length; i++) {
        const modIndex = i + modPoly.getLength() - ecdata[r].length;
        ecdata[r][i] = (modIndex >= 0) ? modPoly.get(modIndex) : 0;
      }
    }
    let totalCodeCount = 0;
    for (let i = 0; i < rsBlocks.length; i++) totalCodeCount += rsBlocks[i].totalCount;
    const data = new Array(totalCodeCount);
    let index = 0;
    for (let i = 0; i < maxDcCount; i++) {
      for (let r = 0; r < rsBlocks.length; r++) {
        if (i < dcdata[r].length) data[index++] = dcdata[r][i];
      }
    }
    for (let i = 0; i < maxEcCount; i++) {
      for (let r = 0; r < rsBlocks.length; r++) {
        if (i < ecdata[r].length) data[index++] = ecdata[r][i];
      }
    }
    return data;
  };

  return {
    generate(text) {
      try {
        const qr = new QRCodeModel(0, QRErrorCorrectLevel.M);
        qr.addData(text);
        qr.make();
        return qr;
      } catch (err) {
        console.warn('QR generation fallback notice:', err);
        return null;
      }
    },
    renderToSvg(text, size = 72) {
      const qr = this.generate(text);
      if (!qr) {
        return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" style="background:#f8fafc; border:1px dashed #cbd5e1; border-radius:6px; display:block;"><rect x="10%" y="10%" width="80%" height="80%" rx="4" fill="#f1f5f9"/><text x="50%" y="44%" dominant-baseline="middle" text-anchor="middle" font-size="14" fill="#64748b">📱</text><text x="50%" y="74%" dominant-baseline="middle" text-anchor="middle" font-size="8" font-family="system-ui, sans-serif" font-weight="800" fill="#0f766e" letter-spacing="0.5">DEMO QR</text></svg>`;
      }
      const count = qr.getModuleCount();
      const margin = 1;
      const totalModules = count + margin * 2;
      const tileSize = size / totalModules;
      let paths = '';
      for (let r = 0; r < count; r++) {
        for (let c = 0; c < count; c++) {
          if (qr.isDark(r, c)) {
            const x = ((c + margin) * tileSize).toFixed(1);
            const y = ((r + margin) * tileSize).toFixed(1);
            const w = (tileSize + 0.15).toFixed(1);
            paths += `M${x},${y}h${w}v${w}h-${w}z `;
          }
        }
      }
      return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" style="background:#ffffff; border-radius:4px; display:block;"><path d="${paths}" fill="#0f172a"/></svg>`;
    },
    drawToCanvas(ctx, text, x, y, size) {
      const qr = this.generate(text);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(x, y, size, size);
      if (!qr) return;
      const count = qr.getModuleCount();
      const margin = 1;
      const totalModules = count + margin * 2;
      const tile = size / totalModules;
      ctx.fillStyle = '#0f172a';
      for (let r = 0; r < count; r++) {
        for (let c = 0; c < count; c++) {
          if (qr.isDark(r, c)) {
            ctx.fillRect(x + (c + margin) * tile, y + (r + margin) * tile, tile + 0.3, tile + 0.3);
          }
        }
      }
    }
  };
})();

// --- Dynamic Procedural Code 39 Barcode Generator ---
const CarePulseBarcode = {
  MAP: {
    '0': '000110100', '1': '100100001', '2': '001100001', '3': '101100000',
    '4': '000110001', '5': '100110000', '6': '001110000', '7': '000100101',
    '8': '100100100', '9': '001100100', 'A': '100001001', 'B': '001001001',
    'C': '101001000', 'D': '000011001', 'E': '100011000', 'F': '001011000',
    'G': '000001101', 'H': '100001100', 'I': '001001100', 'J': '000011100',
    'K': '100000011', 'L': '001000011', 'M': '101000010', 'N': '000010011',
    'O': '100010010', 'P': '001010010', 'Q': '000000111', 'R': '100000110',
    'S': '001000110', 'T': '000010110', 'U': '110000001', 'V': '011000001',
    'W': '111000000', 'X': '010010001', 'Y': '110010000', 'Z': '011010000',
    '-': '010000101', '.': '110000100', ' ': '011000100', '$': '010101000',
    '/': '010100010', '+': '010001010', '%': '000101010', '*': '010010100'
  },
  renderSvg(text) {
    const clean = String(text || '').toUpperCase().replace(/[^0-9A-Z\-\. \$\/\+\%]/g, '') || 'CP-TK-001';
    const full = `*${clean}*`;
    let totalWidth = 0;
    for (let i = 0; i < full.length; i++) {
      const code = this.MAP[full[i]] || this.MAP['-'];
      for (let j = 0; j < 9; j++) {
        totalWidth += (code[j] === '1') ? 2.8 : 1.1;
      }
      if (i < full.length - 1) totalWidth += 1.4;
    }
    let rects = '';
    let x = 0;
    for (let i = 0; i < full.length; i++) {
      const code = this.MAP[full[i]] || this.MAP['-'];
      for (let j = 0; j < 9; j++) {
        const isBar = (j % 2 === 0);
        const w = (code[j] === '1') ? 2.8 : 1.1;
        if (isBar) {
          rects += `<rect x="${x.toFixed(1)}" y="0" width="${w.toFixed(1)}" height="34" fill="#0f172a" />`;
        }
        x += w;
      }
      x += 1.4;
    }
    return `<svg viewBox="0 0 ${Math.ceil(totalWidth)} 34" preserveAspectRatio="none" style="width: 100%; height: 34px; display: block;">${rects}</svg>`;
  },
  drawToCanvas(ctx, text, x, y, width, height) {
    const clean = String(text || '').toUpperCase().replace(/[^0-9A-Z\-\. \$\/\+\%]/g, '') || 'CP-TK-001';
    const full = `*${clean}*`;
    let baseUnits = 0;
    for (let i = 0; i < full.length; i++) {
      const code = this.MAP[full[i]] || this.MAP['-'];
      for (let j = 0; j < 9; j++) {
        baseUnits += (code[j] === '1') ? 2.6 : 1.0;
      }
      if (i < full.length - 1) baseUnits += 1.2;
    }
    const unitScale = width / baseUnits;
    let curX = x;
    ctx.fillStyle = '#0f172a';
    for (let i = 0; i < full.length; i++) {
      const code = this.MAP[full[i]] || this.MAP['-'];
      for (let j = 0; j < 9; j++) {
        const isBar = (j % 2 === 0);
        const w = ((code[j] === '1') ? 2.6 : 1.0) * unitScale;
        if (isBar) {
          ctx.fillRect(curX, y, w, height);
        }
        curX += w;
      }
      curX += 1.2 * unitScale;
    }
  }
};

// --- Unique Ticket Attributes & State Generator ---
// --- Unique Ticket Attributes & State Generator ---
function generateUniqueTicketDetails(doc, patientData, targetDateIso) {
  const appDateIso = targetDateIso || state.selectedDate || getISTIsoDate();
  const todayDateIso = getISTIsoDate();
  const isToday = (appDateIso === todayDateIso);

  // 1. Daily scoped doctor queue counter in localStorage
  const counterKey = `carepulse_doc_counters_${appDateIso}`;
  let docCounters = {};
  try {
    docCounters = JSON.parse(localStorage.getItem(counterKey) || '{}');
  } catch (e) {
    docCounters = {};
  }
  const currentDocCount = docCounters[doc.id] || 0;
  const tokenNumber = currentDocCount + 1;
  docCounters[doc.id] = tokenNumber;
  try {
    localStorage.setItem(counterKey, JSON.stringify(docCounters));
  } catch (e) { }
  doc.totalTodayTokens = tokenNumber;

  // 2. Guaranteed persistent global sequence
  let globalSerial = parseInt(localStorage.getItem('carepulse_global_ticket_serial') || '108', 10);
  globalSerial += 1;
  try {
    localStorage.setItem('carepulse_global_ticket_serial', globalSerial.toString());
  } catch (e) { }

  // 3. Unique Token ID (e.g. TK-029)
  const tokenId = `TK-${String(tokenNumber).padStart(3, '0')}`;

  // 4. Unique Booking Reference Number (e.g. CP-2026-849201)
  const year = new Date().getFullYear();
  const randNum = Math.floor(100000 + Math.random() * 900000);
  const ticketRef = `CP-${year}-${randNum}`;

  // 5. Unique Security Verification Code (e.g. SEC-9F2A-88D1)
  const hexChars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const genSecPart = () => Array.from({ length: 4 }, () => hexChars.charAt(Math.floor(Math.random() * hexChars.length))).join('');
  const securityCode = `SEC-${genSecPart()}-${genSecPart()}`;

  // 6. Unique Barcode Number (e.g. CP-TK-029-4821)
  const barcodeNum = `CP-TK-${String(tokenNumber).padStart(3, '0')}-${Math.floor(1000 + Math.random() * 9000)}`;

  // 7. Dynamic OPD Counter & Desk Allocation
  const counterId = (tokenNumber % 4) + 1;
  const deskLetter = ['A', 'B', 'C', 'D'][tokenNumber % 4];
  const assignedDesk = `Counter ${counterId} • Desk ${deskLetter}`;

  // 8. Dynamic Queue Position & Estimated Wait
  const queuePosition = isToday ? Math.max(1, tokenNumber - (doc.currentServingToken || 0)) : tokenNumber;
  const estWaitMins = isToday ? queuePosition * (doc.avgWaitPerPatient || 12) : 0;

  // 9. Exact Issue Timestamp
  const now = getISTDate();
  const issueTimestamp = now.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }) + ', ' + now.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });

  // 10. Dynamic Verification URL & Payload for QR (No PII in query params)
  const qrPayload = `https://hospital-project-tawny.vercel.app/?track=${tokenId}&ref=${ticketRef}`;

  return {
    tokenNumber,
    tokenId,
    ticketRef,
    securityCode,
    barcodeNum,
    assignedDesk,
    queuePosition,
    estWaitMins,
    issueTimestamp,
    qrPayload
  };
}

function showBookingError(inputId, message) {
  const inputEl = document.getElementById(inputId);
  const errEl = document.getElementById(inputId + '-error');
  if (inputEl) {
    inputEl.classList.add('input-error');
    inputEl.setAttribute('aria-invalid', 'true');
    inputEl.setAttribute('aria-describedby', inputId + '-error');
    inputEl.focus();
    const onInput = () => {
      inputEl.classList.remove('input-error');
      inputEl.removeAttribute('aria-invalid');
      if (errEl) {
        errEl.textContent = '';
        errEl.classList.remove('visible');
      }
      inputEl.removeEventListener('input', onInput);
    };
    inputEl.addEventListener('input', onInput);
  }
  if (errEl) {
    errEl.textContent = message;
    errEl.classList.add('visible');
  }
}

function clearBookingErrors() {
  ['layer-patient-name', 'layer-patient-age', 'layer-patient-phone', 'patient-name', 'patient-age', 'patient-phone'].forEach(id => {
    const el = document.getElementById(id);
    const err = document.getElementById(id + '-error');
    if (el) {
      el.classList.remove('input-error');
      el.removeAttribute('aria-invalid');
    }
    if (err) {
      err.textContent = '';
      err.classList.remove('visible');
    }
  });
}

// --- Common Appointment Booking Processor ---
function processBookingSubmission(patientData) {
  clearBookingErrors();

  const name = (patientData.name || '').trim();
  const nameRegex = /^[A-Za-z\s.]{2,50}$/;
  if (!name || name.length < 2 || name.length > 50 || !nameRegex.test(name)) {
    showBookingError('layer-patient-name', 'Please provide a valid patient name (letters and spaces only, 2-50 characters).');
    showToast('Please enter a valid patient name (letters and spaces only, 2-50 characters).', 'warning');
    return false;
  }

  const age = parseInt(patientData.age, 10);
  if (isNaN(age) || age < 1 || age > 120) {
    showBookingError('layer-patient-age', 'Please enter a valid patient age between 1 and 120 years.');
    showToast('Please enter a valid patient age between 1 and 120 years.', 'warning');
    return false;
  }

  let cleanPhone = (patientData.phone || '').replace(/[^0-9]/g, '');
  if (cleanPhone.startsWith('91') && cleanPhone.length === 12) {
    cleanPhone = cleanPhone.slice(2);
  } else if (cleanPhone.startsWith('0') && cleanPhone.length === 11) {
    cleanPhone = cleanPhone.slice(1);
  }

  if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
    showBookingError('layer-patient-phone', 'Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.');
    showToast('Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.', 'warning');
    return false;
  }

  const targetDateIso = state.selectedDate || getISTIsoDate();
  const todayIso = getISTIsoDate();
  const maxDate = new Date(getISTDate().getTime() + 30 * 86400000);
  const maxDateIso = getISTIsoDate(maxDate);
  if (targetDateIso < todayIso || targetDateIso > maxDateIso) {
    showToast('Please select a consultation date within the allowed 30-day booking window.', 'warning');
    return false;
  }

  if (!state.selectedSlot) {
    showToast('Please select an available consultation time-slot before booking!', 'warning');
    return false;
  }

  const doc = DOCTORS.find(d => d.id === state.selectedDoctorId) || DOCTORS[0];

  // Generate completely distinct ticket details every time
  const details = generateUniqueTicketDetails(doc, patientData, targetDateIso);
  const reportingNote = `Please report 15 mins prior (${state.selectedSlot})`;

  const activePill = document.querySelector('.date-card-pill.active');
  const appointmentDateStr = activePill ? activePill.dataset.full : targetDateIso;

  // Create Appointment Record with all unique verification parameters
  const newAppointment = {
    tokenId: details.tokenId,
    tokenNumber: details.tokenNumber,
    ticketRef: details.ticketRef,
    securityCode: details.securityCode,
    barcodeNum: details.barcodeNum,
    assignedDesk: details.assignedDesk,
    queuePosition: details.queuePosition,
    estWaitMins: details.estWaitMins,
    issueTimestamp: details.issueTimestamp,
    qrPayload: details.qrPayload,
    doctorId: doc.id,
    doctorName: doc.name,
    doctorSpecialty: doc.specialty,
    room: doc.room,
    patientName: name,
    patientAge: age,
    patientGender: patientData.gender,
    patientPlace: (patientData.place || 'Phagwara').trim(),
    patientPhone: cleanPhone,
    visitReason: patientData.reason || 'General Consultation',
    visitType: patientData.visitType || 'First Consultation',
    date: appointmentDateStr,
    isoDate: targetDateIso,
    timeSlot: state.selectedSlot,
    reportingNote: reportingNote,
    fee: doc.feeDisplay,
    bookingTimestamp: new Date().toISOString(),
    status: 'Confirmed'
  };

  // Mark slot as booked locally and persist to localStorage
  const cacheKey = `${doc.id}_${targetDateIso}`;
  if (!state.bookedSlotsCache[cacheKey]) {
    state.bookedSlotsCache[cacheKey] = [];
  }
  if (!state.bookedSlotsCache[cacheKey].includes(state.selectedSlot)) {
    state.bookedSlotsCache[cacheKey].push(state.selectedSlot);
  }
  try {
    localStorage.setItem('carepulse_booked_slots', JSON.stringify(state.bookedSlotsCache));
  } catch (e) { }

  // Save to State & LocalStorage
  state.userAppointments.unshift(newAppointment);
  try {
    localStorage.setItem('carepulse_appointments', JSON.stringify(state.userAppointments));
  } catch (err) {
    console.warn('LocalStorage save notice:', err);
  }

  state.lastCreatedToken = newAppointment;
  state.currentViewingToken = newAppointment;

  // Refresh UI states
  renderSlots();
  renderMyBookingsBadge();
  renderLiveOPDBoard();

  // Close the booking layer if open
  closeBookingLayer();

  // Play synthetic chime & Show Digital Token Slip
  playClinicChime();
  showToast(`Token #${details.tokenId} generated for ${patientData.name}!`, 'success');
  openTokenSlipModal(newAppointment);

  return true;
}

// Setup form handlers for both layer and inline forms


export {
  escapeHtml,
  getISTDate,
  getISTIsoDate,
  playClinicChime,
  showToast,
  getUpcomingDays,
  getSlotsForDoctorAndDate,
  CarePulseQR,
  CarePulseBarcode,
  generateUniqueTicketDetails,
  processBookingSubmission,
  showBookingError,
  clearBookingErrors
};

