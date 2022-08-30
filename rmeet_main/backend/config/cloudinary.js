const cloudinary = require('cloudinary')
cloudinary.config({
  cloud_name: process.env.MEDIA_CLOUD_NAME,
  api_key: process.env.MEDIA_API_KEY,
  api_secret: process.env.MEDIA_API_SECRET,
})

uploadImage = (path, folder) => {
  return cloudinary.v2
    .uploader(path, {
      folder,
    })
    .then((data) => {
      return { url: data.url, public_id: data.public_id }
    })
    .catch((error) => {
      console.log(error)
    })
}

removeImage = async (public_id) => {
  await cloudinary.v2.uploader.destroy(public_id, function (error, result) {
    console.log(result, error)
  })
}

module.exports = { uploadImage, removeImage }
