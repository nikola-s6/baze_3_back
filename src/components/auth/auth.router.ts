import { Request, Response, Router } from 'express'
import * as authService from './auh.service'
import catchAsync from '../../errors/catch-error.helper'

const router = Router()
export default router

router
  .post(
    '/login',
    catchAsync(async (req: Request, res: Response) => {
      const { email, sifra } = req.body
      const r = await authService.login(email, sifra)

      res.setHeader('Set-Cookie', `jwt=${r.jwt}; HttpOnly`)

      res.status(200).send({
        message: 'Uspesno ste se ulogovali!',
        data: {
          zaposleni: r.zaposeni
        }
      })
    })
  )
  .post(
    '/register',
    catchAsync(async (req: Request, res: Response) => {
      const { ime, prezime, email, sifra, brojTelefona, datumZaposlenja, maticniBroj } = req.body

      const result = await authService.register(ime, prezime, email, sifra, brojTelefona, datumZaposlenja, maticniBroj)

      res.status(200).json({
        message: 'Uspesna registracija!'
      })
    })
  )
