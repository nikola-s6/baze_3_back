import { QueryResult } from 'pg'
import { OdlukaResult } from '../../models/odluka.mode'

export function odlukaParser(arr: OdlukaResult[], queryResult: QueryResult) {
  queryResult.rows.forEach(
    (row: {
      odlukaUgovoraId: number
      referentniBrojJP: number
      referentniBrojPonude: number
      datumOdluke: Date
      k1id: number
      k1ime: string
      p1naziv: string
      k2id: number
      k2ime: string
      p2naziv: string
      k3id: number
      k3ime: string
      p3naziv: string
    }) => {
      const odluka: OdlukaResult = {
        datumOdluke: row.datumOdluke,
        komisijaPrviClan: {
          imeIPrezime: row.k1ime,
          zaposleniId: row.k1id,
          nazivPrivrdnogSubjekta: row.p1naziv
        },
        komisijaDrugiClan: {
          imeIPrezime: row.k2ime,
          zaposleniId: row.k2id,
          nazivPrivrdnogSubjekta: row.p2naziv
        },
        komisijaTreciClan: {
          imeIPrezime: row.k3ime,
          zaposleniId: row.k3id,
          nazivPrivrdnogSubjekta: row.p3naziv
        },
        referentniBrojJP: row.referentniBrojJP,
        referentniBrojPonude: row.referentniBrojPonude
      }
      arr.push(odluka)
    }
  )
}
