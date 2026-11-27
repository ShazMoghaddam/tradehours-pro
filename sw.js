/*
 * TradeHours Pro service worker: makes the app work offline after the first visit.
 *
 * - The page itself is network-first, so you always get the latest version when
 *   online, and the cached copy when offline.
 * - Fonts, the icon and the manifest are cache-first, refreshed in the background.
 *
 * Bump CACHE when releasing so old caches are cleared.
 */
const CACHE = 'tradehours-v2.1.0';
const SHELL = ['./', './index.html', './manifest.webmanifest', './icon.svg'];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const { request } = event;
  if (request.method !== 'GET') return;

  // The page: network first, cache as fallback
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put('./index.html', copy)); return res; })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  // Everything else we use (fonts, icon, manifest): cache first, refresh in the background
  const url = new URL(request.url);
  const cacheable = url.origin === location.origin || /fonts\.(googleapis|gstatic)\.com$/.test(url.hostname);
  if (!cacheable) return;
  event.respondWith(
    caches.match(request).then(cached => {
      const network = fetch(request)
        .then(res => {
          if (res.ok || res.type === 'opaque') {
            const copy = res.clone();               // copy now, before the page reads the body
            caches.open(CACHE).then(c => c.put(request, copy));
          }
          return res;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
