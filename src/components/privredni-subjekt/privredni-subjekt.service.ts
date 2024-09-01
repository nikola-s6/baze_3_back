import * as db from '../../db/db'
import { PrivredniSubjekt } from '../../models/privredni-subjekt.model'
import { getAllPrivredniSubjekt as gaps } from './privredni-subjekt.repository'

export async function getAllPrivredniSubjekt() {
  return await db.execute<PrivredniSubjekt>(gaps)
}
