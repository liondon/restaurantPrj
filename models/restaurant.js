const mongoose = require('mongoose')
const Schema = mongoose.Schema

const restaurantSchema = Schema({
  name: {
    type: String,
    required: true
  },
  tel: {
    type: String,
  },
  addr: {
    type: String,
  },
  open_hours: {
    type: Date,
  },
  category: {
    type: String,
  },
  rating: {
    type: Number,
    // required: true
  },
  image: {
    type: String,
  },
  google_map: {
    type: String,
  },
  desc: {
    type: String,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true
  }
})

module.exports = mongoose.model('Restaurant', restaurantSchema)