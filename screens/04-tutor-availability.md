# Screen 04: Pengaturan Preferensi & Ketersediaan Pengajar (Tutor Availability Matrix)

## Metadata & Konteks
- **Route**: `/tutor/availability`
- **User Role**: Pengajar Terverifikasi (`Status = VERIFIED`)
- **Tujuan**: Memfasilitasi pengajar untuk memilih kategori jenjang pendidikan (SD dan/atau SMP) beserta sub-kelas spesifik yang diampu, serta mengonfigurasi slot ketersediaan rutin mingguan (hari dan multi-slot rentang jam dalam format 24 jam) dengan proteksi bentrok jadwal aktif.

---

## Design System Tokens (Derived from Logo.jpg)
- **Platform**: Web Responsive (Desktop 1440px / Tablet 768px / Mobile 375px)
- **Background**: `#F8FAFC` (Slate Canvas)
- **Surface Fill**: `#FFFFFF` (Pure White) with 1px border `#E2E8F0`
- **Primary Brand (HOME)**: `#0B2545` (Nusantara Deep Navy)
- **High-Impact CTA (PRIVATE)**: `#DC2626` (Nusantara Crimson Red)
- **Growth & Verified (NUSANTARA)**: `#16A34A` (Nusantara Emerald Green - active slot pills & checkmarks)
- **Active State Fill**: `#EFF6FF` (Soft Blue Tint with `border-blue-900`)
- **Alert / Warning**: `#DC2626` (Crimson for active booking collision warning)

---

## Struktur Layar & Komponen

1. **Header & Status Toggle Section**:
   - Judul Halaman: "Pengaturan Jenjang & Slot Ketersediaan Mengajar"
   - Deskripsi: "Tentukan tingkatan kelas yang ingin Anda bimbing serta hari dan jam luang Anda agar calon siswa dapat menemukan jadwal Anda di kalender pencarian."
   - Master Toggle Ketersediaan: `[Status: Aktif Menerima Siswa Baru ✓]` (Switch toggle On/Off dengan aksen Emerald Green `#16A34A`).

2. **Bagian 1: Matriks Jenjang & Kelas yang Diampu (Education Level & Class Matrix)**:
   - **Kategori SD (Sekolah Dasar)**:
     - Header Card dengan checkbox induk: `[x] Mengajar Jenjang SD`
     - Sub-Kelas Checkbox Grid (6 Kotak Pilihan):
       - `[x] Kelas 1` | `[x] Kelas 2` | `[x] Kelas 3` (Fase Fondasi)
       - `[x] Kelas 4` | `[x] Kelas 5` | `[x] Kelas 6` (Fase Lanjutan & Ujian)
       - Quick Action: "Pilih Semua SD" / "Reset SD".
   - **Kategori SMP (Sekolah Menengah Pertama)**:
     - Header Card dengan checkbox induk: `[x] Mengajar Jenjang SMP`
     - Sub-Kelas Checkbox Grid (3 Kotak Pilihan):
       - `[x] Kelas 7` | `[x] Kelas 8` | `[ ] Kelas 9`
       - Quick Action: "Pilih Semua SMP" / "Reset SMP".
   - *Catatan Validasi*: Pengajar wajib mencentang minimal 1 kelas agar profil dapat dipublikasikan.

3. **Bagian 2: Pengaturan Jadwal Ketersediaan Mingguan (Weekly Availability Scheduler)**:
   - **Pilihan 7 Hari Mingguan (Day Selector Cards)**:
     - `Senin` (Aktif - 2 Slot)
     - `Selasa` (Non-aktif - Istirahat)
     - `Rabu` (Non-aktif)
     - `Kamis` (Aktif - 2 Slot)
     - `Jumat` (Non-aktif)
     - `Sabtu` (Aktif - 3 Slot)
     - `Minggu` (Aktif - 2 Slot)
   - **Time Slot Builder per Hari Aktif (Format 24 Jam)**:
     - *Contoh Konfigurasi Hari Senin*:
       - Slot 1: `14:00 - 16:00 WIB` (Tombol Hapus Slot [x])
       - Slot 2: `16:00 - 18:00 WIB` (Terisi Booking Aktif: Siswa Fajar - Badge Lock)
       - Tombol "+ Tambah Slot Jam di Hari Senin"
     - *Contoh Konfigurasi Hari Sabtu*:
       - Slot 1: `08:00 - 10:00 WIB`
       - Slot 2: `10:00 - 12:00 WIB`
       - Slot 3: `14:00 - 16:00 WIB`
       - Tombol "+ Tambah Slot Jam"

4. **Bagian 3: Proteksi & Peringatan Jadwal Aktif (Edge Case Modal / Inline Alert)**:
   - Jika pengajar mencoba menonaktifkan hari yang sudah memiliki pesanan aktif:
     - Banner Peringatan Merah Crimson: "⚠️ Peringatan: Hari Senin memiliki 1 sesi aktif terkonfirmasi bersama Siswa Fajar Pratama. Anda tidak dapat menonaktifkan hari ini sebelum sesi diselesaikan atau dikoordinasikan ulang dengan Admin."

5. **Sticky Bottom Action Bar**:
   - Teks Ringkasan: "Total 4 Hari Aktif • 9 Slot Jam Tersedia • 8 Kelas Diampu (SD 1-6 & SMP 7-8)"
   - Tombol Batal: "Kembali ke Dashboard"
   - Tombol Utama: "Simpan Pengaturan Ketersediaan" (Nusantara Deep Navy `#0B2545`, white text).

---

## Stitch Master Prompt (Copy-Ready)

```text
Create a clean, intuitive web configuration screen for "Home Private Nusantara" where a verified private tutor sets their teaching categories (SD Kelas 1-6 and SMP Kelas 7-9) and their weekly recurring availability time slots.

DESIGN SYSTEM (REQUIRED - FROM BRAND LOGO):
- Platform: Responsive Web Dashboard (Desktop 1440px centered, max-width 1100px).
- Background: Slate Canvas (#F8FAFC).
- Surface: Pure White (#FFFFFF) cards with 1px border (#E2E8F0) and subtle elevation.
- Primary Brand: Nusantara Deep Navy (#0B2545) for save actions and active selection borders.
- Accent CTA: Nusantara Crimson Red (#DC2626) for active booking warnings.
- Growth Accent: Nusantara Emerald Green (#16A34A) for active toggle switches and checkmarks.
- Typography: Outfit (Headings) and Geist (Labels, 24-hour time slots, checkboxes).

PAGE STRUCTURE:
1. HEADER: Page title "Pengaturan Jenjang & Slot Ketersediaan Mengajar", description subtitle, and an active availability status toggle switch (On: "Menerima Pesanan", Emerald Green accent).
2. SECTION 1 - TEACHING GRADE MATRIX:
   - Card A (Jenjang SD): Checkbox header "Jenjang Sekolah Dasar (SD)", with 6 selectable class pills (Kelas 1, Kelas 2, Kelas 3, Kelas 4, Kelas 5, Kelas 6) all checked with active navy border.
   - Card B (Jenjang SMP): Checkbox header "Jenjang Sekolah Menengah Pertama (SMP)", with 3 selectable class pills (Kelas 7 [checked], Kelas 8 [checked], Kelas 9 [unchecked]).
3. SECTION 2 - WEEKLY AVAILABILITY SCHEDULER:
   - 7-day horizontal tab bar (Senin, Selasa, Rabu, Kamis, Jumat, Sabtu, Minggu) with active day indicator pills.
   - Detailed Day Schedule Panel (showing active days e.g., Senin & Sabtu):
     - Each active day displays a list of configurable 24-hour time slot chips (e.g. "14:00 - 16:00", "16:00 - 18:00 [Booked: Fajar]", "19:00 - 21:00").
     - Includes "+ Tambah Slot Jam" interactive button with start-time and end-time selectors.
     - Crimson lock badge on slots with active student bookings preventing accidental deletion.
4. SECTION 3 - ACTIVE BOOKING COLLISION NOTICE:
   - A crimson alert banner explaining that days with active student reservations cannot be disabled without admin coordination.
5. STICKY BOTTOM BAR: A floating bottom bar with a summary count ("4 Hari Aktif • 9 Slot Jam Tersedia") and a primary deep navy button "Simpan Pengaturan Ketersediaan" (#0B2545).

BANNED: No emojis, no neon borders, clear tabular 24-hour time format (HH:MM), structured grid.
```
