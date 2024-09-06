import { Router, Request, Response } from 'express'
import catchAsync from '../../errors/catch-error.helper'
import { getAllJedinicaMere } from './jedinica-mere.service'

const router = Router()
export default router

router.get(
  '',
  catchAsync(async (req: Request, res: Response) => {
    const response = await getAllJedinicaMere()
    return res.status(200).json({
      data: response
    })
  })
)
