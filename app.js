import createError from 'http-errors';
import express from 'express';
import path from 'path';
import logger from 'morgan';

import router from './src/routes/index.js';

const app = express();

app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());

const port = process.env.PORT || 3000;
app.use(router);

app.use(function(req, res, next) {
  next(createError(404,'Route Not Found'));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
});

  // if(process.parent){	
	  app.listen(port, () => { 
	  	console.log("Express server listening on port %d in %s mode", port, app.settings.env); 
	  });
  // }

export default app;