const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

router.get('/search', async (req, res) => {
  const keyword = req.query.keyword
  let restaurants = await Restaurant.find({ userId: req.user._id }).lean()
  restaurants = restaurants.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { restaurants: restaurants, keyword: keyword })
})

router.get('/', (req, res) => {
  const userId = req.user._id
  Restaurant.find({ userId })
    .lean()
    .sort({ _id: 'asc' })
    .then(restaurants => res.render('index', { restaurants }))
    .catch(err => console.log(err))
})

module.exports = router