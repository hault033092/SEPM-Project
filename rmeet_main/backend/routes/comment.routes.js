const router = require('express').Router()
const verify = require('./verifyToken')
const Comment = require('../model/comment.model')

// Get all comments
router.get('/getComments', verify, async (req, res) => {
  try {
    const gotComments = await Comment.find()
    res.json(gotComments)
  } catch (err) {
    res.json({ message: err })
  }
})

// Get comment by id
router.get('/getComment/:commentId', verify, async (req, res) => {
  try {
    const gotComments = await Comment.findOne({ _id: req.params.commentId })
    res.json(gotComments)
  } catch (error) {
    res.json({ message: error })
  }
})

// Create comment
router.post('/createComment', verify, async (req, res) => {
  const newComment = new Comment({
    userId: req.user._id,
    content: req.body.content,
  })

  //
  try {
    await newComment.save()
    res.send({ newComment: newComment._id })
  } catch (error) {
    res.status(400).send(error)
  }
})

// Delete comment
router.delete('/deleteComment/:commentId', verify, async (req, res) => {
  try {
    const removedComment = await Comment.deleteOne({
      _id: req.params.commentId,
    })
    res.send('Comment Removed!')
  } catch (error) {
    res.json({ message: error })
  }
})

// Update comment
router.patch('/updateComment/:commentId', verify, async (req, res) => {
  try {
    const updatedComment = await Comment.updateOne(
      {
        _id: req.params.commentId,
      },
      {
        $set: {
          content: req.body.content,
        },
      }
    )
    res.send('Comment Updated!')
  } catch (error) {
    res.json({ message: error })
  }
})

module.exports = router
