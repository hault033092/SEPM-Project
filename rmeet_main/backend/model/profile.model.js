const mongoose = requure('mongoose')

const profileSchema = mongoose.Schema(
  {
    userId: { type: Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    description: { type: String },
    bio: {
      data: Buffer,
      contentType: String,
    },
    major: {
      type: String,
      required: true,
    },
  },
  { timestamp: true }
)
