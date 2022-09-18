const mongoose = require('mongoose')

const assignmentSchema = new mongoose.Schema(
  {
    courseId: { type: mongoose.Types.ObjectId, ref: 'Course' },
    type: { type: String },
    quantity: { type: Number },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Assignment', assignmentSchema)
