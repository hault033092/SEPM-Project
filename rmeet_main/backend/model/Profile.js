const mongoose = requure('mongoose')

const profileSchema = mongoose.Schema(
  {
    userId: { type: Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    description: { type: String },
    profilePic: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamp: true }
)
