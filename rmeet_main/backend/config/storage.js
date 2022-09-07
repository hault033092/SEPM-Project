const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')

cloudinary.config({
  cloud_name: process.env.MEDIA_CLOUD_NAME,
  api_key: process.env.MEDIA_API_KEY,
  api_secret: process.env.MEDIA_API_SECRET,
})

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'user-images',
  },
})

module.exports = { storage }
