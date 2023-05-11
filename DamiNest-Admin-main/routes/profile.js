const express = require('express')
const router = express.Router()

const profileController = require('../controllers/profile')

router.get('/', profileController.getProfile)
router.get('/update', profileController.updateProfileView)
router.post('/update', profileController.updateProfile)
router.get('/update-password', profileController.updatePasswordView)
router.post('/update-password', profileController.updatePassword)

module.exports = router
