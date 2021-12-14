process.env.NODE_ENV = 'test'

const expect = require('expect')
const request = require('supertest')
const { createTestDB } = require("../../src/lib/test-db")
const dbData = require('../../db-data')

let app, mongoServer;

before(async function () {
  mongoServer = await createTestDB()
  app = require('../../src/app')
  const Department = require('../../src/models/Department')
  const count = await Department.countDocuments()
  if (!count) await Department.insertMany(dbData.DEPARTMENTS)
})

describe('Departments', function () {
  describe('GET /departments', () => {
    it('should return status code 200 ', done => {
      request(app).get('/departments').then((res) => {
        expect(res.status).toEqual(200)
        done()
      }).catch(e => done(e))
    })

    it('should return Array of departments', done => {
      request(app).get('/departments').then((res) => {
        expect(res.body).toBeInstanceOf(Array)
        expect(res.body.length).toBeGreaterThanOrEqual(1)
        done()
      }).catch(e => done(e))
    })
  })

  describe('GET /departments/:name', () => {
    const name = 'Srbija'
    it('should return status code 200', done => {
      request(app).get(`/departments/${name}`).then((res) => {
        expect(res.status).toEqual(200)
        done()
      }).catch(e => done(e))
    })

    it('should return valid department', done => {
      request(app).get(`/departments/${name}`).then((res) => {
        expect(res.body).toHaveProperty('name')
        expect(res.body).toHaveProperty('type')
        expect(res.body).toHaveProperty('parent')
        expect(res.body).toHaveProperty('ancestors')
        done()
      }).catch(e => done(e))
    })

    it('should return status code 404 for unknown department', done => {
      request(app).get(`/departments/Sri%20Lanka`).then((res) => {
        expect(res.status).toEqual(404)
        done()
      }).catch(e => done(e))
    })
  })

  describe('GET /departments/:name/employees', () => {
    const name = 'Srbija'
    it('should return status code 200', done => {
      request(app).get(`/departments/${name}/employees`).then((res) => {
        expect(res.status).toEqual(200)
        done()
      }).catch(e => done(e))
    })

    it('should return array of Employees', done => {
      request(app).get(`/departments/${name}/employees`).then((res) => {
        expect(res.body).toBeInstanceOf(Array)
        expect(res.body.length).toBeGreaterThanOrEqual(0)
        done()
      }).catch(e => done(e))
    })

    it('should return status code 404 for unknown department', done => {
      request(app).get(`/departments/Sri%20Lanka/employees`).then((res) => {
        expect(res.status).toEqual(404)
        done()
      }).catch(e => done(e))
    })
  })

  describe('GET /departments/:name/managers', () => {
    const name = 'Srbija'
    it('should return status code 200', done => {
      request(app).get(`/departments/${name}/managers`).then((res) => {
        expect(res.status).toEqual(200)
        done()
      }).catch(e => done(e))
    })

    it('should return array of Managers', done => {
      request(app).get(`/departments/${name}/managers`).then((res) => {
        expect(res.body).toBeInstanceOf(Array)
        expect(res.body.length).toBeGreaterThanOrEqual(0)
        done()
      }).catch(e => done(e))
    })

    it('should return status code 404 for unknown department', done => {
      request(app).get(`/departments/Sri%20Lanka/managers`).then((res) => {
        expect(res.status).toEqual(404)
        done()
      }).catch(e => done(e))
    })
  })
})
