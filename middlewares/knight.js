/* eslint-disable max-len */
module.exports = {

  knight: (ctx, knightList) => new Promise((res, rej) => {
    function recursive(List) {
      List.map((el) => {
        const keyTrans = ctx.i18n.__(`key.z-${el.key}`)
        if (el.dataRequired && !el.data) rej({ code: 400, msg: ctx.i18n.__('error.attribute', keyTrans) })
        if (typeof el.data === 'object' && el.dataRequired && Object.keys(el.data).length === 0) rej({ code: 400, msg: ctx.i18n.__('error.empty-object', ctx.i18n.__(`key.${el.key}`)) })

        if (el.type === 'string' && typeof el.data !== 'string') rej({ code: 400, msg: ctx.i18n.__('error.type', keyTrans) })
        if (el.type === 'number' && typeof el.data !== 'number') rej({ code: 400, msg: ctx.i18n.__('error.type', keyTrans) })
        if (el.type === 'object' && typeof el.data !== 'object') rej({ code: 400, msg: ctx.i18n.__('error.type', keyTrans) })
        if (el.type === 'boolean' && typeof el.data !== 'boolean') rej({ code: 400, msg: ctx.i18n.__('error.type', keyTrans) })

        if (typeof el.data === 'object') {
          const objKnightList = []

          el.entries.map((entry) => {
            if (entry.entryRequired && el.data[entry.key] === undefined) rej({ code: 400, msg: ctx.i18n.__('error.attribute', ctx.i18n.__(`key.z-${entry.key}`)) })
            if (entry.data) objKnightList.push(entry)
            return true
          })

          res(recursive(objKnightList))
        }
        return true
      })
      res()
    }

    recursive(knightList)
  }),
}
