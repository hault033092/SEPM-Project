const User = require('../model/user.model')
const Profile = require('../model/profile.model')

Profile.find()
  .populate('user')
  .then((p) => console.log(p))
  .catch((error) => console.log(error))
