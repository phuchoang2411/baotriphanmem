const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProductCategory',
    required: true
  },
  featuredImage: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  maxQuantity: {
    type: Number,
    default: 0
  },
  ratingAvg: {
    type: Number,
    default: 0
  },
  ratingStat: {
    1: { type: Number, default: 0 },
    2: { type: Number, default: 0 },
    3: { type: Number, default: 0 },
    4: { type: Number, default: 0 },
    5: { type: Number, default: 0 }
  },
  totalRatings: {
    type: Number,
    default: 0
  },
  totalViews: {
    type: Number,
    default: 0
  },
  totalPurchases: {
    type: Number,
    default: 0
  },
  price: {
    type: Number,
    default: 0,
    required: true
  },
  discount: {
    type: Number,
    default: 0
  },
  ingredient: {
    type: String,
    default: ''
  },
  mass: {
    type: String,
    default: ''
  },
  uses: {
    type: String,
    default: ''
  },
  preservation: {
    type: String,
    default: ''
  },
  expiryDate: {
    type: String,
    default: ''
  },
  origin: {
    type: String,
    default: ''
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

productSchema.plugin(mongoosePaginate)

productSchema.index({
  name: 'text',
  description: 'text',
  price: 1
})

module.exports = mongoose.model('Product', productSchema, 'products')
