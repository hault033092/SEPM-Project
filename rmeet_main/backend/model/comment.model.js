const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: 'User' },
    postId: { type: mongoose.Types.ObjectId, ref: 'Post' },
    content: { type: String, required: true, max: 1000, min: 6 },
  },
  { timestamp: true }
)

module.exports = mongoose.model('Comment', commentSchema)
