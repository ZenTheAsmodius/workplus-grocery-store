const mongoose = require('mongoose')
const User = require('./User')

const ManagerSchema = new mongoose.Schema({})

module.exports = User.discriminator('Manager', ManagerSchema)
