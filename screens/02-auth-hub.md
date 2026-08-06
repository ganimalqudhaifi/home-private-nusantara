# Screen 02: Unified Authentication Portal (Auth Hub)

## Metadata & Konteks
- **Routes yang Digabung**:
  - `/auth/login` (Login Terpadu Multi-Peran: Siswa, Pengajar, Admin)
  - `/auth/register-student` (Pendaftaran Siswa Baru dengan Segmentasi SD & SMP)
  - `/auth/register-tutor` (Pendaftaran Calon Pengajar Baru)
- **User Role**: Tamu / Calon Siswa / Calon Pengajar / Pengguna Terdaftar
- **Tujuan**: Menyediakan satu portal autentikasi terpusat dengan tab selector yang intuitif, menangani login fleksibel untuk seluruh peran, serta formulir registrasi bertingkat yang dinamis sesuai segmentasi jenjang (SD 1–6 vs SMP 7–9).

---

## Design System Tokens (Derived from Logo.jpg)
- **Platform**: Web Responsive (Desktop Centered Card / Mobile Fullscreen)
- **Background**: `#F8FAFC` (Slate Canvas) with subtle educational geometric watermark
- **Card Surface**: `#FFFFFF` (Pure White) with 1px border `#E2E8F0` and elevation shadow-lg
- **Primary Brand (HOME)**: `#0B2545` (Nusantara Deep Navy)
- **High-Impact CTA (PRIVATE)**: `#DC2626` (Nusantara Crimson Red)
- **Growth & Verified (NUSANTARA)**: `#16A34A` (Nusantara Emerald Green)
- **Text Headings**: `#0F172A` (Charcoal Slate), font: `Outfit`
- **Text Labels & Inputs**: `#334155` (Slate-700), font: `Geist`
- **Validation Alerts**: `#DC2626` (Rose/Crimson text & border for inline errors)

---

## State & Transisi Komponen

### Tab Navigation (3 Mode Utama)
1. **Tab 1: "Masuk Akun" (`State: Login`)**
2. **Tab 2: "Daftar Siswa" (`State: Register Student`)**
3. **Tab 3: "Daftar Pengajar" (`State: Register Tutor`)**

---

## Struktur Layar & Form Detail per State

### 1. Header Card (Universal)
- Logo resmi Home Private Nusantara dengan teks "Portal Akses Layanan Les Privat SD & SMP".
- Segmented Tab Bar dengan 3 tombol aktif/inaktif:
  - `[Masuk Akun]` | `[Daftar Siswa (SD/SMP)]` | `[Gabung Pengajar]`

---

### 2. Form State A: Masuk Akun (`Login`)
- **Input Email**: Email terdaftar.
- **Input Password**: Password akun dengan tombol toggle show/hide (Icon: Eye / EyeOff).
- **Pilihan Peran Cepat (Optional Helper Chip)**: `Siswa`, `Pengajar`, `Admin`.
- **Link**: "Lupa Password?" (Tautan bantuan WhatsApp/Email Admin).
- **Tombol Aksi**: "Masuk ke Portal" (Primary Nusantara Navy `#0B2545`).
- **Footer Hint**: "Belum punya akun? Pilih tab Daftar Siswa atau Daftar Pengajar di atas."

---

### 3. Form State B: Pendaftaran Siswa (`Register Student`)
- **Input Nama Lengkap Siswa**: Text input (e.g., "Fajar Pratama").
- **Input Nama Orang Tua / Wali (Wajib)**: Text input (e.g., "Ibu Rina Kartika").
- **Segmentasi Jenjang Pendidikan (Radio Card Selector)**:
  - *Pilihan 1*: `Jenjang SD` (Sekolah Dasar Kelas 1-6)
  - *Pilihan 2*: `Jenjang SMP` (Sekolah Menengah Pertama Kelas 7-9)
- **Pilihan Sub-Kelas Dinamis (Pill Selector)**:
  - *Jika SD dipilih*: Tampil pilihan `Kelas 1`, `Kelas 2`, `Kelas 3`, `Kelas 4`, `Kelas 5`, `Kelas 6`.
  - *Jika SMP dipilih*: Tampil pilihan `Kelas 7`, `Kelas 8`, `Kelas 9`.
- **Input Alamat Domisili Lengkap**: Textarea alamat lengkap tempat belajar di rumah (max 500 karakter dengan penghitung sisa karakter real-time).
- **Input Nomor WhatsApp Aktif**: Input dengan prefix tetap `+62` atau `08` (validasi format nomor Indonesia).
- **Input Email & Password**: Email valid & password min. 8 karakter dengan bar indikator kekuatan password.
- **Tombol Aksi**: "Daftar Akun Siswa & Mulai Cari Pengajar" (Nusantara Crimson Red `#DC2626`).

---

### 4. Form State C: Pendaftaran Pengajar (`Register Tutor`)
- **Input Nama Lengkap & Gelar**: Text input (e.g., "Sarah Amanda, S.Pd.").
- **Input Pendidikan Terakhir & Universitas**: Text input (e.g., "S1 Pendidikan Matematika - Universitas Indonesia").
- **Input Ringkasan Pengalaman Mengajar SD/SMP**: Textarea singkat pengalaman mengajar materi SD dan/atau SMP.
- **Input Tautan Portofolio / CV / Sertifikat (Opsional)**: URL link Google Drive/LinkedIn.
- **Input Alamat Domisili Lengkap**: Textarea alamat tempat tinggal.
- **Input Nomor WhatsApp & Email**: Kontak aktif untuk verifikasi wawancara offline.
- **Input Password**: Password min. 8 karakter.
- **Notice Box Info Kurasi (Emerald/Amber Tint)**:
  - "ℹ️ Pendaftaran pengajar akan melalui tahap seleksi dokumen & wawancara offline oleh tim operasional sebelum akun dapat aktif mengajar."
- **Tombol Aksi**: "Kirim Pendaftaran Pengajar" (Primary Nusantara Navy `#0B2545`).

---

## Stitch Master Prompt (Copy-Ready)

```text
Create a modern, clean, unified authentication portal for "Home Private Nusantara" with a 3-way segmented tab switcher: "Masuk Akun", "Daftar Siswa", and "Daftar Pengajar".

DESIGN SYSTEM (REQUIRED - FROM BRAND LOGO):
- Platform: Responsive Web (centered card max-width 560px on desktop, full-width with safe padding on mobile).
- Theme: Trustworthy, professional, academic feel.
- Background: Slate Canvas (#F8FAFC).
- Surface: Pure White (#FFFFFF) card with 1px border (#E2E8F0) and smooth elevation shadow.
- Primary Brand: Nusantara Deep Navy (#0B2545) for active tabs and login buttons.
- High-Conversion Accent: Nusantara Crimson Red (#DC2626) for student registration actions.
- Growth Accent: Nusantara Emerald Green (#16A34A) for success badges and verification info.
- Text Headings: Charcoal Slate (#0F172A). Text Labels: Slate-700 (#334155).
- Typography: Outfit (Headings) and Geist (Form labels, inputs).

PAGE STRUCTURE:
1. HEADER: Centered logo with emblem "Home Private Nusantara" (House roof, student figure, red & green book leaves) and sub-caption "Portal Akses Layanan Les Privat SD & SMP".
2. SEGMENTED TAB SWITCHER: 3 equal tab pills:
   - Tab 1: "Masuk Akun" (Active State with deep navy fill and white text)
   - Tab 2: "Daftar Siswa (SD/SMP)"
   - Tab 3: "Daftar Pengajar"
3. STATE A - LOGIN FORM:
   - Email address input with mail icon.
   - Password input with toggle show/hide eye icon.
   - "Lupa password?" helper link.
   - Large primary deep navy button "Masuk ke Portal" (#0B2545).
4. STATE B - STUDENT REGISTRATION FORM (When Tab 2 clicked):
   - Full Name of Student input.
   - Parent / Guardian Full Name input (marked required).
   - Education Level selector: 2 prominent radio cards for "Jenjang SD (Kelas 1-6)" and "Jenjang SMP (Kelas 7-9)".
   - Dynamic Sub-Class pill selector (Displays Kelas 1 to 6 when SD is picked, or Kelas 7 to 9 when SMP is picked).
   - Complete Home Address textarea with real-time character counter (max 500 chars).
   - WhatsApp Phone Number input with +62 prefix validation.
   - Email & Password fields with 8+ character strength meter.
   - Primary Crimson Red button "Daftar Akun Siswa" (#DC2626).
5. STATE C - TUTOR REGISTRATION FORM (When Tab 3 clicked):
   - Tutor Full Name & Degree input.
   - University & Major input.
   - SD/SMP Teaching Experience summary textarea.
   - Portfolio / CV link input (optional).
   - WhatsApp number & Address inputs.
   - Emerald/Amber alert info card explaining: "Akun pengajar berstatus PENDING hingga lolos verifikasi berkas & wawancara offline oleh Admin."
   - Primary Deep Navy button "Kirim Pendaftaran Pengajar" (#0B2545).

BANNED: No generic neon buttons, no emojis, no Inter font, clean structured inputs with labels on top.
```
