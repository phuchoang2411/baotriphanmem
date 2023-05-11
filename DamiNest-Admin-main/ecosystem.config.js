module.exports = {
  apps: [{
    name: 'daminest-admin',
    script: 'PORT=2801 yarn start',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }]
}
