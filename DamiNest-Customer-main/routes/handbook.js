const express = require('express')
const { handbookController } = require('../controllers')
const router = express.Router()

router.get('/', handbookController.index)
router.get('/view', handbookController.view)

module.exports = router
