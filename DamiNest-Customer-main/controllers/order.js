const _ = require('lodash')
const mongoose = require('mongoose')
const axios = require('axios')

const { ProductModel, OrderModel, UserModel } = require('../models')

const config = require('../config')
const { mailUtil, commonUtil } = require('../utils')

const createOrder = async (req, res, next) => {
  try {
    const { body } = req

    const productsFound = await ProductModel.find({
      _id: {
        $in: body.products.map((product) => product.productId)
      }
    }).exec()

    const productsObj = {}
    productsFound.forEach((product) => {
      productsObj[String(product._id)] = product
    })

    const products = body.products.map((p) => {
      const productId = String(p.productId)
      const product = productsObj?.[productId]

      if (!product) {
        return null
      }

      return {
        productId,
        name: product.name,
        featuredImage: product.featuredImage,
        price: product.price,
        discount: product.discount,
        quantity: p.quantity,
        total: (product.price - product.discount) * p.quantity
      }
    }).filter((p) => !!p)

    const total = products.reduce((prev, current) => prev + current.total, 0)

    const newOrder = new OrderModel({
      ownerId: req.user._id,
      email: req.user.email,
      fullName: body.fullName,
      phoneNumber: body.phoneNumber,
      shippingAddress: body.shippingAddress,
      products: products,
      paymentMethod: body.paymentMethod,
      total: total,
      status: 'PENDING'
    })

    // Save order and clear cart
    const [order] = await Promise.all([
      newOrder.save(),
      UserModel.findByIdAndUpdate(req.user._id, {
        $set: { cart: [] }
      }).exec()
    ])

    const requestUrl = commonUtil.getInternalWebCustomerUrl(`/mail-service/orders/${order._id}?status=PENDING&secretKey=${config.SECRET_KEY}`)
    axios
      .get(requestUrl)
      .then((res) => console.log('sendOrderEmail -> Success'))
      .catch((error) => console.log('sendOrderEmail -> Error', error.message))

    res.json(order)
  } catch (error) {
    res.boom.badData(error.message)
  }
}

const sendOrderEmail = async (status, order) => {
  await mailUtil.sendMail({
    from: 'DamiNest Support',
    to: order.email,
    subject: `Đơn hàng ${order._id}`,
    content: `Trạng thái đơn : ${status}`
  })
}

const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params
    const { pushNotification, status, reasonsForRejection } = req.body

    const isValidData = _.isBoolean(pushNotification) && ['PENDING', 'PROCESSING', 'TRANSFERRING', 'DONE', 'REJECTED'].includes(status)
    if (!isValidData) {
      res.boom.badData('Dữ liệu không hợp lệ;')
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
      sendOrderEmail(status, order)
    }

    if (status === 'DONE') {
      const products = order.products
      products.forEach((product) => {
        if (mongoose.isValidObjectId(product.productId)) {
          ProductModel.findByIdAndUpdate(product.productId, { $inc: { totalPurchases: 1 } }).exec()
        }
      })
    }

    res.json(order)
  } catch (error) {
    res.boom.badRequest(error.message)
  }
}

module.exports = {
  createOrder,
  updateOrderStatus
}
