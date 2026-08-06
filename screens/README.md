# Home Private Nusantara — Stitch Screen Prompts Catalog

Koleksi prompt spesifikasi layar terstruktur untuk **Google Stitch** / **Stitch MCP**, dirancang untuk merealisasikan seluruh kebutuhan fungsional dan alur interaksi **Home Private Nusantara (PRD v1.1.0)**.

Layar-layar yang memiliki relasi erat telah digabungkan menjadi satu screen terpadu berbasis *multi-state* (Tab / Toggle / Modal / Drawer) untuk meminimalkan fragmentasi halaman dan meningkatkan konsistensi pengalaman pengguna.

---

## Daftar Screen Prompts

| File Prompt | Route Target | Role Akses | Fitur & State yang Dimuat |
| :--- | :--- | :--- | :--- |
| [`01-landing-page.md`](./01-landing-page.md) | `/` | Guest / Publik | **Landing Page Utama**: Hero asimetris, program SD (1–6) & SMP (7–9), alur kurasi 4 langkah, testimonial, dan sticky CTA. |
| [`02-auth-hub.md`](./02-auth-hub.md) | `/auth/login`<br>`/auth/register-student`<br>`/auth/register-tutor` | Guest / Auth | **Unified Auth Portal**: Tab switcher (Login terpadu, Form Siswa dinamis SD 1-6 & SMP 7-9 + nama wali, Form Pengajar baru). |
| [`03-tutor-portal.md`](./03-tutor-portal.md) | `/tutor/pending`<br>`/tutor/dashboard` | Pengajar | **Dashboard Pengajar Multi-State**: State A (Holding Banner Verifikasi Admin Offline) vs State B (Dashboard Tutor Verified & Statistik). |
| [`04-tutor-availability.md`](./04-tutor-availability.md) | `/tutor/availability` | Pengajar (Verified) | **Konfigurasi Ketersediaan**: Matriks jenjang & kelas yang diampu (SD/SMP), seleksi hari mingguan, builder multi-slot jam (24h), dan proteksi bentrok. |
| [`05-tutor-schedule.md`](./05-tutor-schedule.md) | `/tutor/schedule` | Pengajar (Verified) | **Kalender Mengajar**: Tampilan kalender jadwal aktif + Slide-over Drawer detail alamat domisili siswa dan materi belajar. |
| [`06-student-search-booking.md`](./06-student-search-booking.md) | `/student/search`<br>`/student/booking/confirm` | Siswa / Orang Tua | **Pencarian & Booking Terpadu**: Filter kelas SD/SMP + Date Picker interaktif + Kartu Pengajar + Modal Review Booking + Modal Tiket Sukses. |
| [`07-student-portal.md`](./07-student-portal.md) | `/student/dashboard`<br>`/student/my-bookings` | Siswa / Orang Tua | **Portal Belajar Siswa**: Tab Sesi Mendatang (*Upcoming*) & Riwayat Lampau (*History*), status tutor terhubung, dan kontak koordinasi WA. |
| [`08-admin-dashboard.md`](./08-admin-dashboard.md) | `/admin/dashboard` | Admin Terpusat | **Admin Control Hub**: Statistik KPI (Tutor Aktif/Pending, Siswa SD/SMP, Volume Booking), grafik tren, dan antrean verifikasi kilat. |
| [`09-admin-tutor-management.md`](./09-admin-tutor-management.md) | `/admin/tutors`<br>`/admin/tutors/[id]` | Admin Terpusat | **Manajemen Kurasi Tutor**: Tabel filter status + Audit Drawer berkas/wawancara + Modal Aksi (Verifikasi & Aktifkan / Tolak / Bekukan). |
| [`10-admin-students-bookings.md`](./10-admin-students-bookings.md) | `/admin/students`<br>`/admin/bookings` | Admin Terpusat | **Direktori Siswa & Monitoring Jadwal**: Tab data siswa & orang tua/wali + Kalender pemantauan seluruh jadwal sesi aktif se-Indonesia. |

---

## Panduan Penggunaan dengan Stitch

1. Buka file prompt `.md` yang diinginkan.
2. Salin seluruh isi blok pada bagian **"Stitch Master Prompt (Copy-Ready)"**.
3. Tempelkan (*paste*) langsung ke antarmuka **Google Stitch** atau panggil melalui tool MCP `generate_design`.
4. Semua prompt sudah menyertakan konteks token warna dari [`DESIGN.md`](./DESIGN.md) sehingga hasil generasi layar akan konsisten secara visual.
