const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema(
  {
    from: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    to: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true, max: 1200, min: 6 },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Message', messageSchema)
