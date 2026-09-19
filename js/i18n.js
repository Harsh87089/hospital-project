// CarePulse Internationalization (i18n) Engine
import { showToast } from './utils.js';

const TRANSLATIONS = {
  en: {
    nav_home: 'Home Overview',
    nav_opd: 'OPD & Doctors',
    nav_services: 'Hospital Services',
    nav_patient: 'Patient Care',
    nav_tokens: 'My Tokens',
    nav_book: 'Book Doctor Slot',
    nav_emergency: 'Emergency SOS 108',
    sec_quick: 'Quick Healthcare Access',
    sec_queue: 'Real-Time OPD Token Display',
    sec_doctors: 'Meet Our Hospital Specialists',
    sec_packages: 'Preventive Health Packages',
    sec_booking: 'Book Doctor Consultation & Token',
    sec_beds: 'Live Hospital Bed & ICU Capacity',
    sec_track: 'Track Your OPD Queue Position',
    btn_sos: '🚨 Emergency SOS',
    btn_calc: '🩺 Health & BMI Calculator',
    btn_book_now: 'Book Doctor Slot',
    btn_print: '🖨️ Print Token Slip',
    btn_share_wa: '📲 Share on WhatsApp',
    theme_dark: 'Dark Mode',
    theme_light: 'Light Mode',
    sos_title: '🚨 Emergency Ambulance & Trauma Desk',
    sos_dispatched: 'Ambulance #PB-09-8821 Dispatched!',
    sos_eta: 'Estimated Arrival: 6 mins 45 secs',
    bed_triage: 'Emergency Triage Beds',
    bed_icu: 'ICU & Critical Care',
    bed_vent: 'Ventilator Units',
    bed_o2: 'Oxygen Support Beds',
    lbl_patient_name: 'Patient Full Name',
    lbl_mobile: 'Mobile Number',
    lbl_age: 'Age (Years)',
    lbl_gender: 'Gender',
    lbl_dept: 'Clinical Department',
    lbl_slot: 'Preferred Consultation Slot',
    lbl_symptoms: 'Symptoms / Health Concern',
    lbl_fee: 'Consultation Fee (Pay at Hospital OPD Desk)',
    btn_confirm: 'Confirm OPD Appointment & Generate Token',
    btn_reschedule: 'Reschedule Slot',
    btn_cancel: 'Cancel Appointment',
    call_hospital: `📞 Call Hospital (Demo): ${DEMO_PHONE}`,
    call_108: '🚨 Call National Ambulance: 108',
    wa_helpline: '💬 WhatsApp OPD Desk'
  },
  hi: {
    nav_home: 'होम अवलोकन',
    nav_opd: 'ओपीडी और डॉक्टर्स',
    nav_services: 'अस्पताल सेवाएं',
    nav_patient: 'मरीज देखभाल',
    nav_tokens: 'मेरे टोकन',
    nav_book: 'डॉक्टर स्लॉट बुक करें',
    nav_emergency: 'आपातकालीन एसओएस 108',
    sec_quick: 'त्वरित स्वास्थ्य सेवा',
    sec_queue: 'लाइव ओपीडी टोकन डिस्प्ले',
    sec_doctors: 'हमारे विशेषज्ञ डॉक्टर्स',
    sec_packages: 'स्वास्थ्य जांच पैकेज',
    sec_booking: 'डॉक्टर परामर्श और टोकन बुक करें',
    sec_beds: 'लाइव अस्पताल बेड और आईसीयू स्थिति',
    sec_track: 'अपनी टोकन कतार ट्रैक करें',
    btn_sos: '🚨 आपातकालीन एसओएस',
    btn_calc: '🩺 स्वास्थ्य एवं बीएमआई कैलकुलेटर',
    btn_book_now: 'स्लॉट बुक करें',
    btn_print: '🖨️ टोकन पर्ची प्रिंट करें',
    btn_share_wa: '📲 व्हाट्सएप पर शेयर करें',
    theme_dark: 'डार्क मोड',
    theme_light: 'लाइट मोड',
    sos_title: '🚨 आपातकालीन एम्बुलेंस एवं ट्रॉमा डेस्क',
    sos_dispatched: 'एम्बुलेंस #PB-09-8821 रवाना!',
    sos_eta: 'अनुमानित आगमन: 6 मिनट 45 सेकंड',
    bed_triage: 'इमरजेंसी ट्राइएज बेड',
    bed_icu: 'आईसीयू क्रिटिकल केयर',
    bed_vent: 'वेंटिलेटर इकाइयां',
    bed_o2: 'ऑक्सीजन सपोर्ट बेड',
    lbl_patient_name: 'मरीज का पूरा नाम',
    lbl_mobile: 'मोबाइल नंबर',
    lbl_age: 'उम्र (वर्ष)',
    lbl_gender: 'लिंग',
    lbl_dept: 'चिकित्सा विभाग',
    lbl_slot: 'पसंदीदा परामर्श समय',
    lbl_symptoms: 'लक्षण / समस्या',
    lbl_fee: 'परामर्श शुल्क (अस्पताल ओपीडी में देय)',
    btn_confirm: 'अपॉइंटमेंट पक्का करें व टोकन लें',
    btn_reschedule: 'अपॉइंटमेंट रीशेड्यूल करें',
    btn_cancel: 'अपॉइंटमेंट रद्द करें',
    call_hospital: `📞 अस्पताल कॉल (डेमो): ${DEMO_PHONE}`,
    call_108: '🚨 एम्बुलेंस डायल: 108',
    wa_helpline: '💬 व्हाट्सएप ओपीडी हेल्प'
  },
  pa: {
    nav_home: 'ਮੁੱਖ ਪੰਨਾ',
    nav_opd: 'ਓਪੀਡੀ ਅਤੇ ਡਾਕਟਰ',
    nav_services: 'ਹਸਪਤਾਲ ਸੇਵਾਵਾਂ',
    nav_patient: 'ਮਰੀਜ਼ ਦੇਖਭਾਲ',
    nav_tokens: 'ਮੇਰੇ ਟੋਕਨ',
    nav_book: 'ਡਾਕਟਰ ਸਲਾਟ ਬੁੱਕ ਕਰੋ',
    nav_emergency: 'ਐਮਰਜੈਂਸੀ ਐਸਓਐਸ 108',
    sec_quick: 'ਤੁਰੰਤ ਸਿਹਤ ਸੇਵਾ',
    sec_queue: 'ਲਾਈਵ ਓਪੀਡੀ ਟੋਕਨ ਡਿਸਪਲੇਅ',
    sec_doctors: 'ਸਾਡੇ ਮਾਹਰ ਹਸਪਤਾਲ ਡਾਕਟਰ',
    sec_packages: 'ਸਿਹਤ ਜਾਂਚ ਪੈਕੇਜ',
    sec_booking: 'ਡਾਕਟਰ ਸਲਾਹ ਅਤੇ ਟੋਕਨ ਬੁੱਕ ਕਰੋ',
    sec_beds: 'ਲਾਈਵ ਹਸਪਤਾਲ ਬੈੱਡ ਅਤੇ ਆਈਸੀਯੂ ਸਥਿਤੀ',
    sec_track: 'ਆਪਣੀ ਕਤਾਰ ਸਥਿਤੀ ਟ੍ਰੈਕ ਕਰੋ',
    btn_sos: '🚨 ਐਮਰਜੈਂਸੀ ਐਸਓਐਸ',
    btn_calc: '🩺 ਸਿਹਤ ਅਤੇ ਬੀਐਮਆਈ ਕੈਲਕੁਲੇਟਰ',
    btn_book_now: 'ਸਲਾਟ ਬੁੱਕ ਕਰੋ',
    btn_print: '🖨️ ਟੋਕਨ ਪਰਚੀ ਪ੍ਰਿੰਟ ਕਰੋ',
    btn_share_wa: '📲 ਵਟਸਐਪ ਤੇ ਸਾਂਝਾ ਕਰੋ',
    theme_dark: 'ਡਾਰਕ ਮੋਡ',
    theme_light: 'ਲਾਈਟ ਮੋਡ',
    sos_title: '🚨 ਐਮਰਜੈਂਸੀ ਐਂਬੂਲੈਂਸ ਅਤੇ ਟਰਾਮਾ ਡੈਸਕ',
    sos_dispatched: 'ਐਂਬੂਲੈਂਸ #PB-09-8821 ਰਵਾਨਾ!',
    sos_eta: 'ਪਹੁੰਚਣ ਦਾ ਸਮਾਂ: 6 ਮਿੰਟ 45 ਸਕਿੰਟ',
    bed_triage: 'ਐਮਰਜੈਂਸੀ ਟ੍ਰਾਈਏਜ ਬੈੱਡ',
    bed_icu: 'ਆਈਸੀਯੂ ਗੰਭੀਰ ਦੇਖਭਾਲ',
    bed_vent: 'ਵੈਂਟੀਲੇਟਰ ਯੂਨਿਟ',
    bed_o2: 'ਆਕਸੀਜਨ ਸਪੋਰਟ ਬੈੱਡ',
    lbl_patient_name: 'ਮਰੀਜ਼ ਦਾ ਪੂਰਾ ਨਾਮ',
    lbl_mobile: 'ਮੋਬਾਈਲ ਨੰਬਰ',
    lbl_age: 'ਉਮਰ (ਸਾਲ)',
    lbl_gender: 'ਲਿੰਗ',
    lbl_dept: 'ਹਸਪਤਾਲ ਵਿਭਾਗ',
    lbl_slot: 'ਮਸ਼ਵਰੇ ਦਾ ਸਮਾਂ',
    lbl_symptoms: 'ਲੱਛਣ / ਸਮੱਸਿਆ',
    lbl_fee: 'ਮਸ਼ਵਰਾ ਫੀਸ (ਹਸਪਤਾਲ ਓਪੀਡੀ ਵਿਖੇ ਭੁਗਤਾਨ)',
    btn_confirm: 'ਮੁਲਾਕਾਤ ਪੱਕੀ ਕਰੋ ਅਤੇ ਟੋਕਨ ਪ੍ਰਾਪਤ ਕਰੋ',
    btn_reschedule: 'ਸਲਾਟ ਦਾ ਸਮਾਂ ਬਦਲੋ',
    btn_cancel: 'ਮੁਲਾਕਾਤ ਰੱਦ ਕਰੋ',
    call_hospital: `📞 ਹਸਪਤਾਲ ਕਾਲ (ਡੈਮੋ): ${DEMO_PHONE}`,
    call_108: '🚨 ਐਂਬੂਲੈਂਸ ਡਾਇਲ: 108',
    wa_helpline: '💬 ਵਟਸਐਪ ਓਪੀਡੀ ਹੈਲਪ'
  }
};

const LanguageEngine = {
  currentLang: 'en',

  init() {
    const saved = localStorage.getItem('carepulse_lang') || 'en';
    this.setLanguage(saved);
  },

  setLanguage(lang) {
    if (!TRANSLATIONS[lang]) lang = 'en';
    this.currentLang = lang;
    localStorage.setItem('carepulse_lang', lang);
    document.documentElement.setAttribute('lang', lang);

    // Update active pill button
    const pills = document.querySelectorAll('.lang-pill-btn');
    pills.forEach(p => {
      p.classList.toggle('active', p.getAttribute('data-lang') === lang);
    });

    // Translate all elements with data-i18n
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) {
        el.innerText = TRANSLATIONS[lang][key];
      }
    });

    // Translate placeholders
    const placeholders = document.querySelectorAll('[data-i18n-placeholder]');
    placeholders.forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) {
        el.setAttribute('placeholder', TRANSLATIONS[lang][key]);
      }
    });
  }
};

window.LanguageEngine = LanguageEngine;
window.setLanguage = (lang) => LanguageEngine.setLanguage(lang);

// --- 3. Live Hospital Bed & ICU Capacity Engine ---


export {
  TRANSLATIONS,
  LanguageEngine,
  setLanguage
};
