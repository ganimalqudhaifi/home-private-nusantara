# Design System: Home Private Nusantara

## 1. Visual Theme & Brand Identity (Derived from Logo)

The visual identity of **Home Private Nusantara** is directly extracted and harmonized from the official brand emblem (`Logo.jpg`):

- **The Tri-Color Symbolic Triad**:
  1. **Nusantara Deep Navy (`#0B2545`)**: Derived from the "HOME" wordmark, the protective house roof, the learner's torso figure, and the foundation cradle arc. Represents institutional authority, security, intellectual foundation, and trusted academic standards.
  2. **Nusantara Crimson Red (`#DC2626`)**: Derived from the "PRIVATE" wordmark, the left dynamic arc, and the left open-book leaf. Represents personalized 1-on-1 private tutoring dedication, passion, focus, and high-impact calls to action.
  3. **Nusantara Emerald Green (`#16A34A`)**: Derived from the right dynamic arc and the right open-book leaf. Represents student academic growth, verified excellence, verified tutor credibility, and session confirmation.

- **Vibe & Atmosphere**:
  - Warm, prestigious Indonesian educational institution aesthetic.
  - Balances authoritative trust ("HOME") with passionate personalized care ("PRIVATE") and student flourishing ("NUSANTARA").
  - Strictly bans childish cartoon aesthetics and artificial neon SaaS gradients.

---

## 2. Color Palette & Functional Roles

| Token Name | Hex Code | Functional Role in UI | Source in Logo |
| :--- | :--- | :--- | :--- |
| **Navy Primary (HOME)** | `#0B2545` | Header background, primary navigation, H1/H2 titles, house branding, primary interactive buttons. | "HOME" text, roof, learner figure |
| **Navy Container / Hover** | `#133E72` | Hover states for primary buttons, active sidebar menu items, dark tonal cards. | Deep Navy shade |
| **Crimson Accent (PRIVATE)** | `#DC2626` | High-priority conversion CTA ("Konek Sekarang", "Daftar Siswa"), urgency alerts, badge highlights. | "PRIVATE" text, left book leaf |
| **Crimson Hover** | `#B91C1C` | Hover/active states on Crimson CTA buttons. | Deep Crimson shade |
| **Emerald Growth (VERIFIED)** | `#16A34A` | "Terverifikasi Admin" badges, confirmed booking badges, success state alerts, progress indicators. | Right book leaf & green arc |
| **Emerald Soft Tint** | `#F0FDF4` | Background surface for verified tutor cards, success modals, confirmed session pills. | Emerald tint |
| **Slate Canvas Background** | `#F8FAFC` | Primary application canvas background (eye-comfort off-white). | Clean logo canvas |
| **Pure White Surface** | `#FFFFFF` | Form cards, dashboard containers, data tables, modals, window elements. | Logo window panes & pages |
| **Text Primary (Charcoal)** | `#0F172A` | High-contrast body text and card titles. | Contrast anchor |
| **Text Secondary (Muted)** | `#64748B` | Subtitles, metadata, timestamps, input placeholders. | Supporting text |
| **Whisper Border** | `#E2E8F0` | 1px clean structural dividing lines (`border-slate-200`). | Clean outline |
| **Amber Notice / Pending** | `#D97706` | Pending tutor holding state banners, calendar active-day dots. | Warning/holding tone |

---

## 3. Typography Architecture

- **Brand & Display Headlines**: `Outfit` / `Geist`
  - *Weights*: `font-bold` (700) for H1/H2, `font-semibold` (600) for H3/H4.
  - *Letter Spacing*: Tight tracking (`tracking-tight` / `-0.02em`) for headlines; Wide tracking (`tracking-widest` / `+0.15em`) for uppercase sub-brand tags mirroring "— NUSANTARA —".
- **Body & Form Inputs**: `Plus Jakarta Sans` / `Geist`
  - *Leading*: Relaxed leading (`leading-relaxed` / `1.6`) for optimal reading comprehension.
  - *Line Length*: Max width `65ch` on editorial paragraphs.
- **Numbers, Time Slots & Metrics**: `Geist Mono` / Tabular Figures (`tabular-nums`)
  - Used for 24-hour time slots (`16:00 - 18:00 WIB`), calendar dates, and administrative KPI metrics.
- **Banned**: Inter default font, playful comic fonts, generic serif fonts in software UI, neon glow text.

---

## 4. Component Standards & Shapes

### A. Buttons & Actions
- **Primary Action (Brand Navy)**: `#0B2545` background, pure white text, rounded-xl (12px), subtle shadow, tactile active push (`active:scale-[0.98]`).
- **High-Conversion CTA (Crimson Accent)**: `#DC2626` background, pure white text, rounded-xl (12px), for "Konek / Booking Jadwal Ini".
- **Secondary / Outline**: 1px `#E2E8F0` border with `#0B2545` text, hover:bg-slate-50.

### B. Cards & Containers
- Pure White background (`#FFFFFF`), 1px solid border `#E2E8F0`, rounded-2xl (16px), subtle ambient shadow (`shadow-sm`).

### C. Badges & Tags (Educational Tiers & Status)
- **SD (Kelas 1–6)**: `bg-blue-50 text-blue-900 border border-blue-200 rounded-full font-medium text-xs`
- **SMP (Kelas 7–9)**: `bg-indigo-50 text-indigo-900 border border-indigo-200 rounded-full font-medium text-xs`
- **VERIFIED Tutor (Emerald)**: `bg-emerald-50 text-emerald-800 border border-emerald-300 rounded-full font-medium text-xs` with checkmark icon.
- **PENDING Verification (Amber)**: `bg-amber-50 text-amber-800 border border-amber-300 rounded-full font-medium text-xs`.

### D. Interactive Date Picker
- Clean monthly grid.
- Available dates highlighted with Emerald or Navy circles and dot indicator.
- Selected date highlighted with solid Nusantara Navy (`#0B2545`) circle and white text.

---

## 5. Anti-Patterns (Banned)
- **NO** emojis as UI icons — use clean Lucide SVG icon descriptors.
- **NO** neon cyber gradients or purple/cyan glows.
- **NO** pure black (`#000000`) — use `#0F172A`.
- **NO** 3 equal horizontal card rows without visual hierarchy.
- **NO** generic placeholder names like "John Doe" — use realistic Indonesian names ("Ibu Rina", "Fajar Pratama", "Sarah Amanda, S.Pd.", "Dewi Kartika").
