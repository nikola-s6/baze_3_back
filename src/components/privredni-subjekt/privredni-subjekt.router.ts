import { Request, Response, Router } from 'express'
import catchAsync from '../../errors/catch-error.helper'
import * as db from '../../db/db'
import { PrivredniSubjekt } from '../../models/privredni-subjekt.model'
import { getAllPrivredniSubjekt } from './privredni-subjekt.service'

const router = Router()
export default router

router.get(
  '/privredni-subjekt',
  catchAsync(async (req: Request, res: Response) => {
    const response = await getAllPrivredniSubjekt()
    return res.status(200).json({
      data: response
    })
  })
)
