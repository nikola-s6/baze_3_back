import { APP_PORT } from './utils/environments'
import express from 'express'
import registerRoute from './utils/route-register.helper'
import authRouter from './components/auth/auth.router'
import bodyParser from 'body-parser'
import ErrorMiddleware from './middlewares/error-handling.middleware'
import javniPozivRouter from './components/javni-poziv/javni-poziv.router'
import { setTypeParesrs } from './components/parsers/type.parser'

const app = express()

app.use(bodyParser.json())

registerRoute(app, '/auth', authRouter)
registerRoute(app, '', javniPozivRouter)

app.use(ErrorMiddleware)

app.listen(APP_PORT, async () => {
  await setTypeParesrs()
  console.log(`Running express server on port: ${APP_PORT}`)
})
