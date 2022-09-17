const router = require('express').Router()
const verify = require('./verifyToken')
const User = require('../model/user.model')
const upload = require('../config/upload')
const ProfileImg = require('../model/profileImg.model')

// Populate profile into user
// User.findOne({ _id: User._id })
//   .populate('userProfile')
//   .then((user) => console.log(user))

// Get a user profile by id
// router.get('/getProfile/:profileId', verify, async (req, res) => {
//   try {
//     const gotProfile = await Profile.findOne({ _id: req.params.profileId })
//     res.json(gotProfile)
//   } catch (error) {
//     res.json({ message: error })
//   }
// })

// Get a user profile by user id
// router.get('/getProfileByUser/:userId', verify, async (req, res) => {
//   try {
//     const gotProfile = await Profile.findOne({ user: req.params.userId })
//     res.json(gotProfile)
//   } catch (error) {
//     res.json({ message: error })
//   }
// })

// Upload profile image to cloudinary
router.post('/uploadImage', upload.single('image'), async (req, res) => {
  const newProfileImg = new ProfileImg({
    profileImgUrl: req.file.path,
  })

  try {
    await newProfileImg.save()
    res.send({ profileImgUrl: req.file.path })
  } catch (error) {
    res.status(400).send(error)
  }
})

// Update profile picture
router.patch(
  '/updateImage',
  verify,
  upload.single('image'),
  async (req, res) => {
    try {
      await ProfileImg.updateOne(
        {
          _id: req.params._id,
        },
        {
          $set: {
            profileImgUrl: req.file.path,
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
// router.post('/createProfile', verify, async (req, res) => {
//   //   const { error } = postValidate(req.body)
//   //   if (error) return res.status(400).send(error.details[0].message)

//   const newProfile = new Profile({
//     user: req.user,
//     userProfilePic: req.userProfilePic,
//     userName: req.body.userName,
//     gender: req.body.gender,
//     bio: req.body.bio,
//   })

//   try {
//     await newProfile.save().then((result) => {
//       Profile.populate(newProfile, { path: 'user' }).then((p) =>
//         res.json({ message: 'Profile created!', p })
//       )
//     })
//     // res.send({ user: User._id })
//   } catch (error) {
//     res.status(400).send(error)
//   }
// })

// Update a profile
// router.patch('/:profileId', verify, async (req, res) => {
//   try {
//     const updatedProfile = await Profile.updateOne(
//       {
//         _id: req.params.profileId,
//       },
//       {
//         $set: {},
//       }
//     )
//     res.json(updatedProfile)
//   } catch (error) {
//     res.json({ message: error })
//   }
// })

module.exports = router
