import { NextFunction, Request, Response } from 'express'

const ErrorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500
  const message = err.message || 'Internal server error'
  res.status(status).json({
    status,
    message
  })
}

export default ErrorMiddleware
