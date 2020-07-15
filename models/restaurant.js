const mongoose = require('mongoose')
const Schema = mongoose.Schema

const restaurantSchema = Schema({
  name: {
    type: String,
    required: true
  },
  tel: {
    type: String,
    required: false
  },
  addr: {
    type: String,
    required: false
  },
  open_hours: {
    type: Date,
    required: false
  },
  desc: {
    type: String,
    required: false
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true
  }
})

module.exports = mongoose.model('Restaurant', restaurantSchema)