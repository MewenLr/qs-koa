const Koa = require('koa')
const jwt = require('koa-jwt')
const cors = require('koa-cors')
const passport = require('koa-passport')
const bodyParser = require('koa-bodyparser')
const routes = require('./routes/routes')
const config = require('./config/parameters')

const app = new Koa()

// middlewares
require('dotenv').config()
require('./middlewares/mongoose')()

app.use(cors())
app.use(bodyParser())
app.use(passport.initialize())
require('./middlewares/passport')(passport)

// routes
routes.unsecureRoutes(app)
app.use(jwt({ secret: config.secret }))
routes.secureRoutes(app)

// server
const port = process.env.TEST_SERVER ? process.env.TEST_PORT : process.env.SERVER_PORT
const server = app.listen(port)

module.exports = server
