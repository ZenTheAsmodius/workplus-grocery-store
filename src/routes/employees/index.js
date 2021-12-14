const router = require('express').Router()
const { findAll, create, getOneByUsername, single, update, deleteOne } = require('../../controllers/employees')
const { queryBasedOnClaims, isAuthorized, isAuthorizedBasedOnReqProperty } = require('../../middlewares/auth')
const { USER_TYPES } = require('../../types')

router.route('/')
  .get(
    queryBasedOnClaims({
      'department.$in': ['ancestors', 'department']
    }),
    findAll
  )
  .post(
    isAuthorized({ role: USER_TYPES.Manager }),
    isAuthorizedBasedOnReqProperty({
      department: 'manager.department',
      ancestors: 'manager.department'
    }),
    isAuthorizedBasedOnReqProperty({
      department: 'body.department',
      ancestors: 'body.department'
    }),
    create
  )

router.param('username', getOneByUsername)

router.route('/:username')
  .get(
    isAuthorizedBasedOnReqProperty({
      department: 'employee.department',
      ancestors: 'employee.department'
    }),
    single)
  .put(
    isAuthorized({ role: USER_TYPES.Manager }),
    isAuthorizedBasedOnReqProperty({
      department: 'employee.department',
      ancestors: 'employee.department'
    }),
    update
  )
  .delete(
    isAuthorized({ role: USER_TYPES.Manager }),
    isAuthorizedBasedOnReqProperty({
      department: 'employee.department',
      ancestors: 'employee.department'
    }),
    deleteOne
  )

module.exports = router
