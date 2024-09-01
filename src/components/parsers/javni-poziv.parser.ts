import { QueryResult } from 'pg'
import { GetAllJavniPozivDTO } from '../../models/javni-poziv.model'
import { Datumi } from '../../models/shared/datumi.model'

export function parserGetAllJavniPoziv(arr: GetAllJavniPozivDTO[], queryResult: QueryResult) {
  queryResult.rows.forEach((row: getAllJavniPozivFields) => {
    const jp: GetAllJavniPozivDTO = {
      referentniBroj: row.referentniBrojJP,
      nazivPoziva: row.nazivPoziva,
      datumi: row.datumi,
      procenjenaVrednost: row.procenjenaVrednost,
      oznakaValute: row.oznakaValute,
      oznaka: {
        naziv: row.nazivOznake,
        broj: row.oznakaId
      },
      valutaId: row.valutaId,
      zaposleni: {
        id: row.zaposleniId,
        imeIPrezime: row.imeIPrezime,
        privredniSubjekt: {
          maticniBroj: row.maticniBroj,
          pib: row.pib,
          nazivPrivrednogSubjekta: row.nazivPrivrednogSubjekta,
          adresaId: row.adresaId,
          stranica: row.stranica
        }
      }
    }
    arr.push(jp)
  })
}

type getAllJavniPozivFields = {
  referentniBrojJP: number
  nazivPoziva: string
  datumi: Datumi
  procenjenaVrednost: number
  oznakaValute: string
  oznakaId: number
  nazivOznake: string
  valutaId: number
  zaposleniId: number
  maticniBroj: number
  pib: number
  nazivPrivrednogSubjekta: string
  imeIPrezime: string
  stranica: string
  adresaId: number
}
