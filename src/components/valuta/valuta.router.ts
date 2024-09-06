import { Router, Request, Response } from 'express'
import catchAsync from '../../errors/catch-error.helper'
import { getAllValuta } from './valuta.service'

const router = Router()
export default router

router.get(
  '/valuta',
  catchAsync(async (req: Request, res: Response) => {
    const response = await getAllValuta()
    return res.status(200).json({
      data: response
    })
  })
)
