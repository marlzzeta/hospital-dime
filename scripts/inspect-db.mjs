/**
 * Inspects the Neon DB to show pages table structure and home page content.
 * Usage: node scripts/inspect-db.mjs
 */
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { createRequire } from 'module'

const __dirname = dirname(fileURLToPath(import.meta.url))
const require = createRequire(import.meta.url)

const envPath = resolve(__dirname, '../.env.local')
try {
  const lines = readFileSync(envPath, 'utf8').split('\n')
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const idx = trimmed.indexOf('=')
    if (idx < 0) continue
    const key = trimmed.slice(0, idx).trim()
    const val = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, '')
    process.env[key] = val
  }
} catch {
  console.error('❌ No se encontró .env.local')
  process.exit(1)
}

const dbUrl = process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL
if (!dbUrl) { console.error('❌ Falta DATABASE_URL'); process.exit(1) }

const pg = require(resolve(__dirname, '../node_modules/.pnpm/pg@8.20.0/node_modules/pg'))
const client = new pg.Client({ connectionString: dbUrl, ssl: { rejectUnauthorized: false } })

await client.connect()

// Show all tables related to pages
const { rows: tables } = await client.query(`
  SELECT table_name FROM information_schema.tables
  WHERE table_schema = 'public' AND table_name LIKE '%page%'
  ORDER BY table_name
`)
console.log('Tables with "page":', tables.map(r => r.table_name))

// Show all tables
const { rows: allTables } = await client.query(`
  SELECT table_name FROM information_schema.tables
  WHERE table_schema = 'public'
  ORDER BY table_name
`)
console.log('\nAll tables:')
allTables.forEach(r => console.log(' -', r.table_name))

// Show pages
const { rows: pages } = await client.query('SELECT id, title, slug FROM pages ORDER BY id')
console.log('\nPages:', pages)

// Show home page layout blocks if any
if (pages.length > 0) {
  const homePage = pages.find(p => p.slug === 'home') ?? pages[0]
  console.log('\nHome page:', homePage)

  // Check for blocks tables
  for (const table of allTables.filter(t => t.table_name.startsWith('pages_'))) {
    const { rows } = await client.query(
      `SELECT * FROM ${table.table_name} WHERE _parent_id = $1 LIMIT 5`,
      [homePage.id]
    ).catch(() => ({ rows: [] }))
    if (rows.length > 0) {
      console.log(`\n${table.table_name}:`, JSON.stringify(rows, null, 2))
    }
  }
}

await client.end()
