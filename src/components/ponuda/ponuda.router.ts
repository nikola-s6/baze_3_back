import { Router, Request, Response } from 'express'
import catchAsync from '../../errors/catch-error.helper'
import { getTokenZaposleniMiddleware } from '../../middlewares/token-zaposleni.middleware'
import { ZaposleniSifra } from '../../models/zaposleni.model'
import { CreatePonudaDTO } from '../../models/ponuda.model'
import { createPonuda, deletePonuda, getPonudaDetails } from './ponuda.service'
import { formatRequestDateToSQLFormat } from '../../utils/shared.helper'
import { CustomError } from '../../errors/custom.error'

const router = Router()
export default router

router
  .post(
    '',
    getTokenZaposleniMiddleware,
    catchAsync(async (req: Request & { zaposleni: ZaposleniSifra & { zaposleniId: number } }, res: Response) => {
      const ponuda: CreatePonudaDTO = {
        ...req.body,
        cenaBezPdv: Number(req.body.cenaBezPDV),
        cenaSaPdv: Number(req.body.cenaSaPDV),
        datum: formatRequestDateToSQLFormat(req.body.datum),
        ponudeKriterijuma: req.body.ponudeKriterijuma.map(ponuda => {
          return {
            ...ponuda,
            vrednost: Number(ponuda.vrednost)
          }
        })
      }

      const r = await createPonuda(ponuda, req.zaposleni.zaposleniId)

      return res.status(200).json({
        data: r
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
      const response = await getPonudaDetails(refBr)
      return res.status(200).json({
        data: response
      })
    })
  )
  .delete(
    '/:referentniBroj',
    catchAsync(async (req: Request, res: Response) => {
      const { referentniBroj } = req.params
      const refBr = Number(referentniBroj)
      if (!referentniBroj || isNaN(refBr)) {
        throw new CustomError(400, 'Pogresna vrednost referentnog broja')
      }
      console.log('uslo')
      await deletePonuda(refBr)
      return res.status(200).json({})
    })
  )
