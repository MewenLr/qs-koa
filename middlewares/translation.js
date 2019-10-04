const rules = require('./rules')

module.exports = async (ctx, next) => {
  const lang = ctx.get('accept-language').slice(0, 2)
  try {
    await rules(ctx).validateLanguage(lang)
    await ctx.i18n.setLocale(lang)
    await next()
  } catch (err) {
    ctx.status = err.code || 400
    ctx.body = { msg: err.msg }
  }
}
