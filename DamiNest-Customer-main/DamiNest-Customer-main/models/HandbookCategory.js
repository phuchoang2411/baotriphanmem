const mongoose = require('mongoose')

const HandbookCategorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('HandbookCategory', HandbookCategorySchema, 'handbookCategories')
