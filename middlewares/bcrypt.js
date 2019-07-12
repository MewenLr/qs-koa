const bcryptjs = require('bcryptjs')

module.exports = (ctx) => {
  const trans = ctx.state.transFile

  return {

    hash: data => new Promise((res, rej) => {
      bcryptjs.hash(data, 10, (err, hash) => {
        if (err) rej({ code: 400, msg: trans.errorHash() })
        res(hash)
      })
    }),

    compareHash: (data, hash, key) => new Promise((res, rej) => {
      bcryptjs.compare(data, hash, (err, match) => {
        if (err) rej({ code: 400, msg: err })
        if (!match) rej({ code: 400, msg: trans.errorCompareHash(key) })
        res(match)
      })
    }),

  }
}
