const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({

  username: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  confirmed: {
    type: Boolean,
    default: false,
    required: true,
  },

  expireAt: {
    type: Date,
    default: Date.now,
    index: { expires: '1m' },
  },

})

module.exports = mongoose.model('User', UserSchema)
