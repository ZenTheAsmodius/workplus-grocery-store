const mongoose = require('mongoose')
const crypto = require('crypto')
const connection = require('../lib/mongoose-connection')

const { USER_TYPES } = require('../types')
const Department = require('./Department')

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  full_name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: Object.values(USER_TYPES),
    default: USER_TYPES.Employee,
    index: true
  },
  department: {
    type: String
  },
  salt: {
    type: String
  },
  hashed_password: {
    type: String
  }
}, {
  discriminatorKey: 'role',
  toJSON: {
    transform: function (doc, ret) {
      delete ret.hashed_password
      delete ret.salt
      delete ret._id
    }
  }
})

UserSchema.path('department').validate({
  validator: function (name) {
    return new Promise(function (resolve, reject) {
      Department.find({ name }, (err, data) => {
        if (err) return resolve(false)
        if (!data.length) return resolve(false)
        return resolve(true)
      })
    });
  }
});

UserSchema.methods.encryptPassword = function (password) {
  return crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
}

UserSchema.virtual('password').set(function (password) {
  this._plain_password = password
  this.salt = crypto.randomBytes(128).toString('hex')
  this.hashed_password = this.encryptPassword(password)
}).get(() => {
  return this._plain_password
})

UserSchema.methods.checkPassword = function (password) {
  return this.encryptPassword(password).toString() === this.hashed_password
}

UserSchema.methods.getClaims = function () {
  return {
    username: this.username,
    full_name: this.full_name,
    role: this.role,
    department: this.department
  }
}

module.exports = connection.model('User', UserSchema)
