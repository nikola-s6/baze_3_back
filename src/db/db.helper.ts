import { QueryResult } from 'pg'

export function parse<T>(
  queryResult: QueryResult,
  customParser: (arr: T[], queryResult: QueryResult) => T = null
): T[] {
  const parseFunction = customParser ?? defaultParser
  const arr: T[] = []
  parseFunction(arr, queryResult)
  return arr
}

function defaultParser<T>(arr: T[], queryResult: QueryResult) {
  for (const row of queryResult.rows) {
    const parsedRowRes = {} as T
    queryResult.fields.forEach(field => [(parsedRowRes[field.name] = row[field.name])])
    arr.push(parsedRowRes)
  }
}
