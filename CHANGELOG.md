# Changelog

All notable changes to TradeHours Pro are listed here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project uses [semantic versioning](https://semver.org/).

## [2.1.0] - 2026-11-27

Correct on weekends and holidays again, a timeline that matches reality, offline mode that actually works, and the full set of repo files.

### Fixed
- **Holidays stopped at 2025.** The calendar now covers 2026 and 2027 for NYSE, LSE, Xetra, JPX, HKEX, ASX, Euronext (Paris and Amsterdam) and TSX, checked against each exchange's official calendar. For example, on Black Friday 2026 New York now closes early at 13:00 instead of showing 16:00.
- **Weekends were ignored.** Cards showed markets as OPEN on Saturdays, and on Friday evening "Opens in" counted down to Saturday morning. Each market now uses its own local weekday and weekend (Riyadh and Cairo trade Sunday to Thursday), and the countdown runs to the next real session, skipping weekends and holidays. Countdowns over a day read like "2d 09:00:00".
- **The 24-hour timeline was wrong.** A time-zone wrap-around bug drew Tokyo and Singapore as open nearly all day. Session times now come from exact DST-aware maths, sessions that cross midnight UTC are drawn in two pieces, and a fourth row stops the Asian sessions sitting on top of each other.
- **Offline and install never worked.** Browsers refuse service workers from `blob:` URLs. There is now a real `sw.js` and a `manifest.webmanifest`, so the app installs and opens offline after the first visit.
- **Markets added from the directory vanished on reload**, and **removed default markets came back.** Both now save properly.
- **Mexico City used Chicago's time zone**, an hour out for half the year because Mexico dropped daylight saving in 2022. Toronto, Amsterdam and Stockholm now use their own zones too.
- **Custom market names were inserted as HTML** and could run code. All names and labels are escaped, and saved ids are cleaned.
- The weekend banner had no styling and appeared whenever it was the weekend in UTC, even when Sydney had already opened. It now only shows when all your markets are on their weekend.
- Open cards showed both "LIVE SESSION" and "OPEN". They now show one "Trading now" label. Pre-market cards said "Pre-market ends in" under "Opens in". They now say when the market opens.
- Xetra is closed on 24 and 31 December, not open for a half day as the old data said.

### Added
- A line under the timeline showing which years the holiday calendar covers, which turns amber once it's out of date.
- Sharing tags, a theme colour and a proper app icon.
- Smoke tests in a headless browser with the clock fixed to real dates: Black Friday, a Saturday, Friday evening, Christmas Eve, a Gulf weekend, Mexico in summer, the timeline, saved markets, escaping, offline mode and phone layout. They run in CI on every push and pull request.
- README banner, GitHub social preview and screenshots, built from the live app by `assets/build.mjs`.
- `SECURITY.md`, `CONTRIBUTING.md` and Dependabot.

### Changed
- `TradeHours-Pro.html` is now `index.html`, and `icon_512 (1).svg` is now `icon.svg`.
- The privacy policy mentions the offline copy kept by the browser.
- README rewritten. Licence year corrected to 2026, when the project was created.

## [2.0.0] - 2026-02-24

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


## [1.0.0]

Initial release.

- Basic market hours display for 7 default markets
- Dark/light theme toggle
- UTC clock strip
