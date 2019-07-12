/* eslint-disable max-len */
function tough(toughList, trans) {
  return new Promise(async (res, rej) => {
    await toughList.map(async (el) => {
      if (el.dataRequired && !el.data) rej({ code: 400, msg: trans.errorAttribute(el.key) })
      if (typeof el.data === 'object' && el.dataRequired && Object.keys(el.data).length === 0) rej({ code: 400, msg: trans.errorEmptyObject(el.key) })

      if (el.type === 'string' && typeof el.data !== 'string') rej({ code: 400, msg: trans.errorType(el.key) })
      if (el.type === 'number' && typeof el.data !== 'number') rej({ code: 400, msg: trans.errorType(el.key) })
      if (el.type === 'object' && typeof el.data !== 'object') rej({ code: 400, msg: trans.errorType(el.key) })
      if (el.type === 'boolean' && typeof el.data !== 'boolean') rej({ code: 400, msg: trans.errorType(el.key) })

      if (typeof el.data === 'object') {
        const objSolidList = []

        await el.entries.map((entry) => {
          if (entry.entryRequired && el.data[entry.key] === undefined) rej({ code: 400, msg: trans.errorAttribute(entry.key) })
          if (entry.data) objSolidList.push(entry)
          return true
        })

        res(tough(objSolidList, trans))
      }
      return true
    })
    res()
  })
}

module.exports = async (ctx, next, toughList) => {
  const trans = ctx.state.transFile

  try {
    await tough(toughList, trans)
    await next()
  } catch (err) {
    ctx.status = err.code
    ctx.body = { msg: err.msg }
  }
}
