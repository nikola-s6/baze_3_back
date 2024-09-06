import { PoolClient } from 'pg'

export function getAllJedinicaMere(client: PoolClient) {
  return client.query({ text: 'select * from "JedinicaMere";' })
}
