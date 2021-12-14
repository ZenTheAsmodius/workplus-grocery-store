const jwt = require('jsonwebtoken')
const JWT_CYPHER = process.env.JWT_CYPHER
const JWT_DURATION = process.env.JWT_DURATION || '1h'

function jwtSign(claims) {
  return new Promise((resolve, reject) => {
    jwt.sign(claims, JWT_CYPHER, {
      expiresIn: JWT_DURATION
    }, (err, token) => {
      if (err) return reject(err)
      resolve(token)
    })
  })
}

function jwtVerify(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_CYPHER, (err, payload) => {
      if (err) return reject(err)
      resolve(payload)
    })
  })
}

module.exports = {
  jwtSign,
  jwtVerify
}
