import { QueryResult } from 'pg'
import * as db from '../../db/db'
import { JedinicaMere } from '../../models/jedinica-mere.mode'
import { getAllJedinicaMere as gajm } from './jedinica-mere.repository'

export async function getAllJedinicaMere() {
  return await db.execute<JedinicaMere>(gajm)
}
