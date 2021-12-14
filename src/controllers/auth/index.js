const User = require('../../models/User')
const { jwtSign } = require('../../lib/auth')
const Department = require('../../models/Department')

const INVALID_CREDENTIALS = {
  status: 422,
  message: "Invalid credentials"
}

const login = async (req, res, next) => {
  if (req.body == null) return next(INVALID_CREDENTIALS)
  const { username, password } = req.body

  if (!username || !password) return next(INVALID_CREDENTIALS)
  try {
    const user = await User.findOne({ username })

    if (!user) return next(INVALID_CREDENTIALS)
    if (!user.checkPassword(password)) return next(INVALID_CREDENTIALS)

    const ancestors = await Department.distinct('name', { ancestors: user.department }).exec()
    const access_token = await jwtSign({ ...user.getClaims(), ancestors })
    return res.status(200).json({ access_token })
  }
  catch (err) {
    return next(err)
  }
}

module.exports = {
  login
}
