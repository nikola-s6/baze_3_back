import { format } from 'date-fns'
import { CustomError } from '../errors/custom.error'

export function formatRequestDateToSQLFormat(date: string): string {
  if (!date) throw new CustomError(400, 'Datumi su obavezno polje')
  return format(new Date(date), 'yyy-MM-dd')
}
