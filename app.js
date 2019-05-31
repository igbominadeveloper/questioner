import express from 'express';
import logger from 'morgan';
import router from './src/v1/routes';
import cors from 'cors';
const app = express();
import bodyParser from 'body-parser';
app.use(logger('dev'));
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(express.json());
const port = process.env.PORT || 3000;
app.use(router);
if (!module.parent) {
  app.listen(port, () => {
    console.log('Express server listening on port %d in %s mode', port, app.settings.env);
  });
}
export default app;
