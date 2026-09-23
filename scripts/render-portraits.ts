// Renders the hand-authored portrait SVGs in art/portraits/ to the AVIFs the
// people collection references. The SVG is the source of truth; run this after
// editing one. `node scripts/render-portraits.ts`
import { readdir, readFile, writeFile } from "node:fs/promises";
import { basename, join } from "node:path";
import sharp from "sharp";

const SOURCE_DIR = "art/portraits";
const OUT_DIR = "src/content/people";

const files = (await readdir(SOURCE_DIR)).filter((name) => name.endsWith(".svg"));

for (const file of files) {
  const svg = await readFile(join(SOURCE_DIR, file));
  const avif = await sharp(svg, { density: 200 })
    .resize(960, 1200, { fit: "cover" })
    .avif({ quality: 70 })
    .toBuffer();
  const out = join(OUT_DIR, `${basename(file, ".svg")}.avif`);
  await writeFile(out, avif);
  console.log(`${out} — ${(avif.length / 1024).toFixed(1)} kB`);
}
