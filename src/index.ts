import { APP_PORT } from './utils/environments'
import express from 'express'
import registerRoute from './utils/route-register.helper'
import authRouter from './components/auth/auth.router'
import bodyParser from 'body-parser'
import ErrorMiddleware from './middlewares/error-handling.middleware'
import javniPozivRouter from './components/javni-poziv/javni-poziv.router'
import { setTypeParesrs } from './components/parsers/type.parser'
import { PermissionMiddleware } from './middlewares/permission.middleware'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import privredniSubjektRouter from './components/privredni-subjekt/privredni-subjekt.router'
import oznakaRouter from './components/oznaka/oznaka.router'
import valutaRouter from './components/valuta/valuta.router'
import jedinicaMereRouter from './components/jedinica-mere/jedinica-mere.router'
import ponudaRouter from './components/ponuda/ponuda.router'

const app = express()

app.use(cors({ credentials: true, origin: '*' }))

app.use(bodyParser.json())
app.use(cookieParser())
app.use(PermissionMiddleware)

registerRoute(app, '/auth', authRouter)
registerRoute(app, '/javni-poziv', javniPozivRouter)
registerRoute(app, '/privredni-subjekt', privredniSubjektRouter)
registerRoute(app, '/oznaka', oznakaRouter)
registerRoute(app, '/valuta', valutaRouter)
registerRoute(app, '/jedinica-mere', jedinicaMereRouter)
registerRoute(app, '/ponuda', ponudaRouter)

app.use(ErrorMiddleware)

app.listen(APP_PORT, async () => {
  await setTypeParesrs()
  console.log(`Running express server on port: ${APP_PORT}`)
})
