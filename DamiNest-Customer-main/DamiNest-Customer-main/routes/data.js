const express = require('express')
const { dataController } = require('../controllers')
const router = express.Router()

router.get('/init-customers', dataController.initCustomers)
router.get('/init-products', dataController.initProducts)

module.exports = router
