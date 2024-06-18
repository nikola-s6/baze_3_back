import { Router } from 'express'
import * as authService from './auh.service'
import catchAsync from '../../errors/catch-error.helper'

const router = Router()
export default router

router.post(
  '/login',
  catchAsync(async (req, res) => {
    const { email, sifra } = req.body
    const r = await authService.login(email, sifra)
    res.send(r.sifra)
  })
)
