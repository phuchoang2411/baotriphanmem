const express = require('express')
const router = express.Router()

const { productReviewController } = require('../controllers')
const { authMiddleware } = require('../middlewares')

router.post('/', authMiddleware.requiredLoginWithBoom, productReviewController.postReview)
router.post('/check-can-review', productReviewController.postCheckCanReview)
// router.patch('/:reviewId/publish', productReviewController.patchPublishReview)

module.exports = router
