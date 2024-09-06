import { QueryResult } from 'pg'
import { Kriterijum } from '../../models/javni-poziv.model'

export function kriterijumParser(arr: Kriterijum[], queryResult: QueryResult) {
  queryResult.rows.forEach(
    (row: { kriterijumPozivaId: number; nazivKriterijumaPoziva: string; referentniBrojJP: number }) => {
      const kriterijum: Kriterijum = {
        id: row.kriterijumPozivaId,
        nazivKriterijumaPoziva: row.nazivKriterijumaPoziva,
        referentniBrojJP: row.referentniBrojJP
      }
      arr.push(kriterijum)
    }
  )
}
