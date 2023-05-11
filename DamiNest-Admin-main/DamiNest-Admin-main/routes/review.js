const express = require('express')
const router = express.Router()

const reviewController = require('../controllers/review')

router.get('/', reviewController.getAllReview)
router.get('/publish-review/:reviewId', reviewController.publishReview)
router.get('/unpublish-review/:reviewId', reviewController.unpublishReview)

module.exports = router
