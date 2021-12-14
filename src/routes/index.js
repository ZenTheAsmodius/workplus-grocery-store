const router = require('express').Router()
const departments = require('./departments')
const employees = require('./employees')
const managers = require('./managers')

const { login } = require('../controllers/auth')
const { isAuthenticated, isAuthorized } = require('../middlewares/auth')
const { USER_TYPES } = require('../types')

router.use('/departments', departments)
router.use('/employees', isAuthenticated, employees)
router.use('/managers', isAuthenticated, isAuthorized({ role: USER_TYPES.Manager }), managers)

router.route('/login').post(login)

router.route('/').get((_req, res) => res.status(200).json({
  message: 'Welcome to Workplus Grocery Store!'
}))

module.exports = router
