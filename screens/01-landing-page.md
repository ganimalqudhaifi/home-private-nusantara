# Screen 01: Landing Page Utama

## Metadata & Konteks
- **Route**: `/`
- **User Role**: Guest / Pengunjung Publik (Orang Tua Murid SD/SMP & Calon Pengajar)
- **Tujuan**: Memperkenalkan kredibilitas Home Private Nusantara, mengedukasi alur kurasi pengajar terverifikasi, memaparkan katalog program khusus SD (1–6) dan SMP (7–9), serta mendorong konversi pendaftaran melalui CTA ganda.

---

## Design System Tokens
- **Platform**: Web Responsive (Desktop 1440px / Tablet 768px / Mobile 375px)
- **Background**: `#F8FAFC` (Slate Canvas)
- **Surface**: `#FFFFFF` (Pure White) with 1px border `#E2E8F0`
- **Primary Accent**: `#1E3A8A` (Nusantara Blue)
- **Secondary Accent**: `#D97706` (Warm Amber / Gold)
- **Text Headings**: `#0F172A` (Charcoal Slate), font: `Outfit` or `Geist`
- **Text Body**: `#475569` (Muted Slate), font: `Geist` or `Plus Jakarta Sans`
- **Badges**:
  - SD Badge: `bg-blue-50 text-blue-700 border-blue-200`
  - SMP Badge: `bg-indigo-50 text-indigo-700 border-indigo-200`
  - Verified Badge: `bg-emerald-50 text-emerald-700 border-emerald-200`

---

## Struktur Layar & Komponen

1. **Top Navigation Bar (Sticky)**:
   - Kiri: Logo "Home Private Nusantara" dengan emblem buku & bintang emas + teks pendukung "Portal Les Privat SD & SMP Terkurasi".
   - Tengah: Menu Navigasi ("Tentang Kami", "Program SD & SMP", "Alur Kurasi", "Testimoni", "Hubungi Kami").
   - Kanan: Tombol Sekunder "Masuk Portal" (`/auth/login`) dan Tombol Primer "Cari Guru Privat" (Scroll ke Program / Register).

2. **Hero Section (Asymmetrical Split)**:
   - Kiri (Konten):
     - Pill Tag: "✨ 100% Pengajar Lolos Seleksi & Wawancara Offline"
     - Headline Utama: "Bimbingan Belajar Privat Terbaik untuk Siswa SD & SMP di Rumah Anda"
     - Subheadline: "Dapatkan guru les privat berpengalaman yang siap membimbing materi sekolah dasar hingga menengah pertama dengan jadwal belajar yang fleksibel dan transparan."
     - Dual CTA Box:
       - Tombol Utama A: "Daftar Sebagai Siswa" (Icon: GraduationCap, bg-blue-900 text-white)
       - Tombol Utama B: "Gabung Sebagai Pengajar" (Icon: Briefcase, border border-slate-300 text-slate-800)
     - Social Proof Mini-Strip: Rating 4.9/5.0 dari 1,200+ sesi belajar, 100% Guru Terverifikasi.
   - Kanan (Visual Card Layout):
     - Interactive Preview Card: Mockup pencarian cepat tanggal & jenjang (SD Kelas 5 / SMP Kelas 8).
     - Floating Certified Badge Card: "Sarah Amanda, S.Pd. — Terverifikasi Admin (Lulus Wawancara)".

3. **Value Proposition / Keunggulan Utama (Grid 3 Kolom Asimetris)**:
   - Card 1: **Kurasi Ketat 100% Offline-to-Online** — Setiap pengajar melewati verifikasi ijazah, identitas, dan wawancara langsung oleh tim admin.
   - Card 2: **Spesialisasi Jenjang SD & SMP** — Fokus eksklusif pada fondasi belajar SD Kelas 1-6 dan persiapan SMP Kelas 7-9.
   - Card 3: **Pencocokan Jadwal Instan (Date Picker)** — Bebas pilih tanggal dan jam luang pengajar tanpa perlu chat berhari-hari.

4. **Katalog Program Pendidikan (Tab Switcher: SD vs SMP)**:
   - **Tab SD (Kelas 1–6)**:
     - Kartu Kelas 1-3 (Fondasi Calistung, Tematik, Matematika Dasar).
     - Kartu Kelas 4-6 (Matematika Lanjutan, IPA Terpadu, Persiapan Ujian Sekolah).
   - **Tab SMP (Kelas 7–9)**:
     - Kartu Kelas 7 (Transisi Kurikulum, Aljabar, Sains Terpadu).
     - Kartu Kelas 8 (Pendalaman Matematika, Fisika, Biologi, Bahasa Inggris).
     - Kartu Kelas 9 (Pemantapan Kelulusan & Persiapan Masuk SMA Favorit).

5. **Alur Kerja 4 Langkah (How It Works)**:
   - Step 1: **Pilih Jenjang & Kelas** (Tentukan kebutuhan belajar SD/SMP).
   - Step 2: **Pilih Tanggal Belajar** (Lihat kalender ketersediaan guru).
   - Step 3: **Konek & Reservasi** (Dapatkan konfirmasi tiket belajar langsung).
   - Step 4: **Mulai Belajar di Rumah** (Guru hadir sesuai jadwal terkonfirmasi).

6. **Testimonial & Trust Section**:
   - Testimoni Orang Tua Siswa SD Kelas 5 (Ibu Rina - Jakarta Selatan).
   - Testimoni Siswa SMP Kelas 8 (Rizky - Surabaya).
   - Testimoni Tutor Aktif Matematika (Sarah A. - Mahasiswi Pendidikan).

7. **Footer**:
   - Informasi PT Home Private Nusantara, alamat kantor operasional, jam operasional, tautan WhatsApp Customer Support resmi, media sosial, dan copyright 2026.

---

## Stitch Master Prompt (Copy-Ready)

```text
Create a modern, highly trustworthy web landing page for "Home Private Nusantara", a premium curated private tutoring platform in Indonesia dedicated exclusively to Elementary School (SD Kelas 1-6) and Junior High School (SMP Kelas 7-9).

DESIGN SYSTEM (REQUIRED):
- Platform: Responsive Web (Desktop 1440px viewport centered, max-width 1280px).
- Theme: Clean, academic, and authoritative.
- Background: Slate Canvas (#F8FAFC).
- Surface: Pure White (#FFFFFF) cards with subtle 1px border (#E2E8F0) and soft elevation.
- Primary Accent: Nusantara Deep Blue (#1E3A8A) for headers and primary CTA buttons.
- Secondary Accent: Warm Amber Gold (#D97706) for verified badges, stars, and key highlights.
- Text Primary: Charcoal Slate (#0F172A). Text Secondary: Muted Slate (#475569).
- Typography: Clean geometric modern sans-serif (Outfit/Geist).

PAGE STRUCTURE:
1. HEADER: Sticky clean navigation bar featuring the logo "Home Private Nusantara" with book/star emblem, navigation links ("Tentang Kami", "Program SD & SMP", "Alur Kurasi", "Testimoni"), a secondary "Masuk Portal" button, and a primary blue "Cari Guru Privat" button.
2. HERO SECTION (Asymmetrical):
   - Left column: Amber verified badge "100% Pengajar Lolos Seleksi & Wawancara Offline", large headline "Bimbingan Belajar Privat Terbaik untuk Siswa SD & SMP di Rumah Anda", supporting descriptive paragraph, and dual CTA buttons: primary deep blue button "Daftar Sebagai Siswa" and outline button "Gabung Sebagai Pengajar". Includes rating pill (4.9/5.0 with 1,200+ verified sessions).
   - Right column: Clean interactive preview card showing a mini calendar date picker with highlighted active dates and a floating verified tutor card with avatar, name "Sarah Amanda, S.Pd.", badge "Tutor Matematika & IPA SD-SMP", and a green "Terverifikasi Admin" badge.
3. VALUE PROPOSITIONS: 3 structured cards highlighting "100% Offline-to-Online Curation", "Spesialisasi SD 1-6 & SMP 7-9", and "Pencocokan Jadwal Instan via Date Picker".
4. PROGRAM SECTION: Segmented tab selector for "Program SD (Kelas 1-6)" and "Program SMP (Kelas 7-9)" displaying curriculum tags, key subjects, and class levels.
5. 4-STEP HOW IT WORKS: Step-by-step numbered visual workflow: 1. Pilih Kelas -> 2. Pilih Tanggal -> 3. Konek Jadwal -> 4. Belajar di Rumah.
6. TESTIMONIALS: Verified parent and tutor quote cards with avatar, student level, and 5-star rating.
7. FOOTER: Institutional footer with company address, official WhatsApp hotline, social links, and copyright notice.

BANNED: No generic neon gradients, no emojis as icons (use clean SVG outlines), no Inter default font, no pure black backgrounds.
```
