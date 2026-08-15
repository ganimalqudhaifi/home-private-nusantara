import { Tutor, StudentSession, Student, AdminKPI } from '../types';

export const BRAND_INFO = {
  name: 'Home Private Nusantara',
  tagline: 'Pendamping Belajar Terbaik untuk Prestasi yang Lebih Baik!',
  subTagline: 'Belajar Lebih Mudah, Prestasi Lebih Baik! Fokus Belajar • Hasil Nyata • Prestasi Meningkat',
  logoUrl: '/logo.jpg',
  contact: {
    whatsapp: '0851-8303-0246',
    whatsappRaw: '6285183030246',
    email: 'homeprivatnusantara@gmail.com',
    serviceArea: 'Kota Makassar & Kabupaten Gowa',
    instagram: '@home_privatnusantara',
    instagramUrl: 'https://instagram.com/home_privatnusantara',
    facebook: 'Home Privat Nusantara',
    facebookUrl: 'https://facebook.com',
    tiktok: '@home.privat.nusantara',
    tiktokUrl: 'https://tiktok.com/@home.privat.nusantara',
    sinceYear: 2018,
  },
} as const;

export const TOP_PILLARS = [
  {
    title: 'BELAJAR NYAMAN',
    desc: 'Lingkungan belajar yang kondusif langsung di rumah Anda',
    icon: 'home',
  },
  {
    title: 'PRESTASI GEMILANG',
    desc: 'Bersama meraih prestasi akademik terbaik di sekolah',
    icon: 'trophy',
  },
  {
    title: 'MASA DEPAN TERANG',
    desc: 'Membangun fondasi masa depan bersama bimbingan profesional',
    icon: 'sparkles',
  },
] as const;

export const WHY_CHOOSE_US = [
  {
    number: '01',
    title: 'Guru Berpengalaman & Terpilih',
    description: 'Guru berkualitas yang sudah melalui seleksi berkas ketat dan uji kompetensi mengajar.',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    icon: 'award',
  },
  {
    number: '02',
    title: 'Guru Datang Langsung ke Rumah',
    description: 'Lebih nyaman, aman, hemat waktu tanpa macet, dan pendampingan efektif di rumah siswa.',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    icon: 'home',
  },
  {
    number: '03',
    title: 'Jadwal Fleksibel Sesuai Kebutuhan Anak',
    description: 'Waktu dan hari belajar dapat disesuaikan sepenuhnya dengan rutinitas harian keluarga.',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
    icon: 'calendar',
  },
  {
    number: '04',
    title: 'Materi Lengkap & Terstruktur',
    description: 'Metode efektif, pembelajaran praktis, soal latihan mendalam, dan konsep yang mudah dipahami.',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    icon: 'book-open',
  },
  {
    number: '05',
    title: 'Pendekatan Personal Sesuai Karakter Anak',
    description: 'Fokus pada kebutuhan khusus, kemampuan dasar, dan gaya belajar unik setiap anak (1-on-1).',
    badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
    icon: 'users',
  },
  {
    number: '06',
    title: 'Aman, Nyaman, dan Terpercaya',
    description: 'Komitmen penuh kami sejak 2018 untuk pendidikan dan peningkatan prestasi anak yang lebih baik.',
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
    icon: 'shield-check',
  },
] as const;

export const NAV_LINKS = [
  { label: 'Tentang Kami', href: '/#about' },
  { label: 'Keunggulan', href: '/#keunggulan' },
  { label: 'Biaya & Paket', href: '/#programs' },
  { label: 'Testimoni', href: '/#testimonials' },
  { label: 'Daftar Sekarang', href: '/#daftar' },
] as const;

export const PRICING_PACKAGES = [
  {
    levelId: 'sd',
    levelName: 'SD',
    subTitle: 'Kelas 1 - 6',
    levelBadge: 'SD Kelas 1-6',
    icon: 'book-open',
    description: 'Pendampingan PR, Tematik, Matematika Dasar, IPA, & persiapan ujian sekolah.',
    rates: {
      twoDays: { oneStudent: 400000, twoStudents: 550000 },
      threeDays: { oneStudent: 600000, twoStudents: 700000 },
    },
  },
  {
    levelId: 'smp',
    levelName: 'SMP',
    subTitle: 'Kelas 1 - 3 (Kelas 7 - 9)',
    levelBadge: 'SMP Kelas 7-9',
    icon: 'graduation-cap',
    description: 'Penguatan konsep Matematika Aljabar, Fisika, Biologi, & Bahasa Inggris.',
    rates: {
      twoDays: { oneStudent: 500000, twoStudents: 600000 },
      threeDays: { oneStudent: 600000, twoStudents: 700000 },
    },
  },
  {
    levelId: 'calistung',
    levelName: 'CALISTUNG',
    subTitle: 'TK & Pra-SD',
    levelBadge: 'TK & Pra-SD',
    icon: 'sparkles',
    description: 'Membaca, Menulis, dan Berhitung menyenangkan dengan metode ramah anak.',
    rates: {
      twoDays: { oneStudent: 400000, twoStudents: 500000 },
      threeDays: { oneStudent: 500000, twoStudents: 600000 },
    },
  },
] as const;

export const PACKAGE_BENEFITS = [
  { title: 'Guru Berkualitas & Terseleksi', desc: 'Lolos uji kompetensi & wawancara', icon: 'user-check' },
  { title: 'Pendampingan Belajar', desc: '1-on-1 intensif di rumah', icon: 'book-open' },
  { title: 'Konsultasi PR & Tugas Sekolah', desc: 'Bantuan materi harian', icon: 'clipboard-list' },
  { title: 'Laporan Perkembangan Belajar', desc: 'Evaluasi berkala ke orang tua', icon: 'trending-up' },
  { title: 'Jadwal Fleksibel', desc: 'Waktu belajar disepakati', icon: 'clock' },
] as const;

export const CURRICULUM_PROGRAMS = [
  {
    level: 'TK & Pra-SD',
    badge: 'Calistung',
    badgeColor: 'bg-amber-50 text-amber-900',
    title: 'Membaca, Menulis & Berhitung',
    description: 'Pembelajaran Membaca, Menulis, dan Berhitung yang menyenangkan dengan metode ramah anak usia dini untuk persiapan masuk sekolah dasar.',
    features: [
      'Pengenalan Huruf & Angka Interaktif',
      'Metode Bermain Sambil Belajar',
      'Melatih Fokus & Motorik Halus Anak'
    ],
    icon: 'sparkles',
  },
  {
    level: 'SD (Kelas 1 - 6)',
    badge: 'SD Kelas 1-6',
    badgeColor: 'bg-blue-50 text-blue-900',
    title: 'Fondasi Akademik & Karakter Mandiri',
    description: 'Fokus pada Calistung, Matematika Dasar, IPA Tematik, dan Bahasa Inggris interaktif dengan pendekatan ramah anak.',
    features: ['Pendampingan PR & Tugas Harian', 'Metode Visual & Gamifikasi Belajar', 'Laporan Perkembangan Bulanan ke Orang Tua'],
    icon: 'book-open',
  },
  {
    level: 'SMP (Kelas 7 - 9)',
    badge: 'SMP Kelas 7-9',
    badgeColor: 'bg-indigo-50 text-indigo-900',
    title: 'Penguasaan Konsep Kritis & Sukses Ujian',
    description: 'Pendalaman Matematika Aljabar, Fisika, Biologi, dan Bahasa Inggris untuk persiapan Penilaian Akhir & Seleksi Masuk SMA Favorit.',
    features: ['Latihan Soal HOTS & Konsep Mendalam', 'Strategi Manajemen Waktu Belajar', 'Simulasi Ujian Semester & Try Out'],
    icon: 'graduation-cap',
  },
] as const;

export const CURATION_STEPS = [
  {
    step: '01',
    title: 'Seleksi Berkas & Ijazah',
    description: 'Pemeriksaan latar belakang akademik, validasi identitas (KTP/KTM), dan riwayat indeks prestasi dari universitas terkemuka.',
    icon: 'clipboard-check',
  },
  {
    step: '02',
    title: 'Microteaching & Tes Subjek',
    description: 'Uji simulasi mengajar materi kurikulum SD & SMP untuk mengevaluasi kefasihan pedagogik dan artikulasi konsep.',
    icon: 'presentation',
  },
  {
    step: '03',
    title: 'Wawancara Tatap Muka / Offline',
    description: 'Verifikasi integritas, kesabaran, komitmen etika, dan kesiapan visitasi tatap muka ke rumah siswa secara langsung.',
    icon: 'user-check',
  },
  {
    step: '04',
    title: 'Aktivasi & Pemantauan Sesi',
    description: 'Tutor resmi terverifikasi mendapatkan sertifikasi sistem dan performanya dipantau terus-menerus oleh admin pusat.',
    icon: 'shield-check',
  },
] as const;

export const TESTIMONIALS = [
  {
    name: 'Ibu Ratna Dewi',
    role: 'Orang Tua Siswa Kelas 5 SD',
    location: 'Panakkukang, Kota Makassar',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    comment: 'Sangat terbantu dengan kurasi tutor Home Private Nusantara. Guru sangat sabar mengajari anak saya matematika hingga nilai ujiannya naik dari 65 menjadi 92.',
    rating: 5,
  },
  {
    name: 'Bapak Hendra Gunawan',
    role: 'Orang Tua Siswa Kelas 8 SMP',
    location: 'Somba Opu, Kabupaten Gowa',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    comment: 'Guru datang tepat waktu ke rumah dan penjelasannya sangat mudah dimengerti anak. Sangat praktis untuk orang tua yang sibuk bekerja.',
    rating: 5,
  },
  {
    name: 'Kak Sarah Amanda, S.Pd.',
    role: 'Pengajar Matematika & IPA SD-SMP',
    location: 'Alumni Universitas Negeri Makassar (UNM)',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxKTMHQudEAsfQn5uQSiyMaXK8bR-DcxFXN9ZgZdgyKBCXE0vmznwK3vJDs9JqbTfUGFtZcLHxrDunpNsoNRw_q218xEFsSjXmu0Ra0iWWFP1V7H_QgJff8eOOhCKo6hMZASzw0mWpPNaYlXSyAWUriD3sYYisbodDCyKO-zZaMMWJ-bM8-0YP_ElOenL5iV_WGQK_jjHM1nmixSxR_3FRVExumwEjqMoWfw5GTXkdiVlp1OF3_rSJS7QPe5gpoM63pbCwhwJe2CtW',
    comment: 'Sistem koordinasi jadwal dan keamanan data di Home Private Nusantara sangat profesional. Saya bisa fokus mendampingi murid dengan tenang.',
    rating: 5,
  },
] as const;
