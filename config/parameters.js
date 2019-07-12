require('dotenv').config()

module.exports = {
  db: `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@mongo:27017/${process.env.DB_NAME}`,
  dbTest: 'mongodb://127.0.0.1:27018/test',
  secret: process.env.JWT_SECRET,
}
