const router = require('express').Router()
const User = require('../model/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { registerValidation, loginValidation } = require('../validation')

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

  //Save user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  })

  try {
    const savedUser = await user.save()
    res.send({ user: user._id })
  } catch (err) {
    res.status(400).send(err)
  }
})

//Login
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

  //Create token
  const token = jwt.sign({ _id: foundUser._id }, process.env.TOKEN_SECRET)
  res.header('auth-token', token).send(token)

  //
})

module.exports = router
