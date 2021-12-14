const Manager = require('../../models/Manager')

const findAll = (req, res, next) => {
  let query = { ...req.query }

  if (req.department) {
    if (query.descendants && [true, 'true', 1, '1'].indexOf(query.descendants) > -1) query = { ...query, $or: [{ department: req.department.name }, { ancestors: req.department.name }] }
    else query = { ...query, department: req.department.name }
  }

  Manager.find(query).exec((err, data) => {
    if (err) return next(err)
    return res.status(200).json(data)
  })
}

const create = async (req, res, next) => {
  const manager = new Manager(req.body)
  try {
    await manager.save()

    return res.status(201).json(manager)
  }
  catch (e) {
    return next(e)
  }
}

const getOneByUsername = (req, _res, next, username) => {
  if (!username) {
    return next({
      status: 404,
      message: "Not found"
    })
  }

  Manager.findOne({ username }, (err, data) => {
    if (err) next(err)

    if (data == null) return next({
      status: 404,
      message: "Not found"
    })

    req.manager = data
    next()
  })
}

const single = (req, res) => {
  res.status(200).json(req.manager)
}

const update = async (req, res, next) => {
  let { manager } = req
  for (const [key, value] of (Object.entries(req.body))) {
    manager[key] = value
  }
  try {
    await manager.save()
    return res.status(204).end()
  }
  catch (e) {
    return next(e)
  }
}

async function deleteOne(req, res, next) {
  const { manager } = req
  try {
    await Manager.deleteOne({ username: manager.username }).exec()
    return res.status(204).end()
  }
  catch (e) {
    return next(e)
  }
}

module.exports = {
  findAll,
  create,
  getOneByUsername,
  single,
  update,
  deleteOne
}
