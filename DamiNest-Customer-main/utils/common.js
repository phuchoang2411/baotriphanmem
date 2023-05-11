const config = require('../config')

const convertSortQueryStringToMongooseSort = (st) => {
  const parse = st?.split?.(':')

  if (parse?.length !== 2) {
    return {}
  }

  if (['asc', 'desc'].includes(parse[1])) {
    return {
      [parse[0]]: parse[1]
    }
  }

  return {}
}

const getWebAdminUrl = (path = '') => config.PUBLIC_WEB_ADMIN_URL + path
const getWebCustomerUrl = (path = '') => config.PUBLIC_WEB_CUSTOMER_URL + path

const getInternalWebCustomerUrl = (path = '') => config.INTERNAL_WEB_CUSTOMER_URL + path
const getMediaUrl = (path = '') => {
  if (path.includes('https://') || path.includes('http://')) {
    return path
  }

  return config.MEDIA_URL + path
}

module.exports = {
  convertSortQueryStringToMongooseSort,

  getWebAdminUrl,
  getWebCustomerUrl,

  getInternalWebCustomerUrl,
  getMediaUrl
}
