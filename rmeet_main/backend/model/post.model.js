const mongoose = require('mongoose')

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },

    // postId: {
    //   type: mongoose.Types.ObjectId,
    // },

    // courseId: {
    //   type: mongoose.Types.ObjectId,
    //   ref: 'Course',
    //   required: true,
    // },

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
  { timestamp: true }
)

module.exports = mongoose.model('Post', postSchema)
