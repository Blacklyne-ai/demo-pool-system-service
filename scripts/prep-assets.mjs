// Asset prep for Pool-System-Service.
// Source photos are small (≤480×320) + one larger water texture (1000×667).
// 1) Hero: upscale the turquoise water texture (graceful — no hard edges) into a
//    responsive jpg/webp set. 2) Optimise the 5 originals + webp. 3) Favicon from dino.
import sharp from 'sharp';
import fs from 'node:fs';

sharp.cache(false);
const IMG = 'public/images';

// ── 1) HERO from the big water texture (docs/scrape is gitignored → bake into public) ──
const heroSrc = 'docs/scrape/_ref_bg_water.jpg';
for (const w of [1920, 1280, 768]) {
  await sharp(heroSrc).resize({ width: w, withoutEnlargement: false, kernel: 'lanczos3' })
    .modulate({ saturation: 1.06 }).sharpen({ sigma: 0.6 })
    .jpeg({ quality: 74, progressive: true, mozjpeg: true })
    .toFile(`${IMG}/hero-water-${w}.jpg`);
  await sharp(heroSrc).resize({ width: w, kernel: 'lanczos3' })
    .modulate({ saturation: 1.06 }).sharpen({ sigma: 0.6 })
    .webp({ quality: 72 }).toFile(`${IMG}/hero-water-${w}.webp`);
}
// default hero = 1280
fs.copyFileSync(`${IMG}/hero-water-1280.jpg`, `${IMG}/hero-water.jpg`);

// ── 2) Optimise the 5 real photos in place + webp siblings ──
for (let n = 1; n <= 5; n++) {
  const src = `${IMG}/pool-${n}.jpg`;
  const buf = fs.readFileSync(src);
  await sharp(buf).jpeg({ quality: 80, progressive: true, mozjpeg: true }).toFile(src + '.tmp');
  fs.renameSync(src + '.tmp', src);
  await sharp(buf).webp({ quality: 80 }).toFile(`${IMG}/pool-${n}.webp`);
}

// ── 3) Favicon + apple-touch from the dino (yellow on aqua reads great) ──
const bg = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512">
     <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
       <stop offset="0" stop-color="#15A6BC"/><stop offset="1" stop-color="#0B5563"/>
     </linearGradient></defs>
     <rect width="512" height="512" rx="112" fill="url(#g)"/>
     <rect x="44" y="312" width="424" height="60" rx="30" fill="#ffffff" opacity="0.10"/>
   </svg>`);
const dino = await sharp('public/dino.png').resize({ width: 360, kernel: 'lanczos3' }).toBuffer();
const icon512 = await sharp(await sharp(bg).png().toBuffer())
  .composite([{ input: dino, gravity: 'center' }]).png().toBuffer();
await sharp(icon512).resize(180).png().toFile('public/apple-touch-icon.png');
await sharp(icon512).resize(256).png().toFile('public/favicon.png');

// ── 4) OG-Bild (1200×630): Wasser-Hero + Dino + Wortmarke + Slogan ──
{
  const W = 1200, H = 630;
  const photo = await sharp(`${IMG}/hero-water-1280.jpg`).resize(W, H, { fit: 'cover', position: 'centre' }).modulate({ saturation: 1.05 }).toBuffer();
  const overlay = Buffer.from(
    `<svg xmlns='http://www.w3.org/2000/svg' width='${W}' height='${H}'>
       <defs><linearGradient id='g' x1='0' y1='0' x2='0' y2='1'>
         <stop offset='0' stop-color='#05181C' stop-opacity='0.15'/>
         <stop offset='0.55' stop-color='#05181C' stop-opacity='0.35'/>
         <stop offset='1' stop-color='#05181C' stop-opacity='0.9'/></linearGradient></defs>
       <rect width='${W}' height='${H}' fill='url(#g)'/>
       <rect x='80' y='250' width='70' height='5' rx='2.5' fill='#40CFE0'/>
       <text x='80' y='330' font-family='Arial, Helvetica, sans-serif' font-size='74' font-weight='800' fill='#ffffff' letter-spacing='-2'>Schwimmbad &amp; <tspan fill='#40CFE0' font-style='italic'>Meer</tspan>.</text>
       <text x='80' y='392' font-family='Arial, Helvetica, sans-serif' font-size='30' font-weight='600' fill='#ffffff' opacity='0.9'>Pool-System-Service · Inning am Ammersee</text>
       <text x='80' y='520' font-family='monospace' font-size='21' font-weight='700' fill='#ffffff' opacity='0.75' letter-spacing='3'>SEIT 1991 · TÜV-GEPRÜFT · BERATUNG VOR ORT</text>
     </svg>`);
  const dinoOg = await sharp('public/dino.png').resize({ width: 190, kernel: 'lanczos3' }).toBuffer();
  await sharp(photo).composite([{ input: overlay, top: 0, left: 0 }, { input: dinoOg, top: 70, left: 80 }]).jpeg({ quality: 84, mozjpeg: true }).toFile(`${IMG}/og-image.jpg`);
}

console.log('PREP DONE — hero set + 5 webp + favicon + og-image');
console.log(fs.readdirSync(IMG).filter(f => /hero|og-|\.webp/.test(f)).sort().join('\n'));
