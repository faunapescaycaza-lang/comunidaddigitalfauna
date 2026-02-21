import { Kysely, PostgresDialect } from 'kysely'
import { Pool } from 'pg'
import type { Database } from './db-types'

const dialect = new PostgresDialect({
  pool: new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  })
})

// Database interface is passed to Kysely's constructor, and from now on, Kysely 
// knows everything about your database, tables, columns and their types.
export const db = new Kysely<Database>({
  dialect,
})

