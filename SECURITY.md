# Security policy

## Reporting a problem

If you find a security issue, such as a way to make the app run code it shouldn't, a problem with the service worker, or an unsafe dependency, please report it privately through [GitHub's private vulnerability reporting](https://github.com/ShazMoghaddam/tradehours-pro/security/advisories/new) rather than opening a public issue.

You can expect a reply within a week.

## What's in scope

TradeHours Pro is a static web app. It has no server, no accounts, no cookies and no analytics.

- **Stored in your browser:** theme, layout, your markets and their order, the dimming level, and an offline copy of the app and its fonts (kept by the service worker).
- **Network requests:** Google Fonts (Inter and JetBrains Mono). Nothing else.
- **Your text:** custom market names are escaped before they reach the page, and saved ids are checked on load.
- **Service worker:** it only caches the app's own files and the fonts, and only runs over `https` (or `localhost`).

The npm packages in `package.json` are only used to test the app and build the README images. None of them ship in the app itself.

## Supported versions

Only the latest version on `main` is supported.
