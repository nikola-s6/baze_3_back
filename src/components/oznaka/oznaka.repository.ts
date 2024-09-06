import { PoolClient } from 'pg'

export function getAllOznaka(client: PoolClient) {
  return client.query({
    text: 'select * from "Oznaka"'
  })
}
