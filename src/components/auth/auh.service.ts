import sha256 from 'sha256'
import * as db from '../../db/db'
import { CustomError } from '../../errors/custom.error'
import errorConstants from '../../errors/error-constants'
import { Zaposleni, ZaposleniSifra } from '../zaposleni/zaposleni.model'
import { getZaposleniByEmail, registerZaposleni } from './auth.repository'
import { JWT_SECRET } from '../../utils/environments'
import { sign } from 'jsonwebtoken'
import { format } from 'date-fns'

export async function login(email: string, password: string): Promise<{ jwt: string; zaposeni: Zaposleni }> {
  if (!email || !password) throw new Error(errorConstants.missingParams)

  const [zaposleni] = await db.execute<ZaposleniSifra>(getZaposleniByEmail, {
    email
  })

  if (sha256(password) !== zaposleni?.sifra) throw new CustomError(404, 'Nepostojeca kombinacija email sifra!')

  delete zaposleni.sifra

  const jwt = sign({ imeIPrezime: zaposleni.imeIPrezime, email: zaposleni.email }, JWT_SECRET, {
    algorithm: 'HS256',
    expiresIn: '10h'
  })

  return { jwt, zaposeni: zaposleni as Zaposleni }
}

export async function register(
  ime: string,
  prezime: string,
  email: string,
  sifra: string,
  brojTelefona: string,
  datumZaposlenja: string,
  maticniBroj: number
) {
  if (!ime || !prezime || !email || !sifra || !brojTelefona || !datumZaposlenja || !maticniBroj) {
    throw new Error(errorConstants.missingParams)
  }

  const imeIPrezime = `${ime.trim()} ${prezime.trim()}`
  const hashedSifra = sha256(sifra)
  const datumZaposlenjaString = format(new Date(datumZaposlenja), 'yyyy-MM-dd')

  await db.execute(registerZaposleni, {
    imeIPrezime,
    email,
    sifra: hashedSifra,
    brojTelefona,
    datumZaposlenja: datumZaposlenjaString,
    maticniBroj
  })
}
