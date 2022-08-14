const mongoose = require('mongoose')

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },

    courseId: {
      type: Types.ObjectId,
      ref: 'Course',
      required: true,
    },

    title: {
      type: String,
      required: true,
      max: 255,
      min: 6,
    },

    content: {
      type: String,
      required: true,
      max: 3000,
      min: 6,
    },
    like: {
      type: Number,
    },
  },
  { timestamp: true }
)

module.exports = mongoose.model('Post', postSchema)
