import { DB_USER, DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT } from '../utils/environments'
import { Pool, PoolClient, PoolConfig, QueryResult, types } from 'pg'
import { parse } from './db.helper'

const poolConfig = {
  user: DB_USER,
  host: DB_HOST,
  database: DB_NAME,
  password: DB_PASSWORD,
  port: DB_PORT,
  max: 20,
  idleTimeoutMillis: 30000
} satisfies PoolConfig

const pool = new Pool(poolConfig)

export async function transaction<T>(t: (client: PoolClient) => Promise<T>, isScript = false): Promise<T> {
  const connection = await pool.connect()
  try {
    await connection.query('begin')
    const res = await t(connection)
    await connection.query('commit')
    return res
  } catch (error) {
    await connection.query('rollback')
    throw error
  } finally {
    connection.release()
    if (isScript) pool.end()
  }
}

export async function execute<T = null>(
  t: (client: PoolClient, data?: any) => Promise<QueryResult>,
  data?: any,
  customParser: (arr: T[], queryResult: QueryResult) => void = null
): Promise<T[]> {
  return t(await pool.connect(), data)
    .then(response => {
      return parse<T>(response, customParser)
    })
    .catch(err => {
      throw err
    })
}
