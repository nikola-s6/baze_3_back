import { GetAllJavniPozivDTO, JavniPozivDetails, JavniPozivFilters } from '../../models/javni-poziv.model'
import { getJavniPozivAll, getJpDetails } from './javni-poziv.repository'
import * as db from '../../db/db'
import { formatRequestDateToSQLFormat } from '../../utils/shared.helper'
import { parseGetJavniPozivDetails, parserGetAllJavniPoziv } from '../parsers/javni-poziv.parser'
import { CustomError } from '../../errors/custom.error'
import { getPonudasForJp } from '../ponuda/ponuda.repository'
import { Ponuda } from '../../models/ponuda.model'
import { parseGetPonudasForJP } from '../parsers/ponuda.parser'

export async function getAllJavniPozivi(filteri: JavniPozivFilters) {
  if (filteri.datumIzdavanjaOd) filteri.datumIzdavanjaOd = formatRequestDateToSQLFormat(filteri.datumIzdavanjaOd)

  if (filteri.datumIzdavanjaDo) filteri.datumIzdavanjaDo = formatRequestDateToSQLFormat(filteri.datumIzdavanjaDo)

  if (filteri.datumZatvaranjaOd) filteri.datumZatvaranjaOd = formatRequestDateToSQLFormat(filteri.datumZatvaranjaOd)

  if (filteri.datumZatvaranjaDo) filteri.datumZatvaranjaDo = formatRequestDateToSQLFormat(filteri.datumZatvaranjaDo)

  return await db.execute<GetAllJavniPozivDTO>(getJavniPozivAll, filteri, parserGetAllJavniPoziv)
}

export async function getJavniPozivDetails(referentniBroj: number) {
  const javniPoziv = await db.transaction(async client => {
    const [jp, p] = await Promise.all([
      getJpDetails(client, { referentniBroj }),
      getPonudasForJp(client, { referentniBroj })
    ])
    const jparr: JavniPozivDetails[] = []
    parseGetJavniPozivDetails(jparr, jp)
    const jpObject = jparr?.[0]
    if (!jpObject) throw new CustomError(404, 'Ne postoji javni poziv sa ovim brojem')
    const ponude: Ponuda[] = []
    parseGetPonudasForJP(ponude, p)
    jpObject.ponude = ponude

    return jpObject
  })
  console.log(javniPoziv)
  return javniPoziv
}
