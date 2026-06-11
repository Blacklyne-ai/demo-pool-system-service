// Download chosen Unsplash finalists at high-res → responsive jpg/webp in public/images.
// Unsplash License (free, commercial, no attribution required). Mood/aspirational use;
// the real customer photos stay in the authentic "our work" gallery.
import sharp from 'sharp';
import fs from 'node:fs';
import https from 'node:https';

sharp.cache(false);
const IMG = 'public/images';
const man = JSON.parse(fs.readFileSync('docs/qa/stock/manifest.json', 'utf8'));
const idOf = (pick) => { const [k, i] = pick.split('-'); return (man.find((x) => x.key === k && x.i === +i) || {}).id; };

const buf = (url) => new Promise((res, rej) => {
  https.get(url, (r) => { const c = []; r.on('data', (d) => c.push(d)); r.on('end', () => res(Buffer.concat(c))); }).on('error', rej);
});

// pick → { name, sizes:[widths], crop:'WxH'|null }
const jobs = [
  { pick: 'water-1',   name: 'hero-pool',     sizes: [1920, 1280, 768], ar: 3 / 2 },
  { pick: 'villa-3',   name: 'about-pool',    sizes: [1000, 640],       ar: 4 / 3 },
  { pick: 'garden-2',  name: 'relax-pool',    sizes: [1000, 640],       ar: 4 / 3 },
  { pick: 'villa-4',   name: 'modern-pool',   sizes: [900],             ar: 4 / 3 },
  { pick: 'water-2',   name: 'water-tex',     sizes: [1280],            ar: 16 / 9 },
  { pick: 'lake-1',    name: 'region-lake',   sizes: [1000, 640],       ar: 4 / 3 },
  { pick: 'night-4',   name: 'ambiente-night',sizes: [1280, 768],       ar: 16 / 9 },
  { pick: 'infinity-2',name: 'vista-pool',    sizes: [1000],            ar: 4 / 3 },
];

for (const j of jobs) {
  const id = idOf(j.pick);
  if (!id) { console.log('SKIP (no id)', j.pick); continue; }
  const raw = await buf(`https://images.unsplash.com/${id}?w=2000&q=82&fm=jpg&fit=max`);
  for (const w of j.sizes) {
    const h = Math.round(w / j.ar);
    const base = sharp(raw).resize(w, h, { fit: 'cover', position: 'centre' }).modulate({ saturation: 1.04 });
    const suffix = j.sizes.length > 1 ? `-${w}` : '';
    await base.clone().jpeg({ quality: 78, progressive: true, mozjpeg: true }).toFile(`${IMG}/${j.name}${suffix}.jpg`);
    await base.clone().webp({ quality: 76 }).toFile(`${IMG}/${j.name}${suffix}.webp`);
  }
  // default alias without suffix (jpg + webp) for multi-size sets
  if (j.sizes.length > 1) {
    fs.copyFileSync(`${IMG}/${j.name}-${j.sizes[0]}.jpg`, `${IMG}/${j.name}.jpg`);
    fs.copyFileSync(`${IMG}/${j.name}-${j.sizes[0]}.webp`, `${IMG}/${j.name}.webp`);
  }
  console.log('OK', j.name, j.sizes.join('/'));
}
console.log('\nstock processed → public/images');
