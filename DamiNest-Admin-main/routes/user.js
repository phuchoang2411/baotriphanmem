const express = require('express')
const router = express.Router()

const userController = require('../controllers/user')

router.get('/', userController.getAllUsers)
router.get('/block/:id', userController.blockUser)
router.get('/unblock/:id', userController.unblockUser)
router.get('/profile/:id', userController.getProfile)

module.exports = router
