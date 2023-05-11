const { ProductCategoryModel } = require('../models')

const { PRODUCT_CATEGORIES } = require('../constants/productCategory')

const initCategory = async (req, res) => {
  const data = await ProductCategoryModel.insertMany(PRODUCT_CATEGORIES)
  return res.json(data)
}

const getAllCategory = async (req, res) => {
  try {
    const categories = await ProductCategoryModel.find()
    res.render('product/category', { categories })
  } catch (error) {
    console.log(error.message)
  }
}

const addCategory = async (req, res, next) => {
  try {
    const data = req.body
    const newCategory = await new ProductCategoryModel({
      name: data.name
    })
    await newCategory.save()
    res.redirect(301, '/product/category')
  } catch (error) {
    res.status(400).send(error.message)
  }
}

const deleteCategory = async (req, res, next) => {
  try {
    const id = req.params.id
    const category = await ProductCategoryModel.findByIdAndDelete(id)
    if (!category) res.status(404).send('Category is not found')
    res.redirect(301, '/product/category')
  } catch (error) {
    res.status(400).send(error.message)
  }
}

module.exports = {
  initCategory,
  getAllCategory,
  addCategory,
  deleteCategory
}
