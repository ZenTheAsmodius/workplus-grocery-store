const mongoose = require('mongoose')
const connection = require('../lib/mongoose-connection')

const { DEPARTMENT_TYPES } = require('../types')

const DepartmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  type: {
    type: String,
    enum: Object.values(DEPARTMENT_TYPES),
    required: true,
    index: true
  },
  parent: {
    type: String,
    default: null
  },
  ancestors: {
    type: [String],
    index: true,
    default: []
  }
})

module.exports = connection.model('Department', DepartmentSchema)
