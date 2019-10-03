const Router = require('koa-router')
const translation = require('../../middlewares/translation')
const userController = require('../../controllers/user-controller')

const router = new Router()

module.exports = router
  .post(
    '/user/register',
    // (ctx, next) => translation(ctx, next),
    userController.regUser,
  )
  .get(
    '/confirmation/:token',
    (ctx, next) => translation(ctx, next),
    userController.cbRegUser,
  )
  .post(
    '/user/authenticate',
    (ctx, next) => translation(ctx, next),
    userController.authUser,
  )
  .post(
    '/user/reset-password',
    (ctx, next) => translation(ctx, next),
    userController.resetPwdUser,
  )
