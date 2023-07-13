const express = require('express')
const router = express.Router()

const { authMiddleware } = require('../middlewares')
const { authController } = require('../controllers')

router.get('/register', authMiddleware.notRequiredLogin, authController.getRegister)
router.post('/register', authMiddleware.notRequiredLogin, authController.postRegister)

router.get('/login', authMiddleware.notRequiredLogin, authController.getLogin)
router.post('/login', authMiddleware.notRequiredLogin, authController.postLogin)
router.get('/logout', authMiddleware.requiredLogin, authController.getLogout)

router.post('/send-verify-email', authMiddleware.requiredLoginWithBoom, authController.postSendVerifyEmail)
router.get('/verify-email/:id', authController.getVerifyEmail)

router.get('/forgot-password', authController.getForgotPassword)
router.post('/forgot-password', authController.postForgotPassword)

router.get('/reset-password', authController.getResetPassword)
router.post('/reset-password', authController.postResetPassword)

router.post('/check-email', authController.checkEmail)

module.exports = router
