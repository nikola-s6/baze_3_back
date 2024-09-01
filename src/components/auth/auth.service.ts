import sha256 from 'sha256'
import * as db from '../../db/db'
import { CustomError } from '../../errors/custom.error'
import errorConstants from '../../errors/error-constants'
import { Zaposleni, ZaposleniPopulated, ZaposleniSifra } from '../../models/zaposleni.model'
import { registerZaposleni } from './auth.repository'
import { JWT_SECRET } from '../../utils/environments'
import { sign } from 'jsonwebtoken'
import { format } from 'date-fns'
import { getZaposleniByEmail } from '../zaposleni/zaposleni.repository'
import { parserGetZaposleniByEmail, parserGetZaposleniByEmailWSifra } from '../parsers/zaposleni-with-ps.parser'

export async function login(email: string, password: string): Promise<{ jwt: string; zaposeni: ZaposleniPopulated }> {
  if (!email || !password) throw new Error(errorConstants.missingParams)

  // didn't use zaposleni service because sifra is needed here
  const [zaposleni] = await db.execute<ZaposleniPopulated & { sifra: string }>(
    getZaposleniByEmail,
    {
      email
    },
    parserGetZaposleniByEmailWSifra
  )

  if (sha256(password) !== zaposleni?.sifra) throw new CustomError(404, 'Nepostojeca kombinacija email sifra!')

  delete zaposleni.sifra

  const jwt = sign({ imeIPrezime: zaposleni.imeIPrezime, email: zaposleni.email }, JWT_SECRET, {
    algorithm: 'HS256',
    expiresIn: '10h'
  })

  return { jwt, zaposeni: zaposleni as ZaposleniPopulated }
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
