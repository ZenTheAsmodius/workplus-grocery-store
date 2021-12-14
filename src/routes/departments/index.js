const router = require('express').Router()
const employees = require('./employees')
const managers = require('./managers')

const { findAll, single, getByName } = require('../../controllers/departments')
const { isAuthenticated, isAuthorized } = require('../../middlewares/auth')
const { USER_TYPES } = require('../../types')

router.route('/').get(findAll)

router.param('name', getByName)

router.route('/:name').get(single)

router.use('/:name/employees', isAuthenticated, employees)

router.use('/:name/managers', isAuthenticated, isAuthorized({ role: USER_TYPES.Manager }), managers)

module.exports = router
