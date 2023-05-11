const express = require('express')
const { aboutController } = require('../controllers')
const router = express.Router()

router.get('/', aboutController.index)

module.exports = router
