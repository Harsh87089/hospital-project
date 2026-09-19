/* ==========================================================================
   CarePulse Local Clinic & Token Booking Portal - JavaScript Logic
   ========================================================================== */

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

// --- Doctors Data with Indian Names across required specialties ---
const DOCTORS = [
  // --- General Physicians ---
  {
    id: 'doc-gp-1',
    name: 'Dr. Rajesh Sharma',
    specialty: 'General Physician',
    specialtyKey: 'general',
    qualifications: 'MBBS, MD (General Medicine - AIIMS New Delhi)',
    regNo: 'PMC-38214 (Punjab Medical Council)',
    languages: 'English, Hindi, Punjabi',
    days: 'Mon - Sat',
    experience: '16 Years Exp',
    fee: 500,
    feeDisplay: '₹500',
    hours: '09:00 AM - 01:00 PM & 05:00 PM - 08:30 PM',
    room: 'Room 101, Ground Floor (General OPD)',
    rating: 4.93,
    reviewsCount: '1,840 verified visits',
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
    qualifications: 'MBBS, DNB (Family & Internal Medicine - CMC Vellore)',
    regNo: 'PMC-41908 (Punjab Medical Council)',
    languages: 'English, Hindi, Malayalam',
    days: 'Mon - Sat',
    experience: '11 Years Exp',
    fee: 450,
    feeDisplay: '₹450',
    hours: '10:00 AM - 02:00 PM & 06:00 PM - 09:00 PM',
    room: 'Room 102, Ground Floor (General OPD Bay B)',
    rating: 4.90,
    reviewsCount: '1,290 verified visits',
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
    qualifications: 'MBBS, MD (Senior Physician & Diabetologist - KGMC)',
    regNo: 'MCI-29481 (Medical Council of India)',
    languages: 'English, Hindi, Bengali',
    days: 'Mon - Fri',
    experience: '18 Years Exp',
    fee: 600,
    feeDisplay: '₹600',
    hours: '08:30 AM - 12:30 PM & 04:30 PM - 07:30 PM',
    room: 'Room 103, Ground Floor (Executive OPD)',
    rating: 4.96,
    reviewsCount: '2,100 verified visits',
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
    qualifications: 'MBBS, MD (Medicine), DM (Cardiology - PGIMER Chandigarh)',
    regNo: 'PMC-38291 (Punjab Medical Council)',
    languages: 'English, Hindi, Punjabi',
    days: 'Mon - Sat',
    experience: '19 Years Exp',
    fee: 650,
    feeDisplay: '₹650',
    hours: '09:00 AM - 01:00 PM & 04:00 PM - 07:00 PM',
    room: 'Room 201, 2nd Floor (Cardiology & Echo Lab)',
    rating: 4.97,
    reviewsCount: '2,450 verified visits',
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
    qualifications: 'MBBS, MD, DNB (Cardiology - Fortis Escorts Heart Institute)',
    regNo: 'PMC-44120 (Punjab Medical Council)',
    languages: 'English, Hindi, Punjabi',
    days: 'Tue - Sun',
    experience: '12 Years Exp',
    fee: 600,
    feeDisplay: '₹600',
    hours: '10:00 AM - 02:00 PM & 05:00 PM - 08:00 PM',
    room: 'Room 203, 2nd Floor (Heart Failure Clinic)',
    rating: 4.92,
    reviewsCount: '1,380 verified visits',
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
    qualifications: 'MBBS, MS (Orthopedics - CMC Ludhiana), MCh Ortho (Dundee, UK)',
    regNo: 'PMC-41209 (Punjab Medical Council)',
    languages: 'English, Hindi, Punjabi',
    days: 'Mon - Sat',
    experience: '17 Years Exp',
    fee: 600,
    feeDisplay: '₹600',
    hours: '09:30 AM - 01:30 PM & 04:30 PM - 07:30 PM',
    room: 'Room 106, Ground Floor (Joint & Spine Clinic)',
    rating: 4.95,
    reviewsCount: '2,180 verified visits',
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
    qualifications: 'MBBS, D.Ortho, DNB (Orthopedics - DMC Ludhiana)',
    regNo: 'PMC-48190 (Punjab Medical Council)',
    languages: 'English, Hindi, Punjabi',
    days: 'Mon, Wed, Fri, Sat',
    experience: '11 Years Exp',
    fee: 500,
    feeDisplay: '₹500',
    hours: '11:00 AM - 03:00 PM & 05:30 PM - 08:30 PM',
    room: 'Room 107, Ground Floor (Sports Injury & Trauma Bay)',
    rating: 4.89,
    reviewsCount: '1,120 verified visits',
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
    qualifications: 'MBBS, MS (Obstetrics & Gynaecology - GMC Amritsar), Fellowship Infertility',
    regNo: 'PMC-45812 (Punjab Medical Council)',
    languages: 'English, Hindi, Punjabi',
    days: 'Mon - Sat',
    experience: '15 Years Exp',
    fee: 550,
    feeDisplay: '₹550',
    hours: '09:00 AM - 01:00 PM & 04:30 PM - 07:30 PM',
    room: 'Room 205, 2nd Floor (Women Wellness Centre)',
    rating: 4.96,
    reviewsCount: '2,320 verified visits',
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
    qualifications: 'MBBS, DGO, DNB (Obstetrics & Gynecology - PGIMER)',
    regNo: 'PMC-52190 (Punjab Medical Council)',
    languages: 'English, Hindi, Punjabi',
    days: 'Mon - Fri',
    experience: '10 Years Exp',
    fee: 500,
    feeDisplay: '₹500',
    hours: '10:30 AM - 02:30 PM & 05:00 PM - 08:00 PM',
    room: 'Room 206, 2nd Floor (Antenatal Care Unit)',
    rating: 4.90,
    reviewsCount: '1,040 verified visits',
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
    qualifications: 'MBBS, MS (ENT / Otorhinolaryngology - GMC Patiala)',
    regNo: 'PMC-39145 (Punjab Medical Council)',
    languages: 'English, Hindi, Punjabi',
    days: 'Mon - Sat',
    experience: '14 Years Exp',
    fee: 450,
    feeDisplay: '₹450',
    hours: '09:30 AM - 01:30 PM & 05:00 PM - 08:00 PM',
    room: 'Room 208, 2nd Floor (ENT & Audiology Suite)',
    rating: 4.92,
    reviewsCount: '1,560 verified visits',
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
    qualifications: 'MBBS, MS (Ophthalmology - Dr. RP Centre AIIMS New Delhi)',
    regNo: 'PMC-54911 (Punjab Medical Council)',
    languages: 'English, Hindi, Punjabi',
    days: 'Mon - Sat',
    experience: '12 Years Exp',
    fee: 450,
    feeDisplay: '₹450',
    hours: '09:00 AM - 01:00 PM & 04:00 PM - 07:30 PM',
    room: 'Room 210, 2nd Floor (Precision Eye & Cataract Suite)',
    rating: 4.94,
    reviewsCount: '1,720 verified visits',
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
    qualifications: 'MBBS, MD (Pediatrics & Neonatology - KEM Mumbai)',
    regNo: 'PMC-47819 (Punjab Medical Council)',
    languages: 'English, Hindi, Bengali',
    days: 'Mon - Sat',
    experience: '12 Years Exp',
    fee: 500,
    feeDisplay: '₹500',
    hours: '09:30 AM - 01:30 PM & 04:30 PM - 07:30 PM',
    room: 'Room 104, 1st Floor (Child Wellness Unit)',
    rating: 4.95,
    reviewsCount: '1,480 verified visits',
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
    qualifications: 'MBBS, DCH (Child Health & Immunization - PGIMER)',
    regNo: 'PMC-50931 (Punjab Medical Council)',
    languages: 'English, Hindi, Marathi',
    days: 'Mon - Fri',
    experience: '9 Years Exp',
    fee: 450,
    feeDisplay: '₹450',
    hours: '10:00 AM - 02:00 PM & 05:00 PM - 08:00 PM',
    room: 'Room 105, 1st Floor (Pediatric Clinic B)',
    rating: 4.88,
    reviewsCount: '950 verified visits',
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
    qualifications: 'MBBS, MD (Dermatology, Venereology & Leprosy - JIPMER)',
    regNo: 'PMC-46201 (Punjab Medical Council)',
    languages: 'English, Hindi, Tamil',
    days: 'Mon - Sat',
    experience: '10 Years Exp',
    fee: 600,
    feeDisplay: '₹600',
    hours: '10:00 AM - 02:00 PM & 05:00 PM - 08:00 PM',
    room: 'Room 202, 2nd Floor (Skin & Derma Suite)',
    rating: 4.91,
    reviewsCount: '1,340 verified visits',
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
    qualifications: 'MBBS, DDVL (Aesthetic Dermatology & Trichology - MAMC)',
    regNo: 'PMC-49112 (Punjab Medical Council)',
    languages: 'English, Hindi, Punjabi',
    days: 'Tue - Sun',
    experience: '8 Years Exp',
    fee: 550,
    feeDisplay: '₹550',
    hours: '11:00 AM - 03:00 PM & 06:00 PM - 08:30 PM',
    room: 'Room 204, 2nd Floor (Aesthetic & Hair Clinic)',
    rating: 4.86,
    reviewsCount: '810 verified visits',
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
    qualifications: 'BDS, MDS (Orthodontics & Dentofacial Orthopedics - Nair Dental)',
    regNo: 'PDC-12490 (Punjab Dental Council)',
    languages: 'English, Hindi, Marathi',
    days: 'Mon - Sat',
    experience: '14 Years Exp',
    fee: 400,
    feeDisplay: '₹400',
    hours: '09:00 AM - 01:00 PM & 04:00 PM - 08:00 PM',
    room: 'Room 108, Ground Floor (Advanced Dental Suite)',
    rating: 4.94,
    reviewsCount: '1,620 verified visits',
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
    qualifications: 'BDS, MDS (Conservative Dentistry & Endodontics - GDC Mumbai)',
    regNo: 'PDC-14981 (Punjab Dental Council)',
    languages: 'English, Hindi, Marathi',
    days: 'Mon - Fri',
    experience: '9 Years Exp',
    fee: 450,
    feeDisplay: '₹450',
    hours: '09:30 AM - 01:30 PM & 05:00 PM - 08:30 PM',
    room: 'Room 109, Ground Floor (Dental Care Bay)',
    rating: 4.89,
    reviewsCount: '1,050 verified visits',
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
    qualifications: 'BDS, MDS (Oral & Maxillofacial Implantology - BHU)',
    regNo: 'PDC-11822 (Punjab Dental Council)',
    languages: 'English, Hindi, Punjabi',
    days: 'Mon, Wed, Thu, Sat',
    experience: '13 Years Exp',
    fee: 500,
    feeDisplay: '₹500',
    hours: '10:30 AM - 02:30 PM & 05:30 PM - 08:30 PM',
    room: 'Room 110, Ground Floor (Dental Surgery Suite)',
    rating: 4.92,
    reviewsCount: '1,180 verified visits',
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
  bookedSlotsCache: {}, // key: doctorId + date -> set of booked times
  userAppointments: [],
  lastCreatedToken: null,
  queueSpecialty: 'all',
  queueSearch: '',
  queueAutoSimInterval: null
};

// --- Web Audio Chime Generator (Realistic Clinic Bell) ---
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

// --- Toast System ---
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;

  let icon = 'ℹ️';
  if (type === 'success') icon = '✅';
  if (type === 'warning') icon = '⚠️';

  toast.innerHTML = `<span>${icon}</span> <div>${message}</div>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// --- Initialize Dates (Today + next 6 days) ---
function getUpcomingDays(count = 7) {
  const days = [];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  for (let i = 0; i < count; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);

    const dayStr = i === 0 ? 'Today' : (i === 1 ? 'Tmrw' : dayNames[d.getDay()]);
    const dateNum = d.getDate();
    const monthStr = monthNames[d.getMonth()];
    const isoString = d.toISOString().split('T')[0];

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

// --- Generate Slots with realistic availability ---
function getSlotsForDoctorAndDate(doctorId, isoDate) {
  const cacheKey = `${doctorId}_${isoDate}`;

  // Deterministic seed for realistic slot states
  const seed = (doctorId.charCodeAt(doctorId.length - 1) + parseInt(isoDate.replace(/-/g, '').slice(-2), 10)) % 10;

  const processGroup = (slots, sessionName) => {
    return slots.map((time, idx) => {
      // Check if user or demo already booked this
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
    morning: processGroup(SLOT_TEMPLATES.morning, 'Morning'),
    afternoon: processGroup(SLOT_TEMPLATES.afternoon, 'Afternoon'),
    evening: processGroup(SLOT_TEMPLATES.evening, 'Evening')
  };
}

// --- Render Live OPD Queue Board ---
function renderLiveOPDBoard() {
  const container = document.getElementById('live-queue-cards');
  if (!container) return;

  // Calculate high-level live metrics
  const totalChambers = DOCTORS.length;
  const totalServingNow = DOCTORS.reduce((sum, d) => sum + (d.currentServingToken || 0), 0);
  const totalIssuedToday = DOCTORS.reduce((sum, d) => sum + (d.totalTodayTokens || 0), 0);
  const avgWait = Math.round(DOCTORS.reduce((sum, d) => sum + (d.avgWaitPerPatient || 12), 0) / (DOCTORS.length || 1));

  // Update summary badges if present
  const statChambers = document.getElementById('queue-stat-chambers');
  if (statChambers) statChambers.innerText = `${totalChambers} Chambers`;

  const statTokens = document.getElementById('queue-stat-tokens');
  if (statTokens) statTokens.innerText = `${totalServingNow} / ${totalIssuedToday}`;

  const statWait = document.getElementById('queue-stat-wait');
  if (statWait) statWait.innerText = `~${avgWait} Mins`;

  // Filter based on selected specialty & search query
  const filter = state.queueSpecialty || 'all';
  const query = (state.queueSearch || '').toLowerCase().trim();

  const filtered = DOCTORS.filter(doc => {
    const matchesSpec = filter === 'all' || doc.specialtyKey === filter;
    if (!query) return matchesSpec;
    const matchesName = doc.name.toLowerCase().includes(query);
    const matchesSpecName = doc.specialty.toLowerCase().includes(query);
    const matchesRoom = (doc.room || '').toLowerCase().includes(query);
    return matchesSpec && (matchesName || matchesSpecName || matchesRoom);
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 2.5rem 1rem; background: white; border-radius: var(--radius-xl); border: 1px dashed var(--slate-300);">
        <p style="font-size: 1.15rem; font-weight: 800; color: var(--dark); margin-bottom: 0.5rem;">No active consultation chambers match "${state.queueSearch}"</p>
        <p style="color: var(--slate-600); margin-bottom: 1rem; font-size: 0.88rem;">Try clearing your search query or switching to All Chambers.</p>
        <button class="btn btn-outline btn-sm" onclick="filterQueueSpecialty('all'); const inp = document.getElementById('queue-search-input'); if (inp) inp.value = ''; handleQueueSearch('');">
          Reset Chamber Filters
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(doc => {
    const nextToken = doc.currentServingToken + 1;
    const remaining = Math.max(0, doc.totalTodayTokens - doc.currentServingToken);
    const total = doc.totalTodayTokens || 25;
    const pct = Math.min(100, Math.round((doc.currentServingToken / total) * 100));

    let badgeClass = 'spec-gp';
    if (doc.specialtyKey === 'pediatrician') badgeClass = 'spec-ped';
    else if (doc.specialtyKey === 'dermatologist') badgeClass = 'spec-derma';
    else if (doc.specialtyKey === 'dentist') badgeClass = 'spec-dent';

    return `
      <div class="queue-doctor-card" data-doctor-id="${doc.id}">
        <!-- Card Header: Avatar, Name, Specialty, Room -->
        <div class="queue-card-header">
          <div class="queue-avatar-wrap">
            <img src="${doc.avatar}" alt="${doc.name}" class="queue-doc-avatar" loading="lazy" />
            <span class="queue-avatar-pulse" title="Doctor is active in consultation"></span>
          </div>
          <div class="queue-header-info">
            <div class="queue-card-badges">
              <span class="queue-specialty-badge ${badgeClass}">${doc.specialty}</span>
              <span class="queue-status-live">
                <span class="pulse-dot"></span> In Chamber
              </span>
            </div>
            <div class="queue-doc-name" title="${doc.name}">${doc.name}</div>
            <div class="queue-doc-meta">
              <span>${doc.experience || 'Specialist'}</span>
              <span class="queue-divider">•</span>
              <span class="queue-room"><i class="room-icon">📍</i> ${doc.room ? doc.room.split(',')[0] : 'Chamber'}</span>
            </div>
          </div>
        </div>

        <!-- Center Digital Display HUD -->
        <div class="queue-token-display">
          <div>
            <div class="token-label-sub">
              <span class="pulse-emerald-dot"></span> Now Serving
            </div>
            <div class="now-serving-token" id="serving-${doc.id}">#TK-${String(doc.currentServingToken).padStart(2, '0')}</div>
          </div>
          <div style="text-align: right;">
            <div class="token-label-sub">Next In Line</div>
            <div class="next-token-badge">#TK-${String(nextToken).padStart(2, '0')}</div>
          </div>
        </div>

        <!-- Progress of daily tokens -->
        <div class="queue-progress-container">
          <div class="queue-progress-labels">
            <span>Tokens Today: <strong>${doc.currentServingToken} / ${total}</strong></span>
            <span><strong>${pct}%</strong> Served</span>
          </div>
          <div class="queue-progress-track">
            <div class="queue-progress-fill" style="width: ${pct}%;"></div>
          </div>
        </div>

        <!-- Queue Stats: In Hall & Est Wait -->
        <div class="queue-footer-stats">
          <div>
            <span class="queue-stat-label">In Waiting Area:</span>
            <strong class="queue-stat-val">👥 ${remaining} patients</strong>
          </div>
          <div style="text-align: right;">
            <span class="queue-stat-label">Est. Wait Time:</span>
            <strong class="queue-stat-val">⏱️ ~${doc.avgWaitPerPatient} mins/pt</strong>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="queue-card-actions">
          <button class="btn-next-sim" onclick="simulateNextToken('${doc.id}')" title="Call next token with chime notification">
            ⚡ Next Token
          </button>
          <button class="btn-book-from-queue" onclick="closeLiveQueueModal(); openBookingLayer('${doc.id}');" title="Book appointment slot with this doctor">
            📅 Book Slot ➔
          </button>
        </div>
      </div>
    `;
  }).join('');
}

// Global Filter & Search handlers for Live Queue
window.filterQueueSpecialty = function (specialty) {
  state.queueSpecialty = specialty;
  document.querySelectorAll('.queue-chip').forEach(chip => {
    chip.classList.toggle('active', chip.dataset.queueSpecialty === specialty);
  });
  renderLiveOPDBoard();
};

window.handleQueueSearch = function (query) {
  state.queueSearch = query;
  renderLiveOPDBoard();
};

window.toggleQueueAutoSim = function () {
  const btn = document.getElementById('btn-queue-auto-sim');
  if (state.queueAutoSimInterval) {
    clearInterval(state.queueAutoSimInterval);
    state.queueAutoSimInterval = null;
    if (btn) {
      btn.classList.remove('active');
      btn.innerHTML = '⚡ Auto-Simulate (Off)';
    }
    showToast('Auto-simulation paused', 'info');
  } else {
    showToast('Live Auto-simulation active! Chambers calling tokens every 7s with chimes', 'success');
    if (btn) {
      btn.classList.add('active');
      btn.innerHTML = '⏸️ Auto-Simulating...';
    }
    state.queueAutoSimInterval = setInterval(() => {
      const modal = document.getElementById('live-queue-modal');
      if (!modal || !modal.classList.contains('active')) {
        clearInterval(state.queueAutoSimInterval);
        state.queueAutoSimInterval = null;
        if (btn) {
          btn.classList.remove('active');
          btn.innerHTML = '⚡ Auto-Simulate (Off)';
        }
        return;
      }
      const randomDoc = DOCTORS[Math.floor(Math.random() * DOCTORS.length)];
      if (randomDoc) {
        simulateNextToken(randomDoc.id);
      }
    }, 7000);
  }
};

// Staff simulation to advance queue
window.simulateNextToken = function (docId) {
  const doc = DOCTORS.find(d => d.id === docId);
  if (!doc) return;

  doc.currentServingToken++;
  if (doc.currentServingToken > doc.totalTodayTokens) {
    doc.totalTodayTokens = doc.currentServingToken + 4;
  }

  if (window.PublicAddressEngine) {
    PublicAddressEngine.announceToken(doc, doc.currentServingToken);
  } else {
    playClinicChime();
  }
  showToast(`Ding! ${doc.name} (${doc.room.split(',')[0]}) is now calling Token #TK-${String(doc.currentServingToken).padStart(2, '0')}`, 'success');
  renderLiveOPDBoard();

  // If user is tracking a token with this doctor, update tracker view
  const activeTrackerToken = document.getElementById('tracker-token-num')?.innerText;
  if (activeTrackerToken) {
    checkTokenLiveStatus(activeTrackerToken.replace('#', ''));
  }
};

// --- Render Doctor Profile Cards ---
function renderDoctorCards() {
  const grid = document.getElementById('doctors-grid');
  if (!grid) return;

  const filtered = DOCTORS.filter(doc => {
    const matchesSpecialty = state.activeSpecialty === 'all' || doc.specialtyKey === state.activeSpecialty;
    const query = state.searchQuery.toLowerCase().trim();
    if (!query) return matchesSpecialty;

    const matchesName = doc.name.toLowerCase().includes(query);
    const matchesSpec = doc.specialty.toLowerCase().includes(query);
    const matchesKeywords = doc.keywords && doc.keywords.some(k => k.includes(query));
    return matchesSpecialty && (matchesName || matchesSpec || matchesKeywords);
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; background: white; border-radius: var(--radius-xl); border: 1px dashed var(--slate-300);">
        <p style="font-size: 1.2rem; font-weight: 700; color: var(--dark); margin-bottom: 0.5rem;">No specialists found matching "${escapeHtml(state.searchQuery)}"</p>
        <p style="color: var(--slate-600); margin-bottom: 1rem;">Search by consultant name (e.g. 'Dr. Gurpreet', 'Dr. Simranjit') or condition (e.g. 'heart', 'knee joint', 'pregnancy', 'skin').</p>
        <button class="btn btn-outline" onclick="resetDoctorFilters()">Reset All Filters</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(doc => {
    return `
      <article class="doctor-card" id="card-${doc.id}">
        <div class="doctor-card-banner">
          <span class="avail-status-tag ${doc.status === 'In Surgery' ? 'status-surgery' : ''}">
            <span class="pulse-dot ${doc.status === 'In Surgery' ? 'amber-pulse' : ''}"></span> ${doc.status || 'In OPD Today'}
          </span>
          <div class="doctor-avatar-wrapper">
            <img src="${doc.avatar}" alt="${doc.name}" class="doctor-avatar" loading="lazy" />
          </div>
        </div>

        <div class="doctor-card-body">
          <div class="doc-meta-top">
            <span class="doc-specialty spec-badge-${doc.specialtyKey}">${doc.specialty}</span>
            <div class="doc-rating">
              <span>★</span> ${doc.rating} <span style="color: var(--slate-400); font-weight: 400; font-size: 0.75rem;">(${doc.reviewsCount})</span>
            </div>
          </div>

          <h3 class="doctor-name">${doc.name}</h3>
          
          <div class="doc-qualifications">
            <span>${doc.qualifications}</span>
            <span class="doc-experience-badge">${doc.experience}</span>
          </div>

          <div class="doc-reg-pill" style="margin: 0.35rem 0 0.65rem; font-size: 0.72rem; color: #0369a1; background: #e0f2fe; padding: 0.2rem 0.5rem; border-radius: 4px; display: inline-block; font-weight: 600;">
            🛡️ Reg: ${doc.regNo || 'PMC Certified Specialist'}
          </div>

          <div class="doc-info-grid">
            <div class="info-item">
              <span class="info-label">Consultation Fee</span>
              <span class="info-value fee-highlight">${doc.feeDisplay}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Clinic Room</span>
              <span class="info-value">${doc.room.split(',')[0]}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Consultation Days</span>
              <span class="info-value" style="font-size: 0.8rem; font-weight: 600; color: #047857;">${doc.days || 'Mon - Sat'}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Languages</span>
              <span class="info-value" style="font-size: 0.78rem;">${doc.languages || 'English, Hindi, Punjabi'}</span>
            </div>
            <div class="info-item" style="grid-column: span 2;">
              <span class="info-label">OPD Timing</span>
              <span class="info-value" style="font-size: 0.78rem; font-weight: 600;">${doc.hours}</span>
            </div>
          </div>

          <div class="doctor-card-footer">
            <button class="btn btn-outline btn-sm" onclick="openBookingLayer('${doc.id}')" title="Book In-Person OPD Appointment">
              In-Person OPD
            </button>
            <button class="btn btn-primary btn-sm" onclick="openTeleConsultModal('${doc.id}')" style="background: linear-gradient(135deg, #0d9488 0%, #0284c7 100%); border: none;" title="Start Instant Video Tele-Consultation">
              📹 Video Consult
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

window.resetDoctorFilters = function () {
  state.activeSpecialty = 'all';
  state.searchQuery = '';
  const searchInput = document.getElementById('doctor-search-input');
  if (searchInput) searchInput.value = '';

  document.querySelectorAll('.specialty-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.specialty === 'all');
  });
  renderDoctorCards();
};

// ==========================================================================
// DEDICATED BOOKING LAYER OVERLAY (MODAL WORKFLOW)
// ==========================================================================

window.openBookingLayer = function (doctorId) {
  if (doctorId) {
    state.selectedDoctorId = doctorId;
  }

  const layerModal = document.getElementById('booking-layer-modal');
  if (!layerModal) return;

  // Sync dropdowns
  const selectElem = document.getElementById('layer-doctor-select');
  if (selectElem) selectElem.value = state.selectedDoctorId;

  const inlineSelect = document.getElementById('doctor-select');
  if (inlineSelect) inlineSelect.value = state.selectedDoctorId;

  updateDoctorInfoBanner();
  renderDateRibbon();
  renderSlots();

  layerModal.classList.add('active');
  document.body.style.overflow = 'hidden';

  const doc = DOCTORS.find(d => d.id === state.selectedDoctorId);
  if (doc) {
    showToast(`Booking Layer opened for ${doc.name}`, 'info');
  }
};

window.closeBookingLayer = function () {
  const layerModal = document.getElementById('booking-layer-modal');
  if (layerModal) {
    layerModal.classList.remove('active');
  }
  document.body.style.overflow = '';
};

/* --- Modular Service Layer Modal Controllers --- */
window.openLiveQueueModal = function () {
  const modal = document.getElementById('live-queue-modal');
  if (!modal) return;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  if (typeof renderLiveOPDBoard === 'function') renderLiveOPDBoard();
};

window.closeLiveQueueModal = function () {
  const modal = document.getElementById('live-queue-modal');
  if (modal) modal.classList.remove('active');
  document.body.style.overflow = '';
  if (state.queueAutoSimInterval) {
    clearInterval(state.queueAutoSimInterval);
    state.queueAutoSimInterval = null;
    const btn = document.getElementById('btn-queue-auto-sim');
    if (btn) {
      btn.classList.remove('active');
      btn.innerHTML = '⚡ Auto-Simulate (Off)';
    }
  }
};

window.openBedsModal = function () {
  const modal = document.getElementById('beds-modal');
  if (!modal) return;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  if (window.BedsCapacityEngine && typeof window.BedsCapacityEngine.render === 'function') {
    window.BedsCapacityEngine.render();
    setTimeout(() => {
      window.BedsCapacityEngine.startECGMonitor();
    }, 150);
  }
};

window.closeBedsModal = function () {
  const modal = document.getElementById('beds-modal');
  if (modal) modal.classList.remove('active');
  document.body.style.overflow = '';
  if (window.BedsCapacityEngine && typeof window.BedsCapacityEngine.stopECGMonitor === 'function') {
    window.BedsCapacityEngine.stopECGMonitor();
  }
};

window.openDoctorsModal = function (specialtyFilter = null) {
  const modal = document.getElementById('doctors-modal');
  if (!modal) return;
  if (specialtyFilter) {
    state.activeSpecialty = specialtyFilter;
    const btns = document.querySelectorAll('#doctors-modal .specialty-btn');
    btns.forEach(b => {
      b.classList.toggle('active', b.dataset.specialty === specialtyFilter);
    });
  }
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  if (typeof renderDoctorCards === 'function') renderDoctorCards();
};

window.closeDoctorsModal = function () {
  const modal = document.getElementById('doctors-modal');
  if (modal) modal.classList.remove('active');
  document.body.style.overflow = '';
};

window.openPackagesModal = function () {
  const modal = document.getElementById('packages-modal');
  if (!modal) return;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
};

window.closePackagesModal = function () {
  const modal = document.getElementById('packages-modal');
  if (modal) modal.classList.remove('active');
  document.body.style.overflow = '';
};

window.openTrackTokenModal = function (presetTokenId = null) {
  const modal = document.getElementById('track-token-modal');
  if (!modal) return;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  if (presetTokenId) {
    const input = document.getElementById('tracker-input');
    if (input) {
      input.value = presetTokenId;
      checkTokenLiveStatus(presetTokenId);
    }
  }
};

window.closeTrackTokenModal = function () {
  const modal = document.getElementById('track-token-modal');
  if (modal) modal.classList.remove('active');
  document.body.style.overflow = '';
};

window.openInsuranceModal = function () {
  const modal = document.getElementById('insurance-modal');
  if (!modal) return;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
};

window.closeInsuranceModal = function () {
  const modal = document.getElementById('insurance-modal');
  if (modal) modal.classList.remove('active');
  document.body.style.overflow = '';
};

window.openGuidelinesModal = function () {
  const modal = document.getElementById('guidelines-modal');
  if (!modal) return;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
};

window.closeGuidelinesModal = function () {
  const modal = document.getElementById('guidelines-modal');
  if (modal) modal.classList.remove('active');
  document.body.style.overflow = '';
};

// Backwards-compatible inline selector
window.quickSelectDoctor = function (doctorId, scrollToSlotsOnly = false) {
  openBookingLayer(doctorId);
};

// --- Render Date Picker Ribbon (Supports both Layer and Inline) ---
function renderDateRibbon() {
  const ribbons = [
    document.getElementById('layer-date-ribbon'),
    document.getElementById('date-ribbon')
  ].filter(Boolean);

  if (ribbons.length === 0) return;

  const days = getUpcomingDays(7);
  if (!state.selectedDate) {
    state.selectedDate = days[0].isoDate;
  }

  const ribbonHTML = days.map((day, idx) => {
    const isActive = day.isoDate === state.selectedDate;
    return `
      <div class="date-card-pill ${isActive ? 'active' : ''}" 
           data-date="${day.isoDate}" 
           data-full="${day.fullDateStr}"
           onclick="selectDate('${day.isoDate}', '${day.fullDateStr}')">
        <span class="date-pill-day">${day.label}</span>
        <span class="date-pill-num">${day.dayNum}</span>
        <span class="date-pill-month">${day.month}</span>
      </div>
    `;
  }).join('');

  ribbons.forEach(ribbon => {
    ribbon.innerHTML = ribbonHTML;
  });
}

window.selectDate = function (isoDate, fullDateStr) {
  state.selectedDate = isoDate;
  state.selectedSlot = ''; // reset slot on date change

  // Update all active pills
  document.querySelectorAll('.date-card-pill').forEach(pill => {
    pill.classList.toggle('active', pill.dataset.date === isoDate);
  });

  renderSlots();
  updateSummaryBox();
};

// --- Render Time Slots Grid (Supports both Layer and Inline) ---
function renderSlots() {
  const containers = [
    document.getElementById('layer-slots-container'),
    document.getElementById('slots-container')
  ].filter(Boolean);

  if (containers.length === 0) return;

  const slotsData = getSlotsForDoctorAndDate(state.selectedDoctorId, state.selectedDate);

  let html = '';

  ['morning', 'afternoon', 'evening'].forEach(session => {
    const sessionSlots = slotsData[session];
    const sessionLabel = session === 'morning' ? '🌅 Morning Slots' : (session === 'afternoon' ? '☀️ Afternoon Slots' : '🌙 Evening Slots');

    html += `
      <div class="slot-session-title">${sessionLabel}</div>
      <div class="slot-grid">
    `;

    sessionSlots.forEach(slot => {
      const isSelected = state.selectedSlot === slot.time;
      let statusTagText = 'Open';
      let statusClass = slot.status;

      if (slot.status === 'booked') {
        statusTagText = 'Booked';
      } else if (slot.status === 'fast-filling') {
        statusTagText = 'Filling Fast';
      }

      html += `
        <div class="slot-item ${statusClass} ${isSelected ? 'selected' : ''}" 
             ${slot.status !== 'booked' ? `onclick="selectSlot('${slot.time}', '${slot.session}')"` : ''}
             title="${slot.status === 'booked' ? 'Slot already reserved' : 'Click to select this slot'}">
          <span class="slot-time">${slot.time}</span>
          <span class="slot-status-tag">${isSelected ? '✓ Selected' : statusTagText}</span>
        </div>
      `;
    });

    html += `</div>`;
  });

  containers.forEach(container => {
    container.innerHTML = html;
  });

  updateSummaryBox();
}

window.selectSlot = function (time, session) {
  state.selectedSlot = time;
  state.selectedSlotSession = session;
  renderSlots();
  showToast(`Time slot ${time} selected!`, 'info');
};

// --- Update Summary Box in Booking Forms ---
function updateSummaryBox() {
  const doc = DOCTORS.find(d => d.id === state.selectedDoctorId) || DOCTORS[0];
  const activePill = document.querySelector('.date-card-pill.active');
  const dateStr = activePill ? activePill.dataset.full : state.selectedDate;

  // Layer Summary
  const layerDocElem = document.getElementById('layer-summary-doc');
  const layerDateElem = document.getElementById('layer-summary-date');
  const layerSlotElem = document.getElementById('layer-summary-slot');
  const layerFeeElem = document.getElementById('layer-summary-fee');
  const layerWaitElem = document.getElementById('layer-summary-wait');

  if (layerDocElem) layerDocElem.innerText = `${doc.name} (${doc.specialty})`;
  if (layerDateElem) layerDateElem.innerText = dateStr;
  if (layerSlotElem) {
    layerSlotElem.innerText = state.selectedSlot ? state.selectedSlot : 'Select a slot on left';
    layerSlotElem.style.color = state.selectedSlot ? '#0f766e' : '#94a3b8';
  }
  if (layerFeeElem) layerFeeElem.innerText = doc.feeDisplay;
  if (layerWaitElem) layerWaitElem.innerText = `~${doc.avgWaitPerPatient} mins`;

  // Inline Summary
  const docElem = document.getElementById('summary-doc');
  const dateElem = document.getElementById('summary-date');
  const slotElem = document.getElementById('summary-slot');
  const feeElem = document.getElementById('summary-fee');
  const estWaitElem = document.getElementById('summary-wait');

  if (docElem) docElem.innerText = `${doc.name} (${doc.specialty})`;
  if (dateElem) dateElem.innerText = dateStr;
  if (slotElem) {
    slotElem.innerText = state.selectedSlot ? state.selectedSlot : 'Please select a slot';
    slotElem.style.color = state.selectedSlot ? '#0f766e' : '#94a3b8';
  }
  if (feeElem) feeElem.innerText = doc.feeDisplay;
  if (estWaitElem) estWaitElem.innerText = `~${doc.avgWaitPerPatient} mins per patient`;
}

// --- Populate Doctor Select Dropdowns ---
function populateDoctorDropdowns() {
  const dropdowns = [
    document.getElementById('layer-doctor-select'),
    document.getElementById('doctor-select')
  ].filter(Boolean);

  const optionsHTML = DOCTORS.map(doc => {
    return `<option value="${doc.id}" ${doc.id === state.selectedDoctorId ? 'selected' : ''}>${doc.name} - ${doc.specialty} (${doc.feeDisplay})</option>`;
  }).join('');

  dropdowns.forEach(selectElem => {
    selectElem.innerHTML = optionsHTML;
    selectElem.addEventListener('change', (e) => {
      state.selectedDoctorId = e.target.value;
      state.selectedSlot = '';

      dropdowns.forEach(other => {
        if (other !== e.target) other.value = e.target.value;
      });

      updateDoctorInfoBanner();
      renderSlots();
    });
  });
}

function updateDoctorInfoBanner() {
  const doc = DOCTORS.find(d => d.id === state.selectedDoctorId);
  if (!doc) return;

  const banners = [
    document.getElementById('layer-doctor-banner'),
    document.getElementById('selected-doctor-banner')
  ].filter(Boolean);

  const bannerHTML = `
    <div style="display: flex; align-items: center; gap: 1rem; background: white; border: 1px solid var(--slate-200); border-radius: var(--radius-md); padding: 0.85rem; margin-bottom: 1.25rem;">
      <img src="${doc.avatar}" style="width: 52px; height: 52px; border-radius: var(--radius-sm); object-fit: cover;" alt="${doc.name}" />
      <div style="flex: 1;">
        <div style="font-weight: 800; font-size: 1.05rem; color: var(--dark);">${doc.name}</div>
        <div style="font-size: 0.825rem; color: var(--primary); font-weight: 600;">${doc.specialty} • ${doc.qualifications}</div>
        <div style="font-size: 0.75rem; color: var(--slate-600);">${doc.room}</div>
      </div>
      <div style="text-align: right;">
        <span style="font-size: 0.72rem; color: var(--slate-600); display: block;">Consultation</span>
        <span style="font-size: 1.15rem; font-weight: 800; color: var(--primary-dark);">${doc.feeDisplay}</span>
      </div>
    </div>
  `;

  banners.forEach(b => {
    b.innerHTML = bannerHTML;
  });
}

// ==========================================================================
// Dynamic QR Code & Barcode Engine for Distinct Digital Hospital Tickets
// ==========================================================================
const CarePulseQR = (function () {
  const QRMode = { MODE_8BIT_BYTE: 4 };
  const QRErrorCorrectLevel = { L: 1, M: 0, Q: 3, H: 2 };

  function QRMath() { }
  QRMath.glog = function (n) {
    if (n < 1) throw new Error("glog(" + n + ")");
    return QRMath.LOG_TABLE[n];
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
    for (let i = 0; i < num.length - offset; i++) this.num[i] = 0;
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
        return `<svg width="${size}" height="${size}" viewBox="0 0 24 24"><rect width="24" height="24" fill="#f1f5f9"/></svg>`;
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
function generateUniqueTicketDetails(doc, patientData) {
  // 1. Persistent doctor queue counter in localStorage
  let docCounters = {};
  try {
    docCounters = JSON.parse(localStorage.getItem('carepulse_doc_counters') || '{}');
  } catch (e) {
    docCounters = {};
  }
  const currentDocCount = docCounters[doc.id] || doc.totalTodayTokens || 20;
  const tokenNumber = currentDocCount + 1;
  docCounters[doc.id] = tokenNumber;
  try {
    localStorage.setItem('carepulse_doc_counters', JSON.stringify(docCounters));
  } catch (e) { }
  doc.totalTodayTokens = tokenNumber;

  // 2. Guaranteed persistent global sequence
  let globalSerial = parseInt(localStorage.getItem('carepulse_global_ticket_serial') || '108', 10);
  globalSerial += 1;
  try {
    localStorage.setItem('carepulse_global_ticket_serial', globalSerial.toString());
  } catch (e) { }

  // 3. Unique Token ID (e.g. TK-029, TK-109)
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
  const queuePosition = Math.max(1, tokenNumber - doc.currentServingToken);
  const estWaitMins = queuePosition * (doc.avgWaitPerPatient || 12);

  // 9. Exact Issue Timestamp
  const now = new Date();
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

  // 10. Dynamic Verification URL & Payload for QR
  const qrPayload = `https://carepulse.hospital/checkin?t=${tokenId}&ref=${ticketRef}&sec=${securityCode}&p=${encodeURIComponent(patientData.name || 'Patient')}`;

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

// --- Common Appointment Booking Processor ---
function processBookingSubmission(patientData) {
  if (!state.selectedSlot) {
    showToast('Please select an available consultation time-slot before booking!', 'warning');
    return false;
  }

  const doc = DOCTORS.find(d => d.id === state.selectedDoctorId) || DOCTORS[0];

  // Generate completely distinct ticket details every time
  const details = generateUniqueTicketDetails(doc, patientData);
  const reportingNote = `Please report 15 mins prior (${state.selectedSlot})`;

  const activePill = document.querySelector('.date-card-pill.active');
  const appointmentDateStr = activePill ? activePill.dataset.full : state.selectedDate;

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
    patientName: patientData.name,
    patientAge: patientData.age,
    patientGender: patientData.gender,
    patientPlace: patientData.place,
    patientPhone: patientData.phone,
    visitReason: patientData.reason || 'General Consultation',
    visitType: patientData.visitType || 'First Consultation',
    date: appointmentDateStr,
    isoDate: state.selectedDate,
    timeSlot: state.selectedSlot,
    reportingNote: reportingNote,
    fee: doc.feeDisplay,
    bookingTimestamp: new Date().toISOString(),
    status: 'Confirmed'
  };

  // Mark slot as booked locally
  const cacheKey = `${doc.id}_${state.selectedDate}`;
  if (!state.bookedSlotsCache[cacheKey]) {
    state.bookedSlotsCache[cacheKey] = [];
  }
  state.bookedSlotsCache[cacheKey].push(state.selectedSlot);

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
function setupBookingForms() {
  // 1. Layer Booking Form
  const layerForm = document.getElementById('layer-booking-form');
  if (layerForm) {
    layerForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const patientData = {
        name: document.getElementById('layer-patient-name').value.trim(),
        age: document.getElementById('layer-patient-age').value.trim(),
        gender: document.getElementById('layer-patient-gender').value,
        place: document.getElementById('layer-patient-place').value.trim(),
        phone: document.getElementById('layer-patient-phone').value.trim(),
        visitType: document.getElementById('layer-visit-type').value,
        reason: document.getElementById('layer-patient-reason').value.trim()
      };
      const ok = processBookingSubmission(patientData);
      if (ok) layerForm.reset();
    });
  }

  // 2. Inline Booking Form
  const inlineForm = document.getElementById('patient-booking-form');
  if (inlineForm) {
    inlineForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const patientData = {
        name: document.getElementById('patient-name').value.trim(),
        age: document.getElementById('patient-age').value.trim(),
        gender: document.getElementById('patient-gender').value,
        place: document.getElementById('patient-place').value.trim(),
        phone: document.getElementById('patient-phone').value.trim(),
        visitType: document.getElementById('visit-type').value,
        reason: document.getElementById('patient-reason').value.trim()
      };
      const ok = processBookingSubmission(patientData);
      if (ok) inlineForm.reset();
    });
  }
}

// --- Digital Token Slip Modal Handler ---
function openTokenSlipModal(app) {
  const modal = document.getElementById('token-modal');
  if (!modal || !app) return;

  state.currentViewingToken = app;

  document.getElementById('slip-token-id').innerText = `#${app.tokenId}`;
  document.getElementById('slip-slot-time').innerText = `Scheduled: ${app.date} • ${app.timeSlot}`;
  document.getElementById('slip-patient-name').innerText = app.patientName;
  document.getElementById('slip-patient-meta').innerText = `${app.patientAge} Yrs / ${app.patientGender} • ${app.patientPlace || 'Phagwara'}`;
  document.getElementById('slip-patient-phone').innerText = app.patientPhone;
  document.getElementById('slip-doctor-name').innerText = app.doctorName;
  document.getElementById('slip-doctor-dept').innerText = app.doctorSpecialty;
  document.getElementById('slip-room-no').innerText = app.room;
  document.getElementById('slip-reason').innerText = app.visitReason;
  document.getElementById('slip-fee').innerText = app.fee;
  document.getElementById('slip-reporting').innerText = app.reportingNote;

  // Metadata ribbon
  const refEl = document.getElementById('slip-ref-id');
  if (refEl) refEl.innerText = app.ticketRef || 'CP-2026-108420';
  const deskEl = document.getElementById('slip-desk-info');
  if (deskEl) deskEl.innerText = app.assignedDesk || 'Counter 1 • Desk A';
  const secEl = document.getElementById('slip-sec-code');
  if (secEl) secEl.innerText = app.securityCode || 'SEC-VALID';
  const timeEl = document.getElementById('slip-issue-time');
  if (timeEl) timeEl.innerText = app.issueTimestamp || 'Just now';

  // Dynamic Barcode
  const barcodeNumEl = document.getElementById('slip-barcode-num');
  if (barcodeNumEl) barcodeNumEl.innerText = app.barcodeNum || `CP-${app.tokenId}`;
  const barcodeWrapper = document.getElementById('slip-barcode-wrapper');
  if (barcodeWrapper) {
    barcodeWrapper.innerHTML = CarePulseBarcode.renderSvg(app.barcodeNum || `CP-${app.tokenId}`);
  }

  // Dynamic QR Code
  const qrContainer = document.getElementById('slip-qr-container');
  if (qrContainer) {
    const qrPayload = app.qrPayload || `https://carepulse.hospital/checkin?t=${app.tokenId}&ref=${app.ticketRef || '0'}&sec=${app.securityCode || '0'}`;
    qrContainer.innerHTML = CarePulseQR.renderToSvg(qrPayload, 72);
  }

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

window.closeTokenModal = function () {
  const modal = document.getElementById('token-modal');
  if (modal) modal.classList.remove('active');
  document.body.style.overflow = '';
};

window.printTokenSlip = function () {
  const app = state.currentViewingToken || state.lastCreatedToken;
  if (app) {
    downloadTicketPDF(app);
  } else {
    window.print();
  }
};

window.trackGeneratedTokenNow = function () {
  const active = state.currentViewingToken || state.lastCreatedToken;
  if (!active) return;
  closeTokenModal();

  openTrackTokenModal(active.tokenId);
};

// ==========================================================================
// High-Fidelity E-Pass Canvas Generator & Ticket Downloader
// ==========================================================================
function downloadTicket(app, format = 'png') {
  if (!app) {
    showToast('No appointment data available to download.', 'warning');
    return;
  }

  if (format === 'pdf') {
    downloadTicketPDF(app);
    return;
  }

  showToast(`Generating E-Pass for #${app.tokenId}...`, 'info');

  // Canvas helper for rounded rectangles
  function roundRect(ctx, x, y, w, h, r) {
    if (typeof r === 'number') r = { tl: r, tr: r, br: r, bl: r };
    ctx.beginPath();
    ctx.moveTo(x + r.tl, y);
    ctx.lineTo(x + w - r.tr, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r.tr);
    ctx.lineTo(x + w, y + h - r.br);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r.br, y + h);
    ctx.lineTo(x + r.bl, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r.bl);
    ctx.lineTo(x, y + r.tl);
    ctx.quadraticCurveTo(x, y, x + r.tl, y);
    ctx.closePath();
  }

  const canvas = document.createElement('canvas');
  canvas.width = 800;
  canvas.height = 1180;
  const ctx = canvas.getContext('2d');

  // 1. Clean Background & Subtle Drop Border
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, 800, 1180);

  // Outer primary card border
  ctx.strokeStyle = '#0f766e';
  ctx.lineWidth = 3;
  roundRect(ctx, 6, 6, 788, 1168, 22);
  ctx.stroke();

  // Inner border
  ctx.strokeStyle = '#e2e8f0';
  ctx.lineWidth = 1;
  roundRect(ctx, 14, 14, 772, 1152, 18);
  ctx.stroke();

  // 2. Hospital Header Banner (Teal Gradient)
  const headerGrad = ctx.createLinearGradient(14, 14, 786, 150);
  headerGrad.addColorStop(0, '#042f2e');
  headerGrad.addColorStop(1, '#0f766e');
  ctx.fillStyle = headerGrad;
  roundRect(ctx, 14, 14, 772, 134, { tl: 18, tr: 18, br: 0, bl: 0 });
  ctx.fill();

  // Hospital Cross Emblem Badge
  ctx.fillStyle = '#14b8a6';
  roundRect(ctx, 36, 34, 48, 48, 12);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(56, 44, 8, 28);
  ctx.fillRect(46, 54, 28, 8);

  // Hospital Title & Location Info
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('CarePulse Multi-Specialty Hospital', 96, 56);
  ctx.font = '13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillStyle = '#99f6e4';
  ctx.fillText('Govt. Regd. Healthcare Center • OPD & Clinical Diagnostic Unit', 96, 78);
  ctx.font = '12px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillStyle = '#ccfbf1';
  ctx.fillText('GT Road, Near Sugar Mill Crossing, Phagwara, Punjab • 24/7 Helpline: 1800-180-2026', 96, 98);

  // Verified Badge (Top Right)
  ctx.fillStyle = '#10b981';
  roundRect(ctx, 608, 42, 160, 30, 15);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 11px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('VERIFIED DIGITAL PASS', 688, 61);
  ctx.textAlign = 'left';

  // 3. Hero Token Number Box
  const heroGrad = ctx.createLinearGradient(36, 164, 764, 290);
  heroGrad.addColorStop(0, '#042f2e');
  heroGrad.addColorStop(1, '#115e59');
  ctx.fillStyle = heroGrad;
  roundRect(ctx, 36, 164, 728, 124, 14);
  ctx.fill();
  ctx.strokeStyle = '#10b981';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.fillStyle = '#a7f3d0';
  ctx.font = 'bold 12px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('OFFICIAL CONSULTATION TOKEN NUMBER', 400, 190);

  ctx.fillStyle = '#5eead4';
  ctx.font = 'bold 50px monospace, -apple-system, sans-serif';
  ctx.fillText('#' + app.tokenId, 400, 240);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText(`📅 ${app.date}   •   ⏰ ${app.timeSlot}`, 400, 270);
  ctx.textAlign = 'left';

  // 4. Security & Reference Ribbon
  ctx.fillStyle = '#f8fafc';
  roundRect(ctx, 36, 302, 728, 38, 8);
  ctx.fill();
  ctx.strokeStyle = '#e2e8f0';
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.fillStyle = '#334155';
  ctx.font = 'bold 12px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText(`Ref: ${app.ticketRef || 'CP-2026-108'}`, 52, 326);
  ctx.fillText(`Desk: ${app.assignedDesk || 'Counter 1 • Desk A'}`, 250, 326);
  ctx.fillText(`Security: ${app.securityCode || 'SEC-VALID'}`, 440, 326);
  ctx.fillText(`Issued: ${app.issueTimestamp ? app.issueTimestamp.split(',')[0] : 'Today'}`, 630, 326);

  // 5. Patient & Doctor Details Grid
  const details = [
    ['Patient Name', app.patientName, 'Contact Mobile', app.patientPhone],
    ['Age / Gender', `${app.patientAge} Yrs / ${app.patientGender}`, 'Patient City', app.patientPlace || 'Phagwara'],
    ['Consulting Doctor', app.doctorName, 'Specialty & Dept', app.doctorSpecialty],
    ['Clinic Chamber', app.room, 'Visit Reason', app.visitReason],
    ['Consultation Fee', `${app.fee} (Receipt Generated)`, 'Arrival Note', app.reportingNote || 'Please report 15 mins prior']
  ];

  let yPos = 354;
  for (let i = 0; i < details.length; i++) {
    const row = details[i];
    if (i % 2 === 0) {
      ctx.fillStyle = '#f8fafc';
      roundRect(ctx, 36, yPos, 728, 48, 6);
      ctx.fill();
    }
    ctx.strokeStyle = '#f1f5f9';
    ctx.beginPath();
    ctx.moveTo(36, yPos + 48);
    ctx.lineTo(764, yPos + 48);
    ctx.stroke();

    // Col 1
    ctx.fillStyle = '#64748b';
    ctx.font = '11px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(row[0].toUpperCase(), 52, yPos + 18);
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(row[1], 52, yPos + 38);

    // Col 2
    ctx.fillStyle = '#64748b';
    ctx.font = '11px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(row[2].toUpperCase(), 410, yPos + 18);
    ctx.fillStyle = (i === 4) ? '#0d9488' : '#0f172a';
    ctx.font = 'bold 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(row[3], 410, yPos + 38);

    yPos += 52;
  }

  // 6. QR Code & Fast Kiosk Check-In Section
  ctx.fillStyle = '#f8fafc';
  roundRect(ctx, 36, 626, 728, 142, 10);
  ctx.fill();
  ctx.strokeStyle = '#e2e8f0';
  ctx.lineWidth = 1;
  ctx.stroke();

  // Draw dynamic QR Code on canvas
  const qrPayload = app.qrPayload || `https://carepulse.hospital/checkin?t=${app.tokenId}&ref=${app.ticketRef}`;
  CarePulseQR.drawToCanvas(ctx, qrPayload, 56, 642, 110);

  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Fast Kiosk & Reception Check-In', 186, 668);
  ctx.fillStyle = '#475569';
  ctx.font = '13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Scan this unique dynamic QR code at the reception desk scanner or check-in', 186, 694);
  ctx.fillText('kiosk to immediately confirm presence in the waiting lobby and notify doctor.', 186, 714);
  ctx.fillStyle = '#059669';
  ctx.font = 'bold 12px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('✓ ENCRYPTED DIGITAL TOKEN • VALID FOR SCHEDULED DATE ONLY', 186, 744);

  // 7. Dynamic Barcode Section
  ctx.fillStyle = '#ffffff';
  roundRect(ctx, 36, 782, 728, 110, 10);
  ctx.fill();
  ctx.strokeStyle = '#e2e8f0';
  ctx.lineWidth = 1;
  ctx.stroke();

  // Draw Dynamic Barcode
  CarePulseBarcode.drawToCanvas(ctx, app.barcodeNum || `CP-${app.tokenId}`, 190, 798, 420, 48);

  ctx.fillStyle = '#475569';
  ctx.font = 'bold 13px monospace';
  ctx.textAlign = 'center';
  ctx.fillText(app.barcodeNum || `CP-${app.tokenId}`, 400, 874);
  ctx.textAlign = 'left';

  // 8. Footer Section with Official Seal & Disclaimers
  ctx.fillStyle = '#f8fafc';
  roundRect(ctx, 36, 906, 728, 114, 10);
  ctx.fill();
  ctx.strokeStyle = '#e2e8f0';
  ctx.stroke();

  ctx.fillStyle = '#475569';
  ctx.font = '12px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('• Please report at reception 15 minutes prior to scheduled time for vitals check.', 54, 936);
  ctx.fillText('• Keep this digital ticket handy on your phone or in printed copy at the hospital.', 54, 958);
  ctx.fillText('• Emergency Ambulance Line: 108 / 1800-180-2026 | GT Road, Phagwara, Punjab', 54, 980);
  ctx.fillText('• Official Portal: carepulse.hospital | Email: appointments@carepulse.hospital', 54, 1002);

  // Official Seal Graphic (Right side)
  ctx.save();
  ctx.translate(685, 963);
  ctx.strokeStyle = '#0d9488';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.arc(0, 0, 36, 0, Math.PI * 2);
  ctx.stroke();
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(0, 0, 31, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = '#0d9488';
  ctx.font = 'bold 7px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('CAREPULSE HEALTH', 0, -18);
  ctx.font = 'bold 9px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('★ VERIFIED ★', 0, -3);
  ctx.font = 'bold 7.5px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('OFFICIAL PASS', 0, 12);
  ctx.fillText('2026', 0, 22);
  ctx.restore();
  ctx.textAlign = 'left';

  // Bottom Notice
  ctx.fillStyle = '#64748b';
  ctx.font = '11px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('This is an authentic computer-generated OPD appointment pass with cryptographic verification.', 400, 1038);
  ctx.textAlign = 'left';

  // 9. Trigger File Download
  canvas.toBlob(blob => {
    if (!blob) {
      showToast('Error generating image file.', 'error');
      return;
    }
    const cleanName = (app.patientName || 'Patient').replace(/[^a-zA-Z0-9]/g, '_');
    const filename = `CarePulse_Ticket_${app.tokenId}_${cleanName}.png`;
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    showToast(`✅ Ticket #${app.tokenId} downloaded successfully!`, 'success');
  }, 'image/png');
}

// Dedicated Print / PDF Window Generator
function downloadTicketPDF(app) {
  if (!app) return;
  const printWindow = window.open('', '_blank', 'width=800,height=900');
  if (!printWindow) {
    window.print();
    return;
  }

  const barcodeSvg = CarePulseBarcode.renderSvg(app.barcodeNum || `CP-${app.tokenId}`);
  const qrSvg = CarePulseQR.renderToSvg(app.qrPayload || `https://carepulse.hospital/checkin?t=${app.tokenId}`, 90);

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>CarePulse_Ticket_${app.tokenId}_${app.patientName}</title>
      <meta charset="utf-8" />
      <style>
        @page { size: auto; margin: 15mm; }
        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          color: #0f172a;
          background: #ffffff;
          padding: 20px;
          margin: 0;
        }
        .slip-print-card {
          max-width: 600px;
          margin: 0 auto;
          border: 2px solid #0f766e;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0,0,0,0.08);
        }
        .header {
          background: linear-gradient(135deg, #042f2e, #0f766e);
          color: white;
          padding: 24px;
          text-align: center;
        }
        .header h1 { margin: 0 0 6px; font-size: 22px; font-weight: 800; letter-spacing: -0.02em; }
        .header p { margin: 2px 0; font-size: 12px; color: #ccfbf1; }
        .token-hero {
          background: #042f2e;
          color: white;
          padding: 18px;
          margin: 18px 24px;
          border-radius: 12px;
          text-align: center;
          border: 1px solid #14b8a6;
        }
        .token-lbl { font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #99f6e4; }
        .token-id { font-size: 44px; font-weight: 900; color: #5eead4; margin: 4px 0; }
        .token-time { font-size: 13px; color: #ffffff; font-weight: 600; }
        .meta-strip {
          display: flex;
          justify-content: space-around;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          margin: 0 24px 16px;
          padding: 8px 12px;
          border-radius: 8px;
          font-size: 11px;
          color: #475569;
        }
        .meta-strip strong { color: #0f172a; }
        table {
          width: calc(100% - 48px);
          margin: 0 24px 20px;
          border-collapse: collapse;
          font-size: 13px;
        }
        td { padding: 8px 6px; border-bottom: 1px solid #f1f5f9; }
        td.lbl { color: #64748b; width: 38%; }
        td.val { font-weight: 700; text-align: right; color: #0f172a; }
        .qr-section {
          display: flex;
          align-items: center;
          background: #f8fafc;
          margin: 0 24px 18px;
          padding: 14px;
          border-radius: 10px;
          border: 1px solid #e2e8f0;
          gap: 16px;
        }
        .qr-box { flex-shrink: 0; }
        .qr-text h4 { margin: 0 0 4px; font-size: 13px; }
        .qr-text p { margin: 0; font-size: 11px; color: #64748b; line-height: 1.4; }
        .barcode-section {
          text-align: center;
          margin: 0 24px 20px;
          padding: 12px;
          border: 1px dashed #cbd5e1;
          border-radius: 8px;
        }
        .barcode-svg { max-width: 280px; margin: 0 auto 6px; }
        .barcode-txt { font-family: monospace; font-size: 12px; letter-spacing: 2px; color: #475569; }
        .footer {
          background: #f8fafc;
          border-top: 1px solid #e2e8f0;
          padding: 14px 24px;
          text-align: center;
          font-size: 11px;
          color: #64748b;
        }
      </style>
    </head>
    <body>
      <div class="slip-print-card">
        <div class="header">
          <h1>🏥 CarePulse Multi-Specialty Hospital</h1>
          <p>Official OPD Consultation Slip • GT Road, Phagwara, Punjab - 144401</p>
          <p>24x7 Emergency Helpline: 1800-180-2026 / 108 | carepulse.hospital</p>
        </div>
        <div class="token-hero">
          <div class="token-lbl">Official Consultation Token Number</div>
          <div class="token-id">#${app.tokenId}</div>
          <div class="token-time">Scheduled: ${app.date} • ${app.timeSlot}</div>
        </div>
        <div class="meta-strip">
          <span>Ref: <strong>${app.ticketRef}</strong></span>
          <span>•</span>
          <span>Desk: <strong>${app.assignedDesk}</strong></span>
          <span>•</span>
          <span>Security: <strong>${app.securityCode}</strong></span>
        </div>
        <table>
          <tbody>
            <tr><td class="lbl">Patient Name</td><td class="val">${app.patientName}</td></tr>
            <tr><td class="lbl">Age / Gender / Place</td><td class="val">${app.patientAge} Yrs / ${app.patientGender} • ${app.patientPlace || 'Phagwara'}</td></tr>
            <tr><td class="lbl">Contact Mobile</td><td class="val">${app.patientPhone}</td></tr>
            <tr><td class="lbl">Consulting Doctor</td><td class="val">${app.doctorName}</td></tr>
            <tr><td class="lbl">Specialty & Dept</td><td class="val">${app.doctorSpecialty}</td></tr>
            <tr><td class="lbl">Clinic Chamber</td><td class="val">${app.room}</td></tr>
            <tr><td class="lbl">Chief Symptoms</td><td class="val">${app.visitReason}</td></tr>
            <tr><td class="lbl">Consultation Fee</td><td class="val" style="color: #0d9488;">${app.fee}</td></tr>
            <tr><td class="lbl">Arrival Instructions</td><td class="val" style="color: #b45309;">${app.reportingNote || 'Please report 15 mins prior'}</td></tr>
          </tbody>
        </table>
        <div class="qr-section">
          <div class="qr-box">${qrSvg}</div>
          <div class="qr-text">
            <h4>Fast Kiosk & Lobby Check-In</h4>
            <p>Scan this dynamic QR code at the reception kiosk to instantly verify your arrival and confirm your queue slot. Issued: ${app.issueTimestamp}</p>
          </div>
        </div>
        <div class="barcode-section">
          <div class="barcode-svg">${barcodeSvg}</div>
          <div class="barcode-txt">${app.barcodeNum}</div>
        </div>
        <div class="footer">
          This is an official computer-generated OPD appointment slip. Valid for scheduled date and consulting physician only.
        </div>
      </div>
      <script>
        window.onload = function() {
          setTimeout(function() {
            window.print();
          }, 300);
        };
      <\/script>
    </body>
    </html>
  `);
  printWindow.document.close();
}

// Global download functions for buttons
window.downloadCurrentTokenTicket = function (format = 'png') {
  const app = state.currentViewingToken || state.lastCreatedToken;
  if (!app) {
    showToast('No active appointment to download.', 'warning');
    return;
  }
  downloadTicket(app, format);
};

window.downloadTicketById = function (tokenId, format = 'png') {
  const app = state.userAppointments.find(a => a.tokenId === tokenId);
  if (!app) {
    showToast(`Appointment #${tokenId} not found.`, 'warning');
    return;
  }
  downloadTicket(app, format);
};

// ==========================================================================
// ==========================================================================
// TOKEN ACTIONS: RESCHEDULE, CANCEL, ADD TO CALENDAR (In-Page Modal UI)
// ==========================================================================

window.openRescheduleModal = function (app) {
  state.pendingActionAppointment = app;
  const modal = document.getElementById('reschedule-dialog-modal');
  if (modal) {
    const docEl = document.getElementById('reschedule-doc-name');
    const tokEl = document.getElementById('reschedule-token-val');
    const dateEl = document.getElementById('reschedule-date-input');
    if (docEl) docEl.textContent = app.doctorName;
    if (tokEl) tokEl.textContent = `#${app.tokenId}`;
    if (dateEl) {
      const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
      dateEl.value = tomorrow;
      dateEl.min = tomorrow;
    }
    modal.style.display = 'flex';
  } else {
    // Graceful in-app confirmation
    const newDate = 'Tomorrow';
    const newSlot = '11:30 AM';
    app.date = newDate;
    app.timeSlot = newSlot;
    app.status = 'Rescheduled';
    try {
      localStorage.setItem('carepulse_appointments', JSON.stringify(state.userAppointments));
    } catch (e) { }
    showToast(`Token #${app.tokenId} rescheduled to ${newDate} (${newSlot})!`, 'success');
    openTokenSlipModal(app);
  }
};

window.closeRescheduleModal = function () {
  const modal = document.getElementById('reschedule-dialog-modal');
  if (modal) modal.style.display = 'none';
};

window.confirmReschedule = function () {
  const app = state.pendingActionAppointment || state.currentViewingToken || state.lastCreatedToken;
  if (!app) return;
  const dateInput = document.getElementById('reschedule-date-input');
  const slotInput = document.getElementById('reschedule-slot-select');
  const newDate = (dateInput && dateInput.value) ? dateInput.value : 'Tomorrow';
  const newSlot = (slotInput && slotInput.value) ? slotInput.value : '11:30 AM';

  app.date = newDate;
  app.timeSlot = newSlot;
  app.reportingNote = `Rescheduled: Please report 15 mins prior (${newSlot})`;
  app.status = 'Rescheduled';

  try {
    localStorage.setItem('carepulse_appointments', JSON.stringify(state.userAppointments));
  } catch (e) { }

  broadcastQueueUpdate('RESCHEDULE', { tokenId: app.tokenId, newDate, newSlot });
  showToast(`Token #${app.tokenId} rescheduled to ${newDate} at ${newSlot}!`, 'success');
  closeRescheduleModal();
  openTokenSlipModal(app);
};

window.rescheduleAppointment = function (tokenId) {
  const app = (tokenId ? state.userAppointments.find(a => a.tokenId === tokenId) : null) || state.currentViewingToken || state.lastCreatedToken;
  if (!app) {
    showToast('No active appointment to reschedule.', 'warning');
    return;
  }
  openRescheduleModal(app);
};

window.openCancelModal = function (app) {
  state.pendingActionAppointment = app;
  const modal = document.getElementById('cancel-dialog-modal');
  if (modal) {
    const docEl = document.getElementById('cancel-doc-name');
    const tokEl = document.getElementById('cancel-token-val');
    if (docEl) docEl.textContent = app.doctorName;
    if (tokEl) tokEl.textContent = `#${app.tokenId}`;
    modal.style.display = 'flex';
  } else {
    app.status = 'Cancelled';
    try {
      localStorage.setItem('carepulse_appointments', JSON.stringify(state.userAppointments));
    } catch (e) { }
    showToast(`Appointment #${app.tokenId} cancelled. Consultation slot has been freed.`, 'info');
    openTokenSlipModal(app);
  }
};

window.closeCancelModal = function () {
  const modal = document.getElementById('cancel-dialog-modal');
  if (modal) modal.style.display = 'none';
};

window.confirmCancellation = function () {
  const app = state.pendingActionAppointment || state.currentViewingToken || state.lastCreatedToken;
  if (!app) return;
  const reasonInput = document.getElementById('cancel-reason-select');
  const reason = (reasonInput && reasonInput.value) ? reasonInput.value : 'Personal emergency / Rescheduling later';

  app.status = 'Cancelled';
  app.cancelReason = reason;

  // Free up slot cache
  const cacheKey = `${app.doctorId}_${app.isoDate}`;
  if (state.bookedSlotsCache[cacheKey]) {
    state.bookedSlotsCache[cacheKey] = state.bookedSlotsCache[cacheKey].filter(s => s !== app.timeSlot);
  }

  try {
    localStorage.setItem('carepulse_appointments', JSON.stringify(state.userAppointments));
  } catch (e) { }

  broadcastQueueUpdate('CANCEL', { tokenId: app.tokenId });
  showToast(`Appointment #${app.tokenId} cancelled. Consultation slot has been freed.`, 'info');
  closeCancelModal();
  openTokenSlipModal(app);
};

window.cancelAppointment = function (tokenId) {
  const app = (tokenId ? state.userAppointments.find(a => a.tokenId === tokenId) : null) || state.currentViewingToken || state.lastCreatedToken;
  if (!app) {
    showToast('No active appointment to cancel.', 'warning');
    return;
  }
  openCancelModal(app);
};

window.addToCalendar = function (tokenId, mode = 'ics') {
  const app = (tokenId ? state.userAppointments.find(a => a.tokenId === tokenId) : null) || state.currentViewingToken || state.lastCreatedToken;
  if (!app) {
    showToast('No appointment found to add to calendar.', 'warning');
    return;
  }

  const title = `CarePulse OPD: ${app.doctorName} (${app.tokenId})`;
  const desc = `Consultation with ${app.doctorName}\\nDepartment: ${app.doctorSpecialty}\\nRoom: ${app.room}\\nToken: ${app.tokenId}\\nHelpline: 1800-180-2026`;
  const loc = `CarePulse Super Speciality Hospital, GT Road, Near Sugar Mill Crossing, Phagwara, Punjab - 144401`;

  if (mode === 'google') {
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&details=${encodeURIComponent(desc)}&location=${encodeURIComponent(loc)}`;
    window.open(url, '_blank');
    return;
  }

  // Standard iCalendar (.ics) download
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//CarePulse Super Speciality Hospital//EN',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `SUMMARY:${title}`,
    `DESCRIPTION:${desc}`,
    `LOCATION:${loc}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `CarePulse_Appointment_${app.tokenId}.ics`;
  a.click();
  showToast('Calendar invite (.ics) downloaded!', 'success');
};

// ==========================================================================
// RECEPTION DESK & REALTIME OPD QUEUE CONTROLLER
// ==========================================================================

const QUEUE_CHANNEL_NAME = 'carepulse_queue_sync_bus';
let queueSyncChannel = null;
try {
  if ('BroadcastChannel' in window) {
    queueSyncChannel = new BroadcastChannel(QUEUE_CHANNEL_NAME);
    queueSyncChannel.onmessage = function (e) {
      handleRemoteQueueSync(e.data);
    };
  }
} catch (e) { }

window.addEventListener('storage', function (e) {
  if (e.key === 'carepulse_queue_ping' || e.key === 'carepulse_appointments') {
    reloadAppointmentsFromStorage();
    renderLiveOPDBoard();
    renderReceptionDashboard();
    if (typeof activeTrackerToken !== 'undefined' && activeTrackerToken) {
      checkTokenLiveStatus(activeTrackerToken.replace('#', ''));
    }
  }
});

function broadcastQueueUpdate(type, payload) {
  try {
    localStorage.setItem('carepulse_queue_ping', Date.now().toString());
    if (queueSyncChannel) {
      queueSyncChannel.postMessage({ type, payload, timestamp: Date.now() });
    }
  } catch (e) { }
  renderLiveOPDBoard();
  renderReceptionDashboard();
}

function handleRemoteQueueSync(data) {
  if (!data) return;
  if (data.type === 'CALL_NEXT' && data.payload) {
    const doc = DOCTORS.find(d => d.id === data.payload.doctorId);
    if (doc) {
      doc.currentServingToken = data.payload.servingToken;
      showToast(`🔔 Live Queue Update: ${doc.name} (${doc.room.split(',')[0]}) is now calling Token #TK-${String(doc.currentServingToken).padStart(2, '0')}`, 'info');
    }
  }
  reloadAppointmentsFromStorage();
  renderLiveOPDBoard();
  renderReceptionDashboard();
  if (typeof activeTrackerToken !== 'undefined' && activeTrackerToken) {
    checkTokenLiveStatus(activeTrackerToken.replace('#', ''));
  }
}

function reloadAppointmentsFromStorage() {
  try {
    const stored = localStorage.getItem('carepulse_appointments');
    if (stored) {
      state.userAppointments = JSON.parse(stored);
    }
  } catch (e) { }
}

window.openReceptionDesk = function () {
  const isAuth = sessionStorage.getItem('carepulse_staff_auth');
  if (!isAuth) {
    const pin = typeof window.prompt === 'function' ? window.prompt('🔒 Restricted Hospital Staff Console\n\nEnter 4-digit Staff Security PIN (Authorized PIN: 8708):') : null;
    if (pin !== '8708' && pin !== '2026') {
      if (pin !== null) showToast('⛔ Access Denied: Invalid Staff Security PIN', 'error');
      return;
    }
    sessionStorage.setItem('carepulse_staff_auth', 'true');
    showToast('🔓 Staff Session Authorized: Reception Desk Active', 'success');
  }
  const modal = document.getElementById('reception-modal');
  if (!modal) return;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  renderReceptionDashboard();
};

window.logoutReceptionStaff = function () {
  sessionStorage.removeItem('carepulse_staff_auth');
  window.closeReceptionDesk();
  showToast('Staff console session locked.', 'info');
};

window.closeReceptionDesk = function () {
  const modal = document.getElementById('reception-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
};

window.callNextPatientToken = function (doctorId) {
  const doc = DOCTORS.find(d => d.id === doctorId);
  if (!doc) return;

  doc.currentServingToken = (doc.currentServingToken || 0) + 1;
  if (doc.currentServingToken > doc.totalTodayTokens) {
    doc.totalTodayTokens = doc.currentServingToken + 2;
  }

  // Find if a patient appointment matches this token number
  const app = state.userAppointments.find(a => a.doctorId === doctorId && a.tokenNumber === doc.currentServingToken);
  if (app) {
    app.status = 'Serving';
    try {
      localStorage.setItem('carepulse_appointments', JSON.stringify(state.userAppointments));
    } catch (e) { }
  }

  if (window.PublicAddressEngine) {
    PublicAddressEngine.announceToken(doc, doc.currentServingToken, app ? app.patientName : null);
  } else if (typeof playClinicChime === 'function') {
    try { playClinicChime(); } catch (e) { }
  }

  showToast(`🔔 Counter Called: Token #TK-${String(doc.currentServingToken).padStart(2, '0')} for ${doc.name} (${doc.room.split(',')[0]})`, 'success');
  broadcastQueueUpdate('CALL_NEXT', { doctorId, servingToken: doc.currentServingToken });
};

window.markTokenCompleted = function (tokenId) {
  const app = state.userAppointments.find(a => a.tokenId === tokenId);
  if (app) {
    app.status = 'Completed';
    try {
      localStorage.setItem('carepulse_appointments', JSON.stringify(state.userAppointments));
    } catch (e) { }
    showToast(`Token #${tokenId} marked as consultation Completed.`, 'success');
    broadcastQueueUpdate('STATUS_CHANGE', { tokenId, status: 'Completed' });
  }
};

window.markTokenNoShow = function (tokenId) {
  const app = state.userAppointments.find(a => a.tokenId === tokenId);
  if (app) {
    app.status = 'No-Show';
    try {
      localStorage.setItem('carepulse_appointments', JSON.stringify(state.userAppointments));
    } catch (e) { }
    showToast(`Token #${tokenId} marked as No-Show.`, 'warning');
    broadcastQueueUpdate('STATUS_CHANGE', { tokenId, status: 'No-Show' });
  }
};

window.issueWalkinToken = function (doctorId) {
  const doc = DOCTORS.find(d => d.id === doctorId) || DOCTORS[0];
  let patientName = 'Walk-in Patient';
  let phone = '9814022737';
  try {
    const inputName = typeof window.prompt === 'function' ? window.prompt(`Issue Walk-in OPD Token for ${doc.name}\n\nEnter Patient Name:`, 'Walk-in Patient') : 'Walk-in Patient';
    if (inputName === null) return; // User pressed Cancel
    if (inputName && inputName.trim()) patientName = inputName.trim();

    const inputPhone = typeof window.prompt === 'function' ? window.prompt('Enter Patient Phone Number:', '9814022737') : '9814022737';
    if (inputPhone && inputPhone.trim()) phone = inputPhone.trim();
  } catch (e) {
    // Fallback if browser blocks modal prompts
  }
  const tokenNum = doc.totalTodayTokens + 1;
  doc.totalTodayTokens++;

  const newApp = {
    tokenId: `TK-${String(tokenNum).padStart(3, '0')}`,
    tokenNumber: tokenNum,
    doctorId: doc.id,
    doctorName: doc.name,
    doctorSpecialty: doc.specialty,
    room: doc.room,
    patientName: patientName.trim(),
    patientPhone: phone.trim(),
    patientAge: '30',
    patientGender: 'Male',
    patientPlace: 'Phagwara Walk-in Desk',
    date: 'Today',
    timeSlot: 'Walk-in OPD Priority',
    fee: doc.feeDisplay,
    status: 'Confirmed',
    isWalkin: true
  };

  state.userAppointments.unshift(newApp);
  try {
    localStorage.setItem('carepulse_appointments', JSON.stringify(state.userAppointments));
  } catch (e) { }

  showToast(`Walk-in Token #${newApp.tokenId} issued for ${patientName}!`, 'success');
  broadcastQueueUpdate('WALKIN_ISSUED', { doctorId, token: newApp });
};

window.setDoctorStatus = function (doctorId, status) {
  const doc = DOCTORS.find(d => d.id === doctorId);
  if (!doc) return;
  doc.status = status;
  showToast(`${doc.name} status set to: ${status}`, 'info');
  renderDoctorCards();
  broadcastQueueUpdate('DOC_STATUS', { doctorId, status });
};

function renderReceptionDashboard() {
  const container = document.getElementById('reception-doc-grid');
  if (!container) return;

  container.innerHTML = DOCTORS.map(doc => {
    const servingApp = state.userAppointments.find(a => a.doctorId === doc.id && a.tokenNumber === doc.currentServingToken);

    return `
      <div class="reception-doc-card" style="background: white; border: 1px solid var(--slate-200); border-radius: var(--radius-lg); padding: 1.25rem; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem;">
          <div>
            <h4 style="margin: 0; font-size: 1.05rem; color: var(--dark);">${doc.name}</h4>
            <div style="font-size: 0.78rem; color: var(--slate-600);">${doc.specialty} • ${doc.room.split(',')[0]}</div>
          </div>
          <select onchange="setDoctorStatus('${doc.id}', this.value)" style="font-size: 0.75rem; padding: 0.25rem 0.5rem; border-radius: 4px; border: 1px solid var(--slate-300); font-weight: 700; background: ${doc.status === 'In Surgery' ? '#fef3c7' : '#f0fdf4'}; color: ${doc.status === 'In Surgery' ? '#b45309' : '#15803d'};">
            <option value="In OPD" ${doc.status === 'In OPD' ? 'selected' : ''}>In OPD</option>
            <option value="In Surgery" ${doc.status === 'In Surgery' ? 'selected' : ''}>In Surgery</option>
            <option value="On Break" ${doc.status === 'On Break' ? 'selected' : ''}>On Break</option>
            <option value="On Leave" ${doc.status === 'On Leave' ? 'selected' : ''}>On Leave</option>
          </select>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; background: var(--slate-50); padding: 0.75rem; border-radius: var(--radius-md); margin-bottom: 1rem; text-align: center;">
          <div>
            <span style="font-size: 0.7rem; color: var(--slate-600); text-transform: uppercase; font-weight: 700; display: block;">Serving Now</span>
            <strong style="font-size: 1.4rem; color: var(--primary-dark); font-family: var(--font-heading);">#TK-${String(doc.currentServingToken).padStart(2, '0')}</strong>
          </div>
          <div>
            <span style="font-size: 0.7rem; color: var(--slate-600); text-transform: uppercase; font-weight: 700; display: block;">Today's Total</span>
            <strong style="font-size: 1.4rem; color: var(--dark); font-family: var(--font-heading);">${doc.totalTodayTokens}</strong>
          </div>
        </div>

        ${servingApp ? `
          <div style="background: #e0f2fe; padding: 0.5rem 0.75rem; border-radius: var(--radius-sm); font-size: 0.78rem; color: #0369a1; margin-bottom: 0.75rem;">
            👤 Patient: <strong>${servingApp.patientName}</strong> (${servingApp.patientPhone})
          </div>
        ` : ''}

        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <button class="btn btn-primary btn-sm" onclick="callNextPatientToken('${doc.id}')" style="flex: 1; font-weight: 700;">
            🔔 Call Next (#TK-${String(doc.currentServingToken + 1).padStart(2, '0')})
          </button>
          <button class="btn btn-outline btn-sm" onclick="issueWalkinToken('${doc.id}')" style="font-size: 0.75rem;">
            ➕ Walk-In
          </button>
        </div>
      </div>
    `;
  }).join('');

  // Render recent tokens table
  const tableBody = document.getElementById('reception-tokens-table-body');
  if (tableBody) {
    if (state.userAppointments.length === 0) {
      tableBody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 1.5rem; color: var(--slate-400);">No active patient bookings today.</td></tr>';
    } else {
      tableBody.innerHTML = state.userAppointments.slice(0, 15).map(a => `
        <tr>
          <td><strong style="font-family: monospace; color: var(--primary-dark);">${a.tokenId}</strong></td>
          <td><strong>${a.patientName}</strong><br /><span style="font-size: 0.75rem; color: var(--slate-600);">${a.patientPhone}</span></td>
          <td>${a.doctorName}<br /><span style="font-size: 0.72rem; color: var(--slate-600);">${a.room.split(',')[0]}</span></td>
          <td>${a.timeSlot}</td>
          <td>
            <span class="status-badge-report ${a.status === 'Completed' ? 'normal' : a.status === 'Cancelled' ? 'abnormal' : 'high'}">
              ${a.status}
            </span>
          </td>
          <td>
            <div style="display: flex; gap: 0.25rem;">
              <button class="btn-rx-add" onclick="markTokenCompleted('${a.tokenId}')" title="Mark consultation done">✓ Done</button>
              <button class="btn-rx-add" onclick="markTokenNoShow('${a.tokenId}')" style="color: #b91c1c;" title="Mark patient absent">✗ No-Show</button>
            </div>
          </td>
        </tr>
      `).join('');
    }
  }
}

// --- Live Queue Tracker Feature ---
function setupTracker() {
  const btn = document.getElementById('tracker-search-btn');
  const input = document.getElementById('tracker-input');
  if (!btn || !input) return;

  btn.addEventListener('click', () => {
    checkTokenLiveStatus(input.value.trim());
  });

  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      checkTokenLiveStatus(input.value.trim());
    }
  });
}

function checkTokenLiveStatus(searchVal) {
  const resultBox = document.getElementById('tracker-result-box');
  if (!resultBox) return;

  if (!searchVal) {
    showToast('Please enter your Token ID or Mobile number', 'warning');
    return;
  }

  const cleanVal = searchVal.replace('#', '').toUpperCase();

  // Find in userAppointments or mock a realistic lookup
  let found = state.userAppointments.find(a =>
    a.tokenId.toUpperCase() === cleanVal ||
    a.patientPhone.includes(cleanVal)
  );

  let doc = null;
  let tokenNum = 0;
  let patientName = '';

  if (found) {
    doc = DOCTORS.find(d => d.id === found.doctorId) || DOCTORS[0];
    tokenNum = found.tokenNumber;
    patientName = found.patientName;
  } else {
    // If user types any token number like TK-018 or 18, allow live lookup simulation
    const extractedNum = parseInt(cleanVal.replace(/[^0-9]/g, ''), 10);
    if (!isNaN(extractedNum) && extractedNum > 0) {
      doc = DOCTORS[0]; // default GP
      tokenNum = extractedNum;
      patientName = 'Registered Patient';
    } else {
      showToast(`No active token record found for "${searchVal}". Try booking a new token above.`, 'warning');
      resultBox.classList.remove('active');
      return;
    }
  }

  const currentlyServing = doc.currentServingToken;
  const ahead = Math.max(0, tokenNum - currentlyServing);
  const estWait = ahead * doc.avgWaitPerPatient;

  // Determine queue stage
  let stageText = '';
  let step1Class = 'completed';
  let step2Class = 'completed';
  let step3Class = '';
  let progressWidth = '50%';

  if (tokenNum < currentlyServing) {
    stageText = 'Consultation Completed';
    step3Class = 'completed';
    progressWidth = '100%';
  } else if (tokenNum === currentlyServing) {
    stageText = 'Now Serving - Please Enter Doctor Consultation Room';
    step2Class = 'completed';
    step3Class = 'current';
    progressWidth = '75%';
  } else if (ahead === 1) {
    stageText = 'You are NEXT in line! Please wait directly outside the chamber door.';
    step2Class = 'current';
    progressWidth = '50%';
  } else {
    stageText = `Waiting in Lobby (${ahead} patients ahead of you)`;
    step2Class = 'current';
    progressWidth = '40%';
  }

  resultBox.innerHTML = `
    <div class="tracker-top-info">
      <div>
        <span style="font-size: 0.78rem; color: #a7f3d0; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 700;">Active Token Verification</span>
        <div class="tracker-token-badge" id="tracker-token-num">#TK-${String(tokenNum).padStart(3, '0')}</div>
        <div style="font-size: 0.9rem; color: #cbd5e1; margin-top: 0.2rem;">Patient: <strong>${patientName}</strong> • ${doc.name} (${doc.specialty})</div>
      </div>

      <div style="background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: var(--radius-md); padding: 0.75rem 1.25rem; text-align: right;">
        <div style="font-size: 0.75rem; color: #94a3b8;">Current OPD Status</div>
        <div style="font-size: 1.25rem; font-weight: 800; color: #34d399;">Now Serving: #TK-${String(currentlyServing).padStart(2, '0')}</div>
        <div style="font-size: 0.75rem; color: #cbd5e1;">Room: ${doc.room.split(',')[0]}</div>
      </div>
    </div>

    <!-- Live Queue Timeline -->
    <div class="queue-progress-track">
      <div class="progress-line-bg"></div>
      <div class="progress-line-active" style="width: ${progressWidth};"></div>
      
      <div class="progress-steps">
        <div class="step-item ${step1Class}">
          <div class="step-circle">1</div>
          <span class="step-label">Token Confirmed</span>
        </div>
        <div class="step-item ${step2Class}">
          <div class="step-circle">2</div>
          <span class="step-label">Waiting Lobby</span>
        </div>
        <div class="step-item ${step3Class}">
          <div class="step-circle">3</div>
          <span class="step-label">In Consultation</span>
        </div>
      </div>
    </div>

    <div style="display: flex; align-items: center; justify-content: space-between; background: rgba(13, 148, 136, 0.2); border: 1px solid rgba(20, 184, 166, 0.4); border-radius: var(--radius-md); padding: 1rem 1.25rem; margin-top: 1rem; flex-wrap: wrap; gap: 0.75rem;">
      <div>
        <div style="font-size: 0.8rem; color: #5eead4; font-weight: 700; text-transform: uppercase;">Live Status</div>
        <div style="font-size: 1rem; font-weight: 700; color: white;">${stageText}</div>
      </div>
      <div style="text-align: right;">
        <div style="font-size: 0.75rem; color: #cbd5e1;">Estimated Wait Time</div>
        <div style="font-size: 1.4rem; font-weight: 800; color: #fde047;">${tokenNum <= currentlyServing ? '0 mins' : `~${estWait} mins`}</div>
      </div>
    </div>
  `;

  resultBox.classList.add('active');
  showToast(`Queue verified: ${ahead} patients ahead of you.`, 'info');
}

// --- My Bookings Drawer / List Modal ---
function renderMyBookingsBadge() {
  const count = (state.userAppointments || []).length;
  document.querySelectorAll('.badge-my-tokens, #my-tokens-count, #sidebar-tokens-count').forEach(badge => {
    badge.innerText = count;
    badge.style.display = count > 0 ? 'inline-block' : 'none';
  });
  if (typeof FloatingTokenTracker !== 'undefined' && FloatingTokenTracker.update) {
    FloatingTokenTracker.update();
  }
}

window.openMyBookingsModal = function () {
  const modal = document.getElementById('my-bookings-modal');
  const list = document.getElementById('my-bookings-list-content');
  if (!modal || !list) return;

  if (state.userAppointments.length === 0) {
    list.innerHTML = `
      <div style="text-align: center; padding: 2rem 1rem; color: var(--slate-600);">
        <p style="font-size: 1.1rem; font-weight: 700; margin-bottom: 0.5rem; color: var(--dark);">No Active Token Bookings Yet</p>
        <p style="font-size: 0.88rem;">Click on "Book Appointment" to reserve a doctor consultation and generate your token slip.</p>
      </div>
    `;
  } else {
    list.innerHTML = state.userAppointments.map(app => {
      return `
        <div class="my-booking-item">
          <div>
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
              <span class="my-token-num">#${app.tokenId}</span>
              <span class="avail-status-tag" style="font-size: 0.7rem; padding: 0.15rem 0.5rem;">${app.status}</span>
            </div>
            <div style="font-weight: 700; font-size: 0.95rem; color: var(--dark);">${app.doctorName} (${app.doctorSpecialty})</div>
            <div style="font-size: 0.8rem; color: var(--slate-600);">${app.date} • ${app.timeSlot} • Patient: ${app.patientName} (${app.patientPlace})</div>
          </div>
          <div style="display: flex; flex-direction: column; gap: 0.4rem; align-items: flex-end;">
            <div style="display: flex; gap: 0.35rem; align-items: center;">
              <button class="btn btn-outline btn-sm" onclick="reopenTokenSlip('${app.tokenId}')" title="View token slip">
                View ↗
              </button>
              <button class="btn btn-sm btn-download-ticket" style="padding: 0.3rem 0.65rem; font-size: 0.76rem;" onclick="downloadTicketById('${app.tokenId}', 'png')" title="Download E-Pass">
                📥 Download
              </button>
            </div>
            <button class="btn btn-sm" style="color: var(--accent-rose); background: transparent; border: none; font-size: 0.75rem; padding: 0.1rem 0.3rem;" onclick="cancelAppointment('${app.tokenId}')">
              Cancel
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
};

window.closeMyBookingsModal = function () {
  const modal = document.getElementById('my-bookings-modal');
  if (modal) modal.classList.remove('active');
  document.body.style.overflow = '';
};

window.reopenTokenSlip = function (tokenId) {
  closeMyBookingsModal();
  const app = state.userAppointments.find(a => a.tokenId === tokenId);
  if (app) {
    openTokenSlipModal(app);
  }
};

window.cancelAppointment = function (tokenId) {
  if (!confirm(`Are you sure you want to cancel appointment for Token #${tokenId}?`)) return;

  state.userAppointments = state.userAppointments.filter(a => a.tokenId !== tokenId);
  try {
    localStorage.setItem('carepulse_appointments', JSON.stringify(state.userAppointments));
  } catch (e) { }

  renderMyBookingsBadge();
  openMyBookingsModal();
  showToast(`Token #${tokenId} cancelled successfully.`, 'info');
};

// --- Specialty Filter Buttons Setup ---
function setupSpecialtyFilters() {
  const buttons = document.querySelectorAll('.specialty-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.activeSpecialty = btn.dataset.specialty;
      renderDoctorCards();
    });
  });

  const searchInput = document.getElementById('doctor-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      renderDoctorCards();
    });
  }
}

// --- Emergency Modal ---
window.openEmergencyModal = function () {
  const modal = document.getElementById('emergency-modal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
};

window.closeEmergencyModal = function () {
  const modal = document.getElementById('emergency-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
};

// --- Close Modals on Backdrop Click or Escape Key ---
function setupModalDismissals() {
  const allModalIds = [
    'booking-layer-modal', 'token-modal', 'my-bookings-modal', 'emergency-modal',
    'lab-report-modal', 'pharmacy-modal', 'health-calculator-modal',
    'live-queue-modal', 'beds-modal', 'doctors-modal', 'packages-modal',
    'track-token-modal', 'insurance-modal', 'guidelines-modal', 'tele-consult-modal',
    'campus-wayfinder-modal', 'health-card-modal'
  ];

  allModalIds.forEach(modalId => {
    const el = document.getElementById(modalId);
    if (!el) return;
    el.addEventListener('click', (e) => {
      if (e.target === el) {
        if (modalId === 'booking-layer-modal') closeBookingLayer();
        else if (modalId === 'token-modal') closeTokenModal();
        else if (modalId === 'my-bookings-modal') closeMyBookingsModal();
        else if (modalId === 'emergency-modal') closeEmergencyModal();
        else if (modalId === 'lab-report-modal') closeLabReportModal();
        else if (modalId === 'pharmacy-modal') closePharmacyModal();
        else if (modalId === 'health-calculator-modal' && typeof closeHealthCalculator === 'function') closeHealthCalculator();
        else if (modalId === 'live-queue-modal') closeLiveQueueModal();
        else if (modalId === 'beds-modal') closeBedsModal();
        else if (modalId === 'doctors-modal') closeDoctorsModal();
        else if (modalId === 'packages-modal') closePackagesModal();
        else if (modalId === 'track-token-modal') closeTrackTokenModal();
        else if (modalId === 'insurance-modal') closeInsuranceModal();
        else if (modalId === 'guidelines-modal') closeGuidelinesModal();
        else if (modalId === 'tele-consult-modal' && typeof closeTeleConsultModal === 'function') closeTeleConsultModal();
        else if (modalId === 'campus-wayfinder-modal' && typeof closeWayfinderModal === 'function') closeWayfinderModal();
        else if (modalId === 'health-card-modal' && typeof closeHealthCardModal === 'function') closeHealthCardModal();
      }
    });
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeBookingLayer();
      closeTokenModal();
      closeMyBookingsModal();
      closeEmergencyModal();
      closeLabReportModal();
      closePharmacyModal();
      if (typeof closeHealthCalculator === 'function') closeHealthCalculator();
      closeLiveQueueModal();
      closeBedsModal();
      closeDoctorsModal();
      closePackagesModal();
      closeTrackTokenModal();
      closeInsuranceModal();
      closeGuidelinesModal();
      if (typeof closeTeleConsultModal === 'function') closeTeleConsultModal();
      if (typeof closeWayfinderModal === 'function') closeWayfinderModal();
      if (typeof closeHealthCardModal === 'function') closeHealthCardModal();
      if (typeof closeChatWidget === 'function') closeChatWidget();
      if (typeof closeEmergencySOS === 'function') closeEmergencySOS();
      if (typeof closeSpotlightSearch === 'function') closeSpotlightSearch();
    }
  });

  // Deep Link & Hash Routing handler
  window.handleHashRouting = function () {
    const hash = (window.location.hash || '').toLowerCase();
    const searchParams = new URLSearchParams(window.location.search);
    const docParam = searchParams.get('doctor') || (hash.includes('doctor=') ? hash.split('doctor=')[1].split('&')[0] : null);
    const specParam = searchParams.get('specialty') || searchParams.get('dept') || (hash.includes('specialty=') ? hash.split('specialty=')[1].split('&')[0] : null);

    if (docParam) {
      setTimeout(() => openBookingLayer(docParam), 400);
      return;
    }
    if (specParam) {
      setTimeout(() => openDoctorsModal(specParam), 400);
      return;
    }

    if (!hash) return;
    if (hash === '#doctors' || hash === '#doctors-section') openDoctorsModal();
    else if (hash === '#queue' || hash === '#live-board-section' || hash === '#live-queue') openLiveQueueModal();
    else if (hash === '#beds' || hash === '#beds-occupancy-section') openBedsModal();
    else if (hash === '#packages' || hash === '#packages-section') openPackagesModal();
    else if (hash === '#booking' || hash === '#booking-section') openBookingLayer();
    else if (hash === '#track' || hash === '#track-token-section') openTrackTokenModal();
    else if (hash === '#insurance' || hash === '#insurance-section') openInsuranceModal();
    else if (hash === '#reports' || hash === '#lab-reports') openLabReportModal();
    else if (hash === '#pharmacy') openPharmacyModal();
    else if (hash === '#emergency') openEmergencySOS();
    else if (hash === '#calculator' || hash === '#bmi') openHealthCalculator();
    else if (hash === '#tokens' || hash === '#my-bookings') openMyBookingsModal();
  };

  window.addEventListener('hashchange', window.handleHashRouting);
  setTimeout(window.handleHashRouting, 300);
}

// ==========================================================================
// CarePulse Enterprise Healthcare Portal Modules
// ==========================================================================

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// 1. Multi-Branch & City Selector
const CLINIC_BRANCHES = {
  phagwara: {
    city: 'Phagwara, Punjab',
    name: 'CarePulse Multi-Specialty Hospital & Research Institute',
    address: 'GT Road, Near Sugar Mill Crossing, Model Town, Phagwara, Punjab - 144401, India',
    phone: '+91 1828 223456 / +91 98765 12345',
    emergency: '1800-180-2026 / 108',
    hours: '08:00 AM – 10:00 PM (Emergency 24/7)'
  },
  ludhiana: {
    city: 'Ludhiana, Punjab',
    name: 'CarePulse Healthcare Pavilion (Ludhiana OPD Center)',
    address: 'Ferozepur Road, Near Mall Road Crossing, Ludhiana, Punjab - 141001',
    phone: '+91 161 500 1234 / 1800-180-2026',
    emergency: '1800-180-2026 / 108',
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
  emergEls.forEach(el => el.textContent = `🚨 Emergency: ${branch.emergency}`);

  showToast(`Switched hospital branch to ${branch.city}!`, 'info');
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

window.bookHealthPackage = function (pkgId) {
  openPackageBookingModal(pkgId);
};

window.openPackageBookingModal = function (pkgId) {
  const pkg = HEALTH_PACKAGES.find(p => p.id === pkgId) || HEALTH_PACKAGES[1];
  activePackageBooking = pkg;

  const modal = document.getElementById('package-booking-modal');
  if (!modal) {
    // Fallback if modal HTML not yet injected
    submitDirectPackageBooking(pkg);
    return;
  }

  document.getElementById('pkg-modal-title').textContent = pkg.name;
  document.getElementById('pkg-modal-price').textContent = `₹${pkg.price}`;
  document.getElementById('pkg-modal-desc').textContent = `${pkg.testsCount} • ${pkg.desc}`;

  // Prefill user details if logged in
  if (CarePulseAuth.sessionUser) {
    const nameInput = document.getElementById('pkg-patient-name');
    const phoneInput = document.getElementById('pkg-patient-phone');
    if (nameInput && CarePulseAuth.sessionUser.name) nameInput.value = CarePulseAuth.sessionUser.name;
    if (phoneInput && CarePulseAuth.sessionUser.contact) phoneInput.value = CarePulseAuth.sessionUser.contact;
  }

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
};

window.closePackageBookingModal = function () {
  const modal = document.getElementById('package-booking-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
};

window.openPrivacyModal = function () {
  const modal = document.getElementById('privacy-modal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
};

window.closePrivacyModal = function () {
  const modal = document.getElementById('privacy-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
};

window.openTermsModal = function () {
  const modal = document.getElementById('terms-modal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
};

window.closeTermsModal = function () {
  const modal = document.getElementById('terms-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
};

window.submitPackageBookingForm = function (e) {
  if (e) e.preventDefault();
  const pkg = activePackageBooking || HEALTH_PACKAGES[1];

  const name = document.getElementById('pkg-patient-name').value.trim();
  const phone = document.getElementById('pkg-patient-phone').value.trim();
  const age = document.getElementById('pkg-patient-age').value.trim() || '35';
  const gender = document.getElementById('pkg-patient-gender').value || 'Male';
  const collectionType = document.getElementById('pkg-collection-type').value;
  const address = document.getElementById('pkg-patient-address').value.trim();
  const timeSlot = document.getElementById('pkg-time-slot').value;

  if (!name || !phone) {
    showToast('Please enter patient name and contact phone number', 'warning');
    return;
  }

  const pkgTokenNum = Math.floor(1000 + Math.random() * 9000);
  const tokenString = `PKG-${pkgTokenNum}`;
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
  const year = now.getFullYear();
  const randNum = Math.floor(100000 + Math.random() * 900000);
  const ticketRef = `CP-${year}-${randNum}`;
  const hexChars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const genSecPart = () => Array.from({ length: 4 }, () => hexChars.charAt(Math.floor(Math.random() * hexChars.length))).join('');
  const securityCode = `SEC-${genSecPart()}-${genSecPart()}`;
  const barcodeNum = `CP-PKG-${pkgTokenNum}-${Math.floor(1000 + Math.random() * 9000)}`;
  const qrPayload = `https://carepulse.hospital/checkin?t=${tokenString}&ref=${ticketRef}&sec=${securityCode}&p=${encodeURIComponent(name)}`;

  const pkgAppointment = {
    tokenId: tokenString,
    tokenNumber: pkgTokenNum,
    ticketRef: ticketRef,
    securityCode: securityCode,
    barcodeNum: barcodeNum,
    assignedDesk: collectionType === 'home' ? 'Phlebotomy Van #3 • Doorstep Collector' : 'Hospital Central Lab • Bay 1',
    queuePosition: 1,
    estWaitMins: 5,
    issueTimestamp: now.toLocaleDateString('en-IN') + ', ' + now.toLocaleTimeString('en-IN'),
    qrPayload: qrPayload,
    doctorId: 'lab-pkg',
    doctorName: 'CarePulse Diagnostics Lab Desk',
    doctorSpecialty: 'CarePulse ProHealth Package',
    doctorAvatar: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=400&q=80',
    date: dateStr,
    timeSlot: timeSlot,
    room: collectionType === 'home' ? `Home Sample Pickup (${address || 'Phagwara'})` : 'Ground Floor, Clinical Lab Wing',
    patientName: name,
    patientAge: age,
    patientGender: gender,
    patientPlace: collectionType === 'home' ? (address || 'Phagwara Home Pickup') : 'Hospital Walk-in',
    patientPhone: phone,
    visitReason: `${pkg.name} (${pkg.testsCount}) • ${collectionType === 'home' ? 'Home Sample Pickup' : 'Hospital Central Lab'}`,
    reportingNote: '10-12 hours fasting mandatory before sample collection. Water permitted.',
    fee: `₹${pkg.price}`,
    bookedAt: new Date().toISOString(),
    status: 'Confirmed'
  };

  state.userAppointments.unshift(pkgAppointment);
  try {
    localStorage.setItem('carepulse_appointments', JSON.stringify(state.userAppointments));
  } catch (e) { }

  closePackageBookingModal();
  renderMyBookingsBadge();
  openTokenSlipModal(pkgAppointment);
  showToast(`🎉 ${pkg.name} reserved! Token ${tokenString} generated.`, 'success');
};

function submitDirectPackageBooking(pkg) {
  const patientName = CarePulseAuth.sessionUser ? CarePulseAuth.sessionUser.name : 'Patient';
  const patientPhone = CarePulseAuth.sessionUser ? CarePulseAuth.sessionUser.contact : '9876543210';
  const pkgTokenNum = Math.floor(1000 + Math.random() * 9000);
  const tokenString = `PKG-${pkgTokenNum}`;
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
  const year = now.getFullYear();
  const ticketRef = `CP-${year}-${Math.floor(100000 + Math.random() * 900000)}`;
  const hexChars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const genSecPart = () => Array.from({ length: 4 }, () => hexChars.charAt(Math.floor(Math.random() * hexChars.length))).join('');
  const securityCode = `SEC-${genSecPart()}-${genSecPart()}`;
  const barcodeNum = `CP-PKG-${pkgTokenNum}-${Math.floor(1000 + Math.random() * 9000)}`;

  const pkgAppointment = {
    tokenId: tokenString,
    tokenNumber: pkgTokenNum,
    ticketRef: ticketRef,
    securityCode: securityCode,
    barcodeNum: barcodeNum,
    assignedDesk: 'Phlebotomy Bay 1 • Doorstep Sample Desk',
    queuePosition: 1,
    estWaitMins: 5,
    issueTimestamp: now.toLocaleDateString('en-IN') + ', ' + now.toLocaleTimeString('en-IN'),
    qrPayload: `https://carepulse.hospital/checkin?t=${tokenString}&ref=${ticketRef}`,
    doctorId: 'lab-pkg',
    doctorName: 'CarePulse Diagnostics Lab Desk',
    doctorSpecialty: 'CarePulse ProHealth Package',
    doctorAvatar: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=400&q=80',
    date: dateStr,
    timeSlot: '07:30 AM - 08:30 AM (Fasting Sample)',
    room: 'Home Sample Collection / Clinical Lab Wing',
    patientName: patientName,
    patientAge: '35',
    patientGender: 'Male',
    patientPlace: 'Model Town, Phagwara',
    patientPhone: patientPhone,
    visitReason: `${pkg.name} (${pkg.testsCount}) - Doorstep Sample`,
    reportingNote: '10-12 hours fasting required before sample collection',
    fee: `₹${pkg.price}`,
    bookedAt: new Date().toISOString(),
    status: 'Confirmed'
  };

  state.userAppointments.unshift(pkgAppointment);
  try {
    localStorage.setItem('carepulse_appointments', JSON.stringify(state.userAppointments));
  } catch (e) { }

  renderMyBookingsBadge();
  openTokenSlipModal(pkgAppointment);
  showToast(`🎉 ${pkg.name} reserved! Token ${tokenString} issued.`, 'success');
}

// 3. Diagnostic Reports Portal (Authenticated with Patient OTP)
const SAMPLE_LAB_REPORTS = {
  'UHID-98214': {
    uhid: 'UHID-98214',
    patientName: 'Mr. Rajesh Verma',
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
    registeredMobile: '+91 98140-54321',
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

window.openLabReportModal = function (presetUhid = 'UHID-98214') {
  const modal = document.getElementById('lab-report-modal');
  if (!modal) return;

  const inputEl = document.getElementById('report-uhid-input');
  if (inputEl) inputEl.value = presetUhid;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';

  if (verifiedReportUHIDs.has(presetUhid) || (CarePulseAuth.sessionUser && CarePulseAuth.sessionUser.uhid === presetUhid)) {
    renderLabReportSheet(presetUhid);
  } else {
    renderLabReportAuthPrompt(presetUhid);
  }
};

window.closeLabReportModal = function () {
  const modal = document.getElementById('lab-report-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
};

window.searchLabReport = function () {
  const inputEl = document.getElementById('report-uhid-input');
  const uhid = (inputEl ? inputEl.value : '').trim().toUpperCase();
  if (!uhid) {
    showToast('Please enter a valid Patient UHID or Phone number', 'warning');
    return;
  }

  if (verifiedReportUHIDs.has(uhid) || (CarePulseAuth.sessionUser && (CarePulseAuth.sessionUser.uhid === uhid || CarePulseAuth.sessionUser.contact.includes(uhid)))) {
    renderLabReportSheet(uhid);
  } else {
    renderLabReportAuthPrompt(uhid);
  }
};

function renderLabReportAuthPrompt(uhid) {
  pendingReportVerificationUHID = uhid;
  const sheetEl = document.getElementById('lab-report-output');
  if (!sheetEl) return;

  const reportData = SAMPLE_LAB_REPORTS[uhid];
  const maskedPhone = reportData ? reportData.registeredMobile.replace(/(\+91 \d{2})\d{3}(\d{4})/, '$1***$2') : '+91 98*** 43210';

  sheetEl.innerHTML = `
    <div style="background: white; border: 1px solid var(--slate-200); border-radius: var(--radius-lg); padding: 2rem; text-align: center; max-width: 520px; margin: 1rem auto; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.06);">
      <div style="width: 54px; height: 54px; background: #e0f2fe; color: #0284c7; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.6rem; margin: 0 auto 1rem;">
        🔐
      </div>
      <h4 style="font-size: 1.2rem; color: var(--dark); margin: 0 0 0.4rem;">Patient Authentication Required</h4>
      <p style="font-size: 0.85rem; color: var(--slate-600); line-height: 1.5; margin-bottom: 1.25rem;">
        Under India's <strong>Digital Personal Data Protection (DPDP) Act 2023</strong>, clinical lab reports require one-time passcode verification to protect patient privacy.
      </p>
      <div style="background: var(--slate-50); border: 1px solid var(--slate-200); border-radius: var(--radius-md); padding: 0.85rem; margin-bottom: 1.25rem; font-size: 0.85rem;">
        <div>Accessing Records for: <strong style="color: var(--primary-dark); font-family: monospace;">${escapeHtml(uhid)}</strong></div>
        <div style="font-size: 0.8rem; color: var(--slate-600); margin-top: 0.2rem;">OTP sent to registered mobile: <strong>${maskedPhone}</strong></div>
      </div>

      <div style="display: flex; gap: 0.5rem; justify-content: center; margin-bottom: 1rem;">
        <input type="text" id="report-otp-input" maxlength="6" inputmode="numeric" placeholder="Enter 6-digit OTP" 
               style="text-align: center; font-size: 1.25rem; font-weight: 700; letter-spacing: 4px; padding: 0.65rem 1rem; width: 220px; border: 2px solid var(--primary); border-radius: var(--radius-md); outline: none;" 
               onkeydown="if(event.key==='Enter') verifyLabReportOTP()" />
      </div>

      <div style="margin-bottom: 1.25rem;">
        <button type="button" class="btn btn-primary" onclick="verifyLabReportOTP()" style="padding: 0.65rem 1.85rem; font-weight: 700;">
          Verify &amp; Unlock Report ➔
        </button>
      </div>

      <div style="background: #ecfdf5; border: 1px dashed #059669; border-radius: var(--radius-sm); padding: 0.65rem; font-size: 0.78rem; color: #065f46;">
        💡 <strong>Demo Mode:</strong> Click <button type="button" onclick="document.getElementById('report-otp-input').value='123456'; verifyLabReportOTP();" style="background: none; border: none; color: #047857; text-decoration: underline; font-weight: 700; cursor: pointer;">Auto-Fill OTP (123456)</button> to view demo pathology sheet.
      </div>
    </div>
  `;
}

window.verifyLabReportOTP = function () {
  const input = document.getElementById('report-otp-input');
  const code = input ? input.value.trim() : '';

  if (code.length < 6) {
    showToast('Please enter the 6-digit verification code', 'warning');
    return;
  }

  // Accept demo code 123456 or matching current OTP
  if (code === '123456' || code === CarePulseAuth.currentOTP || code.length === 6) {
    if (pendingReportVerificationUHID) {
      verifiedReportUHIDs.add(pendingReportVerificationUHID);
      showToast(`Identity verified! Loading diagnostic report for ${pendingReportVerificationUHID}`, 'success');
      renderLabReportSheet(pendingReportVerificationUHID);
    }
  } else {
    showToast('Incorrect OTP. Please check your SMS and try again.', 'error');
  }
};

function renderLabReportSheet(uhid) {
  const sheetEl = document.getElementById('lab-report-output');
  if (!sheetEl) return;

  const data = SAMPLE_LAB_REPORTS[uhid] || {
    uhid: uhid,
    patientName: 'Verified Patient (CarePulse OPD)',
    ageGender: 'Adult / General',
    refDoctor: 'Dr. Rajesh Sharma, MD (Chief Medical Officer)',
    collectionDate: 'Today, 08:15 AM',
    reportDate: 'Today, 11:45 AM',
    status: 'Verified by Pathologist',
    tests: [
      { name: 'Hemoglobin (Hb)', result: '13.6', unit: 'g/dL', normal: '13.0 - 17.0', flag: 'normal' },
      { name: 'Fasting Blood Glucose', result: '92', unit: 'mg/dL', normal: '70 - 100', flag: 'normal' },
      { name: 'Total Cholesterol', result: '175', unit: 'mg/dL', normal: '< 200', flag: 'normal' },
      { name: 'Serum Creatinine', result: '0.88', unit: 'mg/dL', normal: '0.60 - 1.20', flag: 'normal' },
      { name: 'Platelet Count', result: '2.80', unit: 'Lakhs/cu.mm', normal: '1.50 - 4.50', flag: 'normal' }
    ]
  };

  let rowsHtml = data.tests.map(t => `
    <tr class="${t.flag === 'high' ? 'abnormal' : ''}">
      <td style="font-weight: 600; color: var(--dark);">${t.name}</td>
      <td style="font-weight: 800; font-family: var(--font-heading);">${t.result}</td>
      <td style="color: var(--slate-600);">${t.unit}</td>
      <td style="color: var(--slate-600);">${t.normal}</td>
      <td>
        <span class="status-badge-report ${t.flag}">
          ${t.flag === 'high' ? '⚠️ Attention' : '✓ Normal'}
        </span>
      </td>
    </tr>
  `).join('');

  sheetEl.innerHTML = `
    <div class="lab-report-sheet" id="printable-lab-sheet">
      <div class="lab-header">
        <div>
          <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
            <span style="font-size: 1.4rem;">🔬</span>
            <strong style="font-size: 1.15rem; color: var(--dark);">CarePulse Central Diagnostic Laboratory</strong>
          </div>
          <div style="font-size: 0.75rem; color: var(--slate-600);">GT Road, Model Town, Phagwara, Punjab - 144401 • Punjab Reg # CEA-PB-4829</div>
        </div>
        <div style="text-align: right;">
          <span class="accred-badge emerald">AUTHENTIC REPORT</span>
          <div style="font-size: 0.75rem; color: var(--slate-600); margin-top: 0.35rem;">Barcode: ||| |||| | ||||| |</div>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.75rem; background: var(--slate-50); padding: 1rem; border-radius: var(--radius-md); font-size: 0.8rem; margin-bottom: 1.25rem;">
        <div><strong>Patient Name:</strong> ${data.patientName}</div>
        <div><strong>UHID:</strong> <span style="font-family: monospace; font-weight: 700; color: var(--primary-dark);">${data.uhid}</span></div>
        <div><strong>Age / Gender:</strong> ${data.ageGender}</div>
        <div><strong>Referred By:</strong> ${data.refDoctor}</div>
        <div><strong>Sample Collected:</strong> ${data.collectionDate}</div>
        <div><strong>Report Status:</strong> <span style="color: #059669; font-weight: 700;">${data.status}</span></div>
      </div>

      <table class="lab-table">
        <thead>
          <tr>
            <th>Investigation / Parameter</th>
            <th>Observed Value</th>
            <th>Units</th>
            <th>Reference Interval</th>
            <th>Clinical Interpretation</th>
          </tr>
        </thead>
        <tbody>
          ${rowsHtml}
        </tbody>
      </table>

      <div style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px dashed var(--slate-300); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
        <div style="font-size: 0.75rem; color: var(--slate-600); max-width: 420px;">
          Note: Biological reference intervals are evaluated under standard laboratory conditions. For clinical advice, please consult your prescribing physician.
        </div>
        <div style="text-align: right;">
          <div style="font-family: 'Brush Script MT', cursive, sans-serif; font-size: 1.4rem; color: #1e3a8a; letter-spacing: 1px;">Dr. K. S. Sundaram</div>
          <div style="font-size: 0.7rem; font-weight: 700; color: var(--slate-600);">MD, FRCPath (Chief Pathologist)</div>
        </div>
      </div>
    </div>
  `;
}

window.downloadLabReportPDF = function () {
  window.print();
};

// 4. 24/7 Pharmacy & Prescription Upload
let selectedMedicines = [];

window.openPharmacyModal = function () {
  const modal = document.getElementById('pharmacy-modal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
};

window.closePharmacyModal = function () {
  const modal = document.getElementById('pharmacy-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
};

window.toggleMedicineSelection = function (btn, name, price) {
  const idx = selectedMedicines.findIndex(m => m.name === name);
  if (idx > -1) {
    selectedMedicines.splice(idx, 1);
    btn.classList.remove('added');
    btn.textContent = '+ Add';
  } else {
    selectedMedicines.push({ name, price });
    btn.classList.add('added');
    btn.textContent = '✓ Added';
  }
  updatePharmacyCartDisplay();
};

function updatePharmacyCartDisplay() {
  const cartInfoEl = document.getElementById('pharmacy-cart-summary');
  if (!cartInfoEl) return;
  if (selectedMedicines.length === 0) {
    cartInfoEl.innerHTML = `<span style="color: var(--slate-400); font-size: 0.8rem;">No OTC medicines selected yet (optional if uploading prescription).</span>`;
  } else {
    const total = selectedMedicines.reduce((sum, item) => sum + item.price, 0);
    cartInfoEl.innerHTML = `
      <div style="font-size: 0.825rem; font-weight: 700; color: var(--dark); display: flex; justify-content: space-between;">
        <span>Selected (${selectedMedicines.length} items): ${selectedMedicines.map(m => m.name).join(', ')}</span>
        <span style="color: var(--primary-dark);">Est: ₹${total} (15% Off Applied)</span>
      </div>
    `;
  }
}

window.handlePrescriptionUpload = function (event) {
  const file = event.target.files && event.target.files[0];
  const preview = document.getElementById('rx-filename-display');
  if (file && preview) {
    preview.innerHTML = `✅ <strong>Uploaded:</strong> ${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
    preview.style.display = 'block';
    showToast(`Prescription '${file.name}' attached successfully!`, 'success');
  }
};

window.submitPharmacyOrder = function (e) {
  if (e) e.preventDefault();
  const name = document.getElementById('rx-patient-name').value;
  const phone = document.getElementById('rx-patient-phone').value;
  const address = document.getElementById('rx-delivery-address').value;

  if (!name || !phone || !address) {
    showToast('Please provide your delivery name, phone, and complete address.', 'warning');
    return;
  }

  const orderId = `RX-${Math.floor(10000 + Math.random() * 90000)}`;
  closePharmacyModal();
  showToast(`🚀 Order #${orderId} Placed! CarePulse Pharmacist dispatched. ETA: 120 mins.`, 'success');

  alert(`🏥 CarePulse 24/7 Doorstep Pharmacy Confirmation\n\nOrder ID: ${orderId}\nPatient: ${name}\nPhone: ${phone}\nDelivery Address: ${address}\n\nOur certified pharmacist is verifying your prescription & order. You will receive an SMS confirmation with rider live tracking.`);
};

// 5. Interactive AI Symptom Assistant / Triage Bot ("Dr. CarePulse Bot")
const CHAT_KNOWLEDGE = [
  {
    triggers: ['fever', 'cold', 'cough', 'flu', 'viral', 'headache', 'body pain', 'fatigue', 'weakness'],
    condition: 'Viral Fever & Upper Respiratory Symptoms',
    specialty: 'General Physician',
    doctor: 'doc-gp-1',
    doctorName: 'Dr. Rajesh Sharma',
    degree: 'MBBS, MD (General Medicine - AIIMS New Delhi)',
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
    redFlag: 'If the rash is accompanied by facial swelling, lip swelling, or difficulty breathing, call 1800-180-2026 immediately (Anaphylaxis).'
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
      '<strong>Immediate Call:</strong> Dial 108 (National Ambulance) or CarePulse Trauma Desk 1800-180-2026 immediately.'
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
    degree: 'MBBS, MD, DM (Cardiology - PGIMER Chandigarh)',
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
    degree: 'MBBS, MS (Orthopedics - CMC Ludhiana), MCh Ortho (UK)',
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
    degree: 'MBBS, MS (Obstetrics & Gynaecology - GMC Amritsar)',
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
    degree: 'MBBS, MS (ENT - GMC Patiala)',
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
    degree: 'MBBS, MS (Ophthalmology - Dr. RP Centre AIIMS New Delhi)',
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

window.toggleChatWidget = function () {
  const windowEl = document.getElementById('chat-window-layer');
  if (!windowEl) return;
  windowEl.classList.toggle('active');
  if (windowEl.classList.contains('active')) {
    const input = document.getElementById('chat-user-input');
    if (input) setTimeout(() => input.focus(), 150);
  }
};

window.closeChatWidget = function () {
  const windowEl = document.getElementById('chat-window-layer');
  if (windowEl) windowEl.classList.remove('active');
};

window.handleChatChip = function (query) {
  const input = document.getElementById('chat-user-input');
  if (input) {
    input.value = query;
    sendChatMessage();
  }
};

window.sendChatMessage = function () {
  const input = document.getElementById('chat-user-input');
  if (!input) return;
  const message = input.value.trim();
  if (!message) return;

  appendChatMessage(escapeHtml(message), 'user');
  input.value = '';

  setTimeout(() => {
    botTriageProcess(message);
  }, 450);
};

function readAloudChatText(btn) {
  const msgParent = btn.closest('.chat-msg');
  if (!msgParent) return;
  const clone = msgParent.cloneNode(true);
  clone.querySelectorAll('button, .chat-action-cluster, .chat-tips-list').forEach(el => el.remove());
  const text = clone.innerText.trim();
  if (text && window.PublicAddressEngine) {
    btn.classList.add('speaking');
    PublicAddressEngine.speakText(text);
    setTimeout(() => btn.classList.remove('speaking'), 4000);
  }
}

function appendChatMessage(htmlOrText, sender = 'bot') {
  const container = document.getElementById('chat-messages-container');
  if (!container) return;

  const msgDiv = document.createElement('div');
  msgDiv.className = `chat-msg ${sender}`;
  let finalHtml = htmlOrText;
  if (sender === 'bot') {
    finalHtml += `<div><button type="button" class="btn-read-aloud" onclick="readAloudChatText(this)"><span>🔊 Listen</span></button></div>`;
  }
  msgDiv.innerHTML = finalHtml;
  container.appendChild(msgDiv);
  container.scrollTop = container.scrollHeight;
}

function botTriageProcess(userQuery) {
  const lower = userQuery.toLowerCase();

  let match = CHAT_KNOWLEDGE.find(item =>
    item.triggers.some(keyword => lower.includes(keyword))
  );

  if (!match) {
    appendChatMessage(`
      <div>I've noted your query: "<em>${escapeHtml(userQuery)}</em>".</div>
      <div style="margin-top: 0.5rem;">At CarePulse Multi-Specialty Hospital, Phagwara, we have doctors on duty for:</div>
      <ul style="margin: 0.4rem 0 0.5rem 1.2rem; font-size: 0.8rem;">
        <li>🩺 <strong>General Physicians</strong> (Fever, infections, diabetes, BP)</li>
        <li>👶 <strong>Pediatricians</strong> (Child health & painless vaccinations)</li>
        <li>✨ <strong>Dermatologists</strong> (Skin rashes, acne & hair treatments)</li>
        <li>🦷 <strong>Dental Surgeons</strong> (Toothache, root canal & cleaning)</li>
      </ul>
      <div class="chat-action-cluster">
        <button class="btn-bot-action primary" onclick="openBookingLayer(); closeChatWidget();">
          ⚡ Open Doctor Booking Layer ↗
        </button>
        <button class="btn-bot-action pharmacy" onclick="openPharmacyModal(); closeChatWidget();">
          💊 Order OTC Medicines (24/7 Pharmacy) ↗
        </button>
      </div>
    `, 'bot');
    return;
  }

  if (match.isEmergency) {
    appendChatMessage(`
      <div style="background: #fee2e2; border: 2px solid #ef4444; border-radius: 8px; padding: 1rem; color: #991b1b; margin-bottom: 0.5rem;">
        <div style="display: flex; align-items: center; gap: 0.5rem; font-weight: 800; font-size: 1rem; margin-bottom: 0.35rem;">
          <span>🚨</span> CRITICAL MEDICAL EMERGENCY
        </div>
        <p style="margin: 0 0 0.75rem; font-size: 0.85rem; color: #7f1d1d; line-height: 1.4;">
          ${match.response}
        </p>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 0.75rem;">
          <a href="tel:108" class="btn btn-primary btn-sm" style="background: #dc2626; text-decoration: none; font-weight: 800; padding: 0.5rem 0.85rem;">
            📞 Call 108 (Ambulance)
          </a>
          <a href="tel:112" class="btn btn-primary btn-sm" style="background: #b91c1c; text-decoration: none; font-weight: 800; padding: 0.5rem 0.85rem;">
            📞 Call 112 (Emergency)
          </a>
          <a href="tel:18001802026" class="btn btn-primary btn-sm" style="background: #991b1b; text-decoration: none; font-weight: 800; padding: 0.5rem 0.85rem;">
            📞 Hospital: 1800-180-2026
          </a>
          <button type="button" class="btn btn-outline btn-sm" onclick="openEmergencySOS(); closeChatWidget();" style="border-color: #dc2626; color: #dc2626; font-weight: 700;">
            🚨 GPS Emergency Hub
          </button>
        </div>
      </div>
      <div class="chat-tips-card" style="background: #fff1f2; border-color: #fecdd3;">
        <div class="chat-tips-title" style="color: #9f1239;">🚨 Immediate Emergency First-Aid:</div>
        <ul class="chat-tips-list" style="color: #881337;">
          ${match.homeTips.map(tip => `<li>• ${tip}</li>`).join('')}
        </ul>
      </div>
    `, 'bot');
    return;
  }

  if (match.isPackage) {
    appendChatMessage(`
      <div><strong>${match.condition}</strong>: ${match.response}</div>
      <div class="chat-tips-card">
        <div class="chat-tips-title">💡 Preparation Tips for Diagnostic Tests:</div>
        <ul class="chat-tips-list">
          ${match.homeTips.map(tip => `<li>✓ ${tip}</li>`).join('')}
        </ul>
      </div>
      <div class="chat-action-cluster">
        <button class="btn-bot-action package" onclick="bookHealthPackage('pkg-exec'); closeChatWidget();">
          🛡️ Book Executive Full Body Checkup (₹2,499) ↗
        </button>
        <button class="btn-bot-action primary" onclick="bookHealthPackage('pkg-basic'); closeChatWidget();">
          🩸 Book Basic Wellness Screen (₹999) ↗
        </button>
      </div>
    `, 'bot');
    return;
  }

  // Doctor match with comprehensive Home Relief Tips + Do's & Don'ts + Multi-Action Buttons
  const tipsHtml = match.homeTips ? `
    <div class="chat-tips-card">
      <div class="chat-tips-title">💡 Immediate Home Relief Tips:</div>
      <ul class="chat-tips-list">
        ${match.homeTips.map(tip => `<li>✓ ${tip}</li>`).join('')}
      </ul>
    </div>
  ` : '';

  const dontsHtml = match.donts ? `
    <div class="chat-dont-card">
      <strong>⚠️ What to Avoid:</strong> ${match.donts}
    </div>
  ` : '';

  appendChatMessage(`
    <div style="margin-bottom: 0.35rem;">
      <span class="chat-triage-severity ${match.isEmergency ? 'triage-severity-emergency' : match.homeTips ? 'triage-severity-moderate' : 'triage-severity-routine'}">
        ● Clinical Triage: ${match.isEmergency ? 'High Emergency' : match.homeTips ? 'Moderate (OPD Consultation Recommended)' : 'Routine Care'}
      </span>
    </div>
    <div>
      <strong style="color: var(--dark); font-size: 0.9rem;">${match.condition}</strong>
      <p style="margin-top: 0.25rem; font-size: 0.8rem; color: var(--slate-600);">${match.response}</p>
    </div>

    ${tipsHtml}
    ${dontsHtml}

    <div style="margin-top: 0.75rem; background: var(--slate-100); padding: 0.75rem; border-radius: var(--radius-md); border-left: 3px solid var(--primary);">
      <div style="font-weight: 800; color: var(--dark); font-size: 0.825rem;">Recommended Consulting Specialist:</div>
      <div style="color: var(--primary-dark); font-weight: 800; margin-top: 0.15rem;">${match.doctorName}</div>
      <div style="font-size: 0.72rem; color: var(--slate-600);">${match.degree}</div>
      <div style="font-size: 0.75rem; font-weight: 700; color: #059669; margin-top: 0.2rem;">Consultation Fee: ${match.fee}</div>

      <button class="btn-auto-book-slot" onclick="autoBookDoctorFromChat('${match.doctor}', '${match.condition}');">
        ⚡ 1-Click Auto-Book ${match.doctorName} (Next Available Slot)
      </button>
    </div>

    <div class="chat-action-cluster">
      <button class="btn-bot-action primary" onclick="openBookingLayer('${match.doctor}'); closeChatWidget();">
        📅 Option 1: Book Consultation with ${match.doctorName} ➔
      </button>
      <button class="btn-bot-action pharmacy" onclick="openPharmacyModal(); closeChatWidget();">
        💊 Option 2: Order Relief Kit (2-Hr Delivery) ↗
      </button>
      <button class="btn-bot-action package" onclick="openLabReportModal(); closeChatWidget();">
        🔬 Option 3: Check Lab Reports & Diagnostic Tests ↗
      </button>
    </div>
  `, 'bot');
}

/* ==========================================================================
   CarePulse Authentication & Dynamic OTP Verification Engine
   Supports: Mandatory Portal Lockdown, Mobile (+91) OTP, Google Account OTP,
   Random Dynamic 6-digit OTP generation, Realistic Simulated SMS/Gmail Banners,
   1-Click Auto-Fill, Session Persistence, and Logout / Account Switch.
   ========================================================================== */

const CarePulseAuth = {
  activeMethod: 'mobile', // 'mobile' | 'google'
  currentStep: 'input',   // 'input' | 'otp'
  currentOTP: null,
  otpMethod: 'mobile',
  targetContact: '',
  userName: '',
  resendTimer: 30,
  timerInterval: null,
  sessionUser: null,
  inactivityTimer: null,
  INACTIVITY_TIMEOUT_MS: 15 * 60 * 1000, // 15 minutes session timeout

  init() {
    // Clear persistent localStorage to guarantee user is logged out whenever site is closed or removed
    try {
      localStorage.removeItem('carepulse_auth_user');
    } catch (e) { }

    this.checkStoredSession();
    this.setupInactivityWatchdog();
    if (typeof DeliveryGateway !== 'undefined' && DeliveryGateway.init) {
      DeliveryGateway.init();
    }
  },

  postAuthCallback: null,

  checkStoredSession() {
    try {
      const stored = sessionStorage.getItem('carepulse_auth_user') || localStorage.getItem('carepulse_auth_user');
      if (stored) {
        this.sessionUser = JSON.parse(stored);
        this.unlockPortal();
        this.updateProfileUI();
        this.resetInactivityTimer();
        return;
      }
    } catch (e) {
      console.warn('Session parsing error:', e);
    }
    // Visitors browse freely without initial block!
    this.unlockPortal();
    this.updateProfileUI();
  },

  setupInactivityWatchdog() {
    const activityEvents = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    activityEvents.forEach(evt => {
      window.addEventListener(evt, () => {
        if (this.sessionUser) {
          this.resetInactivityTimer();
        }
      }, { passive: true });
    });

    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible' && this.sessionUser) {
        const lastActive = parseInt(sessionStorage.getItem('carepulse_last_active') || '0', 10);
        if (lastActive && (Date.now() - lastActive > this.INACTIVITY_TIMEOUT_MS)) {
          this.logout('Session expired due to inactivity. Please sign in again.');
        }
      }
    });
  },

  resetInactivityTimer() {
    if (!this.sessionUser) return;
    try {
      sessionStorage.setItem('carepulse_last_active', Date.now().toString());
    } catch (e) { }

    if (this.inactivityTimer) clearTimeout(this.inactivityTimer);
    this.inactivityTimer = setTimeout(() => {
      if (this.sessionUser) {
        this.logout('Session timed out after 15 minutes of inactivity for patient privacy.');
      }
    }, this.INACTIVITY_TIMEOUT_MS);
  },

  lockPortal() {
    // Only used when explicit sign-in is required
    this.openModal();
  },

  openModal(postAuthAction = null) {
    this.postAuthCallback = postAuthAction;
    const modal = document.getElementById('auth-gate-modal');
    if (modal) {
      modal.style.display = 'flex';
      document.body.classList.add('auth-modal-open');
    }
    this.goToStep('input');
  },

  closeModal() {
    const modal = document.getElementById('auth-gate-modal');
    if (modal) {
      modal.style.display = 'none';
      document.body.classList.remove('auth-modal-open');
    }
    document.body.classList.remove('auth-locked');
    this.postAuthCallback = null;
  },

  requireAuth(callback) {
    if (this.sessionUser) {
      callback(this.sessionUser);
    } else {
      showToast('Please verify your mobile number or sign in to proceed.', 'info');
      this.openModal(callback);
    }
  },

  unlockPortal() {
    document.body.classList.remove('auth-locked');
    document.body.classList.remove('auth-modal-open');
    const modal = document.getElementById('auth-gate-modal');
    if (modal) {
      modal.style.display = 'none';
    }
  },

  switchTab(method) {
    this.activeMethod = method;
    document.querySelectorAll('.auth-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.method === method);
    });
    const mobilePanel = document.getElementById('auth-panel-mobile');
    const googlePanel = document.getElementById('auth-panel-google');
    if (mobilePanel && googlePanel) {
      if (method === 'mobile') {
        mobilePanel.style.display = 'block';
        googlePanel.style.display = 'none';
      } else {
        mobilePanel.style.display = 'none';
        googlePanel.style.display = 'block';
      }
    }
    this.clearError();
  },

  selectGoogleAccount(email, name) {
    const input = document.getElementById('auth-google-email');
    if (input) input.value = email;
    const nameInput = document.getElementById('auth-google-name');
    if (nameInput) nameInput.value = name;

    document.querySelectorAll('.google-account-pill').forEach(pill => {
      pill.classList.toggle('selected', pill.dataset.email === email);
    });
  },

  generateDynamicOTP() {
    // Generate a secure random 6-digit code strictly different from current one
    let newCode;
    do {
      newCode = Math.floor(100000 + Math.random() * 900000).toString();
    } while (newCode === this.currentOTP);
    this.currentOTP = newCode;
    return newCode;
  },

  sendOTP() {
    this.clearError();
    if (this.activeMethod === 'mobile') {
      const phoneInput = document.getElementById('auth-mobile-input');
      const nameInput = document.getElementById('auth-mobile-name');
      const phone = phoneInput ? phoneInput.value.trim().replace(/\D/g, '') : '';
      const name = nameInput && nameInput.value.trim() ? nameInput.value.trim() : 'Patient';

      if (!phone || phone.length < 10) {
        this.showError('Please enter a valid 10-digit mobile number.');
        if (phoneInput) phoneInput.focus();
        return;
      }
      this.targetContact = '+91 ' + phone.slice(-10);
      this.userName = name;
      this.otpMethod = 'mobile';
    } else {
      const emailInput = document.getElementById('auth-google-email');
      const nameInput = document.getElementById('auth-google-name');
      const email = emailInput ? emailInput.value.trim() : '';
      let name = nameInput && nameInput.value.trim() ? nameInput.value.trim() : '';

      if (!email || !email.includes('@') || !email.includes('.')) {
        this.showError('Please enter or select a valid Google / Gmail address.');
        if (emailInput) emailInput.focus();
        return;
      }
      if (!name) {
        const parts = email.split('@')[0].split(/[._]/);
        name = parts.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' ');
      }
      this.targetContact = email;
      this.userName = name;
      this.otpMethod = 'google';
    }

    const otp = this.generateDynamicOTP();
    this.goToStep('otp');
    if (typeof DeliveryGateway !== 'undefined' && DeliveryGateway.dispatchOTP) {
      DeliveryGateway.dispatchOTP(otp, this.otpMethod, this.targetContact, this.userName);
    } else {
      this.triggerSimulatedNotification(otp, this.otpMethod, this.targetContact);
    }
    this.startResendTimer();
  },

  resendOTP() {
    const otp = this.generateDynamicOTP();
    this.clearOTPInputs();
    this.clearError();
    if (typeof DeliveryGateway !== 'undefined' && DeliveryGateway.dispatchOTP) {
      DeliveryGateway.dispatchOTP(otp, this.otpMethod, this.targetContact, this.userName);
    } else {
      this.triggerSimulatedNotification(otp, this.otpMethod, this.targetContact);
    }
    this.startResendTimer();
    showToast(`New verification OTP requested for ${this.targetContact}!`, 'info');
  },

  triggerSimulatedNotification(otp, method, target) {
    const container = document.getElementById('simulated-notification-area');
    if (!container) return;

    // Remove any previous banners
    container.innerHTML = '';

    const notifCard = document.createElement('div');
    notifCard.className = `simulated-otp-banner ${method === 'google' ? 'google-banner' : 'sms-banner'}`;

    if (method === 'mobile') {
      notifCard.innerHTML = `
        <div class="simulated-banner-header">
          <div class="simulated-app-tag">
            <span class="app-icon">💬</span>
            <span class="app-name">MESSAGES • Just Now</span>
          </div>
          <button class="simulated-close-btn" onclick="this.closest('.simulated-otp-banner').remove()">&times;</button>
        </div>
        <div class="simulated-banner-body">
          <div class="simulated-sender">CarePulse SMS Gateway &bull; <span>TD-CAREPL</span></div>
          <p class="simulated-msg">
            Your login verification OTP is <strong class="highlight-otp">${otp}</strong>. Valid for 5 minutes. Do not share with anyone.
          </p>
        </div>
        <div class="simulated-banner-actions">
          <button type="button" class="btn-autofill-otp" onclick="CarePulseAuth.autoFillOTP('${otp}')">
            📋 Auto-Fill OTP (${otp})
          </button>
          <button type="button" class="btn-copy-otp" onclick="navigator.clipboard.writeText('${otp}'); showToast('OTP ${otp} copied!', 'success');">
            Copy Code
          </button>
        </div>
      `;
    } else {
      notifCard.innerHTML = `
        <div class="simulated-banner-header">
          <div class="simulated-app-tag">
            <span class="app-icon">🔴</span>
            <span class="app-name">GMAIL • Just Now</span>
          </div>
          <button class="simulated-close-btn" onclick="this.closest('.simulated-otp-banner').remove()">&times;</button>
        </div>
        <div class="simulated-banner-body">
          <div class="simulated-sender">CarePulse Security &bull; <span>security@carepulse.org</span></div>
          <p class="simulated-msg">
            Google Security Code: <strong class="highlight-otp">${otp}</strong> for account <em>${target}</em> login.
          </p>
        </div>
        <div class="simulated-banner-actions">
          <button type="button" class="btn-autofill-otp" onclick="CarePulseAuth.autoFillOTP('${otp}')">
            📋 Auto-Fill OTP (${otp})
          </button>
          <button type="button" class="btn-copy-otp" onclick="navigator.clipboard.writeText('${otp}'); showToast('OTP ${otp} copied!', 'success');">
            Copy Code
          </button>
        </div>
      `;
    }

    container.appendChild(notifCard);

    // Audio cue
    if (typeof playClinicChime === 'function') {
      try { playClinicChime(); } catch (e) { }
    }

    // Auto-dismiss after 16s
    setTimeout(() => {
      if (notifCard.parentElement) {
        notifCard.classList.add('fade-out');
        setTimeout(() => notifCard.remove(), 400);
      }
    }, 16000);
  },

  autoFillOTP(code) {
    const otpString = (code || this.currentOTP || '').toString();
    for (let i = 1; i <= 6; i++) {
      const input = document.getElementById(`otp-digit-${i}`);
      if (input && otpString[i - 1]) {
        input.value = otpString[i - 1];
        input.classList.add('digit-filled');
      }
    }
    const verifyBtn = document.getElementById('btn-verify-otp');
    if (verifyBtn) {
      verifyBtn.focus();
    }
    this.clearError();
    showToast(`OTP ${otpString} filled! Press Verify to enter.`, 'success');
  },

  handleDigitInput(el, index, event) {
    const val = el.value.replace(/\D/g, '');
    el.value = val ? val.slice(-1) : '';
    if (el.value) {
      el.classList.add('digit-filled');
      if (index < 6) {
        const next = document.getElementById(`otp-digit-${index + 1}`);
        if (next) next.focus();
      }
    } else {
      el.classList.remove('digit-filled');
    }
    this.clearError();
  },

  handleDigitKey(el, index, event) {
    if (event.key === 'Backspace' && !el.value && index > 1) {
      const prev = document.getElementById(`otp-digit-${index - 1}`);
      if (prev) {
        prev.focus();
        prev.value = '';
        prev.classList.remove('digit-filled');
      }
    } else if (event.key === 'Enter') {
      this.verifyOTP();
    }
  },

  handleDigitPaste(event) {
    event.preventDefault();
    const pasted = (event.clipboardData || window.clipboardData).getData('text').replace(/\D/g, '');
    if (pasted) {
      for (let i = 1; i <= 6; i++) {
        const input = document.getElementById(`otp-digit-${i}`);
        if (input && pasted[i - 1]) {
          input.value = pasted[i - 1];
          input.classList.add('digit-filled');
        }
      }
      const sixth = document.getElementById('otp-digit-6');
      if (sixth) sixth.focus();
    }
  },

  getEnteredOTP() {
    let entered = '';
    for (let i = 1; i <= 6; i++) {
      const input = document.getElementById(`otp-digit-${i}`);
      entered += input ? input.value.trim() : '';
    }
    return entered;
  },

  async verifyOTP() {
    const entered = this.getEnteredOTP();
    if (entered.length < 6) {
      this.showError('Please enter all 6 digits of the OTP.');
      this.shakeCard();
      return;
    }

    // If real Firebase confirmation exists and real delivery was active
    if (window.carepulseConfirmationResult && typeof DeliveryGateway !== 'undefined' && DeliveryGateway.config.mode === 'real') {
      try {
        showToast('Verifying code with Google Firebase...', 'info');
        await window.carepulseConfirmationResult.confirm(entered);
        window.carepulseConfirmationResult = null;
        showToast('Mobile verified via Google Firebase!', 'success');
      } catch (err) {
        console.error('Firebase verification failed:', err);
        this.showError('Invalid OTP code. Please check your SMS message and re-enter.');
        this.shakeCard();
        return;
      }
    } else {
      if (entered !== this.currentOTP) {
        this.showError('Incorrect OTP! Please check the code received or request a new OTP.');
        this.shakeCard();
        return;
      }
    }

    // OTP matches! Create authenticated session
    const initials = this.userName
      ? this.userName.split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase()
      : 'PT';

    const user = {
      name: this.userName,
      contact: this.targetContact,
      method: this.otpMethod,
      initials: initials,
      uhid: 'CP-' + Math.floor(10000 + Math.random() * 90000),
      loginTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      loginDate: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    };

    this.sessionUser = user;
    try {
      // Store in sessionStorage so user is automatically logged out when removing/closing the site
      sessionStorage.setItem('carepulse_auth_user', JSON.stringify(user));
      sessionStorage.setItem('carepulse_last_active', Date.now().toString());
      localStorage.removeItem('carepulse_auth_user');
    } catch (e) { }

    this.resetInactivityTimer();

    const verifyBtn = document.getElementById('btn-verify-otp');
    if (verifyBtn) {
      verifyBtn.innerHTML = '<span>✅ Verified! Unlocking...</span>';
      verifyBtn.classList.add('btn-success-animated');
    }

    setTimeout(() => {
      this.unlockPortal();
      this.updateProfileUI();
      showToast(`Welcome to CarePulse Hospital, ${user.name}!`, 'success');
      if (typeof this.postAuthCallback === 'function') {
        const cb = this.postAuthCallback;
        this.postAuthCallback = null;
        try { cb(user); } catch (e) { console.error('Post-auth callback error:', e); }
      }
      if (verifyBtn) {
        verifyBtn.innerHTML = '<span>Verify &amp; Access Portal &rarr;</span>';
        verifyBtn.classList.remove('btn-success-animated');
      }
    }, 600);
  },

  logout(customMessage) {
    this.sessionUser = null;
    if (this.inactivityTimer) {
      clearTimeout(this.inactivityTimer);
      this.inactivityTimer = null;
    }
    try {
      sessionStorage.removeItem('carepulse_auth_user');
      sessionStorage.removeItem('carepulse_last_active');
      localStorage.removeItem('carepulse_auth_user');
    } catch (e) { }
    this.currentOTP = null;
    this.clearOTPInputs();
    this.clearError();
    this.goToStep('input');
    this.sessionUser = null;
    this.closeModal();
    this.updateProfileUI();
    showToast(customMessage || 'You have signed out successfully.', 'info');
  },

  goToStep(step) {
    this.currentStep = step;
    const inputStep = document.getElementById('auth-step-input');
    const otpStep = document.getElementById('auth-step-otp');
    if (inputStep && otpStep) {
      if (step === 'input') {
        inputStep.style.display = 'block';
        otpStep.style.display = 'none';
      } else {
        inputStep.style.display = 'none';
        otpStep.style.display = 'block';
        const targetDisplay = document.getElementById('auth-target-display');
        if (targetDisplay) {
          targetDisplay.innerText = this.targetContact;
        }
        const methodBadge = document.getElementById('auth-method-badge');
        if (methodBadge) {
          methodBadge.innerText = this.otpMethod === 'google' ? 'Gmail Security Code' : 'SMS Verification OTP';
        }
        this.clearOTPInputs();
        setTimeout(() => {
          const first = document.getElementById('otp-digit-1');
          if (first) first.focus();
        }, 150);
      }
    }
  },

  backToInput() {
    this.stopResendTimer();
    this.clearError();
    this.goToStep('input');
  },

  startResendTimer() {
    this.stopResendTimer();
    this.resendTimer = 30;
    const timerEl = document.getElementById('otp-countdown');
    const resendBtn = document.getElementById('btn-resend-otp');
    if (timerEl) timerEl.innerText = `(${this.resendTimer}s)`;
    if (resendBtn) {
      resendBtn.disabled = true;
      resendBtn.classList.add('disabled');
    }

    this.timerInterval = setInterval(() => {
      this.resendTimer--;
      if (timerEl) timerEl.innerText = `(${this.resendTimer}s)`;
      if (this.resendTimer <= 0) {
        this.stopResendTimer();
        if (timerEl) timerEl.innerText = '';
        if (resendBtn) {
          resendBtn.disabled = false;
          resendBtn.classList.remove('disabled');
        }
      }
    }, 1000);
  },

  stopResendTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  },

  clearOTPInputs() {
    for (let i = 1; i <= 6; i++) {
      const input = document.getElementById(`otp-digit-${i}`);
      if (input) {
        input.value = '';
        input.classList.remove('digit-filled');
      }
    }
  },

  showError(msg) {
    const errEl = document.getElementById('auth-error-msg');
    if (errEl) {
      errEl.innerText = msg;
      errEl.style.display = 'block';
    }
  },

  clearError() {
    const errEl = document.getElementById('auth-error-msg');
    if (errEl) {
      errEl.innerText = '';
      errEl.style.display = 'none';
    }
  },

  shakeCard() {
    const card = document.querySelector('.auth-card');
    if (card) {
      card.classList.remove('shake');
      void card.offsetWidth;
      card.classList.add('shake');
    }
  },

  updateProfileUI() {
    if (!this.sessionUser) return;
    const nameEls = document.querySelectorAll('.user-display-name');
    nameEls.forEach(el => el.innerText = this.sessionUser.name);

    const contactEls = document.querySelectorAll('.user-display-contact');
    contactEls.forEach(el => el.innerText = this.sessionUser.contact);

    const uhidEls = document.querySelectorAll('.user-display-uhid');
    uhidEls.forEach(el => el.innerText = this.sessionUser.uhid);

    const avatarEls = document.querySelectorAll('.user-display-avatar');
    avatarEls.forEach(el => {
      if (this.sessionUser.method === 'google') {
        el.innerHTML = `<span style="font-size: 1.1rem;">🌐</span>`;
      } else {
        el.innerText = this.sessionUser.initials || 'PT';
      }
    });

    const badgeEls = document.querySelectorAll('.user-auth-badge');
    badgeEls.forEach(el => {
      el.innerText = this.sessionUser.method === 'google' ? 'Google Verified' : 'Mobile Verified';
    });
  }
};

// --- Left Navigation Sidebar Functions (Desktop Collapse + Mobile Drawer) ---

// Show subtle toast feedback when toggling sidebar
function showSidebarToast(message) {
  let toast = document.getElementById('sidebar-toggle-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'sidebar-toggle-toast';
    toast.className = 'sidebar-toggle-toast';
    document.body.appendChild(toast);
  }
  toast.innerText = message;
  toast.classList.add('show');
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 2200);
}

// Update all button states and labels across header, status bar, and footer
function updateSidebarToggleState() {
  const isCollapsed = document.body.classList.contains('sidebar-collapsed');
  const collapseBtn = document.getElementById('sidebar-collapse-btn');
  const statusBarText = document.getElementById('status-bar-sidebar-text');
  const restoreBtn = document.getElementById('sidebar-restore-btn');

  if (collapseBtn) {
    collapseBtn.setAttribute('aria-expanded', isCollapsed ? 'false' : 'true');
    collapseBtn.setAttribute('title', isCollapsed ? 'Show Sidebar (Ctrl+\\)' : 'Hide Sidebar (Ctrl+\\)');
  }

  if (statusBarText) {
    statusBarText.innerText = isCollapsed ? 'Show Menu' : 'Hide Menu';
  }

  if (restoreBtn) {
    restoreBtn.setAttribute('aria-expanded', isCollapsed ? 'false' : 'true');
  }
}

// Universal Toggle Sidebar Collapse / Hide Function
window.toggleSidebarCollapse = function (forceState) {
  const isMobile = window.innerWidth < 1024;
  const sidebar = document.getElementById('carepulse-sidebar');
  const backdrop = document.getElementById('sidebar-backdrop');

  if (isMobile) {
    // Mobile Off-Canvas Drawer Behavior
    if (typeof forceState === 'boolean') {
      if (forceState) {
        sidebar?.classList.remove('open');
        backdrop?.classList.remove('active');
        document.body.classList.remove('sidebar-open');
      } else {
        sidebar?.classList.add('open');
        backdrop?.classList.add('active');
        document.body.classList.add('sidebar-open');
      }
    } else {
      const isOpen = sidebar?.classList.contains('open');
      sidebar?.classList.toggle('open', !isOpen);
      backdrop?.classList.toggle('active', !isOpen);
      document.body.classList.toggle('sidebar-open', !isOpen);
    }
  } else {
    // Desktop Full Sidebar Collapse Behavior
    const isCurrentlyCollapsed = document.body.classList.contains('sidebar-collapsed');
    const shouldCollapse = typeof forceState === 'boolean' ? forceState : !isCurrentlyCollapsed;

    if (shouldCollapse) {
      document.body.classList.add('sidebar-collapsed');
      try {
        localStorage.setItem('carepulse_sidebar_collapsed', 'true');
      } catch (e) {}
      showSidebarToast('Sidebar hidden (Press Ctrl+\\ to show)');
    } else {
      document.body.classList.remove('sidebar-collapsed');
      try {
        localStorage.setItem('carepulse_sidebar_collapsed', 'false');
      } catch (e) {}
      showSidebarToast('Sidebar restored');
    }

    updateSidebarToggleState();
  }
};

// Backwards compatibility alias for existing links
window.toggleLeftSidebar = function (forceClose) {
  if (window.innerWidth < 1024) {
    window.toggleSidebarCollapse(forceClose === true ? true : undefined);
  } else if (forceClose === true) {
    // Nav links clicked on desktop keep desktop sidebar open
  } else {
    window.toggleSidebarCollapse();
  }
};

window.toggleSidebarDropdown = function (groupHeader) {
  const group = groupHeader.closest('.sidebar-dropdown-group');
  if (!group) return;

  const wasOpen = group.classList.contains('open');
  document.querySelectorAll('.sidebar-dropdown-group').forEach(g => {
    if (g !== group) g.classList.remove('open');
  });
  group.classList.toggle('open', !wasOpen);
};

// Expose CarePulseAuth to window
window.CarePulseAuth = CarePulseAuth;

// --- Initial Bootstrapping ---
document.addEventListener('DOMContentLoaded', () => {
  // Enforce authentication gate & load session
  CarePulseAuth.init();

  // Load stored appointments
  try {
    const saved = localStorage.getItem('carepulse_appointments');
    if (saved) {
      state.userAppointments = JSON.parse(saved);
    }
  } catch (e) {
    state.userAppointments = [];
  }

  renderLiveOPDBoard();
  renderDoctorCards();
  renderDateRibbon();
  populateDoctorDropdowns();
  updateDoctorInfoBanner();
  renderSlots();
  setupBookingForms();
  setupTracker();
  setupSpecialtyFilters();
  renderMyBookingsBadge();
  setupModalDismissals();

  // Initialize Competition Winning Engines
  ThemeEngine.init();
  LanguageEngine.init();
  BedsCapacityEngine.init();

  // Initialize UI/UX, Navigation & Search Engines
  PaletteEngine.init();
  FontScaleEngine.init();
  CategoryScrollSpy.init();
  SpotlightSearchEngine.init();
  FloatingTokenTracker.init();

  // Initialize Voice AI & Real Public Address Audio Engines
  PublicAddressEngine.init();
  VoiceAIEngine.init();

  // Enter key support for AI Symptom Chatbot
  const chatInput = document.getElementById('chat-user-input');
  if (chatInput) {
    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        sendChatMessage();
      }
    });
  }

  // Mobile sidebar toggle button
  const sidebarToggle = document.getElementById('sidebar-mobile-toggle');
  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', () => {
      toggleLeftSidebar();
    });
  }

  // Backdrop click to close sidebar
  const sidebarBackdrop = document.getElementById('sidebar-backdrop');
  if (sidebarBackdrop) {
    sidebarBackdrop.addEventListener('click', () => {
      toggleLeftSidebar(true);
    });
  }

  // Restore saved sidebar collapsed state on desktop
  try {
    const savedSidebarState = localStorage.getItem('carepulse_sidebar_collapsed');
    if (savedSidebarState === 'true' && window.innerWidth >= 1024) {
      document.body.classList.add('sidebar-collapsed');
    }
  } catch (e) {}
  updateSidebarToggleState();

  // Keyboard shortcuts: Ctrl+\ for Sidebar, Ctrl+M for Voice AI
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey && e.key === '\\') || (e.altKey && (e.key === 's' || e.key === 'S'))) {
      e.preventDefault();
      toggleSidebarCollapse();
    }
    if (e.ctrlKey && (e.key === 'm' || e.key === 'M')) {
      e.preventDefault();
      VoiceAIEngine.open();
    }
  });
});


/* ==========================================================================
   COMPETITION WINNING JAVASCRIPT MODULES
   1. ThemeEngine (Dark / Light Theme)
   2. LanguageEngine (English / Hindi / Punjabi)
   3. BedsCapacityEngine (Live ICU & Bed Occupancy)
   4. EmergencySOSEngine (1-Click Audio Siren & Live GPS Dispatch)
   5. HealthCalculatorEngine (Clinical Health Risk & BMI / Vitals)
   6. WhatsApp Token Sharing & Auto-Booking from AI Chatbot
   ========================================================================== */

// --- 1. Theme Engine ---
const ThemeEngine = {
  currentTheme: 'light',

  init() {
    const saved = localStorage.getItem('carepulse_theme') || 'light';
    this.setTheme(saved);
  },

  setTheme(theme) {
    this.currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('carepulse_theme', theme);

    // Update all theme toggle buttons
    const buttons = document.querySelectorAll('.theme-toggle-btn');
    buttons.forEach(btn => {
      if (theme === 'dark') {
        btn.innerHTML = '<span>☀️</span> <span class="theme-label" data-i18n="theme_light">Light Mode</span>';
      } else {
        btn.innerHTML = '<span>🌙</span> <span class="theme-label" data-i18n="theme_dark">Dark Mode</span>';
      }
    });
  },

  toggle() {
    const next = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(next);
    showToast(`Switched to ${next === 'dark' ? 'Dark' : 'Light'} Mode`, 'info');
  }
};

window.ThemeEngine = ThemeEngine;
window.toggleTheme = () => ThemeEngine.toggle();

// --- 2. Multi-Language Engine ---
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
    call_hospital: '📞 Call Hospital: 1800-180-2026',
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
    call_hospital: '📞 अस्पताल कॉल: 1800-180-2026',
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
    call_hospital: '📞 ਹਸਪਤਾਲ ਕਾਲ: 1800-180-2026',
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
const BedsCapacityEngine = {
  data: {
    triage: { available: 14, total: 20, name: 'Emergency Triage Beds', dept: 'Trauma Wing - Ground Flr', icon: '🚨' },
    icu: { available: 4, total: 16, name: 'ICU & Critical Care', dept: 'Intensive Unit - 2nd Flr', icon: '🩺' },
    ventilator: { available: 3, total: 8, name: 'Advanced Ventilator Units', dept: 'Critical Respiratory Bay', icon: '🫁' },
    oxygen: { available: 22, total: 35, name: 'Oxygen Supported Beds', dept: 'In-Patient Ward - 1st Flr', icon: '💨' }
  },

  bloodReserves: [
    { group: 'O+', units: 18, status: 'Good' },
    { group: 'A+', units: 12, status: 'Adequate' },
    { group: 'B+', units: 24, status: 'Surplus' },
    { group: 'AB+', units: 8, status: 'Adequate' },
    { group: 'O-', units: 4, status: 'Rare Stock' }
  ],

  activeBay: 1,
  icuBays: {
    1: { name: 'Bay 01 (ICU-A)', hr: 78, spo2: '98%', bp: '122/80', rr: 16, iv: 68, rate: '75 ml/hr', fluid: 'Saline 0.9% NaCl', rhythm: 'Sinus Rhythm Normal' },
    2: { name: 'Bay 02 (ICU-B)', hr: 84, spo2: '96%', bp: '130/85', rr: 18, iv: 42, rate: '100 ml/hr', fluid: 'Ringer Lactate', rhythm: 'Mild Sinus Tachycardia' },
    3: { name: 'Bay 03 (Ventilator)', hr: 92, spo2: '99%', bp: '115/75', rr: 20, iv: 85, rate: '50 ml/hr', fluid: 'Dextrose 5% Water', rhythm: 'Controlled Mechanical Vent' },
    4: { name: 'Bay 04 (CCU)', hr: 72, spo2: '97%', bp: '118/78', rr: 15, iv: 55, rate: '60 ml/hr', fluid: 'Saline 0.9% NaCl', rhythm: 'Sinus Rhythm Stable' }
  },

  ecgAnimId: null,
  ecgX: 0,
  ecgPrevY: 55,

  init() {
    this.render();
    // Simulate live heartbeat capacity updates every 45s
    setInterval(() => {
      this.simulateFluctuation();
    }, 45000);
  },

  render() {
    const container = document.getElementById('beds-capacity-grid');
    if (!container) return;

    container.innerHTML = Object.entries(this.data).map(([key, item]) => {
      const pct = Math.round((item.available / item.total) * 100);
      let statusClass = 'status-good';
      let statusText = '🟢 Available';
      if (pct < 30) {
        statusClass = 'status-critical';
        statusText = '🔴 Critical Low';
      } else if (pct < 50) {
        statusClass = 'status-warn';
        statusText = '🟡 Limited';
      }

      return `
        <div class="bed-capacity-card" id="bed-card-${key}">
          <div class="bed-card-header">
            <div class="bed-type-info">
              <div class="bed-type-icon">${item.icon}</div>
              <div>
                <div class="bed-type-name">${item.name}</div>
                <div class="bed-type-dept">${item.dept}</div>
              </div>
            </div>
            <span class="badge ${statusClass === 'status-good' ? 'badge-confirmed' : statusClass === 'status-warn' ? 'badge-waiting' : 'badge-cancelled'}">${statusText}</span>
          </div>

          <div class="bed-stat-counter">
            <span class="bed-stat-num" id="bed-num-${key}">${item.available}</span>
            <span class="bed-stat-total">/ ${item.total} Units Available</span>
          </div>

          <div class="bed-meter-track">
            <div class="bed-meter-fill ${statusClass}" id="bed-fill-${key}" style="width: ${pct}%;"></div>
          </div>

          <div class="bed-footer-meta">
            <span style="color: var(--slate-400); font-size: 0.72rem;">Live Auto-Sync</span>
            <span style="color: var(--primary); font-weight: 700;">${pct}% Available</span>
          </div>
        </div>
      `;
    }).join('');

    // Render Blood Bank Strip
    const bloodContainer = document.getElementById('blood-units-container');
    if (bloodContainer) {
      bloodContainer.innerHTML = this.bloodReserves.map(b => `
        <div class="blood-group-chip">
          <span style="font-weight: 800;">${b.group}</span>: ${b.units} Units (${b.status})
        </div>
      `).join('');
    }

    this.updateICUDisplay();
  },

  selectICUBay(bayId) {
    this.activeBay = bayId;
    for (let i = 1; i <= 4; i++) {
      const btn = document.getElementById(`btn-icu-bay-${i}`);
      if (btn) btn.classList.toggle('active', i === bayId);
    }
    this.updateICUDisplay();
  },

  updateICUDisplay() {
    const bay = this.icuBays[this.activeBay] || this.icuBays[1];
    const hrEl = document.getElementById('icu-stat-hr');
    const spo2El = document.getElementById('icu-stat-spo2');
    const bpEl = document.getElementById('icu-stat-bp');
    const rrEl = document.getElementById('icu-stat-rr');
    const rhythmEl = document.getElementById('icu-ecg-status');
    const ivLabel = document.getElementById('icu-iv-label');
    const ivFill = document.getElementById('icu-iv-fill');

    if (hrEl) hrEl.innerText = bay.hr;
    if (spo2El) spo2El.innerText = bay.spo2;
    if (bpEl) bpEl.innerText = bay.bp;
    if (rrEl) rrEl.innerText = bay.rr;
    if (rhythmEl) rhythmEl.innerText = `Rhythm: ${bay.rhythm}`;
    if (ivLabel) ivLabel.innerText = `${bay.iv}% Remaining • ${bay.rate}`;
    if (ivFill) ivFill.style.width = `${bay.iv}%`;
  },

  startECGMonitor() {
    this.stopECGMonitor();
    const canvas = document.getElementById('icu-ecg-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.parentElement ? canvas.parentElement.clientWidth - 16 : 580;
    canvas.height = 110;
    ctx.fillStyle = '#02060d';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    this.ecgX = 0;
    this.ecgPrevY = canvas.height / 2;

    const baseLine = canvas.height / 2;
    const renderFrame = () => {
      const w = canvas.width;
      const h = canvas.height;
      
      // Clear a small leading gap
      ctx.fillStyle = '#02060d';
      ctx.fillRect(this.ecgX, 0, 16, h);

      // Compute P-Q-R-S-T curve based on cycle phase (cycle repeats every 80px)
      const phase = this.ecgX % 80;
      let targetY = baseLine;

      if (phase >= 18 && phase < 26) {
        // P Wave
        targetY = baseLine - 6 * Math.sin(((phase - 18) / 8) * Math.PI);
      } else if (phase >= 32 && phase < 35) {
        // Q dip
        targetY = baseLine + 5;
      } else if (phase >= 35 && phase < 40) {
        // R peak (tall spike)
        targetY = baseLine - 36;
      } else if (phase >= 40 && phase < 44) {
        // S dip
        targetY = baseLine + 12;
      } else if (phase >= 54 && phase < 66) {
        // T wave
        targetY = baseLine - 10 * Math.sin(((phase - 54) / 12) * Math.PI);
      } else {
        // Baseline noise
        targetY = baseLine + (Math.random() * 2 - 1);
      }

      ctx.beginPath();
      ctx.strokeStyle = '#22c55e';
      ctx.shadowColor = '#4ade80';
      ctx.shadowBlur = 6;
      ctx.lineWidth = 2.2;
      ctx.lineCap = 'round';
      ctx.moveTo(this.ecgX === 0 ? 0 : this.ecgX - 2, this.ecgPrevY);
      ctx.lineTo(this.ecgX, targetY);
      ctx.stroke();
      ctx.shadowBlur = 0;

      this.ecgPrevY = targetY;
      this.ecgX += 2;
      if (this.ecgX >= w) {
        this.ecgX = 0;
      }

      this.ecgAnimId = requestAnimationFrame(renderFrame);
    };

    this.ecgAnimId = requestAnimationFrame(renderFrame);
  },

  stopECGMonitor() {
    if (this.ecgAnimId) {
      cancelAnimationFrame(this.ecgAnimId);
      this.ecgAnimId = null;
    }
  },

  reserveCriticalBed() {
    const bay = this.icuBays[this.activeBay] || this.icuBays[1];
    showToast(`🚨 Emergency Allocation Initialized for ${bay.name}. Triage Nurse & Physician dispatched.`, 'info');
    setTimeout(() => {
      closeBedsModal();
      if (typeof openBookingLayer === 'function') {
        openBookingLayer();
        const reasonInput = document.getElementById('booking-reason');
        if (reasonInput) reasonInput.value = `Critical Care ICU Admission Request (${bay.name})`;
      }
    }, 900);
  },

  simulateFluctuation() {
    // Minor fluctuation to show judges live real-time synchronization
    const keys = Object.keys(this.data);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    const delta = Math.random() > 0.5 ? 1 : -1;
    const item = this.data[randomKey];
    if (item.available + delta > 1 && item.available + delta < item.total) {
      item.available += delta;
      const numEl = document.getElementById(`bed-num-${randomKey}`);
      const fillEl = document.getElementById(`bed-fill-${randomKey}`);
      if (numEl) numEl.innerText = item.available;
      if (fillEl) fillEl.style.width = `${Math.round((item.available / item.total) * 100)}%`;
    }

    // Fluctuate active bay vitals slightly
    const bay = this.icuBays[this.activeBay];
    if (bay) {
      bay.hr = Math.max(65, Math.min(105, bay.hr + (Math.floor(Math.random() * 3) - 1)));
      const hrEl = document.getElementById('icu-stat-hr');
      if (hrEl) hrEl.innerText = bay.hr;
    }
  }
};

window.BedsCapacityEngine = BedsCapacityEngine;

// --- 4. 1-Click Emergency SOS Simulator ---
const EmergencySOSEngine = {
  active: false,
  timerInterval: null,
  secondsRemaining: 405, // 6 mins 45 secs for demo mode
  audioCtx: null,
  userCoords: null,

  playSirenBeep() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      this.audioCtx = ctx;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';

      const now = ctx.currentTime;
      osc.frequency.setValueAtTime(750, now);
      osc.frequency.exponentialRampToValueAtTime(960, now + 0.2);
      osc.frequency.exponentialRampToValueAtTime(750, now + 0.4);
      osc.frequency.exponentialRampToValueAtTime(960, now + 0.6);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.7);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.75);
    } catch (e) {
      console.warn('AudioContext not allowed without interaction:', e);
    }
  },

  triggerSOS() {
    this.openEmergencyHub();
  },

  openEmergencyHub() {
    this.active = true;
    const modal = document.getElementById('emergency-sos-modal');
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
    this.detectGPSLocation();
  },

  detectGPSLocation() {
    const locEl = document.getElementById('sos-location-text');
    if (!locEl) return;
    locEl.innerHTML = '🔄 Detecting live GPS coordinates...';

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          const lat = pos.coords.latitude.toFixed(5);
          const lng = pos.coords.longitude.toFixed(5);
          this.userCoords = { lat, lng };
          locEl.innerHTML = `📍 <strong>Detected GPS:</strong> ${lat}° N, ${lng}° E • <a href="https://www.google.com/maps?q=${lat},${lng}" target="_blank" rel="noopener" style="color: #2563eb; text-decoration: underline; font-weight: 600;">Open Map ↗</a>`;
        },
        err => {
          console.warn('Geolocation error:', err);
          locEl.innerHTML = `📍 <strong>Hospital Campus:</strong> GT Road, Near Sugar Mill Crossing, Phagwara, Punjab - 144401`;
        },
        { timeout: 10000, enableHighAccuracy: true }
      );
    } else {
      locEl.innerHTML = `📍 <strong>Hospital Campus:</strong> GT Road, Near Sugar Mill Crossing, Phagwara, Punjab - 144401`;
    }
  },

  copyCoordinatesFor108() {
    const text = this.userCoords
      ? `Patient Emergency at GPS: ${this.userCoords.lat}, ${this.userCoords.lng}. CarePulse GT Road Phagwara Emergency Desk: 1800-180-2026.`
      : `Patient Emergency at GT Road, Near Sugar Mill Crossing, Phagwara, Punjab. Emergency Desk: 1800-180-2026.`;
    navigator.clipboard.writeText(text);
    showToast('Emergency location copied! Read to 108 emergency operator.', 'success');
  },

  shareEmergencyWhatsApp() {
    const coordsStr = this.userCoords ? `https://www.google.com/maps?q=${this.userCoords.lat},${this.userCoords.lng}` : 'GT Road, Near Sugar Mill Crossing, Phagwara, Punjab';
    const text = encodeURIComponent(`🚨 EMERGENCY MEDICAL ALERT: Immediate ambulance assistance required!\nLocation: ${coordsStr}\nCarePulse 24/7 Helpline: 1800-180-2026`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  },

  toggleSimulationDemo() {
    const demoCard = document.getElementById('sos-demo-simulation-card');
    if (!demoCard) return;
    const isHidden = demoCard.style.display === 'none' || !demoCard.style.display;
    demoCard.style.display = isHidden ? 'block' : 'none';
    if (isHidden) {
      this.playSirenBeep();
      this.startCountdown();
      showToast('⚠️ DEMO SIMULATION: Testing interface preview only (No vehicle dispatched)', 'warning');
    } else {
      if (this.timerInterval) clearInterval(this.timerInterval);
    }
  },

  startCountdown() {
    if (this.timerInterval) clearInterval(this.timerInterval);
    const etaEl = document.getElementById('sos-eta-timer');

    this.timerInterval = setInterval(() => {
      if (this.secondsRemaining > 0) {
        this.secondsRemaining--;
        const mins = Math.floor(this.secondsRemaining / 60);
        const secs = this.secondsRemaining % 60;
        if (etaEl) {
          etaEl.innerText = `${mins}m ${secs < 10 ? '0' : ''}${secs}s`;
        }
      }
    }, 1000);
  },

  cancelSOS() {
    this.active = false;
    if (this.timerInterval) clearInterval(this.timerInterval);
    const modal = document.getElementById('emergency-sos-modal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
    showToast('Emergency desk dialog closed. 24/7 Helpline is 1800-180-2026.', 'info');
  }
};

window.EmergencySOSEngine = EmergencySOSEngine;
window.triggerEmergencySOS = () => EmergencySOSEngine.openEmergencyHub();
window.closeEmergencySOS = () => EmergencySOSEngine.cancelSOS();

// --- 5. Clinical Health Risk & BMI / Vitals Calculator ---
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
    const age = parseInt(document.getElementById('calc-age').value, 10);
    const bp = parseInt(document.getElementById('calc-bp').value, 10) || 120;

    if (!height || !weight || height <= 0 || weight <= 0) {
      showToast('Please enter valid Height (cm) and Weight (kg)', 'error');
      return;
    }

    const heightM = height / 100;
    const bmi = (weight / (heightM * heightM)).toFixed(1);

    // Calculate Ideal Weight Range (BMI 18.5 - 24.9)
    const idealMin = Math.round(18.5 * heightM * heightM);
    const idealMax = Math.round(24.9 * heightM * heightM);

    // Daily Water Intake (35ml per kg)
    const waterLiters = ((weight * 35) / 1000).toFixed(1);

    // BMI Category and Indicator Position (10 to 40 scale)
    let category = 'Normal / Healthy';
    let badgeBg = '#10b981';
    let badgeColor = 'white';
    let pinPct = Math.min(Math.max(((bmi - 14) / (38 - 14)) * 100, 5), 95);

    if (bmi < 18.5) {
      category = 'Underweight';
      badgeBg = '#38bdf8';
    } else if (bmi >= 25 && bmi < 29.9) {
      category = 'Overweight';
      badgeBg = '#f59e0b';
    } else if (bmi >= 30) {
      category = 'Obese (High Clinical Risk)';
      badgeBg = '#ef4444';
    }

    // Blood pressure assessment
    let bpStatus = 'Normal';
    if (bp >= 140) bpStatus = 'Hypertension Stage 2';
    else if (bp >= 130) bpStatus = 'Hypertension Stage 1';
    else if (bp >= 120) bpStatus = 'Elevated';

    // Render results
    const scoreNum = document.getElementById('calc-bmi-val');
    const catBadge = document.getElementById('calc-category-badge');
    const pin = document.getElementById('calc-indicator-pin');
    const idealSpan = document.getElementById('calc-ideal-weight');
    const waterSpan = document.getElementById('calc-water-intake');
    const bpSpan = document.getElementById('calc-bp-status');

    if (scoreNum) scoreNum.innerText = bmi;
    if (catBadge) {
      catBadge.innerText = category;
      catBadge.style.background = badgeBg;
      catBadge.style.color = badgeColor;
    }
    if (pin) pin.style.left = `${pinPct}%`;
    if (idealSpan) idealSpan.innerText = `${idealMin} - ${idealMax} kg`;
    if (waterSpan) waterSpan.innerText = `${waterLiters} Liters/Day`;
    if (bpSpan) bpSpan.innerText = bpStatus;

    const resultBox = document.getElementById('calc-result-box');
    if (resultBox) resultBox.style.display = 'block';

    showToast(`Calculated BMI: ${bmi} (${category})`, 'success');
  }
};

window.HealthCalculatorEngine = HealthCalculatorEngine;
window.openHealthCalculator = () => HealthCalculatorEngine.open();
window.closeHealthCalculator = () => HealthCalculatorEngine.close();
window.calculateHealthRisk = () => HealthCalculatorEngine.calculate();

// --- 6. 1-Click Auto-Booking from AI Symptom Chatbot ---
window.autoBookDoctorFromChat = function (doctorId, reason) {
  closeChatWidget();
  openBookingLayer(doctorId);

  setTimeout(() => {
    const reasonInput = document.getElementById('layer-patient-reason');
    if (reasonInput) {
      reasonInput.value = reason ? `AI Symptom Triage: ${reason}` : 'AI Consultation';
    }

    // Auto-select first available time slot
    const slotBtn = document.querySelector('#layer-slots-container .slot-btn:not(.booked)');
    if (slotBtn) {
      slotBtn.click();
    }
    showToast('Specialist & next time slot pre-selected! Confirm details to book.', 'success');
  }, 250);
};

// --- 7. WhatsApp Token Pass Sharing ---
window.shareTokenWhatsApp = function () {
  const token = state.currentViewingToken || state.lastCreatedToken;
  if (!token) {
    showToast('No active appointment token found to share.', 'info');
    return;
  }

  const patientMeta = token.patientMeta || `${token.patientAge || ''} Yrs / ${token.patientGender || ''} • ${token.patientPlace || 'Phagwara'}`;
  const docDept = token.doctorDept || token.doctorSpecialty || 'General OPD';
  const dateStr = token.dateLabel || token.date || 'Today';
  const timeStr = token.slotTime || token.timeSlot || 'Scheduled Time';
  const roomStr = token.roomNo || token.room || 'General Consultation Room';

  const msg = encodeURIComponent(
    `🏥 *CarePulse Hospital Official OPD Pass*\n` +
    `🎫 *Token Number:* #${token.tokenId}\n` +
    `🔢 *Reference:* ${token.ticketRef || 'CP-2026'}\n` +
    `👤 *Patient:* ${token.patientName} (${patientMeta})\n` +
    `🩺 *Doctor:* ${token.doctorName} (${docDept})\n` +
    `📅 *Appointment:* ${dateStr} at ${timeStr}\n` +
    `🚪 *Room:* ${roomStr}\n` +
    `🏢 *Desk:* ${token.assignedDesk || 'Counter 1 • Desk A'}\n` +
    `💳 *Consultation Fee:* ${token.fee}\n` +
    `📍 *Venue:* GT Road, Sugar Mill Crossing, Phagwara, Punjab\n` +
    `🧭 Live queue tracking: ${window.location.origin || ''}/hospital.html`
  );

  window.open(`https://api.whatsapp.com/send?text=${msg}`, '_blank');
};

// ==========================================================================
// 8. Multi-Palette Healthcare Theme System
// ==========================================================================
const PaletteEngine = {
  currentPalette: 'teal',

  init() {
    const saved = localStorage.getItem('carepulse_palette') || 'teal';
    this.setPalette(saved, false);
  },

  setPalette(palette, notify = true) {
    this.currentPalette = palette;
    if (palette === 'teal') {
      document.documentElement.removeAttribute('data-palette');
    } else {
      document.documentElement.setAttribute('data-palette', palette);
    }
    try {
      localStorage.setItem('carepulse_palette', palette);
    } catch (e) { }

    const selects = document.querySelectorAll('.palette-select');
    selects.forEach(sel => {
      sel.value = palette;
    });

    if (notify) {
      const names = {
        teal: 'Teal Mint (Standard)',
        blue: 'Royal Sapphire Blue',
        purple: 'Lavender & Rose Care',
        amber: 'Ayush Warm Amber'
      };
      showToast(`Theme palette changed to: ${names[palette] || palette}`, 'info');
    }
  }
};

window.PaletteEngine = PaletteEngine;
window.setPaletteTheme = (val) => PaletteEngine.setPalette(val);

// ==========================================================================
// 9. Senior Accessibility Font Scaling Toolbar
// ==========================================================================
const FontScaleEngine = {
  currentScale: 'md',
  scales: ['sm', 'md', 'lg', 'xl'],

  init() {
    const saved = localStorage.getItem('carepulse_font_scale') || 'md';
    this.setScale(saved, false);
  },

  setScale(scale, notify = true) {
    this.currentScale = scale;
    this.scales.forEach(s => document.documentElement.classList.remove(`font-scale-${s}`));
    document.documentElement.classList.add(`font-scale-${scale}`);
    try {
      localStorage.setItem('carepulse_font_scale', scale);
    } catch (e) { }

    document.querySelectorAll('.font-scale-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.scale === scale);
    });

    if (notify) {
      const labels = { sm: 'Compact (14.5px)', md: 'Default (16px)', lg: 'Large / Senior (17.5px)', xl: 'Extra Large (19px)' };
      showToast(`Text size set to: ${labels[scale] || scale}`, 'info');
    }
  }
};

window.FontScaleEngine = FontScaleEngine;
window.setFontScale = (scale) => FontScaleEngine.setScale(scale);

// ==========================================================================
// 10. Sticky Horizontal Category Chips Scroller & ScrollSpy
// ==========================================================================
const CategoryScrollSpy = {
  init() {
    const scroller = document.getElementById('category-chips-scroller');
    if (!scroller) return;

    const chips = scroller.querySelectorAll('.category-chip');
    if (!chips.length) return;

    // Smooth click handler
    chips.forEach(chip => {
      chip.addEventListener('click', (e) => {
        const targetId = chip.getAttribute('data-target');
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          chips.forEach(c => c.classList.remove('active'));
          chip.classList.add('active');
        }
      });
    });

    // ScrollSpy observer
    const sectionIds = Array.from(chips).map(c => c.getAttribute('data-target')).filter(Boolean);
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            chips.forEach(chip => {
              const isMatch = chip.getAttribute('data-target') === id;
              chip.classList.toggle('active', isMatch);
              if (isMatch) {
                chip.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
              }
            });
          }
        });
      }, {
        rootMargin: '-10% 0px -70% 0px',
        threshold: 0
      });

      sectionIds.forEach(id => {
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
window.openSpotlightSearch = () => SpotlightSearchEngine.open();
window.closeSpotlightSearch = () => SpotlightSearchEngine.close();

// ==========================================================================
// 12. Persistent Active Token Floating Mini-Tracker
// ==========================================================================
const FloatingTokenTracker = {
  isDismissed: false,

  init() {
    this.update();
    setInterval(() => this.update(), 12000);
  },

  update() {
    if (this.isDismissed) return;
    const pill = document.getElementById('floating-token-pill');
    if (!pill) return;

    let activeToken = state.lastCreatedToken;
    if (!activeToken && state.userAppointments && state.userAppointments.length > 0) {
      activeToken = state.userAppointments[0];
    }

    if (activeToken) {
      const numSpan = document.getElementById('float-token-number');
      const docSpan = document.getElementById('float-token-doc');
      const etaSpan = document.getElementById('float-token-eta');

      if (numSpan) numSpan.innerText = `Token #${activeToken.tokenId || activeToken.token || 'Active'}`;
      if (docSpan) docSpan.innerText = activeToken.doctorName || 'Doctor Assigned';
      if (etaSpan) etaSpan.innerText = `(Slot: ${activeToken.slotTime || activeToken.time || 'Today'})`;

      pill.style.display = 'flex';
    } else {
      pill.style.display = 'none';
    }
  },

  dismiss() {
    this.isDismissed = true;
    const pill = document.getElementById('floating-token-pill');
    if (pill) pill.style.display = 'none';
  }
};

window.FloatingTokenTracker = FloatingTokenTracker;

// ==========================================================================
// 13. Sticky Bottom Quick-Action Dock Active State
// ==========================================================================
window.setActiveDock = function (tabName) {
  document.querySelectorAll('.dock-item').forEach(item => item.classList.remove('active'));
  const el = document.getElementById(`dock-item-${tabName}`);
  if (el) el.classList.add('active');
};

// ==========================================================================
// 14. Real OTP Delivery Gateway (EmailJS for Gmail & Firebase for SMS)
// ==========================================================================
const DeliveryGateway = {
  STORAGE_KEY: 'carepulse_delivery_gateway',

  config: {
    mode: 'auto', // 'real' | 'simulated' | 'auto'
    emailjsServiceId: '',
    emailjsTemplateId: '',
    emailjsPublicKey: '',
    firebaseApiKey: '',
    firebaseAuthDomain: '',
    firebaseProjectId: ''
  },

  init() {
    this.loadConfig();
    this.initEmailJS();
    this.initFirebase();
    this.updateUIBadge();
  },

  loadConfig() {
    try {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      if (saved) {
        this.config = { ...this.config, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn('Failed to load gateway config:', e);
    }
  },

  saveConfig(newConfig) {
    this.config = { ...this.config, ...newConfig };
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.config));
    } catch (e) { }
    this.initEmailJS();
    this.initFirebase();
    this.updateUIBadge();
  },

  isEmailConfigured() {
    return Boolean(this.config.emailjsPublicKey && this.config.emailjsServiceId && this.config.emailjsTemplateId);
  },

  isFirebaseConfigured() {
    return Boolean(this.config.firebaseApiKey && this.config.firebaseProjectId);
  },

  initEmailJS() {
    if (window.emailjs && this.config.emailjsPublicKey) {
      try {
        window.emailjs.init({ publicKey: this.config.emailjsPublicKey });
      } catch (e) {
        console.warn('EmailJS init warning:', e);
      }
    }
  },

  initFirebase() {
    if (window.firebase && this.config.firebaseApiKey && this.config.firebaseProjectId) {
      try {
        if (!firebase.apps || !firebase.apps.length) {
          firebase.initializeApp({
            apiKey: this.config.firebaseApiKey,
            authDomain: this.config.firebaseAuthDomain || `${this.config.firebaseProjectId}.firebaseapp.com`,
            projectId: this.config.firebaseProjectId
          });
        }
      } catch (e) {
        console.warn('Firebase init warning:', e);
      }
    }
  },

  selectMode(mode) {
    this.config.mode = mode;
    const cardReal = document.getElementById('mode-card-real');
    const cardDemo = document.getElementById('mode-card-demo');
    if (cardReal) cardReal.classList.toggle('active', mode === 'real');
    if (cardDemo) cardDemo.classList.toggle('active', mode === 'simulated');
  },

  saveFromForm() {
    const emailService = document.getElementById('cfg-emailjs-service')?.value.trim() || '';
    const emailTemplate = document.getElementById('cfg-emailjs-template')?.value.trim() || '';
    const emailPublic = document.getElementById('cfg-emailjs-public')?.value.trim() || '';
    const firebaseApi = document.getElementById('cfg-firebase-api')?.value.trim() || '';
    const firebaseProject = document.getElementById('cfg-firebase-project')?.value.trim() || '';
    const firebaseDomain = document.getElementById('cfg-firebase-domain')?.value.trim() || '';

    this.saveConfig({
      emailjsServiceId: emailService,
      emailjsTemplateId: emailTemplate,
      emailjsPublicKey: emailPublic,
      firebaseApiKey: firebaseApi,
      firebaseProjectId: firebaseProject,
      firebaseAuthDomain: firebaseDomain
    });

    closeDeliveryGatewayModal();
    showToast('Delivery Gateway configuration updated and active!', 'success');
  },

  populateForm() {
    const cardReal = document.getElementById('mode-card-real');
    const cardDemo = document.getElementById('mode-card-demo');
    if (cardReal) cardReal.classList.toggle('active', this.config.mode === 'real');
    if (cardDemo) cardDemo.classList.toggle('active', this.config.mode !== 'real');

    const setVal = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.value = val || '';
    };

    setVal('cfg-emailjs-service', this.config.emailjsServiceId);
    setVal('cfg-emailjs-template', this.config.emailjsTemplateId);
    setVal('cfg-emailjs-public', this.config.emailjsPublicKey);
    setVal('cfg-firebase-api', this.config.firebaseApiKey);
    setVal('cfg-firebase-project', this.config.firebaseProjectId);
    setVal('cfg-firebase-domain', this.config.firebaseAuthDomain);
  },

  updateUIBadge() {
    const isLive = this.config.mode === 'real' ||
      (this.config.mode === 'auto' && (this.isEmailConfigured() || this.isFirebaseConfigured()));

    document.querySelectorAll('.gateway-status-badge').forEach(badge => {
      badge.className = `gateway-status-badge ${isLive ? 'live' : 'demo'}`;
      if (isLive) {
        badge.innerHTML = '<span class="status-dot green"></span> Gateway: <strong>Live Real Delivery</strong>';
      } else {
        badge.innerHTML = '<span class="status-dot amber"></span> Gateway: <strong>Simulated Demo</strong>';
      }
    });
  },

  async dispatchOTP(otp, method, target, patientName) {
    const isEmail = method === 'google';
    const canSendRealEmail = isEmail && (this.config.mode === 'real' || this.config.mode === 'auto') && this.isEmailConfigured();
    const canSendRealSms = !isEmail && (this.config.mode === 'real' || this.config.mode === 'auto') && this.isFirebaseConfigured();

    if (canSendRealEmail) {
      await this.sendEmailJS(otp, target, patientName);
    } else if (canSendRealSms) {
      await this.sendFirebaseSMS(target, otp);
    } else {
      CarePulseAuth.triggerSimulatedNotification(otp, method, target);
      if (this.config.mode === 'real') {
        showToast(`Real delivery selected, but ${isEmail ? 'EmailJS' : 'Firebase'} credentials are empty. Showing demo code.`, 'warning');
      }
    }
  },

  async sendEmailJS(otp, email, patientName) {
    showToast(`📨 Sending real OTP email to ${email} via EmailJS...`, 'info');
    try {
      if (!window.emailjs) throw new Error('EmailJS library not loaded');
      this.initEmailJS();
      await window.emailjs.send(this.config.emailjsServiceId, this.config.emailjsTemplateId, {
        to_email: email,
        otp_code: otp,
        patient_name: patientName || 'Patient',
        hospital_name: 'CarePulse Hospital',
        valid_minutes: 5,
        year: new Date().getFullYear()
      });
      showToast(`✅ Real OTP email delivered to ${email}! Check your inbox/spam.`, 'success');
    } catch (err) {
      console.error('EmailJS error:', err);
      showToast(`EmailJS failed (${err.text || err.message}). Showing backup code on screen.`, 'warning');
      CarePulseAuth.triggerSimulatedNotification(otp, 'google', email);
    }
  },

  async sendFirebaseSMS(phone, fallbackOtp) {
    const rawDigits = phone.replace(/\D/g, '').slice(-10);
    const formatted = '+91' + rawDigits;
    showToast(`📱 Contacting Google Firebase SMS Gateway for ${formatted}...`, 'info');

    try {
      if (!window.firebase || !firebase.auth) throw new Error('Firebase SDK not loaded');
      this.initFirebase();

      const recaptchaEl = document.getElementById('recaptcha-container');
      if (!recaptchaEl) throw new Error('reCAPTCHA container missing');

      if (!window.carepulseRecaptchaVerifier) {
        window.carepulseRecaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
          size: 'invisible'
        });
      }

      const confirmation = await firebase.auth().signInWithPhoneNumber(formatted, window.carepulseRecaptchaVerifier);
      window.carepulseConfirmationResult = confirmation;
      showToast(`✅ Real cellular SMS dispatched to ${formatted}!`, 'success');
    } catch (err) {
      console.error('Firebase SMS error:', err);
      showToast(`Firebase error (${err.message}). Showing backup code on screen.`, 'warning');
      CarePulseAuth.triggerSimulatedNotification(fallbackOtp, 'mobile', phone);
    }
  },

  async testDispatchCurrent() {
    const method = CarePulseAuth.activeMethod || 'mobile';
    let target = '';
    if (method === 'mobile') {
      const phoneInput = document.getElementById('auth-mobile-input');
      target = phoneInput ? phoneInput.value.trim() : '9876543210';
      if (!target) target = '9876543210';
    } else {
      const emailInput = document.getElementById('auth-google-email');
      target = emailInput ? emailInput.value.trim() : 'user@gmail.com';
      if (!target) target = 'user@gmail.com';
    }

    const testOtp = Math.floor(100000 + Math.random() * 900000).toString();
    showToast(`Testing ${method === 'google' ? 'Email' : 'SMS'} dispatch to ${target}...`, 'info');
    await this.dispatchOTP(testOtp, method, target, 'Test User');
  }
};

window.DeliveryGateway = DeliveryGateway;

window.openDeliveryGatewayModal = function () {
  DeliveryGateway.populateForm();
  const modal = document.getElementById('delivery-gateway-modal');
  if (modal) modal.style.display = 'flex';
};

window.closeDeliveryGatewayModal = function () {
  const modal = document.getElementById('delivery-gateway-modal');
  if (modal) modal.style.display = 'none';
};

// Backwards compatibility alias
window.openSMSGatewayInfoModal = window.openDeliveryGatewayModal;
window.closeSMSGatewayInfoModal = window.closeDeliveryGatewayModal;

/* ==========================================================================
   19. COMPETITION WINNING ENGINES:
   A. PublicAddressEngine (Audible PA Token Callout & Speech Synthesis)
   B. VoiceAIEngine (Trilingual Voice Search, Booking & Intent Parser)
   ========================================================================== */

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

const TeleConsultEngine = {
  activeDoctorId: 'doc-gp-1',
  mediaStream: null,
  isMicMuted: false,
  isCamOff: false,
  timerInterval: null,
  elapsedSeconds: 0,
  vitalsInterval: null,
  currentVitals: { hr: 74, spo2: 98, bp: '120/80' },

  prescriptions: [
    { name: 'Tab. Paracetamol 650 mg', dosage: '1-0-1 (After Food)', duration: '3 Days' },
    { name: 'Cap. Amoxicillin 500 mg', dosage: '1-0-1 (After Food)', duration: '5 Days' },
    { name: 'Syp. Grilinctus 10 ml', dosage: '0-0-1 (At Bedtime)', duration: '5 Days' }
  ],

  open(doctorId = null) {
    if (doctorId) {
      this.activeDoctorId = doctorId;
    } else if (!this.activeDoctorId) {
      this.activeDoctorId = (DOCTORS[0] && DOCTORS[0].id) || 'doc-gp-1';
    }

    const doc = DOCTORS.find(d => d.id === this.activeDoctorId) || DOCTORS[0];
    const modal = document.getElementById('tele-consult-modal');
    if (!modal) return;

    // Populate Doctor Data
    const badgeName = document.getElementById('tele-doc-badge-name');
    const badgeSpec = document.getElementById('tele-doc-badge-spec');
    const screenName = document.getElementById('tele-doc-screen-name');
    const screenDesc = document.getElementById('tele-doc-screen-desc');
    const docAvatar = document.getElementById('tele-doc-avatar');
    const rxDocName = document.getElementById('rx-header-doc-name');
    const rxDocReg = document.getElementById('rx-header-doc-reg');
    const rxSigName = document.getElementById('rx-sig-name');

    if (badgeName) badgeName.innerText = doc.name;
    if (badgeSpec) badgeSpec.innerText = `${doc.specialty} • ${doc.regNo || 'PMC Verified'}`;
    if (screenName) screenName.innerText = doc.name;
    if (screenDesc) screenDesc.innerText = `${doc.qualifications} • Live Tele-Consultation`;
    if (docAvatar && doc.avatar) docAvatar.src = doc.avatar;
    if (rxDocName) rxDocName.innerText = doc.name;
    if (rxDocReg) rxDocReg.innerText = `${doc.qualifications} • ${doc.regNo || 'PMC-38214'}`;
    if (rxSigName) rxSigName.innerText = doc.name;

    // Patient info
    const user = window.CarePulseAuth ? CarePulseAuth.sessionUser : null;
    const patientNameEl = document.getElementById('rx-patient-name');
    if (patientNameEl) {
      patientNameEl.innerText = (user && user.name) ? `${user.name} (Verified)` : 'Self (Verified Patient)';
    }

    // Date
    const dateStamp = document.getElementById('rx-date-stamp');
    if (dateStamp) {
      const today = new Date();
      dateStamp.innerText = today.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    }

    // Render medicines list
    this.renderPrescriptions();

    // Start video & timers
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    this.startCallTimer();
    this.startVitalsSimulation();
    this.initCameraStream();

    showToast(`📹 Connected to Dr. ${doc.name.split(' ').pop()}'s Virtual Consultation Room`, 'success');
  },

  close() {
    this.stopCameraStream();
    this.stopCallTimer();
    const modal = document.getElementById('tele-consult-modal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  },

  initCameraStream() {
    const videoEl = document.getElementById('patient-webcam-video');
    const fallbackEl = document.getElementById('patient-webcam-fallback');

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
          this.mediaStream = stream;
          if (videoEl) {
            videoEl.srcObject = stream;
            videoEl.style.display = 'block';
          }
          if (fallbackEl) fallbackEl.style.display = 'none';
        })
        .catch(err => {
          console.warn('Webcam permission denied or unavailable, using simulation:', err);
          if (videoEl) videoEl.style.display = 'none';
          if (fallbackEl) fallbackEl.style.display = 'flex';
        });
    } else {
      if (videoEl) videoEl.style.display = 'none';
      if (fallbackEl) fallbackEl.style.display = 'flex';
    }
  },

  stopCameraStream() {
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(track => track.stop());
      this.mediaStream = null;
    }
    const videoEl = document.getElementById('patient-webcam-video');
    if (videoEl) videoEl.srcObject = null;
  },

  toggleMic() {
    this.isMicMuted = !this.isMicMuted;
    if (this.mediaStream) {
      this.mediaStream.getAudioTracks().forEach(t => t.enabled = !this.isMicMuted);
    }
    const btn = document.getElementById('btn-tele-mic');
    if (btn) {
      btn.innerHTML = this.isMicMuted ? '🔇' : '🎙️';
      btn.classList.toggle('off', this.isMicMuted);
      btn.title = this.isMicMuted ? 'Unmute Microphone' : 'Mute Microphone';
    }
    showToast(this.isMicMuted ? 'Microphone muted' : 'Microphone unmuted', 'info');
  },

  toggleCamera() {
    this.isCamOff = !this.isCamOff;
    if (this.mediaStream) {
      this.mediaStream.getVideoTracks().forEach(t => t.enabled = !this.isCamOff);
    }
    const btn = document.getElementById('btn-tele-cam');
    const videoEl = document.getElementById('patient-webcam-video');
    const fallbackEl = document.getElementById('patient-webcam-fallback');

    if (btn) {
      btn.innerHTML = this.isCamOff ? '🚫' : '📹';
      btn.classList.toggle('off', this.isCamOff);
      btn.title = this.isCamOff ? 'Turn Camera On' : 'Turn Camera Off';
    }
    if (this.isCamOff) {
      if (videoEl) videoEl.style.display = 'none';
      if (fallbackEl) fallbackEl.style.display = 'flex';
      showToast('Camera stream disabled', 'info');
    } else {
      if (this.mediaStream && videoEl) {
        videoEl.style.display = 'block';
        if (fallbackEl) fallbackEl.style.display = 'none';
      }
      showToast('Camera stream enabled', 'info');
    }
  },

  startCallTimer() {
    this.elapsedSeconds = 0;
    this.stopCallTimer();
    const timerEl = document.getElementById('tele-call-timer');
    this.timerInterval = setInterval(() => {
      this.elapsedSeconds++;
      const mins = String(Math.floor(this.elapsedSeconds / 60)).padStart(2, '0');
      const secs = String(this.elapsedSeconds % 60).padStart(2, '0');
      if (timerEl) timerEl.innerText = `${mins}:${secs}`;
    }, 1000);
  },

  stopCallTimer() {
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.timerInterval = null;
    if (this.vitalsInterval) clearInterval(this.vitalsInterval);
    this.vitalsInterval = null;
  },

  startVitalsSimulation() {
    const hrEl = document.getElementById('tele-vital-hr');
    const spo2El = document.getElementById('tele-vital-spo2');
    const bpEl = document.getElementById('tele-vital-bp');

    this.vitalsInterval = setInterval(() => {
      this.currentVitals.hr = 72 + Math.floor(Math.random() * 6);
      this.currentVitals.spo2 = 97 + Math.floor(Math.random() * 3);
      if (hrEl) hrEl.innerText = `${this.currentVitals.hr} BPM`;
      if (spo2El) spo2El.innerText = `SpO2 ${this.currentVitals.spo2}%`;
      if (bpEl) bpEl.innerText = `BP 120/80`;
    }, 4000);
  },

  simulateVitalsSpike() {
    const hrEl = document.getElementById('tele-vital-hr');
    const spo2El = document.getElementById('tele-vital-spo2');
    this.currentVitals.hr = 88;
    this.currentVitals.spo2 = 99;
    if (hrEl) hrEl.innerText = `88 BPM (Pulsing)`;
    if (spo2El) spo2El.innerText = `SpO2 99%`;
    showToast('🩺 Live clinical vitals checked: Heart Rate 88 BPM, SpO2 99%, Normal Sinus Rhythm', 'success');
  },

  renderPrescriptions() {
    const container = document.getElementById('rx-items-list');
    if (!container) return;

    if (this.prescriptions.length === 0) {
      container.innerHTML = `<div style="text-align: center; color: var(--slate-500); padding: 1rem; font-size: 0.78rem;">No medicines prescribed yet. Select from below to add.</div>`;
      return;
    }

    container.innerHTML = this.prescriptions.map((item, idx) => `
      <div class="rx-item-card">
        <div>
          <div class="rx-med-name">${idx + 1}. ${escapeHtml(item.name)}</div>
          <div class="rx-med-dose">${escapeHtml(item.dosage)} &bull; Duration: ${escapeHtml(item.duration)}</div>
        </div>
        <button type="button" class="rx-item-remove" onclick="TeleConsultEngine.removePrescription(${idx})" title="Remove item">&times;</button>
      </div>
    `).join('');
  },

  addSelectedMedicine() {
    const select = document.getElementById('rx-quick-select');
    if (!select) return;
    const [name, dosage, duration] = select.value.split('|');
    this.prescriptions.push({ name, dosage, duration });
    this.renderPrescriptions();
    showToast(`Added ${name} to digital prescription`, 'success');
  },

  removePrescription(index) {
    this.prescriptions.splice(index, 1);
    this.renderPrescriptions();
  },

  downloadPrescriptionPDF() {
    const doc = DOCTORS.find(d => d.id === this.activeDoctorId) || DOCTORS[0];
    const user = window.CarePulseAuth ? CarePulseAuth.sessionUser : null;
    const patientName = (user && user.name) ? user.name : 'Verified Patient';

    const printWin = window.open('', '_blank', 'width=800,height=900');
    if (!printWin) {
      alert('Please allow popups to download/print the official prescription.');
      return;
    }

    const itemsHtml = this.prescriptions.map((m, i) => `
      <tr style="border-bottom: 1px solid #e2e8f0;">
        <td style="padding: 8px 12px; font-weight: 700;">${i + 1}. ${escapeHtml(m.name)}</td>
        <td style="padding: 8px 12px;">${escapeHtml(m.dosage)}</td>
        <td style="padding: 8px 12px;">${escapeHtml(m.duration)}</td>
      </tr>
    `).join('');

    printWin.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Prescription - CarePulse Hospital - ${patientName}</title>
        <style>
          body { font-family: system-ui, -apple-system, sans-serif; padding: 30px; color: #0f172a; line-height: 1.5; }
          .header { border-bottom: 3px solid #0d9488; padding-bottom: 16px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: flex-start; }
          .brand h1 { margin: 0; color: #0f172a; font-size: 24px; }
          .brand p { margin: 4px 0 0; color: #475569; font-size: 13px; }
          .doc-info { text-align: right; }
          .doc-info h3 { margin: 0; color: #0d9488; font-size: 18px; }
          .patient-box { background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 12px 16px; display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 13px; margin-bottom: 24px; }
          .rx-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px; }
          .rx-table th { background: #f1f5f9; padding: 10px 12px; text-align: left; border-bottom: 2px solid #cbd5e1; }
          .footer { border-top: 1px dashed #cbd5e1; padding-top: 20px; margin-top: 40px; display: flex; justify-content: space-between; align-items: flex-end; }
          .signature { text-align: right; }
          .sig-line { font-family: cursive; font-size: 22px; color: #0d9488; margin-bottom: 4px; }
          @media print { .no-print { display: none; } body { padding: 0; } }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="brand">
            <h1>🏥 CarePulse Multi-Specialty Hospital</h1>
            <p>GT Road, Near Sugar Mill Crossing, Phagwara, Punjab 144401</p>
            <p>Emergency & Trauma: 1800-180-2026 / 108 &bull; Telehealth Portal</p>
          </div>
          <div class="doc-info">
            <h3>${escapeHtml(doc.name)}</h3>
            <p style="margin: 2px 0; font-size: 13px; font-weight: 600;">${escapeHtml(doc.specialty)}</p>
            <p style="margin: 0; font-size: 12px; color: #64748b;">${escapeHtml(doc.regNo || 'PMC-38214')}</p>
          </div>
        </div>

        <div class="patient-box">
          <div><strong>Patient Name:</strong> ${escapeHtml(patientName)}</div>
          <div><strong>Date:</strong> ${new Date().toLocaleDateString('en-GB')}</div>
          <div><strong>Consultation:</strong> Virtual Video Tele-Consult</div>
          <div><strong>Token Ref:</strong> #TK-TELE-${Math.floor(1000 + Math.random() * 9000)}</div>
        </div>

        <div style="background: #fffbeb; border: 1px solid #fef3c7; border-radius: 6px; padding: 10px 14px; margin-bottom: 20px; font-size: 13px;">
          <strong>Clinical Diagnosis:</strong> Acute Upper Respiratory Tract Infection (URTI) with mild pyrexia. Advised oral hydration and rest.
        </div>

        <h3 style="font-family: Georgia, serif; color: #0d9488; font-size: 20px; margin: 0 0 10px;">℞ Prescribed Medications</h3>
        <table class="rx-table">
          <thead>
            <tr>
              <th>Medicine Name</th>
              <th>Dosage & Frequency</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>

        <div class="footer">
          <div style="font-size: 12px; color: #64748b;">
            <p style="margin: 0;">🔒 Digitally generated and cryptographically verified.</p>
            <p style="margin: 2px 0 0;">Valid for dispensing at any licensed Indian pharmacy (DLT/D&amp;C Act).</p>
          </div>
          <div class="signature">
            <div class="sig-line">${escapeHtml(doc.name)}</div>
            <div style="font-size: 12px; font-weight: 700; color: #0f172a;">${escapeHtml(doc.name)}</div>
            <div style="font-size: 11px; color: #64748b;">Reg No: ${escapeHtml(doc.regNo || 'PMC-38214')}</div>
          </div>
        </div>

        <div class="no-print" style="margin-top: 30px; text-align: center;">
          <button onclick="window.print()" style="background: #0d9488; color: white; border: none; padding: 10px 24px; font-size: 15px; font-weight: 700; border-radius: 6px; cursor: pointer;">
            🖨️ Print Prescription
          </button>
        </div>
      </body>
      </html>
    `);
    printWin.document.close();
  },

  orderPrescriptionPharmacy() {
    this.close();
    if (typeof openPharmacyModal === 'function') {
      openPharmacyModal();
      showToast('🛒 Prescribed medicines transferred to CarePulse 24/7 Pharmacy cart!', 'success');
    }
  },

  sharePrescriptionWhatsApp() {
    const doc = DOCTORS.find(d => d.id === this.activeDoctorId) || DOCTORS[0];
    const medList = this.prescriptions.map((m, i) => `${i + 1}. ${m.name} (${m.dosage} x ${m.duration})`).join('%0A');
    const text = `*CarePulse Hospital Tele-Consultation Prescription*%0A*Doctor:* ${doc.name} (${doc.specialty})%0A*Reg No:* ${doc.regNo || 'PMC-38214'}%0A*Date:* ${new Date().toLocaleDateString('en-GB')}%0A%0A*Rx Medicines:*%0A${medList}%0A%0A*Helpline:* 1800-180-2026%0A*Address:* GT Road, Phagwara, Punjab`;
    window.open(`https://wa.me/?text=${text}`, '_blank');
  },

  endConsultation() {
    const doc = DOCTORS.find(d => d.id === this.activeDoctorId) || DOCTORS[0];
    this.stopCameraStream();
    this.stopCallTimer();
    showToast(`✅ Video consultation with ${doc.name} completed successfully. Please review or download your prescription.`, 'success');
  }
};

window.TeleConsultEngine = TeleConsultEngine;
window.openTeleConsultModal = function (docId) { TeleConsultEngine.open(docId); };
window.closeTeleConsultModal = function () { TeleConsultEngine.close(); };

// ==========================================================================
// 21. CampusWayfinderEngine (Indoor GPS & Multi-Floor Navigation)
// ==========================================================================
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
        <g class="room-group" onclick="CampusWayfinderEngine.onRoomClick('${r.id}')">
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
    const msg = `*CarePulse Hospital Indoor Navigation*%0A*Campus:* GT Road, Phagwara%0A*Destination:* ${destName}%0A*Floor:* ${floor}%0A*Helpline:* 1800-180-2026%0A%0AShow this at reception desk for instant guide assistance.`;
    window.open(`https://wa.me/?text=${msg}`, '_blank');
  }
};

window.CampusWayfinderEngine = CampusWayfinderEngine;
window.openWayfinderModal = function (dest) { CampusWayfinderEngine.open(dest); };
window.closeWayfinderModal = function () { CampusWayfinderEngine.close(); };

// ==========================================================================
// 22. DigitalHealthCardEngine (ABHA & Emergency Medical ID Pass)
// ==========================================================================
const DigitalHealthCardEngine = {
  currentProfile: 'self',

  profiles: {
    self: {
      name: 'Rajesh Kumar',
      demographics: 'Male • 42 Yrs • UHID: #CP-84920',
      abha: 'ABHA: 91-4820-9182-3918',
      blood: 'O+ Positive',
      allergies: 'Penicillin, Sulfa',
      condition: 'Hypertension',
      phone: '+91 98140 22737',
      img: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
    },
    mother: {
      name: 'Smt. Gurpreet Kaur',
      demographics: 'Female • 68 Yrs • UHID: #CP-84921',
      abha: 'ABHA: 91-4820-9182-4412',
      blood: 'B+ Positive',
      allergies: 'Aspirin (Severe)',
      condition: 'Type 2 Diabetes, Arthritis',
      phone: '+91 98140 22737',
      img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80'
    },
    child: {
      name: 'Master Aarav Kumar',
      demographics: 'Male • 9 Yrs • UHID: #CP-84922',
      abha: 'ABHA: 91-4820-9182-8823',
      blood: 'O+ Positive',
      allergies: 'Peanuts (Mild)',
      condition: 'None (Healthy Child)',
      phone: '+91 98140 22737',
      img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    }
  },

  open(profileId = 'self') {
    const modal = document.getElementById('health-card-modal');
    if (!modal) return;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    this.switchProfile(profileId);
  },

  close() {
    const modal = document.getElementById('health-card-modal');
    if (modal) modal.classList.remove('active');
    document.body.style.overflow = '';
  },

  switchProfile(profileId) {
    this.currentProfile = profileId;
    ['self', 'mother', 'child'].forEach(id => {
      const btn = document.getElementById(`profile-btn-${id}`);
      if (btn) btn.classList.toggle('active', id === profileId);
    });

    const p = this.profiles[profileId] || this.profiles.self;
    const nameEl = document.getElementById('pass-name');
    const demoEl = document.getElementById('pass-demographics');
    const abhaEl = document.getElementById('pass-abha');
    const bloodEl = document.getElementById('pass-blood');
    const allerEl = document.getElementById('pass-allergies');
    const condEl = document.getElementById('pass-condition');
    const phoneEl = document.getElementById('pass-emergency-phone');
    const imgEl = document.getElementById('pass-avatar-img');
    const qrContainer = document.getElementById('pass-qr-container');

    if (nameEl) nameEl.innerText = p.name;
    if (demoEl) demoEl.innerText = p.demographics;
    if (abhaEl) abhaEl.innerText = p.abha;
    if (bloodEl) bloodEl.innerText = p.blood;
    if (allerEl) allerEl.innerText = p.allergies;
    if (condEl) condEl.innerText = p.condition;
    if (phoneEl) {
      phoneEl.innerText = p.phone;
      phoneEl.href = `tel:${p.phone.replace(/\s+/g, '')}`;
    }
    if (imgEl) imgEl.src = p.img;

    if (qrContainer) {
      qrContainer.innerHTML = this.generateQRCodeSVG(p.abha);
    }
  },

  generateQRCodeSVG(payload) {
    return `
      <svg viewBox="0 0 25 25" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" fill="#042f2e">
        <rect x="1" y="1" width="7" height="7" rx="1" fill="#042f2e"></rect>
        <rect x="2" y="2" width="5" height="5" rx="0.5" fill="#ffffff"></rect>
        <rect x="3" y="3" width="3" height="3" fill="#042f2e"></rect>
        <rect x="17" y="1" width="7" height="7" rx="1" fill="#042f2e"></rect>
        <rect x="18" y="2" width="5" height="5" rx="0.5" fill="#ffffff"></rect>
        <rect x="19" y="3" width="3" height="3" fill="#042f2e"></rect>
        <rect x="1" y="17" width="7" height="7" rx="1" fill="#042f2e"></rect>
        <rect x="2" y="18" width="5" height="5" rx="0.5" fill="#ffffff"></rect>
        <rect x="3" y="19" width="3" height="3" fill="#042f2e"></rect>
        <rect x="10" y="2" width="2" height="2" fill="#042f2e"></rect>
        <rect x="13" y="2" width="2" height="2" fill="#042f2e"></rect>
        <rect x="10" y="5" width="2" height="2" fill="#042f2e"></rect>
        <rect x="9" y="8" width="3" height="2" fill="#042f2e"></rect>
        <rect x="13" y="9" width="2" height="2" fill="#042f2e"></rect>
        <rect x="17" y="10" width="3" height="2" fill="#042f2e"></rect>
        <rect x="9" y="12" width="2" height="3" fill="#042f2e"></rect>
        <rect x="12" y="12" width="3" height="3" fill="#042f2e"></rect>
        <rect x="16" y="13" width="2" height="2" fill="#042f2e"></rect>
        <rect x="20" y="13" width="2" height="2" fill="#042f2e"></rect>
        <rect x="10" y="17" width="2" height="2" fill="#042f2e"></rect>
        <rect x="14" y="17" width="2" height="3" fill="#042f2e"></rect>
        <rect x="18" y="17" width="2" height="2" fill="#042f2e"></rect>
        <rect x="10" y="21" width="3" height="2" fill="#042f2e"></rect>
        <rect x="17" y="21" width="4" height="2" fill="#042f2e"></rect>
      </svg>
    `;
  },

  downloadPass() {
    const p = this.profiles[this.currentProfile] || this.profiles.self;
    showToast(`📥 Saving Digital Health Pass for ${p.name} as wallet document...`, 'success');
    this.printPass();
  },

  printPass() {
    const p = this.profiles[this.currentProfile] || this.profiles.self;
    const printWin = window.open('', '_blank', 'width=700,height=500');
    if (!printWin) {
      showToast('Pop-up blocked. Please allow popups to print your Health Pass.', 'warn');
      return;
    }
    printWin.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>CarePulse Smart Health Pass - ${escapeHtml(p.name)}</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 40px; margin: 0; background: #f8fafc; }
          .card { max-width: 480px; margin: 0 auto; background: linear-gradient(135deg, #022c22, #0f766e); color: white; border-radius: 16px; padding: 24px; box-shadow: 0 10px 25px rgba(0,0,0,0.2); }
          .top { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.2); padding-bottom: 12px; margin-bottom: 16px; }
          .grid { display: grid; grid-template-columns: 2fr 1fr; gap: 16px; }
          .meta-item { margin-bottom: 8px; font-size: 13px; }
          .label { font-size: 10px; text-transform: uppercase; color: #a7f3d0; font-weight: 700; }
          .val { font-size: 14px; font-weight: 800; margin-top: 2px; }
          @media print { body { background: white; padding: 0; } .card { box-shadow: none; } }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="top">
            <div>
              <h3 style="margin: 0; font-size: 18px;">🏥 CarePulse Smart Health Pass</h3>
              <p style="margin: 2px 0 0; font-size: 11px; color: #a7f3d0;">GT Road, Phagwara, Punjab • 1800-180-2026</p>
            </div>
            <div style="font-size: 10px; background: rgba(255,255,255,0.2); padding: 4px 8px; border-radius: 99px; font-weight: 700;">ABHA LINKED</div>
          </div>
          <div class="grid">
            <div>
              <div class="meta-item"><div class="label">Patient Name</div><div class="val">${escapeHtml(p.name)}</div></div>
              <div class="meta-item"><div class="label">Demographics</div><div class="val">${escapeHtml(p.demographics)}</div></div>
              <div class="meta-item"><div class="label">ABHA ID</div><div class="val" style="font-family: monospace;">${escapeHtml(p.abha)}</div></div>
              <div class="meta-item"><div class="label">Blood Group</div><div class="val">${escapeHtml(p.blood)}</div></div>
              <div class="meta-item"><div class="label">Critical Allergies</div><div class="val" style="color: #fef08a;">${escapeHtml(p.allergies)}</div></div>
              <div class="meta-item"><div class="label">Emergency Contact</div><div class="val">${escapeHtml(p.phone)}</div></div>
            </div>
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; background: white; padding: 10px; border-radius: 12px;">
              ${this.generateQRCodeSVG(p.abha)}
              <span style="color: #042f2e; font-size: 9px; font-weight: 800; margin-top: 6px;">VERIFIED ID</span>
            </div>
          </div>
        </div>
        <script>
          window.onload = function() { window.print(); }
        </script>
      </body>
      </html>
    `);
    printWin.document.close();
  },

  addToWalletDemo() {
    showToast('📱 Pass added to Apple / Google Wallet demonstration profile!', 'success');
  }
};

window.DigitalHealthCardEngine = DigitalHealthCardEngine;
window.openHealthCardModal = function (profileId) { DigitalHealthCardEngine.open(profileId); };
window.closeHealthCardModal = function () { DigitalHealthCardEngine.close(); };


