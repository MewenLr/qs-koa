/* eslint-disable no-useless-escape */
module.exports = (ctx) => {
  const trans = ctx.state.transFile

  return {

    validateLanguage: lang => new Promise((res, rej) => {
      const re = /^[a-z]{2}$/
      if (!re.test(lang)) rej({ code: 400, msg: trans.wrongLanguage() })
      res()
    }),

    validateUsername: username => new Promise((res, rej) => {
      const re = /^[a-z0-9_-]{3,16}$/
      if (!re.test(username)) rej({ code: 400, msg: trans.wrongUsername() })
      res()
    }),

    validateEmail: email => new Promise((res, rej) => {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (!re.test(email)) rej({ code: 400, msg: trans.wrongEmail() })
      res()
    }),

    validatePassword: password => new Promise((res, rej) => {
      const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
      if (!re.test(password)) rej({ code: 400, msg: trans.wrongPassword() })
      res()
    }),

  }
}
