const express = require('express')
const { orderController } = require('../controllers')
const router = express.Router()

router.patch('/:orderId/status', orderController.updateOrderStatus)

module.exports = router
