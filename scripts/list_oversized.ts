import { readdirSync, statSync } from 'node:fs';
import { join, extname, resolve } from 'node:path';

const ROOT = process.cwd();
const exts = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif', '.bmp', '.tiff']);
const ignored = new Set(['node_modules', '.next', '.git', '.vscode', '__pycache__', 'dist', 'build', 'temp-images']);
const MAX = 10485760; // 10MB

const oversized: string[] = [];
function scan(dir: string) {
  let entries;
  try { entries = readdirSync(dir, { withFileTypes: true }); } catch { return; }
  for (const e of entries) {
    if (e.isDirectory() && !ignored.has(e.name)) {
      scan(join(dir, e.name));
    } else if (e.isFile() && exts.has(extname(e.name).toLowerCase())) {
      try {
        const size = statSync(join(dir, e.name)).size;
        if (size > MAX) {
          oversized.push(join(dir, e.name).replace(resolve(ROOT) + '/', ''));
        }
      } catch {}
    }
  }
}
scan(ROOT);
console.log(oversized.join('\n'));
