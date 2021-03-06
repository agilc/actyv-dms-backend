var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors');

var filesRouter = require('./routes/file');
var usersRouter = require('./routes/user');
var deptRouter = require('./routes/dept');
var categoryRouter = require('./routes/category');
const { MONGODB_URL } = require('./constants/app');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});

// Connection to mongoDB
mongoose.connect(MONGODB_URL, { useNewUrlParser: true })
    .then(()=> console.log("Connected to MongoDB"))
    .catch(error => console.error("Could not connect to mongoDB",error));

// routing
app.use('/user', usersRouter);
app.use('/files', filesRouter);
app.use('/department', deptRouter);
app.use('/category', categoryRouter);

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
