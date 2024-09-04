import { Request, Response, Router } from 'express'
import catchAsync from '../../errors/catch-error.helper'
import { JavniPozivFilters } from '../../models/javni-poziv.model'
import * as javniPozivService from './javni-poziv.service'
import { CustomError } from '../../errors/custom.error'

const router = Router()
export default router

router
  .get(
    '/javni-poziv',
    catchAsync(async (req: Request & { query: JavniPozivFilters }, res: Response) => {
      const response = await javniPozivService.getAllJavniPozivi(req.query)

      return res.status(200).json({
        data: response
      })
    })
  )
  .get(
    '/javni-poziv/:referentniBroj',
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
