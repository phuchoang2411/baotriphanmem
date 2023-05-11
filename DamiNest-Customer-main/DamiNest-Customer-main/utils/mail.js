const path = require('path')
const ejs = require('ejs-promise')
const dayjs = require('dayjs')

const config = require('../config')
const trans = require('../views/mail/trans')
const currencyFormatter = require('./currency')
const { getMediaUrl, getWebAdminUrl, getWebCustomerUrl } = require('./common')

const mailgun = require('mailgun-js')({
  apiKey: config.MAILGUN_API_KEY,
  domain: config.MAILGUN_DOMAIN
})

const dateFormatter = (date) => {
  return dayjs(date).format('H:mm:ss DD/MM/YYYY')
}

const htmlGenerator = async ({
  template,
  params
}) => {
  const file = path.join(__dirname, `../views/mail/${template}.ejs`)

  if (!file) {
    throw new Error(`Could not find the ${template} in path ${file}`)
  }

  const defaultParams = {
    trans,
    currencyFormatter: currencyFormatter.format,
    dateFormatter,
    getWebAdminUrl,
    getWebCustomerUrl,
    getMediaUrl,

    SUPPORT_EMAIL: config.SUPPORT_EMAIL,
    SUPPORT_PHONE_NUMBER: config.SUPPORT_PHONE_NUMBER,

    ...params
  }

  const res = await ejs.renderFile(file, defaultParams, {}, (error, result) => {
    if (error) {
      return error
    }

    return result
      .then((data) => data)
      .catch((error) => {
        throw error
      })
  })

  return res
}

const sendMail = ({
  from = 'DamiNest Support',
  to,
  title,
  description,
  html
}) => {
  const data = {
    from: `${from} <daminest@mg.penphy.com>`,
    to,
    subject: title,
    text: description,
    html
  }

  return new Promise((resolve, reject) => {
    mailgun.messages().send(data, (error, body) => {
      const errorData = {
        message: error
      }
      if (error) reject(errorData)
      else resolve(body)
    })
  })
}

module.exports = {
  htmlGenerator,
  sendMail
}
