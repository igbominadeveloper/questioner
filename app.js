import express from 'express';
import logger from 'morgan';
import router from './src/routes/index';

const app = express();

app.use(logger('dev'));
app.use(express.json());
const port = process.env.PORT || 3000;
app.use(router);
app.listen(port, () => {
  console.log('Express server listening on port %d in %s mode', port, app.settings.env);
});
export default app;
