const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      max: 255,
      min: 6,
    },

    password: {
      type: String,
      required: true,
      max: 1024,
      min: 6,
    },

    profileImg: { type: String },

    userName: { type: String },

    gender: { type: String },

    bio: {
      type: String,
    },

    major: {
      type: String,
    },

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
  { timestamps: true }
)

module.exports = mongoose.model('User', userSchema)
