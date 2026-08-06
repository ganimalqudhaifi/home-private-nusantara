# Screen 06: Pencarian Pengajar, Date Picker & Pemesanan Jadwal Siswa (Student Search & Booking Flow)

## Metadata & Konteks
- **Routes yang Digabung**:
  - `/student/search` (Halaman Filter Kelas SD/SMP, Date Picker Kalender Ketersediaan, & Daftar Tutor Cocok)
  - `/student/booking/confirm` (State Modal Review Ringkasan Pemesanan)
  - `Modal Sukses Reservasi` (State Tiket Konfirmasi Booking Berhasil & Info Kontak WA)
- **User Role**: Siswa / Orang Tua Murid
- **Tujuan**: Memungkinkan orang tua atau siswa mencari guru privat yang cocok secara instan dengan memilih jenjang/kelas (SD 1-6 / SMP 7-9) dan memilih tanggal di kalender *date picker*, meninjau profil pengajar, memilih slot jam, serta menyelesaikan reservasi melalui modal terpadu tanpa berpindah halaman.

---

## Design System Tokens
- **Platform**: Web Responsive (Desktop 1440px / Mobile 375px)
- **Background**: `#F8FAFC` (Slate Canvas)
- **Surface**: `#FFFFFF` (Pure White) with 1px border `#E2E8F0`
- **Primary Accent**: `#1E3A8A` (Nusantara Blue)
- **Secondary / Highlight Accent**: `#D97706` (Warm Amber - active date highlight in date picker)
- **Verified Badge**: `#059669` (Emerald Green)
- **Typography**: Outfit (Headings) and Geist (Body, Slot tags, Date picker grid)

---

## State & Transisi Komponen

```text
[Filter Kelas & Pilih Tanggal di Date Picker]
                      │
                      ▼
[Daftar Kartu Pengajar Cocok Tampil] ──► (Klik "Konek / Booking Jadwal")
                                                   │
                                                   ▼
                                [STATE MODAL 1: Review Ringkasan Booking]
                                                   │
                                                   ▼ (Klik "Konfirmasi & Konek")
                                [STATE MODAL 2: Tiket Reservasi Sukses]
```

---

## Struktur Layar & Komponen

1. **Header & Filter Pencarian Cepat (Top Filter Bar)**:
   - Judul: "Cari Guru Les Privat SD & SMP Terverifikasi"
   - Segmented Jenjang & Sub-Kelas Picker:
     - Jenjang: `[ Jenjang SD ]` vs `[ Jenjang SMP ]`
     - Sub-Kelas Pill: `[Kelas 1]` `[Kelas 2]` `[Kelas 3]` `[Kelas 4]` `[Kelas 5 (Aktif)]` `[Kelas 6]`
   - Lokasi Wilayah: Dropdown Wilayah (e.g., "Jakarta Selatan & Sekitarnya").

2. **Tampilan 2 Kolom Interaktif (Date Picker vs Hasil Pengajar)**:
   - **Kolom Kiri (Date Picker Kalender Interaktif - Sticky)**:
     - Judul: "Pilih Tanggal Belajar"
     - Kalender Bulan (Agustus 2026):
       - Header Hari: Min, Sen, Sel, Rab, Kam, Jum, Sab.
       - Tanggal dengan Slot Guru Tersedia: Diberi lingkaran highlight kuning-emas/amber (`bg-amber-100 text-amber-900 font-semibold ring-2 ring-amber-500`) beserta dot indikator.
       - Tanggal Dipilih: `Senin, 10 Agustus 2026` (Nusantara Blue solid circle `#1E3A8A`).
       - Keterangan Legenda:
         - 🟡 `Tersedia Slot Guru`
         - 🔵 `Tanggal Pilihan Anda`
         - ⚪ `Tidak Ada Guru / Penuh`
   - **Kolom Kanan (Daftar Kartu Pengajar yang Tersedia)**:
     - Teks Status: "Menampilkan 3 Pengajar Terverifikasi untuk **SD Kelas 5** pada **Senin, 10 Agustus 2026**"
     - **Kartu Pengajar 1 (Featured Match)**:
       - Foto Profil Pengajar, Nama: **Sarah Amanda, S.Pd.**
       - Badge Hijau: `✓ Terverifikasi Admin (Lulus Wawancara)`
       - Latar Belakang: "S1 Pendidikan Matematika - Universitas Indonesia (IPK 3.85)"
       - Pengalaman: "Spesialis bimbingan matematika dasar, olimpiade SD, dan IPA terpadu (3+ tahun pengalaman)."
       - Tag Jenjang Diampu: `SD Kelas 1-6` `SMP Kelas 7-8`
       - Pilihan Slot Jam yang Tersedia di Hari Ini:
         - Slot A: `[ 14:00 - 16:00 WIB ]` (Tersedia)
         - Slot B: `[ 16:00 - 18:00 WIB (Dipilih) ]` (Active Border Blue)
         - Slot C: `[ 19:00 - 21:00 WIB ]` (Tersedia)
       - Rating & Review: `⭐ 4.9 (24 sesi sukses)`
       - Tombol Aksi: **"Konek / Booking Jadwal Ini"** (Primary Blue `#1E3A8A`)
     - **Kartu Pengajar 2**:
       - Budi Santoso, M.Pd. — Tutor IPA & Matematika SD (Slot: `10:00 - 12:00 WIB`, `13:00 - 15:00 WIB`).
     - **Kartu Pengajar 3**:
       - Nadia Safitri, S.Si. — Tutor Tematik & Bahasa SD (Slot: `15:00 - 17:00 WIB`).

3. **State Modal 1: Review Ringkasan Booking (Confirmation Modal)**:
   - *Terbuka saat tombol "Konek / Booking Jadwal Ini" ditekan*:
   - Judul Modal: "Tinjau & Konfirmasi Jadwal Les Privat"
   - Ringkasan Rincian:
     - Pengajar: "Sarah Amanda, S.Pd."
     - Murid: "Fajar Pratama (SD Kelas 5)"
     - Tanggal & Waktu: "Senin, 10 Agustus 2026 • 16:00 - 18:00 WIB"
     - Lokasi Belajar: "Jl. Tebet Barat Dalam IV No. 14, Tebet, Jakarta Selatan"
     - Kontak Wali: "Ibu Rina Kartika (+62 812-3456-7890)"
   - Catatan Permintaan Khusus: Textarea input opsional ("Materi yang ingin diprioritaskan").
   - Notice: "Dengan mengonfirmasi, slot waktu ini akan langsung dikunci di kalender pengajar untuk mencegah bentrok jadwal."
   - Tombol Aksi:
     - Tombol Batal: "Ubah Pilihan"
     - Tombol Utama: "Konfirmasi & Konek Sekarang" (Icon: Check, Primary Blue).

4. **State Modal 2: Tiket Reservasi Sukses (Success State Modal)**:
   - *Tampil setelah konfirmasi booking berhasil dibuat*:
   - Ikon Sukses: Centang hijau animasi dengan efek confetti halus.
   - Judul: "Reservasi Belajar Berhasil Terhubung! 🎉"
   - Kode Tiket: `#HPN-BOOK-2026-0810-77`
   - Ringkasan Tiket Reservasi: Nama Pengajar, Tanggal, Jam, dan Alamat Rumah Siswa.
   - Petunjuk Langkah Selanjutnya:
     - "Tim Admin dan Pengajar kami akan mengontak Anda melalui WhatsApp resmi untuk konfirmasi kehadiran tatap muka."
   - Tombol Aksi:
     - Tombol Primer: "Lihat di Dashboard Siswa" (`/student/dashboard`)
     - Tombol Sekunder: "Chat WhatsApp Official Admin"

---

## Stitch Master Prompt (Copy-Ready)

```text
Create a modern, comprehensive student search and booking screen for "Home Private Nusantara" featuring an interactive date picker calendar, matched verified tutor cards, and overlay booking confirmation modals.

DESIGN SYSTEM (REQUIRED):
- Platform: Responsive Web (Desktop 1440px viewport with a 2-column search layout).
- Background: Slate Canvas (#F8FAFC).
- Surface: Pure White (#FFFFFF) cards with 1px border (#E2E8F0) and subtle elevation.
- Primary Accent: Nusantara Deep Blue (#1E3A8A) for primary booking buttons and active date highlights.
- Highlight Accent: Warm Amber (#D97706) for dates with available tutors and rating stars.
- Verified Badge: Emerald Green (#059669).
- Typography: Outfit (Headings) and Geist (Body, 24-hour time slots, calendar numbers).

PAGE STRUCTURE:
1. TOP FILTER BAR: Page heading "Cari Guru Les Privat SD & SMP", segmented radio selector for "Jenjang SD" and "Jenjang SMP", dynamic sub-class pills (Kelas 1 to 6 with Kelas 5 active), and a location area dropdown.
2. TWO-COLUMN INTERACTIVE CONTENT:
   - LEFT COLUMN (Sticky Date Picker Calendar):
     * Interactive monthly calendar grid for "Agustus 2026".
     * Available teaching dates highlighted with amber circles and dot indicators.
     * Selected date "Senin, 10 Agustus 2026" indicated with a solid dark blue circle.
     * Calendar legend clarifying Available, Selected, and Unavailable dates.
   - RIGHT COLUMN (Matched Tutors List):
     * Result counter: "3 Pengajar Tersedia untuk SD Kelas 5 pada Senin, 10 Agustus 2026".
     * Primary Tutor Card (Sarah Amanda, S.Pd.):
       - Avatar, Name, Green badge "Terverifikasi Admin (Lolos Wawancara)".
       - Background credentials: "S1 Pendidikan Matematika - Universitas Indonesia".
       - Tags: "SD Kelas 1-6", "SMP Kelas 7-8", "Rating 4.9/5.0 (24 sesi)".
       - Available 24-hour time slot pills: "14:00 - 16:00", "16:00 - 18:00 (Selected)", "19:00 - 21:00".
       - Large primary CTA button: "Konek / Booking Jadwal Ini".
     * Additional cards for other available tutors (Budi Santoso, Nadia Safitri).
3. MODAL STATE A (BOOKING REVIEW OVERLAY):
   - Centered confirmation dialog reviewing tutor name, student name ("Fajar Pratama - SD Kelas 5"), selected date & time ("Senin, 10 Agustus 2026, 16:00 - 18:00 WIB"), home address, and a primary button "Konfirmasi & Konek Sekarang".
4. MODAL STATE B (SUCCESS RESERVATION TICKET OVERLAY):
   - Success badge, reservation booking code "#HPN-BOOK-2026-0810", ticket summary card, instructions regarding WhatsApp confirmation, and a button "Buka Dashboard Siswa".

BANNED: No emojis as UI icons, no neon glows, no Inter font, clean tabular 24h slots.
```
