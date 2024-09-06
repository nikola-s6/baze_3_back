import { CreatePonudaDTO, Ponuda } from '../../models/ponuda.model'
import * as db from '../../db/db'
import { createPonuda as cp, getPonudasForJp } from './ponuda.repository'
import { CustomError } from '../../errors/custom.error'
import { createPonudaKriterijuma } from '../ponuda-kriterijuma/ponude-kriterijuma.repository'
import { kriterijumParser } from '../parsers/kriterijum.parser'
import { parseGetPonudasForJP } from '../parsers/ponuda.parser'

export async function createPonuda(ponuda: CreatePonudaDTO, zaposleniId: number) {
  const ponude = await db.transaction(async client => {
    const response = await cp(client, { ponuda: ponuda, zaposleniId })
    if (!response.rowCount) throw new CustomError(500, 'Neuspesno kreiranje ponude')
    const ponudaId = response.rows[0].referentniBrojPonude
    await Promise.all(
      ponuda.ponudeKriterijuma.map(pk => {
        return createPonudaKriterijuma(client, { ponudaKriterijuma: { ...pk, referentniBrojPonude: ponudaId } })
      })
    )

    const allPonudas = await getPonudasForJp(client, { referentniBroj: ponuda.referentniBrojJP })
    const ponude: Ponuda[] = []
    parseGetPonudasForJP(ponude, allPonudas)
    return ponude
  })
  return ponude
}
