// CarePulse Configuration & State Store
const DEMO_PHONE = '1800-000-0000';
const DEMO_PHONE_RAW = '18000000000';
const DEMO_WHATSAPP = '910000000000';
const DEMO_WHATSAPP_DISPLAY = '+91 00000 00000';
const DEMO_STAFF_PIN = '2026';

// Dynamically synchronize canonical link and og:url with whatever live domain is hosting the app (e.g. Vercel)
(function syncSEOWithCurrentHost() {
  if (typeof window !== 'undefined' && window.location && window.location.protocol && window.location.protocol.startsWith('http')) {
    const liveCanonical = window.location.origin + window.location.pathname;
    const canonEl = document.querySelector('link[rel="canonical"]');
    if (canonEl) canonEl.setAttribute('href', liveCanonical);
    const ogUrlEl = document.querySelector('meta[property="og:url"]');
    if (ogUrlEl) ogUrlEl.setAttribute('content', liveCanonical);
  }
})();



const DOCTORS = [
  // --- General Physicians ---
  {
    id: 'doc-gp-1',
    name: 'Dr. Rajesh Sharma',
    specialty: 'General Physician',
    specialtyKey: 'general',
    qualifications: 'MBBS, MD (General Medicine - Premier Institute of Medical Sciences)',
    regNo: 'Faculty ID: CP-MED-101 (Demo Profile)',
    languages: 'English, Hindi, Punjabi',
    days: 'Mon - Sat',
    experience: '16 Years Exp',
    fee: 500,
    feeDisplay: '₹500',
    hours: '09:00 AM - 01:00 PM & 05:00 PM - 08:30 PM',
    room: 'Room 101, Ground Floor (General OPD)',
    rating: 4.93,
    reviewsCount: '1,840 demo consultations',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
    availableToday: true,
    status: 'In OPD',
    currentServingToken: 14,
    totalTodayTokens: 28,
    avgWaitPerPatient: 12,
    keywords: ['fever', 'cold', 'flu', 'cough', 'headache', 'diabetes', 'bp', 'general', 'physician', 'body pain', 'viral', 'rajesh', 'sharma']
  },
  {
    id: 'doc-gp-2',
    name: 'Dr. Priya Nair',
    specialty: 'General Physician',
    specialtyKey: 'general',
    qualifications: 'MBBS, DNB (Family & Internal Medicine - Apex Medical College)',
    regNo: 'Faculty ID: CP-MED-102 (Demo Profile)',
    languages: 'English, Hindi, Malayalam',
    days: 'Mon - Sat',
    experience: '11 Years Exp',
    fee: 450,
    feeDisplay: '₹450',
    hours: '10:00 AM - 02:00 PM & 06:00 PM - 09:00 PM',
    room: 'Room 102, Ground Floor (General OPD Bay B)',
    rating: 4.90,
    reviewsCount: '1,290 demo consultations',
    avatar: 'https://images.unsplash.com/photo-1594824813689-ff4a20b784a0?auto=format&fit=crop&w=400&q=80',
    availableToday: true,
    status: 'In OPD',
    currentServingToken: 9,
    totalTodayTokens: 21,
    avgWaitPerPatient: 10,
    keywords: ['fever', 'thyroid', 'stomach pain', 'infection', 'general', 'physician', 'priya', 'nair', 'fatigue']
  },
  {
    id: 'doc-gp-3',
    name: 'Dr. Amitav Banerjee',
    specialty: 'General Physician',
    specialtyKey: 'general',
    qualifications: 'MBBS, MD (Senior Physician & Diabetologist - State Medical Academy)',
    regNo: 'NMC-29481 (National Medical Commission)',
    languages: 'English, Hindi, Bengali',
    days: 'Mon - Fri',
    experience: '18 Years Exp',
    fee: 600,
    feeDisplay: '₹600',
    hours: '08:30 AM - 12:30 PM & 04:30 PM - 07:30 PM',
    room: 'Room 103, Ground Floor (Executive OPD)',
    rating: 4.96,
    reviewsCount: '2,100 demo consultations',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80',
    availableToday: true,
    status: 'In OPD',
    currentServingToken: 18,
    totalTodayTokens: 32,
    avgWaitPerPatient: 15,
    keywords: ['hypertension', 'sugar', 'diabetes', 'fatigue', 'senior', 'amitav', 'banerjee', 'blood pressure']
  },

  // --- Cardiology & Heart Care ---
  {
    id: 'doc-card-1',
    name: 'Dr. Gurpreet Singh Sandhu',
    specialty: 'Cardiologist',
    specialtyKey: 'cardiology',
    qualifications: 'MBBS, MD (Medicine), DM (Cardiology - National Postgraduate Medical Institute)',
    regNo: 'CP-MED-38291 (Demo Profile)',
    languages: 'English, Hindi, Punjabi',
    days: 'Mon - Sat',
    experience: '19 Years Exp',
    fee: 650,
    feeDisplay: '₹650',
    hours: '09:00 AM - 01:00 PM & 04:00 PM - 07:00 PM',
    room: 'Room 201, 2nd Floor (Cardiology & Echo Lab)',
    rating: 4.97,
    reviewsCount: '2,450 demo consultations',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
    availableToday: true,
    status: 'In OPD',
    currentServingToken: 11,
    totalTodayTokens: 25,
    avgWaitPerPatient: 16,
    keywords: ['heart', 'cardiac', 'chest pain', 'bp', 'hypertension', 'angioplasty', 'ecg', 'echo', 'gurpreet', 'sandhu']
  },
  {
    id: 'doc-card-2',
    name: 'Dr. Navjot Kaur Dhillon',
    specialty: 'Cardiologist',
    specialtyKey: 'cardiology',
    qualifications: 'MBBS, MD, DNB (Cardiology - Metro Heart & Vascular Institute)',
    regNo: 'CP-MED-44120 (Demo Profile)',
    languages: 'English, Hindi, Punjabi',
    days: 'Tue - Sun',
    experience: '12 Years Exp',
    fee: 600,
    feeDisplay: '₹600',
    hours: '10:00 AM - 02:00 PM & 05:00 PM - 08:00 PM',
    room: 'Room 203, 2nd Floor (Heart Failure Clinic)',
    rating: 4.92,
    reviewsCount: '1,380 demo consultations',
    avatar: 'https://images.unsplash.com/photo-1594824813689-ff4a20b784a0?auto=format&fit=crop&w=400&q=80',
    availableToday: true,
    status: 'In OPD',
    currentServingToken: 7,
    totalTodayTokens: 19,
    avgWaitPerPatient: 14,
    keywords: ['palpitations', 'cholesterol', 'cardiac risk', 'heart attack', 'navjot', 'dhillon']
  },

  // --- Orthopedics & Joint Replacement ---
  {
    id: 'doc-ortho-1',
    name: 'Dr. Maninderjit Bawa',
    specialty: 'Orthopedic Surgeon',
    specialtyKey: 'orthopedics',
    qualifications: 'MBBS, MS (Orthopedics - Regional Medical College), MCh Ortho (UK)',
    regNo: 'CP-MED-41209 (Demo Profile)',
    languages: 'English, Hindi, Punjabi',
    days: 'Mon - Sat',
    experience: '17 Years Exp',
    fee: 600,
    feeDisplay: '₹600',
    hours: '09:30 AM - 01:30 PM & 04:30 PM - 07:30 PM',
    room: 'Room 106, Ground Floor (Joint & Spine Clinic)',
    rating: 4.95,
    reviewsCount: '2,180 demo consultations',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80',
    availableToday: true,
    status: 'In OPD',
    currentServingToken: 13,
    totalTodayTokens: 26,
    avgWaitPerPatient: 15,
    keywords: ['knee pain', 'joint replacement', 'arthritis', 'back pain', 'spine', 'fracture', 'bone', 'maninderjit', 'bawa']
  },
  {
    id: 'doc-ortho-2',
    name: 'Dr. Harmeet Ahluwalia',
    specialty: 'Orthopedic Surgeon',
    specialtyKey: 'orthopedics',
    qualifications: 'MBBS, D.Ortho, DNB (Orthopedics - Apex Orthopedic Institute)',
    regNo: 'CP-MED-48190 (Demo Profile)',
    languages: 'English, Hindi, Punjabi',
    days: 'Mon, Wed, Fri, Sat',
    experience: '11 Years Exp',
    fee: 500,
    feeDisplay: '₹500',
    hours: '11:00 AM - 03:00 PM & 05:30 PM - 08:30 PM',
    room: 'Room 107, Ground Floor (Sports Injury & Trauma Bay)',
    rating: 4.89,
    reviewsCount: '1,120 demo consultations',
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80',
    availableToday: true,
    status: 'In OPD',
    currentServingToken: 6,
    totalTodayTokens: 18,
    avgWaitPerPatient: 12,
    keywords: ['ligament', 'sports injury', 'shoulder pain', 'slip disc', 'harmeet', 'ahluwalia']
  },

  // --- Gynecology & Obstetrics ---
  {
    id: 'doc-gyn-1',
    name: 'Dr. Simranjit Kaur Randhawa',
    specialty: 'Gynecologist & Obstetrician',
    specialtyKey: 'gynecology',
    qualifications: 'MBBS, MS (Obstetrics & Gynaecology - Government Medical College), Fellowship Infertility',
    regNo: 'CP-MED-45812 (Demo Profile)',
    languages: 'English, Hindi, Punjabi',
    days: 'Mon - Sat',
    experience: '15 Years Exp',
    fee: 550,
    feeDisplay: '₹550',
    hours: '09:00 AM - 01:00 PM & 04:30 PM - 07:30 PM',
    room: 'Room 205, 2nd Floor (Women Wellness Centre)',
    rating: 4.96,
    reviewsCount: '2,320 demo consultations',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80',
    availableToday: true,
    status: 'In OPD',
    currentServingToken: 12,
    totalTodayTokens: 27,
    avgWaitPerPatient: 15,
    keywords: ['pregnancy', 'maternity', 'gynecology', 'pcos', 'infertility', 'delivery', 'women health', 'simranjit']
  },
  {
    id: 'doc-gyn-2',
    name: 'Dr. Manpreet Saini',
    specialty: 'Gynecologist & Obstetrician',
    specialtyKey: 'gynecology',
    qualifications: 'MBBS, DGO, DNB (Obstetrics & Gynecology - Postgraduate Medical Institute)',
    regNo: 'CP-MED-52190 (Demo Profile)',
    languages: 'English, Hindi, Punjabi',
    days: 'Mon - Fri',
    experience: '10 Years Exp',
    fee: 500,
    feeDisplay: '₹500',
    hours: '10:30 AM - 02:30 PM & 05:00 PM - 08:00 PM',
    room: 'Room 206, 2nd Floor (Antenatal Care Unit)',
    rating: 4.90,
    reviewsCount: '1,040 demo consultations',
    avatar: 'https://images.unsplash.com/photo-1594824813689-ff4a20b784a0?auto=format&fit=crop&w=400&q=80',
    availableToday: true,
    status: 'In OPD',
    currentServingToken: 8,
    totalTodayTokens: 20,
    avgWaitPerPatient: 14,
    keywords: ['periods', 'irregular cycle', 'ultrasound', 'pelvic pain', 'manpreet', 'saini']
  },

  // --- ENT (Ear, Nose, Throat) ---
  {
    id: 'doc-ent-1',
    name: 'Dr. Harvinder Singh Kohli',
    specialty: 'ENT Specialist',
    specialtyKey: 'ent',
    qualifications: 'MBBS, MS (ENT / Otorhinolaryngology - State Medical College)',
    regNo: 'CP-MED-39145 (Demo Profile)',
    languages: 'English, Hindi, Punjabi',
    days: 'Mon - Sat',
    experience: '14 Years Exp',
    fee: 450,
    feeDisplay: '₹450',
    hours: '09:30 AM - 01:30 PM & 05:00 PM - 08:00 PM',
    room: 'Room 208, 2nd Floor (ENT & Audiology Suite)',
    rating: 4.92,
    reviewsCount: '1,560 demo consultations',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
    availableToday: true,
    status: 'In OPD',
    currentServingToken: 9,
    totalTodayTokens: 22,
    avgWaitPerPatient: 12,
    keywords: ['ear pain', 'hearing', 'sinus', 'tonsils', 'throat', 'vertigo', 'nasal', 'harvinder', 'kohli']
  },

  // --- Ophthalmology (Eye Care) ---
  {
    id: 'doc-eye-1',
    name: 'Dr. Ravneet Oberoi',
    specialty: 'Eye Specialist',
    specialtyKey: 'ophthalmology',
    qualifications: 'MBBS, MS (Ophthalmology - National Eye Centre)',
    regNo: 'CP-MED-54911 (Demo Profile)',
    languages: 'English, Hindi, Punjabi',
    days: 'Mon - Sat',
    experience: '12 Years Exp',
    fee: 450,
    feeDisplay: '₹450',
    hours: '09:00 AM - 01:00 PM & 04:00 PM - 07:30 PM',
    room: 'Room 210, 2nd Floor (Precision Eye & Cataract Suite)',
    rating: 4.94,
    reviewsCount: '1,720 demo consultations',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80',
    availableToday: true,
    status: 'In OPD',
    currentServingToken: 11,
    totalTodayTokens: 25,
    avgWaitPerPatient: 14,
    keywords: ['eye', 'cataract', 'vision', 'lasik', 'glaucoma', 'glasses', 'cornea', 'ravneet', 'oberoi']
  },

  // --- Pediatricians (Child Specialists) ---
  {
    id: 'doc-ped-1',
    name: 'Dr. Ananya Mukherjee',
    specialty: 'Pediatrician',
    specialtyKey: 'pediatrician',
    qualifications: 'MBBS, MD (Pediatrics & Neonatology - Metro Institute of Child Health)',
    regNo: 'CP-MED-47819 (Demo Profile)',
    languages: 'English, Hindi, Bengali',
    days: 'Mon - Sat',
    experience: '12 Years Exp',
    fee: 500,
    feeDisplay: '₹500',
    hours: '09:30 AM - 01:30 PM & 04:30 PM - 07:30 PM',
    room: 'Room 104, 1st Floor (Child Wellness Unit)',
    rating: 4.95,
    reviewsCount: '1,480 demo consultations',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80',
    availableToday: true,
    status: 'In OPD',
    currentServingToken: 8,
    totalTodayTokens: 20,
    avgWaitPerPatient: 15,
    keywords: ['child', 'baby', 'pediatric', 'vaccination', 'infant', 'kids', 'growth', 'newborn', 'ananya', 'mukherjee']
  },
  {
    id: 'doc-ped-2',
    name: 'Dr. Vikramaditya Joshi',
    specialty: 'Pediatrician',
    specialtyKey: 'pediatrician',
    qualifications: 'MBBS, DCH (Child Health & Immunization - National Postgraduate Institute)',
    regNo: 'CP-MED-50931 (Demo Profile)',
    languages: 'English, Hindi, Marathi',
    days: 'Mon - Fri',
    experience: '9 Years Exp',
    fee: 450,
    feeDisplay: '₹450',
    hours: '10:00 AM - 02:00 PM & 05:00 PM - 08:00 PM',
    room: 'Room 105, 1st Floor (Pediatric Clinic B)',
    rating: 4.88,
    reviewsCount: '950 demo consultations',
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80',
    availableToday: true,
    status: 'In OPD',
    currentServingToken: 5,
    totalTodayTokens: 16,
    avgWaitPerPatient: 12,
    keywords: ['kids', 'baby flu', 'cough', 'vaccine', 'nutrition', 'vikram', 'joshi', 'pediatrician', 'fever']
  },

  // --- Dermatologists (Skin, Hair & Aesthetics) ---
  {
    id: 'doc-derma-1',
    name: 'Dr. Meera Krishnan',
    specialty: 'Dermatologist',
    specialtyKey: 'dermatologist',
    qualifications: 'MBBS, MD (Dermatology, Venereology & Leprosy - Premier Institute of Dermatology)',
    regNo: 'CP-MED-46201 (Demo Profile)',
    languages: 'English, Hindi, Tamil',
    days: 'Mon - Sat',
    experience: '10 Years Exp',
    fee: 600,
    feeDisplay: '₹600',
    hours: '10:00 AM - 02:00 PM & 05:00 PM - 08:00 PM',
    room: 'Room 202, 2nd Floor (Skin & Derma Suite)',
    rating: 4.91,
    reviewsCount: '1,340 demo consultations',
    avatar: 'https://images.unsplash.com/photo-1594824813689-ff4a20b784a0?auto=format&fit=crop&w=400&q=80',
    availableToday: true,
    status: 'In OPD',
    currentServingToken: 11,
    totalTodayTokens: 24,
    avgWaitPerPatient: 14,
    keywords: ['skin', 'derma', 'acne', 'rash', 'allergy', 'hair fall', 'eczema', 'pigmentation', 'dermatologist', 'meera', 'krishnan']
  },
  {
    id: 'doc-derma-2',
    name: 'Dr. Rohan Varma',
    specialty: 'Dermatologist',
    specialtyKey: 'dermatologist',
    qualifications: 'MBBS, DDVL (Aesthetic Dermatology & Trichology - State Medical College)',
    regNo: 'CP-MED-49112 (Demo Profile)',
    languages: 'English, Hindi, Punjabi',
    days: 'Tue - Sun',
    experience: '8 Years Exp',
    fee: 550,
    feeDisplay: '₹550',
    hours: '11:00 AM - 03:00 PM & 06:00 PM - 08:30 PM',
    room: 'Room 204, 2nd Floor (Aesthetic & Hair Clinic)',
    rating: 4.86,
    reviewsCount: '810 demo consultations',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80',
    availableToday: true,
    status: 'In OPD',
    currentServingToken: 7,
    totalTodayTokens: 18,
    avgWaitPerPatient: 15,
    keywords: ['hair loss', 'scalp', 'dandruff', 'laser', 'glow', 'skin care', 'rohan', 'varma', 'psoriasis']
  },

  // --- Dentists (Oral & Maxillofacial Surgeons) ---
  {
    id: 'doc-dent-1',
    name: 'Dr. Suresh Kulkarni',
    specialty: 'Dentist',
    specialtyKey: 'dentist',
    qualifications: 'BDS, MDS (Orthodontics & Dentofacial Orthopedics - Government Dental College)',
    regNo: 'PDC-12490 (Punjab Dental Council)',
    languages: 'English, Hindi, Marathi',
    days: 'Mon - Sat',
    experience: '14 Years Exp',
    fee: 400,
    feeDisplay: '₹400',
    hours: '09:00 AM - 01:00 PM & 04:00 PM - 08:00 PM',
    room: 'Room 108, Ground Floor (Advanced Dental Suite)',
    rating: 4.94,
    reviewsCount: '1,620 demo consultations',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
    availableToday: true,
    status: 'In OPD',
    currentServingToken: 12,
    totalTodayTokens: 25,
    avgWaitPerPatient: 16,
    keywords: ['teeth', 'tooth', 'dentist', 'cavity', 'braces', 'aligners', 'root canal', 'cleaning', 'dental', 'suresh', 'kulkarni']
  },
  {
    id: 'doc-dent-2',
    name: 'Dr. Pooja Deshmukh',
    specialty: 'Dentist',
    specialtyKey: 'dentist',
    qualifications: 'BDS, MDS (Conservative Dentistry & Endodontics - State Dental College)',
    regNo: 'PDC-14981 (Punjab Dental Council)',
    languages: 'English, Hindi, Marathi',
    days: 'Mon - Fri',
    experience: '9 Years Exp',
    fee: 450,
    feeDisplay: '₹450',
    hours: '09:30 AM - 01:30 PM & 05:00 PM - 08:30 PM',
    room: 'Room 109, Ground Floor (Dental Care Bay)',
    rating: 4.89,
    reviewsCount: '1,050 demo consultations',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80',
    availableToday: true,
    status: 'In OPD',
    currentServingToken: 6,
    totalTodayTokens: 18,
    avgWaitPerPatient: 18,
    keywords: ['toothache', 'rct', 'root canal', 'filling', 'bleaching', 'pooja', 'deshmukh', 'dental']
  },
  {
    id: 'doc-dent-3',
    name: 'Dr. Arjun Singhania',
    specialty: 'Dentist',
    specialtyKey: 'dentist',
    qualifications: 'BDS, MDS (Oral & Maxillofacial Implantology - Apex Dental Institute)',
    regNo: 'PDC-11822 (Punjab Dental Council)',
    languages: 'English, Hindi, Punjabi',
    days: 'Mon, Wed, Thu, Sat',
    experience: '13 Years Exp',
    fee: 500,
    feeDisplay: '₹500',
    hours: '10:30 AM - 02:30 PM & 05:30 PM - 08:30 PM',
    room: 'Room 110, Ground Floor (Dental Surgery Suite)',
    rating: 4.92,
    reviewsCount: '1,180 demo consultations',
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80',
    availableToday: true,
    status: 'In OPD',
    currentServingToken: 10,
    totalTodayTokens: 22,
    avgWaitPerPatient: 20,
    keywords: ['implant', 'wisdom tooth', 'gum surgery', 'crown', 'bridge', 'arjun', 'singhania', 'dental']
  }
];

// Time slot catalog
const SLOT_TEMPLATES = {
  morning: ['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM'],
  afternoon: ['02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'],
  evening: ['05:30 PM', '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM', '08:00 PM']
};

// Application State
const state = {
  activeSpecialty: 'all',
  searchQuery: '',
  selectedDoctorId: DOCTORS[0].id,
  selectedDate: '',
  selectedSlot: '',
  selectedSlotSession: '',
  bookedSlotsCache: (function () {
    try {
      return JSON.parse(localStorage.getItem('carepulse_booked_slots') || '{}');
    } catch (e) {
      return {};
    }
  })(),
  userAppointments: [],
  lastCreatedToken: null,
  queueSpecialty: 'all',
  queueSearch: '',
  queueAutoSimInterval: null
};

// --- Web Audio Chime Generator (Realistic Clinic Bell) ---


const CLINIC_BRANCHES = {
  phagwara: {
    city: 'Phagwara, Punjab',
    name: 'CarePulse Multi-Specialty Hospital & Research Institute',
    address: 'GT Road, Near Sugar Mill Crossing, Model Town, Phagwara, Punjab - 144401, India',
    phone: `+91 0000 000000 (Demo) / ${DEMO_PHONE}`,
    emergency: `${DEMO_PHONE} (Demo) / 108 (Real Emergency)`,
    hours: '08:00 AM – 10:00 PM (Emergency 24/7)'
  },
  ludhiana: {
    city: 'Ludhiana, Punjab',
    name: 'CarePulse Healthcare Pavilion (Ludhiana OPD Center)',
    address: 'Ferozepur Road, Near Mall Road Crossing, Ludhiana, Punjab - 141001',
    phone: `+91 000 000 0000 (Demo) / ${DEMO_PHONE}`,
    emergency: `${DEMO_PHONE} (Demo) / 108 (Real Emergency)`,
    hours: '08:30 AM – 08:30 PM'
  }
};

window.switchBranch = function (branchKey) {
  const branch = CLINIC_BRANCHES[branchKey];
  if (!branch) return;

  const locEls = document.querySelectorAll('.branch-location-text');
  locEls.forEach(el => el.textContent = `📍 ${branch.name} • ${branch.city}`);

  const addrEls = document.querySelectorAll('.branch-address-text');
  addrEls.forEach(el => el.textContent = branch.address);

  const phoneEls = document.querySelectorAll('.branch-phone-text');
  phoneEls.forEach(el => el.textContent = branch.phone);

  const emergEls = document.querySelectorAll('.branch-emergency-text');
  emergEls.forEach(el => {
    el.innerHTML = `<a href="tel:108" class="emergency-link">🚨 Ambulance: 108</a> <a href="tel:18000000000" class="demo-link" data-action="open-emergency-modal">📞 Demo helpline (placeholder): ${branch.emergency}</a>`;
  });

  if (typeof showToast === 'function') {
    showToast(`Switched hospital branch to ${branch.city}!`, 'info');
  }
};

// 2. CarePulse ProHealth Preventive Checkup Packages
const HEALTH_PACKAGES = [
  {
    id: 'pkg-basic',
    name: 'Basic Vital Wellness Screen',
    testsCount: '32 Essential Tests',
    price: 999,
    originalPrice: null,
    discount: 'All-Inclusive',
    popular: false,
    desc: 'Comprehensive baseline screening for active adults & working professionals.',
    features: [
      'Complete Hemogram / CBC (24 parameters)',
      'Fasting Blood Sugar (Diabetes screening)',
      'Total Lipid Profile (Cholesterol, HDL, LDL, Triglycerides)',
      'Routine Urine & Microscopic Analysis',
      'Free Physician Telephonic Review & Report Consultation'
    ]
  },
  {
    id: 'pkg-exec',
    name: 'Executive Full Body Health Check',
    testsCount: '64 Comprehensive Tests',
    price: 2499,
    originalPrice: null,
    discount: 'Popular Choice',
    popular: true,
    desc: 'Comprehensive multi-organ clinical screening evaluating Liver, Kidneys, Thyroid, Heart, and Vitamins.',
    features: [
      'Liver Function Test - LFT (11 parameters)',
      'Kidney Function Test - KFT & Serum Creatinine',
      'Thyroid Profile Total (T3, T4, TSH)',
      'Cardiac Risk: Digital 12-Lead ECG & Chest Screening',
      'Vitamin D3 (25-OH) & Vitamin B12 Levels',
      'Senior Consultant Physician 1-on-1 Review'
    ]
  },
  {
    id: 'pkg-senior',
    name: 'Senior Citizen Vital Care Package',
    testsCount: '58 Specialized Tests',
    price: 1899,
    originalPrice: null,
    discount: 'Geriatric Panel',
    popular: false,
    desc: 'Formulated for ages 55+ focusing on joint mobility, cardiac markers, and glycemic control.',
    features: [
      'HbA1c 3-Month Glycemic Average',
      'High Sensitivity CRP (Cardiac Inflammation Risk)',
      'Serum Calcium, Phosphorus & Uric Acid',
      'Complete Kidney & Electrolyte Panel',
      'Complimentary Free Home Sample Collection included'
    ]
  },
  {
    id: 'pkg-women',
    name: "Women's Advanced Health & Cancer Screen",
    testsCount: '48 Specialized Tests',
    price: 2199,
    originalPrice: null,
    discount: 'Women Care',
    popular: false,
    desc: 'Specialized hormone profile, thyroid, bone mineral screen, and cancer prevention markers.',
    features: [
      'Thyroid Function & Iron Deficiency Panel (Ferritin, TIBC)',
      'Clinical Breast Examination / Mammogram voucher',
      'Pelvic Ultrasound screening voucher',
      'Serum Calcium & Bone Health screening',
      'Free Consultation with Senior Female Gynecologist'
    ]
  }
];

let activePackageBooking = null;



const SAMPLE_LAB_REPORTS = {
  'UHID-98214': {
    uhid: 'UHID-98214',
    patientName: 'Mr. Rajesh Kumar (Demo Patient)',
    registeredMobile: '+91 98765-43210',
    ageGender: '42 Y / Male',
    refDoctor: 'Dr. Rajesh Sharma, MD',
    collectionDate: 'Today, 07:45 AM',
    reportDate: 'Today, 11:30 AM',
    status: 'Verified & Signed',
    tests: [
      { name: 'Hemoglobin (Hb)', result: '14.8', unit: 'g/dL', normal: '13.0 - 17.0', flag: 'normal' },
      { name: 'Total Leucocyte Count (WBC)', result: '7,400', unit: '/cu.mm', normal: '4,000 - 11,000', flag: 'normal' },
      { name: 'Platelet Count', result: '2.65', unit: 'Lakhs/cu.mm', normal: '1.50 - 4.50', flag: 'normal' },
      { name: 'Fasting Blood Glucose', result: '94', unit: 'mg/dL', normal: '70 - 100', flag: 'normal' },
      { name: 'HbA1c (Glycated Hemoglobin)', result: '5.4', unit: '%', normal: '< 5.7', flag: 'normal' },
      { name: 'Total Cholesterol', result: '168', unit: 'mg/dL', normal: '< 200', flag: 'normal' },
      { name: 'Serum Creatinine', result: '0.90', unit: 'mg/dL', normal: '0.60 - 1.20', flag: 'normal' }
    ]
  },
  'UHID-44021': {
    uhid: 'UHID-44021',
    patientName: 'Mrs. Sunita Rao',
    registeredMobile: '+91 98765-54321',
    ageGender: '56 Y / Female',
    refDoctor: 'Dr. Amitav Banerjee, MD',
    collectionDate: 'Yesterday, 08:30 AM',
    reportDate: 'Yesterday, 02:15 PM',
    status: 'Verified & Signed',
    tests: [
      { name: 'Fasting Blood Glucose', result: '146', unit: 'mg/dL', normal: '70 - 100', flag: 'high' },
      { name: 'HbA1c (Diabetic Indicator)', result: '7.8', unit: '%', normal: '< 5.7', flag: 'high' },
      { name: 'Total Serum Cholesterol', result: '224', unit: 'mg/dL', normal: '< 200', flag: 'high' },
      { name: 'Triglycerides', result: '185', unit: 'mg/dL', normal: '< 150', flag: 'high' },
      { name: 'Serum Creatinine (Kidney)', result: '0.85', unit: 'mg/dL', normal: '0.50 - 1.10', flag: 'normal' },
      { name: 'Vitamin D3 (25-OH)', result: '18.4', unit: 'ng/mL', normal: '30 - 100 (Deficient)', flag: 'high' },
      { name: 'Vitamin B12', result: '240', unit: 'pg/mL', normal: '211 - 911', flag: 'normal' }
    ]
  }
};

const verifiedReportUHIDs = new Set();
let pendingReportVerificationUHID = null;



const CHAT_KNOWLEDGE = [
  {
    triggers: ['fever', 'cold', 'cough', 'flu', 'viral', 'headache', 'body pain', 'fatigue', 'weakness'],
    condition: 'Viral Fever & Upper Respiratory Symptoms',
    specialty: 'General Physician',
    doctor: 'doc-gp-1',
    doctorName: 'Dr. Rajesh Sharma',
    degree: 'MBBS, MD (General Medicine - Premier Institute of Medical Sciences)',
    fee: '₹500',
    response: 'Fever accompanied by body aches, chills, or headache is frequently caused by seasonal viral infections, dengue, or throat inflammation.',
    homeTips: [
      '<strong>Adequate Hydration:</strong> Drink 2.5 - 3 Litres of fluids (warm water, ORS electrolyte, coconut water).',
      '<strong>Cool Sponging:</strong> Apply lukewarm/cool damp cloth to forehead, neck, and armpits if temperature exceeds 101°F.',
      '<strong>Rest Protocol:</strong> Minimize screen time, get 8+ hours of continuous bed rest to boost lymphocyte recovery.',
      '<strong>Nutritious Light Diet:</strong> Consume moong dal khichdi, vegetable soups, and vitamin C rich citrus fruits.'
    ],
    donts: 'Avoid taking unprescribed antibiotics or heavy analgesics like Ibuprofen/Aspirin without confirming platelets (Dengue risk).',
    redFlag: 'Seek immediate emergency attention if fever exceeds 103°F, or if you develop breathing difficulty, rash, or persistent vomiting.'
  },
  {
    triggers: ['tooth', 'teeth', 'gum', 'ache', 'cavity', 'bleeding', 'dental', 'root canal', 'dentist', 'jaw'],
    condition: 'Acute Dental Pain / Gum Sensitivity',
    specialty: 'Dentist & Oral Surgeon',
    doctor: 'doc-dent-1',
    doctorName: 'Dr. Suresh Kulkarni',
    degree: 'BDS, MDS (Conservative Dentistry & Endodontics - GDC)',
    fee: '₹400',
    response: 'Toothache typically signals deep enamel decay, pulp inflammation, or gum pocket bacterial infection requiring clinical evaluation.',
    homeTips: [
      '<strong>Warm Salt-Water Gargle:</strong> Dissolve 1/2 tsp salt in warm water and rinse gently for 30 seconds every 3 hours.',
      '<strong>External Cold Compress:</strong> Apply an ice pack wrapped in cloth to the outer cheek for 15 mins to reduce nerve swelling.',
      '<strong>Clove Oil Application:</strong> Dab a tiny drop of clove oil on a cotton swab and touch the affected tooth lightly (natural eugenol numbing).',
      '<strong>Elevate Head during Sleep:</strong> Keep head elevated on 2 pillows to decrease blood pressure in facial blood vessels.'
    ],
    donts: 'Do NOT place an aspirin tablet directly on the gum (causes chemical burns). Avoid chewing hard, sticky, or extremely cold/hot items.',
    redFlag: 'If swelling spreads towards your eye or down the neck, or causes difficulty swallowing, visit the emergency unit immediately.'
  },
  {
    triggers: ['skin', 'rash', 'acne', 'itching', 'allergy', 'hair', 'patches', 'dermatology', 'eczema', 'hives'],
    condition: 'Dermatological Reaction / Allergic Rash',
    specialty: 'Dermatologist & Cosmetologist',
    doctor: 'doc-derma-1',
    doctorName: 'Dr. Sunita Deshmukh',
    degree: 'MBBS, MD (Dermatology, Venereology & Leprosy - BMCRI)',
    fee: '₹550',
    response: 'Sudden skin breakouts, red wheals, or severe itching often result from contact dermatitis, food allergies, or fungal flare-ups.',
    homeTips: [
      '<strong>Cool Compress:</strong> Place a clean, cool, damp towel over the irritated area for 10-15 minutes to calm nerve endings.',
      '<strong>Calamine Lotion:</strong> Gently apply pure calamine or mild aloe vera gel for soothing hydration.',
      '<strong>Wear Loose Cotton Fabrics:</strong> Prevent friction and sweat accumulation by wearing soft, breathable clothing.',
      '<strong>Lukewarm Baths:</strong> Avoid steaming hot showers; use soap-free, pH-neutral cleansers.'
    ],
    donts: 'Do NOT scratch or rub vigorously (prevents secondary bacterial infection). Avoid applying over-the-counter steroid creams without diagnosis.',
    redFlag: `If the rash is accompanied by facial swelling, lip swelling, or difficulty breathing, dial 108 immediately (Anaphylaxis). Demo Helpline: ${DEMO_PHONE}.`
  },
  {
    triggers: ['child', 'baby', 'pediatric', 'infant', 'kid', 'vaccine', 'vaccination', 'growth', 'teething'],
    condition: 'Pediatric Care & Child Wellness',
    specialty: 'Senior Pediatrician',
    doctor: 'doc-ped-1',
    doctorName: 'Dr. Ananya Mukherjee',
    degree: 'MBBS, MD (Pediatrics & Neonatology - KEM Mumbai)',
    fee: '₹500',
    response: 'Pediatric illnesses require specialized weight-adjusted care. Infants and toddlers can dehydrate rapidly during fever or cough episodes.',
    homeTips: [
      '<strong>Frequent Feeds & Fluids:</strong> Offer breastmilk, formula, or small sips of ORS every 20-30 minutes to maintain hydration.',
      '<strong>Dress Lightly:</strong> Keep the room well-ventilated and dress the child in a single layer of loose cotton clothing.',
      '<strong>Steam Mist:</strong> Run a warm shower in the bathroom and sit with the child in the steamy air for 10 mins to ease nasal congestion.',
      '<strong>Track Wet Diapers:</strong> Ensure child is producing at least 4-6 wet diapers in 24 hours as a sign of adequate hydration.'
    ],
    donts: 'NEVER administer adult medication, aspirin, or uncalibrated cough syrups to children without doctor consultation.',
    redFlag: 'Rush to emergency if baby is unusually lethargic, refuses all feeds, has rapid chest indrawing, or has fever under 3 months of age.'
  },
  {
    triggers: ['chest', 'heart attack', 'breath', 'shortness of breath', 'emergency', 'unconscious', 'stroke', 'severe pain', 'bleeding', 'paralysis', 'seizure', 'choking', 'poison', 'collapsed'],
    condition: 'Critical Medical Emergency',
    specialty: 'Emergency & Trauma Desk',
    doctor: null,
    isEmergency: true,
    response: '🚨 CRITICAL MEDICAL ADVISORY: Symptoms of chest pain, shortness of breath, sudden numbness, severe trauma, or acute pain require immediate clinical intervention.',
    homeTips: [
      '<strong>Sit Semi-Reclined:</strong> Keep patient seated upright in a comfortable position; loosen tight collar or belt.',
      '<strong>Do Not Exert:</strong> Keep patient calm and completely still. Do not let them walk.',
      `<strong>Immediate Call:</strong> Dial 108 (National Ambulance) or 112 immediately. (CarePulse Demo Trauma Desk: ${DEMO_PHONE}).`
    ],
    donts: 'Do not administer food, water, or unprescribed medication if patient is drowsy or breathless. Do not drive yourself.',
    redFlag: 'Immediate ambulance transit to CarePulse Ground Floor Trauma Wing, GT Road, Phagwara.'
  },
  {
    triggers: ['cardio', 'palpitation', 'bp', 'blood pressure', 'hypertension', 'angina', 'cholesterol'],
    condition: 'Cardiovascular & Blood Pressure Management',
    specialty: 'Cardiologist',
    doctor: 'doc-card-1',
    doctorName: 'Dr. Gurpreet Singh Sandhu',
    degree: 'MBBS, MD, DM (Cardiology - National Postgraduate Medical Institute)',
    fee: '₹650',
    response: 'Persistent blood pressure fluctuations, palpitations, or exertional fatigue warrant electrocardiogram (ECG) and echocardiography assessment.',
    homeTips: [
      '<strong>Salt Moderation:</strong> Restrict dietary sodium to less than 1 teaspoon (5g) per day.',
      '<strong>Monitor Vitals:</strong> Record morning and evening BP in a resting state after sitting for 5 minutes.',
      '<strong>Daily Low-Impact Walk:</strong> 30 minutes of brisk walking improves vascular flexibility unless contraindicated.'
    ],
    donts: 'Never stop or skip prescribed antihypertensive medication abruptly without cardiologist advice.',
    redFlag: 'If chest heaviness radiates to the left arm, jaw, or is accompanied by cold sweat, call 108 immediately.'
  },
  {
    triggers: ['bone', 'joint', 'knee', 'back pain', 'spine', 'fracture', 'ortho', 'arthritis', 'shoulder', 'sciatica'],
    condition: 'Orthopedic & Joint Pain',
    specialty: 'Orthopedic Surgeon',
    doctor: 'doc-ortho-1',
    doctorName: 'Dr. Maninderjit Bawa',
    degree: 'MBBS, MS (Orthopedics - Regional Medical College), MCh Ortho (UK)',
    fee: '₹600',
    response: 'Joint stiffness, back pain, or knee discomfort often stems from cartilage degeneration, ligament strain, or postural misalignment.',
    homeTips: [
      '<strong>Hot/Cold Contrast:</strong> Use ice packs for acute swelling (first 48h) and warm moist heat for chronic muscular stiffness.',
      '<strong>Ergonomic Seating:</strong> Avoid sitting cross-legged or on low stools if dealing with knee osteoarthritis.',
      '<strong>Core Strengthening:</strong> Gentle pelvic tilts and quad sets help take load off lower spinal discs and knees.'
    ],
    donts: 'Avoid high-impact jumping or lifting heavy weights without warmup. Do not massage acutely swollen joint sprains.',
    redFlag: 'Seek immediate care if there is sudden inability to bear weight, visible bone deformity, or numbness in the legs.'
  },
  {
    triggers: ['period', 'pregnancy', 'maternity', 'pcos', 'gynae', 'gynecology', 'women health', 'menstrual', 'pelvic'],
    condition: 'Obstetrics, Gynecology & Women Health',
    specialty: 'Gynecologist & Obstetrician',
    doctor: 'doc-gyn-1',
    doctorName: 'Dr. Simranjit Kaur Randhawa',
    degree: 'MBBS, MS (Obstetrics & Gynaecology - Government Medical College)',
    fee: '₹550',
    response: 'Menstrual irregularities, pelvic cramping, PCOS, and antenatal care require personalized hormonal and clinical ultrasound evaluation.',
    homeTips: [
      '<strong>Warm Abdominal Compress:</strong> A warm water bottle applied to the lower abdomen eases uterine smooth muscle spasms.',
      '<strong>Hydration & Iron Intake:</strong> Consume iron-rich foods (spinach, jaggery, beetroot) and maintain hydration during cycles.',
      '<strong>Cycle Tracking:</strong> Keep an accurate record of cycle dates, flow duration, and associated symptoms for your consultation.'
    ],
    donts: 'Avoid self-medicating with over-the-counter hormonal pills without a confirmed gynecological prescription.',
    redFlag: 'Severe sudden pelvic pain, heavy abnormal bleeding, or reduced fetal movements in pregnancy requires urgent triage.'
  },
  {
    triggers: ['ear', 'nose', 'throat', 'sinus', 'tonsil', 'vertigo', 'hearing', 'ent', 'dizziness'],
    condition: 'ENT & Upper Respiratory Care',
    specialty: 'ENT Specialist',
    doctor: 'doc-ent-1',
    doctorName: 'Dr. Harvinder Singh Kohli',
    degree: 'MBBS, MS (ENT - State Medical College)',
    fee: '₹450',
    response: 'Persistent ear discharge, sinus blockage, throat irritation, or balance issues (vertigo) necessitate otoscopic and endoscopic diagnosis.',
    homeTips: [
      '<strong>Steam Inhalation:</strong> Inhale plain warm water steam for 8-10 minutes twice daily to clear congested nasal sinuses.',
      '<strong>Saline Nasal Sprays:</strong> Use isotonic saline rinses to flush out allergens and thin mucus membranes naturally.',
      '<strong>Keep Ears Dry:</strong> Protect ears with cotton coated in petroleum jelly while showering if eardrum perforation is suspected.'
    ],
    donts: 'Never insert cotton buds, keys, or hairpins into ear canals (causes traumatic tympanic perforation).',
    redFlag: 'Urgent attention needed if ear pain is accompanied by high fever, facial weakness, or mastoid swelling behind the ear.'
  },
  {
    triggers: ['eye', 'vision', 'cataract', 'blur', 'glaucoma', 'glasses', 'sight', 'ophthalmology', 'stye', 'red eye'],
    condition: 'Ophthalmology & Vision Care',
    specialty: 'Eye Specialist',
    doctor: 'doc-eye-1',
    doctorName: 'Dr. Ravneet Oberoi',
    degree: 'MBBS, MS (Ophthalmology - National Eye Centre)',
    fee: '₹450',
    response: 'Eye redness, blurred vision, refractive errors, or digital strain should be clinically assessed with slit-lamp and intraocular pressure checks.',
    homeTips: [
      '<strong>20-20-20 Screen Rule:</strong> Every 20 minutes, look at an object 20 feet away for at least 20 seconds.',
      '<strong>Cold Eye Compress:</strong> Apply a clean, chilled damp cloth over closed eyes to soothe screen-induced burning.',
      '<strong>Lubricating Drops:</strong> Use preservative-free artificial tear drops if experiencing dry eyes in air-conditioned environments.'
    ],
    donts: 'Do not rub itchy eyes vigorously (can damage cornea). Do not use over-the-counter steroid eye drops without doctor advice.',
    redFlag: 'Sudden loss of vision, flashing lights, severe eye pain, or rainbow halos around lights is an ophthalmologic emergency.'
  },
  {
    triggers: ['package', 'full body', 'checkup', 'test', 'blood test', 'screening', 'sugar', 'diabetes', 'lipid'],
    condition: 'CarePulse ProHealth Preventive Screening',
    specialty: 'Central Diagnostic Laboratory & Preventive Medicine',
    isPackage: true,
    response: 'Preventive health checkups identify lifestyle diseases (diabetes, cholesterol, thyroid, hypertension) long before visible symptoms appear.',
    homeTips: [
      '<strong>10-12 Hours Fasting:</strong> Water is permitted, but avoid tea, coffee, or milk before morning blood sample collection.',
      '<strong>Avoid Heavy Dinner:</strong> Refrain from alcohol, fried food, or heavy red meat the night prior to your lipid test.',
      '<strong>Doorstep Pickup:</strong> Our certified Phagwara phlebotomist collects blood samples right from your home!'
    ],
    donts: 'Do not discontinue prescribed morning BP medicines unless explicitly advised by your doctor.',
    redFlag: 'Early routine screening prevents 80% of chronic complications.'
  }
];



export {
  DEMO_PHONE,
  DEMO_PHONE_RAW,
  DEMO_WHATSAPP,
  DEMO_WHATSAPP_DISPLAY,
  DEMO_STAFF_PIN,
  DOCTORS,
  SLOT_TEMPLATES,
  state,
  CLINIC_BRANCHES,
  HEALTH_PACKAGES,
  SAMPLE_LAB_REPORTS,
  CHAT_KNOWLEDGE,
  verifiedReportUHIDs
};
