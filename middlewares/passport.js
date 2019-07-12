const jwt = require('passport-jwt')
const queries = require('./queries')
const User = require('../schemas/User')
const config = require('../config/parameters')

module.exports = (passport) => {
  passport.use(
    new jwt.Strategy({
      jwtFromRequest: jwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.secret,
    }, async (payload, done) => {
      try {
        const { doc } = await queries().findById(User, payload.user)
        if (doc) {
          done(null, doc)
        } else {
          done(null, false)
        }
      } catch (err) {
        done(err)
      }
    }),
  )
}
