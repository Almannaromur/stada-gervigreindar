// Every article component must exist in two places:
//   src/components/content/index.ts  – how it looks on the site
//   src/editor/components.ts         – its fields in the editor
// This check fails if the two lists differ, so a new component can't be
// forgotten in the editor (or an editor entry left without a component).
import fs from 'node:fs';

const read = (p) => fs.readFileSync(new URL(`../${p}`, import.meta.url), 'utf8');

const site = [...read('src/components/content/index.ts').matchAll(/export \{ default as (\w+) \}/g)].map((m) => m[1]);
const editorSrc = read('src/editor/components.ts');
const body = editorSrc.slice(editorSrc.indexOf('export const components = {'));
const editor = [...body.matchAll(/^  (\w+): (?:wrapper|block|inline|mark|repeating)\(/gm)].map((m) => m[1]);

const missingInEditor = site.filter((n) => !editor.includes(n));
const missingOnSite = editor.filter((n) => !site.includes(n));

if (missingInEditor.length || missingOnSite.length) {
  if (missingInEditor.length) console.error(`Missing in src/editor/components.ts: ${missingInEditor.join(', ')}`);
  if (missingOnSite.length) console.error(`Missing export in src/components/content/index.ts: ${missingOnSite.join(', ')}`);
  process.exit(1);
}
console.log(`Editor components OK (${site.length}): ${site.join(', ')}`);
