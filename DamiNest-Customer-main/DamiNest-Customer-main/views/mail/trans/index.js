const _ = require('lodash')

const layout = require('./layout')
const auth = require('./auth')
const order = require('./order')
const review = require('./review')

const locales = {
  layout,
  auth,
  order,
  review
}

const trans = (path, params = {}) => {
  if (!_.has(locales, path)) {
    return path
  }

  let text = _.get(locales, path)

  if (_.isEmpty(params)) {
    return text
  }

  _.keys(params).forEach(key => {
    // Thay thế {{param}} bằng params[param]
    text = text.replace(`{{${key}}}`, params[key])
  })

  return text
}

module.exports = trans
