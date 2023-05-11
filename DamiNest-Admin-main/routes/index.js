const adminRouter = require('./admin')
const authRouter = require('./auth')
const productRouter = require('./product')
const homeRouter = require('./home')
const profileRouter = require('./profile')
const userRouter = require('./user')
const orderRouter = require('./order')
const reviewRouter = require('./review')

module.exports = {
  adminRouter,
  authRouter,
  productRouter,
  homeRouter,
  profileRouter,
  userRouter,
  orderRouter,
  reviewRouter
}
