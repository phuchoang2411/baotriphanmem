const express = require('express')
const router = express.Router()
const adminController = require('../controllers/admin')

router.get('/', adminController.getAdminList)
router.get('/register', adminController.getRegister)
router.post('/register', adminController.registerAdmin)
router.post('/update/:id', adminController.updateAdmin)
router.get('/update/:id', adminController.updateAdminView)

module.exports = router
