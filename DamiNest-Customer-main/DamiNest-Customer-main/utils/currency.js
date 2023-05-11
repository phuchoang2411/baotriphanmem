const currencyFormatter = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND'
})

module.exports = {
  format: currencyFormatter.format
}
