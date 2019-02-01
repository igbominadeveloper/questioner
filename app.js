import express from 'express';
import logger from 'morgan';
import router from './src/v1/routes';
import cors from 'cors';
const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 3000;
app.use(router);
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log('Express server listening on port %d in %s mode', port, app.settings.env);
  });
}
export default app;
