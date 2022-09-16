const mongoose = require('mongoose')

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },

    title: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    semester: {
      type: String,
      required: true,
    },

    year: {
      type: Number,
      required: true,
    },

    like: {
      type: Number,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Post', postSchema)
