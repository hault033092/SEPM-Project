const router = require('express').Router()
const verify = require('../routes/verifyToken')
const Profile = require('../model/profile.model')
const User = require('../model/user.model')
const upload = require('../config/upload')
const ProfilePic = require('../model/profilePic.model')

// // Populate profile into user
// User.findOne({ _id: User._id })
//   .populate('userProfile')
//   .then((user) => console.log(user))

// Get a user profile by id
router.get('/getProfile/:profileId', verify, async (req, res) => {
  try {
    const getProfile = await Profile.findOne({ _id: req.body.profileId })
    res.json(getProfile)
  } catch (error) {
    res.json({ message: error })
  }
})

// Upload profile image to cloudinary
router.post(
  '/uploadPicture',
  verify,
  upload.single('picture'),
  async (req, res) => {
    const newProfilePic = new ProfilePic({
      profilePicUrl: req.file.path,
    })

    try {
      await newProfilePic.save()
      res.send(req.file.path)
    } catch (error) {
      res.status(400).send(error)
    }
  }
)

// Update profile picture
router.patch(
  'updatePicture',
  verify,
  upload.single('picture'),
  async (req, res) => {
    try {
      await ProfilePic.updateOne(
        {
          _id: req.params._id,
        },
        {
          $set: {
            profilePicUrl: req.file.path,
          },
        }
      )
      res.send(req.file.path)
    } catch (error) {
      res.json({ message: error })
    }
  }
)

// Create a user profile
router.post('/createProfile', verify, async (req, res) => {
  //   const { error } = postValidate(req.body)
  //   if (error) return res.status(400).send(error.details[0].message)

  const newProfile = new Profile({
    user: req.user,
    userProfilePic: req.profile,
    userName: req.body.userName,
    gender: req.body.gender,
    bio: req.body.bio,
  })

  try {
    await newProfile.save().then((result) => {
      Profile.populate(newProfile, { path: 'user' })
    })
    res.send({ user: User._id })
  } catch (error) {
    res.status(400).send(error)
  }
})

// Update a profile
router.patch('/:profileId', verify, async (req, res) => {
  try {
    const updatedProfile = await Profile.updateOne(
      {
        _id: req.params.profileId,
      },
      {
        $set: {},
      }
    )
    res.json(updatedProfile)
  } catch (error) {
    res.json({ message: error })
  }
})

module.exports = router
