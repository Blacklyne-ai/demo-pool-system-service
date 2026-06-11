// Phase-0 visual capture: old site (full page) + 3 reference benchmarks (viewport).
// Run once for the docs/ record. Tolerant of flaky/old servers.
import { chromium } from 'playwright';
import fs from 'node:fs';

const shots = [
  { url: 'http://www.pool-system-service.de/', path: 'docs/old-home.png', full: true, html: 'docs/scrape/scrape-home.html' },
  { url: 'http://www.pool-system-service.de/contact.html', path: 'docs/old-contact.png', full: true, html: 'docs/scrape/scrape-contact.html' },
  { url: 'http://www.pool-system-service.de/about.html', path: 'docs/old-about.png', full: true },
  { url: 'http://www.pool-system-service.de/features.html', path: 'docs/old-features.png', full: true },
  { url: 'https://www.route66-hh.de/', path: 'docs/ref-route66.png', full: false },
  { url: 'https://www.auto-motorrad-freigang.de/', path: 'docs/ref-amf.png', full: false },
  { url: 'https://www.astonservicehamburg.de/', path: 'docs/ref-aston.png', full: false },
];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
for (const s of shots) {
  try {
    await page.goto(s.url, { waitUntil: 'networkidle', timeout: 35000 });
    await page.waitForTimeout(1200);
    await page.screenshot({ path: s.path, fullPage: s.full });
    if (s.html) fs.writeFileSync(s.html, await page.content());
    console.log('OK   ', s.path);
  } catch (e) {
    console.log('FAIL ', s.path, '-', e.message.split('\n')[0]);
  }
}
await browser.close();
console.log('CAPTURE DONE');
