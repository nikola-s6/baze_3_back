import { PoolClient, QueryResult } from 'pg'

export function getZaposleniByEmail(client: PoolClient, data: { email: string }): Promise<QueryResult> {
  return client.query({
    text: 'select * from "Zaposleni" where email = $1;',
    values: [data.email]
  })
}
