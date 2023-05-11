const express = require('express')
const router = express.Router()

const orderController = require('../controllers/order')

router.get('/', orderController.getAllOrder)
router.get('/update-status/:orderId', orderController.getUpdateOrderStatus)
router.post('/update-status/:orderId', orderController.updateOrderStatus)

module.exports = router
