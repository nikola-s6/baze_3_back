import { PrivredniSubjekt } from './privredni-subjekt.model'

export type ZaposleniSifra = {
  id: number
  imeIPrezime: string
  email: string
  sifra: string
  brojTelefona: string
  datumZaposlenja: Date
  maticniBroj: number
}

export type Zaposleni = Omit<ZaposleniSifra, 'sifra'>

export type ZaposleniPopulated = Omit<Zaposleni, 'maticniBroj'> & { privredniSubjekt: PrivredniSubjekt }

export type ZaposleniByEmailDTO = Zaposleni & PrivredniSubjekt
