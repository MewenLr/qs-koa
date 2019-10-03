const bcryptjs = require('bcryptjs')

module.exports = (ctx) => {
  return {

    hash: data => new Promise((res, rej) => {
      bcryptjs.hash(data, 10, (err, hash) => {
        if (err) rej({ code: 400, msg: ctx.i18n.__('failure.hash') })
        res(hash)
      })
    }),

    compareHash: (data, hash, key) => new Promise((res, rej) => {
      bcryptjs.compare(data, hash, (err, match) => {
        if (err) rej({ code: 400, msg: err })
        if (!match) rej({ code: 400, msg: ctx.i18n.__('failure.compare-hash', ctx.i18n.__(`key.${key}`)) })
        res(match)
      })
    }),

  }
}
