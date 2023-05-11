const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const config = require('./config');
const { passportMiddleware, authMiddleware } = require('./middlewares');
const { databaseUtils } = require('./utils');

const {
  adminRouter,
  authRouter,
  homeRouter,
  profileRouter,
  productRouter,
  userRouter,
  orderRouter,
  reviewRouter,
} = require('./routes');

const app = express();

// connect to MongoDB
databaseUtils.connectDatabase();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Session

const sessionStore = new MongoStore({
  mongooseConnection: mongoose.connection,
  collection: 'adminSessions',
});

app.use(
  session({
    store: sessionStore,
    secret: config.SECRET_KEY,
    saveUninitialized: false,
    cookie: {
      // Creating 24 hours * 7 days from milliseconds
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
    resave: false,
  })
);

// Passport
passportMiddleware.applyPassportMiddleware(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.isAuthenticated = req.isAuthenticated();
  next();
});

app.use('/auth', authRouter);
app.use('/admin', authMiddleware.isAuthenticated, adminRouter);
app.use('/user', authMiddleware.isAuthenticated, userRouter);
app.use('/product', authMiddleware.isAuthenticated, productRouter);
app.use('/profile', authMiddleware.isAuthenticated, profileRouter);
app.use('/', authMiddleware.isAuthenticated, homeRouter);
app.use('/order', authMiddleware.isAuthenticated, orderRouter);
app.use('/review', authMiddleware.isAuthenticated, reviewRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;

  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error/error');
});

module.exports = app;
