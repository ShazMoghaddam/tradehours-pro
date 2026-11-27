# Contributing

Thanks for your interest. Issues and pull requests are welcome, especially holiday corrections and new markets.

## Getting set up

You only need a browser to work on the app: open `index.html`. To try offline mode and installing, serve the folder instead, because service workers only run over `http(s)`:

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

To run the tests, you also need Node 20 or later:

```bash
npm install
npx playwright install chromium
npm test
```

## Before you open a pull request

- Run `npm test`. CI runs the same tests.
- Check the app in dark and light, grid and list, and at phone width.
- If you change `index.html`, `sw.js` or the icon, bump `CACHE` in `sw.js` so installed copies update.
- If you change how the app looks, rebuild the images with `npm run build:assets` and commit them.
- Add a line to `CHANGELOG.md` under a new "Unreleased" heading.

## Holiday corrections

Please open an issue or pull request with the market, the date, whether it is a full closure or an early close (with the local close time), and a link to the exchange's own calendar. Entries live in `STATIC_HOLIDAYS`, and `HOLIDAY_YEARS` says which years are covered. A test with the clock fixed to that date is very welcome.

## Style

- Keep it one HTML file plus `sw.js` and the manifest, with no runtime dependencies.
- Anything a user types goes through `esc()` before it reaches the page.
- Every control must work with a keyboard and have a visible focus ring.
