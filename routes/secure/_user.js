const Router = require('koa-router')
const passport = require('koa-passport')
const translation = require('../../middlewares/translation')
const userController = require('../../controllers/user-controller')

const router = new Router()

module.exports = router
  .get(
    '/user',
    passport.authenticate('jwt', { session: false }),
    userController.getUser,
  )
  .put(
    '/user',
    (ctx, next) => translation(ctx, next),
    userController.updUser,
  )
  .del(
    '/user',
    (ctx, next) => translation(ctx, next),
    userController.delUser,
  )
