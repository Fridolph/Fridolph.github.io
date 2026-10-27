import { cp, readdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const projectRoot = resolve(import.meta.dirname, "..");
const entries = await readdir(projectRoot, { withFileTypes: true });
const legacyDirectories = new Set(["img", "contributors", "other"]);

for (const entry of entries) {
  const legacyDirectory = entry.isDirectory() && (/^\d{2}/.test(entry.name) || legacyDirectories.has(entry.name));
  const legacyFile = entry.isFile() && (/\.(?:png|jpe?g|gif|webp|ico|awebp)$/i.test(entry.name) || entry.name === "style.css");
  if (legacyDirectory || legacyFile) {
    await cp(resolve(projectRoot, entry.name), resolve(projectRoot, "dist", entry.name), { recursive: true });
  }
}

await writeFile(resolve(projectRoot, "dist", ".nojekyll"), "");
