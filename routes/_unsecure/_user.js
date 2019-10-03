const Router = require('koa-router')
const userController = require('../../controllers/user-controller')

const router = new Router()

module.exports = router
  .post(
    '/user/register',
    userController.regUser,
  )
  .get(
    '/confirmation/:token',
    userController.cbRegUser,
  )
  .post(
    '/user/authenticate',
    userController.authUser,
  )
  .post(
    '/user/reset-password',
    userController.resetPwdUser,
  )
