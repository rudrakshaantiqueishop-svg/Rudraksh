import { readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif', '.bmp', '.tiff']);
const MAX_BYTES = 10 * 1024 * 1024; // 10MB

function scan(dir: string, results: string[] = []) {
  let entries;
  try { entries = readdirSync(dir, { withFileTypes: true }); } catch { return results; }
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) {
      if (['node_modules', '.next', '.git', 'dist', 'build', 'temp-images'].includes(e.name)) continue;
      scan(full, results);
    } else if (e.isFile() && IMAGE_EXTS.has(extname(e.name).toLowerCase())) {
      try {
        const size = statSync(full).size;
        if (size > MAX_BYTES) results.push(`${full} (${(size/1024/1024).toFixed(2)} MB)`);
      } catch {}
    }
  }
  return results;
}

const oversized = scan(process.cwd());
console.log('Oversized image files (>10MB):');
if (oversized.length === 0) console.log('None');
else oversized.forEach(p => console.log(p));
