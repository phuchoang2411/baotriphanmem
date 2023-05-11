const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const productSchema = mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },

  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  rating: {
    type: Number,
    default: 0
  },

  content: {
    type: String,
    default: ''
  },

  published: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

productSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('ProductReview', productSchema, 'productReviews')
