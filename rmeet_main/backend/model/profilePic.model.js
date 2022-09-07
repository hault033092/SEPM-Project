const mongoose = require('mongoose')

const profilePic = mongoose.Schema({
  profilePicUrl: { type: String },
  userProfile: {type: mongoose.Schema.Types.ObjectId}
})

module.exports = mongoose.model('ProfilePic', profilePic)
