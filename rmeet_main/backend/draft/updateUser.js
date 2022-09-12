// const router = require('express').Router()
// const User = require('../model/User')

// //Find user by ID and update said user's attributes
// router.patch('/:userID', async (req,res) => {
//     try {
//         const userID = req.params.userID
//         const updatedData = req.body
//         const options = {new: true}
//         const updatedUser = await User.findByIdAndUpdate(userID, updatedData, options)
//         res.json(updatedUser)
//     } catch (error) {
//         res.json({message: error})
//     }
// })

// module.exports = router;
