// Pulls ReactBits components (TS + Tailwind variants) from the official registry.
// Usage: node scripts/add-reactbits.mjs SplitText Threads ...
import fs from 'node:fs'
import path from 'node:path'

const deps = new Set()
for (const name of process.argv.slice(2)) {
  const res = await fetch(`https://reactbits.dev/r/${name}-TS-TW.json`)
  if (!res.ok) { console.error(`✗ ${name}: ${res.status}`); continue }
  const item = await res.json()
  for (const d of item.dependencies ?? []) deps.add(d)
  for (const f of item.files) {
    const out = path.join('src/components/reactbits', path.basename(f.path))
    fs.mkdirSync(path.dirname(out), { recursive: true })
    fs.writeFileSync(out, f.content)
    console.log(`✓ ${name} -> ${out}`)
  }
}
console.log('DEPS:', [...deps].join(' '))
