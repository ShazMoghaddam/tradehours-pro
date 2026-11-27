/**
 * Build the README banner, the GitHub social preview and the README screenshots.
 *
 * Usage (from the repo root):
 *
 *     npm install
 *     npm run build:assets
 *
 * Writes:
 *   assets/banner.png          2560 x 800, shown at the top of the README
 *   assets/social-preview.png  1280 x 640, upload it in Settings > Social preview
 *   assets/screenshots/*.webp  dark, light and phone views of the live app
 *
 * Every picture is taken from index.html itself, with the clock fixed on a
 * Wednesday afternoon when London, Frankfurt and New York are all trading.
 */

import { writeFile, mkdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { chromium, devices } from 'playwright';
import { serve, ROOT } from '../scripts/serve.mjs';

const OUT = join(ROOT, 'assets');
const CLOCK = new Date('2026-12-02T14:52:00Z');
const FONT = `Inter, -apple-system, "Segoe UI", system-ui, sans-serif`;

async function toWebp(page, png) {
  const b64 = await page.evaluate(async src => {
    const img = new Image();
    img.src = `data:image/png;base64,${src}`;
    await img.decode();
    const c = document.createElement('canvas');
    c.width = img.naturalWidth;
    c.height = img.naturalHeight;
    c.getContext('2d').drawImage(img, 0, 0);
    return c.toDataURL('image/webp', 0.9).split(',')[1];
  }, png.toString('base64'));
  return Buffer.from(b64, 'base64');
}

async function main() {
  const { server, base } = await serve();
  const browser = await chromium.launch();
  await mkdir(join(OUT, 'screenshots'), { recursive: true });
  const icon = (await readFile(join(ROOT, 'icon.svg'))).toString('base64');

  async function app({ light = false, device, viewport = { width: 1280, height: 900 }, scale = 2 }) {
    const ctx = await browser.newContext({
      ...(device || { viewport, deviceScaleFactor: scale }),
      serviceWorkers: 'block',
    });
    const p = await ctx.newPage();
    if (light) await p.addInitScript(() => localStorage.setItem('mcp_theme', 'light'));
    await p.clock.setFixedTime(CLOCK);
    await p.goto(`${base}/index.html`);
    await p.waitForSelector('.market-card');
    await p.waitForTimeout(600);
    return { p, ctx };
  }

  /* 1. Real UI crops: the session timeline and the open markets */
  const shot = await app({ viewport: { width: 1180, height: 1000 } });
  const timeline = (await shot.p.locator('.session-bar-wrap').screenshot()).toString('base64');
  const firstRow = await shot.p.evaluate(() => {
    const cs = [...document.querySelectorAll('.market-card')].slice(0, 3).map(c => c.getBoundingClientRect());
    return { x: cs[0].left, y: cs[0].top, width: cs[2].right - cs[0].left, height: Math.max(...cs.map(c => c.height)) };
  });
  const cards = (await shot.p.screenshot({ clip: firstRow })).toString('base64');
  await shot.ctx.close();

  async function render(viewport, scale, html, file) {
    const p = await browser.newPage({ viewport, deviceScaleFactor: scale });
    await p.setContent(html);
    await p.waitForTimeout(200);
    await p.screenshot({ path: join(OUT, file) });
    await p.close();
  }

  const shared = `
    html, body { margin: 0; } body { background: #0f1318; font-family: ${FONT}; color: #e8edf5; -webkit-font-smoothing: antialiased; overflow: hidden; }
    .mono { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; }
    .eyebrow { letter-spacing: 3.5px; text-transform: uppercase; color: #00e5a0; font-weight: 700; margin: 0 0 16px; }
    .brand { display: flex; align-items: center; gap: 18px; }
    .brand img { border-radius: 20%; }
    .title { font-weight: 700; letter-spacing: -2px; line-height: .95; margin: 0; }
    .title span { color: #00e5a0; }
    .sub { color: #8b98ab; line-height: 1.45; margin: 18px 0 0; }
    .shot { display: block; width: 100%; border-radius: 14px; box-shadow: 0 24px 60px rgba(0,0,0,.5); }
    .glow { position: absolute; inset: 0; background: radial-gradient(circle at 80% 30%, rgba(0,229,160,.10), transparent 55%), radial-gradient(circle at 10% 100%, rgba(0,153,255,.10), transparent 50%); }
  `;

  /* 2. Banner */
  await render({ width: 1280, height: 400 }, 2, `<!doctype html><html><head><meta charset="utf-8"><style>${shared}
    .banner { position: relative; width: 1280px; height: 400px; box-sizing: border-box; padding: 0 56px 0 64px;
      display: grid; grid-template-columns: 1fr 640px; gap: 36px; align-items: center; }
    .eyebrow { font-size: 13px; } .title { font-size: 66px; } .sub { font-size: 19px; }
    .stack { display: grid; gap: 12px; max-height: 330px; overflow: hidden;
      -webkit-mask-image: linear-gradient(#000 72%, transparent); mask-image: linear-gradient(#000 72%, transparent); }
  </style></head><body><div class="glow"></div><div class="banner">
    <div>
      <p class="eyebrow mono">Global market hours · installable</p>
      <div class="brand"><img src="data:image/svg+xml;base64,${icon}" width="76" height="76" alt=""><h1 class="title">TradeHours<br><span>Pro</span></h1></div>
      <p class="sub">Which markets are open, when the next one opens, and who is on holiday.</p>
    </div>
    <div class="stack"><img class="shot" src="data:image/png;base64,${timeline}" alt=""><img class="shot" src="data:image/png;base64,${cards}" alt=""></div>
  </div></body></html>`, 'banner.png');

  /* 3. Social preview */
  await render({ width: 1280, height: 640 }, 1, `<!doctype html><html><head><meta charset="utf-8"><style>${shared}
    .preview { position: relative; width: 1280px; height: 640px; box-sizing: border-box; padding: 52px 64px; }
    .top { display: flex; justify-content: space-between; align-items: flex-end; gap: 40px; }
    .eyebrow { font-size: 15px; } .title { font-size: 84px; } .sub { font-size: 22px; max-width: 470px; text-align: right; }
    .foot { font-size: 14px; color: #6b7a8f; letter-spacing: 1px; text-align: right; margin: 12px 0 0; line-height: 1.6; }
    .shots { margin-top: 30px; display: grid; gap: 14px;
      -webkit-mask-image: linear-gradient(#000 62%, transparent 96%); mask-image: linear-gradient(#000 62%, transparent 96%); }
  </style></head><body><div class="glow"></div><div class="preview">
    <div class="top">
      <div>
        <p class="eyebrow mono">Global market hours</p>
        <div class="brand"><img src="data:image/svg+xml;base64,${icon}" width="84" height="84" alt=""><h1 class="title">TradeHours <span>Pro</span></h1></div>
      </div>
      <div>
        <p class="sub">Live sessions, countdowns and exchange holidays for 25 markets.</p>
        <p class="foot mono">github.com/ShazMoghaddam/tradehours-pro<br>Shaz Moghaddam · London</p>
      </div>
    </div>
    <div class="shots"><img class="shot" src="data:image/png;base64,${timeline}" alt=""><img class="shot" src="data:image/png;base64,${cards}" alt=""></div>
  </div></body></html>`, 'social-preview.png');

  /* 4. README screenshots */
  const shots = [
    { name: 'desktop-dark', viewport: { width: 1440, height: 900 }, scale: 1 },
    { name: 'desktop-light', light: true, viewport: { width: 1440, height: 900 }, scale: 1 },
    { name: 'phone-dark', device: devices['iPhone 13'] },
  ];
  for (const s of shots) {
    const { p, ctx } = await app(s);
    await writeFile(join(OUT, 'screenshots', `${s.name}.webp`), await toWebp(p, await p.screenshot()));
    await ctx.close();
  }

  await browser.close();
  server.close();
  console.log('wrote assets/banner.png, assets/social-preview.png and assets/screenshots/');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
