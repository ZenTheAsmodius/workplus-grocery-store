const { jwtVerify } = require('../lib/auth')

const isAuthenticated = async (req, _res, next) => {
  if (process.env.NODE_ENV === 'test') return next()

  const token = getBearerFromRequest(req)
  if (token == null) return next({ status: 401 })
  try {
    const claims = await jwtVerify(token)
    req.claims = claims
    return next()
  }
  catch (e) { next({ status: 401 }) }
}

const isAuthorized = (supported_claims = {}) => {
  return (req, _res, next) => {
    if (process.env.NODE_ENV === 'test') return next()

    const { claims } = req
    for (const [key, value] of Object.entries(supported_claims)) {
      if (!claims.hasOwnProperty(key)) continue
      if (value instanceof Array) {
        for (let i = 0; i < value.length; i++) {
          if (claims[key].indexOf(value[i]) > -1) return next()
        }
      }
      if (claims[key] === value) return next()
    }
    return next({ status: 403 })
  }
}

const isAuthorizedBasedOnReqProperty = (claims_options = {}) => {
  return (req, _res, next) => {
    if (process.env.NODE_ENV === 'test') return next()

    for (const [key, value] of Object.entries(claims_options)) {
      const compare_to = value.includes('.') ? getFromObjectByPath(req, value) : req[value]
      if (req.claims[key] == compare_to) return next()
      if (req.claims[key] instanceof Array && req.claims[key].indexOf(compare_to) > -1) return next()
    }
    return next({ status: 403 })
  }
}

const queryBasedOnClaims = (supported_claims = {}) => {
  return (req, _res, next) => {
    if (process.env.NODE_ENV === 'test') return next()

    const { claims } = req
    let query = {}
    for (const [key, value] of Object.entries(supported_claims)) {
      if (!(value instanceof Array)) {
        query[key] = claims[value]
        continue
      }

      let arr = []
      for (v of value) {
        if (claims[v] instanceof Array) arr = [...arr, ...claims[v]]
        else arr.push(claims[v])
      }

      if (key.indexOf('.') > -1) {
        let splitted_key = key.split('.')
        const k = splitted_key.pop()
        query[k] = arr

        for (let i = splitted_key.length - 1; i === 0; i--) {
          const q = {}
          q[splitted_key[i]] = { ...query }
          query = q
        }
        continue
      }
      query[key] = arr
    }
    req.query = { ...req.query, ...query }
    return next()
  }
}

function getBearerFromRequest(req) {
  if (req == null || req.headers == null || req.headers.authorization == null) return null
  const splitted = req.headers.authorization.split(' ')
  if (splitted[0] != 'Bearer') return null
  if (splitted[1] == null) return null
  return splitted[1]
}

function getFromObjectByPath(obj, path) {
  const splitted = path.split('.')
  let from = { ...obj }
  while (splitted.length) {
    const key = splitted.shift()
    from = from[key]
  }
  return from
}

module.exports = {
  isAuthenticated,
  isAuthorized,
  queryBasedOnClaims,
  isAuthorizedBasedOnReqProperty
}
