process.env.TEST_SERVER = true
const request = require('supertest')
const mongoose = require('mongoose')
const server = require('../../server')
const config = require('../../config/parameters')

describe('Routes _unsecure:', () => {
  beforeAll(async () => {
    await mongoose.connect(config.dbTest, { useNewUrlParser: true })
    const collections = await mongoose.connection.db.collections()
    collections.map(async (collection) => {
      await collection.deleteMany({})
    })
  })

  afterAll(async () => {
    await server.close()
    await mongoose.connection.close()
  })

  describe('post: /user/register', () => {
    test('should return \'The attribute email is missing\'', async () => {
      const res = await request(server)
        .post('/user/register')
        .set('Content-Type', 'application/json')
        .set('Accept-Language', 'en')
        .send({
          username: 'unsecureuser',
          password: 'Pass1234',
        })
      expect(res.status).toEqual(400)
      expect(res.type).toEqual('application/json')
      expect(res.body.msg).toEqual('The attribute email is missing')
    })

    test('should return \'user saved\'', async () => {
      const res = await request(server)
        .post('/user/register')
        .set('Content-Type', 'application/json')
        .set('Accept-Language', 'en')
        .send({
          username: 'unsecureuser',
          password: 'Pass1234',
          email: 'testemail@gmail.com',
        })
      expect(res.status).toEqual(202)
      expect(res.type).toEqual('application/json')
      expect(res.body.msg).toEqual('user saved')
    })

    test('should return \'username unsecureuser already exists\'', async () => {
      const res = await request(server)
        .post('/user/register')
        .set('Content-Type', 'application/json')
        .set('Accept-Language', 'en')
        .send({
          username: 'unsecureuser',
          password: 'Pass1234',
          email: 'testemail@gmail.com',
        })
      expect(res.status).toEqual(400)
      expect(res.type).toEqual('application/json')
      expect(res.body.msg).toEqual('username unsecureuser already exists')
    })
  })

  describe('post: /user/authenticate', () => {
    test('should return \'The attribute password is missing\'', async () => {
      const res = await request(server)
        .post('/user/register')
        .set('Content-Type', 'application/json')
        .set('Accept-Language', 'en')
        .send({
          username: 'unsecureuser',
        })
      expect(res.status).toEqual(400)
      expect(res.type).toEqual('application/json')
      expect(res.body.msg).toEqual('The attribute password is missing')
    })

    test('should return \'Token created\'', async () => {
      const res = await request(server)
        .post('/user/authenticate')
        .set('Content-Type', 'application/json')
        .set('Accept-Language', 'en')
        .send({
          username: 'unsecureuser',
          password: 'Pass1234',
        })
      expect(res.status).toEqual(200)
      expect(res.type).toEqual('application/json')
      expect(res.body.msg).toEqual('Token created')
      expect(res.body.token).toMatch(/^Bearer\b/)
    })

    test('should return \'username unsecureuser2 was not found\'', async () => {
      const res = await request(server)
        .post('/user/authenticate')
        .set('Content-Type', 'application/json')
        .set('Accept-Language', 'en')
        .send({
          username: 'unsecureuser2',
          password: 'Pass1234',
        })
      expect(res.status).toEqual(404)
      expect(res.type).toEqual('application/json')
      expect(res.body.msg).toEqual('username unsecureuser2 was not found')
    })

    test('should return \'password doesn\'t match\'', async () => {
      const res = await request(server)
        .post('/user/authenticate')
        .set('Content-Type', 'application/json')
        .set('Accept-Language', 'en')
        .send({
          username: 'unsecureuser',
          password: 'Mypass123',
        })
      expect(res.status).toEqual(400)
      expect(res.type).toEqual('application/json')
      expect(res.body.msg).toEqual('password doesn\'t match')
    })
  })
})

process.env.TEST_SERVER = undefined
