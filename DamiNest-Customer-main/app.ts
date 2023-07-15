import createError from 'http-errors';
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import logger from 'morgan';
import session from 'express-session';
const MongoStore = require('connect-mongo')(session);
import mongoose from 'mongoose';
import queryString from 'query-string';
import config from './config';
import appLocals from './app.locals';
import boom from 'express-boom';

import { passportMiddleware, authMiddleware } from './middlewares';
import {
  databaseUtil,
  //commonUtil
} from './utils';

import {
  // aboutRouter,
  // authRouter,
  // handbookRouter,
  homeRouter,
  // productsRouter,
  // profileRouter,
  // checkoutRouter,
  // productReviewRouter,
  // ordersRouter,
  // mailRouter,
} from './routes';

interface Error {
  status?: number;
  message?: string;
}

const app = express();

app.locals = appLocals;

// connect to MongoDB
databaseUtil.connectDatabase();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// add some package
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
    secret: config.SECRET_KEY!,
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
  //res.locals.getMediaUrl = commonUtil.getMediaUrl;
  res.locals.GG_ANALYTICS_ID = config.GG_ANALYTICS_ID;
  res.locals.MEDIA_URL = config.MEDIA_URL;
  next();
});

// routes
// app.use('/auth', authRouter);
// app.use('/profile', authMiddleware.requiredLogin, profileRouter);
// app.use('/about', aboutRouter);
// app.use('/products', productsRouter);
// app.use('/handbook', handbookRouter);
// app.use('/checkout', checkoutRouter);
// app.use('/product-review', productReviewRouter);
// app.use('/orders', ordersRouter);
// app.use('/mail-service', mailRouter);
// app.use('/data', dataRouter)
app.use('/', homeRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error/index');
});
export default app;
