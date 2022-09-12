const mongoose = require('mongoose')

const profileImg = mongoose.Schema({
  profileImgUrl: { type: String },
})

module.exports = mongoose.model('ProfileImg', profileImg)
