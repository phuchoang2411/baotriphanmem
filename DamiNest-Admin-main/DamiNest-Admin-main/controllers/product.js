const { ProductModel, ProductCategoryModel, UserModel } = require('../models')
const { upload } = require('../middlewares')
const { PRODUCTS } = require('../constants')
// const { Resize } = require('../services')
// const path = require('path')

const initProduct = async (req, res) => {
  try {
    const products = await ProductModel.insertMany(PRODUCTS)
    return res.json(products)
  } catch (error) {
    res.status(400).send(error.message)
  }
}

const getAllProduct = async (req, res) => {
  try {
    const categories = await ProductCategoryModel.find()
    const owners = await UserModel.find({ role: 'ADMIN' })
    const products = await ProductModel.find()
      .populate('categoryId')
      .populate('ownerId')
      .exec()
    res.render('product/list', {
      products,
      categories,
      owners
    })
  } catch (error) {
    res.status(400).send(error.message)
  }
}

const addProduct = async (req, res, next) => {
  try {
    const data = req.body
    const newProduct = await new ProductModel({
      name: data.name,
      price: data.price,
      categoryId: data.categoryId,
      ownerId: data.ownerId
    })
    await newProduct.save()
    res.redirect(301, '/product')
  } catch (error) {
    res.status(400).send(error.message)
  }
}

const deleteProduct = async (req, res, next) => {
  try {
    const id = req.params.id
    const product = await ProductModel.findByIdAndRemove(id)
    if (!product) return res.status(404).send('Product with the given id not found')
    res.redirect(301, '/product')
  } catch (error) {
    res.status(400).send(error.message)
  }
}

const updateProduct = async (req, res, next) => {
  const id = req.params.id
  const data = req.body
  const product = await ProductModel.findByIdAndUpdate(id, {
    name: data.name,
    price: data.price,
    categoryId: data.categoryId,
    ownerId: data.ownerId
  }, { new: true })
  if (!product) return res.status(404).send('Product with the given id not found')
  res.redirect(301, '/product')
}

const updateProductView = async (req, res, next) => {
  try {
    const categories = await ProductCategoryModel.find()
    const owners = await UserModel.find()
    const id = req.params.id
    const product = await ProductModel.findById(id)
      .populate('ownerId')
      .populate('categoryId')
      .exec()
    res.render('product/updateProduct', {
      product,
      categories,
      owners
    })
  } catch (error) {
    res.status(400).send(error.message)
  }
}

const uploadImage = async (req, res, next) => {
  await upload(req, res, (error) => {
    // Nếu có lỗi thì trả về lỗi cho client.
    // Ví dụ như upload một file không phải file ảnh theo như cấu hình của mình bên trên
    if (error) {
      return res.send(`Error when trying to upload: ${error}`)
    }

    console.log('------Request body-----')
    console.log(req.body)

    console.log('------Request file-----')

    console.log(req.file.filename)

    console.log('------Test Done-----')
  })
  // call class Resize
  // await new Resize(req.file.filename)
  const categories = await ProductCategoryModel.find()
  const owners = await UserModel.find()
  const id = req.params.id
  const product = await ProductModel.findByIdAndUpdate(id, { featuredImage: '/uploads/' + req.file.filename })
    .populate('ownerId')
    .populate('categoryId')
    .exec()
  res.render('product/updateProduct', {
    product,
    categories,
    owners
  })
}

module.exports = {
  initProduct,
  getAllProduct,
  addProduct,
  deleteProduct,
  updateProduct,
  updateProductView,
  uploadImage
}
