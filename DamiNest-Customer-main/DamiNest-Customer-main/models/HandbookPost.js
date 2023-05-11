const mongoose = require('mongoose')

const HandbookPostSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'HandbookCategory',
    required: true
  },

  description: {
    type: String,
    default: ''
  },

  featuredImage: {
    type: String,
    default: ''
  },

  content: {
    type: String,
    default: ''
  },

  source: {
    type: String,
    default: ''
  },

  author: {
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

module.exports = mongoose.model('HandbookPost', HandbookPostSchema, 'handbookPosts')
