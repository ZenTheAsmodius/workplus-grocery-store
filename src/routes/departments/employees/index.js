const { findAll } = require('../../../controllers/employees')

const router = require('express').Router()

router.route('/').get(findAll)

module.exports = router
