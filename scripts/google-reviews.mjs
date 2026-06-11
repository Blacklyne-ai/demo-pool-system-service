// Scrape the business's OWN Google listing (via CID) for REAL rating + reviews.
// Legitimate: the client's own reviews on the client's own site. Never fabricate —
// if nothing is there, we report that honestly.
import { chromium } from 'playwright';
import fs from 'node:fs';

const CID = '18378573512456258770';
const URL = `https://www.google.com/maps?cid=${CID}&hl=de&gl=de`;

const browser = await chromium.launch();
const ctx = await browser.newContext({
  locale: 'de-DE',
  userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
  viewport: { width: 1280, height: 1000 },
});
const page = await ctx.newPage();
const out = { url: URL, name: null, rating: null, count: null, reviews: [], note: '' };
try {
  await page.goto('https://www.google.com/maps/search/Pool-System-Service+M%C3%BCnchner+Stra%C3%9Fe+51+Inning+am+Ammersee?hl=de&gl=de', { waitUntil: 'domcontentloaded', timeout: 35000 });
  await page.waitForTimeout(2500);
  // EU consent: click accept/reject if present
  const consent = await page.$$('button, [role="button"]');
  for (const b of consent) {
    const t = ((await b.innerText().catch(() => '')) || '').trim().toLowerCase();
    if (/^(alle akzeptieren|accept all|ich stimme zu|alle ablehnen|reject all)$/.test(t)) {
      await b.click().catch(() => {});
      await page.waitForTimeout(2500);
      break;
    }
  }
  await page.waitForTimeout(2000);
  // click the Pool-System-Service result if a list is shown
  const links = await page.$$('a, [role="button"], div[role="article"]');
  for (const l of links) {
    const t = ((await l.innerText().catch(() => '')) || '');
    if (/Pool-System-Service/i.test(t)) { await l.click().catch(() => {}); await page.waitForTimeout(3000); break; }
  }
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'docs/qa/google-place.png', fullPage: false });

  const data = await page.evaluate(() => {
    const txt = (sel) => document.querySelector(sel)?.textContent?.trim() || null;
    // rating + count often in aria-labels / specific spans
    let rating = null, count = null, name = null;
    name = txt('h1');
    // rating: span with a number like "4,8"
    const rEl = document.querySelector('.fontDisplayLarge, [class*="fontDisplayLarge"]');
    if (rEl) rating = rEl.textContent.trim();
    // count: a button/span containing "Rezensionen"
    const all = Array.from(document.querySelectorAll('button, span, div'));
    const cEl = all.find((e) => /\d[\d.\s]*\s*Rezensionen/.test(e.textContent || ''));
    if (cEl) { const m = cEl.textContent.match(/([\d.\s]+)\s*Rezensionen/); if (m) count = m[1].replace(/\D/g, ''); }
    return { name, rating, count };
  });
  Object.assign(out, data);

  // try to open reviews + harvest a few cards
  try {
    const tabs = await page.$$('button[role="tab"], button');
    for (const t of tabs) {
      const lab = ((await t.innerText().catch(() => '')) || '').toLowerCase();
      if (lab.includes('rezension')) { await t.click().catch(() => {}); break; }
    }
    await page.waitForTimeout(2500);
    for (let i = 0; i < 5; i++) { await page.mouse.wheel(0, 1500); await page.waitForTimeout(700); }
    out.reviews = await page.evaluate(() => {
      const cards = Array.from(document.querySelectorAll('[data-review-id], .jftiEf'));
      return cards.slice(0, 12).map((c) => {
        const author = c.querySelector('.d4r55, [class*="fontTitleMedium"]')?.textContent?.trim() || null;
        const stars = c.querySelector('[role="img"][aria-label*="Stern"]')?.getAttribute('aria-label') || null;
        const text = c.querySelector('.wiI7pd, [class*="MyEned"]')?.textContent?.trim() || null;
        const when = c.querySelector('.rsqaWe, [class*="fontBodySmall"]')?.textContent?.trim() || null;
        return { author, stars, when, text };
      }).filter((r) => r.author || r.text);
    });
  } catch (e) { out.note += 'reviews-extract-failed; '; }
} catch (e) {
  out.note += 'nav-failed: ' + e.message.split('\n')[0];
}
await browser.close();
fs.writeFileSync('docs/qa/google-reviews.json', JSON.stringify(out, null, 2));
console.log(JSON.stringify({ name: out.name, rating: out.rating, count: out.count, nReviews: out.reviews.length, note: out.note }, null, 2));
if (out.reviews.length) out.reviews.slice(0, 6).forEach((r, i) => console.log(`#${i + 1}`, r.author, '|', r.stars, '|', (r.text || '').slice(0, 80)));
