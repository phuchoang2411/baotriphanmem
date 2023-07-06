const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const logger = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const queryString = require('query-string');
const config = require('./config');
const appLocals = require('./app.locals');
const boom = require('express-boom');
const cors = require('cors')
const { passportMiddleware, authMiddleware } = require('./middlewares');
const { databaseUtil, commonUtil } = require('./utils');

const {
  aboutRouter,
  authRouter,
  handbookRouter,
  homeRouter,
  productsRouter,
  profileRouter,
  checkoutRouter,
  productReviewRouter,
  ordersRouter,
  mailRouter,
  // dataRouter
} = require('./routes');

const app = express();

app.locals = appLocals;

// connect to MongoDB
databaseUtil.connectDatabase();
app.use(cors({ origin: true, credentials: true }));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(boom());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Session

const sessionStore = new MongoStore({
  mongooseConnection: mongoose.connection,
  collection: 'sessions',
});

app.use(
  session({
    store: sessionStore,
    secret: config.SECRET_KEY,
    saveUninitialized: true,
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
app.use(passportMiddleware.injectLocals());

app.use((req, res, next) => {
  res.locals.currencyFormatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
  res.locals.queryString = queryString;
  res.locals.searchKeyword = req.query?.keyword || '';
  res.locals.currentUrl = req.originalUrl;
  res.locals.getMediaUrl = commonUtil.getMediaUrl;
  res.locals.GG_ANALYTICS_ID = config.GG_ANALYTICS_ID;
  res.locals.MEDIA_URL = config.MEDIA_URL;
  next();
});

// routes
app.use('/auth', authRouter);
app.use('/profile', authMiddleware.requiredLogin, profileRouter);
app.use('/about', aboutRouter);
app.use('/products', productsRouter);
app.use('/handbook', handbookRouter);
app.use('/checkout', checkoutRouter);
app.use('/product-review', productReviewRouter);
app.use('/orders', ordersRouter);
app.use('/mail-service', mailRouter);
// app.use('/data', dataRouter)
app.use('/', homeRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
// app.use((err, req, res, next) => {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//   // render the error page
//   res.status(err.status || 500);
//
// });

module.exports = app;
