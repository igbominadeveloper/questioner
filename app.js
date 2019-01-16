import createError from 'http-errors';
import express from 'express';
import path from 'path';
// import bodyparser from 'body-parser';
import logger from 'morgan';

import router from './src/routes/index.js';

const app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
// app.use(bodyparser);

const port = process.env.PORT || 3000;
app.use(router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404,'Route Not Found'));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err);
});

  // if(process.parent){	
	  app.listen(port, () => { 
	  	console.log("Express server listening on port %d in %s mode", port, app.settings.env); 
	  });
  // }

export default app;