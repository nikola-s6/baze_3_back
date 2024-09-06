import { PoolClient } from 'pg'

export function getKriterijumiPoziva(client: PoolClient, data: { referentniBroj: number }) {
  return client.query({
    text: `select * from "KriterijumPoziva" where "referentniBrojJP" = ${data.referentniBroj}`
  })
}

export function saveKriterijum(client: PoolClient, data: { nazivKriterijumaPoziva: string; referentniBrojJP: number }) {
  return client.query({
    text: 'insert into "KriterijumPoziva"("nazivKriterijumaPoziva", "referentniBrojJP") values ($1, $2)',
    values: [data.nazivKriterijumaPoziva, data.referentniBrojJP]
  })
}
