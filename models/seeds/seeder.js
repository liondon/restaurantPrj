const bcrypt = require('bcryptjs')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const User = require('../user')
const Restaurant = require('../restaurant')

const db = require('../../config/mongoose')

const SEED_USERs = [{
  name: 'user1',
  email: 'user1@example.com',
  password: '12345678'
}, {
  name: 'user2',
  email: 'user2@example.com',
  password: '12345678'
}]

function createRestaurants(userId, k, i) {
  return Promise.all(Array.from(
    { length: k },
    (_, j) => Restaurant.create({
      name: `Restaurant #${i + j + 1}`,
      tel: '012345678',
      addr: 'No.1, xyz Rd., ren-ai Dist., Taipei city',
      desc: 'The food here is fascinating!',
      open_hours: 2020 / 01 / 01,
      userId
    })
  ))
}

db.once('open', async () => {
  let seeds = await Promise.all(Array.from(
    { length: 2 },
    async (_, j) => {
      console.log(SEED_USERs[j])
      let user = await User.create({
        name: SEED_USERs[j].name,
        email: SEED_USERs[j].email,
        password: bcrypt.hashSync(SEED_USERs[j].password, bcrypt.genSaltSync(10))
      })
      const userId = user._id
      let restaurants = await createRestaurants(userId, 3, j * 3)
    }))
  console.log('seeds added.')
  process.exit()
})