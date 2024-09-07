import { format } from 'date-fns'

export function formatRequestDateToSQLFormat(date: string): string {
  console.log(date)
  return format(new Date(date), 'yyy-MM-dd')
}
