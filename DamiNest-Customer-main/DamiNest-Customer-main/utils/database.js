const mongoose = require('mongoose')
const config = require('../config')

const connectDatabase = async () => {
  try {
    await mongoose.connect(config.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('Mongoose is connected')
  } catch (error) {
    console.error('Mongoose is encountered an error', error.message)
  }
}

module.exports = {
  connectDatabase
}
