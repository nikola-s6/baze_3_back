import { GetAllJavniPozivDTO, JavniPozivFilters } from '../../models/javni-poziv.model'
import { getJavniPozivAll } from './javni-poziv.repository'
import * as db from '../../db/db'
import { formatRequestDateToSQLFormat } from '../../utils/shared.helper'
import { parserGetAllJavniPoziv } from '../parsers/javni-poziv.parser'

export async function getAllJavniPozivi(filteri: JavniPozivFilters) {
  if (filteri.datumIzdavanjaOd) filteri.datumIzdavanjaOd = formatRequestDateToSQLFormat(filteri.datumIzdavanjaOd)

  if (filteri.datumIzdavanjaDo) filteri.datumIzdavanjaDo = formatRequestDateToSQLFormat(filteri.datumIzdavanjaDo)

  if (filteri.datumZatvaranjaOd) filteri.datumZatvaranjaOd = formatRequestDateToSQLFormat(filteri.datumZatvaranjaOd)

  if (filteri.datumZatvaranjaDo) filteri.datumZatvaranjaDo = formatRequestDateToSQLFormat(filteri.datumZatvaranjaDo)

  return await db.execute<GetAllJavniPozivDTO>(getJavniPozivAll, filteri, parserGetAllJavniPoziv)
}
