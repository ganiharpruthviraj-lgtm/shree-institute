// ---------------------------------------------------------------------------
// All copy + data for the Shree Institute of Learning landing page.
// Edit here; components read from these exports.
// ---------------------------------------------------------------------------

export const INSTITUTE = {
  name: 'Shree Institute',
  fullName: 'Shree Institute of Learning',
}

export const VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260803_192301_9231ed6b-c55c-4a48-909c-4ebe11cf2e11.mp4'

export const LOGO_PATH =
  'M 128 128 C 128 198.692 70.692 256 0 256 C 0 185.308 57.308 128 128 128 Z M 128 128 C 198.692 128 256 185.308 256 256 C 185.308 256 128 198.692 128 128 Z M 0 0 C 70.692 0 128 57.308 128 128 C 57.308 128 0 70.692 0 0 Z M 256 0 C 256 70.692 198.692 128 128 128 C 128 57.308 185.308 0 256 0 Z'

export const NAV_LINKS = [
  { label: 'Programs', href: '#programs', chevron: true },
  { label: 'Why Us', href: '#why-us', chevron: false },
  { label: 'Toppers', href: '#toppers', chevron: false },
  { label: 'Batches', href: '#batches', chevron: false },
  { label: 'Contact', href: '#contact', chevron: false },
]

// Short CTA for the nav pill + mobile drawer (the full-length wording lives on
// the hero and admission forms).
export const NAV_CTA = 'Book Free Demo'

export const HERO = {
  headline: 'Build a Bulletproof Academic Foundation.',
  subheadline:
    'Specialized Coaching for Classes 8th, 9th & 10th. Master Core Concepts, Excel in Board Exams, and Prepare for Future Success.',
  inputPlaceholder: "Enter Parent's Phone Number",
  cta: 'Book Free Demo Class',
  stat: {
    value: '98.4%',
    label: 'Highest Board Score (Class 10)',
  },
  quote: {
    text: 'The regular mock tests and 1-on-1 doubt sessions helped me top my school in Class 10!',
    author: 'Aarav Patil',
    subtext: '96.8% in Class 10 Boards',
  },
}

export const STATS = [
  { value: '15+', label: 'Years of Excellence' },
  { value: '1,200+', label: 'Students Mentored' },
  { value: '95%+', label: 'Average Board Result' },
  { value: '1:15', label: 'Teacher-to-Student Ratio' },
]

export const PROGRAMS = [
  {
    badge: 'Class 8th',
    title: 'Foundation & Skill Building',
    subjects: 'Mathematics, Science, English',
    points: [
      'Strengthen fundamental concepts in Math & Science',
      'Interactive problem-solving & analytical thinking',
      'Weekly conceptual quizzes and homework support',
    ],
    cta: 'View Class 8 Schedule',
  },
  {
    badge: 'Class 9th',
    title: 'Conceptual Mastery',
    subjects: 'Physics, Chemistry, Biology, Math',
    points: [
      'In-depth coverage of Class 9 syllabus',
      'Early exposure to Olympiad & NTSE level problems',
      'Chapter-wise regular assessment tests',
    ],
    cta: 'View Class 9 Schedule',
  },
  {
    badge: 'Class 10th',
    title: 'Board Exam Excellence',
    subjects: 'Physics, Chemistry, Biology, Math, SS',
    points: [
      'Complete Board syllabus coverage by December',
      'Solving 10 years of past board question papers',
      'Full-length Pre-Board mock exams with feedback',
    ],
    cta: 'View Class 10 Schedule',
  },
]

export const FEATURES = [
  {
    icon: 'batch',
    title: 'Small Batch Sizes',
    desc: 'Limited to 15–20 students per batch to ensure personalized attention for every single student.',
  },
  {
    icon: 'doubt',
    title: 'Daily 1-on-1 Doubt Sessions',
    desc: 'Dedicated daily hours post-lecture where students clear school homework and practice worksheets.',
  },
  {
    icon: 'tracking',
    title: 'Parent Progress Tracking',
    desc: 'Weekly updates sent on WhatsApp alongside monthly parent-teacher progress review meetings.',
  },
  {
    icon: 'olympiad',
    title: 'Board + Olympiad Focus',
    desc: 'Comprehensive preparation for CBSE/State Board exams along with guidance for competitive school exams.',
  },
]

export const TESTIMONIALS = [
  {
    quote:
      "The faculty pays attention to every child. My daughter's confidence in Mathematics improved drastically after joining Class 9.",
    author: 'Mrs. Sunita Sharma',
    subtext: 'Parent of Class 9 Student',
  },
  {
    quote:
      'The revision test series in Class 10 made the final board exams feel completely stress-free.',
    author: 'Rohan Deshmukh',
    subtext: 'Class 10 - 95.2% Board Result',
  },
]

export const TOPPERS = [
  {
    name: 'Aarav Patil',
    score: '98.4%',
    badge: 'Class 10 Board Topper',
    highlights: 'Math: 100/100 | Science: 98/100',
    quote: 'The 1-on-1 doubt sessions and weekly mock tests helped me achieve 100% in Math!',
    year: '2025-26 Batch',
  },
  {
    name: 'Ananya Deshmukh',
    score: '96.8%',
    badge: 'State Distinction',
    highlights: 'Science: 99/100 | Math: 97/100',
    quote: 'Concept clarity in Physics and Chemistry made board questions super easy to solve.',
    year: '2025-26 Batch',
  },
  {
    name: 'Rohan Kulkarni',
    score: '95.6%',
    badge: 'NTSE & Olympiad Scholar',
    highlights: 'Class 9 School Rank 1',
    quote: 'Early foundation in Class 8 & 9 built my analytical thinking for competitive exams.',
    year: '2025-26 Batch',
  },
]

export const ADMISSIONS = {
  title: 'Admissions Open for New Batches',
  subtitle: 'Reserve a seat for your child or request a free 3-day demo class.',
  fields: {
    name: 'Student Full Name',
    classLabel: 'Select Class',
    phone: 'Parent Mobile Number',
  },
  classes: ['Class 8', 'Class 9', 'Class 10'],
  submit: 'Request Free Demo & Callback',
}

export const CONTACT = {
  phone: '+91 96117 92157',
  address: 'Ring Road, Hirapura, Kalaburagi, Karnataka 585102',
  mapsUrl: 'https://maps.app.goo.gl/c5dspNbE2wgy2z9H9',
}
