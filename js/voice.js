// CarePulse Voice AI Assistant & Public Address Engines
import { DOCTORS } from './config.js';
import { showToast } from './utils.js';

const PublicAddressEngine = {
  isMuted: false,

  init() {
    try {
      const savedMute = localStorage.getItem('carepulse_pa_muted');
      this.isMuted = savedMute === 'true';
    } catch (e) {}
    this.updateToggleButtons();
  },

  toggleMute() {
    this.isMuted = !this.isMuted;
    try {
      localStorage.setItem('carepulse_pa_muted', this.isMuted ? 'true' : 'false');
    } catch (e) {}
    this.updateToggleButtons();
    showToast(this.isMuted ? '🔇 PA Voice Announcements Muted' : '🔊 PA Voice Announcements Enabled', 'info');
  },

  updateToggleButtons() {
    const liveBtn = document.getElementById('btn-live-pa-toggle');
    const recBtn = document.getElementById('btn-reception-pa-toggle');
    const label = this.isMuted ? '🔇 PA Voice: Muted' : '🔊 PA Voice: ON';

    [liveBtn, recBtn].forEach(btn => {
      if (btn) {
        btn.innerHTML = `<span>${label}</span>`;
        btn.classList.toggle('muted', this.isMuted);
      }
    });
  },

  announceToken(doctor, tokenNumber, patientName = null) {
    if (this.isMuted) return;

    // 1. Play clinic chime first
    if (typeof playClinicChime === 'function') {
      try { playClinicChime(); } catch (e) {}
    }

    const roomName = doctor.room ? doctor.room.split(',')[0] : 'Consultation Room';
    const lang = (window.LanguageEngine && window.LanguageEngine.currentLang) || 'en';

    let spokenText = '';
    let bannerText = '';

    if (lang === 'hi') {
      spokenText = `कृपया ध्यान दें। टोकन नंबर ${tokenNumber} ${patientName ? patientName : ''}, कृपया ${doctor.name} के लिए ${roomName} में जाएं।`;
      bannerText = `टोकन #${tokenNumber} • ${doctor.name} (${roomName})`;
    } else if (lang === 'pa') {
      spokenText = `ਕਿਰਪਾ ਕਰਕੇ ਧਿਆਨ ਦਿਓ। ਟੋਕਨ ਨੰਬਰ ${tokenNumber} ${patientName ? patientName : ''}, ਕਿਰਪਾ ਕਰਕੇ ${doctor.name} ਲਈ ${roomName} ਵਿਖੇ ਜਾਓ।`;
      bannerText = `ਟੋਕਨ #${tokenNumber} • ${doctor.name} (${roomName})`;
    } else {
      spokenText = `Attention please. Token number ${tokenNumber} ${patientName ? 'for ' + patientName : ''}, please proceed to ${roomName} for ${doctor.name}.`;
      bannerText = `Token #${tokenNumber} • ${doctor.name} (${roomName})`;
    }

    // 2. Trigger Visual Banner
    this.showBroadcastBanner(bannerText, `${doctor.specialty} • Chamber Live Callout`);

    // 3. Trigger Natural Speech Synthesis after slight delay for chime
    setTimeout(() => {
      this.speakText(spokenText, lang);
    }, 450);
  },

  showBroadcastBanner(title, subtitle) {
    const banner = document.getElementById('pa-announcement-banner');
    const titleEl = document.getElementById('pa-announcement-text');
    const subEl = document.getElementById('pa-announcement-sub');
    if (!banner || !titleEl) return;

    titleEl.innerText = title;
    if (subEl) subEl.innerText = subtitle;

    banner.classList.add('active');
    clearTimeout(banner._timeout);
    banner._timeout = setTimeout(() => {
      banner.classList.remove('active');
    }, 5500);
  },

  speakText(text, lang = 'en') {
    if (!window.speechSynthesis) return;

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.pitch = 1.05;

      const langMap = {
        'en': 'en-IN',
        'hi': 'hi-IN',
        'pa': 'pa-IN'
      };
      utterance.lang = langMap[lang] || 'en-IN';

      const voices = window.speechSynthesis.getVoices();
      const targetVoice = voices.find(v => v.lang === utterance.lang || v.lang.startsWith(utterance.lang.slice(0, 2)));
      if (targetVoice) utterance.voice = targetVoice;

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('SpeechSynthesis error:', e);
    }
  }
};



const VoiceAIEngine = {
  recognition: null,
  isListening: false,
  currentLang: 'en-IN',

  init() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.log('Web Speech Recognition not supported in this browser.');
      return;
    }

    try {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = true;
      this.recognition.maxAlternatives = 1;

      this.recognition.onstart = () => {
        this.isListening = true;
        this.updateVisualizer(true);
        this.setTranscript('Listening... Speak your request clearly.');
      };

      this.recognition.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          transcript += event.results[i][0].transcript;
        }
        this.setTranscript(`"${transcript}"`);

        if (event.results[0].isFinal) {
          this.handleResult(transcript);
        }
      };

      this.recognition.onerror = (event) => {
        console.warn('Voice recognition error:', event.error);
        if (event.error === 'no-speech') {
          this.setTranscript('No speech detected. Please tap the mic and try again.');
        } else if (event.error === 'not-allowed') {
          this.setTranscript('Microphone access denied. Please allow microphone permissions in your browser.');
        } else {
          this.setTranscript(`Notice: ${event.error}. Please tap a command below.`);
        }
        this.updateVisualizer(false);
      };

      this.recognition.onend = () => {
        this.isListening = false;
        this.updateVisualizer(false);
      };
    } catch (e) {
      console.warn('Could not initialize SpeechRecognition:', e);
    }
  },

  open() {
    const modal = document.getElementById('voice-assistant-modal');
    if (!modal) return;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    const currentAppLang = (window.LanguageEngine && window.LanguageEngine.currentLang) || 'en';
    const langMap = { 'en': 'en-IN', 'hi': 'hi-IN', 'pa': 'pa-IN' };
    this.currentLang = langMap[currentAppLang] || 'en-IN';

    document.querySelectorAll('.btn-voice-lang').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === this.currentLang);
    });

    this.startListening();
  },

  close() {
    this.stopListening();
    const modal = document.getElementById('voice-assistant-modal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
    if (window.speechSynthesis) window.speechSynthesis.cancel();
  },

  setLanguage(langCode, btn) {
    this.currentLang = langCode;
    document.querySelectorAll('.btn-voice-lang').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');

    if (this.isListening) {
      this.stopListening();
      setTimeout(() => this.startListening(), 200);
    } else {
      this.startListening();
    }
  },

  toggleListening() {
    if (this.isListening) {
      this.stopListening();
    } else {
      this.startListening();
    }
  },

  startListening() {
    if (!this.recognition) {
      this.init();
    }
    if (!this.recognition) {
      this.setTranscript('Speech Recognition is not supported by your browser. Please tap any command below.');
      return;
    }

    try {
      this.recognition.lang = this.currentLang;
      this.recognition.start();
    } catch (e) {
      // Already active
    }
  },

  stopListening() {
    if (this.recognition && this.isListening) {
      try { this.recognition.stop(); } catch (e) {}
    }
    this.isListening = false;
    this.updateVisualizer(false);
  },

  updateVisualizer(active) {
    const vis = document.getElementById('voice-visualizer');
    const micBtn = document.getElementById('voice-mic-btn');
    if (vis) vis.classList.toggle('listening', active);
    if (micBtn) micBtn.innerHTML = active ? '🔴' : '🎙️';
  },

  setTranscript(text) {
    const el = document.getElementById('voice-transcript-display');
    if (!el) return;
    el.innerText = text;
    el.className = text.startsWith('Listening') || text.startsWith('No speech') || text.startsWith('Speech Recognition') || text.startsWith('Notice')
      ? 'voice-transcript-placeholder'
      : 'voice-transcript-text';
  },

  executeCommand(commandText) {
    this.setTranscript(`"${commandText}"`);
    this.handleResult(commandText);
  },

  handleResult(transcript) {
    const q = transcript.toLowerCase().trim();
    let spokenReply = '';
    let actionDone = false;

    // 1. Emergency / Ambulance Intent
    if (q.includes('emergency') || q.includes('ambulance') || q.includes('108') || q.includes('urgent') || q.includes('मदद') || q.includes('एम्बुलेंस') || q.includes('ਮਦਦ') || q.includes('ਐਂਬੂਲੈਂਸ')) {
      spokenReply = 'Activating CarePulse Emergency SOS Hub with live GPS ambulance dispatch.';
      this.close();
      if (typeof openEmergencyModal === 'function') openEmergencyModal();
      actionDone = true;
    }

    // 2. ICU / Beds Intent
    else if (q.includes('bed') || q.includes('icu') || q.includes('ventilator') || q.includes('बेड') || q.includes('ਬੈੱਡ')) {
      spokenReply = 'Opening Live Hospital Bed and ICU Capacity Monitor.';
      this.close();
      if (typeof openBedsModal === 'function') openBedsModal();
      actionDone = true;
    }

    // 3. Live OPD Queue Intent
    else if (q.includes('queue') || q.includes('token') || q.includes('wait') || q.includes('कतार') || q.includes('ਲਾਈਨ')) {
      spokenReply = 'Displaying Real-Time Clinic Token Display and OPD Chambers.';
      this.close();
      if (typeof openLiveQueueModal === 'function') openLiveQueueModal();
      actionDone = true;
    }

    // Video Consult / Tele-Consultation Intent
    else if (q.includes('video') || q.includes('tele') || q.includes('online consult') || q.includes('video call') || q.includes('ਵੀਡੀਓ')) {
      spokenReply = 'Launching CarePulse Virtual Tele-Consultation Clinic with specialist doctor.';
      this.close();
      if (typeof openTeleConsultModal === 'function') openTeleConsultModal();
      actionDone = true;
    }

    // Wayfinder / Indoor GPS Map Intent
    else if (q.includes('map') || q.includes('wayfinder') || q.includes('gps') || q.includes('directions') || q.includes('how to reach') || q.includes('नक्शा') || q.includes('ਰਾਹ')) {
      spokenReply = 'Launching CarePulse Hospital Indoor GPS and multi-floor wayfinder.';
      this.close();
      if (typeof openWayfinderModal === 'function') openWayfinderModal();
      actionDone = true;
    }

    // Digital Health Card / ABHA Pass Intent
    else if (q.includes('health card') || q.includes('abha') || q.includes('medical pass') || q.includes('card') || q.includes('कार्ड')) {
      spokenReply = 'Opening your CarePulse Smart Health Pass with verified ABHA credentials.';
      this.close();
      if (typeof openHealthCardModal === 'function') openHealthCardModal();
      actionDone = true;
    }

    // 4. Lab Reports Intent
    else if (q.includes('lab') || q.includes('report') || q.includes('test') || q.includes('ब्लड टेस्ट') || q.includes('ਟੈਸਟ')) {
      spokenReply = 'Opening Diagnostic Pathology and Radiology Lab Portal.';
      this.close();
      if (typeof openLabReportModal === 'function') openLabReportModal();
      actionDone = true;
    }

    // 5. Pharmacy Intent
    else if (q.includes('pharmacy') || q.includes('medicine') || q.includes('drug') || q.includes('दवा') || q.includes('ਦਵਾਈ')) {
      spokenReply = 'Opening 24/7 CarePulse Hospital Pharmacy and Prescription Dispatch.';
      this.close();
      if (typeof openPharmacyModal === 'function') openPharmacyModal();
      actionDone = true;
    }

    // 6. Health Packages Intent
    else if (q.includes('package') || q.includes('checkup') || q.includes('full body') || q.includes('पैकेज')) {
      spokenReply = 'Opening Preventive Health Checkup Packages.';
      this.close();
      if (typeof openPackagesModal === 'function') openPackagesModal();
      actionDone = true;
    }

    // 7. Dark Mode / Theme Intent
    else if (q.includes('dark mode') || q.includes('light mode') || q.includes('theme') || q.includes('डार्क मोड')) {
      spokenReply = 'Toggling hospital color theme.';
      this.close();
      if (typeof toggleTheme === 'function') toggleTheme();
      actionDone = true;
    }

    // 8. Doctor Name Matching Intent
    else {
      let matchedDoctor = null;
      for (const doc of DOCTORS) {
        const lastName = doc.name.split(' ').pop().toLowerCase();
        const firstName = doc.name.toLowerCase();
        if (q.includes(lastName) || q.includes(firstName)) {
          matchedDoctor = doc;
          break;
        }
      }

      if (matchedDoctor) {
        spokenReply = `Opening booking for ${matchedDoctor.name}, specialist in ${matchedDoctor.specialty}.`;
        this.close();
        if (typeof openBookingLayer === 'function') openBookingLayer(matchedDoctor.id);
        actionDone = true;
      }
      // 9. Specialty Matching Intent
      else {
        const specialtyKeywords = {
          'general': ['general', 'fever', 'cough', 'cold', 'बुखार', 'ਖੰਘ'],
          'cardiology': ['cardio', 'heart', 'chest pain', 'दिल', 'ਦਿਲ'],
          'pediatrics': ['child', 'baby', 'kid', 'pediatric', 'बच्चा', 'ਬੱਚੇ'],
          'gynecology': ['gynec', 'women', 'pregnancy', 'period', 'महिला'],
          'orthopedics': ['ortho', 'bone', 'joint', 'fracture', 'हड्डी', 'ਹੱਡੀ'],
          'dermatology': ['skin', 'hair', 'rash', 'त्वचा', 'ਚਮੜੀ'],
          'neurology': ['neuro', 'brain', 'nerve', 'stroke', 'सिरदर्द'],
          'ent': ['ent', 'ear', 'nose', 'throat', 'कान', 'ਗਲਾ'],
          'ophthalmology': ['eye', 'vision', 'cataract', 'आंख', 'ਅੱਖ']
        };

        let matchedSpec = null;
        for (const [specKey, terms] of Object.entries(specialtyKeywords)) {
          if (terms.some(term => q.includes(term))) {
            matchedSpec = specKey;
            break;
          }
        }

        if (matchedSpec) {
          spokenReply = `Filtering our specialist doctors for ${matchedSpec}.`;
          this.close();
          const docSection = document.getElementById('doctors');
          if (docSection) docSection.scrollIntoView({ behavior: 'smooth' });
          if (typeof filterSpecialty === 'function') filterSpecialty(matchedSpec);
          actionDone = true;
        }
      }
    }

    // Default Fallback
    if (!actionDone) {
      spokenReply = `Searching hospital records for: ${transcript}.`;
      this.close();
      if (typeof openSpotlightSearch === 'function') {
        openSpotlightSearch();
        const searchInput = document.getElementById('spotlight-search-input');
        if (searchInput) {
          searchInput.value = transcript;
          if (window.SpotlightSearchEngine) SpotlightSearchEngine.performSearch(transcript);
        }
      }
    }

    PublicAddressEngine.speakText(spokenReply, this.currentLang.slice(0, 2));
    showToast(spokenReply, 'info');
  }
};

window.PublicAddressEngine = PublicAddressEngine;
window.VoiceAIEngine = VoiceAIEngine;

/* ==========================================================================
   20. TeleConsultEngine (Virtual Video Clinic & Digital Prescription Pad)
   ========================================================================== */



export {
  PublicAddressEngine,
  VoiceAIEngine
};
