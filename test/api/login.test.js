process.env.NODE_ENV = 'test'
process.env.JWT_CYPHER = 'test'

const expect = require('expect')
const request = require('supertest')
const { createTestDB } = require("../../src/lib/test-db")
const dbData = require('../../db-data')

let app, mongoServer, User;

before(async function () {
  mongoServer = await createTestDB()
  app = require('../../src/app')
  const Department = require('../../src/models/Department')
  const count = await Department.countDocuments()
  if (!count) await Department.insertMany(dbData.DEPARTMENTS)
  User = require('../../src/models/User')
})

describe('Login', function () {
  describe('POST /login', () => {
    it('should return status code 422', done => {
      request(app).post('/login').send({
        username: 'test',
        password: '123'
      }).then(res => {
        expect(res.status).toEqual(422)
        done()
      }).catch(e => done(e))
    })

    it('should return access token and status code 200', done => {
      const user_data = {
        username: 'test',
        password: 'pass123',
        full_name: 'Test User',
        role: 'Manager',
        department: 'Srbija'
      }

      const user = new User(user_data)
      user.save(e => {
        if (e) return done(e)
        request(app).post('/login').send({
          username: user_data.username,
          password: user_data.password
        }).then(res => {
          expect(res.status).toEqual(200)
          expect(res.body).toHaveProperty('access_token')
          User.deleteOne({ username: user.username }, () => { })
          done()
        }).catch(e => done(e))
      })
    })
  })
})
