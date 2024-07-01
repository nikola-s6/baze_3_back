import { Express, Router } from 'express'

export const baseUrl = '/api/v1'

const registerRoute = (app: Express, route: string, router: Router) => {
  app.use(baseUrl + route, router)
}

export default registerRoute
