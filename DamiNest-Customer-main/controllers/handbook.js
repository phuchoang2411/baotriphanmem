const index = (req, res) => {
  res.render('handbook/index')
}

const view = (req, res) => {
  res.render('handbook/view')
}

module.exports = {
  index,
  view
}
