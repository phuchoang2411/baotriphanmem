const express = require('express')
const router = express.Router()

const { productController } = require('../controllers')

router.get('/', productController.index)
router.get('/search', productController.search)
router.get('/:productId/reviews', productController.getReviews)
router.get('/:productId', productController.getView)

module.exports = router
