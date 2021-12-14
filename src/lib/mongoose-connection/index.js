const mongoose = require('mongoose')
const DB_URL = process.env.DB_URL

const connection = module.exports = mongoose.createConnection(DB_URL)

connection.on('connected', () => {
  console.log('Mongoose connected to database')
})

connection.on('error', (err) => {
  console.log('Mongoose default connection error: ' + err)
})
