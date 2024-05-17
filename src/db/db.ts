import {
  DB_USER,
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
} from '../environments';
import { Pool, PoolClient, PoolConfig } from 'pg';

const poolConfig = {
  user: DB_USER,
  host: DB_HOST,
  database: DB_NAME,
  password: DB_PASSWORD,
  port: DB_PORT,
  max: 20,
  idleTimeoutMillis: 30000,
} satisfies PoolConfig;

const pool = new Pool(poolConfig);

export default async function transaction<T>(
  t: (client: PoolClient) => Promise<T>,
  isScript = false
): Promise<T> {
  const connection = await pool.connect();
  try {
    await connection.query('begin');
    const res = await t(connection);
    await connection.query('commit');
    return res;
  } catch (error) {
    console.log(error);
    await connection.query('rollbac');
    throw error;
  } finally {
    connection.release();
    if (isScript) pool.end();
  }
}
