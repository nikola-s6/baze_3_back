import { Request, Response, Router } from 'express'
import catchAsync from '../../errors/catch-error.helper'
import { JavniPozivFilters, SaveJavniPoziv } from '../../models/javni-poziv.model'
import * as javniPozivService from './javni-poziv.service'
import { CustomError } from '../../errors/custom.error'
import { formatRequestDateToSQLFormat } from '../../utils/shared.helper'
import { BaseTokenZaposleni } from '../../middlewares/permission.middleware'
import { getTokenZaposleniMiddleware } from '../../middlewares/token-zaposleni.middleware'
import { Zaposleni, ZaposleniSifra } from '../../models/zaposleni.model'

const router = Router()
export default router

router
  .get(
    '',
    catchAsync(async (req: Request & { query: JavniPozivFilters }, res: Response) => {
      const response = await javniPozivService.getAllJavniPozivi(req.query)

      return res.status(200).json({
        data: response
      })
    })
  )
  .get(
    '/:referentniBroj',
    catchAsync(async (req: Request, res: Response) => {
      const { referentniBroj } = req.params
      const refBr = Number(referentniBroj)
      if (!referentniBroj || isNaN(refBr)) {
        throw new CustomError(400, 'Pogresna vrednost referentnog broja')
      }
      const response = await javniPozivService.getJavniPozivDetails(refBr)

      return res.status(200).json({
        data: response
      })
    })
  )
  .post(
    '',
    getTokenZaposleniMiddleware,
    catchAsync(async (req: Request & { zaposleni: ZaposleniSifra & { zaposleniId: number } }, res: Response) => {
      const jp: SaveJavniPoziv = {
        ...req.body,
        obrazlozenjeProduzenja: req.body.obrazlozenjeProduzenja ?? '',
        datumi: {
          datumIzdavanja: formatRequestDateToSQLFormat(req.body.datumIzdavanja),
          datumZatvaranja: formatRequestDateToSQLFormat(req.body.datumZatvaranja)
        },
        oznakaId: Number(req.body.oznaka),
        valutaId: Number(req.body.valuta),
        zaposleniId: Number(req.zaposleni.zaposleniId),
        procenjenaVrednost: Number(req.body.procenjenaVrednost)
      }
      if (!jp.kriterijumi?.length) throw new CustomError(400, 'Kriterijumi poziva su obavezno polje')
      const r = await javniPozivService.createJavniPoziv(jp)
      return res.status(200).json({
        data: r
      })
    })
  )
