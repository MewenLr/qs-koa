const Router = require('koa-router')
const passport = require('koa-passport')
const tough = require('../../middlewares/tough')
const toughUser = require('../../config/tough/user')
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
    async (ctx, next) => {
      const { username, updates } = ctx.request.body
      const toughList = await toughUser.updUser(username, updates)
      await tough(ctx, next, toughList)
    },
    userController.updUser,
  )
  .del(
    '/user',
    (ctx, next) => translation(ctx, next),
    async (ctx, next) => {
      const { username } = ctx.request.body
      const toughList = toughUser.delUser(username)
      await tough(ctx, next, toughList)
    },
    userController.delUser,
  )
