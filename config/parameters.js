require('dotenv').config()

module.exports = {
  db: `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@mongo:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  secret: process.env.JWT_SECRET,
}
