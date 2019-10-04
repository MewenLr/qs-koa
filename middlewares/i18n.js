const i18n = require('koa-i18n')
const locale = require('koa-locale')

module.exports = (app) => {
  locale(app)
  app.use(i18n(app, {
    directory: './config/translations',
    locales: ['fr', 'en'],
    defaultLocale: 'en',
    extension: '.json',
    filePermissions: '755',
    updateFiles: false,
  }))
}
