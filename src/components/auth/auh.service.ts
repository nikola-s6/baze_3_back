import * as db from '../../db/db'
import { CustomError } from '../../errors/custom.error'
import errorConstants from '../../errors/error-constants'
import { ZaposleniSifra } from '../zaposleni/zaposleni.model'
import { getZaposleniByEmail } from './auth.repository'

export async function login(email: string, password: string) {
  if (!email || !password) throw new Error(errorConstants.missingParams)

  const [zaposleni] = await db.execute<ZaposleniSifra>(getZaposleniByEmail, {
    email
  })

  if (password !== zaposleni?.sifra) throw new CustomError(404, 'Nepostojeca kombinacija email sifra!')

  return zaposleni
}
