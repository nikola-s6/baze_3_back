import * as db from '../../db/db'
import { getAllValuta as gav } from './valuta.repository'
import { Valuta } from '../../models/ponuda.model'

export async function getAllValuta() {
  return await db.execute<Valuta>(gav)
}
