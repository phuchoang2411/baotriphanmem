const { nanoid } = require('nanoid');
const passport = require('passport');
const queryString = require('query-string');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const axios = require('axios').default;

const { UserModel } = require('../models');
const { commonUtil, authUtil } = require('../utils');
const config = require('../config');
const { response } = require('express');

const sendVerifyEmail = async (userId) => {
  const emailId = nanoid();

  const user = await UserModel.findByIdAndUpdate(
    userId,
    { $set: { emailId } },
    { new: true }
  ).exec();

  if (!user) {
    throw new Error('Tài khoản không tồn tại');
  }

  if (user.isVerified) {
    throw new Error('Tài khoản đã được xác minh');
  }

  const token = authUtil.getVerifyEmailToken({
    userId,
    emailId,
  });

  const requestUrl = commonUtil.getInternalWebCustomerUrl(
    `/mail-service/auth/${user._id}/verify-email?token=${token}&secretKey=${config.SECRET_KEY}`
  );
  axios
    .get(requestUrl)
    .then((res) => console.log('sendVerifyEmail -> Success'))
    .catch((error) => console.log('sendVerifyEmail -> Error', error.message));

  return true;
};

const sendForgotPasswordEmail = async (email) => {
  const user = await UserModel.findOne({ email }).exec();

  if (!user) {
    throw new Error('Tài khoản không tồn tại');
  }

  const userId = user._id;
  const resetPasswordId = nanoid();

  const token = authUtil.getResetPasswordToken({
    userId,
    resetPasswordId,
  });

  await UserModel.findByIdAndUpdate(userId, {
    $set: { resetPasswordId },
  }).exec();

  const requestUrl = commonUtil.getInternalWebCustomerUrl(
    `/mail-service/auth/${user._id}/reset-password?token=${token}&secretKey=${config.SECRET_KEY}`
  );
  axios
    .get(requestUrl)
    .then((res) => console.log('sendForgotPasswordEmail -> Success'))
    .catch((error) =>
      console.log('sendForgotPasswordEmail -> Error', error.message)
    );

  return true;
};

// Router Controllers

const getRegister = (req, res, next) => {
  const registerRes = req.query?.res;

  res.render('auth/register', {
    registerRes,

    formAction: queryString.stringifyUrl({
      url: '/auth/register',
      query: { nextUrl: req.query?.nextUrl },
    }),

    loginUrl: queryString.stringifyUrl({
      url: '/auth/login',
      query: { nextUrl: req.query?.nextUrl },
    }),
  });

  // res.send({
  //   registerRes,

  //   formAction: queryString.stringifyUrl({
  //     url: '/auth/register',
  //     query: { nextUrl: req.query?.nextUrl },
  //   }),

  //   loginUrl: queryString.stringifyUrl({
  //     url: '/auth/login',
  //     query: { nextUrl: req.query?.nextUrl },
  //   }),
  // });
};

const postRegister = (req, res, next) => {
  const failureRedirect = queryString.stringifyUrl({
    url: '/auth/register',
    query: {
      nextUrl: req.query?.nextUrl,
      res: 'FAILED',
    },
  });

  passport.authenticate('register', {
    successRedirect: req.query?.nextUrl || '/profile',
    failureRedirect,
  })(req, res, next);
};

const getLogin = (req, res, next) => {
  console.log(req.query);

  const loginRes = req.query?.res;
  res.send({
    loginRes,

    formAction: queryString.stringifyUrl({
      url: '/auth/login',
      query: { nextUrl: req.query?.nextUrl },
    }),

    registerUrl: queryString.stringifyUrl({
      url: '/auth/register',
      query: { nextUrl: req.query?.nextUrl },
    }),
  });
  // res.render('auth/login', {
  //   loginRes,

  //   formAction: queryString.stringifyUrl({
  //     url: '/auth/login',
  //     query: { nextUrl: req.query?.nextUrl },
  //   }),

  //   registerUrl: queryString.stringifyUrl({
  //     url: '/auth/register',
  //     query: { nextUrl: req.query?.nextUrl },
  //   }),
  // });
};

const postLogin = (req, res, next) => {
  console.log(req.body.email);
  const failureRedirect = queryString.stringifyUrl({
    url: '/auth/login',
    query: {
      nextUrl: req.query?.nextUrl,
      res: 'FAILED',
    },
  });

  passport.authenticate('login', {
    successRedirect: req.query?.nextUrl || '/profile',
    failureRedirect: failureRedirect,
  })(req, res, next);
};

const getLogout = (req, res) => {
  req.logOut();
  res.redirect('/auth/login');
};

const postSendVerifyEmail = async (req, res) => {
  try {
    const userId = req.user._id;
    await sendVerifyEmail(userId);
    res.json(true);
  } catch (error) {
    res.boom.badRequest(error.message);
  }
};

const getVerifyEmail = async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      res.render('auth/verify-email', {
        success: false,
        errorMessage: 'Vui lòng nhập Token',
      });
      return;
    }

    const decoded = jwt.verify(token, config.SECRET_KEY);

    const userId = decoded?.userId;
    const emailId = decoded?.emailId;

    if (!userId || !emailId) {
      res.render('auth/verify-email', {
        success: false,
        errorMessage: 'Mã xác nhận không hợp lệ',
      });
      return;
    }

    const user = await UserModel.findOne({ _id: userId, emailId }).exec();

    if (!user) {
      res.render('auth/verify-email', {
        success: false,
        errorMessage: 'Mã xác nhận không hợp lệ',
      });
      return;
    }

    if (user.isVerified) {
      res.render('auth/verify-email', {
        success: false,
        errorMessage: 'Tài khoản đã được xác minh',
      });
      return;
    }

    await UserModel.findByIdAndUpdate(userId, {
      $set: { isVerified: true, emailId: '' },
    })
      .select('-password -emailId -resetPasswordId')
      .exec();

    res.render('auth/verify-email', {
      success: true,
      email: user.email,
    });
  } catch (err) {
    res.render('auth/verify-email', {
      success: false,
      errorMessage: 'Mã xác nhận không hợp lệ',
    });
  }
};

const getForgotPassword = async (req, res) => {
  res.render('auth/forgot-password');
};

const postForgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    await sendForgotPasswordEmail(email);
    res.json(true);
  } catch (error) {
    res.boom.badRequest(error.message);
  }
};

const getResetPassword = async (req, res) => {
  res.render('auth/reset-password', {
    token: req.query?.token,
  });
};

const postResetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    const decoded = jwt.verify(token, config.SECRET_KEY);
    const userId = decoded?.userId;
    const resetPasswordId = decoded?.resetPasswordId;

    if (!userId || !resetPasswordId) {
      res.boom.badRequest('Mã khôi phục không hợp lệ');
      return;
    }

    const user = await UserModel.findOne({
      _id: userId,
      resetPasswordId,
    }).exec();

    if (!user) {
      res.boom.badRequest('Mã khôi phục không hợp lệ');
      return;
    }

    const hashPassword = await bcrypt.hash(newPassword, 10);

    await UserModel.findByIdAndUpdate(userId, {
      $set: { password: hashPassword, resetPasswordId: '' },
    })
      .select('-password -emailId -resetPasswordId')
      .exec();

    res.json(true);
  } catch (err) {
    res.boom.badRequest('Mã khôi phục không hợp lệ');
  }
};

const checkEmail = async (req, res) => {
  const { email } = req.body;
  const isExists = (await UserModel.find({ email }).count().exec()) > 0;
  res.json(!isExists);
};

module.exports = {
  sendVerifyEmail,
  sendForgotPasswordEmail,

  getRegister,
  postRegister,

  getLogin,
  postLogin,
  getLogout,

  postSendVerifyEmail,
  getVerifyEmail,

  getForgotPassword,
  postForgotPassword,

  getResetPassword,
  postResetPassword,

  checkEmail,
};
