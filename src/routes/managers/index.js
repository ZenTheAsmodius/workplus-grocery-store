const router = require('express').Router()
const { findAll, create, getOneByUsername, single, update, deleteOne } = require('../../controllers/managers')
const { queryBasedOnClaims, isAuthorizedBasedOnReqProperty } = require('../../middlewares/auth')

router.route('/')
  .get(
    queryBasedOnClaims({
      'department.$in': ['ancestors', 'department']
    }),
    findAll
  )
  .post(
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
      department: 'manager.department',
      ancestors: 'manager.department'
    }),
    single
  )
  .put(
    isAuthorizedBasedOnReqProperty({
      department: 'manager.department',
      ancestors: 'manager.department'
    }),
    update
  )
  .delete(
    isAuthorizedBasedOnReqProperty({
      department: 'manager.department',
      ancestors: 'manager.department'
    }),
    deleteOne
  )

module.exports = router
