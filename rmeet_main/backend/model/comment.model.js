const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: 'User' },
    userName: { type: String, ref: 'User' },
    userImgUrl: { type: String, ref: 'User' },
    post: { type: mongoose.Types.ObjectId, ref: 'Post' },
    content: { type: String, required: true },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Comment', commentSchema)
