# Screen 09: Manajemen & Kurasi Pengajar Terpusat (Admin Tutor Management & Audit Drawer)

## Metadata & Konteks
- **Routes yang Digabung**:
  - `/admin/tutors` (Tabel Kelola Pengajar dengan Filter Status: All, Pending, Verified, Rejected, Suspended)
  - `/admin/tutors/[id]` (Slide-Over Audit Drawer Detail Berkas, Riwayat Pendidikan, & Catatan Wawancara)
  - `Action Modals` (Modal Aksi: Verifikasi & Aktifkan / Tolak dengan Alasan / Bekukan Akun)
- **User Role**: Admin Terpusat (`Role = ADMIN`)
- **Tujuan**: Memberikan kendali penuh kepada admin operasional untuk meninjau berkas pendaftar baru, mencatat hasil wawancara seleksi offline, mengubah status pengajar (`PENDING` -> `VERIFIED` / `REJECTED`), serta mengelola akun tutor aktif.

---

## Design System Tokens (Derived from Logo.jpg)
- **Platform**: Web Responsive (Desktop 1440px dengan Sidebar / Drawer Overlay)
- **Background**: `#F8FAFC` (Slate Canvas)
- **Surface**: `#FFFFFF` (Pure White) with 1px border `#E2E8F0`
- **Primary Brand (HOME)**: `#0B2545` (Nusantara Deep Navy)
- **High-Impact Accent (PRIVATE)**: `#DC2626` (Nusantara Crimson Red - for Rejection / Alert actions)
- **Growth & Verified (NUSANTARA)**: `#16A34A` (Nusantara Emerald Green - for Verification & Active status)
- **Status Badges**:
  - `PENDING`: `bg-amber-50 text-amber-800 border-amber-300` (Pill Amber)
  - `VERIFIED`: `bg-emerald-50 text-emerald-800 border-emerald-300` (Pill Emerald)
  - `REJECTED`: `bg-rose-50 text-rose-800 border-rose-300` (Pill Crimson)
  - `SUSPENDED`: `bg-slate-100 text-slate-800 border-slate-300` (Pill Slate)
- **Typography**: Outfit (Headings), Geist (Tabel, Data rows), Geist Mono (ID, Nomor Kontak, Timestamps).

---

## Struktur Layar & Komponen

1. **Header & Status Filter Tabs**:
   - Judul: "Manajemen & Kurasi Pengajar"
   - Deskripsi: "Verifikasi pendaftar baru setelah proses seleksi dokumen & wawancara offline selesai."
   - Segmented Status Filter Tabs:
     - `[Semua Tutor (154)]`
     - `[Pending Verifikasi (3)]` (Amber Badge Aktif)
     - `[Terverifikasi Aktif (142)]`
     - `[Ditolak (7)]`
     - `[Dibekukan (2)]`
   - Search & Filter Controls:
     - Search Input: "Cari nama pengajar, universitas, atau nomor WA..."
     - Dropdown Filter Jenjang: `Semua Jenjang`, `Khusus SD`, `Khusus SMP`, `SD & SMP`.

2. **Tabel Data Pengajar (High-Density Master Table)**:
   - Kolom 1: **Pengajar & Kontak** (Avatar, Nama Lengkap & Gelar, No. WhatsApp, Email).
   - Kolom 2: **Pendidikan & Instansi** (Gelar Terakhir, Universitas/Jurusan).
   - Kolom 3: **Kompetensi Jenjang** (Badge SD 1-6 / SMP 7-9).
   - Kolom 4: **Tanggal Daftar / Verifikasi** (Timestamp format Indonesia).
   - Kolom 5: **Status Akun** (Badge PENDING / VERIFIED / REJECTED / SUSPENDED).
   - Kolom 6: **Aksi** (Tombol "Audit & Aksi" yang membuka Slide-over Audit Drawer).

3. **Slide-Over Audit Drawer (Detail Pendaftar & Riwayat Kurasi)**:
   - *Terbuka saat salah satu baris pengajar diklik*:
   - Header Drawer: "Audit Berkas Calon Pengajar #TUT-2026-088" + Badge Status `PENDING`.
   - **Profil Biodata & Kontak**:
     - Nama Lengkap: **Sarah Amanda, S.Pd.**
     - Pendidikan: S1 Pendidikan Matematika - Universitas Indonesia (2022-2026)
     - Nomor WhatsApp: `+62 812-3456-7890` (Tombol Cepat: "Chat WA Langsung untuk Jadwal Interview")
     - Alamat Domisili: Jl. Pasar Minggu No. 45, Jakarta Selatan.
   - **Kompetensi & Pengalaman**:
     - Jenjang yang Diajukan: SD (Kelas 1-6) & SMP (Kelas 7-9).
     - Ringkasan Pengalaman: 3 tahun mengajar les privat matematika dan olimpiade sains tingkat SD & SMP.
     - Dokumen / Portofolio: Tautan Ijazah/Transkrip & CV (Link preview dokumen).
   - **Form Catatan Wawancara Offline Admin (Internal Notes)**:
     - Textarea: "Catatan Hasil Wawancara & Uji Kompetensi" (e.g. *Kandidat sangat komunikatif, memiliki penguasaan materi kurikulum merdeka SD & SMP dengan sangat baik, lulus uji micro-teaching*).
   - **Panel Tombol Aksi Verifikasi**:
     - Tombol Hijau Utama: **"✓ Verifikasi & Aktifkan Akun"** (Emerald Green `#16A34A` -> status `VERIFIED`)
     - Tombol Merah Sekunder: **"✕ Tolak Pendaftaran"** (Crimson Red `#DC2626` -> status `REJECTED`)
     - Tombol Abu-abu: **"Bekukan Akun"** (Jika melanggar SOP -> `SUSPENDED`)

4. **Modal Aksi: Konfirmasi Verifikasi / Penolakan**:
   - **Modal Verifikasi**:
     - "Aktifkan akun Sarah Amanda, S.Pd. sebagai pengajar terverifikasi? Pengajar akan langsung mendapatkan akses ke dashboard dan pengaturan ketersediaan jadwal." -> Tombol "Konfirmasi & Aktifkan" (`#16A34A`).
   - **Modal Penolakan**:
     - Textarea wajib: "Alasan Penolakan Pendaftaran" (Akan dikirimkan sebagai notifikasi kepada calon pengajar) -> Tombol "Kirim Penolakan" (`#DC2626`).

---

## Stitch Master Prompt (Copy-Ready)

```text
Create a modern, data-dense central admin tutor management screen with a slide-over audit drawer and verification action modals for "Home Private Nusantara".

DESIGN SYSTEM (REQUIRED - FROM BRAND LOGO):
- Platform: Responsive Web Admin Dashboard (Desktop 1440px with sidebar, max-width 1400px).
- Background: Slate Canvas (#F8FAFC).
- Surface: Pure White (#FFFFFF) cards with 1px border (#E2E8F0) and subtle elevation.
- Primary Brand: Nusantara Deep Navy (#0B2545).
- High-Impact / Rejection Accent: Nusantara Crimson Red (#DC2626).
- Growth / Verified Accent: Nusantara Emerald Green (#16A34A).
- Status Colors: Amber (#D97706) for Pending, Emerald (#16A34A) for Verified, Crimson (#DC2626) for Rejected, Slate (#475569) for Suspended.
- Typography: Outfit (Headings), Geist (Table data, labels), Geist Mono (ID numbers, phone numbers).

PAGE STRUCTURE:
1. HEADER: Page title "Manajemen & Kurasi Pengajar", subtitle regarding offline curation, status filter tabs ("Semua [154]", "Pending Verifikasi [3]" [Active], "Terverifikasi [142]", "Ditolak [7]", "Dibekukan [2]"), search input, and grade filter dropdown.
2. TUTOR DATA TABLE:
   - Multi-column table with headers: Pengajar & Kontak, Pendidikan & Kampus, Jenjang Diampu, Tanggal Daftar, Status Akun, and Aksi.
   - Row 1 (Pending): Sarah Amanda, S.Pd. (+62 812-3456-7890), S1 Pend. Matematika UI, badges "SD 1-6" & "SMP 7-9", "2 Jam lalu", Amber badge "PENDING", primary navy button "Audit & Aksi" (#0B2545).
   - Row 2 (Pending): Dimas Pratama, S.Si., S1 Fisika ITB, badge "SMP 7-9", "8 Jam lalu", Amber badge "PENDING", button "Audit & Aksi".
   - Row 3 (Verified): Budi Santoso, M.Pd., S2 Pend. Sains UNJ, badge "SD 1-6", Emerald badge "VERIFIED" (#16A34A).
3. SLIDE-OVER AUDIT DRAWER (Right overlay panel):
   - Header: "Audit Calon Pengajar #TUT-088", Status pill "PENDING", close button [X].
   - Applicant Profile: Avatar, full name, degree, university, WhatsApp button with direct link, home address.
   - Teaching Scope & CV preview link.
   - Internal Offline Interview Notes textarea.
   - 3 Action Buttons: Emerald green button "✓ Verifikasi & Aktifkan" (#16A34A), Crimson red button "✕ Tolak Pendaftaran" (#DC2626), and outline button "Bekukan Akun".
4. REJECTION MODAL OVERLAY (Secondary state):
   - Rejection reason input form dialog with confirm Crimson button "Kirim Penolakan" (#DC2626).

BANNED: No emojis, no neon glows, clean tabular data layout with crisp borders.
```
