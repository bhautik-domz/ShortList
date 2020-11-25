var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
var config = require('./config');
var flash = require('connect-flash');

const mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var aboutusRouter = require('./routes/aboutus');
var contactusRouter =require('./routes/contactus');
var signupRouter =require('./routes/signup');
var loginRouter =require('./routes/login');
var logoutRouter =require('./routes/logout');
var profileRouter = require('./routes/Profile');
var linkRouter = require('./routes/link');
var developmentRouter = require('./routes/development');

// DataBase Part

const url = config.mongoUrl;
const connect = mongoose.connect(url);

connect.then((db) => {
  console.log('Connected currectly to the server!....');
}, (err) => { console.log(err); });


var app = express();

// view engine setup part


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));


//Session 
app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));


//Routes Part

app.use('/', indexRouter);
app.use('/aboutus', aboutusRouter);
app.use('/contactus', contactusRouter);
app.use('/signup', signupRouter);
app.use('/login',loginRouter);
app.use('/logout',logoutRouter);
app.use('/profile',profileRouter);
app.use('/link',linkRouter);
app.use('/development',developmentRouter);


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
