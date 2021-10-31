/**
 * app.js
 *  - 프로젝트의 전반적인 설정에 대한 파일 ( application.yml에 대응 )
 * 
 * package.json
 *  - 프로젝트의 의존성을 관리하는 파일 ( web.xml 혹은 gradle.bundle과 대응 )
 * 
 * bin/wwww
 *  - http등 각종 포트에 대한 서버 설정
 * 
 * public
 *  - static 파일 관리
 * 
 * routes
 *  - view의 요청에 대한 비지니스 로직을 수행 할 수 있도록 연결 ( controller 에 대응 )
 * 
 * view
 *  - view단에 대응
 */

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// 아래 joinRouter를 추가해주자.
// 회원 가입을 위한 라우터 추가
const joinRouter = require('./routes/sign/join');

var app = express();

// maria db
const maria = require('./maria');
maria.connect();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
// 회원 가입을 위한 추가
app.use('/join', joinRouter);

app.use(express.static(path.join(__dirname, 'public')));

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
