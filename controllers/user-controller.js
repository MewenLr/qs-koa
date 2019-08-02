const jwToken = require('jsonwebtoken')
const User = require('../schemas/User')
const rules = require('../middlewares/rules')
const config = require('../config/parameters')
const bcrypt = require('../middlewares/bcrypt')
const mailer = require('../middlewares/mailer')
const queries = require('../middlewares/queries')
const { knight } = require('../middlewares/knight')
const knightUser = require('../config/knight-lists/knight-user')

module.exports = {

  regUser: async (ctx) => {
    const trans = ctx.state.transFile
    const { username, email, password } = ctx.request.body
    const knightList = knightUser.regUser(username, password, email)

    try {
      await knight(ctx, knightList)
      await rules(ctx).validateUsername(username)
      await rules(ctx).validatePassword(password)
      await rules(ctx).validateEmail(email)
      await queries(ctx).check(User, { username })
      await queries(ctx).check(User, { email })
      const newUser = new User({ username, password, email })
      newUser.password = await bcrypt(ctx).hash(newUser.password)
      await queries(ctx).save(newUser, 'user')
      const token = jwToken.sign({ user: newUser._id }, config.secret, { expiresIn: 86400 })
      const subject = trans.confirmationMailSubject()
      const html = trans.confirmationMailHtml(token)
      const success = trans.successConfirmationMail()
      const res = await mailer(ctx, email, subject, html, success)
      ctx.status = res.code
      ctx.body = { msg: res.msg }
    } catch (err) {
      ctx.status = err.code || 400
      ctx.body = { msg: err.msg }
    }
  },

  cbRegUser: async (ctx) => {
    const { token } = ctx.params
    try {
      const decoded = await jwToken.verify(token, config.secret)
      await queries(ctx).updateOne(User, { _id: decoded.user }, { confirmed: true })
      ctx.redirect('https://www.google.fr/') // url vers la page de login
    } catch (err) {
      ctx.redirect('https://www.youtube.com/') // url vers la page de register avec error msg "token expired"
    }
  },

  authUser: async (ctx) => {
    const trans = ctx.state.transFile
    const { username, password } = ctx.request.body
    const knightList = knightUser.authUser(username, password)

    try {
      await knight(ctx, knightList)
      const { doc } = await queries(ctx).findOne(User, { username })
      if (!doc.confirmed) throw { code: 401, msg: trans.errorConfirmAccount() }
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
    const knightList = knightUser.updUser(email, updates)

    try {
      await knight(ctx, knightList)
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
    const knightList = knightUser.delUser(username)

    try {
      await knight(ctx, knightList)
      const res = await queries(ctx).deleteOne(User, { username }, 'user')
      ctx.status = res.code
      ctx.body = { msg: res.msg }
    } catch (err) {
      ctx.status = err.code || 400
      ctx.body = { msg: err.msg }
    }
  },

  resetPwdUser: async (ctx) => {
    const trans = ctx.state.transFile
    const { email } = ctx.request.body
    const knightList = knightUser.resetPwdUser(email)

    try {
      await knight(ctx, knightList)
      const token = jwToken.sign({ user: email }, config.secret, { expiresIn: 86400 })
      const subject = trans.resetPwdMailSubject()
      const html = trans.resetPwdMailHtml(token)
      const success = trans.successResetPwdMail()
      const res = await mailer(ctx, email, subject, html, success)
      ctx.status = res.code
      ctx.body = { msg: res.msg }
    } catch (err) {
      ctx.status = err.code || 400
      ctx.body = { msg: err.msg }
    }
  },

  cbResetPwdUser: async (ctx) => {
    const { token } = ctx.params
    try {
      await jwToken.verify(token, config.secret)
      ctx.redirect('https://www.google.fr/') // url vers la page de reset password avec un formulaire pour le new pwd
    } catch (err) {
      ctx.redirect('https://www.youtube.com/') // url vers la page permettant d'envoyer un email pour reset password
    }
  },
}
