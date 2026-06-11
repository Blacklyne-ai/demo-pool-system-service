// Harvest candidate Unsplash photo IDs via NETWORK INTERCEPTION (robust vs SPA churn).
// Unsplash License = free, commercial OK, no attribution required.
import { chromium } from 'playwright';
import fs from 'node:fs';
import https from 'node:https';

const queries = {
  hero: 'luxury-swimming-pool',
  water: 'turquoise-pool-water',
  villa: 'modern-villa-pool',
  spa: 'spa-wellness-pool',
  garden: 'backyard-pool-garden',
  lake: 'lake-bavaria-alps',
  infinity: 'infinity-pool',
  night: 'pool-night-lights',
};
const OUT = 'docs/qa/stock';
fs.mkdirSync(OUT, { recursive: true });

const dl = (url, path) => new Promise((res) => {
  const f = fs.createWriteStream(path);
  https.get(url, (r) => {
    if (r.statusCode !== 200) { f.close(); fs.rmSync(path, { force: true }); return res(false); }
    r.pipe(f); f.on('finish', () => f.close(() => res(true)));
  }).on('error', () => res(false));
});

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1400, height: 1100 },
  userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
});
const found = {};
for (const [key, q] of Object.entries(queries)) {
  const ids = new Set();
  const handler = (resp) => {
    const u = resp.url();
    if (!u.includes('images.unsplash.com')) return;
    const m = u.match(/photo-\d{10,}-[a-z0-9]+/);
    if (m) ids.add(m[0]);
  };
  page.on('response', handler);
  try {
    await page.goto(`https://unsplash.com/s/photos/${q}?orientation=landscape`, { waitUntil: 'commit', timeout: 25000 });
    await page.waitForTimeout(3500);
    await page.mouse.wheel(0, 2600); await page.waitForTimeout(2500);
    await page.mouse.wheel(0, 2600); await page.waitForTimeout(2000);
  } catch (e) { /* ignore */ }
  page.off('response', handler);
  found[key] = [...ids].slice(0, 7);
  console.log(key.padEnd(9), found[key].length, 'ids');
}
await browser.close();

let n = 0; const manifest = [];
for (const [key, ids] of Object.entries(found)) {
  for (let i = 0; i < ids.length; i++) {
    const ok = await dl(`https://images.unsplash.com/${ids[i]}?w=360&h=240&fit=crop&q=60&fm=jpg`, `${OUT}/${key}-${i}.jpg`);
    if (ok) { manifest.push({ key, i, id: ids[i] }); n++; }
  }
}
fs.writeFileSync(`${OUT}/manifest.json`, JSON.stringify(manifest, null, 2));
console.log(`\n${n} thumbs → ${OUT}`);
