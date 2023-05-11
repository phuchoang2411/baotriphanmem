const express = require('express')
const router = express.Router()

const productCategoryController = require('../controllers/productCategory')
const productController = require('../controllers/product')

router.get('/init-products', productController.initProduct)
router.get('/', productController.getAllProduct)
router.post('/', productController.addProduct)
router.get('/delete-product/:id', productController.deleteProduct)
router.get('/update-product/:id', productController.updateProductView)
router.post('/update-product/:id', productController.updateProduct)
router.post('/upload-image/:id', productController.uploadImage)

router.get('/init-category', productCategoryController.initCategory)
router.get('/category', productCategoryController.getAllCategory)
router.post('/category', productCategoryController.addCategory)
router.get('/delete-category/:id', productCategoryController.deleteCategory)

module.exports = router
