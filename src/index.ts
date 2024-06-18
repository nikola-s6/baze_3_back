import { APP_PORT } from './utils/environments'
import express from 'express'
import registerRoute from './utils/route-register.helper'
import authRouter from './components/auth/auth.router'
import bodyParser from 'body-parser'
import ErrorMiddleware from './middlewares/error-handling.middleware'

const app = express()

app.use(bodyParser.json())

registerRoute(app, '/auth', authRouter)

app.use(ErrorMiddleware)

app.listen(APP_PORT, () => {
  console.log(`Running express server on port: ${APP_PORT}`)
})
