const express = require('express')
const router = express.Router()

const { profileController } = require('../controllers')

router.get('/', profileController.index)
router.patch('/me', profileController.patchMe)

router.put('/cart', profileController.updateCart)

router.get('/change-password', profileController.getChangePassword)
router.patch('/change-password', profileController.patchChangePassword)

router.get('/purchases', profileController.getPurchases)

module.exports = router
