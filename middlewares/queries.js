module.exports = (ctx) => {
  const trans = ctx ? ctx.state.transFile : undefined

  return {

    save: (data, key) => new Promise((res, rej) => {
      data.save((err) => {
        if (err) rej({ code: 400, msg: trans.failSave(key) })
        res({ code: 202, msg: trans.docSaved(key) })
      })
    }),

    check: (collection, query) => new Promise((res, rej) => {
      const [key, value] = Object.entries(query)[0]
      collection.countDocuments(query, (err, count) => {
        if (err) rej({ code: 400, msg: err })
        if (count > 0) rej({ code: 400, msg: trans.docExists(key, value) })
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
        if (!doc) rej({ code: 404, msg: trans.docNotFound(key, value) })
        res({ code: 200, doc })
      })
    }),

    updateOne: (collection, query, updates) => new Promise((res, rej) => {
      const [key, value] = Object.entries(query)[0]
      collection.findOneAndUpdate(
        query,
        { $set: updates },
        { new: true, useFindAndModify: false },
        (err, doc) => {
          if (err) rej({ code: 400, msg: trans.failUpdate() })
          if (!doc) rej({ code: 404, msg: trans.docNotFound(key, value) })
          res({ code: 200, msg: trans.successUpdate(), doc })
        },
      )
    }),

    deleteOne: (collection, query, key) => new Promise((res, rej) => {
      collection.deleteOne(query, (err, doc) => {
        const value = Object.values(query)[0]
        if (err) rej({ code: 400, msg: trans.failDelete() })
        if (!doc.deletedCount) rej({ code: 404, msg: trans.docNotFound(key, value) })
        res({ code: 200, msg: trans.successDelete(key) })
      })
    }),

  }
}
