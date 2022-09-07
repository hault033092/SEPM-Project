const mongoose = require('mongoose')

const profilePic = mongoose.Schema({
  profilePicUrl: { type: String },
})

module.exports = mongoose.model('ProfilePic', profilePic)
