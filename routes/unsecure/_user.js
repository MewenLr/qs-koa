const Router = require('koa-router')
const tough = require('../../middlewares/tough')
const toughUser = require('../../config/tough/user')
const translation = require('../../middlewares/translation')
const userController = require('../../controllers/user-controller')

const router = new Router()

module.exports = router

  // user
  .post(
    '/user/register',
    (ctx, next) => translation(ctx, next),
    async (ctx, next) => {
      const { username, password, email } = ctx.request.body
      const toughList = toughUser.regUser(username, password, email)
      await tough(ctx, next, toughList)
    },
    userController.regUser,
  )
  .post(
    '/user/authenticate',
    (ctx, next) => translation(ctx, next),
    async (ctx, next) => {
      const { username, password } = ctx.request.body
      const toughList = toughUser.authUser(username, password)
      await tough(ctx, next, toughList)
    },
    userController.authUser,
  )
  .post(
    '/user/reset-password',
    (ctx, next) => translation(ctx, next),
    async (ctx, next) => {
      const { email } = ctx.request.body
      const toughList = toughUser.resetPwdUser(email)
      await tough(ctx, next, toughList)
    },
    userController.resetPwdUser,
  )
