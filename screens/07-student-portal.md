# Screen 07: Portal Aktivitas & Riwayat Pemesanan Siswa (Student Portal & Bookings History)

## Metadata & Konteks
- **Routes yang Digabung**:
  - `/student/dashboard` (Ringkasan Belajar Siswa, Status Tutor Terhubung, & Pintasan Pencarian Baru)
  - `/student/my-bookings` (Riwayat Sesi Terjadwal, Sesi Mendatang, & Sesi Selesai)
- **User Role**: Siswa / Orang Tua Murid Terdaftar
- **Tujuan**: Menjadi pusat kendali bagi siswa dan orang tua untuk melihat status jadwal les mendatang, mengakses profil pengajar yang terhubung, melihat riwayat sesi belajar yang telah selesai, mengunduh catatan materi, serta melakukan pemesanan sesi baru.

---

## Design System Tokens (Derived from Logo.jpg)
- **Platform**: Web Responsive (Desktop 1440px / Tablet 768px / Mobile 375px)
- **Background**: `#F8FAFC` (Slate Canvas)
- **Surface**: `#FFFFFF` (Pure White) with 1px border `#E2E8F0`
- **Primary Brand (HOME)**: `#0B2545` (Nusantara Deep Navy)
- **High-Impact CTA (PRIVATE)**: `#DC2626` (Nusantara Crimson Red)
- **Growth & Verified (NUSANTARA)**: `#16A34A` (Nusantara Emerald Green)
- **Status Tags**:
  - `Mendatang / Terkonfirmasi`: `bg-emerald-50 text-emerald-800 border-emerald-300`
  - `Selesai`: `bg-slate-100 text-slate-700 border-slate-200`
- **Typography**: Outfit (Headings), Geist (Body, data lists), Geist Mono (24h time format).

---

## State & Transisi Komponen

### Tab Navigation Sesi Belajar:
1. **Tab 1: "Sesi Mendatang (Upcoming)"** — Menampilkan daftar les tatap muka yang sudah terjadwal dan siap dilaksanakan.
2. **Tab 2: "Riwayat Selesai (Completed)"** — Menampilkan arsip sesi les yang telah selesai dilaksanakan beserta catatan guru.
3. **Empty State**: Tampilan informatif jika siswa belum memiliki jadwal aktif dengan tombol ajakan "Cari Guru Privat Sekarang".

---

## Struktur Layar & Komponen

1. **Header & Student Profile Overview**:
   - Welcome Banner:
     - Sapaan: "Halo, Fajar Pratama & Ibu Rina 👋"
     - Subtitle: "Siswa Aktif: **Jenjang SD Kelas 5** • Alamat Belajar: **Tebet Barat, Jakarta Selatan**"
   - Quick Action CTA:
     - Tombol Primer Merah: "+ Pesan Sesi Les Baru" (`/student/search`) (`#DC2626`)

2. **Statistik Belajar Singkat (3 Metric Cards Grid)**:
   - Card 1: **Total Sesi Belajar**: `8 Pertemuan`
   - Card 2: **Guru Privat Terhubung**: `2 Pengajar` (Kak Sarah Amanda & Kak Budi Santoso)
   - Card 3: **Jadwal Sesi Terdekat**: `Senin, 10 Ags • 16:00 WIB` (Hitung Mundur: 2 Hari Lagi)

3. **Konten Utama: Tab Sesi Belajar (Upcoming vs History)**:
   - **Tab 1: Sesi Mendatang (`Tab: Upcoming`)**:
     - **Kartu Sesi Aktif 1 (Next Session)**:
       - Header: Badge `✓ Terkonfirmasi` (Emerald `#16A34A`) + Kode Booking `#HPN-0810-77`
       - Waktu: **Senin, 10 Agustus 2026 • 16:00 - 18:00 WIB**
       - Pengajar: **Sarah Amanda, S.Pd.** (Badge: Guru Matematika SD Terverifikasi)
       - Topik Pembelajaran: "Pecahan Campuran & Pembagian Bersusun"
       - Lokasi Belajar: "Di Rumah Siswa (Jl. Tebet Barat Dalam IV No. 14)"
       - Tombol Aksi Cepat:
         - Tombol Hijau: "Hubungi Pengajar via WA" (`#16A34A`)
         - Tombol Sekunder: "Detail Tiket / Reschedule"
     - **Kartu Sesi Aktif 2**:
       - Waktu: **Kamis, 13 Agustus 2026 • 16:00 - 18:00 WIB**
       - Pengajar: **Sarah Amanda, S.Pd.** (Materi: Latihan Soal Tematik & IPA)
   - **Tab 2: Riwayat Sesi Selesai (`Tab: History`)**:
     - Tabel / Kartu Sesi Lampau:
       - Sesi 3 Agustus 2026: Matematika Dasar (Tutor: Sarah Amanda) — *Status: Selesai • Ulasan: ⭐ 5.0*
       - Sesi 27 Juli 2026: IPA Tematik (Tutor: Budi Santoso) — *Status: Selesai • Ulasan: ⭐ 5.0*
   - **Empty State (Jika tidak ada jadwal)**:
     - Ilustrasi kalender bersih.
     - Teks: "Anda belum memiliki jadwal les mendatang."
     - Tombol: "Temukan Guru & Pilih Tanggal Belajar"

4. **Profil Pengajar Favorit / Terhubung (Connected Tutors Mini-Section)**:
   - Kartu ringkas pengajar yang pernah mengajar siswa ini, dengan tombol cepat "Pesan Jadwal Lagi".

---

## Stitch Master Prompt (Copy-Ready)

```text
Create a modern, clean student activity and bookings dashboard screen for "Home Private Nusantara".

DESIGN SYSTEM (REQUIRED - FROM BRAND LOGO):
- Platform: Responsive Web Dashboard (Desktop 1440px with a clean header, max-width 1200px).
- Background: Slate Canvas (#F8FAFC).
- Surface: Pure White (#FFFFFF) cards with 1px border (#E2E8F0) and subtle elevation.
- Primary Brand: Nusantara Deep Navy (#0B2545) for headers and card containers.
- High-Conversion CTA: Nusantara Crimson Red (#DC2626) for "+ Pesan Sesi Les Baru" button.
- Growth & Verified Accent: Nusantara Emerald Green (#16A34A) for confirmed status badges and contact buttons.
- Typography: Outfit (Headings) and Geist (Body, tabular 24-hour time slots).

PAGE STRUCTURE:
1. HEADER OVERVIEW: Greeting "Halo, Fajar Pratama & Ibu Rina", student grade badge "SD Kelas 5", home address summary, and a prominent Crimson Red button "+ Pesan Sesi Les Baru" (#DC2626).
2. METRIC SUMMARY CARDS: 3 cards showing "Total Sesi (8 Pertemuan)", "Guru Terhubung (2 Pengajar)", and "Sesi Terdekat (Senin, 10 Ags • 16:00 WIB - 2 Hari Lagi)".
3. BOOKINGS TAB SECTION:
   - Segmented tab bar with "Sesi Mendatang (2)" [Active] and "Riwayat Selesai (6)".
   - UPCOMING SESSIONS LIST:
     * Card 1: Emerald status badge "Terkonfirmasi", booking ID "#HPN-0810-77", scheduled date & 24h time "Senin, 10 Agustus 2026 • 16:00 - 18:00 WIB", tutor profile (Avatar, "Sarah Amanda, S.Pd.", badge "Tutor Terverifikasi"), subject topic "Pecahan Campuran & Pembagian Bersusun", home address, and a direct green WhatsApp button.
     * Card 2: Thursday session card with similar structured layout.
   - COMPLETED SESSIONS LIST (in tab 2): Clean history table with date, tutor name, topic taught, completed status tag, and parent 5-star rating review.
4. CONNECTED TUTORS STRIP: A bottom section showing quick profile cards of previously booked tutors with a one-click "Pesan Jadwal Lagi" CTA button.

BANNED: No emojis, no neon glow, clean tabular structure with clear typography.
```
