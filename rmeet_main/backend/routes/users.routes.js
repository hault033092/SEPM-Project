const router = require('express').Router()
const User = require('../model/user.model')
const Post = require('../model/post.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const verify = require('./verifyToken')
const upload = require('../config/upload')
const { registerValidation, loginValidation } = require('../validation')

// Create a user with validation
router.post('/register', async (req, res) => {
  //Validate
  const { error } = registerValidation(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  //Validate email
  const emailExist = await User.findOne({ email: req.body.email })
  if (emailExist) return res.status(400).send('Email exist!')

  //Validate password
  const passwordExist = await User.findOne({ password: req.body.password })
  if (passwordExist) return res.status(400).send('Password exist!')

  //Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(req.body.password, salt)

  const user = new User({
    email: req.body.email,
    password: hashedPassword,
    userName: req.body.userName,
    gender: req.body.gender,
    bio: req.body.bio,
    major: req.body.major,
    profileImg: req.body.profileImg,
  })

  try {
    await user.save()
    res.send({ user: user._id })
  } catch (err) {
    res.status(400).send(err)
  }
})

//User login
router.post('/login', async (req, res) => {
  //
  const { error } = loginValidation(req.body)
  if (error) return res.status(400).send(error.details[0].message)
  //
  const foundUser = await User.findOne({ email: req.body.email })
  if (!foundUser) return res.status(400).send('Incorrect email!')
  //
  const validPassword = await bcrypt.compare(
    req.body.password,
    foundUser.password
  )
  if (!validPassword) return res.status(400).send('Invalid password!')

  // Create token
  const token = jwt.sign(
    {
      _id: foundUser._id,
      userName: foundUser.userName,
      userImgUrl: foundUser.profileImg,
    },
    process.env.TOKEN_SECRET
  )
  res.header('auth-token', token).send(token)
})

// Get all users
router.get('/getUsers', async (req, res) => {
  try {
    const gotUsers = await User.find()
    res.json(gotUsers)
  } catch (error) {
    res.json({ message: error })
  }
})

// Get user by a specific ID
router.get('/:userId', verify, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
    res.json(user)
  } catch (error) {
    res.json({ message: error })
  }
})

// Get posts of a user
router.get('/getUserWithPosts/:userId', verify, async (req, res) => {
  const foundPosts = await Post.find({ userId: req.params.userId })
  try {
    const foundUser = await User.findOne({ _id: req.params.userId })
    res.json({
      userId: foundUser._id,
      userName: foundUser.userName,
      userPosts: foundPosts,
    })
  } catch (error) {
    res.json({ message: error })
  }
})

// Delete specific users (all if necessary) by ID
router.delete('/:userId', verify, async (req, res) => {
  try {
    const removedUser = await User.remove({ _id: req.params.userId }) //Mongo generates id by this format
    res.json('User removed!')
  } catch (error) {
    res.json({ message: error })
  }
})

// Find user by ID and update said user's attributes
router.put('/updateProfile/:userId', verify, async (req, res) => {
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(req.body.password, salt)

  try {
    const updatedUser = await User.updateOne(
      {
        _id: req.params.userId,
      },
      {
        $set: {
          email: req.body.email,
          password: hashedPassword,
          userName: req.body.userName,
          gender: req.body.gender,
          bio: req.body.bio,
          major: req.body.major,
        },
      }
    )
    res.json(updatedUser)
  } catch (error) {
    res.json({ message: error })
  }
})

module.exports = router
