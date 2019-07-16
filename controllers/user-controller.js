const jwToken = require('jsonwebtoken')
const User = require('../schemas/User')
const rules = require('../middlewares/rules')
const config = require('../config/parameters')
const bcrypt = require('../middlewares/bcrypt')
const mailer = require('../middlewares/mailer')
const queries = require('../middlewares/queries')

module.exports = {

  regUser: async (ctx) => {
    const { username, email, password } = ctx.request.body

    try {
      await rules(ctx).validateUsername(username)
      await rules(ctx).validatePassword(password)
      await rules(ctx).validateEmail(email)
      await queries(ctx).check(User, { username })
      await queries(ctx).check(User, { email })
      const newUser = new User({ username, password, email })
      newUser.password = await bcrypt(ctx).hash(newUser.password)
      const res = await queries(ctx).save(newUser, 'user')
      ctx.status = res.code
      ctx.body = { msg: res.msg }
    } catch (err) {
      ctx.status = err.code || 400
      ctx.body = { msg: err.msg }
    }
  },

  authUser: async (ctx) => {
    const { username, password } = ctx.request.body

    try {
      const { doc } = await queries(ctx).findOne(User, { username })
      await bcrypt(ctx).compareHash(password, doc.password, 'password')
      const token = jwToken.sign({ user: doc._id }, config.secret, { expiresIn: 86400 })
      ctx.status = 200
      ctx.body = {
        msg: 'Token created',
        token: `Bearer ${token}`,
      }
    } catch (err) {
      ctx.status = err.code || 400
      ctx.body = { msg: err.msg }
    }
  },

  getUser: async (ctx) => {
    const { username, email } = ctx.req.user
    ctx.body = { username, email }
  },

  updUser: async (ctx) => {
    const trans = ctx.state.transFile
    const { email, updates } = ctx.request.body

    try {
      if (updates.username) {
        await rules(ctx).validateUsername(updates.username)
        await queries(ctx).check(User, { username: updates.username })
      }
      if (updates.password) {
        await rules(ctx).validatePassword(updates.password)
        updates.password = await bcrypt(ctx).hash(updates.password)
      }
      if (updates.email) {
        await rules(ctx).validateEmail(updates.email)
        await queries(ctx).check(User, { email: updates.email })
      }
      const res = await queries(ctx).updateOne(User, { email }, updates)
      const updatedData = {}
      const keys = Object.keys(updates)
      keys.map(key => (key !== 'password' ? (updatedData[key] = res.doc[key]) : false))
      if (keys.length === 1 && keys[0] === 'password') res.msg = trans.pwdUpdated()
      ctx.status = res.code
      ctx.body = {
        msg: res.msg,
        doc: updatedData,
      }
    } catch (err) {
      ctx.status = err.code || 400
      ctx.body = { msg: err.msg }
    }
  },

  delUser: async (ctx) => {
    const { username } = ctx.request.body

    try {
      const res = await queries(ctx).deleteOne(User, { username }, 'user')
      ctx.status = res.code
      ctx.body = { msg: res.msg }
    } catch (err) {
      ctx.status = err.code || 400
      ctx.body = { msg: err.msg }
    }
  },

  resetPwdUser: async (ctx) => {
    const { email } = ctx.request.body

    try {
      const res = await mailer(email)
      ctx.status = res.code
      ctx.body = { msg: res.msg }
    } catch (err) {
      ctx.status = err.code || 400
      ctx.body = { msg: err.msg }
    }
  },

}
