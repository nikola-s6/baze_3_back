import { QueryResult } from 'pg'

export function parse<T>(queryResult: QueryResult): T[] {
  const resp: T[] = []
  for (const row of queryResult.rows) {
    const parsedRowRes = {} as T
    queryResult.fields.forEach(field => {
      parsedRowRes[field.name] = row[field.name]
    })
    resp.push(parsedRowRes)
  }
  return resp
}
