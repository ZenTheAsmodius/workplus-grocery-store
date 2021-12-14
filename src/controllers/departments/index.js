const Department = require('../../models/Department')

const findAll = (req, res, next) => {
  Department.find(req.query, (err, data) => {
    if (err) return next(err)
    return res.status(200).json(data)
  })
}

const getByName = (req, _res, next, name) => {
  if (!name) {
    return next({
      status: 404,
      message: "Not found"
    })
  }

  Department.findOne({ name }, (err, data) => {
    if (err) next(err)

    if (data == null) return next({
      status: 404,
      message: "Not found"
    })

    req.department = data
    next()
  })
}

const single = (req, res) => {
  return res.status(200).json(req.department)
}

module.exports = {
  findAll,
  getByName,
  single
}
