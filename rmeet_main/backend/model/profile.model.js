const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: 'User' },
    userProfilePic: { type: mongoose.Types.ObjectId, ref: 'ProfilePic' },
    userName: { type: String },
    gender: { type: String },
    bio: {
      type: String,
    },
    // major: {
    //   type: String,
    //   required: true,
    // },
    posts: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Post',
      },
    ],

    comments: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Comment',
      },
    ],
  },
  { timestamp: true }
)

module.exports = mongoose.model('Profile', profileSchema)
