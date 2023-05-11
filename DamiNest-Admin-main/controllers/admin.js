const { UserModel } = require('../models')

const getRegister = (req, res) => {
  res.render('admin/register')
}

const getAdminList = async (req, res) => {
  const admins = await UserModel.find({ role: 'ADMIN' })
  res.render('admin/list', { admins })
}

const registerAdmin = async (req, res) => {
  try {
    const { fullName, email, password } = req.body
    await UserModel.create({ email, password, fullName, role: 'ADMIN' })
    res.redirect(301, '/admin')
  } catch (error) {
    console.log(error.message)
    res.redirect(301, '/admin/register?res=FAILED')
  }
}

const updateAdmin = async (req, res) => {
  try {
    const data = req.body
    const user = await UserModel.findByIdAndUpdate(req.user._id, {
      fullName: data.fullName,
      email: data.email
    }, { new: true })
    if (!user) return res.status(404).send('User with the given id not found')
    res.redirect(301, '/admin')
  } catch (error) {
    console.log(error.message)
  }
}

const updateAdminView = async (req, res) => {
  try {
    const admin = await UserModel.findById(req.params.id).exec()
    res.render('admin/update', {
      admin: admin
    })
  } catch (error) {
    res.status(404).send(error.message)
  }
}

module.exports = {
  getRegister,
  getAdminList,
  registerAdmin,
  updateAdmin,
  updateAdminView
}
