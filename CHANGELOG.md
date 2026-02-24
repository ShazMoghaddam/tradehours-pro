# Changelog

All notable changes to TradeHours Pro are documented here.

---

## [2.0.0] — 2025

### Added
- **Market directory** — 25 curated global markets across 6 regions; one-click add
- **Holiday calendar** — 2025 holidays pre-loaded for all major exchanges (NYSE, LSE, TSE, HKEX, FSE, ASX, SGX, and more)
- **Half-day support** — early-close sessions show correct countdown and label (e.g. Black Friday, Christmas Eve)
- **Drag to reorder** market cards
- **Pre-market session** indicator (60 minutes before open)
- **Ambient light dimming** via device sensor or OS dark mode — 4 brightness levels
- **Weekend detection** — banner shown when all markets are globally closed
- **PWA / Service Worker** — install to home screen, works offline after first load
- **Full keyboard navigation** — Tab, Enter, Space, Escape, focus traps in modal
- **Screen reader support** — ARIA live regions, roles, labels throughout
- **Reduced-motion compliance** — all animations disabled when OS setting is active
- **Per-tick rendering cache** — eliminates redundant `Intl` calls, smooth 60 fps
- **Session progress bar** — shows how far through the current session you are
- **"Now" line** on 24-hour timeline with DST-aware UTC positioning
- **Local time display** — shows your device's timezone in the header strip
- **Responsive design** — xs/sm/md/lg/xl breakpoints, landscape-phone mode, safe-area insets (iPhone notch)
- **Compact layout** option alongside Grid and List

### Changed
- Rebuilt from scratch with performance-first architecture
- Single-file, zero-dependency design (fonts loaded from Google CDN, cached)
- `localStorage` persistence for layout, theme, market order, and ambient level

### Fixed
- DST edge cases corrected via `Intl.DateTimeFormat` UTC offset computation
- Stale DOM cache cleared after `innerHTML` replacement
- Open card animations disabled during reduced-motion

---

## [1.0.0] — Initial Release

- Basic market hours display for 7 default markets
- Dark/light theme toggle
- UTC clock strip
