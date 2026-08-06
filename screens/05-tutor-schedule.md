# Screen 05: Kalender & Jadwal Mengajar Pengajar (Tutor Schedule & Student Detail Drawer)

## Metadata & Konteks
- **Route**: `/tutor/schedule`
- **User Role**: Pengajar Terverifikasi (`Status = VERIFIED`)
- **Tujuan**: Menyediakan tampilan visual kalender mengajar komprehensif (mode mingguan/bulanan) yang memetakan seluruh sesi les aktif bersama murid SD dan SMP, dilengkapi dengan *slide-over drawer* interaktif untuk melihat rincian alamat domisili murid, profil wali, dan kontak koordinasi belajar.

---

## Design System Tokens
- **Platform**: Web Responsive (Desktop 1440px / Tablet 768px / Mobile 375px)
- **Background**: `#F8FAFC` (Slate Canvas)
- **Surface**: `#FFFFFF` (Pure White) with 1px border `#E2E8F0`
- **Primary Brand**: `#1E3A8A` (Nusantara Blue)
- **Session Tags**:
  - SD Session: `bg-blue-100 border-blue-300 text-blue-900`
  - SMP Session: `bg-indigo-100 border-indigo-300 text-indigo-900`
- **Text Headings**: `#0F172A` (Charcoal Slate), font: `Outfit`
- **Numbers & Times**: `Geist Mono` (Tabular format 24 Jam)

---

## Struktur Layar & Komponen

1. **Header & View Controller**:
   - Judul: "Kalender & Jadwal Sesi Mengajar"
   - Subtitle: "Pantau seluruh jadwal les privat tatap muka aktif dan riwayat pertemuan Anda."
   - Segmented View Switcher: `[Tampilan Kalender Mingguan]` | `[Tampilan Daftar List]`
   - Month/Week Navigator: Tombol `< Sebelumnya`, label "Agustus 2026", tombol `Berikutnya >`, dan tombol "Hari Ini".

2. **Tampilan Kalender Mingguan (Weekly Time Grid - Senin s/d Minggu)**:
   - Header Kolom: Hari & Tanggal (contoh: `Senin, 10 Ags`, `Selasa, 11 Ags`, ..., `Minggu, 16 Ags`).
   - Baris Jam (Time Rows: `08:00` s/d `21:00`).
   - Kartu Sesi Mengajar Terplot di Grid:
     - **Blok Sesi 1 (Senin 10 Ags, 16:00 - 18:00 WIB)**:
       - Tag: `SD Kelas 5` (Blue Badge)
       - Nama: "Fajar Pratama"
       - Topik: "Matematika Dasar - Pecahan & Desimal"
       - Lokasi: "Tebet Barat, Jaksel"
       - Status: `Terkonfirmasi ✓`
       - Interaksi: Klik kartu membuka Slide-Over Drawer Detail Murid.
     - **Blok Sesi 2 (Kamis 13 Ags, 16:00 - 18:00 WIB)**:
       - Tag: `SMP Kelas 8` (Indigo Badge)
       - Nama: "Rizky Ramadhan"
       - Topik: "IPA Terpadu - Sistem Gerak Manusia"
       - Lokasi: "Pancoran, Jaksel"
       - Status: `Terkonfirmasi ✓`
     - **Blok Sesi 3 (Sabtu 15 Ags, 09:00 - 11:00 WIB)**:
       - Tag: `SD Kelas 3` (Blue Badge)
       - Nama: "Alya Zahra"
       - Topik: "Bahasa Indonesia & Tematik"
       - Lokasi: "Mampang Prapatan, Jaksel"

3. **Slide-Over Drawer: Rincian Lengkap Murid & Koordinasi Belajar (Side Panel Detail)**:
   - *Terbuka saat salah satu sesi di kalender diklik*:
   - Header Drawer: "Rincian Sesi Belajar #HPN-2026-0810-01" + Tombol Tutup [X].
   - **Profil Murid**:
     - Avatar siswa & Nama: "Fajar Pratama"
     - Jenjang & Kelas: `SD Kelas 5` (Kurikulum Merdeka)
     - Sekolah Asal: SDN Tebet Timur 01
   - **Informasi Orang Tua / Wali**:
     - Nama Wali: "Ibu Rina Kartika"
     - Nomor Kontak WhatsApp: `+62 812-3456-7890` (Tombol Cepat: "Chat WhatsApp Wali Murid")
   - **Lokasi & Alamat Lengkap Belajar di Rumah**:
     - Alamat: "Jl. Tebet Barat Dalam IV No. 14, RT 05/RW 03, Tebet, Jakarta Selatan (Patokan: Pagar hitam depan Taman Tebet)."
     - Tombol Aksi: "Buka di Google Maps" (Icon: MapPin)
   - **Jadwal & Catatan Khusus**:
     - Waktu: "Senin, 10 Agustus 2026 (16:00 - 18:00 WIB)"
     - Catatan dari Orang Tua: "Fajar butuh bimbingan sabar untuk konsep pembagian bersusun dan pecahan campuran."
   - **Aksi Drawer**:
     - Tombol Utama: "Tandai Sesi Selesai Dilaksanakan" (Emerald Green).
     - Tombol Sekunder: "Laporkan Kendala ke Admin" (Outline Slate).

---

## Stitch Master Prompt (Copy-Ready)

```text
Create a modern, clean tutor schedule calendar screen with an interactive slide-over student detail drawer for "Home Private Nusantara".

DESIGN SYSTEM (REQUIRED):
- Platform: Responsive Web Dashboard (Desktop 1440px, max-width 1280px).
- Background: Slate Canvas (#F8FAFC).
- Surface: Pure White (#FFFFFF) with 1px border (#E2E8F0) and subtle elevation.
- Primary Brand: Nusantara Deep Blue (#1E3A8A).
- SD Session Badge: Soft Blue (#EFF6FF, border #93C5FD, text #1E3A8A).
- SMP Session Badge: Soft Indigo (#EEF2FF, border #A5B4FC, text #3730A3).
- Typography: Outfit (Headings), Geist (Body), and Geist Mono (24-hour time slots).

PAGE STRUCTURE:
1. HEADER: Title "Kalender & Jadwal Sesi Mengajar", date-range navigator ("< 10 - 16 Agustus 2026 >"), and a view toggle ("Kalender Mingguan" [active] vs "Daftar Sesi").
2. WEEKLY CALENDAR GRID:
   - 7-column timetable (Monday to Sunday) covering hours 08:00 to 21:00.
   - Interactive scheduled session blocks placed at specific time coordinates:
     * Monday 16:00-18:00 block: Blue badge "SD Kelas 5", student name "Fajar Pratama", topic "Matematika Dasar", address "Tebet Barat, Jaksel".
     * Thursday 16:00-18:00 block: Indigo badge "SMP Kelas 8", student name "Rizky Ramadhan", topic "IPA Terpadu".
     * Saturday 09:00-11:00 block: Blue badge "SD Kelas 3", student name "Alya Zahra".
3. SLIDE-OVER STUDENT DETAIL DRAWER (Overlay panel positioned on the right):
   - Drawer Header: "Rincian Sesi Belajar #HPN-0810", close button [X].
   - Student Section: Avatar, Name "Fajar Pratama", badge "SD Kelas 5".
   - Parent / Guardian Section: "Ibu Rina Kartika (Wali Murid)" with a green WhatsApp button "+62 812-3456-7890".
   - Home Learning Address: Complete residential address with landmark notes and a "Buka Google Maps" button.
   - Session Time: "Senin, 10 Agustus 2026 • 16:00 - 18:00 WIB".
   - Parent Learning Notes card: Special requests for patient tutoring on math fractions.
   - Bottom actions: Green button "Tandai Sesi Selesai" and secondary "Hubungi Admin".

BANNED: No emojis, no neon glow, clean tabular grid with high contrast.
```
