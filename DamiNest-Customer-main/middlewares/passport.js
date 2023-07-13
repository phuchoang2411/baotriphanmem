const LocalStrategy = require('passport-local').Strategy;

const { UserModel } = require('../models');
const { authController } = require('../controllers');

const registerStrategy = new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
  },
  async (req, email, password, done) => {
    try {
      let cart = [];
      //
      // Neu nguoi dung chua register & muon thanh toan cartLS
      // -> Khoi tao cart cua tai khoan dang register thanh cartLS
      //
      if (['/checkout/shipping'].includes(req.query?.nextUrl)) {
        cart = JSON.parse(req.body.cartLS) || [];
      }

      const user = await UserModel.create({
        email,
        password,
        fullName: req.body?.fullName,
        cart,
      });

      // Send verify email
      authController.sendVerificationEmail(user._id,email,req.headers.host)
          .then((data) =>
              console.log('registerStrategy -> sendVerifyEmail -> Success', data)
          )
          .catch((error) =>
              console.log(
                  'registerStrategy -> sendVerifyEmail -> Error',
                  error.message
              )
          );

      return done(null, true, user);
    } catch (error) {
      done(null, false, { message: error.message });
    }
  }
);

const loginStrategy = new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
  },
  async (req, email, password, done) => {
    try {
      const user = await UserModel.findOne({ email }).exec();


      if (!user) {
        console.log(email);
        return done(null, false, { message: 'Tài khoản không tồn tại' });
      }

      if (user.isBlocked) {
        return done(null, false, { message: 'Tài khoản đã bị khoá' });
      }

      const validate = await user.isValidPassword(password);

      if (!validate) {
        console.log(password);
        return done(null, false, { message: 'Mật khẩu không chính xác' });
      }
      if(user.isVerified===false) {
        console.log(password);
        return done(null, false, { message: 'Tài khoảng chưa xác thực' });
      }

      //
      // Neu nguoi dung chua login & muon thanh toan cartLS
      // -> Replace cart cua tai khoan dang login thanh cartLS
      //
      if (['/checkout/shipping'].includes(req.query?.nextUrl)) {
        const cart = JSON.parse(req.body.cartLS) || [];
        UserModel.findByIdAndUpdate(user._id, {
          $set: {
            cart,
          },
        }).exec();
      }

      return done(null, true,user);
    } catch (error) {
      return done(null, false, { message: error.message });
    }
  }
);

const serializeUser = (user, done) => {
  console.log("serializeUser")
  done(null, user._id)
};

const deserializeUser = async (id, done) => {
  try {
    const user = await UserModel.findById(id).exec();
    return done(null, user);
  } catch (error) {
    return done(error);
  }
};

const applyPassportMiddleware = (passport) => {
  passport.use('register', registerStrategy);
  passport.use('login', loginStrategy);

  passport.serializeUser(serializeUser);
  passport.deserializeUser(deserializeUser);

  return passport;
};

const injectLocals = () => (req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.isAuthenticated = req.isAuthenticated();
  next();
};

module.exports = {
  applyPassportMiddleware,
  injectLocals,
};
