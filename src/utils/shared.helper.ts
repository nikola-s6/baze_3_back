import { format } from 'date-fns'

export function formatRequestDateToSQLFormat(date: string): string {
  return format(new Date(date), 'yyy-MM-dd')
}
