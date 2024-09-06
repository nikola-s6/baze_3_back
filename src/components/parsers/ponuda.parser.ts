import { QueryResult } from 'pg'
import { Ponuda, PonudaFull } from '../../models/ponuda.model'
import { getPopulatedZaposleni } from './zaposleni-with-ps.parser'
import { ZaposleniByEmailDTO } from '../../models/zaposleni.model'
import { parserZaposleniFull } from './javni-poziv.parser'

export function parseGetPonudasForJP(arr: Ponuda[], queryResult: QueryResult) {
  queryResult.rows.forEach((row: JpPonudasFields) => {
    const ponuda: Ponuda = {
      referentniBroj: row.referentniBrojPonude,
      cenaBezPdv: row.cenaBezPDV,
      cenaSaPdv: row.cenaSaPDV,
      datum: row.datum,
      izjavaOIntegritetu: row.izjavaOIntegritetu,
      samostalna: row.samostalna,
      ukljucujeProizvodjace: row.ukljucujeProizvodjace,
      valuta: {
        id: row.valutaId,
        oznakaValute: row.oznakaValute,
        nazivValute: row.nazivValute
      },
      zaposleni: getPopulatedZaposleni(row as unknown as ZaposleniByEmailDTO)
    }
    arr.push(ponuda)
  })
}

export function parsePonudaFull(arr: PonudaFull[], queryResult: QueryResult) {
  queryResult.rows.forEach(row => {
    const ponuda: PonudaFull = {
      referentniBroj: row.referentniBrojPonude,
      cenaBezPdv: row.cenaBezPDV,
      cenaSaPdv: row.cenaSaPDV,
      datum: row.datum,
      izjavaOIntegritetu: row.izjavaOIntegritetu,
      samostalna: row.samostalna,
      ukljucujeProizvodjace: row.ukljucujeProizvodjace,
      valuta: {
        id: row.valutaId,
        oznakaValute: row.oznakaValute,
        nazivValute: row.nazivValute
      },
      zaposleni: parserZaposleniFull(row)
    }
    arr.push(ponuda)
  })
}

type JpPonudasFields = {
  referentniBrojPonude: number
  datum: Date
  ukljucujeProizvodjace: boolean
  samostalna: boolean
  izjavaOIntegritetu: boolean
  cenaBezPDV: number
  cenaSaPDV: number
  valutaId: number
  referentniBrojJP: number
  zaposleniId: number
  nazivValute: string
  oznakaValute: string
  imeIPrezime: string
  email: string
  sifra: string
  brojTelefona: string
}
