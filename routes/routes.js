const _userSecureRouter = require('./secure/_user')
const _userUnsecureRouter = require('./unsecure/_user')

module.exports = {
  secureRoutes: (app) => {
    app.use(_userSecureRouter.routes()).use(_userSecureRouter.allowedMethods())
  },
  unsecureRoutes: (app) => {
    app.use(_userUnsecureRouter.routes()).use(_userUnsecureRouter.allowedMethods())
  },
}
