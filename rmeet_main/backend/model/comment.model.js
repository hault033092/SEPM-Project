const mongoose = require('mongoose')

const commentSchema = mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    postId: { type: mongoose.Types.ObjectId, ref: 'Post', required: true },
    content: { type: String, required: true, max: 1000, min: 6 },
  },
  { timestamp: true }
)

module.exports = mongoose.model('Comment', commentSchema)
