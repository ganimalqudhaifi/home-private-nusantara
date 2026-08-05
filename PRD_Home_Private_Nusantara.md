# PRODUCT REQUIREMENT DOCUMENT (PRD)
## Home Private Nusantara — Platform Portal Les Privat Terpadu

---

### METADATA DOKUMEN
- **Nama Dokumen**: Product Requirement Document (PRD) - Home Private Nusantara
- **Versi**: 1.1.0
- **Status**: Ready for Development
- **Target Platform**: Web Responsive (Next.js & Supabase)
- **Terakhir Diperbarui**: 2026-08-05

---

## 1. PROBLEM DEFINITION

### 1.1 Latar Belakang & Masalah
Pasar pendidikan non-formal dan bimbingan belajar privat di Indonesia menghadapi tantangan utama:
1. **Kesulitan Menemukan Pengajar yang Tepat dan Terkualifikasi**: Orang tua murid jenjang SD dan SMP kesulitan memvalidasi latar belakang, kompetensi, serta kredibilitas guru privat jika mencari melalui kanal informal (media sosial atau rekomendasi mulut ke mulut).
2. **Ketiadaan Standar Kurasi Pengajar**: Banyak platform memperbolehkan siapa saja langsung mengajar tanpa tahapan seleksi, wawancara, dan verifikasi berkas identitas yang memadai.
3. **Ketidakcocokan Jadwal yang Tidak Efisien**: Proses pencocokan jadwal antara ketersediaan waktu luang pengajar dengan kebutuhan waktu belajar siswa seringkali memakan waktu berhari-hari melalui chat manual.
4. **Segmentasi Kebutuhan Belajar yang Spesifik**: Kebutuhan pembelajaran sangat spesifik berdasarkan tingkatan jenjang pendidikan dasar dan menengah pertama (SD Kelas 1-6 dan SMP Kelas 7-9), di mana setiap pengajar memiliki keahlian dan kapasitas mengajar yang berbeda (bisa mengajar satu jenjang tertentu, multi-jenjang SD & SMP, atau kelas spesifik).

### 1.2 Ruang Lingkup Proyek (Project Scope)
Pengembangan portal web **Home Private Nusantara** mencakup:
- **Landing Page Publik**: Memperkenalkan profil bisnis, keunggulan, alur kerja, dan katalog layanan program SD dan SMP.
- **Modul Registrasi & Profil Siswa**: Pendaftaran siswa dengan segmentasi berjenjang (SD 1-6 dan SMP 7-9) beserta data nama orang tua/wali dan alamat domisili.
- **Modul Registrasi & Manajemen Pengajar**: Pendaftaran tutor baru dengan status awal tertahan (*pending*), pengelolaan kompetensi jenjang/kelas yang diampu (SD dan/atau SMP), serta pengaturan slot hari dan jam ketersediaan mengajar.
- **Modul Panel Admin Terpusat**: Manajemen akun pengajar, proses verifikasi status akun (dari *pending* menjadi *verified* setelah proses wawancara/seleksi *offline* selesai), serta monitoring platform.
- **Modul Pencarian, Date Picker & Booking**: Fitur bagi siswa/orang tua untuk memfilter jenjang/kelas (SD/SMP), memilih tanggal ketersediaan (*date picker*), melihat daftar pengajar yang siap mengajar pada jadwal tersebut, dan melakukan reservasi/koneksi.

### 1.3 Konteks Bisnis
Home Private Nusantara memposisikan diri sebagai penyedia layanan les privat premium terpercaya dengan model bisnis *curated marketplace* yang berfokus pada fondasi pendidikan dasar (SD) dan menengah pertama (SMP). Kunci pembeda platform ini adalah proses verifikasi *hybrid*: pendaftaran dilakukan secara digital melalui web, proses seleksi/wawancara dilakukan oleh tim operasional secara mendalam di luar sistem (*offline-to-online verification*), dan aktivasi akun dilakukan secara terpusat oleh Admin melalui panel kontrol.

### 1.4 Tujuan Utama (Primary Objectives)
1. Menyediakan platform penghubung yang aman, transparan, dan terverifikasi antara siswa SD/SMP dan pengajar privat di seluruh Indonesia.
2. Memfasilitasi pendaftaran terstruktur untuk siswa berdasarkan jenjang (SD/SMP) dan kelas spesifik (SD 1-6, SMP 7-9).
3. Mengotomatisasi sistem pencocokan jadwal belajar-mengajar melalui kalender ketersediaan dinamis.
4. Memberikan kendali penuh kepada manajemen pusat melalui Panel Admin dalam mengontrol kualitas pengajar yang diaktifkan di platform.

---

## 2. BUSINESS ALIGNMENT

### 2.1 Tujuan Bisnis (Business Goals)
- **Kualitas Tutor Terjamin**: 100% pengajar aktif pada platform telah lolos verifikasi berkas dan wawancara oleh tim admin.
- **Efisiensi Pencocokan Jadwal**: Mengurangi waktu pencarian dan pencocokan guru privat dari rata-rata 2-3 hari menjadi kurang dari 3 menit melalui sistem *date picker* terintegrasi.
- **Fokus Segmentasi Pendidikan**: Menguasai pasar bimbingan privat SD dan SMP dengan materi kurikulum yang terstandardisasi dan tutor yang terspesialisasi.
- **Tingkat Retensi Pengguna**: Membangun ekosistem belajar yang berkelanjutan dengan target retensi siswa mencapai > 60% untuk sesi berulang.

### 2.2 Metrik Keberhasilan (Success Metrics / KPIs)
| Metrik | Definisi | Target Periode Awal (Q1) |
| :--- | :--- | :--- |
| **Registration Conversion Rate** | Persentase pengunjung landing page yang mendaftar (siswa/tutor) | > 8% dari total unique visitors |
| **Tutor Verification Turnaround Time** | Waktu dari registrasi tutor hingga approval/rejection oleh Admin | Rata-rata < 48 Jam kerja |
| **Booking Match Rate** | Persentase pencarian siswa pada date picker yang menghasilkan booking | > 70% |
| **Schedule Conflict Rate** | Tingkat insiden bentrok jadwal antar-siswa pada satu pengajar | 0% (Zero double-booking) |
| **User Satisfaction (CSAT)** | Skor kepuasan pengguna setelah sesi belajar/koneksi | Min. 4.6 / 5.0 |

### 2.3 Batasan Ruang Lingkup (Scope Boundaries)
#### In-Scope (Fase Saat Ini):
- Web responsive (Desktop, Tablet, Mobile) berbasis Next.js.
- Database & Autentikasi berbasis Supabase.
- Layanan khusus jenjang SD (Kelas 1-6) dan SMP (Kelas 7-9).
- Landing page informatif dan konversi.
- Autentikasi pengguna berbasis multi-peran (Siswa, Pengajar, Admin).
- Alur verifikasi status pengajar oleh Admin (*Pending*, *Verified*, *Rejected*, *Suspended*).
- Konfigurasi ketersediaan hari dan jam oleh Pengajar.
- Mesin filter jadwal & *date picker* untuk Siswa.
- Panel Admin untuk manajemen pengajar dan data pengguna.

#### Out-of-Scope (Fase Berikutnya / Future Roadmap):
- Jenjang SMA (Sekolah Menengah Atas) dan persiapan masuk perguruan tinggi (di luar cakupan saat ini).
- *Payment gateway* otomatis direct-checkout di web (pada fase ini, konfirmasi pembayaran dan rincian transaksi dikoordinasikan melalui notifikasi/kontak admin atau alur pembayaran terpisah).
- *In-app video conferencing* (sesi les dilakukan secara tatap muka di rumah siswa atau menggunakan tautan eksternal seperti Google Meet / Zoom).
- Aplikasi *native mobile* (iOS / Android terpisah di App Store/Play Store).
- Modul ujian dan bank soal otomatis di dalam portal.

### 2.4 Asumsi & Dependensi Bisnis
- **Asumsi 1**: Tim admin internal memiliki SOP wawancara dan verifikasi dokumen identitas/akademik di luar sistem sebelum mengubah status tutor menjadi *verified*.
- **Asumsi 2**: Pengajar memperbarui jadwal ketersediaan (*availability slot*) mingguan secara berkala.
- **Asumsi 3**: Pengguna memiliki akses koneksi internet stabil dan nomor kontak (WhatsApp/Email) aktif untuk konfirmasi koordinasi les.
- **Dependensi Teknologi**: Ketersediaan layanan Supabase (Auth, PostgreSQL DB, Row-Level Security) dan Next.js Hosting (Vercel/Cloud Provider).

---

## 3. USER UNDERSTANDING

### 3.1 User Personas

#### Persona 1: Orang Tua Siswa SD
- **Nama**: Ibu Rina (Orang tua dari Fajar, Siswa SD Kelas 5)
- **Karakteristik**: Orang tua pekerja yang membutuhkan guru les privat sabar, berpengalaman mengajar kurikulum SD, dan tersedia pada hari Sabtu dan Minggu pagi.
- **Tujuan (Goals)**: Menemukan guru privat terpercaya untuk anaknya dengan jadwal fleksibel tanpa proses administrasi yang rumit.
- **Kendala (Pain Points)**: Takut mendapatkan guru yang tidak terverifikasi, lelah bertanya manual ke berbagai lembaga bimbel mengenai jadwal kosong guru.

#### Persona 2: Calon Pengajar / Tutor
- **Nama**: Sarah Amanda (Mahasiswi Tingkat Akhir Pendidikan Matematika & IPA)
- **Karakteristik**: Memiliki keahlian mengajar matematika dan sains untuk tingkat SD (Kelas 4-6) dan SMP (Kelas 7-9). Hanya memiliki waktu luang pada hari Senin dan Kamis sore.
- **Tujuan (Goals)**: Mendapatkan murid les privat sesuai keahlian jenjangnya (SD & SMP) dan mengatur jadwal mengajar agar tidak bentrok dengan perkuliahan.
- **Kendala (Pain Points)**: Sulit memasarkan diri sendiri secara profesional; butuh kepastian bahwa akun dan jadwalnya dikelola dengan baik.

#### Persona 3: Super Admin / Tim Operasional
- **Nama**: Dewi (Operations & Quality Control Manager)
- **Karakteristik**: Bertanggung jawab menjaga mutu dan keamanan platform Home Private Nusantara.
- **Tujuan (Goals)**: Meninjau pendaftar pengajar baru, menjalankan prosedur verifikasi berkas dan wawancara, lalu menyetujui akses mengajar dalam satu panel terpusat.
- **Kendala (Pain Points)**: Data pendaftar tercecer jika menggunakan spreadsheet manual; butuh sistem terpusat untuk melihat profil tutor dan mengubah status akunnya.

### 3.2 User Roles & Hak Akses (RBAC)

| Peran (Role) | Hak Akses Utama |
| :--- | :--- |
| **Guest / Pengunjung** | Melihat Landing Page, melihat informasi profil perusahaan, memilih alur pendaftaran (Siswa atau Pengajar). |
| **Siswa (Terdaftar)** | Mengelola profil siswa (Nama, Nama Wali, Alamat, Jenjang SD/SMP, Kelas), mencari pengajar via date picker, melakukan booking sesi mengajar, melihat riwayat booking. |
| **Pengajar Pending** | Login ke portal, melihat status akun "Menunggu Verifikasi Admin", melengkapi profil pengajar dasar, **tidak dapat** menerima booking atau muncul di pencarian publik. |
| **Pengajar Verified** | Mengatur kategori/jenjang mengajar (SD dan/atau SMP) & kelas yang diampu, menentukan ketersediaan hari dan jam, melihat jadwal sesi mengajar yang telah dibooking siswa. |
| **Admin Terpusat** | Akses penuh ke Panel Admin: melihat seluruh daftar pengajar & siswa, memfilter tutor pending, mengubah status tutor (*Verified*, *Rejected*, *Suspended*), memantau seluruh jadwal booking. |

---

## 4. FUNCTIONAL REQUIREMENTS

### 4.1 Modul 1: Landing Page & Pengenalan Perusahaan
- **ID**: `FR-LP-01`
- **Prioritas**: `P0 (Must Have)`
- **Deskripsi**: Menampilkan antarmuka publik yang mengenalkan Home Private Nusantara dengan fokus pada program SD dan SMP.
- **Spesifikasi Detail**:
  1. Header dengan navigasi: Home, Tentang Kami, Program Jenjang (SD & SMP), Cara Kerja, Kontak, Tombol Masuk/Daftar.
  2. Hero section dengan *Call-to-Action (CTA)* ganda: "Daftar Sebagai Siswa" dan "Gabung Sebagai Pengajar".
  3. Bagian keunggulan: Guru SD & SMP Terverifikasi & Terkurasi, Jadwal Fleksibel, Pilihan Kelas Lengkap (SD 1-6, SMP 7-9).
  4. Bagian penjelasan alur: Pendaftaran -> Verifikasi -> Pilih Jadwal -> Belajar.
  5. Footer dengan informasi legalitas, kontak WhatsApp official, media sosial, dan alamat operasional.
- **Dependensi**: Tidak ada.

### 4.2 Modul 2: Registrasi & Autentikasi Siswa
- **ID**: `FR-SIS-01`
- **Prioritas**: `P0 (Must Have)`
- **Deskripsi**: Menyediakan form registrasi khusus siswa dengan pemisahan jenjang SD dan SMP beserta sub-kelasnya.
- **Spesifikasi Detail**:
  1. Input data dasar: Nama Lengkap Siswa, Nama Orang Tua/Wali (wajib), Alamat Domisili Lengkap, Nomor Telepon/WhatsApp aktif, Email, Password.
  2. Pilihan Tingkat Pendidikan (Dropdown/Radio):
     - **SD**: Menampilkan pilihan sub-kelas `Kelas 1`, `Kelas 2`, `Kelas 3`, `Kelas 4`, `Kelas 5`, `Kelas 6`.
     - **SMP**: Menampilkan pilihan sub-kelas `Kelas 7`, `Kelas 8`, `Kelas 9`.
  3. Validasi otomatis: Format email valid, nomor WhatsApp format Indonesia (+62 / 08xxx), password min. 8 karakter.
  4. Pembuatan akun langsung aktif dengan role `siswa`.
- **Dependensi**: Supabase Auth & Users Table.

### 4.3 Modul 3: Registrasi & Alur Penahanan Akun Pengajar (*Pending Status*)
- **ID**: `FR-TUT-01`
- **Prioritas**: `P0 (Must Have)`
- **Deskripsi**: Pendaftaran mandiri calon pengajar dengan status akun tertahan (*pending review*).
- **Spesifikasi Detail**:
  1. Input data dasar pengajar: Nama Lengkap, Gelar/Pendidikan Terakhir, Universitas/Instansi, Alamat Lengkap, Nomor WhatsApp, Email, Password, Portofolio/Link CV/Sertifikat (opsional), Ringkasan Pengalaman Mengajar SD/SMP.
  2. Saat registrasi selesai, sistem menetapkan status pengajar: `status = "PENDING"`.
  3. Calon pengajar diarahkan ke halaman tunggu (*Holding State Screen*) yang berisi informasi:
     - *"Pendaftaran Berhasil. Akun Anda sedang dalam proses verifikasi oleh Tim Admin Home Private Nusantara."*
     - *"Tim kami akan menghubungi Anda melalui WhatsApp/Email untuk tahap wawancara dan verifikasi dokumen."*
  4. Akun dengan status `PENDING` dilarang mengakses modul pengaturan jadwal dan tidak akan diindeks pada mesin pencarian siswa.
- **Dependensi**: Supabase Auth, Tutors Table.

### 4.4 Modul 4: Panel Admin Terpusat & Sistem Verifikasi Pengajar
- **ID**: `FR-ADM-01`
- **Prioritas**: `P0 (Must Have)`
- **Deskripsi**: Panel khusus admin untuk mengelola pengajar dan memverifikasi akun setelah proses kurasi offline.
- **Spesifikasi Detail**:
  1. Autentikasi aman khusus akun dengan role `admin`.
  2. Dashboard Ringkasan: Total Pengajar Aktif, Total Pengajar Pending, Total Siswa SD & SMP, Total Booking.
  3. Manajemen Pengajar (Tabel & Detail):
     - Tab filter status: `All`, `Pending Verification`, `Verified`, `Rejected`, `Suspended`.
     - Halaman detail pengajar: melihat biodata lengkap, latar belakang pendidikan, nomor kontak, dan riwayat status.
  4. Aksi Admin:
     - **Tombol "Verifikasi & Aktifkan"**: Mengubah status menjadi `VERIFIED`. Pengajar mendapatkan hak akses penuh sebagai pengajar aktif.
     - **Tombol "Tolak Pendaftaran"**: Mengubah status menjadi `REJECTED` disertai input catatan alasan penolakan.
     - **Tombol "Bekukan Akun"**: Mengubah status menjadi `SUSPENDED` jika ada pelanggaran.
  5. Pencatatan log audit: mencatat admin ID dan timestamp saat status diubah.
- **Dependensi**: Modul 3 (FR-TUT-01), Supabase Role RLS.

### 4.5 Modul 5: Konfigurasi Preferensi Mengajar & Slot Ketersediaan Pengajar
- **ID**: `FR-TUT-02`
- **Prioritas**: `P0 (Must Have)`
- **Deskripsi**: Fitur bagi pengajar terverifikasi untuk menentukan kategori jenjang (SD/SMP), kelas yang diampu, dan jadwal ketersediaan mengajar.
- **Spesifikasi Detail**:
  1. **Pengaturan Kategori & Kelas yang Diampu**:
     - Pengajar dapat memilih satu jenjang (`SD` saja atau `SMP` saja), maupun keduanya (`SD` dan `SMP`).
     - Pengajar dapat mencentang kelas spesifik di tiap jenjang yang dipilih (contoh: SD Kelas 1-3, atau SD Kelas 4-6 + SMP Kelas 7-9).
  2. **Pengaturan Ketersediaan Hari & Jam (Availability Schedule)**:
     - Pilihan Hari Mingguan: `Senin`, `Selasa`, `Rabu`, `Kamis`, `Jumat`, `Sabtu`, `Minggu`.
     - Pilihan Slot Waktu per hari (dapat menambah multi-slot, format 24 jam, misal: 08:00 - 10:00, 14:00 - 16:00, 16:00 - 18:00, 19:00 - 21:00).
     - Pengajar dapat mengaktifkan atau menonaktifkan status ketersediaan kapan saja (*Toggle Active/Inactive*).
- **Dependensi**: Modul 4 (FR-ADM-01: Status Akun harus `VERIFIED`).

### 4.6 Modul 6: Pencarian Pengajar, Date Picker & Pemilihan Jadwal oleh Siswa
- **ID**: `FR-BOK-01`
- **Prioritas**: `P0 (Must Have)`
- **Deskripsi**: Alur siswa/orang tua menemukan guru privat berdasarkan jenjang (SD/SMP), kelas, dan tanggal ketersediaan.
- **Spesifikasi Detail**:
  1. **Filter Pencarian**:
     - Sistem secara otomatis menggunakan preferensi jenjang (SD/SMP) & kelas siswa yang tersimpan di profil, atau memungkinkan siswa mengubah filter jenjang & kelas tujuan.
  2. **Kalender Interaktif (Date Picker)**:
     - Siswa memilih tanggal belajar melalui kalender interaktif.
     - Kalender memberikan indikator visual (highlight) hari-hari di mana terdapat pengajar yang membuka slot ketersediaan (misal: jika ada pengajar yang buka Senin, Kamis, Sabtu, Minggu, hari-hari tersebut dapat diklik).
  3. **Hasil Pencarian Pengajar**:
     - Menampilkan daftar pengajar terverifikasi yang:
       a. Mengampu jenjang dan kelas yang dipilih siswa (SD 1-6 atau SMP 7-9).
       b. Memiliki slot ketersediaan pada hari yang bertepatan dengan tanggal pilihan siswa.
       c. Slot waktunya belum dibooking oleh siswa lain pada tanggal tersebut.
     - Kartu Pengajar memuat: Foto Profil, Nama Lengkap, Latar Belakang Pendidikan, Jenjang & Kelas yang Diampu, Slot Jam Tersedia pada tanggal tersebut.
  4. **Aksi Booking / Konek**:
     - Siswa memilih slot jam pengajar yang diinginkan.
     - Siswa menekan tombol **"Konek / Booking Jadwal"**.
     - Sistem membuat entri transaksi booking dengan status `CONFIRMED / PENDING_SESSION`.
     - Tampil modal konfirmasi dengan rincian jadwal, nama guru, alamat belajar, dan kontak koordinasi.
- **Dependensi**: Modul 2 (FR-SIS-01), Modul 5 (FR-TUT-02).

### 4.7 Modul 7: Dashboard Aktivitas Siswa & Pengajar
- **ID**: `FR-DSH-01`
- **Prioritas**: `P1 (Should Have)`
- **Deskripsi**: Halaman riwayat dan jadwal sesi aktif bagi siswa dan pengajar.
- **Spesifikasi Detail**:
  1. Dashboard Siswa: Menampilkan daftar jadwal belajar mendatang, nama instruktur terhubung, riwayat sesi lampau.
  2. Dashboard Pengajar: Menampilkan kalender mengajar, daftar siswa SD/SMP yang terhubung, rincian lokasi/alamat belajar siswa.
- **Dependensi**: Modul 6 (FR-BOK-01).

---

## 5. UX SPECIFICATION

### 5.1 Alur Pengguna Utama (Main User Flows)

#### Alur A: Registrasi & Verifikasi Pengajar (Tutor Onboarding Flow)
```text
[Landing Page] 
      │
      ▼ (Klik "Gabung Sebagai Pengajar")
[Form Registrasi Pengajar] ──(Submit Data)──► [Database: Status = PENDING]
                                                        │
                                                        ▼
                                         [Layar Status: Menunggu Verifikasi]
                                                        │
                                                        ▼ (Proses Offline: Seleksi/Interview oleh Tim)
                                                        │
[Panel Admin] ──(Admin Review Data & Klik "Verified")───┘
      │
      ▼
[Status Update: VERIFIED] ──► [Pengajar Login] ──► [Dashboard Pengajar]
                                                        │
                                                        ▼
                                         [Atur Jenjang (SD/SMP) & Slot Hari/Jam]
```

#### Alur B: Pencarian & Pemesanan Jadwal oleh Siswa (Student Booking Flow)
```text
[Landing Page / Login Siswa] ──► [Dashboard Siswa]
                                      │
                                      ▼
                        [Pilih Jenjang & Kelas (SD / SMP)]
                                      │
                                      ▼
                 [Buka Date Picker (Kalender Ketersediaan)]
                                      │
                                      ▼ (Pilih Tanggal Tertentu)
                [Sistem Query: Match Jenjang + Hari + Jam Kosong]
                                      │
                                      ▼
                      [Tampil Daftar Pengajar Tersedia]
                                      │
                                      ▼ (Klik Profil Tutor & Pilih Slot Jam)
                        [Halaman Konfirmasi Booking]
                                      │
                                      ▼ (Klik "Konek Sekarang")
              [Booking Tercipta ──► Notifikasi Konfirmasi Tampil]
```

### 5.2 Navigasi & Struktur Layar (Navigation Hierarchy)
1. **Public / Guest Screens**:
   - `/` : Landing Page utama (Hero, Keunggulan, Kategori Program SD & SMP, Testimoni, CTA).
   - `/auth/login` : Halaman Login terpadu (Siswa, Pengajar, Admin).
   - `/auth/register-student` : Form Registrasi Siswa bertingkat (SD Kelas 1-6 & SMP Kelas 7-9).
   - `/auth/register-tutor` : Form Registrasi Pengajar baru.
2. **Pengajar Screens**:
   - `/tutor/pending` : Layar notifikasi akun dalam peninjauan verifikasi admin.
   - `/tutor/dashboard` : Ringkasan jadwal mengajar dan status profil.
   - `/tutor/availability` : Form pemilihan jenjang (SD/SMP), kelas, hari mingguan, dan slot jam.
   - `/tutor/schedule` : Kalender dan daftar sesi mengajar aktif bersama siswa.
3. **Siswa Screens**:
   - `/student/dashboard` : Dashboard siswa dan pintasan pencarian tutor.
   - `/student/search` : Halaman filter jenjang SD/SMP, kelas, dan kalender *date picker*.
   - `/student/booking/confirm` : Layar tinjauan ringkasan sebelum reservasi dibuat.
   - `/student/my-bookings` : Riwayat jadwal dan sesi yang telah terhubung.
4. **Admin Screens**:
   - `/admin/dashboard` : Ringkasan metrik operasional.
   - `/admin/tutors` : Tabel kelola pengajar (Filter: Pending, Verified, Rejected, Suspended).
   - `/admin/tutors/[id]` : Halaman detail audit berkas dan tombol aksi verifikasi.
   - `/admin/students` : Tabel data siswa SD & SMP beserta alamat domisili.
   - `/admin/bookings` : Pemantauan seluruh jadwal sesi yang terjadi.

### 5.3 Spesifikasi UI States & Transisi Layar

#### 1. Empty States (Kondisi Data Kosong):
- **Empty State Hasil Pencarian Siswa**: Jika tidak ada instruktur yang cocok pada tanggal/kelas yang dipilih:
  - *Ilustrasi*: Ikon kalender kosong / pencarian.
  - *Pesan*: "Belum ada pengajar yang tersedia untuk [Kelas X SD/SMP] pada [Hari, Tanggal]."
  - *Aksi Rekomendasi*: Tombol "Pilih Tanggal Lain" atau "Lihat Hari Rekomendasi Pengajar".
- **Empty State Jadwal Pengajar**: Saat pengajar terverifikasi baru pertama kali membuka menu jadwal:
  - *Pesan*: "Anda belum mengatur jadwal mengajar. Tentukan hari dan jam luang Anda agar siswa dapat menemukan profil Anda."
  - *Aksi*: Tombol CTA utama "Atur Ketersediaan Sekarang".
- **Empty State Antrean Admin**: Jika tidak ada pendaftar pengajar baru:
  - *Pesan*: "Semua pendaftaran telah diproses. Tidak ada pengajar dalam status pending."

#### 2. Loading States (Kondisi Memuat Data):
- **Date Picker Loading**: Menampilkan efek *skeleton loading* pada kartu daftar pengajar saat tanggal baru diklik.
- **Form Submission**: Tombol aksi utama (Daftar, Simpan Jadwal, Konek) menampilkan status `Disabled` dengan *spinner animation* dan teks seperti *"Memproses Reservasi..."*.
- **Admin Table Loading**: Menampilkan 5 baris *skeleton shimmer* saat memuat data tabel pengajar.

#### 3. Success States:
- **Registrasi Pengajar Sukses**: Pop-up banner transisi ke halaman `/tutor/pending` dengan ikon centang hijau dan estimasi waktu tindak lanjut 1x24 jam.
- **Booking Berhasil**: Modal animasi sukses memunculkan tiket reservasi dengan detail: Nama Pengajar, Tanggal, Jam, dan Nomor WhatsApp resmi untuk koordinasi lanjutan.

#### 4. Error & Alert States:
- **Banner Peringatan Akun Pending**: Jika pengajar pending mencoba mengakses URL `/tutor/availability`, sistem menampilkan banner kuning: *"Akun Anda masih dalam status verifikasi. Fitur ini akan terbuka otomatis setelah akun diverifikasi oleh Admin."*
- **Error Bentrok Slot**: Toast merah jika slot waktu telah diambil siswa lain sesaat sebelum tombol ditekan: *"Maaf, slot waktu ini baru saja dipesan oleh siswa lain. Silakan pilih slot jam berikutnya."*

### 5.4 Perilaku Validasi Interaksi Formulir (Interaction-level Validation)
- **Kategori Siswa Dinamis (SD & SMP)**: Saat Siswa memilih radio button "SD", dropdown kelas secara dinamis terisi "Kelas 1" s/d "Kelas 6". Jika berganti ke "SMP", dropdown otomatis tereset dan berganti pilihan "Kelas 7" s/d "Kelas 9".
- **Real-time Input Validation**:
  - Kolom Email: Validasi regex email standar pada event `onBlur`.
  - Kolom WhatsApp: Otomatis mengubah awalan `08` menjadi format standar, menolak karakter selain angka.
  - Password: Indikator kekuatan password minimal 8 karakter kombinasi huruf dan angka.
- **Ketersediaan Pengajar**: Mencegah pengajar menyimpan jadwal jika belum memilih minimal 1 jenjang (SD atau SMP) dan minimal 1 slot jam pada hari aktif.

---

## 6. EDGE CASES & PENANGANAN KONDISI KHUSUS

### 6.1 Permission & Authorization Scenarios
1. **Pengajar Belum Terverifikasi Mencoba Mengatur Jadwal**:
   - *Kasus*: Tutor dengan status `PENDING` atau `REJECTED` mengakses route `/tutor/availability` melalui manipulasi URL langsung.
   - *Penanganan*: *Middleware Next.js & Supabase RLS* memblokir akses dan me-redirect pengguna ke `/tutor/pending` disertai pesan status akun yang jelas.
2. **Siswa Mencoba Mengakses Panel Admin**:
   - *Kasus*: Akun dengan role `siswa` mengakses route `/admin/*`.
   - *Penanganan*: Sistem mengembalikan status HTTP `403 Forbidden` dan mengalihkan pengguna ke `/student/dashboard`.
3. **Tamu (Guest) Mencoba Melakukan Booking**:
   - *Kasus*: Pengunjung yang belum login memilih slot jadwal pengajar di antarmuka publik.
   - *Penanganan*: Sistem menyimpan parameter pilihan jadwal di *state / session storage*, lalu mengarahkan pengunjung ke `/auth/login` atau `/auth/register-student`, dan setelah autentikasi sukses langsung mengembalikan ke halaman konfirmasi booking.

### 6.2 Concurrency & Double Booking Prevention
1. **Dua Siswa Memilih Slot Waktu yang Sama Secara Bersamaan**:
   - *Kasus*: Siswa A dan Siswa B membuka profil Pengajar X pada hari yang sama dan menekan tombol booking untuk slot jam 16:00 - 18:00 pada detik yang hampir bersamaan.
   - *Penanganan*: Transaksi database menggunakan mekanisme *row-level locking / atomic transaction* di Supabase. Siswa pertama yang transaksinya terkonfirmasi akan mendapatkan slot tersebut, sedangkan Siswa kedua akan menerima pesan error ramah: *"Slot waktu ini baru saja dipesan. Silakan pilih waktu lain."* Kalender ketersediaan langsung di-refresh secara otomatis.

### 6.3 Boundary Conditions & Form Validation Edge Cases
1. **Pengajar Mengubah / Menghapus Ketersediaan yang Sudah Memiliki Jadwal Booking Aktif**:
   - *Kasus*: Pengajar menonaktifkan hari Kamis, padahal terdapat jadwal les aktif bersama Siswa Budi pada hari Kamis mendatang.
   - *Penanganan*: Sistem memvalidasi ketersediaan terhadap tabel booking aktif. Jika ada jadwal aktif, sistem menampilkan modal konfirmasi penolakan: *"Anda tidak dapat menghapus slot hari Kamis karena terdapat 1 sesi aktif bersama Siswa Budi. Harap hubungi Admin jika ingin melakukan pembatalan."*
2. **Pengajar Memilih Kategori Mengajar Parsial (*Partial Teaching Category*)**:
   - *Kasus*: Pengajar hanya ingin mengajar SD Kelas 4-6 dan SMP Kelas 7 (melewati jenjang/kelas lain).
   - *Penanganan*: Sistem data menyimpan relasi *many-to-many* antara tutor dan daftar kelas spesifik, sehingga mesin filter pencarian siswa bekerja akurat pada level kelas spesifik (misal: pencarian untuk SMP Kelas 7 akan menampilkan tutor tersebut, namun pencarian untuk SMP Kelas 9 tidak).
3. **Format Alamat Panjang & Karakter Khusus**:
   - *Kasus*: Siswa memasukkan alamat detail (RT/RW, patokan rumah) hingga 500 karakter.
   - *Penanganan*: Input textarea dibatasi maksimal 500 karakter dengan penghitung karakter *real-time* dan sanitasi string mencegah serangan XSS.

### 6.4 Failure & Error Recovery Scenarios
1. **Koneksi Terputus saat Submit Formulir Pendaftaran / Booking**:
   - *Penanganan*: Sistem menampilkan banner *offline warning*, form data tetap tersimpan di *local storage* formulir agar pengguna tidak perlu mengetik ulang saat koneksi tersambung kembali.
2. **Penolakan Akun Pengajar oleh Admin (*Rejected Account*)**:
   - *Penanganan*: Status akun berubah menjadi `REJECTED`. Saat tutor tersebut login, layar menampilkan pesan sopan mengenai alasan penolakan dan menyediakan tautan bantuan / kontak admin jika ingin mengajukan banding atau melengkapi dokumen.

---

## 7. ACCEPTANCE CRITERIA (BERDASARKAN BDD / GHERKIN)

### 7.1 AC-01: Landing Page & Pengenalan Perusahaan
- **Skenario 1.1**: Menampilkan informasi lengkap program SD & SMP dan tombol registrasi
  - **GIVEN** Pengunjung membuka alamat website utama Home Private Nusantara (`/`)
  - **WHEN** Halaman selesai dimuat
  - **THEN** Pengunjung melihat informasi tentang perusahaan, daftar layanan program SD dan SMP, dan 2 tombol CTA: "Daftar Sebagai Siswa" dan "Gabung Sebagai Pengajar".

### 7.2 AC-02: Registrasi Siswa dengan Segmentasi Kelas SD & SMP
- **Skenario 2.1**: Registrasi Siswa Jenjang SD Berhasil
  - **GIVEN** Calon siswa/wali berada di halaman `/auth/register-student`
  - **WHEN** Memilih jenjang "SD", memilih sub-kelas "Kelas 5", mengisi nama siswa, nama orang tua/wali, alamat domisili, nomor WhatsApp valid, email, dan password >= 8 karakter, lalu menekan "Daftar"
  - **THEN** Akun siswa berhasil dibuat di Supabase, diarahkan ke Dashboard Siswa (`/student/dashboard`), dan data profil tersimpan dengan jenjang `SD` dan kelas `5`.
- **Skenario 2.2**: Registrasi Siswa Jenjang SMP Berhasil
  - **GIVEN** Calon siswa/wali berada di halaman `/auth/register-student`
  - **WHEN** Memilih jenjang "SMP", memilih sub-kelas "Kelas 8", melengkapi seluruh data wajib, lalu menekan "Daftar"
  - **THEN** Akun siswa berhasil dibuat dengan jenjang `SMP` dan kelas `8`.
- **Skenario 2.3**: Validasi Gagal pada Formulir Siswa
  - **GIVEN** Calon siswa berada di form pendaftaran siswa
  - **WHEN** Mengosongkan kolom alamat atau nama wali murid, atau memasukkan format nomor telepon tidak valid
  - **THEN** Sistem menampilkan pesan error inline merah pada kolom terkait dan proses pendaftaran tidak dilanjutkan.

### 7.3 AC-03: Registrasi Pengajar & Penahanan Akun (Pending State)
- **Skenario 3.1**: Calon Pengajar Mendaftar Akun Baru
  - **GIVEN** Calon pengajar berada di halaman `/auth/register-tutor`
  - **WHEN** Mengisi formulir pendaftaran secara lengkap dan menekan tombol "Daftar Sebagai Pengajar"
  - **THEN** Akun pengajar dibuat dengan `status = "PENDING"`, sistem langsung mengarahkan ke halaman `/tutor/pending`, dan menampilkan pesan bahwa akun sedang dalam peninjauan admin.
- **Skenario 3.2**: Pengajar Pending Mencoba Mengakses Fitur Mengajar
  - **GIVEN** Pengajar berstatus `PENDING` telah login
  - **WHEN** Mencoba mengakses URL `/tutor/availability` secara langsung
  - **THEN** Sistem mencegah akses dan mengarahkan kembali ke `/tutor/pending` dengan notifikasi peringatan.

### 7.4 AC-04: Verifikasi Pengajar oleh Admin Terpusat
- **Skenario 4.1**: Admin Mengubah Status Pengajar Menjadi Verified
  - **GIVEN** Admin telah login dan berada di halaman detail pengajar pending `/admin/tutors/[id]`
  - **WHEN** Admin menekan tombol "Verifikasi & Aktifkan" setelah menyelesaikan tahap seleksi offline
  - **THEN** Status pengajar di database berubah menjadi `VERIFIED`, tercatat waktu verifikasi, dan pada saat pengajar tersebut login, mereka langsung mendapatkan akses ke Dashboard Pengajar dan pengaturan ketersediaan jadwal.
- **Skenario 4.2**: Admin Menolak Pendaftaran Pengajar
  - **GIVEN** Admin berada di halaman detail pengajar pending
  - **WHEN** Admin menekan tombol "Tolak Pendaftaran" dan memasukkan alasan penolakan
  - **THEN** Status pengajar berubah menjadi `REJECTED` dan pengajar tidak dapat menerima akses mengajar.

### 7.5 AC-05: Konfigurasi Ketersediaan oleh Pengajar Terverifikasi
- **Skenario 5.1**: Pengajar Menyimpan Pilihan Kategori SD/SMP dan Slot Waktu
  - **GIVEN** Pengajar berstatus `VERIFIED` berada di halaman `/tutor/availability`
  - **WHEN** Memilih kategori jenjang SD (Kelas 4-6) dan SMP (Kelas 7-9), mencentang hari ketersediaan "Senin" dan "Kamis", memilih slot waktu "16:00 - 18:00", lalu menekan "Simpan Pengaturan"
  - **THEN** Sistem menyimpan preferensi mengajar dan slot jadwal ke database, menampilkan toast sukses "Pengaturan ketersediaan berhasil disimpan".

### 7.6 AC-06: Pencarian Jadwal via Date Picker & Pemesanan oleh Siswa
- **Skenario 6.1**: Siswa Mencari Pengajar Berdasarkan Tanggal dan Kelas
  - **GIVEN** Siswa login dan membuka halaman pencarian `/student/search`
  - **WHEN** Memilih kelas "SD Kelas 5" dan memilih tanggal yang jatuh pada hari "Senin" di kalender *date picker*
  - **THEN** Sistem menampilkan daftar pengajar terverifikasi yang mengampu SD Kelas 5 dan memiliki slot ketersediaan aktif pada hari Senin.
- **Skenario 6.2**: Siswa Melakukan Booking Pengajar
  - **GIVEN** Siswa melihat hasil pencarian pengajar yang tersedia pada slot jam "16:00 - 18:00"
  - **WHEN** Siswa mengklik tombol "Konek / Booking Jadwal" dan mengonfirmasi reservasi pada pop-up modal
  - **THEN** Sistem mencatat transaksi booking di database, mengubah ketersediaan slot tersebut menjadi terisi, menampilkan notifikasi sukses beserta detail koordinasi, dan memunculkan sesi di Dashboard Siswa serta Dashboard Pengajar.

---

## 8. CONSISTENCY & GLOSARIUM

### 8.1 Glosarium Istilah
Untuk memastikan konsistensi pemahaman antara tim bisnis, desainer, dan pengembang perangkat lunak, istilah berikut digunakan secara seragam di seluruh dokumen dan antarmuka sistem:

| Istilah | Definisi Baku |
| :--- | :--- |
| **Home Private Nusantara** | Nama resmi entitas perusahaan dan platform portal web. |
| **Siswa** | Pengguna yang mendaftar untuk mencari dan memesan instruktur/guru les privat jenjang SD dan SMP. |
| **Pengajar / Instruktur / Tutor** | Pengguna yang mendaftar untuk memberikan jasa bimbingan belajar privat tingkat SD dan/atau SMP. |
| **Admin Terpusat** | Pengelola internal perusahaan yang memiliki otoritas penuh memvalidasi pendaftar dan memantau sistem. |
| **Status PENDING** | Kondisi akun pengajar baru yang belum diverifikasi oleh admin; akses fitur terbatas. |
| **Status VERIFIED** | Kondisi akun pengajar yang telah lolos verifikasi offline dan disetujui admin untuk mengajar aktif. |
| **Jenjang / Tingkat** | Kategori pendidikan formal yang didukung: Sekolah Dasar (SD) dan Sekolah Menengah Pertama (SMP). |
| **Kelas** | Sub-tingkatan spesifik (SD: 1-6, SMP: 7-9). |
| **Slot Ketersediaan (Availability Slot)** | Pasangan hari dan rentang jam di mana pengajar menyatakan diri bersedia mengajar. |
| **Date Picker** | Komponen UI kalender interaktif untuk memilih tanggal belajar spesifik. |
| **Booking / Konek** | Tindakan menghubungkan siswa dengan pengajar terpilih pada jadwal yang telah disepakati di sistem. |

### 8.2 Konvensi Perilaku & Antarmuka
- Semua format penulisan waktu menggunakan standar 24 Jam (contoh: `14:00 - 16:00 WIB`).
- Format tanggal antarmuka menggunakan bahasa Indonesia baku (contoh: `Senin, 17 Agustus 2026`).
- Semua status peninjauan akun menggunakan 4 terminologi standar: `PENDING`, `VERIFIED`, `REJECTED`, `SUSPENDED`.

---

## 9. MAINTAINABILITY & DOKUMENTASI SISTEM

### 9.1 Struktur Dokumen & Kemudahan Pembaruan
PRD ini disusun dengan arsitektur modular yang memisahkan definisi bisnis, spesifikasi fungsional per modul, spesifikasi UX per peran, penanganan kasus batas (*edge cases*), dan kriteria penerimaan berbasis BDD. Struktur ini dirancang agar setiap anggota tim (Frontend Developer, Backend Developer, QA Engineer, UI/UX Designer) dapat merujuk ke bagian yang relevan tanpa redundansi.

### 9.2 Riwayat Perubahan Dokumen (Changelog)

| Versi | Tanggal | Penulis | Deskripsi Perubahan |
| :--- | :--- | :--- | :--- |
| **v0.1.0** | 2026-08-05 | Product Owner | Inisiasi draft awal kebutuhan dasar sistem Home Private Nusantara. |
| **v1.0.0** | 2026-08-05 | Senior Product Manager | Finalisasi PRD lengkap: penambahan detail segmentasi, alur verifikasi admin terpusat, date picker ketersediaan tutor, matriks UX state, edge cases, dan BDD acceptance criteria. |
| **v1.1.0** | 2026-08-05 | Senior Product Manager | Penyesuaian segmentasi: eliminasi jenjang SMA, memfokuskan platform secara eksklusif pada jenjang SD (Kelas 1-6) dan SMP (Kelas 7-9). |

---
*Dokumen ini merupakan acuan resmi pengembangan produk Home Private Nusantara. Pembaruan ruang lingkup di masa mendatang wajib melalui persetujuan Tim Manajemen Produk.*
