# Screen 10: Direktori Siswa & Pemantauan Jadwal Booking Terpusat (Admin Students & Booking Monitor)

## Metadata & Konteks
- **Routes yang Digabung**:
  - `/admin/students` (Direktori Seluruh Siswa SD & SMP, Data Orang Tua/Wali, & Alamat Domisili)
  - `/admin/bookings` (Monitoring Seluruh Transaksi & Jadwal Belajar Aktif se-Indonesia + Log Pencegahan Bentrok Jadwal)
- **User Role**: Admin Terpusat (`Role = ADMIN`)
- **Tujuan**: Memberikan visibilitas operasional penuh kepada tim admin untuk memantau data seluruh siswa terdaftar (jenjang SD/SMP, kontak wali murid, alamat rumah) serta memantau kalender seluruh jadwal les yang sedang berlangsung atau mendatang guna memastikan *zero schedule conflict* (0% bentrok jadwal).

---

## Design System Tokens (Derived from Logo.jpg)
- **Platform**: Web Responsive (Desktop 1440px dengan Sidebar / 12-column grid)
- **Background**: `#F8FAFC` (Slate Canvas)
- **Surface**: `#FFFFFF` (Pure White) with 1px border `#E2E8F0`
- **Primary Brand (HOME)**: `#0B2545` (Nusantara Deep Navy)
- **High-Impact CTA (PRIVATE)**: `#DC2626` (Nusantara Crimson Red)
- **Growth & Verified (NUSANTARA)**: `#16A34A` (Nusantara Emerald Green)
- **Grade Badges**:
  - `SD Badge`: `bg-blue-50 text-blue-900 border-blue-200`
  - `SMP Badge`: `bg-indigo-50 text-indigo-900 border-indigo-200`
- **Status Sesi**:
  - `Terkonfirmasi`: `bg-emerald-50 text-emerald-800 border-emerald-300`
  - `Selesai`: `bg-slate-100 text-slate-700 border-slate-200`
  - `Dibatalkan`: `bg-rose-50 text-rose-800 border-rose-300`
- **Typography**: Outfit (Headings), Geist (Tabel, Data rows), Geist Mono (Timestamps, 24h Time Slots, ID Transaksi).

---

## State & Transisi Komponen

### Master Tab Switcher:
1. **Tab 1: "Direktori Siswa SD & SMP" (`State: Students Directory`)** — Database lengkap murid, wali, alamat domisili, dan status keaktifan.
2. **Tab 2: "Monitoring Seluruh Booking" (`State: Global Bookings`)** — Kalender dan tabel pemantauan seluruh jadwal les privat aktif antar-pengajar dan siswa.

---

## Struktur Layar & Komponen

1. **Header & Master Tab Selector**:
   - Judul: "Direktori Siswa & Pemantauan Jadwal Belajar"
   - Deskripsi: "Manajemen data murid SD/SMP, profil orang tua/wali, serta monitoring seluruh sesi les privat yang berjalan."
   - Segmented Tab Selector:
     - `[ Direktori Siswa SD & SMP (480) ]`
     - `[ Monitoring Seluruh Booking (324 Sesi) ]` (Aktif)

---

### 2. State A: Tampilan Direktori Siswa (`Tab: Students Directory`)
- **Top Filter Controls**:
  - Search Input: "Cari nama siswa, nama wali, atau alamat domisili..."
  - Filter Jenjang: `Semua Jenjang`, `SD (Kelas 1-6)`, `SMP (Kelas 7-9)`.
  - Filter Kelas Spesifik: Dropdown `Kelas 1` s/d `Kelas 9`.
- **Tabel Data Siswa (Student Directory Table)**:
  - Kolom 1: **Siswa & Jenjang** (Nama Siswa, Badge `SD Kelas 5` / `SMP Kelas 8`).
  - Kolom 2: **Orang Tua / Wali Murid** (Nama Wali e.g. "Ibu Rina Kartika", Nomor WhatsApp).
  - Kolom 3: **Alamat Domisili Lengkap** (Jl. Tebet Barat Dalam IV No. 14, Tebet, Jaksel).
  - Kolom 4: **Total Sesi Booking** (e.g. `8 Sesi`).
  - Kolom 5: **Guru Terhubung** (Avatar & Nama Tutor Terakhir).
  - Kolom 6: **Aksi** (Tombol "Detail Siswa & Riwayat Les").

---

### 3. State B: Tampilan Monitoring Seluruh Booking (`Tab: Global Bookings`)
- **Status KPI Card Mini-Strip**:
  - `Sesi Berjalan Hari Ini: 42 Sesi` • `Sesi Mendatang: 186 Sesi` • `Sesi Selesai Bulan Ini: 96 Sesi` • `Tingkat Konflik Jadwal: 0% (Emerald Badge)`
- **Filter & Search Bar**:
  - Filter Tanggal: Date Range Picker (`10 Ags 2026 - 16 Ags 2026`).
  - Filter Status: `Semua`, `Terkonfirmasi`, `Selesai`, `Dibatalkan`.
  - Filter Pengajar: Dropdown Pengajar.
- **Tabel Master Jadwal Sesi (Master Bookings Table)**:
  - Kolom 1: **ID Booking & Tanggal** (`#HPN-0810-77` • Senin, 10 Agustus 2026).
  - Kolom 2: **Waktu Slot (24 Jam)** (`16:00 - 18:00 WIB`).
  - Kolom 3: **Siswa & Jenjang** (Fajar Pratama • `SD Kelas 5`).
  - Kolom 4: **Pengajar Ditugaskan** (Sarah Amanda, S.Pd. • `Terverifikasi`).
  - Kolom 5: **Alamat Pelaksanaan Belajar** (Tebet Barat, Jakarta Selatan).
  - Kolom 6: **Status Sesi** (Badge Hijau Emerald: `Terkonfirmasi`).
  - Kolom 7: **Aksi Koordinasi** (Tombol "Buka Tiket Koordinasi WA" / "Detail Sesi").

---

## Stitch Master Prompt (Copy-Ready)

```text
Create a modern, data-rich admin directory and global booking monitoring screen for "Home Private Nusantara" with a 2-tab view switcher between Student Directory and Global Bookings Monitor.

DESIGN SYSTEM (REQUIRED - FROM BRAND LOGO):
- Platform: Responsive Web Admin Dashboard (Desktop 1440px with sidebar, max-width 1400px).
- Background: Slate Canvas (#F8FAFC).
- Surface: Pure White (#FFFFFF) cards with 1px border (#E2E8F0) and subtle elevation.
- Primary Brand: Nusantara Deep Navy (#0B2545).
- High-Impact CTA: Nusantara Crimson Red (#DC2626).
- Growth & Verified Accent: Nusantara Emerald Green (#16A34A).
- Grade Badges: SD (#EFF6FF, text #0B2545) and SMP (#EEF2FF, text #312E81).
- Status Colors: Emerald (#16A34A) for Confirmed, Slate (#475569) for Completed, Crimson (#DC2626) for Cancelled.
- Typography: Outfit (Headings), Geist (Table rows), Geist Mono (24-hour time slots, Booking IDs).

PAGE STRUCTURE:
1. HEADER: Page title "Direktori Siswa & Pemantauan Jadwal Belajar", subtitle, and a prominent 2-way tab selector: "Direktori Siswa SD & SMP (480)" and "Monitoring Seluruh Booking (324 Sesi)" [Active].
2. KPI MINI STRIP: 4 summary pill badges at the top showing "Sesi Hari Ini (42)", "Sesi Mendatang (186)", "Sesi Selesai (96)", and "Konflik Jadwal (0% - Zero Collision, Emerald Badge)".
3. TAB 1 - STUDENT DIRECTORY VIEW:
   - Filter bar with search by student name/parent/address, grade filter (SD 1-6 / SMP 7-9).
   - Data table displaying: Student Name, Grade Badge, Parent/Guardian Name with WhatsApp link, Full Residential Address, Total Sessions, and Assigned Tutor.
4. TAB 2 - GLOBAL BOOKINGS MONITOR VIEW:
   - Date range selector ("10 - 16 Agustus 2026") and status filters.
   - Master bookings data table with columns: Booking ID & Date, 24-hour Time Slot ("16:00 - 18:00 WIB"), Student Name & Grade ("Fajar Pratama - SD Kelas 5"), Assigned Tutor ("Sarah Amanda, S.Pd."), Residential Learning Address ("Tebet Barat, Jaksel"), Status Badge ("Terkonfirmasi", Emerald), and Action button "Detail Tiket".

BANNED: No emojis as UI icons, no neon glows, clean high-contrast tabular structure.
```
