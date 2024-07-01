import { NextFunction, Request, Response } from 'express'
import { BaseTokenZaposleni } from './permission.middleware'
import * as db from '../db/db'
import { ZaposleniSifra } from '../models/zaposleni.model'
import { getZaposleniByEmail } from '../components/zaposleni/zaposleni.repository'
import { CustomError } from '../errors/custom.error'

export async function getTokenZaposleniMiddleware(
  req: Request & { zaposleni: BaseTokenZaposleni },
  res: Response,
  next: NextFunction
) {
  const baseZaposleni = req.zaposleni
  const [zaposleni] = await db.execute<ZaposleniSifra>(getZaposleniByEmail, {
    email: baseZaposleni.email
  })
  if (!zaposleni) return next(new CustomError(401, 'Unauthorized'))

  delete zaposleni.sifra
  // @ts-ignore
  req.zaposleni = zaposleni
  next()
}
