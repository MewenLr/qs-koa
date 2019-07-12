const rules = require('./rules')

/* eslint-disable global-require, import/no-dynamic-require  */
module.exports = async (ctx, next) => {
  const lang = ctx.get('accept-language').slice(0, 2)
  try {
    await rules(ctx).validateLanguage(lang)
    ctx.state.transFile = require(`../config/translations/${lang}-translation.js`)
    await next()
  } catch (err) {
    if (err.code === 'MODULE_NOT_FOUND') {
      ctx.status = 400
      ctx.body = { msg: 'Translation file doesn\'t exist' }
    } else {
      ctx.status = err.code || 400
      ctx.body = { msg: err.msg }
    }
  }
}
