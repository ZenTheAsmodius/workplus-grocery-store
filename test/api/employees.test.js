process.env.NODE_ENV = 'test'

const expect = require('expect')
const request = require('supertest')
const { createTestDB } = require("../../src/lib/test-db")
const dbData = require('../../db-data')
const { USER_TYPES } = require('../../src/types')

let app, mongoServer

const isValidEmployee = (user) => {
  expect(user).toHaveProperty('username')
  expect(user).toHaveProperty('full_name')
  expect(user).toHaveProperty('role')
  expect(user.role).toEqual(USER_TYPES.Employee)
  expect(user).toHaveProperty('department')
}

before(async function () {
  mongoServer = await createTestDB()
  app = require('../../src/app')
  const Department = require('../../src/models/Department')
  const count = await Department.countDocuments()
  if (!count) await Department.insertMany(dbData.DEPARTMENTS)
})

describe('Employees', function () {
  describe('GET /employees', () => {
    it('should return status code 200 ', done => {
      request(app).get('/employees').then((res) => {
        expect(res.status).toEqual(200)
        done()
      }).catch(e => done(e))
    })

    it('should return Array of employers ', done => {
      request(app).get('/employees').then((res) => {
        expect(res.body).toBeInstanceOf(Array)
        expect(res.body.length).toBeGreaterThanOrEqual(0)
        done()
      }).catch(e => done(e))
    })

    it('should return Array with minimum 1 employee', done => {
      const employee = dbData.USERS.filter(u => u.role === USER_TYPES.Employee)[0]
      request(app).post('/employees').send(employee).then(() => {
        request(app).get('/employees').then((res) => {
          expect(res.body.length).toBeGreaterThanOrEqual(1)
          done()
        }).catch(e => done(e))
      })
    })
  })

  describe('POST /employees', () => {
    it('should create valid employee return status code 201 ', done => {
      const employee = dbData.USERS.filter(u => u.role === USER_TYPES.Employee)[1]
      request(app).post('/employees').send(employee).then((res) => {
        isValidEmployee(res.body)
        expect(res.status).toEqual(201)
        done()
      }).catch(e => done(e))
    })

    it('should return status code 422 for invalid user', done => {
      const employee = { full_name: 'Marko Kon' }
      request(app).post('/employees').send(employee).then((res) => {
        expect(res.status).toEqual(422)
        done()
      }).catch(e => done(e))
    })
  })

  describe('GET /employees/:username', () => {
    it('should return valid employee and status code 200', done => {
      const employee = dbData.USERS.filter(u => u.role === USER_TYPES.Employee)[2]
      request(app).post('/employees').send(employee).then(() => {
        request(app).get(`/employees/${employee.username}`).then((res) => {
          isValidEmployee(res.body)
          expect(res.status).toEqual(200)
          done()
        }).catch(e => done(e))
      })
    })

    it('should return status code 404 for missing user', done => {
      const username = 'not_existsing_username'
      request(app).get(`/employees/${username}`).then((res) => {
        expect(res.status).toEqual(404)
        done()
      }).catch(e => done(e))
    })
  })

  describe('PUT /employees/:username', () => {
    it('should return status code 204 and employee should be updated', done => {
      const employee = dbData.USERS.filter(u => u.role === USER_TYPES.Employee)[1]
      const update = { department: 'Radnja 3' }
      request(app).put(`/employees/${employee.username}`).send({
        ...employee, ...update
      }).then((res) => {
        expect(res.status).toEqual(204)
        request(app).get(`/employees/${employee.username}`).then((res) => {
          for (const key of Object.keys(update)) {
            expect(res.body[key]).toEqual(update[key])
          }
          done()
        }).catch(e => done(e))
      }).catch(e => done(e))
    })

    it('should return status code 404 for unexisting username', done => {
      const username = 'not_existsing_username'
      request(app).put(`/employees/${username}`).send({ full_name: 'Misko Jaksic' }).then((res) => {
        expect(res.status).toEqual(404)
        done()
      }).catch(e => done(e))
    })
  })

  describe('DELETE /employees/:username', () => {
    it('should return status code 204 and employee should be deleted', done => {
      const employee = dbData.USERS.filter(u => u.role === USER_TYPES.Employee)[1]
      request(app).delete(`/employees/${employee.username}`).then((res) => {
        expect(res.status).toEqual(204)
        request(app).get(`/employees/${employee.username}`).then((res) => {
          expect(res.status).toEqual(404)
          done()
        }).catch(e => done(e))
      }).catch(e => done(e))
    })

    it('should return status code 404 for unexisting username', done => {
      const username = 'not_existsing_username'
      request(app).delete(`/employees/${username}`).then((res) => {
        expect(res.status).toEqual(404)
        done()
      }).catch(e => done(e))
    })
  })
})
