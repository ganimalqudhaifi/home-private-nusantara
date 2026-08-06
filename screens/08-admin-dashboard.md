# Screen 08: Panel Kontrol & Dashboard Admin Terpusat (Admin Overview Dashboard)

## Metadata & Konteks
- **Route**: `/admin/dashboard`
- **User Role**: Admin Terpusat / Tim Operasional & Quality Control (`Role = ADMIN`)
- **Tujuan**: Memberikan visibilitas menyeluruh terhadap performa operasional platform Home Private Nusantara, memantau metrik kunci (jumlah tutor aktif, antrean verifikasi pengajar pending, total siswa SD/SMP terdaftar, volume booking sesi aktif), serta menyajikan antrean tugas kurasi mendesak.

---

## Design System Tokens
- **Platform**: Web Responsive (Desktop 1440px dengan Sidebar Navigasi Tetap / Tablet 1024px)
- **Background**: `#F8FAFC` (Slate Canvas)
- **Sidebar & Header Surface**: `#FFFFFF` (Pure White) with 1px border `#E2E8F0`
- **Primary Brand**: `#1E3A8A` (Nusantara Deep Blue)
- **Alert & Pending Accent**: `#D97706` (Warm Amber - notification badges & pending queues)
- **Verified Accent**: `#059669` (Emerald Green)
- **Density**: Cockpit Dense (Level 7) — Informasi terstruktur padat, angka metrik berbasis tabular mono.
- **Typography**: Outfit (Headings) and Geist / Geist Mono (Data tables, metrics, chart labels).

---

## Struktur Layar & Komponen

1. **Sidebar Navigation (Admin Control Panel)**:
   - Header: Logo Home Private Nusantara + Badge "Admin Control".
   - Menu Navigasi:
     - `[Dashboard (Aktif)]`
     - `[Manajemen Pengajar]` (Badge Notifikasi: `3 Pending` warna amber)
     - `[Data Siswa SD & SMP]`
     - `[Monitoring Seluruh Booking]`
     - `[Pengaturan Platform]`
   - Footer Sidebar: Profil Admin ("Dewi Kartika - Operations Manager") & Tombol Keluar.

2. **Top Metric Bar (4 Primary KPI Cards)**:
   - **Card 1: Pengajar Aktif Terverifikasi**:
     - Nilai: `142 Tutor` (`+12 bulan ini`)
     - Sub-rincian: 86 Guru SD • 56 Guru SMP
   - **Card 2: Antrean Verifikasi Pengajar Pending (Action Required)**:
     - Nilai: `3 Pendaftar Baru` (Amber Pill: "Butuh Review & Wawancara")
     - Turnaround Time: Rata-rata 26 Jam (Target: < 48 Jam)
   - **Card 3: Total Siswa Terdaftar**:
     - Nilai: `480 Siswa`
     - Distribusi: `310 Siswa SD (64%)` • `170 Siswa SMP (36%)`
   - **Card 4: Total Sesi Booking Bulan Ini**:
     - Nilai: `324 Sesi Terjadwal`
     - Konflik Jadwal: `0% (Zero Collision)`

3. **Urgent Verification Queue (Antrean Cepat Kurasi Pengajar)**:
   - Header Card: "Antrean Pengajar Menunggu Verifikasi Dokumen & Wawancara (3)"
   - Tabel Cepat Pendaftar Pending:
     - Baris 1: **Sarah Amanda, S.Pd.** — S1 Pend. Matematika UI • Mendaftar: 2 Jam lalu • Kontak: +62 812-3456-7890 • Aksi: Tombol "Tinjau Berkas & Verifikasi" (`/admin/tutors/1`)
     - Baris 2: **Dimas Pratama, S.Si.** — S1 Fisika ITB • Mendaftar: 8 Jam lalu • Aksi: Tombol "Tinjau Berkas"
     - Baris 3: **Anisa Rahma, S.Pd.** — S1 Bahasa Indonesia UNJ • Mendaftar: 1 Hari lalu • Aksi: Tombol "Tinjau Berkas"

4. **Grafik & Analitik Operasional (2 Kolom Layout)**:
   - **Kolom Kiri: Tren Booking Mingguan (Line / Bar Chart Visual)**:
     - Grafik volume sesi les per hari dalam 30 hari terakhir dengan tren peningkatan pada hari Sabtu dan Minggu.
   - **Kolom Kanan: Distribusi Kategori Kelas (Donut / Progress Bars)**:
     - SD Kelas 1-3 (Tematik & Calistung): 30%
     - SD Kelas 4-6 (Matematika & IPA Lanjutan): 35%
     - SMP Kelas 7-8 (Aljabar & Sains Terpadu): 22%
     - SMP Kelas 9 (Ujian & Kelulusan): 13%

5. **Log Aktivitas Sistem Terkini (Recent System Audit Feed)**:
   - Feed 1: `Admin Dewi` menyetujui akun tutor Budi Santoso (Status -> VERIFIED).
   - Feed 2: `Siswa Fajar Pratama` melakukan booking dengan Tutor Sarah Amanda untuk Senin, 10 Ags.
   - Feed 3: `Tutor Nadia Safitri` memperbarui slot hari ketersediaan Sabtu & Minggu.

---

## Stitch Master Prompt (Copy-Ready)

```text
Create a modern, data-dense central admin dashboard for "Home Private Nusantara" (a curated private tutoring marketplace for SD and SMP students in Indonesia).

DESIGN SYSTEM (REQUIRED):
- Platform: Responsive Web Dashboard (Desktop 1440px with a fixed left sidebar navigation, max-width 1400px).
- Theme: Professional, institutional, high-density operations panel.
- Background: Slate Canvas (#F8FAFC).
- Surface: Pure White (#FFFFFF) cards with 1px border (#E2E8F0) and subtle elevation.
- Primary Brand: Nusantara Deep Blue (#1E3A8A) for sidebar highlights and active buttons.
- Amber Accent: (#D97706) for pending verification alerts and notification badges.
- Emerald Accent: (#059669) for verified counts and confirmed bookings.
- Typography: Outfit (Headings), Geist (Labels, table rows), and Geist Mono (Tabular KPI numbers).

PAGE STRUCTURE:
1. SIDEBAR: Fixed left navigation with logo "Home Private Nusantara", badge "Admin Panel", navigation links: "Dashboard" [Active], "Manajemen Pengajar" (with Amber badge '3 Pending'), "Data Siswa SD/SMP", "Monitoring Booking", and bottom admin user profile ("Dewi Kartika - Operations").
2. TOP STATS BAR (4 CARDS):
   - Card 1: "Pengajar Aktif" (142 Tutor, +12 this month, breakdown: 86 SD / 56 SMP).
   - Card 2: "Pengajar Pending" (3 Menunggu Verifikasi, Amber warning pill).
   - Card 3: "Siswa Terdaftar" (480 Siswa: 310 SD / 170 SMP).
   - Card 4: "Total Booking Sesi" (324 Sesi Bulan Ini, 0% double-booking).
3. URGENT TUTOR VERIFICATION QUEUE:
   - Card container with title "Antrean Verifikasi Dokumen & Wawancara Pengajar (3 Pendaftar Baru)".
   - Clean data table listing applicant name, university degree, registration timestamp, WhatsApp contact, and a direct primary blue button "Audit & Verifikasi".
4. ANALYTICS & DISTRIBUTION (2-COLUMN GRID):
   - Left: Weekly booking session volume trend visual bar chart showing peak activity on weekends.
   - Right: Class category distribution breakdown (SD 1-3: 30%, SD 4-6: 35%, SMP 7-8: 22%, SMP 9: 13%).
5. SYSTEM AUDIT FEED: Live chronologic log entries of recent verifications, bookings, and availability updates.

BANNED: No emojis as icons, no neon glows, no Inter font, clean tabular cockpit layout.
```
