// CarePulse Internationalization (i18n) Engine
import { showToast } from './utils.js';

const TRANSLATIONS = {
  "en": {
    "brand_name": "CarePulse",
    "brand_tagline": "Super Specialty Hospital & Research Institute",
    "nav_home": "Home Overview",
    "nav_opd": "OPD & Doctors",
    "nav_services": "Hospital Services",
    "nav_patient": "Patient Care",
    "nav_tokens": "My Tokens",
    "nav_book": "Book Doctor Slot",
    "nav_emergency": "Emergency SOS 108",
    "nav_search": "Search Doctors, Services (Ctrl+K)",
    "theme_dark": "Dark Mode",
    "theme_light": "Light Mode",
    "btn_voice_ai": "Voice AI",
    "hero_trust_badge": "Demo Multi-Specialty Hospital Portal • Prototype 24/7 Casualty & Digital OPD System",
    "hero_title": "Trustworthy Care for You and Your Family",
    "hero_subtitle": "Comprehensive, compassionate healthcare at our flagship medical campus on GT Road, Phagwara, Punjab. Consult certified specialist physicians across 9 departments and skip reception lobby lines with real-time digital OPD tokens.",
    "hero_btn_book": "✨ Book OPD Consultation & Token ➔",
    "hero_btn_emergency": "🚨 24/7 Emergency SOS (108)",
    "hero_link_track": "🔍 Track Your Token Status ➔",
    "hero_stat_specialties": "Clinical Specialties",
    "hero_stat_doctors": "Senior Specialist Doctors",
    "hero_stat_wait": "Average Wait Time",
    "hero_stat_trauma": "Trauma & Emergency Bays",
    "chip_overview": "Overview",
    "chip_services": "Services Hub",
    "chip_book": "Book Appointment",
    "chip_queue": "Live OPD Queue",
    "chip_specialists": "Specialists",
    "chip_tele": "Virtual Tele-Consult",
    "chip_beds": "Bed & ICU Status",
    "chip_packages": "Health Checkups",
    "chip_track": "Track Token",
    "chip_insurance": "Insurance & TPA",
    "chip_lab": "Lab Reports",
    "chip_map": "Hospital GPS Map",
    "chip_healthcard": "ABHA Health Pass",
    "chip_pharmacy": "Pharmacy",
    "dock_book": "Book",
    "dock_emergency": "Emergency",
    "dock_track": "Track",
    "dock_call": "Call",
    "hub_title": "Comprehensive Clinical Hub & Patient Access",
    "hub_subtitle": "Access live digital hospital systems, consultations, diagnostics and emergency trauma care.",
    "tile_queue_title": "Live OPD Queue",
    "tile_queue_desc": "Check real-time queue position & token waiting status",
    "tile_book_title": "Book OPD Consultation",
    "tile_book_desc": "Select specialist doctor & pick consultation time slot",
    "tile_beds_title": "Hospital Bed Capacity",
    "tile_beds_desc": "Live ICU, ventilator & oxygen bed occupancy",
    "tile_doctors_title": "Specialist Doctors",
    "tile_doctors_desc": "Meet 18 hospital specialists across 9 departments",
    "tile_tele_title": "Tele-Consultation",
    "tile_tele_desc": "Connect with senior doctors online via video",
    "tile_packages_title": "Health Checkups",
    "tile_packages_desc": "Preventive health checkup packages for family",
    "tile_healthcard_title": "Digital Health Card",
    "tile_healthcard_desc": "ABHA linked digital hospital pass",
    "tile_pharmacy_title": "24/7 Pharmacy",
    "tile_pharmacy_desc": "Order medicines & upload doctor prescription",
    "tile_lab_title": "Lab Reports",
    "tile_lab_desc": "Download diagnostic test reports by UHID",
    "tile_wayfinder_title": "Campus GPS Wayfinder",
    "tile_wayfinder_desc": "Interactive hospital indoor map & directions",
    "tile_insurance_title": "Insurance & TPA",
    "tile_insurance_desc": "Cashless claims & insurance empanelment desk",
    "tile_sos_title": "Emergency Trauma SOS",
    "tile_sos_desc": "24x7 ambulance dispatch & casualty helpline",
    "sec_packages_title": "Preventive Health Checkup Packages",
    "sec_packages_sub": "Curated diagnostic screenings designed by specialist physicians.",
    "pkg_tests": "Tests Included",
    "pkg_book_btn": "Book Health Package",
    "pkg_popular": "Most Popular",
    "sec_campus_title": "Modern Campus & Advanced Medical Facilities",
    "sec_campus_sub": "State-of-the-art infrastructure built for infection control, rapid trauma response, and patient comfort.",
    "sec_faq_title": "Frequently Asked Questions",
    "sec_faq_sub": "Common inquiries regarding OPD tokens, emergency services, doctor timings, and cashless insurance.",
    "book_title": "Book OPD Consultation Slot & Digital Token",
    "lbl_dept": "Clinical Department",
    "lbl_doctor": "Specialist Physician",
    "lbl_date": "Consultation Date",
    "lbl_slot": "Preferred Consultation Slot",
    "lbl_patient_name": "Patient Full Name",
    "ph_patient_name": "e.g. Gurpreet Singh",
    "lbl_mobile": "Mobile Number",
    "ph_mobile": "10-digit mobile number",
    "lbl_age": "Age (Years)",
    "ph_age": "e.g. 35",
    "lbl_gender": "Gender",
    "gender_male": "Male",
    "gender_female": "Female",
    "gender_other": "Other",
    "lbl_city": "City / Locality",
    "ph_city": "e.g. Phagwara, Jalandhar",
    "lbl_symptoms": "Symptoms / Health Concern",
    "ph_symptoms": "Briefly describe your symptoms or health concerns...",
    "lbl_fee": "Consultation Fee (Pay at Hospital OPD Desk)",
    "btn_confirm": "Confirm OPD Appointment & Generate Token",
    "btn_submit_booking": "Confirm OPD Appointment & Generate Token",
    "btn_reschedule": "Reschedule Slot",
    "btn_cancel": "Cancel Appointment",
    "modal_queue_title": "Real-Time OPD Token Display",
    "modal_doctors_title": "Hospital Specialist Doctors Directory",
    "modal_beds_title": "Live Hospital Bed & ICU Capacity",
    "modal_track_title": "Track Your OPD Queue Position",
    "modal_sos_title": "Emergency Ambulance & Trauma Desk",
    "modal_bookings_title": "My Booked OPD Tokens",
    "btn_clear_data": "Clear My Demo Data",
    "btn_reset_filters": "Reset All Filters",
    "btn_download_epass": "Download E-Pass (PNG)",
    "btn_print": "Print Token Slip",
    "btn_share_wa": "Share on WhatsApp",
    "sos_title": "🚨 Emergency Ambulance & Trauma Desk",
    "sos_dispatched": "Ambulance #PB-09-8821 Dispatched!",
    "sos_eta": "Estimated Arrival: 6 mins 45 secs",
    "bed_triage": "Emergency Triage Beds",
    "bed_icu": "ICU & Critical Care",
    "bed_vent": "Ventilator Units",
    "bed_o2": "Oxygen Support Beds",
    "call_hospital": "📞 Call Hospital (Demo): 1800-000-0000",
    "call_108": "🚨 Call National Ambulance: 108",
    "wa_helpline": "💬 WhatsApp OPD Desk",
    "toast_booking_success": "Appointment booked successfully! Token generated.",
    "toast_reschedule_success": "Appointment rescheduled successfully.",
    "toast_cancel_success": "Appointment cancelled.",
    "toast_data_cleared": "All demo data removed from browser storage.",
    "toast_copied": "Copied to clipboard!",
    "toast_lang_changed": "Language updated to English.",
    "toast_theme_dark": "Switched to Dark Mode",
    "toast_theme_light": "Switched to Light Mode",
    "empty_queue_title": "No Active Consultation Chambers Found",
    "empty_queue_desc": "Try clearing your search query or switching to All Chambers.",
    "empty_doctors_title": "No Specialists Found Matching Your Search",
    "empty_doctors_desc": "Search by doctor name or condition, or clear active filters.",
    "empty_bookings_title": "No Booked Appointments Yet",
    "empty_bookings_desc": "Your booked tokens will appear here. Book your first doctor slot now.",
    "sec_quick": "Quick Healthcare Access",
    "sec_queue": "Real-Time OPD Token Display",
    "sec_doctors": "Meet Our Hospital Specialists",
    "sec_packages": "Preventive Health Packages",
    "sec_booking": "Book Doctor Consultation & Token",
    "sec_beds": "Live Hospital Bed & ICU Capacity",
    "sec_track": "Track Your OPD Queue Position",
    "btn_sos": "🚨 Emergency SOS 108",
    "btn_calc": "🩺 Health & BMI Calculator",
    "btn_book_now": "Book Doctor Slot"
  },
  "hi": {
    "brand_name": "केयरपल्स",
    "brand_tagline": "सुपर स्पेशियलिटी अस्पताल एवं अनुसंधान संस्थान",
    "nav_home": "होम अवलोकन",
    "nav_opd": "ओपीडी और डॉक्टर्स",
    "nav_services": "अस्पताल सेवाएं",
    "nav_patient": "मरीज देखभाल",
    "nav_tokens": "मेरे टोकन",
    "nav_book": "डॉक्टर स्लॉट बुक करें",
    "nav_emergency": "आपातकालीन एसओएस 108",
    "nav_search": "डॉक्टर व सेवाएं खोजें (Ctrl+K)",
    "theme_dark": "डार्क मोड",
    "theme_light": "लाइट मोड",
    "btn_voice_ai": "वॉइस एआई",
    "hero_trust_badge": "डेमो सुपर-स्पेशियलिटी अस्पताल पोर्टल • प्रोटोटाइप 24/7 कैजुअल्टी एवं डिजिटल ओपीडी",
    "hero_title": "आपके और आपके परिवार के लिए विश्वसनीय स्वास्थ्य सेवा",
    "hero_subtitle": "जीटी रोड, फगवाड़ा, पंजाब में हमारे प्रमुख मेडिकल कैंपस में व्यापक एवं संवेदनशील स्वास्थ्य सेवा। 9 विभागों के विशेषज्ञ डॉक्टरों से परामर्श लें और डिजिटल ओपीडी टोकन से कतारों से बचें।",
    "hero_btn_book": "✨ ओपीडी परामर्श एवं टोकन बुक करें ➔",
    "hero_btn_emergency": "🚨 24/7 आपातकालीन एसओएस (108)",
    "hero_link_track": "🔍 अपनी टोकन स्थिति ट्रैक करें ➔",
    "hero_stat_specialties": "चिकित्सा विभाग",
    "hero_stat_doctors": "वरिष्ठ विशेषज्ञ डॉक्टर्स",
    "hero_stat_wait": "औसत प्रतीक्षा समय",
    "hero_stat_trauma": "ट्रॉमा एवं आपातकालीन वार्ड",
    "chip_overview": "अवलोकन",
    "chip_services": "सेवाएं हब",
    "chip_book": "अपॉइंटमेंट बुक करें",
    "chip_queue": "लाइव ओपीडी कतार",
    "chip_specialists": "विशेषज्ञ",
    "chip_tele": "टेली-परामर्श",
    "chip_beds": "बेड व आईसीयू स्थिति",
    "chip_packages": "स्वास्थ्य पैकेज",
    "chip_track": "टोकन ट्रैक",
    "chip_insurance": "बीमा व टीपीए",
    "chip_lab": "लैब रिपोर्ट",
    "chip_map": "अस्पताल जीपीएस मैप",
    "chip_healthcard": "आभा हेल्थ पास",
    "chip_pharmacy": "फार्मेसी",
    "dock_book": "बुक करें",
    "dock_emergency": "आपातकाल",
    "dock_track": "ट्रैक",
    "dock_call": "कॉल",
    "hub_title": "व्यापक क्लिनिकल हब एवं मरीज सुविधाएं",
    "hub_subtitle": "लाइव डिजिटल अस्पताल सेवाओं, परामर्श, जांच और आपातकालीन ट्रॉमा केयर तक पहुंचें।",
    "tile_queue_title": "लाइव ओपीडी कतार",
    "tile_queue_desc": "लाइव कतार स्थिति और टोकन प्रतीक्षा समय देखें",
    "tile_book_title": "ओपीडी परामर्श बुक करें",
    "tile_book_desc": "विशेषज्ञ डॉक्टर चुनें और अपनी सुविधानुसार समय चुनें",
    "tile_beds_title": "अस्पताल बेड क्षमता",
    "tile_beds_desc": "लाइव आईसीयू, वेंटिलेटर और ऑक्सीजन बेड उपलब्धता",
    "tile_doctors_title": "विशेषज्ञ डॉक्टर्स",
    "tile_doctors_desc": "9 विभागों के 18 वरिष्ठ विशेषज्ञ डॉक्टरों से मिलें",
    "tile_tele_title": "टेली-परामर्श",
    "tile_tele_desc": "वीडियो कॉल द्वारा वरिष्ठ डॉक्टरों से ऑनलाइन परामर्श लें",
    "tile_packages_title": "स्वास्थ्य जांच",
    "tile_packages_desc": "परिवार के लिए समग्र निवारक स्वास्थ्य जांच पैकेज",
    "tile_healthcard_title": "डिजिटल हेल्थ कार्ड",
    "tile_healthcard_desc": "आभा से जुड़ा डिजिटल अस्पताल स्मार्ट पास",
    "tile_pharmacy_title": "24/7 फार्मेसी",
    "tile_pharmacy_desc": "दवाइयां ऑर्डर करें और डॉक्टर का पर्चा अपलोड करें",
    "tile_lab_title": "लैब टेस्ट रिपोर्ट",
    "tile_lab_desc": "यूएचआईडी द्वारा जांच रिपोर्ट ऑनलाइन डाउनलोड करें",
    "tile_wayfinder_title": "कैंपस जीपीएस मैप",
    "tile_wayfinder_desc": "अस्पताल का इनडोर नेविगेशन नक्शा और दिशा-निर्देश",
    "tile_insurance_title": "हेल्थ इंश्योरेंस व टीपीए",
    "tile_insurance_desc": "कैशलेस क्लेम और सभी प्रमुख बीमा कंपनियों का डेस्क",
    "tile_sos_title": "इमरजेंसी ट्रॉमा एसओएस",
    "tile_sos_desc": "24x7 एम्बुलेंस समन्वय और आपातकालीन हेल्पलाइन",
    "sec_packages_title": "निवारक स्वास्थ्य जांच पैकेज",
    "sec_packages_sub": "विशेषज्ञ डॉक्टरों द्वारा तैयार किए गए समग्र नैदानिक पैकेज।",
    "pkg_tests": "शामिल टेस्ट",
    "pkg_book_btn": "पैकेज बुक करें",
    "pkg_popular": "सर्वाधिक लोकप्रिय",
    "sec_campus_title": "आधुनिक मेडिकल कैंपस एवं उन्नत सुविधाएं",
    "sec_campus_sub": "संक्रमण नियंत्रण, तीव्र ट्रॉमा उपचार और मरीज सुविधा के लिए निर्मित आधुनिक बुनियादी ढांचा।",
    "sec_faq_title": "अक्सर पूछे जाने वाले सवाल",
    "sec_faq_sub": "ओपीडी टोकन, आपातकालीन सेवाओं, डॉक्टर समय और कैशलेस बीमा से संबंधित जानकारी।",
    "book_title": "ओपीडी परामर्श स्लॉट और डिजिटल टोकन बुक करें",
    "lbl_dept": "चिकित्सा विभाग",
    "lbl_doctor": "विशेषज्ञ डॉक्टर",
    "lbl_date": "परामर्श की तारीख",
    "lbl_slot": "पसंदीदा परामर्श समय",
    "lbl_patient_name": "मरीज का पूरा नाम",
    "ph_patient_name": "उदा. गुरप्रीत सिंह",
    "lbl_mobile": "मोबाइल नंबर",
    "ph_mobile": "10-अंकीय मोबाइल नंबर",
    "lbl_age": "उम्र (वर्ष)",
    "ph_age": "उदा. 35",
    "lbl_gender": "लिंग",
    "gender_male": "पुरुष",
    "gender_female": "महिला",
    "gender_other": "अन्य",
    "lbl_city": "शहर / क्षेत्र",
    "ph_city": "उदा. फगवाड़ा, जालंधर",
    "lbl_symptoms": "लक्षण / समस्या",
    "ph_symptoms": "संक्षेप में अपने लक्षण या समस्या बताएं...",
    "lbl_fee": "परामर्श शुल्क (अस्पताल ओपीडी में देय)",
    "btn_confirm": "अपॉइंटमेंट पक्का करें व टोकन लें",
    "btn_submit_booking": "अपॉइंटमेंट पक्का करें व टोकन लें",
    "btn_reschedule": "अपॉइंटमेंट रीशेड्यूल करें",
    "btn_cancel": "अपॉइंटमेंट रद्द करें",
    "modal_queue_title": "लाइव ओपीडी टोकन डिस्प्ले",
    "modal_doctors_title": "अस्पताल विशेषज्ञ डॉक्टर डायरेक्टरी",
    "modal_beds_title": "लाइव अस्पताल बेड और आईसीयू स्थिति",
    "modal_track_title": "अपनी टोकन कतार ट्रैक करें",
    "modal_sos_title": "🚨 आपातकालीन एम्बुलेंस एवं ट्रॉमा डेस्क",
    "modal_bookings_title": "मेरे बुक किए गए टोकन",
    "btn_clear_data": "मेरा डेमो डेटा हटाएं",
    "btn_reset_filters": "सभी फिल्टर रीसेट करें",
    "btn_download_epass": "ई-पास डाउनलोड करें (PNG)",
    "btn_print": "🖨️ टोकन पर्ची प्रिंट करें",
    "btn_share_wa": "📲 व्हाट्सएप पर शेयर करें",
    "sos_title": "🚨 आपातकालीन एम्बुलेंस एवं ट्रॉमा डेस्क",
    "sos_dispatched": "एम्बुलेंस #PB-09-8821 रवाना!",
    "sos_eta": "अनुमानित आगमन: 6 मिनट 45 सेकंड",
    "bed_triage": "इमरजेंसी ट्राइएज बेड",
    "bed_icu": "आईसीयू क्रिटिकल केयर",
    "bed_vent": "वेंटिलेटर इकाइयां",
    "bed_o2": "ऑक्सीजन सपोर्ट बेड",
    "call_hospital": "📞 अस्पताल कॉल (डेमो): 1800-000-0000",
    "call_108": "🚨 एम्बुलेंस डायल: 108",
    "wa_helpline": "💬 व्हाट्सएप ओपीडी हेल्प",
    "toast_booking_success": "अपॉइंटमेंट सफलतापूर्वक बुक हो गई! टोकन तैयार है।",
    "toast_reschedule_success": "अपॉइंटमेंट का समय सफलतापूर्वक बदल दिया गया।",
    "toast_cancel_success": "अपॉइंटमेंट रद्द कर दी गई।",
    "toast_data_cleared": "ब्राउज़र से सारा डेमो डेटा हटा दिया गया।",
    "toast_copied": "क्लिपबोर्ड पर कॉपी किया गया!",
    "toast_lang_changed": "भाषा हिंदी में बदल दी गई है।",
    "toast_theme_dark": "डार्क मोड सक्रिय किया गया",
    "toast_theme_light": "लाइट मोड सक्रिय किया गया",
    "empty_queue_title": "कोई सक्रिय परामर्श कक्ष नहीं मिला",
    "empty_queue_desc": "कृपया अपनी खोज साफ़ करें या 'सभी कक्ष' चुनें।",
    "empty_doctors_title": "आपकी खोज के अनुसार कोई डॉक्टर नहीं मिला",
    "empty_doctors_desc": "डॉक्टर के नाम या रोग से खोजें, अथवा फिल्टर रीसेट करें।",
    "empty_bookings_title": "कोई सक्रिय अपॉइंटमेंट नहीं मिली",
    "empty_bookings_desc": "आपके बुक किए गए टोकन यहां दिखेंगे। अभी अपना स्लॉट बुक करें।",
    "sec_quick": "त्वरित स्वास्थ्य सेवा",
    "sec_queue": "लाइव ओपीडी टोकन डिस्प्ले",
    "sec_doctors": "हमारे विशेषज्ञ डॉक्टर्स",
    "sec_packages": "स्वास्थ्य जांच पैकेज",
    "sec_booking": "डॉक्टर परामर्श और टोकन बुक करें",
    "sec_beds": "लाइव अस्पताल बेड और आईसीयू स्थिति",
    "sec_track": "अपनी टोकन कतार ट्रैक करें",
    "btn_sos": "🚨 आपातकालीन एसओएस 108",
    "btn_calc": "🩺 स्वास्थ्य एवं बीएमआई कैलकुलेटर",
    "btn_book_now": "डॉक्टर स्लॉट बुक करें"
  },
  "pa": {
    "brand_name": "ਕੇਅਰਪਲਸ",
    "brand_tagline": "ਸੁਪਰ ਸਪੈਸ਼ਲਿਟੀ ਹਸਪਤਾਲ ਅਤੇ ਖੋਜ ਸੰਸਥਾਨ",
    "nav_home": "ਮੁੱਖ ਪੰਨਾ",
    "nav_opd": "ਓਪੀਡੀ ਅਤੇ ਡਾਕਟਰ",
    "nav_services": "ਹਸਪਤਾਲ ਸੇਵਾਵਾਂ",
    "nav_patient": "ਮਰੀਜ਼ ਦੇਖਭਾਲ",
    "nav_tokens": "ਮੇਰੇ ਟੋਕਨ",
    "nav_book": "ਡਾਕਟਰ ਸਲਾਟ ਬੁੱਕ ਕਰੋ",
    "nav_emergency": "ਐਮਰਜੈਂਸੀ ਐਸਓਐਸ 108",
    "nav_search": "ਡਾਕਟਰ ਅਤੇ ਸੇਵਾਵਾਂ ਖੋਜੋ (Ctrl+K)",
    "theme_dark": "ਡਾਰਕ ਮੋਡ",
    "theme_light": "ਲਾਈਟ ਮੋਡ",
    "btn_voice_ai": "ਆਵਾਜ਼ ਏਆਈ",
    "hero_trust_badge": "ਡੈਮੋ ਸੁਪਰ-ਸਪੈਸ਼ਲਿਟੀ ਹਸਪਤਾਲ ਪੋਰਟਲ • ਪ੍ਰੋਟੋਟਾਈਪ 24/7 ਐਮਰਜੈਂਸੀ ਅਤੇ ਡਿਜੀਟਲ ਓਪੀਡੀ",
    "hero_title": "ਤੁਹਾਡੇ ਅਤੇ ਤੁਹਾਡੇ ਪਰਿਵਾਰ ਲਈ ਭਰੋਸੇਯੋਗ ਸਿਹਤ ਸੰਭਾਲ",
    "hero_subtitle": "ਜੀਟੀ ਰੋਡ, ਫਗਵਾੜਾ, ਪੰਜਾਬ ਵਿਖੇ ਸਾਡੇ ਪ੍ਰਮੁੱਖ ਮੈਡੀਕਲ ਕੈਂਪਸ ਵਿੱਚ ਸੰਪੂਰਨ ਅਤੇ ਹਮਦਰਦ ਸਿਹਤ ਸੰਭਾਲ। 9 ਵਿਭਾਗਾਂ ਦੇ ਮਾਹਿਰ ਡਾਕਟਰਾਂ ਨਾਲ ਸਲਾਹ ਕਰੋ ਅਤੇ ਡਿਜੀਟਲ ਓਪੀਡੀ ਟੋਕਨਾਂ ਨਾਲ ਕਤਾਰਾਂ ਤੋਂ ਬਚੋ।",
    "hero_btn_book": "✨ ਓਪੀਡੀ ਸਲਾਹ ਅਤੇ ਟੋਕਨ ਬੁੱਕ ਕਰੋ ➔",
    "hero_btn_emergency": "🚨 24/7 ਐਮਰਜੈਂਸੀ ਐਸਓਐਸ (108)",
    "hero_link_track": "🔍 ਆਪਣੀ ਟੋਕਨ ਸਥਿਤੀ ਟ੍ਰੈਕ ਕਰੋ ➔",
    "hero_stat_specialties": "ਕਲੀਨਿਕਲ ਵਿਭਾਗ",
    "hero_stat_doctors": "ਸੀਨੀਅਰ ਮਾਹਰ ਡਾਕਟਰ",
    "hero_stat_wait": "ਔਸਤ ਉਡੀਕ ਸਮਾਂ",
    "hero_stat_trauma": "ਟਰਾਮਾ ਅਤੇ ਐਮਰਜੈਂਸੀ ਬੇਅਜ਼",
    "chip_overview": "ਸੰਖੇਪ",
    "chip_services": "ਸੇਵਾਵਾਂ ਹੱਬ",
    "chip_book": "ਮੁਲਾਕਾਤ ਬੁੱਕ ਕਰੋ",
    "chip_queue": "ਲਾਈਵ ਓਪੀਡੀ ਕਤਾਰ",
    "chip_specialists": "ਮਾਹਿਰ ਡਾਕਟਰ",
    "chip_tele": "ਟੈਲੀ-ਕੰਸਲਟ",
    "chip_beds": "ਬੈੱਡ ਅਤੇ ਆਈਸੀਯੂ",
    "chip_packages": "ਸਿਹਤ ਜਾਂਚ",
    "chip_track": "ਟੋਕਨ ਟ੍ਰੈਕ",
    "chip_insurance": "ਬੀਮਾ ਅਤੇ ਟੀਪੀਏ",
    "chip_lab": "ਲੈਬ ਰਿਪੋਰਟਾਂ",
    "chip_map": "ਹਸਪਤਾਲ ਨਕਸ਼ਾ",
    "chip_healthcard": "ਆਭਾ ਹੈਲਥ ਕਾਰਡ",
    "chip_pharmacy": "ਫਾਰਮੇਸੀ",
    "dock_book": "ਬੁੱਕ ਕਰੋ",
    "dock_emergency": "ਐਮਰਜੈਂਸੀ",
    "dock_track": "ਟ੍ਰੈਕ",
    "dock_call": "ਕਾਲ",
    "hub_title": "ਵਿਆਪਕ ਕਲੀਨਿਕਲ ਹੱਬ ਅਤੇ ਮਰੀਜ਼ ਸਹੂਲਤਾਂ",
    "hub_subtitle": "ਲਾਈਵ ਡਿਜੀਟਲ ਹਸਪਤਾਲ ਸੇਵਾਵਾਂ, ਮਸ਼ਵਰਾ, ਟੈਸਟ ਅਤੇ ਐਮਰਜੈਂਸੀ ਟਰਾਮਾ ਕੇਅਰ ਤੱਕ ਪਹੁੰਚੋ।",
    "tile_queue_title": "ਲਾਈਵ ਓਪੀਡੀ ਕਤਾਰ",
    "tile_queue_desc": "ਰੀਅਲ-ਟਾਈਮ ਕਤਾਰ ਸਥਿਤੀ ਅਤੇ ਟੋਕਨ ਉਡੀਕ ਦੇਖੋ",
    "tile_book_title": "ਓਪੀਡੀ ਮੁਲਾਕਾਤ ਬੁੱਕ ਕਰੋ",
    "tile_book_desc": "ਮਾਹਿਰ ਡਾਕਟਰ ਚੁਣੋ ਅਤੇ ਸਮਾਂ ਸਲਾਟ ਚੁਣੋ",
    "tile_beds_title": "ਹਸਪਤਾਲ ਬੈੱਡ ਸਮਰੱਥਾ",
    "tile_beds_desc": "ਲਾਈਵ ਆਈਸੀਯੂ, ਵੈਂਟੀਲੇਟਰ ਅਤੇ ਆਕਸੀਜਨ ਬੈੱਡ",
    "tile_doctors_title": "ਮਾਹਿਰ ਡਾਕਟਰ",
    "tile_doctors_desc": "9 ਵਿਭਾਗਾਂ ਦੇ 18 ਸੀਨੀਅਰ ਮਾਹਿਰਾਂ ਨੂੰ ਮਿਲੋ",
    "tile_tele_title": "ਟੈਲੀ-ਕੰਸਲਟੇਸ਼ਨ",
    "tile_tele_desc": "ਵੀਡੀਓ ਕਾਲ ਰਾਹੀਂ ਸੀਨੀਅਰ ਡਾਕਟਰਾਂ ਨਾਲ ਜੁੜੋ",
    "tile_packages_title": "ਸਿਹਤ ਜਾਂਚ",
    "tile_packages_desc": "ਪਰਿਵਾਰ ਲਈ ਰੋਕਥਾਮ ਸਿਹਤ ਜਾਂਚ ਪੈਕੇਜ",
    "tile_healthcard_title": "ਡਿਜੀਟਲ ਹੈਲਥ ਕਾਰਡ",
    "tile_healthcard_desc": "ਆਭਾ ਲਿੰਕਡ ਡਿਜੀਟਲ ਹਸਪਤਾਲ ਪਾਸ",
    "tile_pharmacy_title": "24/7 ਫਾਰਮੇਸੀ",
    "tile_pharmacy_desc": "ਦਵਾਈਆਂ ਆਰਡਰ ਕਰੋ ਅਤੇ ਪਰਚਾ ਅੱਪਲੋਡ ਕਰੋ",
    "tile_lab_title": "ਲੈਬ ਰਿਪੋਰਟਾਂ",
    "tile_lab_desc": "ਯੂਐਚਆਈਡੀ ਦੁਆਰਾ ਟੈਸਟ ਰਿਪੋਰਟਾਂ ਡਾਊਨਲੋਡ ਕਰੋ",
    "tile_wayfinder_title": "ਕੈਂਪਸ ਜੀਪੀਐਸ ਮੈਪ",
    "tile_wayfinder_desc": "ਹਸਪਤਾਲ ਅੰਦਰੂਨੀ ਨਕਸ਼ਾ ਅਤੇ ਰਸਤੇ",
    "tile_insurance_title": "ਬੀਮਾ ਅਤੇ ਟੀਪੀਏ",
    "tile_insurance_desc": "ਕੈਸ਼ਲੈੱਸ ਕਲੇਮ ਅਤੇ ਬੀਮਾ ਸਹਾਇਤਾ ਡੈਸਕ",
    "tile_sos_title": "ਐਮਰਜੈਂਸੀ ਟਰਾਮਾ ਐਸਓਐਸ",
    "tile_sos_desc": "24x7 ਐਂਬੂਲੈਂਸ ਅਤੇ ਐਮਰਜੈਂਸੀ ਹੈਲਪਲਾਈਨ",
    "sec_packages_title": "ਸਿਹਤ ਜਾਂਚ ਪੈਕੇਜ",
    "sec_packages_sub": "ਮਾਹਿਰ ਡਾਕਟਰਾਂ ਦੁਆਰਾ ਤਿਆਰ ਕੀਤੇ ਗਏ ਸੰਪੂਰਨ ਟੈਸਟ ਪੈਕੇਜ।",
    "pkg_tests": "ਸ਼ਾਮਲ ਟੈਸਟ",
    "pkg_book_btn": "ਪੈਕੇਜ ਬੁੱਕ ਕਰੋ",
    "pkg_popular": "ਸਭ ਤੋਂ ਪ੍ਰਸਿੱਧ",
    "sec_campus_title": "ਆਧੁਨਿਕ ਮੈਡੀਕਲ ਕੈਂਪਸ ਅਤੇ ਉੱਨਤ ਸਹੂਲਤਾਂ",
    "sec_campus_sub": "ਇਨਫੈਕਸ਼ਨ ਕੰਟਰੋਲ, ਤੇਜ਼ ਐਮਰਜੈਂਸੀ ਇਲਾਜ ਅਤੇ ਮਰੀਜ਼ ਆਰਾਮ ਲਈ ਬਣਾਇਆ ਗਿਆ ਬੁਨਿਆਦੀ ਢਾਂਚਾ।",
    "sec_faq_title": "ਅਕਸਰ ਪੁੱਛੇ ਜਾਣ ਵਾਲੇ ਸਵਾਲ",
    "sec_faq_sub": "ਓਪੀਡੀ ਟੋਕਨ, ਐਮਰਜੈਂਸੀ ਸੇਵਾਵਾਂ, ਡਾਕਟਰ ਦੇ ਸਮੇਂ ਅਤੇ ਬੀਮੇ ਸੰਬੰਧੀ ਆਮ ਸਵਾਲ।",
    "book_title": "ਡਾਕਟਰ ਸਲਾਹ ਅਤੇ ਟੋਕਨ ਬੁੱਕ ਕਰੋ",
    "lbl_dept": "ਹਸਪਤਾਲ ਵਿਭਾਗ",
    "lbl_doctor": "ਮਾਹਿਰ ਡਾਕਟਰ",
    "lbl_date": "ਮੁਲਾਕਾਤ ਦੀ ਮਿਤੀ",
    "lbl_slot": "ਮਸ਼ਵਰੇ ਦਾ ਸਮਾਂ",
    "lbl_patient_name": "ਮਰੀਜ਼ ਦਾ ਪੂਰਾ ਨਾਮ",
    "ph_patient_name": "ਉਦਾ. ਗੁਰਪ੍ਰੀਤ ਸਿੰਘ",
    "lbl_mobile": "ਮੋਬਾਈਲ ਨੰਬਰ",
    "ph_mobile": "10-ਅੰਕੀ ਮੋਬਾਈਲ ਨੰਬਰ",
    "lbl_age": "ਉਮਰ (ਸਾਲ)",
    "ph_age": "ਉਦਾ. 35",
    "lbl_gender": "ਲਿੰਗ",
    "gender_male": "ਪੁਰਸ਼",
    "gender_female": "ਮਹਿਲਾ",
    "gender_other": "ਹੋਰ",
    "lbl_city": "ਸ਼ਹਿਰ / ਇਲਾਕਾ",
    "ph_city": "ਉਦਾ. ਫਗਵਾੜਾ, ਜਲੰਧਰ",
    "lbl_symptoms": "ਲੱਛਣ / ਸਮੱਸਿਆ",
    "ph_symptoms": "ਸੰਖੇਪ ਵਿੱਚ ਆਪਣੇ ਲੱਛਣ ਜਾਂ ਸਮੱਸਿਆ ਲਿਖੋ...",
    "lbl_fee": "ਮਸ਼ਵਰਾ ਫੀਸ (ਹਸਪਤਾਲ ਓਪੀਡੀ ਵਿਖੇ ਭੁਗਤਾਨ)",
    "btn_confirm": "ਮੁਲਾਕਾਤ ਪੱਕੀ ਕਰੋ ਅਤੇ ਟੋਕਨ ਪ੍ਰਾਪਤ ਕਰੋ",
    "btn_submit_booking": "ਮੁਲਾਕਾਤ ਪੱਕੀ ਕਰੋ ਅਤੇ ਟੋਕਨ ਪ੍ਰਾਪਤ ਕਰੋ",
    "btn_reschedule": "ਸਲਾਟ ਦਾ ਸਮਾਂ ਬਦਲੋ",
    "btn_cancel": "ਮੁਲਾਕਾਤ ਰੱਦ ਕਰੋ",
    "modal_queue_title": "ਲਾਈਵ ਓਪੀਡੀ ਟੋਕਨ ਡਿਸਪਲੇਅ",
    "modal_doctors_title": "ਸਾਡੇ ਮਾਹਰ ਹਸਪਤਾਲ ਡਾਕਟਰ",
    "modal_beds_title": "ਲਾਈਵ ਹਸਪਤਾਲ ਬੈੱਡ ਅਤੇ ਆਈਸੀਯੂ ਸਥਿਤੀ",
    "modal_track_title": "ਆਪਣੀ ਕਤਾਰ ਸਥਿਤੀ ਟ੍ਰੈਕ ਕਰੋ",
    "modal_sos_title": "🚨 ਐਮਰਜੈਂਸੀ ਐਂਬੂਲੈਂਸ ਅਤੇ ਟਰਾਮਾ ਡੈਸਕ",
    "modal_bookings_title": "ਮੇਰੇ ਬੁੱਕ ਕੀਤੇ ਟੋਕਨ",
    "btn_clear_data": "ਮੇਰਾ ਡੈਮੋ ਡਾਟਾ ਮਿਟਾਓ",
    "btn_reset_filters": "ਸਾਰੇ ਫਿਲਟਰ ਰੀਸੈੱਟ ਕਰੋ",
    "btn_download_epass": "ਈ-ਪਾਸ ਡਾਊਨਲੋਡ ਕਰੋ (PNG)",
    "btn_print": "🖨️ ਟੋਕਨ ਪਰਚੀ ਪ੍ਰਿੰਟ ਕਰੋ",
    "btn_share_wa": "📲 ਵਟਸਐਪ ਤੇ ਸਾਂਝਾ ਕਰੋ",
    "sos_title": "🚨 ਐਮਰਜੈਂਸੀ ਐਂਬੂਲੈਂਸ ਅਤੇ ਟਰਾਮਾ ਡੈਸਕ",
    "sos_dispatched": "ਐਂਬੂਲੈਂਸ #PB-09-8821 ਰਵਾਨਾ!",
    "sos_eta": "ਪਹੁੰਚਣ ਦਾ ਸਮਾਂ: 6 ਮਿੰਟ 45 ਸਕਿੰਟ",
    "bed_triage": "ਐਮਰਜੈਂਸੀ ਟ੍ਰਾਈਏਜ ਬੈੱਡ",
    "bed_icu": "ਆਈਸੀਯੂ ਗੰਭੀਰ ਦੇਖਭਾਲ",
    "bed_vent": "ਵੈਂਟੀਲੇਟਰ ਯੂਨਿਟ",
    "bed_o2": "ਆਕਸੀਜਨ ਸਪੋਰਟ ਬੈੱਡ",
    "call_hospital": "📞 ਹਸਪਤਾਲ ਕਾਲ (ਡੈਮੋ): 1800-000-0000",
    "call_108": "🚨 ਐਂਬੂਲੈਂਸ ਡਾਇਲ: 108",
    "wa_helpline": "💬 ਵਟਸਐਪ ਓਪੀਡੀ ਹੈਲਪ",
    "toast_booking_success": "ਮੁਲਾਕਾਤ ਸਫਲਤਾਪੂਰਵਕ ਬੁੱਕ ਹੋ ਗਈ! ਟੋਕਨ ਤਿਆਰ ਹੈ।",
    "toast_reschedule_success": "ਮੁਲਾਕਾਤ ਦਾ ਸਮਾਂ ਸਫਲਤਾਪੂਰਵਕ ਬਦਲ ਦਿੱਤਾ ਗਿਆ।",
    "toast_cancel_success": "ਮੁਲਾਕਾਤ ਰੱਦ ਕਰ ਦਿੱਤੀ ਗਈ।",
    "toast_data_cleared": "ਬ੍ਰਾਊਜ਼ਰ ਤੋਂ ਸਾਰਾ ਡੈਮੋ ਡਾਟਾ ਹਟਾ ਦਿੱਤਾ ਗਿਆ।",
    "toast_copied": "ਕਲਿੱਪਬੋਰਡ 'ਤੇ ਕਾਪੀ ਹੋ ਗਿਆ!",
    "toast_lang_changed": "ਭਾਸ਼ਾ ਪੰਜਾਬੀ ਵਿੱਚ ਬਦਲ ਦਿੱਤੀ ਗਈ ਹੈ।",
    "toast_theme_dark": "ਡਾਰਕ ਮੋਡ ਚਾਲੂ ਕੀਤਾ ਗਿਆ",
    "toast_theme_light": "ਲਾਈਟ ਮੋਡ ਚਾਲੂ ਕੀਤਾ ਗਿਆ",
    "empty_queue_title": "ਕੋਈ ਸਰਗਰਮ ਕਮਰਾ ਨਹੀਂ ਮਿਲਿਆ",
    "empty_queue_desc": "ਕਿਰਪਾ ਕਰਕੇ ਆਪਣੀ ਖੋਜ ਸਾਫ਼ ਕਰੋ ਜਾਂ 'ਸਾਰੇ ਕਮਰੇ' ਚੁਣੋ।",
    "empty_doctors_title": "ਤੁਹਾਡੀ ਖੋਜ ਅਨੁਸਾਰ ਕੋਈ ਡਾਕਟਰ ਨਹੀਂ ਮਿਲਿਆ",
    "empty_doctors_desc": "ਡਾਕਟਰ ਦੇ ਨਾਮ ਜਾਂ ਬਿਮਾਰੀ ਰਾਹੀਂ ਖੋਜੋ, ਜਾਂ ਫਿਲਟਰ ਰੀਸੈੱਟ ਕਰੋ।",
    "empty_bookings_title": "ਕੋਈ ਸਰਗਰਮ ਮੁਲਾਕਾਤ ਨਹੀਂ ਮਿਲੀ",
    "empty_bookings_desc": "ਤੁਹਾਡੇ ਬੁੱਕ ਕੀਤੇ ਟੋਕਨ ਇੱਥੇ ਦਿਖਾਈ ਦੇਣਗੇ। ਹੁਣੇ ਸਲਾਟ ਬੁੱਕ ਕਰੋ।",
    "sec_quick": "ਤੁਰੰਤ ਸਿਹਤ ਸੇਵਾ",
    "sec_queue": "ਲਾਈਵ ਓਪੀਡੀ ਟੋਕਨ ਡਿਸਪਲੇਅ",
    "sec_doctors": "ਸਾਡੇ ਮਾਹਰ ਹਸਪਤਾਲ ਡਾਕਟਰ",
    "sec_packages": "ਸਿਹਤ ਜਾਂਚ ਪੈਕੇਜ",
    "sec_booking": "ਡਾਕਟਰ ਸਲਾਹ ਅਤੇ ਟੋਕਨ ਬੁੱਕ ਕਰੋ",
    "sec_beds": "ਲਾਈਵ ਹਸਪਤਾਲ ਬੈੱਡ ਅਤੇ ਆਈਸੀਯੂ ਸਥਿਤੀ",
    "sec_track": "ਆਪਣੀ ਕਤਾਰ ਸਥਿਤੀ ਟ੍ਰੈਕ ਕਰੋ",
    "btn_sos": "🚨 ਐਮਰਜੈਂਸੀ ਐਸਓਐਸ 108",
    "btn_calc": "🩺 ਸਿਹਤ ਅਤੇ ਬੀਐਮਆਈ ਕੈਲਕੁਲੇਟਰ",
    "btn_book_now": "ਡਾਕਟਰ ਸਲਾਟ ਬੁੱਕ ਕਰੋ"
  }
};

function isDevMode() {
  return typeof window !== 'undefined' && 
    (window.location.search.includes('dev=1') || window.location.hostname === 'localhost' && window.location.search.includes('dev=1'));
}

/**
 * Helper to translate key with fallback to English or default text
 * Logs missing keys in dev mode only
 */
function t(key, fallback = '') {
  if (!key) return fallback;
  const lang = (window.LanguageEngine && window.LanguageEngine.currentLang) || 'en';
  
  // Try current language
  if (TRANSLATIONS[lang] && TRANSLATIONS[lang][key] !== undefined) {
    return TRANSLATIONS[lang][key];
  }
  
  // Fall back to English
  if (TRANSLATIONS['en'] && TRANSLATIONS['en'][key] !== undefined) {
    if (isDevMode() && lang !== 'en') {
      console.warn(`[i18n dev] Missing "${lang}" translation for key "${key}", fell back to "en"`);
    }
    return TRANSLATIONS['en'][key];
  }
  
  // Missing entirely
  if (isDevMode()) {
    console.warn(`[i18n dev] Missing translation key "${key}" in all dictionaries`);
  }
  return fallback || key;
}

const LanguageEngine = {
  currentLang: 'en',

  init() {
    const saved = localStorage.getItem('carepulse_lang') || 'en';
    this.setLanguage(saved, false);
  },

  setLanguage(lang, notify = true) {
    if (!TRANSLATIONS[lang]) lang = 'en';
    const prevLang = this.currentLang;
    this.currentLang = lang;
    try {
      localStorage.setItem('carepulse_lang', lang);
    } catch (e) {}

    document.documentElement.setAttribute('lang', lang);

    // Update active pill button
    const pills = document.querySelectorAll('.lang-pill-btn');
    pills.forEach(p => {
      p.classList.toggle('active', p.getAttribute('data-lang') === lang);
      p.setAttribute('aria-pressed', p.getAttribute('data-lang') === lang ? 'true' : 'false');
    });

    // Translate all elements with data-i18n
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      const text = t(key);
      if (text) {
        // If element contains icon child, preserve or replace text content cleanly
        const iconChild = el.querySelector('.u-icon-decorative, .dock-icon, .btn-icon');
        if (iconChild) {
          // Update text nodes after icon
          const textNodes = Array.from(el.childNodes).filter(node => node.nodeType === Node.TEXT_NODE);
          if (textNodes.length > 0) {
            textNodes[textNodes.length - 1].textContent = ' ' + text.trim();
          } else {
            el.appendChild(document.createTextNode(' ' + text.trim()));
          }
        } else {
          el.textContent = text;
        }
      }
    });

    // Translate placeholders
    const placeholders = document.querySelectorAll('[data-i18n-placeholder]');
    placeholders.forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const text = t(key);
      if (text) {
        el.setAttribute('placeholder', text);
      }
    });

    // Translate titles / aria-labels
    const titled = document.querySelectorAll('[data-i18n-title]');
    titled.forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      const text = t(key);
      if (text) {
        el.setAttribute('title', text);
        el.setAttribute('aria-label', text);
      }
    });

    if (notify && prevLang !== lang) {
      showToast(t('toast_lang_changed', 'Language updated.'), 'info');
    }
  }
};

window.TRANSLATIONS = TRANSLATIONS;
window.LanguageEngine = LanguageEngine;
window.setLanguage = (lang) => LanguageEngine.setLanguage(lang, true);
window.t = t;

export {
  TRANSLATIONS,
  LanguageEngine,
  setLanguage,
  t
};
