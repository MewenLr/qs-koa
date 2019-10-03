const Router = require('koa-router')
const passport = require('koa-passport')
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
    userController.updUser,
  )
  .del(
    '/user',
    userController.delUser,
  )
