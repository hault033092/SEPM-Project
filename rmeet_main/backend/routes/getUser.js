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

//Specific user by ID
router.get('/:userID', async (req, res) => {
  try {
    const user = await User.findById(req.params.userID)
    res.json(user);
  } catch (error) {
    res.json({ message: error })
  }

});

//Get users using their name, applicable to hashtags and other keywords for other models
router.get('/getUser', (req, res) => {
  const { term } = req.query;

  User.findAll({ where: { name: { [Op.like]: '%' + term + '%' } } })
    .then(User => res.render('users', { names }))
    .catch(err => console.log(err))
})

module.exports = router
