const router = require('express').Router()
const verify = require('../routes/verifyToken')
const Profile = require('../model/profile.model')
const User = require('../model/user.model')

// Populate profile into user
// Profile.findOne({_id: })

// Get a user profile by id
router.get('/getProfile/:profileId', verify, async (req, res) => {
  try {
    const getProfile = await Profile.findOne({ _id: req.body.profileId })
    res.json(getProfile)
  } catch (error) {
    res.json({ message: error })
  }
})

// Create a user profile
router.post('/createProfile', verify, async (req, res) => {
  //   const { error } = postValidate(req.body)
  //   if (error) return res.status(400).send(error.details[0].message)

  const newProfile = new Profile({})

  try {
    await newProfile.save()
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
    res.json(updatedPost)
  } catch (error) {
    res.json({ message: error })
  }
})

module.exports = router
