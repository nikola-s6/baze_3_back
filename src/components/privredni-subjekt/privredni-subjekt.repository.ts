import { PoolClient } from 'pg'

export function getAllPrivredniSubjekt(client: PoolClient) {
  let queryText = 'select * from "PrivredniSubjekt"'
  return client.query({
    text: queryText
  })
}
