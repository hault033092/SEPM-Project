const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: 'User' },
    userName: { type: String, ref: 'User' },
    course: { type: mongoose.Types.ObjectId, ref: 'Course' },
    content: { type: String },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Review', reviewSchema)
