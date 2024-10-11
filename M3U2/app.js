var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//paso 1
var visionRouter= require('./routes/vision'); //routes /contacto.js
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/vision', visionRouter);
// RITA 1
app.get('/prueba', function (_req, res) {
  res.send('Esta es la prueba')
})
// RITA 2
app.get('/nosotros', function (_req, res) {
  res.send('Esta es la pagina de nosotros')
})
//RUTA 3
app.get('/destacados', function (_req, res) {
  res.send('Esta es la pagina de destacados')
})
//RUTA 4
app.get('/productos', function (_req, res) {
  res.send('Esta es la pagina de productos')
})
// RITA 5
app.get('/contacto', function (_req, res) {
  res.send('Esta es la pagina de contacto')
})
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
