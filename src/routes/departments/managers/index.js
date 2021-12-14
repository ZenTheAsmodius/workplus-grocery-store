const { findAll } = require('../../../controllers/managers')

const router = require('express').Router()

router.route('/').get(findAll)

module.exports = router
