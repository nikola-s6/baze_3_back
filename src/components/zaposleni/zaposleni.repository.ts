import { PoolClient, QueryResult } from 'pg'

export function getZaposleniByEmail(client: PoolClient, data: { email: string }): Promise<QueryResult> {
  return client.query({
    text: 'select * from "Zaposleni" as z left join "PrivredniSubjekt" as ps on z."maticniBroj" = ps."maticniBroj" where email = $1;',
    values: [data.email]
  })
}

export function getZaposleniList(client: PoolClient) {
  return client.query({
    text: `select z."zaposleniId", z."imeIPrezime", z."maticniBroj", ps."nazivPrivrednogSubjekta" from "Zaposleni" z
left join "PrivredniSubjekt" ps on ps."maticniBroj" = z."maticniBroj"`
  })
}
