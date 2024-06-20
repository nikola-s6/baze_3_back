import { NextFunction, Request, Response } from 'express'
import errorConstants from '../errors/error-constants'

const ErrorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  let status = err.status
  const message = err.message || 'Serverska greska!'

  if (!status) {
    switch (message) {
      case errorConstants.notFound:
        status = 404
        break
      case errorConstants.missingParams:
        status = 400
        break

      default:
        status = 500
        break
    }
  }

  res.status(status).json({
    status,
    message
  })
}

export default ErrorMiddleware
