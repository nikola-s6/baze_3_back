import { Request, Response, Router } from 'express'
import * as authService from './auth.service'
import catchAsync from '../../errors/catch-error.helper'
import { baseUrl } from '../../utils/route-register.helper'
import { DOMAIN } from '../../utils/environments'

const router = Router()
export default router

router
  .post(
    '/login',
    catchAsync(async (req: Request, res: Response) => {
      const { email, sifra } = req.body
      const r = await authService.login(email, sifra)

      res.setHeader('Set-Cookie', `jwt=${r.jwt}; HttpOnly; Path=${baseUrl}; Domain=${DOMAIN}`)

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

      await authService.register(ime, prezime, email, sifra, brojTelefona, datumZaposlenja, maticniBroj)

      res.status(200).json({
        message: 'Uspesna registracija!'
      })
    })
  )
