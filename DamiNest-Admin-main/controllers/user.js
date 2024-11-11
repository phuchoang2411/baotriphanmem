const { UserModel } = require('../models');
//const { CUSTOMERS } = require('../constants');

const createUser = async (req, res) => {
  const user = new UserModel({
    fullName: 'Hoang Phuc',
    email: 'phuchoang2411@gmail.com',
    password: 'a',
    avatar: '/img/avatar/phuchoang.jpeg',
    isVerified: true,
    isBlocked: false,
    role: 'ADMIN',
  });
  const data = await user.save();
  res.json(data);
  console.log('Add ' + user.fullName + ' successfully!');
};

// const initUsers = async (req, res) => {
//   try {
//     const users = await UserModel.insertMany(CUSTOMERS);
//     return res.json(users);
//   } catch (error) {
//     res.status(400).send(error.message);
//   }
// };

const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find({ role: 'CUSTOMER' });

    res.render('user/list', { users });
    // res.send({ users });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getProfile = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await UserModel.findById(id);
    res.render('user/profile', { user });
    //res.send({ user });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const blockUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await UserModel.findByIdAndUpdate(
      id,
      { $set: { isBlocked: true } },
      { new: true }
    );
    console.log('blockUser', id, user);
    if (!user) return res.status(404).send('User with the given id not found');
    res.redirect(301, '/user');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const unblockUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await UserModel.findByIdAndUpdate(
      id,
      { $set: { isBlocked: false } },
      { new: true }
    );
    console.log('unblockUser', id, user);
    if (!user) return res.status(404).send('User with the given id not found');
    res.redirect(301, '/user');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  createUser,
  
  getAllUsers,
  getProfile,
  blockUser,
  unblockUser,
};
