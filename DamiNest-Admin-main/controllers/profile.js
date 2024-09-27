const bcrypt = require('bcrypt');
const { UserModel } = require('../models/');

const getProfile = (req, res) => {
  res.render('profile/me');
  //res.send('profile/me');
};

const updateProfileView = (req, res) => {
  res.render('profile/update');
  //res.send('profile/me');
};

const updateProfile = async (req, res) => {
  const data = req.body;
  const user = await UserModel.findByIdAndUpdate(
    req.user._id,
    {
      fullName: data.fullName,
      email: data.email,
    },
    { new: true }
  );
  if (!user) return res.status(404).send('User with the given id not found');
  res.redirect(301, '/profile');
};

const updatePasswordView = async (req, res) => {
  const result = req.query?.res;
  res.render('profile/update-password', { result });
  //res.send({ result });
};

const updatePassword = async (req, res) => {
  const { currentPassword, newPassword, reNewPassword } = req.body;
  const user = await UserModel.findById(req.user._id);
  const validate = await user.isValidPassword(currentPassword);

  if (newPassword !== reNewPassword) {
    res.redirect('/profile/update-password?res=INCORRECT_RE_PASSWORD');
    return;
  }

  if (!validate) {
    res.redirect('/profile/update-password?res=INCORRECT_CURRENT_PASSWORD');
    return;
  }

  const hashPassword = await bcrypt.hash(newPassword, 10);

  await UserModel.findByIdAndUpdate(req.user._id, {
    $set: { password: hashPassword },
  }).exec();

  res.redirect('/profile/update-password?res=SUCCESS');
};

module.exports = {
  getProfile,
  updateProfileView,
  updateProfile,
  updatePasswordView,
  updatePassword,
};
