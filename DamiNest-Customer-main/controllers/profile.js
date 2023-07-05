const bcrypt = require('bcrypt');
const dayjs = require('dayjs');
const config = require('../config');

const { UserModel, OrderModel } = require('../models');

const index = async (req, res) => {
  // res.render('profile/me')
  //res.send('profile/me');
  const profile = await UserModel.findById(req.user._id).exec();

  res.json(profile);
};

const updateCart = async (req, res) => {
  try {
    const { user, body } = req;

    const userId = user._id;

    const updated = await UserModel.findByIdAndUpdate(
      userId,
      {
        $set: {
          cart: body,
        },
      },
      { new: true }
    )
      .select('-password -emailId -resetPasswordId')
      .exec();

    res.json(updated);
  } catch (error) {
    res.boom.badRequest(error.message);
  }
};

const patchMe = async (req, res) => {
  try {
    const updated = await UserModel.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          fullName: req.body?.fullName,
          phoneNumber: req.body?.phoneNumber,
          address: req.body?.address,
        },
      },
      { new: true }
    )
      .select('-password -emailId -resetPasswordId')
      .exec();

    res.json(updated);
  } catch (error) {
    res.boom.badRequest(error.message);
  }
};

const getChangePassword = (req, res) => {
  // res.render('profile/change-password');
  res.send('profile/change-password');
};

const patchChangePassword = async (req, res) => {
  try {
    const userId = req.user._id;
    const { currentPassword, newPassword } = req.body;

    const user = await UserModel.findById(userId).exec();

    const validate = await user.isValidPassword(currentPassword);

    if (!validate) {
      res.boom.unauthorized('Mật khẩu hiện tại không chính xác');
      return;
    }

    const hashPassword = await bcrypt.hash(newPassword, 10);

    const updated = await UserModel.findByIdAndUpdate(userId, {
      $set: { password: hashPassword },
    })
      .select('-password -emailId -resetPasswordId')
      .exec();

    res.json(updated);
  } catch (error) {
    res.boom.badRequest(error.message);
  }
};

const getPurchases = async (req, res) => {
  const page = req.query?.page;
  const result = await OrderModel.paginate(
    {
      ownerId: req.user._id,
    },
    {
      page: page || 1,
      limit: config.PAGE_LIMIT,
    }
  );

  res.locals.dayjs = dayjs;

  // res.render('profile/purchases', {
  //   purchases: result.docs,
  //   page: result.page,
  //   totalPages: result.totalPages,

  //   pageUrl: req.originalUrl,
  // });

  res.send({
    purchases: result.docs,
    page: result.page,
    totalPages: result.totalPages,

    pageUrl: req.originalUrl,
  });
};

module.exports = {
  index,
  patchMe,

  updateCart,

  getChangePassword,
  patchChangePassword,

  getPurchases,
};
