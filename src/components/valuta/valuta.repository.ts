import { PoolClient } from 'pg'

export function getAllValuta(client: PoolClient) {
  return client.query({
    text: 'select * from "Valuta"'
  })
}
