import * as odlukaRepository from './odluka.repository'
import * as db from '../../db/db'
import { CreateOdlukaDTO, OdlukaResult } from '../../models/odluka.mode'
import { odlukaParser } from '../parsers/odluka.parser'

export async function getOdlukaDetails(referentniBrojJP: number) {
  return db.execute<OdlukaResult>(odlukaRepository.getOdlukaByJavniPoziv, { referentniBrojJP }, odlukaParser)
}

export async function createOdluka(odluka: CreateOdlukaDTO) {
  await db.execute(odlukaRepository.createOdluka, { odluka })
  return (await getOdlukaDetails(odluka.referentniBrojJP))?.[0]
}
