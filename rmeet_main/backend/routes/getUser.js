const router = require('express').Router()
const User = require('../model/User')

router.get('/getUser', async (req, res) => {
  try {
    const gotUsers = await User.find()
    res.json(gotUsers)
  } catch (error) {
    res.json({ message: error })
  }
})

module.exports = router
