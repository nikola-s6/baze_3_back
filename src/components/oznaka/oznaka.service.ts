import { QueryResult } from 'pg'
import * as db from '../../db/db'
import { Oznaka } from '../../models/oznaka.model'
import { getAllOznaka as gao } from './oznaka.repository'

export async function getAllOznaka() {
  return await db.execute<Oznaka>(gao, undefined, (arr: Oznaka[], queryResult: QueryResult) => {
    queryResult.rows.forEach(row => {
      const oznaka: Oznaka = {
        broj: row.brojOznake,
        naziv: row.nazivOznake
      }
      arr.push(oznaka)
    })
  })
}
