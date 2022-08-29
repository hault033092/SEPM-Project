const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    userImage: { data: Buffer, contentType: String },
    name: { type: String, required: true },
    description: { type: String },
    bio: {
      type: String,
    },
    major: {
      type: String,
      required: true,
    },
    posts: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Post',
      },
    ],
  },
  { timestamp: true }
)

module.exports = mongoose.model('Profile', profileSchema)
