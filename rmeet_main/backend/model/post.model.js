const mongoose = require('mongoose')

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },

    userName: {
      type: String,
      ref: 'User',
    },

    courseName: {
      type: String,
      required: true,
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

    isLiked: {
      type: Boolean,
    },

    comments: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Comment',
      },
    ],
  },
  { timestamps: true }
)

module.exports = mongoose.model('Post', postSchema)
