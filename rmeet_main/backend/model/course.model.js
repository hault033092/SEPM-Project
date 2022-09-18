const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema(
  {
    courseId: {
      type: String,
      required: true,
    },

    courseName: {
      type: String,
      required: true,
    },

    mode: {
      type: String,
    },

    type: {
      type: String,
    },

    year: {
      type: Number,
    },

    recommendation: {
      type: String,
    },

    lecturerName: {
      type: String,
    },

    assignments: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Assignment',
      },
    ],

    reviews: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Review',
      },
    ],
  },
  { timestamps: true }
)

module.exports = mongoose.model('Course', courseSchema)
