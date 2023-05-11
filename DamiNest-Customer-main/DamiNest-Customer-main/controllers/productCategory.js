const { ProductCategoryModel } = require('../models')
const { PRODUCT_CATEGORIES } = require('../constants/productCategory')

const createCategory = async (req, res) => {
  const newCategory = new ProductCategoryModel({
    name: 'Category 1',
    slug: 'category-1'
  })
  const category = await newCategory.save()
  return res.json(category)
}

const initCategories = async (req, res) => {
  const data = await ProductCategoryModel.insertMany(PRODUCT_CATEGORIES)
  res.json(data)
}

const deleteCategories = async (req, res) => {
  const data = await ProductCategoryModel.deleteMany()
  res.json(data)
}

const getCategories = async () => {
  const categories = ProductCategoryModel.find().exec()
  return categories
}

module.exports = {
  createCategory,
  initCategories,
  deleteCategories,
  getCategories
}
