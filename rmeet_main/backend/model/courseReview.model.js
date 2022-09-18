const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: 'User' },
    userName: { type: String, ref: 'User' },
    userImgUrl: { type: String, ref: 'User' },
    courseId: { type: mongoose.Types.ObjectId, ref: 'Course' },
    content: { type: String },
    rating: { type: Number },
    assignments: [
      {
        type: { type: String },
        quantity: { type: Number },
      },
    ],
  },
  { timestamps: true }
)

module.exports = mongoose.model('Review', reviewSchema)
