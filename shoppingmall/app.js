var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


//로그인 세션 처리부
var login = require('./routes/login');

var passport = require('passport');
var LocalStrategy = require('passport-local');
var cookieSession = require('cookie-session');
//var flash = require('connect-flash');

var mysql_dbc = require('./commons/db.js')();
var connection = mysql_dbc.init();
var product_page = require('./routes/product_page');
var cartRouter=require('./routes/cart');
//회원가입 세션 처리부
var joinForm = require('./routes/joinForm');
var manager = require('./routes/manager');
var managerJoin = require('./routes/managerJoin');
var productRouter=require('./routes/product');
var afterbuy = require('./routes/afterbuy');
var app = express();
//var saller = require('./routes/write');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieSession({
  keys: ['node_yun'],
  cookie: {
      maxAge: 1000 * 60 * 60 // 유효기간 1시간
  }
}));
app.use(cookieParser());
//app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login',login);
app.use('/join',joinForm);
app.use('/product_page',product_page);
app.use('/cart',cartRouter);
app.use('/cart',express.static('public'));
app.use('/cart/remove',express.static('public'));
app.use('/manager',manager);
app.use('/managerJoin',managerJoin);
app.use('/product',productRouter);
app.use('/afterbuy',afterbuy);

//app.use('/saller',saller);
//app.use('/write',write);

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