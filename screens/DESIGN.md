# Design System: Home Private Nusantara

## 1. Visual Theme & Atmosphere
- **Platform**: Web Responsive (Desktop 1440px / Tablet 768px / Mobile 375px)
- **Vibe & Mood**: Authoritative, warm, prestigious academic institution aesthetic directly derived from Logo.jpg. Balances institutional trust ("HOME" Deep Navy) with passionate private tutoring care ("PRIVATE" Crimson Red) and student flourishing ("NUSANTARA" Emerald Green).
- **Density**: Daily App Balanced (Level 5) for student views; Cockpit Dense (Level 7) for Admin & Tutor tables.
- **Layout Architecture**: 12-column responsive grid with max-width containment (1280px). Generous spacing, clean spatial separation with whisper borders (rgba(226, 232, 240, 0.8)).
- **Motion Philosophy**: Subtle spring transitions on buttons and interactive cards. No jarring layout shifts.

---

## 2. Color Palette & Functional Roles
- **Primary Brand**: Nusantara Deep Navy (#0B2545) — Main navigation, header background, house roof emblem, and primary action buttons.
- **Primary Hover**: Royal Navy Hover (#133E72) — Hover states for primary buttons and active navigation links.
- **High-Conversion CTA**: Nusantara Crimson Red (#DC2626) — "PRIVATE" wordmark accent, high-priority CTA buttons ("Konek Sekarang", "Daftar Siswa"), and urgency alerts.
- **Crimson Hover**: Deep Crimson Hover (#B91C1C) — Hover states on Crimson CTA buttons.
- **Growth & Verified**: Nusantara Emerald Green (#16A34A) — Right book leaf & green arc, "Terverifikasi Admin" badges, confirmed booking tags, and success alerts.
- **Emerald Soft Tint**: Emerald Tint Surface (#F0FDF4) — Background surface for verified tutor cards, success modals, and confirmed session pills.
- **Canvas Background**: Slate Canvas (#F8FAFC) — Primary page background for eye comfort.
- **Surface Fill**: Pure White Surface (#FFFFFF) — Cards, tables, modals, and container backgrounds.
- **Text Primary**: Charcoal Slate (#0F172A) — Headings, high-contrast readable titles.
- **Text Secondary**: Muted Slate (#64748B) — Subtitles, metadata, timestamps, input placeholders.
- **Borders & Dividers**: Whisper Border (#E2E8F0) — 1px structural outlines.
- **Status Warning/Pending**: Amber Gold (#D97706) — Pending verification banners and calendar active dots.

---

## 3. Typography Rules
- **Display & Headings**: Outfit — Clean geometric sans-serif with tight tracking (tracking-tight), weight-driven hierarchy (font-bold for H1/H2, font-semibold for H3/H4).
- **Body & Forms**: Plus Jakarta Sans — Neutral, legible, relaxed leading (leading-relaxed), max-width 65ch on editorial copy.
- **Numbers, Dates & Time**: Geist Mono / Tabular figures (tabular-nums) — Used for 24-hour time slots (16:00 - 18:00 WIB), calendar dates, and admin metrics.
- **Banned**: Inter generic default, Comic Sans/playful childish fonts, neon glow text, generic serif fonts.

---

## 4. Component Standards & Behaviors
- **Buttons**:
  - Primary: Nusantara Deep Navy background (#0B2545), white text, rounded-xl (12px), subtle shadow, tactile active state.
  - Secondary: Border slate-200 with slate-700 text, hover:bg-slate-50.
  - High-Conversion CTA: Nusantara Crimson Red background (#DC2626), white text, rounded-xl (12px) for "Konek / Booking Jadwal Ini".
- **Cards & Containers**:
  - White background (#FFFFFF), border 1px solid #E2E8F0, rounded-2xl (16px), subtle ambient shadow.
- **Form Inputs**:
  - Explicit labels above input fields, rounded-xl borders (#E2E8F0), focus ring with 2px Nusantara Deep Navy (#0B2545). Error feedback below field in Crimson Red with alert icon.
- **Badges & Tags**:
  - Pill-shaped (rounded-full), font-medium text-xs:
    - SD (Kelas 1-6): Soft blue badge (bg-blue-50 text-blue-900 border border-blue-200)
    - SMP (Kelas 7-9): Soft indigo badge (bg-indigo-50 text-indigo-900 border border-indigo-200)
    - VERIFIED: Soft emerald badge (bg-emerald-50 text-emerald-800 border border-emerald-300)
    - PENDING: Soft amber badge (bg-amber-50 text-amber-800 border border-amber-300)
- **Date Picker Component**:
  - Clean monthly calendar grid. Active/available dates indicated with Emerald Green circles (#16A34A) and dot indicators. Selected date highlighted with solid Nusantara Deep Navy (#0B2545) circle.
- **Modals & Drawers**:
  - Backdrop blur overlay (backdrop-blur-sm bg-slate-950/40), smooth slide-up modal with explicit close button, confirmation summary card, and prominent action buttons.

---

## 5. Anti-Patterns & Banned AI Clichés
- NO emojis as UI icons — use clean Lucide SVG icon descriptors (e.g. icon: calendar, icon: check-circle).
- NO neon gradients or purple/cyan cyber aesthetics.
- NO 3 equal horizontal card rows without visual hierarchy.
- NO pure black (#000000) — use #0F172A.
- NO generic placeholder names like "John Doe" — use realistic Indonesian names ("Ibu Rina", "Fajar Pratama", "Sarah Amanda, S.Pd.", "Dewi Kartika").
- NO fake metric cliches like "1000% faster".
