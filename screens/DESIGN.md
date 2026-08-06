# Design System: Home Private Nusantara

## 1. Visual Theme & Atmosphere
- **Platform**: Web Responsive (Desktop 1440px / Tablet 768px / Mobile 375px)
- **Vibe & Mood**: Professional, trustworthy, warm academic atmosphere. Clean and authoritative like a premium educational institute, free of childish toy aesthetics or generic tech-startup neon gradients.
- **Density**: Daily App Balanced (Level 5) for student/public views; Cockpit Dense (Level 7) for Admin & Tutor tables.
- **Layout Architecture**: 12-column responsive grid with max-width containment (1280px). Generous spacing, clean spatial separation with whisper borders (`rgba(226, 232, 240, 0.8)`).
- **Motion Philosophy**: Subtle spring transitions (stiffness 100, damping 20) on buttons and interactive cards. No jarring layout shifts.

---

## 2. Color Palette & Functional Roles
- **Canvas Background**: `Slate Canvas` (`#F8FAFC`) — Primary page background for eye comfort.
- **Surface Fill**: `Pure White Surface` (`#FFFFFF`) — Cards, tables, modals, and container backgrounds.
- **Primary Brand**: `Nusantara Blue` (`#1E3A8A` / Tailwind `blue-900`) — Primary navigation, primary action buttons, brand accents.
- **Primary Hover/Active**: `Royal Indigo` (`#1D4ED8` / Tailwind `blue-700`) — Hover and focus states.
- **Secondary Accent**: `Warm Amber` (`#D97706` / Tailwind `amber-600`) — Badges, star ratings, highlighting active date picker days, certified badges.
- **Text Primary**: `Charcoal Slate` (`#0F172A` / Tailwind `slate-900`) — Headings, high-contrast readable titles.
- **Text Secondary**: `Muted Slate` (`#64748B` / Tailwind `slate-500`) — Subtitles, metadata, timestamps, input placeholders.
- **Borders & Dividers**: `Whisper Border` (`#E2E8F0` / Tailwind `slate-200`) — 1px structural outlines.
- **Status Success**: `Emerald Green` (`#059669` / Tailwind `emerald-600`) — Verified tags, confirmed bookings.
- **Status Warning/Pending**: `Amber Gold` (`#D97706` / Tailwind `amber-600`) — Pending verification banners.
- **Status Error/Danger**: `Rose Crimson` (`#E11D48` / Tailwind `rose-600`) — Schedule collision errors, rejected status.

---

## 3. Typography Rules
- **Display & Headings**: `Outfit` or `Geist` — Clean geometric sans-serif with tight tracking (`tracking-tight`), weight-driven hierarchy (`font-bold` for H1/H2, `font-semibold` for H3/H4).
- **Body & Forms**: `Geist` or `Plus Jakarta Sans` — Neutral, legible, relaxed leading (`leading-relaxed`), max-width 65ch on editorial copy.
- **Numbers, Dates & Time**: `Geist Mono` / Tabular figures (`tabular-nums`) — Used for 24-hour time slots (`16:00 - 18:00 WIB`), calendar dates, and admin metrics.
- **Banned**: `Inter` (generic default), Comic Sans/playful childish fonts, neon glow text, generic serif fonts.

---

## 4. Component Standards & Behaviors
- **Buttons**:
  - *Primary*: Nusantara Blue background (`#1E3A8A`), white text, rounded-xl (12px), subtle shadow, tactile active state (`active:scale-[0.98]`).
  - *Secondary*: Border slate-200 with slate-700 text, hover:bg-slate-50.
  - *Accent*: Warm Amber (`#D97706`) for high-priority CTA ("Konek Sekarang").
- **Cards & Containers**:
  - White background (`#FFFFFF`), border 1px solid `#E2E8F0`, rounded-2xl (16px), subtle ambient shadow (`shadow-sm` or `shadow-md`).
- **Form Inputs**:
  - Explicit labels above input fields, rounded-xl borders (`#E2E8F0`), focus ring with 2px `Nusantara Blue` (`#1E3A8A`). Error feedback below field in red with alert icon.
- **Badges & Tags**:
  - Pill-shaped (`rounded-full`), font-medium text-xs, muted background with high-contrast text:
    - `SD (Kelas 1-6)`: Soft blue badge (`bg-blue-50 text-blue-700 border border-blue-200`)
    - `SMP (Kelas 7-9)`: Soft indigo badge (`bg-indigo-50 text-indigo-700 border border-indigo-200`)
    - `VERIFIED`: Soft green badge (`bg-emerald-50 text-emerald-700 border border-emerald-200`)
    - `PENDING`: Soft amber badge (`bg-amber-50 text-amber-700 border border-amber-200`)
- **Date Picker Component**:
  - Clean monthly calendar grid. Active/available dates indicated with Warm Amber highlight circles and dot indicators. Disabled dates muted (`text-slate-300`).
- **Modals & Drawers**:
  - Backdrop blur overlay (`backdrop-blur-sm bg-slate-950/40`), smooth slide-up modal with explicit close button, confirmation summary card, and prominent action buttons.

---

## 5. Anti-Patterns & Banned AI Clichés
- **NO** emojis as UI icons — use clean Lucide SVG icon descriptors (e.g. `icon: calendar`, `icon: check-circle`).
- **NO** neon gradients or purple/cyan cyber aesthetics.
- **NO** 3 equal horizontal card rows without visual hierarchy.
- **NO** pure black (`#000000`) — use `#0F172A`.
- **NO** generic placeholder names like "John Doe" — use realistic Indonesian names ("Ibu Rina", "Fajar Pratama", "Sarah Amanda, S.Pd.", "Dewi Kartika").
- **NO** fake metric cliches like "1000% faster".
