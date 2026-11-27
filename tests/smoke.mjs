/**
 * Smoke tests: open the real app in headless Chromium and check it works.
 *
 *     npm test
 *
 * The clock is fixed to real dates (Black Friday, a Saturday, Christmas Eve...)
 * so the market statuses can be checked against the official calendars.
 * Runs in CI on every push and pull request.
 */

import assert from 'node:assert/strict';
import { test, before, after } from 'node:test';
import { chromium, devices } from 'playwright';
import { serve } from '../scripts/serve.mjs';

let browser, server, base;

before(async () => {
  ({ server, base } = await serve());
  browser = await chromium.launch();
});

after(async () => {
  await browser?.close();
  server?.close();
});

/** Open the app, optionally at a fixed time and with saved markets */
async function open({ time, markets, custom, viewport = { width: 1280, height: 900 }, device, sw = false } = {}) {
  const context = await browser.newContext({
    ...(device || { viewport }),
    serviceWorkers: sw ? 'allow' : 'block',
  });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  // Fonts are stubbed so the tests never depend on the network
  await page.route(/fonts\.(googleapis|gstatic)\.com/, r => r.fulfill({ status: 200, contentType: 'text/css', body: '' }));
  if (markets || custom) {
    await page.addInitScript(([order, cust]) => {
      if (order) localStorage.setItem('mcp_order', JSON.stringify(order));
      if (cust) localStorage.setItem('mcp_custom', JSON.stringify(cust));
    }, [markets, custom]);
  }
  if (time) await page.clock.setFixedTime(new Date(time));
  await page.goto(`${base}/index.html`);
  await page.waitForSelector('.market-card');
  return { page, errors, context };
}

/** Read every card: status badge, countdown phrase and hours line */
const cards = page => page.$$eval('.market-card', els => Object.fromEntries(els.map(c => [c.dataset.id, {
  badge: c.querySelector('.status-badge')?.textContent || 'OPEN',
  phrase: c.querySelector('.countdown-phrase').textContent,
  hours: c.querySelector('.card-hours').textContent.replace(/\s+/g, ' ').trim(),
  time: c.querySelector('.card-local-time').textContent,
}])));

for (const width of [320, 390, 768, 1024, 1440]) {
  test(`renders cleanly at ${width}px`, async () => {
    const { page, errors, context } = await open({ viewport: { width, height: 900 } });
    const r = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth - window.innerWidth,
      cards: document.querySelectorAll('.market-card').length,
      overlaps: (() => {
        const s = [...document.querySelectorAll('.timeline-segment')].map(e => e.getBoundingClientRect());
        let n = 0;
        for (let i = 0; i < s.length; i++) for (let j = i + 1; j < s.length; j++) {
          const a = s[i], b = s[j];
          if (a.left < b.right - 1 && b.left < a.right - 1 && a.top < b.bottom - 1 && b.top < a.bottom - 1) n++;
        }
        return n;
      })(),
    }));
    assert.deepEqual(errors, [], 'no JavaScript errors');
    assert.ok(r.overflow <= 0, `no sideways scrolling (page is ${r.overflow}px too wide)`);
    assert.equal(r.cards, 7, 'the seven default markets');
    assert.equal(r.overlaps, 0, 'no timeline sessions drawn on top of each other');
    await context.close();
  });
}

test('Black Friday 2026: New York closes early at 13:00', async () => {
  const { page, context } = await open({ time: '2026-11-27T15:00:00Z' });   // 10:00 in New York
  const c = await cards(page);
  assert.equal(c.newyork.badge, 'OPEN');
  assert.equal(c.newyork.phrase, 'Closes early at 13:00');
  assert.match(c.newyork.hours, /½ day · Close 13:00/);
  await context.close();
});

test('Saturday: every market is on its weekend and opens Monday', async () => {
  const { page, context } = await open({ time: '2026-11-28T12:00:00Z' });
  const c = await cards(page);
  for (const [id, card] of Object.entries(c)) {
    assert.equal(card.badge, 'WEEKEND', `${id} is on its weekend`);
    assert.match(card.phrase, /^Opens Monday at /, `${id} opens Monday`);
  }
  assert.equal(await page.isVisible('#weekend-banner'), true);
  await context.close();
});

test('Friday evening: the next open is Monday, not Saturday', async () => {
  const { page, context } = await open({ time: '2026-11-27T22:00:00Z' });
  const c = await cards(page);
  assert.equal(c.london.phrase, 'Opens Monday at 08:00');
  assert.equal(c.newyork.phrase, 'Opens Monday at 09:30');
  await context.close();
});

test('Christmas Eve 2026: holidays and early closes from the official calendars', async () => {
  const { page, context } = await open({ time: '2026-12-24T10:00:00Z' });
  const c = await cards(page);
  assert.equal(c.london.phrase, 'Closes early at 12:30');                   // LSE half day
  assert.equal(c.frankfurt.badge, 'HOLIDAY');                               // Xetra closed
  assert.equal(c.frankfurt.phrase, 'Opens Monday at 09:00');                // after Christmas Day
  assert.equal(c.sydney.phrase, 'Opens Tuesday at 10:00');                  // Christmas, weekend, Boxing Day
  assert.equal(c.hongkong.phrase, 'Opens Monday at 09:30');
  await context.close();
});

test('Riyadh trades Sunday to Thursday', async () => {
  const fri = await open({ time: '2026-11-27T09:00:00Z', markets: ['riyadh', 'london'] });   // Friday 12:00 Riyadh
  assert.equal((await cards(fri.page)).riyadh.badge, 'WEEKEND');
  await fri.context.close();
  const sun = await open({ time: '2026-11-29T09:00:00Z', markets: ['riyadh', 'london'] });   // Sunday 12:00 Riyadh
  const c = await cards(sun.page);
  assert.equal(c.riyadh.badge, 'OPEN');
  assert.equal(c.london.badge, 'WEEKEND');
  await sun.context.close();
});

test('markets added from the directory survive a reload, with up-to-date time zones', async () => {
  // Mexico City has had no daylight saving since 2022: 15:00 UTC in July is 09:00 there
  const { page, context } = await open({ time: '2026-07-15T15:00:00Z', markets: ['mexico', 'london'] });
  const c = await cards(page);
  assert.ok(c.mexico, 'Mexico City is restored from the directory');
  assert.equal(c.mexico.time, '09:00:00');
  await context.close();
});

test('a removed default market stays removed', async () => {
  const { page, context } = await open({ markets: ['london', 'newyork'] });
  const ids = Object.keys(await cards(page));
  assert.deepEqual(ids.sort(), ['london', 'newyork']);
  await context.close();
});

test('timeline: Tokyo trades 00:00 to 06:30 UTC', async () => {
  const { page, context } = await open({ time: '2026-11-25T12:00:00Z' });
  const titles = await page.$$eval('.timeline-segment', s => s.map(x => x.title));
  assert.ok(titles.includes('Tokyo 00:00–06:30 UTC'), titles.join(' | '));
  await context.close();
});

test('custom market names are shown as text, never run as code', async () => {
  const { page, errors, context } = await open({
    markets: ['evil', 'london'],
    custom: [{ id: 'evil', name: '<img src=x onerror="window.__pwned=1">', flag: 'XX', exchange: '<b>X</b>',
               tz: 'Europe/London', open: { h: 8, m: 0 }, close: { h: 16, m: 30 }, custom: true, color: '#00e5a0' }],
  });
  const r = await page.evaluate(() => ({
    pwned: Boolean(window.__pwned),
    injected: document.querySelectorAll('.market-card img, .market-card b').length,
  }));
  assert.equal(r.pwned, false);
  assert.equal(r.injected, 0);
  assert.deepEqual(errors, []);
  await context.close();
});

test('offline mode: a real service worker registers and caches the app', async () => {
  const { page, context } = await open({ sw: true });
  const scope = await page.evaluate(async () => (await navigator.serviceWorker.ready).scope);
  assert.match(scope, /\/$/);
  const cached = await page.evaluate(async () => {
    const keys = await caches.keys();
    const c = await caches.open(keys[0]);
    return Boolean(await c.match('./index.html'));
  });
  assert.equal(cached, true, 'index.html is cached for offline use');
  await context.close();
});

test('phone layout: four timeline rows fit', async () => {
  const { page, context } = await open({ device: devices['iPhone 13'] });
  const r = await page.evaluate(() => {
    const tl = document.getElementById('timeline').getBoundingClientRect();
    return [...document.querySelectorAll('.timeline-segment')].every(s => s.getBoundingClientRect().bottom <= tl.bottom + 0.5);
  });
  assert.equal(r, true);
  await context.close();
});
