const bcrypt = require('bcryptjs')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const User = require('../user')
const Restaurant = require('../restaurant')

const db = require('../../config/mongoose')

const SEED_RESTAURANTs = require('../../restaurant.json')
const SEED_USERs = [{
  name: 'user1',
  email: 'user1@example.com',
  password: '12345678'
}, {
  name: 'user2',
  email: 'user2@example.com',
  password: '12345678'
}]

function createRestaurants(userId, first, last) {
  return Promise.all(Array.from(
    { length: last - first },
    (_, i) => {
      const restaurant = SEED_RESTAURANTs.results.find(
        restaurant => restaurant.id.toString() === (first + i + 1).toString())
      return Restaurant.create({
        name: restaurant.name,
        tel: restaurant.phone,
        addr: restaurant.location,
        open_hours: 2020 / 01 / 01,
        category: restaurant.category,
        rating: restaurant.rating,
        image: restaurant.image,
        google_map: restaurant.google_map,
        desc: restaurant.description,
        userId
      })
    }
  ))
}

db.once('open', async () => {
  await Promise.all(Array.from(
    { length: 2 },
    async (_, i) => {
      const user = await User.create({
        name: SEED_USERs[i].name,
        email: SEED_USERs[i].email,
        password: bcrypt.hashSync(SEED_USERs[i].password, bcrypt.genSaltSync(10))
      })
      await createRestaurants(user._id, i * 3, (i + 1) * 3)
    }))
  console.log('seeds added.')
  process.exit()
})