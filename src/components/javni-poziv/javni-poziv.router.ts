import { Request, Response, Router } from 'express'
import catchAsync from '../../errors/catch-error.helper'
import { JavniPozivFilters } from '../../models/javni-poziv.model'
import * as javniPozivService from './javni-poziv.service'

const router = Router()
export default router

router.get(
  '/javni-poziv',
  catchAsync(async (req: Request, res: Response & { query: JavniPozivFilters }) => {
    const response = await javniPozivService.getAllJavniPozivi(req.query)

    return res.status(200).json({
      data: response
    })
  })
)
