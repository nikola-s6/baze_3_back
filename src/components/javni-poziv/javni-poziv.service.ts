import {
  GetAllJavniPozivDTO,
  JavniPozivDetails,
  JavniPozivFilters,
  Kriterijum,
  SaveJavniPoziv
} from '../../models/javni-poziv.model'
import { getJavniPozivAll, getJpDetails, saveJavniPoziv } from './javni-poziv.repository'
import * as db from '../../db/db'
import { formatRequestDateToSQLFormat } from '../../utils/shared.helper'
import { parseGetJavniPozivDetails, parserGetAllJavniPoziv } from '../parsers/javni-poziv.parser'
import { CustomError } from '../../errors/custom.error'
import { getPonudasForJp } from '../ponuda/ponuda.repository'
import { Ponuda } from '../../models/ponuda.model'
import { parseGetPonudasForJP } from '../parsers/ponuda.parser'
import { getKriterijumiPoziva, saveKriterijum } from '../kriterijum-poziva/kriterijum-poziva.repository'
import { kriterijumParser } from '../parsers/kriterijum.parser'

export async function getAllJavniPozivi(filteri: JavniPozivFilters) {
  if (filteri.datumIzdavanjaOd) filteri.datumIzdavanjaOd = formatRequestDateToSQLFormat(filteri.datumIzdavanjaOd)

  if (filteri.datumIzdavanjaDo) filteri.datumIzdavanjaDo = formatRequestDateToSQLFormat(filteri.datumIzdavanjaDo)

  if (filteri.datumZatvaranjaOd) filteri.datumZatvaranjaOd = formatRequestDateToSQLFormat(filteri.datumZatvaranjaOd)

  if (filteri.datumZatvaranjaDo) filteri.datumZatvaranjaDo = formatRequestDateToSQLFormat(filteri.datumZatvaranjaDo)

  return await db.execute<GetAllJavniPozivDTO>(getJavniPozivAll, filteri, parserGetAllJavniPoziv)
}

export async function getJavniPozivDetails(referentniBroj: number) {
  console.log('usloo detalji')
  const javniPoziv = await db.transaction(async client => {
    const [jp, p, k] = await Promise.all([
      getJpDetails(client, { referentniBroj }),
      getPonudasForJp(client, { referentniBroj }),
      getKriterijumiPoziva(client, { referentniBroj })
    ])
    const jparr: JavniPozivDetails[] = []
    parseGetJavniPozivDetails(jparr, jp)
    const jpObject = jparr?.[0]
    if (!jpObject) throw new CustomError(404, 'Ne postoji javni poziv sa ovim brojem')

    const ponude: Ponuda[] = []
    parseGetPonudasForJP(ponude, p)
    jpObject.ponude = ponude

    const kriterijumi: Kriterijum[] = []
    kriterijumParser(kriterijumi, k)
    jpObject.kriterijumi = kriterijumi

    return jpObject
  })
  console.log('detaljiiii')
  return javniPoziv
}

export async function createJavniPoziv(jp: SaveJavniPoziv) {
  const id = await db.transaction(async client => {
    const r = await saveJavniPoziv(client, { jp })
    if (!r.rowCount) throw new CustomError(500, 'Neuspesno cuvanje javnog poziva')
    const jpId = r.rows[0].referentniBrojJP
    const res = await Promise.all(
      jp.kriterijumi.map(kriterijum => {
        return saveKriterijum(client, { nazivKriterijumaPoziva: kriterijum, referentniBrojJP: jpId })
      })
    )
    return jpId
  })

  return await getJavniPozivDetails(id)
}
