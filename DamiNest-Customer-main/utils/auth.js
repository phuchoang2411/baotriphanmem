const jwt = require('jsonwebtoken')
const config = require('../config')

const getVerifyEmailToken = ({ userId, emailId }) => {
  return jwt.sign(
    {
      userId,
      emailId
    },
    config.SECRET_KEY,
    { expiresIn: '24h' }
  )
}

const getResetPasswordToken = ({ userId, resetPasswordId }) => {
  return jwt.sign(
    {
      userId,
      resetPasswordId
    },
    config.SECRET_KEY,
    { expiresIn: '24h' }
  )
}

module.exports = {
  getVerifyEmailToken,
  getResetPasswordToken
}
