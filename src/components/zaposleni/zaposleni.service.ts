import * as db from '../../db/db'
import { CustomError } from '../../errors/custom.error'
import errorConstants from '../../errors/error-constants'
import { Zaposleni, ZaposleniBasic, ZaposleniSifra } from '../../models/zaposleni.model'
import * as zaposleniRepository from './zaposleni.repository'

export async function getZaposleniByEmail(email: string): Promise<Zaposleni> {
  const [zaposleni] = await db.execute<ZaposleniSifra>(zaposleniRepository.getZaposleniByEmail, {
    email
  })
  if (!zaposleni) throw new CustomError(404, errorConstants.notFound)
  delete zaposleni.sifra
  return zaposleni as Zaposleni
}

export async function getZaposleniList() {
  return await db.execute<ZaposleniBasic>(zaposleniRepository.getZaposleniList)
}
