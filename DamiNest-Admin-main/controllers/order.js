const { OrderModel, ProductModel } = require('../models')
const mongoose = require('mongoose')
const _ = require('lodash')
const axios = require('axios').default
const config = require('../config')

const getAllOrder = async (req, res) => {
  try {
    const orders = await OrderModel.find()
    res.render('order/list', { orders })
  } catch (error) {
    console.log(error.message)
  }
}

const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params
    const { status, reasonsForRejection } = req.body
    const pushNotification = req.body?.pushNotification === 'on'

    // statusMessage: {
    //   PENDING: 'Đang chờ xác nhận',
    //   PROCESSING: 'Đang xử lí',
    //   TRANSFERRING: 'Đang vận chuyển',
    //   DONE: 'Giao hàng và thanh toán thành công',
    //   REJECT: 'Đã hủy do {{reasons}}'
    // },

    const isValidData = _.isBoolean(pushNotification) && ['PENDING', 'PROCESSING', 'TRANSFERRING', 'DONE', 'REJECTED'].includes(status)
    if (!isValidData) {
      res.send('Dữ liệu không hợp lệ')
      return
    }

    const order = await OrderModel.findByIdAndUpdate(orderId, {
      $set: {
        pushNotification,
        reasonsForRejection,
        status
      }
    }, { new: true }).exec()

    if (!order) {
      res.boom.badData('Đơn hàng không tồn tại.')
      return
    }

    if (pushNotification) {
      axios
        .get(`${config.PUBLIC_WEB_CUSTOMER_URL}/mail-service/orders/${order._id}?status=${status}&secretKey=${config.SECRET_KEY}`)
        .then((data) => console.log('sendOrderEmail -> Success', data))
        .catch((error) => console.log('sendOrderData -> Error', error.message))
    }

    if (status === 'DONE') {
      const products = order.products
      products.forEach((product) => {
        if (mongoose.isValidObjectId(product.productId)) {
          ProductModel.findByIdAndUpdate(product.productId, { $inc: { totalPurchases: 1 } }).exec()
        }
      })
    }

    res.redirect('/order')
  } catch (error) {
    res.boom.badRequest(error.message)
  }
}

const getUpdateOrderStatus = async (req, res) => {
  const { orderId } = req.params

  const order = await OrderModel.findById(orderId)

  if (!order) {
    res.send('Đơn hàng không tồn tại')
    return
  }

  res.render('order/updateStatus', {
    order
  })
}

module.exports = {
  getAllOrder,
  updateOrderStatus,
  getUpdateOrderStatus
}
