const _ = require('lodash')
const { ProductModel, ProductReviewModel, OrderModel } = require('../models')

const postCheckCanReview = async (req, res) => {
  try {
    const { userId, productId } = req.body

    const order = await OrderModel.findOne({ ownerId: userId, 'products.productId': productId }).exec()
    if (!order) {
      res.json({
        canReview: false,
        message: 'Bạn không thể nhận xét vì chưa mua sản phẩm này.'
      })
      return
    }

    const count = await ProductReviewModel.findOne({ ownerId: userId, productId }).count().exec()
    if (count > 0) {
      res.json({
        canReview: false,
        message: 'Bạn đã đánh giá sản phẩm này.'
      })
      return
    }

    res.json({
      canReview: true,
      message: ''
    })
  } catch (error) {
    res.boom.badRequest(error.message)
  }
}

const postReview = async (req, res) => {
  try {
    const userId = req.user._id
    const { productId, rating, content } = req.body

    const count = await ProductReviewModel.findOne({ ownerId: userId, productId }).count().exec()
    if (count > 0) {
      res.boom.badData('Bạn đã đánh giá sản phẩm này.')
      return
    }

    const product = await ProductModel.findById(productId).exec()
    if (!product) {
      res.boom.badData('Sản phẩm không tồn tại.')
      return
    }

    const review = new ProductReviewModel({
      productId,
      ownerId: userId,
      productName: product.name,
      fullName: req.user?.fullName,
      phoneNumber: req.user?.phoneNumber,
      email: req.user?.email,
      rating,
      content: _.escape(content)
    })

    const newReview = await review.save()

    res.json(newReview)
  } catch (error) {
    res.boom.badRequest(error.message)
  }
}

const patchPublishReview = async (req, res) => {
  try {
    const { reviewId } = req.params

    const review = await ProductReviewModel.findById(reviewId).exec()
    if (!review) {
      res.boom.badRequest('Đánh giá không tồn tại.')
      return
    }

    if (review.published) {
      res.boom.badRequest('Đánh giá đã được duyệt.')
      return
    }

    const reviewUpdated = await ProductReviewModel.findByIdAndUpdate(reviewId, { $set: { published: true } }, { new: true }).exec()

    const { productId, rating } = reviewUpdated

    const product = await ProductModel.findById(productId).exec()
    if (!product) {
      res.boom.badRequest('Sản phẩm không tồn tại.')
      return
    }

    const totalRatings = product.totalRatings + 1
    const ratingAvg = (product.ratingAvg + rating) / totalRatings
    const ratingStat = {
      1: _.toNumber(product.ratingStat?.[1]),
      2: _.toNumber(product.ratingStat?.[2]),
      3: _.toNumber(product.ratingStat?.[3]),
      4: _.toNumber(product.ratingStat?.[4]),
      5: _.toNumber(product.ratingStat?.[5])
    }
    ratingStat[rating] += 1

    const productUpdated = await ProductModel.findByIdAndUpdate(productId, {
      $set: {
        totalRatings,
        ratingAvg,
        ratingStat
      }
    }, { new: true }).exec()

    res.json({
      productUpdated,
      review
    })
  } catch (error) {
    res.boom.badRequest(error.message)
  }
}

module.exports = {
  postCheckCanReview,
  postReview,
  patchPublishReview
}
