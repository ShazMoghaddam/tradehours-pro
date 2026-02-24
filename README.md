# TradeHours Pro

**Live global market hours, trading session countdowns, and holiday calendar — in a single HTML file.**

No installation. No account. No internet required after the first load. Open the file in any browser and it just works.

---

## What's Inside

**TradeHours Pro** is a self-contained, single-file web app for traders and investors who need to know at a glance which markets are open right now, how long until the next session opens, and which markets are on holiday.

### Features

- **Live status** for 25+ global markets — NYSE, LSE, TSE, HKEX, FSE, ASX, SGX, and more
- **Real-time countdowns** to open and close, updated every second
- **24-hour session timeline** showing all active sessions in UTC with DST auto-correction
- **Holiday calendar** pre-loaded with 2025 market holidays for all major exchanges
- **Half-day support** — early closes shown with correct countdown and label
- **Add & remove markets** from the built-in directory (25 markets across 6 regions)
- **Drag to reorder** your market cards
- **Grid / List layouts** — switch instantly
- **Dark & Light themes** — your preference is saved
- **Ambient light dimming** — uses device sensor if available, or follows OS dark mode
- **Offline-capable** via built-in Service Worker (PWA)
- **Installable** on iOS (Add to Home Screen) and Android/Chrome
- **Fully accessible** — WCAG AA: keyboard navigation, screen reader support, skip link, focus traps, reduced-motion support
- **Responsive** — phone, tablet, desktop, and landscape all handled

### Markets Included (directory)

| Region | Markets |
|--------|---------|
| Asia Pacific | Tokyo, Sydney, Singapore, Hong Kong, Shanghai, Seoul, Mumbai, Taipei |
| Europe | London, Frankfurt, Paris, Zurich, Amsterdam, Moscow, Stockholm |
| Americas | New York, Chicago, Toronto, São Paulo, Mexico City |
| Middle East | Dubai, Riyadh, Tel Aviv |
| Africa | Johannesburg, Cairo |

---

## How to Use

1. **Download** `TradeHours-Pro.html`
2. **Open** it in any modern browser (Chrome, Firefox, Safari, Edge)
3. That's it — no setup, no dependencies, no internet needed

### Install as an App (optional)

**iPhone / iPad:** Open in Safari → Share → Add to Home Screen  
**Android / Chrome:** Open in Chrome → three-dot menu → Add to Home Screen / Install App  
**Desktop Chrome:** Click the install icon in the address bar

---

## Customisation

All data lives inside the single HTML file. You can:

- **Update the holiday calendar** — edit the `STATIC_HOLIDAYS` array in the `<script>` section
- **Add custom markets not in the directory** — click the `＋` button in the app
- **Change the default market set** — edit the `DEFAULT_MARKETS` array
- **Connect a live holiday API** — replace the stub in `fetchHolidaysFromAPI()`

---

## Technical Details

| Property | Value |
|----------|-------|
| File size | ~85 KB (uncompressed) |
| Dependencies | Google Fonts (Inter + JetBrains Mono) — loaded once, cached |
| Browser support | Chrome 90+, Firefox 90+, Safari 14+, Edge 90+ |
| Offline support | Yes — Service Worker caches the file |
| Storage | `localStorage` for user preferences (layout, theme, market order) |
| No tracking | No analytics, no external requests (except Google Fonts on first load) |

---

## License

This software is sold under a **Personal / Commercial Use License**.  
See [LICENSE.md](LICENSE.md) for full terms.

**In short:**
- ✅ Use on your own devices
- ✅ Use for personal or commercial trading workflows
- ✅ Customise for your own use
- ❌ Do not redistribute, resell, or share the file with others
- ❌ Do not remove copyright notices

---

## Support & Updates

For questions, bug reports, or to suggest a market to add, open an issue on this repository.

Future updates will be posted as new releases. Download the latest `TradeHours-Pro.html` to update — your saved preferences will be preserved.

---

## Screenshot

> Dark mode · Grid layout · 3 markets open

The app adapts to your screen size automatically and respects your OS dark/light preference on first load.

---

*Built with vanilla HTML, CSS, and JavaScript. No frameworks. No build step. Just open and trade.*
