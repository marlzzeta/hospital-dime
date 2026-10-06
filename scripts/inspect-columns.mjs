import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { createRequire } from 'module'

const __dirname = dirname(fileURLToPath(import.meta.url))
const require = createRequire(import.meta.url)

const envPath = resolve(__dirname, '../.env.local')
const lines = readFileSync(envPath, 'utf8').split('\n')
for (const line of lines) {
  const trimmed = line.trim()
  if (!trimmed || trimmed.startsWith('#')) continue
  const idx = trimmed.indexOf('=')
  if (idx < 0) continue
  process.env[trimmed.slice(0, idx).trim()] = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, '')
}

const pg = require(resolve(__dirname, '../node_modules/.pnpm/pg@8.20.0/node_modules/pg'))
const client = new pg.Client({ connectionString: process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } })
await client.connect()

const tables = ['pages_blocks_features', 'pages_blocks_features_features', 'pages_blocks_doctor_carousel', 'pages_blocks_location_contact', 'pages_blocks_testimonials', 'pages_blocks_testimonials_testimonials']
for (const t of tables) {
  const { rows } = await client.query(`SELECT column_name, data_type FROM information_schema.columns WHERE table_name = $1 ORDER BY ordinal_position`, [t])
  console.log(`\n${t}:`, rows.map(r => `${r.column_name}(${r.data_type})`).join(', '))
}
await client.end()
