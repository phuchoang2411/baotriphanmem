const express = require('express')
const router = express.Router()
const passport = require('passport')

const { authMiddleware } = require('../middlewares')

router.get('/login', authMiddleware.isNotAuthenticated, (req, res) => {
  res.render('auth/login')
})

router.post('/login', passport.authenticate('login', {
  failureRedirect: '/auth/login?res=FAILED',
  successRedirect: '/profile'
}))

router.get('/logout', authMiddleware.isAuthenticated, (req, res) => {
  req.logOut()
  res.redirect('/auth/login')
})

module.exports = router
