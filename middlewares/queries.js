module.exports = (ctx) => {
  return {

    save: (data, key) => new Promise((res, rej) => {
      data.save((err) => {
        if (err) rej({ code: 400, msg: ctx.i18n.__('failure.save', ctx.i18n.__(`key.${key}`)) })
        res({ code: 202, msg: ctx.i18n.__('success.doc-saved', ctx.i18n.__(`key.${key}`)) })
      })
    }),

    check: (collection, query) => new Promise((res, rej) => {
      const [key, value] = Object.entries(query)[0]
      collection.countDocuments(query, (err, count) => {
        if (err) rej({ code: 400, msg: err })
        if (count > 0) rej({ code: 400, msg: ctx.i18n.__('error.doc-exists', ctx.i18n.__(`key.z-${key}`), value) })
        res()
      })
    }),

    findById: (collection, id) => new Promise((res, rej) => {
      collection.findById(id, (err, doc) => {
        if (err) rej({ code: 400, msg: err })
        if (!doc) rej({ code: 400, msg: 'The id was not found' })
        res({ code: 200, doc })
      })
    }),

    findOne: (collection, query) => new Promise((res, rej) => {
      const [key, value] = Object.entries(query)[0]
      collection.findOne(query, (err, doc) => {
        if (err) rej({ code: 400, msg: err })
        if (!doc) rej({ code: 404, msg: ctx.i18n.__('error.doc-not-found', ctx.i18n.__(`key.z-${key}`), value) })
        res({ code: 200, doc })
      })
    }),

    updateOne: (collection, query, updates, unset) => new Promise((res, rej) => {
      const [key, value] = Object.entries(query)[0]
      collection.findOneAndUpdate(
        query,
        { $set: updates, $unset: unset },
        { new: true, useFindAndModify: false },
        (err, doc) => {
          if (err) rej({ code: 400, msg: ctx.i18n.__('failure.update') })
          if (!doc) rej({ code: 404, msg: ctx.i18n.__('error.doc-not-found', ctx.i18n.__(`key.z-${key}`), value) })
          res({ code: 200, msg: ctx.i18n.__('success.update'), doc })
        },
      )
    }),

    deleteOne: (collection, query, key) => new Promise((res, rej) => {
      collection.deleteOne(query, (err, doc) => {
        const value = Object.values(query)[0]
        if (err) rej({ code: 400, msg: ctx.i18n.__('failure.delete') })
        if (!doc.deletedCount) rej({ code: 404, msg: ctx.i18n.__('error.doc-not-found', ctx.i18n.__(`key.z-${key}`), value) })
        res({ code: 200, msg: ctx.i18n.__('success.delete', ctx.i18n.__(`key.${key}`)) })
      })
    }),

  }
}
