/* eslint-disable no-useless-escape */
module.exports = (ctx) => {
  return {

    validateLanguage: lang => new Promise((res, rej) => {
      const reg = /^[a-z]{2}$/
      if (!reg.test(lang)) rej({ code: 400, msg: ctx.i18n.__('rule.language') })
      res()
    }),

    validateUsername: username => new Promise((res, rej) => {
      const reg = /^[a-z0-9_-]{3,16}$/
      if (!reg.test(username)) rej({ code: 400, msg: ctx.i18n.__('rule.username') })
      res()
    }),

    validateEmail: email => new Promise((res, rej) => {
      const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (!reg.test(email)) rej({ code: 400, msg: ctx.i18n.__('rule.email') })
      res()
    }),

    validatePassword: password => new Promise((res, rej) => {
      const reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
      if (!reg.test(password)) rej({ code: 400, msg: ctx.i18n.__('rule.password') })
      res()
    }),

  }
}
