/**
 * Post-build guard for the static host build.
 *
 * The failure this catches: a host configured to publish the repository root
 * instead of the build output serves the source `index.html`, whose only script
 * is `/src/main.jsx`. Browsers refuse that module (MIME type `text/jsx`), so the
 * page renders blank while the deployment still reports success.
 *
 * Failing the build here turns that silent breakage into an obvious error.
 */
import { readFile } from 'node:fs/promises'

const outputPath = new URL('../dist/index.html', import.meta.url)

let html
try {
  html = await readFile(outputPath, 'utf8')
} catch {
  console.error('Build output check failed: dist/index.html is missing.')
  process.exit(1)
}

const problems = []
if (/src\s*=\s*["'][^"']*\/src\//i.test(html)) {
  problems.push('it points at a /src/ entry file instead of the bundled assets')
}
if (!/\/assets\/[\w.-]+\.js/i.test(html)) {
  problems.push('it has no bundled /assets/*.js reference')
}

if (problems.length > 0) {
  console.error(`Build output check failed: dist/index.html ${problems.join(' and ')}.`)
  console.error('Publish the build output directory (dist), not the repository root.')
  process.exit(1)
}

console.log('Build output check passed: dist/index.html references the bundled assets.')
