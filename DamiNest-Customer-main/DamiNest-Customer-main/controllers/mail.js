const config = require('../config')
const { OrderModel, ProductReviewModel, UserModel } = require('../models')

const { mailUtil, currencyUtil } = require('../utils')
const trans = require('../views/mail/trans')

const sendOrderEmail = async (req, res) => {
  const { orderId } = req.params
  const { status, secretKey } = req.query

  if (secretKey !== config.SECRET_KEY) {
    res.boom.unauthorized()
    return
  }

  const order = await OrderModel.findById(orderId).exec()

  if (!order) {
    res.boom.notFound('Đơn hàng không tồn tại')
    return
  }

  if (status === 'PENDING') {
    const html = await mailUtil.htmlGenerator({
      template: 'order/pending',
      useLanguageSuffix: true,
      params: {
        order
      }
    })
    await mailUtil.sendMail({
      to: order.email,
      title: trans('order.order.pending.title', { orderId: order._id }),
      description: trans('order.order.pending.description', { total: currencyUtil.format(order.total) }),
      html
    })
    res.send(html)
    return
  }

  if (status === 'PROCESSING') {
    const html = await mailUtil.htmlGenerator({
      template: 'order/processing',
      useLanguageSuffix: true,
      params: {
        order
      }
    })
    await mailUtil.sendMail({
      to: order.email,
      title: trans('order.order.processing.title', { orderId: order._id }),
      description: trans('order.order.processing.description'),
      html
    })
    res.send(html)
    return
  }

  if (status === 'TRANSFERRING') {
    const html = await mailUtil.htmlGenerator({
      template: 'order/transferring',
      useLanguageSuffix: true,
      params: {
        order
      }
    })
    await mailUtil.sendMail({
      to: order.email,
      title: trans('order.order.transferring.title', { orderId: order._id }),
      description: trans('order.order.transferring.description'),
      html
    })
    res.send(html)
    return
  }

  if (status === 'DONE') {
    const html = await mailUtil.htmlGenerator({
      template: 'order/done',
      useLanguageSuffix: true,
      params: {
        order
      }
    })
    await mailUtil.sendMail({
      to: order.email,
      title: trans('order.order.done.title', { orderId: order._id }),
      description: trans('order.order.done.description'),
      html
    })
    res.send(html)
    return
  }

  if (status === 'REJECTED') {
    const html = await mailUtil.htmlGenerator({
      template: 'order/reject',
      useLanguageSuffix: true,
      params: {
        order
      }
    })
    await mailUtil.sendMail({
      to: order.email,
      title: trans('order.order.reject.title', { orderId: order._id }),
      description: trans('order.order.reject.description', { reasons: order.reasonsForRejection }),
      html
    })
    res.send(html)
    return
  }

  res.json({
    message: 'Order Email Service by @iamncdai'
  })
}

const sendProductReviewEmail = async (req, res) => {
  const { reviewId } = req.params
  const { secretKey, to } = req.query

  if (secretKey !== config.SECRET_KEY) {
    res.boom.unauthorized()
    return
  }

  const review = await ProductReviewModel.findById(reviewId).exec()

  if (!review) {
    res.boom.notFound('Đánh giá không tồn tại')
    return
  }

  if (to === 'admin') {
    const html = await mailUtil.htmlGenerator({
      template: 'review/to-admin',
      params: {
        review
      }
    })
    await mailUtil.sendMail({
      to: config.ADMIN_EMAIL,
      title: trans('review.toAdmin.title', { fullName: review.fullName, productName: review.productName }),
      description: trans('review.toAdmin.description'),
      html
    })
    res.send(html)
    return
  }

  if (to === 'owner') {
    const html = await mailUtil.htmlGenerator({
      template: 'review/to-owner',
      useLanguageSuffix: true,
      params: {
        review
      }
    })
    await mailUtil.sendMail({
      to: review.email,
      title: trans('review.toOwner.title'),
      description: trans('review.toOwner.description'),
      html
    })
    res.send(html)
    return
  }

  res.json({
    message: 'Review Email Service by @iamncdai'
  })
}

const sendVerifyEmail = async (req, res) => {
  const { userId } = req.params
  const { token, secretKey } = req.query

  if (secretKey !== config.SECRET_KEY) {
    res.boom.unauthorized()
    return
  }

  const user = await UserModel.findById(userId).exec()

  if (!user) {
    res.boom.notFound('Tài khoản không tồn tại.')
    return
  }

  const html = await mailUtil.htmlGenerator({
    template: 'auth/verify-email',
    useLanguageSuffix: true,
    params: {
      fullName: user.fullName,
      actionUrl: `/auth/verify-email?token=${token}`
    }
  })
  await mailUtil.sendMail({
    to: user.email,
    title: trans('auth.verifyEmail.title'),
    description: trans('auth.verifyEmail.description'),
    html
  })
  res.send(html)
}

const resetPassword = async (req, res) => {
  const { userId } = req.params
  const { token, secretKey } = req.query

  if (secretKey !== config.SECRET_KEY) {
    res.boom.unauthorized()
    return
  }

  const user = await UserModel.findById(userId).exec()

  if (!user) {
    res.boom.notFound('Tài khoản không tồn tại.')
    return
  }

  const html = await mailUtil.htmlGenerator({
    template: 'auth/reset-password',
    useLanguageSuffix: true,
    params: {
      fullName: 'Nguyễn Chánh Đại',
      actionUrl: `/auth/reset-password?token=${token}`
    }
  })
  await mailUtil.sendMail({
    to: user.email,
    title: trans('auth.resetPassword.title'),
    description: trans('auth.resetPassword.description'),
    html
  })
  res.send(html)
}

module.exports = {
  sendOrderEmail,
  sendProductReviewEmail,
  sendVerifyEmail,
  resetPassword
}
