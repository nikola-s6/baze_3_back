import { PrivredniSubjekt } from '../../models/privredni-subjekt.model'

export function parserPS(row: any) {
  const privredniSubjekt: PrivredniSubjekt = {
    adresaId: row.adresaId,
    maticniBroj: row.maticniBroj,
    nazivPrivrednogSubjekta: row.nazivPrivrednogSubjekta,
    pib: row.pib,
    stranica: row.stranica
  }
  return privredniSubjekt
}
