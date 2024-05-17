import { APP_PORT } from './environments';
import express from 'express';

const app = express();

app.listen(APP_PORT, () => {
  console.log(`Running express server on port: ${APP_PORT}`);
});
