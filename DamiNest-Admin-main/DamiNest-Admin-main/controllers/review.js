const { ProductReviewModel, ProductModel } = require('../models')
const _ = require('lodash')
const config = require('../config')
const axios = require('axios').default

const getAllReview = async (req, res) => {
  try {
    const reviews = await ProductReviewModel.find().populate('productId').exec()
    res.render('review/list', { reviews })
  } catch (error) {
    console.log(error.message)
  }
}

const unpublishReview = async (req, res) => {
  try {
    const { reviewId } = req.params
    const review = await ProductReviewModel.findByIdAndUpdate(reviewId, { $set: { published: false } }, { new: true })
    console.log('unblockUser', reviewId, review)
    if (!review) return res.status(404).send('User with the given id not found')
    res.redirect(301, '/review')
  } catch (error) {
    res.status(400).send(error.message)
  }
}

const publishReview = async (req, res) => {
  try {
    const { reviewId } = req.params

    const review = await ProductReviewModel.findById(reviewId).exec()
    if (!review) {
      res.send('Đánh giá không tồn tại.')
      return
    }

    const reviewUpdated = await ProductReviewModel.findByIdAndUpdate(reviewId, { $set: { published: true } }, { new: true }).exec()

    const { productId, rating } = reviewUpdated

    const product = await ProductModel.findById(productId).exec()
    if (!product) {
      res.send('Sản phẩm không tồn tại.')
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

    await ProductModel.findByIdAndUpdate(productId, {
      $set: {
        totalRatings,
        ratingAvg,
        ratingStat
      }
    }, { new: true }).exec()

    axios
      .get(`${config.PUBLIC_WEB_CUSTOMER_URL}/mail-service/product-review/${reviewId}?to=owner&secretKey=${config.SECRET_KEY}`)
      .then((data) => console.log('sendReviewEmail -> Success', data))
      .catch((error) => console.log('sendReviewEmail -> Error', error.message))

    res.redirect('/review')
  } catch (error) {
    console.log('publishReview -> Catch', error.message)
    res.send(error.message)
  }
}

module.exports = {
  getAllReview,
  publishReview,
  unpublishReview
}
