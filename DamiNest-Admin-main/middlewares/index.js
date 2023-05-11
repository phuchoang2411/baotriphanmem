const passportMiddleware = require('./passport')
const authMiddleware = require('./auth')
const upload = require('./upload')

module.exports = {
  passportMiddleware,
  authMiddleware,
  upload
}
