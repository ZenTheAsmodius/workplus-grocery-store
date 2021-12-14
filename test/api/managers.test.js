process.env.NODE_ENV = 'test'

const expect = require('expect')
const request = require('supertest')
const { createTestDB } = require("../../src/lib/test-db")
const dbData = require('../../db-data')
const { USER_TYPES } = require('../../src/types')

let app, mongoServer;

const isValidManager = (user) => {
  expect(user).toHaveProperty('username')
  expect(user).toHaveProperty('full_name')
  expect(user).toHaveProperty('role')
  expect(user.role).toEqual(USER_TYPES.Manager)
  expect(user).toHaveProperty('department')
}

before(async function () {
  mongoServer = await createTestDB()
  app = require('../../src/app')
  const Department = require('../../src/models/Department')
  const count = await Department.countDocuments()
  if (!count) await Department.insertMany(dbData.DEPARTMENTS)
})

describe('Managers', function () {
  describe('GET /managers', () => {
    it('should return status code 200 ', done => {
      request(app).get('/managers').then((res) => {
        expect(res.status).toEqual(200)
        done()
      }).catch(e => done(e))
    })

    it('should return array of Managers ', done => {
      request(app).get('/managers').then((res) => {
        expect(res.body).toBeInstanceOf(Array)
        expect(res.body.length).toBeGreaterThanOrEqual(0)
        done()
      }).catch(e => done(e))
    })

    it('should return Array with minimum 1 manager', done => {
      const manager = dbData.USERS.filter(u => u.role === USER_TYPES.Manager)[0]
      request(app).post('/managers').send(manager).then(() => {
        request(app).get('/managers').then((res) => {
          expect(res.body.length).toBeGreaterThanOrEqual(1)
          done()
        }).catch(e => done(e))
      })
    })
  })

  describe('POST /managers', () => {
    it('should create valid manager return status code 201 ', done => {
      const manager = dbData.USERS.filter(u => u.role === USER_TYPES.Manager)[1]
      request(app).post('/managers').send(manager).then((res) => {
        isValidManager(res.body)
        expect(res.status).toEqual(201)
        done()
      }).catch(e => done(e))
    })

    it('should return status code 422 for invalid user', done => {
      const manager = { full_name: 'Marko Kon' }
      request(app).post('/managers').send(manager).then((res) => {
        expect(res.status).toEqual(422)
        done()
      }).catch(e => done(e))
    })
  })

  describe('GET /managers/:username', () => {
    it('should return valid manager and status code 200', done => {
      const manager = dbData.USERS.filter(u => u.role === USER_TYPES.Manager)[2] || { username: 'djole' }
      request(app).post('/managers').send(manager).then(() => {
        request(app).get(`/managers/${manager.username}`).then((res) => {
          isValidManager(res.body)
          expect(res.status).toEqual(200)
          done()
        }).catch(e => done(e))
      })
    })

    it('should return status code 404 for missing user', done => {
      const username = 'not_existsing_username'
      request(app).get(`/managers/${username}`).then((res) => {
        expect(res.status).toEqual(404)
        done()
      }).catch(e => done(e))
    })
  })

  describe('PUT /managers/:username', () => {
    it('should return status code 204 and manager should be updated', done => {
      const manager = dbData.USERS.filter(u => u.role === USER_TYPES.Manager)[1]
      const update = { department: 'Radnja 3' }
      request(app).put(`/managers/${manager.username}`).send({
        ...manager, ...update
      }).then((res) => {
        expect(res.status).toEqual(204)
        request(app).get(`/managers/${manager.username}`).then((res) => {
          for (const key of Object.keys(update)) {
            expect(res.body[key]).toEqual(update[key])
          }
          done()
        }).catch(e => done(e))
      }).catch(e => done(e))
    })

    it('should return status code 404 for unexisting username', done => {
      const username = 'not_existsing_username'
      request(app).put(`/managers/${username}`).send({ full_name: 'Misko Jaksic' }).then((res) => {
        expect(res.status).toEqual(404)
        done()
      }).catch(e => done(e))
    })
  })

  describe('DELETE /managers/:username', () => {
    it('should return status code 204 and manager should be deleted', done => {
      const manager = dbData.USERS.filter(u => u.role === USER_TYPES.Manager)[1]
      request(app).delete(`/managers/${manager.username}`).then((res) => {
        expect(res.status).toEqual(204)
        request(app).get(`/managers/${manager.username}`).then((res) => {
          expect(res.status).toEqual(404)
          done()
        }).catch(e => done(e))
      }).catch(e => done(e))
    })

    it('should return status code 404 for unexisting username', done => {
      const username = 'not_existsing_username'
      request(app).delete(`/managers/${username}`).then((res) => {
        expect(res.status).toEqual(404)
        done()
      }).catch(e => done(e))
    })
  })
})
