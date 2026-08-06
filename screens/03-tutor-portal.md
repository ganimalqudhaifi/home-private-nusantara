# Screen 03: Portal Pengajar (Tutor Portal — Pending vs Verified State)

## Metadata & Konteks
- **Routes yang Digabung**:
  - `/tutor/pending` (Holding State: Akun Menunggu Verifikasi Offline oleh Admin)
  - `/tutor/dashboard` (Dashboard Utama Pengajar Terverifikasi)
- **User Role**: Pengajar (Status: `PENDING` atau `VERIFIED`)
- **Tujuan**: Menampilkan antarmuka terpadu portal pengajar dengan penanganan status akun yang tegas. Jika akun berstatus `PENDING`, menampilkan banner penahanan dan instruksi wawancara offline. Jika akun berstatus `VERIFIED`, menampilkan ringkasan metrik mengajar, jadwal sesi aktif, dan pintasan cepat.

---

## Design System Tokens (Derived from Logo.jpg)
- **Platform**: Web Responsive (Desktop 1440px / Tablet 768px / Mobile 375px)
- **Background**: `#F8FAFC` (Slate Canvas)
- **Surface**: `#FFFFFF` (Pure White) with 1px border `#E2E8F0`
- **Primary Brand (HOME)**: `#0B2545` (Nusantara Deep Navy)
- **High-Impact CTA (PRIVATE)**: `#DC2626` (Nusantara Crimson Red)
- **Growth & Verified (NUSANTARA)**: `#16A34A` (Nusantara Emerald Green - `bg-emerald-50 border-emerald-300 text-emerald-800`)
- **Pending/Warning Color**: `#D97706` (Warm Amber - `bg-amber-50 border-amber-300 text-amber-900`)
- **Text Headings**: `#0F172A` (Charcoal Slate), font: `Outfit`
- **Text Body**: `#475569` (Slate-600), font: `Geist`

---

## State & Transisi Komponen

```text
[Akun Baru Mendaftar] ──► [STATE A: HOLDING STATE (PENDING)]
                                     │
                    (Admin Memverifikasi di Luar Sistem)
                                     │
                                     ▼
                        [STATE B: DASHBOARD AKTIF (VERIFIED)]
```

---

## Struktur Layar Detail per State

### 1. Header & Navigation Bar
- Logo resmi Home Private Nusantara.
- Badge Status Akun di pojok kanan atas:
  - *Jika Pending*: Badge Amber `⏳ Menunggu Verifikasi Admin`
  - *Jika Verified*: Badge Emerald `✓ Pengajar Terverifikasi` (Nusantara Emerald `#16A34A`)
- Menu Navigasi: Dashboard, Ketersediaan Mengajar, Jadwal Sesi, Profil Saya, Keluar.

---

### 2. State A: Holding State Screen (`Status = PENDING`)
- **Banner Peringatan Utama (Amber Notice Box)**:
  - Judul: "Pendaftaran Berhasil — Akun Anda Sedang Dalam Proses Kurasi & Verifikasi"
  - Deskripsi: "Terima kasih telah mendaftar sebagai mitra pengajar Home Private Nusantara. Untuk menjaga standar mutu layanan bagi siswa SD & SMP, seluruh calon pengajar wajib melewati tahapan verifikasi identitas dan wawancara langsung."
- **Timeline Tahapan Kurasi (Vertical Step Tracker)**:
  - Step 1: `[Selesai ✓]` Registrasi Data & Berkas Akademik Online.
  - Step 2: `[Sedang Berlangsung ⏳]` Peninjauan Dokumen oleh Tim Admin Operasional.
  - Step 3: `[Akan Datang]` Kontak Wawancara via WhatsApp / Video Call Admin (Estimasi 1-2 hari kerja).
  - Step 4: `[Akan Datang]` Aktivasi Akun Penuh & Pembukaan Jadwal Mengajar.
- **Kartu Ringkasan Data Pendaftar (Read-Only Preview)**:
  - Nama Pengajar, Pendidikan/Kampus, Ringkasan Pengalaman SD/SMP, Nomor WhatsApp, dan Alamat.
- **Kotak Bantuan Operasional**:
  - Tombol Tautan "Hubungi Admin Support via WhatsApp" untuk konfirmasi berkas lebih lanjut.
- **Proteksi Akses**: Menu "Ketersediaan Mengajar" dan "Jadwal" menampilkan status terkunci (*Locked with tooltip: "Fitur ini terbuka setelah akun terverifikasi"*).

---

### 3. State B: Dashboard Pengajar Aktif (`Status = VERIFIED`)
- **Welcome Banner**:
  - Sapaan personal: "Selamat Datang Kembali, Kak Sarah Amanda, S.Pd. 👋"
  - Subtitle: "Status Akun: Aktif & Siap Menerima Murid Les SD & SMP."
- **Statistik Cepat (4 Metric Cards Grid)**:
  - Card 1: **Total Sesi Bulan Ini**: `18 Sesi` (Tabular Mono number).
  - Card 2: **Murid Aktif Terhubung**: `4 Siswa` (2 Siswa SD, 2 Siswa SMP).
  - Card 3: **Slot Ketersediaan Aktif**: `4 Hari / Minggu` (Senin, Kamis, Sabtu, Minggu).
  - Card 4: **Skor Kepuasan Wali Murid**: `4.9 / 5.0 ⭐` (Berdasarkan 24 ulasan).
- **Jadwal Sesi Mengajar Mendatang (Upcoming Sessions Table / Card List)**:
  - Kartu Sesi 1:
    - Siswa: **Fajar Pratama (SD Kelas 5)**
    - Jadwal: **Senin, 10 Agustus 2026 • 16:00 - 18:00 WIB**
    - Materi: Matematika Dasar (Pecahan & Desimal)
    - Lokasi: Jl. Tebet Barat Dalam No. 14, Jakarta Selatan (Tombol "Buka Peta / Detail Alamat")
    - Status: `Terkonfirmasi ✓` (Emerald Badge)
  - Kartu Sesi 2:
    - Siswa: **Rizky Ramadhan (SMP Kelas 8)**
    - Jadwal: **Kamis, 13 Agustus 2026 • 16:00 - 18:00 WIB**
    - Materi: IPA Terpadu (Sistem Gerak Manusia)
    - Status: `Terkonfirmasi ✓` (Emerald Badge)
- **Pintasan Aksi Cepat (Quick Actions)**:
  - Tombol Primer: "Perbarui Slot Hari & Jam Mengajar" (`/tutor/availability`) (Nusantara Deep Navy `#0B2545`)
  - Tombol Sekunder: "Lihat Seluruh Kalender Sesi" (`/tutor/schedule`)

---

## Stitch Master Prompt (Copy-Ready)

```text
Create a modern, clean web dashboard portal for verified and pending tutors on "Home Private Nusantara", supporting both a Pending Holding State and a Verified Active Dashboard.

DESIGN SYSTEM (REQUIRED - FROM BRAND LOGO):
- Platform: Responsive Web Dashboard (Desktop 1440px with sticky sidebar/navbar).
- Background: Slate Canvas (#F8FAFC).
- Surface: Pure White (#FFFFFF) cards with 1px border (#E2E8F0) and subtle elevation shadow.
- Primary Brand: Nusantara Deep Navy (#0B2545) for primary action buttons and active navigation links.
- High-Conversion CTA: Nusantara Crimson Red (#DC2626) for priority alerts.
- Growth Accent: Nusantara Emerald Green (#16A34A) for Verified status badges and confirmed sessions.
- Status Amber (#D97706): Used for Pending holding states, warnings, and review notices.
- Typography: Outfit (Headings) and Geist (Body, data tables, metrics).

PAGE STRUCTURE:
1. NAVIGATION: Top navigation bar with official logo emblem "Home Private Nusantara", tutor avatar with name "Sarah Amanda, S.Pd.", and an interactive badge toggle demonstrating both states: "Pending Verification" (Amber) and "Verified" (Emerald).
2. STATE A (WHEN STATUS IS PENDING):
   - Large prominent Amber Alert Card at the top: Headline "Akun Anda Sedang Dalam Proses Verifikasi Admin", explanatory text stating that offline interview and credential checks are in progress within 24-48 business hours.
   - 4-step vertical visual progress tracker: 1. Registrasi (Done) -> 2. Review Berkas (In Progress) -> 3. Wawancara Offline/WA -> 4. Akun Aktif.
   - Read-only preview card of the tutor's submitted details (Education, Experience in SD/SMP, WhatsApp, Address).
   - "Hubungi Admin Support" WhatsApp quick contact card.
   - Muted/Locked visual placeholders for calendar and availability settings.
3. STATE B (WHEN STATUS IS VERIFIED):
   - Welcoming header with emerald green check badge "Pengajar Terverifikasi" and CTA "Atur Slot Jadwal".
   - 4-metric statistics grid: "Total Sesi Selesai (18)", "Murid Aktif (4 Siswa: 2 SD, 2 SMP)", "Slot Ketersediaan (4 Hari Aktif)", and "Rating Kepuasan (4.9/5.0)".
   - Upcoming Tutoring Sessions section displaying structured session cards with student name, grade tag ("SD Kelas 5", "SMP Kelas 8"), scheduled date & time ("Senin, 16:00 - 18:00 WIB"), home address, and "Detail Alamat" action.
   - Quick action shortcuts: "Update Ketersediaan Hari & Jam" and "Buka Kalender Mengajar".

BANNED: No emojis as UI icons, no neon glows, no Inter font, clean structured tabular layout.
```
