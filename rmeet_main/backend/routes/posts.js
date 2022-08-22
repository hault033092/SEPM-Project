const router = require('express').Router()
const verify = require('./verifyToken')
const Post = require('../model/Post')
const { postValidate } = require('../validation')

// Get all post
router.get('/getPosts', verify, async (req, res) => {
  try {
    const getPosts = await Post.find()
    res.json(getPosts)
  } catch (err) {
    res.json({ message: err })
  }
})

// Create post
router.post('/createPost', verify, async (req, res) => {
  const { error } = postValidate(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const post = new Post({
    userId: req.userId,
    // courseId: req.courseId,
    title: req.body.title,
    content: req.body.content,
    semester: req.body.semester,
    year: req.body.year,
    // like: req.bodyyear,
  })

  try {
    const savePost = await post.save()
    res.send({ post: post.id })
  } catch (err) {
    res.status(400).send(err)
  }
})

// Delete post
router.delete('/:postId', verify, async (req, res) => {
  try {
    const removedPost = await Post.deleteOne({
      _id: req.params.postId,
    })
    res.json(removedPost)
  } catch (error) {
    res.json({ message: error })
  }
})

// Update post
router.patch('/:postId', verify, async (req, res) => {
  try {
    const updatedPost = await Post.updateOne(
      {
        _id: req.params.postId,
      },
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
          semester: req.body.semester,
          year: req.body.year,
        },
      }
    )
    res.json(updatedPost)
  } catch (error) {
    res.json({ message: error })
  }
})

module.exports = router
