const router = require('express').Router()
const verify = require('./verifyToken')
const Post = require('../model/post.model')
const Profile = require('../model/profile.model')
const { postValidate } = require('../validation')

// Populate Post schema with User Schema

// Get all post
router.get('/getPosts', verify, async (req, res) => {
  try {
    const getPosts = await Post.find()
    res.json(getPosts)
  } catch (err) {
    res.json({ message: err })
  }
})

// Get post by id
router.get('/getPost/:postId', verify, async (req, res) => {
  try {
    const getPosts = await Post.findOne({ _id: req.body.postId })
    res.json(getPosts)
  } catch (error) {
    res.json({ message: error })
  }
})

// Create post
router.post('/createPost', verify, async (req, res) => {
  const { error } = postValidate(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  // Populate
  Profile.findOne({ _id: req.user._id })
    .populate('posts')
    .then((user) => res.json(user))

  const newPost = new Post({
    user: req.user._id,
    // courseId: courseId,
    title: req.body.title,
    content: req.body.content,
    semester: req.body.semester,
    year: req.body.year,
    // like: req.body.like,
  })

  //
  try {
    await newPost.save()
    res.send({ newPost: newPost._id })
  } catch (error) {
    res.status(400).send(error)
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
