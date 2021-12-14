require('dotenv').config()
const Department = require('./src/models/Department')
const User = require('./src/models/User')

const { DEPARTMENTS, USERS } = require('./db-data')

async function shouldSeed() {
  return await Department.countDocuments() === 0 && await User.countDocuments() === 0
}

async function seedUsers() {
  try {
    for (const u of USERS) {
      const user = new User(u)
      await user.save()
    }
  }
  catch (e) {
    console.error(e)
    process.exit(1)
  }
}

async function seed() {
  try {
    const should_seed = await shouldSeed()
    if (!should_seed) {
      console.log('There are data already in database')
      process.exit(0)
    }
    await Department.insertMany(DEPARTMENTS)
    await seedUsers()
  }
  catch (e) {
    console.error(e)
    process.exit(1)
  }
  process.exit(0)
}

seed()
