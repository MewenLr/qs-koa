process.env.TEST_SERVER = true
const request = require('supertest')
const mongoose = require('mongoose')
const jwToken = require('jsonwebtoken')
const server = require('../../server')
const User = require('../../schemas/User')
const config = require('../../config/parameters')
const bcrypt = require('../../middlewares/bcrypt')
const queries = require('../../middlewares/queries')
const userController = require('../../controllers/user-controller')

/* eslint-disable global-require, import/no-dynamic-require  */
async function getAuthorization(lang) {
  const ctx = { state: { transFile: require(`../../config/translations/${lang}-translation.js`) } }
  const { doc } = await queries(ctx).findOne(User, { username: 'secureuser' })
  await bcrypt(ctx).compareHash('Pass1234', doc.password)
  return jwToken.sign({ user: doc._id }, config.secret, { expiresIn: 14400 })
}

describe('Routes _secure:', () => {
  function context(username, password, email) {
    return {
      state: {
        transFile: require('../../config/translations/en-translation.js'),
      },
      request: {
        body: {
          username,
          password,
          email,
        },
      },
    }
  }

  beforeAll(async () => {
    await mongoose.connect(config.dbTest, { useNewUrlParser: true })
    const collections = await mongoose.connection.db.collections()
    collections.map(async (collection) => {
      await collection.deleteMany({})
    })
    await userController.regUser(context('secureuser', 'Pass1234', 'testmail@gmail.com'))
    await userController.regUser(context('secureuser2', 'Pass1234', 'testmail2@gmail.com'))
  })

  afterAll(async () => {
    await server.close()
    await mongoose.connection.close()
  })

  describe('get: /user/', () => {
    test('should be unauthorized', async () => {
      const res = await request(server)
        .get('/user')
        .set('Authorization', '')
      expect(res.status).toEqual(401)
      expect(res.type).toEqual('text/plain')
      expect(res.error.text).toEqual('Authentication Error')
    })

    test('should return status 200 & equal keys', async () => {
      const lang = 'en'
      const token = await getAuthorization(lang)
      const res = await request(server)
        .get('/user')
        .set('Content-Type', 'application/json')
        .set('Accept-Language', lang)
        .set('Authorization', `Bearer ${token}`)
      expect(res.status).toEqual(200)
      expect(res.type).toEqual('application/json')
      expect(Object.keys(res.body)).toEqual(
        expect.arrayContaining(['username', 'email']),
      )
    })
  })

  describe('update: /user/', () => {
    test('should be unauthorized', async () => {
      const res = await request(server)
        .put('/user')
        .set('Authorization', '')
      expect(res.status).toEqual(401)
      expect(res.type).toEqual('text/plain')
      expect(res.error.text).toEqual('Authentication Error')
    })

    test('should return \'The object updates is empty\'', async () => {
      const lang = 'en'
      const token = await getAuthorization(lang)
      const res = await request(server)
        .put('/user')
        .send({
          email: 'testmail@gmail.com',
        })
        .set('Content-Type', 'application/json')
        .set('Accept-Language', lang)
        .set('Authorization', `Bearer ${token}`)
      expect(res.status).toEqual(400)
      expect(res.type).toEqual('application/json')
      expect(res.body.msg).toEqual('The object updates is empty')
    })

    test('should return \'username secureuser2 already exists\'', async () => {
      const lang = 'en'
      const token = await getAuthorization(lang)
      const res = await request(server)
        .put('/user')
        .send({
          email: 'testmail@gmail.com',
          updates: {
            username: 'secureuser2',
          },
        })
        .set('Content-Type', 'application/json')
        .set('Accept-Language', lang)
        .set('Authorization', `Bearer ${token}`)
      expect(res.status).toEqual(400)
      expect(res.type).toEqual('application/json')
      expect(res.body.msg).toEqual('username secureuser2 already exists')
    })

    test('should return \'Successful update\'', async () => {
      const lang = 'en'
      const token = await getAuthorization(lang)
      const res = await request(server)
        .put('/user')
        .send({
          email: 'testmail2@gmail.com',
          updates: {
            username: 'secureuser3',
          },
        })
        .set('Content-Type', 'application/json')
        .set('Accept-Language', lang)
        .set('Authorization', `Bearer ${token}`)
      expect(res.status).toEqual(200)
      expect(res.type).toEqual('application/json')
      expect(res.body.msg).toEqual('Successful update')
      expect(Object.keys(res.body)).toEqual(
        expect.arrayContaining(['doc']),
      )
    })
  })

  describe('delete: /user/', () => {
    test('should be unauthorized', async () => {
      const res = await request(server)
        .delete('/user')
        .set('Authorization', '')
      expect(res.status).toEqual(401)
      expect(res.type).toEqual('text/plain')
      expect(res.error.text).toEqual('Authentication Error')
    })

    test('should return \'The attribute username is missing\'', async () => {
      const lang = 'en'
      const token = await getAuthorization(lang)
      const res = await request(server)
        .delete('/user')
        .set('Content-Type', 'application/json')
        .set('Accept-Language', lang)
        .set('Authorization', `Bearer ${token}`)
      expect(res.status).toEqual(400)
      expect(res.type).toEqual('application/json')
      expect(res.body.msg).toEqual('The attribute username is missing')
    })

    test('should return \'user secureuser2 was not found\'', async () => {
      const lang = 'en'
      const token = await getAuthorization(lang)
      const res = await request(server)
        .delete('/user')
        .send({
          username: 'secureuser2',
        })
        .set('Content-Type', 'application/json')
        .set('Accept-Language', lang)
        .set('Authorization', `Bearer ${token}`)
      expect(res.status).toEqual(404)
      expect(res.type).toEqual('application/json')
      expect(res.body.msg).toEqual('user secureuser2 was not found')
    })

    test('should return \'user deleted\'', async () => {
      const lang = 'en'
      const token = await getAuthorization(lang)
      const res = await request(server)
        .delete('/user')
        .send({
          username: 'secureuser',
        })
        .set('Content-Type', 'application/json')
        .set('Accept-Language', lang)
        .set('Authorization', `Bearer ${token}`)
      expect(res.status).toEqual(200)
      expect(res.type).toEqual('application/json')
      expect(res.body.msg).toEqual('user deleted')
    })
  })
})

process.env.TEST_SERVER = undefined
