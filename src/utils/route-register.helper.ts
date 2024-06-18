import { Express, Router } from 'express';

const registerRoute = (app: Express, route: string, router: Router) => {
  app.use(route, router);
};

export default registerRoute;
