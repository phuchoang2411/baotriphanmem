const dotenv = require('dotenv');

dotenv.config();

const config = {
  ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  MONGODB_URL: process.env.MONGODB_URL,
  SECRET_KEY: process.env.SECRET_KEY,
  PAGE_LIMIT: 6,

  MAILGUN_API_KEY: process.env.MAILGUN_API_KEY,
  MAILGUN_DOMAIN: process.env.MAILGUN_DOMAIN,

  PUBLIC_WEB_CUSTOMER_URL: process.env.PUBLIC_WEB_CUSTOMER_URL,
  PUBLIC_WEB_ADMIN_URL: process.env.PUBLIC_WEB_ADMIN_URL,
  INTERNAL_WEB_CUSTOMER_URL: process.env.INTERNAL_WEB_CUSTOMER_URL,
  MEDIA_URL: process.env.MEDIA_URL,

  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  SUPPORT_EMAIL: process.env.SUPPORT_EMAIL,
  SUPPORT_PHONE_NUMBER: process.env.SUPPORT_PHONE_NUMBER,

  GG_ANALYTICS_ID: process.env.GG_ANALYTICS_ID,
};

module.exports = config;
