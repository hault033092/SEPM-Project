const mongoose = require('mongoose')

const courseSchema = mongoose.Schema(
  {
    courseId: {
      type: String,
      required: true,
    },

    courseName: {
      type: String,
      required: true,
    },
  },
  { timestamp: true }
)

module.exports = mongoose('Course', courseSchema)
