const Router = require('koa-router')
const trans = require('../../middlewares/translation')
const userController = require('../../controllers/user-controller')

const router = new Router()

module.exports = router
  .post(
    '/user/register',
    (ctx, next) => trans(ctx, next),
    userController.regUser,
  )
  .get(
    '/confirmation/:token',
    (ctx, next) => trans(ctx, next),
    userController.cbRegUser,
  )
  .post(
    '/user/authenticate',
    (ctx, next) => trans(ctx, next),
    userController.authUser,
  )
  .post(
    '/user/reset-password',
    (ctx, next) => trans(ctx, next),
    userController.resetPwdUser,
  )
