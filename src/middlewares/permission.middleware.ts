import { NextFunction, Request, Response } from 'express'
import { CustomError } from '../errors/custom.error'
import { verify } from 'jsonwebtoken'
import { JWT_SECRET } from '../utils/environments'

const excludeRoutes = ['/auth/login', '/auth/register'].map(route => {
  return '/api/v1' + route
})

export type BaseTokenZaposleni = { email: string; imeIPrezime: string; iat: number; exp: number }

export async function PermissionMiddleware(req: Request, res: Response, next: NextFunction) {
  if (excludeRoutes.includes(req.path)) return next()

  const token = req.cookies['jwt'] ?? req.headers['authorization']?.split(' ')?.[1]
  if (!token) return next(new CustomError(401, 'JWT not found!'))

  try {
    const tokenUser = verify(token, JWT_SECRET) as BaseTokenZaposleni
    // @ts-ignore
    req.zaposleni = tokenUser
  } catch (err) {
    return next(new CustomError(401, 'Invalid token'))
  }

  next()
}
