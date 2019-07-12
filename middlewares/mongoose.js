/* eslint-disable no-console */
require('dotenv').config()
const mongoose = require('mongoose')
const config = require('../config/parameters')

module.exports = () => {
  if (!process.env.TEST_SERVER) {
    mongoose.connect(config.db, { useNewUrlParser: true })

    mongoose.connection
      .on('connected', () => console.log('Connected to database'))
      .on('error', err => console.log(`Mongoose default connection error: ${err}`))
      .on('disconnected', () => console.log('Mongoose default connection disconnected'))

    process.on('SIGINT', () => {
      mongoose.connection.close(() => {
        console.log('Mongoose default connection closed through app termination')
        process.exit(0)
      })
    })
  }
}
