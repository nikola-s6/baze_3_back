import { Router, Request, Response } from 'express'
import catchAsync from '../../errors/catch-error.helper'
import { CustomError } from '../../errors/custom.error'
import { createOdluka, getOdlukaDetails } from './odluka.service'
import { CreateOdlukaDTO } from '../../models/odluka.mode'
import { formatRequestDateToSQLFormat } from '../../utils/shared.helper'

const router = Router()
export default router

router
  .get(
    '/javni-poziv/:referentniBrojJP',
    catchAsync(async (req: Request, res: Response) => {
      const { referentniBrojJP } = req.params
      const refBr = Number(referentniBrojJP)
      if (!referentniBrojJP || isNaN(refBr)) {
        throw new CustomError(400, 'Pogresna vrednost referentnog broja')
      }
      const response = await getOdlukaDetails(refBr)
      return res.status(200).json({
        data: response?.[0]
      })
    })
  )
  .post(
    '',
    catchAsync(async (req: Request, res: Response) => {
      const odlukaDto: CreateOdlukaDTO = {
        ...req.body,
        datumOdluke: formatRequestDateToSQLFormat(req.body.datumOdluke)
      }
      const response = await createOdluka(odlukaDto)
      res.status(200).json({
        data: response
      })
    })
  )
