const index = (req, res) => {
  res.render('handbook/index')
  //res.send('handbook/index');
};

const view = (req, res) => {
  res.render('handbook/view')
  //res.send('handbook/view');
};

module.exports = {
  index,
  view,
};
