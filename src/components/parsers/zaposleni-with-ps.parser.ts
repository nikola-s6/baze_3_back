import { QueryResult } from 'pg'
import { ZaposleniByEmailDTO, ZaposleniPopulated } from '../../models/zaposleni.model'
import { parse } from '../../db/db.helper'
import { PrivredniSubjekt } from '../../models/privredni-subjekt.model'
import { parserPS } from './privredni-subjekt.parser'

export function parserGetZaposleniByEmail(arr: ZaposleniPopulated[], queryResult: QueryResult) {
  queryResult.rows.forEach((row: ZaposleniByEmailDTO) => {
    arr.push(getPopulatedZaposleni(row))
  })
}

export function getPopulatedZaposleni(row: ZaposleniByEmailDTO) {
  const zaposleni: ZaposleniPopulated = {
    id: row.id,
    email: row.email,
    brojTelefona: row.brojTelefona,
    datumZaposlenja: row.datumZaposlenja,
    imeIPrezime: row.imeIPrezime,
    privredniSubjekt: parserPS(row)
  }
  return zaposleni
}

export function parserGetZaposleniByEmailWSifra(
  arr: Array<ZaposleniPopulated & { sifra: string }>,
  queryResult: QueryResult
) {
  queryResult.rows.forEach((row: ZaposleniByEmailDTO & { sifra: string }) => {
    const zaposleni: ZaposleniPopulated & { sifra: string } = {
      id: row.id,
      email: row.email,
      brojTelefona: row.brojTelefona,
      datumZaposlenja: row.datumZaposlenja,
      imeIPrezime: row.imeIPrezime,
      sifra: row.sifra,
      privredniSubjekt: {
        adresaId: row.adresaId,
        maticniBroj: row.maticniBroj,
        nazivPrivrednogSubjekta: row.nazivPrivrednogSubjekta,
        pib: row.pib,
        stranica: row.stranica
      }
    }
    arr.push(zaposleni)
  })
}
