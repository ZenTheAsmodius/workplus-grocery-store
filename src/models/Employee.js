const mongoose = require('mongoose')
const User = require('./User')

const EmployeeSchema = new mongoose.Schema({})

module.exports = User.discriminator('Employee', EmployeeSchema)
