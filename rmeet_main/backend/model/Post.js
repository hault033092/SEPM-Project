const mongoose = require('mongoose')

const postSchema = new mongoose.Schema(
  {
    // userId: {
    //   type: mongoose.Types.ObjectId,
    //   ref: 'User',
    //   required: true,
    // },

    // courseId: {
    //   type: mongoose.Types.ObjectId,
    //   ref: 'Course',
    //   required: true,
    // },

    title: {
      type: String,
      required: true,
      max: 64,
      min: 1,
    },

    content: {
      type: String,
      required: true,
      max: 2048,
      min: 6,
    },

    semester: {
      type: String,
      required: true,
      min: 1,
    },

    year: {
      type: Number,
      required: true,
      min: 4,
    },

    like: {
      type: Number,
    },
  },
  { timestamp: true }
)

module.exports = mongoose.model('Post', postSchema)
