const shipping = (req, res) => {
  res.render('checkout/shipping')
}

const payment = (req, res) => {
  res.render('checkout/payment')
}

const result = (req, res) => {
  res.render('checkout/result', {
    orderSuccess: req.query?.success === 'true'
  })
}

module.exports = {
  shipping,
  payment,
  result
}
