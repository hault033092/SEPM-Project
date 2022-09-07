const { storage } = require('./storage')
const multer = require('multer')

const upload = multer({ storage: storage })

module.exports = upload
