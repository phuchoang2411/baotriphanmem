module.exports = {
  apps: [{
    name: 'daminest-customer',
    script: 'yarn start',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }]
}
