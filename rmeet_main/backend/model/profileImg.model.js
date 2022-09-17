const mongoose = require('mongoose')

const profileImg = mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, ref: 'User' },
  profileImgUrl: { type: String },
})

module.exports = mongoose.model('ProfileImg', profileImg)
