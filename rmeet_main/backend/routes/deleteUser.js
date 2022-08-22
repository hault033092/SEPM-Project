const router = require('express').Router()
const User = require('../model/User')

//Delete specific users (all if necessary) by ID
router.delete('/:userId', async (req, res) => {
  try {
    const removedUser = await User.remove({ _id: req.params.userId }) //Mongo generates id by this format
    res.json(removedUser)
  } catch (error) {
    res.json({ message: error })
  }
})

module.exports = router
