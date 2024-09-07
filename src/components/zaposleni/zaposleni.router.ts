import { Router, Request, Response } from 'express'
import catchAsync from '../../errors/catch-error.helper'
import { getZaposleniList } from './zaposleni.service'

const router = Router()
export default router

router.get(
  '',
  catchAsync(async (req: Request, res: Response) => {
    const response = await getZaposleniList()
    return res.status(200).json({
      data: response
    })
  })
)
