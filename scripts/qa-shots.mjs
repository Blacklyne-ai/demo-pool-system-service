// Visual + structural QA against the running dev server.
// Force-reveals .fade-in (IntersectionObserver would leave below-fold blank in a
// full-page shot), then captures desktop + mobile full-page + checks h-overflow.
import { chromium } from 'playwright';
import fs from 'node:fs';

const BASE = process.env.QA_BASE || 'http://localhost:4412';
const pages = ['/', '/leistungen', '/kontakt', '/impressum', '/datenschutz', '/404'];
fs.mkdirSync('docs/qa', { recursive: true });

const reveal = () => {
  document.querySelectorAll('.fade-in, .timeline').forEach((e) => e.classList.add('is-visible'));
};

const browser = await chromium.launch();
const report = [];
for (const path of pages) {
  const name = path === '/' ? 'home' : path.replace(/\//g, '') || 'home';
  for (const [vp, w, h] of [['desktop', 1440, 900], ['mobile', 390, 844]]) {
    const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
    const errors = [];
    page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
    page.on('pageerror', (e) => errors.push(String(e)));
    try {
      await page.goto(BASE + path, { waitUntil: 'networkidle', timeout: 30000 });
      await page.evaluate(reveal);
      await page.waitForTimeout(500);
      const m = await page.evaluate(() => ({
        scrollW: document.documentElement.scrollWidth,
        clientW: document.documentElement.clientWidth,
        bodyH: document.body.scrollHeight,
      }));
      const overflow = m.scrollW - m.clientW;
      await page.screenshot({ path: `docs/qa/${name}-${vp}.png`, fullPage: true });
      report.push({ path, vp, overflowPx: overflow, bodyH: m.bodyH, errors: errors.length });
      if (overflow > 1) console.log(`⚠  ${path} [${vp}] H-OVERFLOW ${overflow}px`);
      if (errors.length) console.log(`⚠  ${path} [${vp}] ${errors.length} console error(s): ${errors[0]}`);
    } catch (e) {
      report.push({ path, vp, error: e.message.split('\n')[0] });
      console.log(`FAIL ${path} [${vp}] ${e.message.split('\n')[0]}`);
    }
    await page.close();
  }
}
await browser.close();
console.log('\n' + report.map((r) => `${r.path} [${r.vp}] overflow=${r.overflowPx ?? '-'}px h=${r.bodyH ?? '-'} err=${r.errors ?? r.error ?? 0}`).join('\n'));
console.log('\nQA SHOTS DONE → docs/qa/');
