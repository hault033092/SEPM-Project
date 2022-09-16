const router = require('express').Router()
const verify = require('./verifyToken')
const Post = require('../model/post.model')
const User = require('../model/user.model')
// const Profile = require('../model/profile.model')
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

// Get post by id
router.get('/getPost/:postId', verify, async (req, res) => {
  try {
    const getPosts = await Post.findOne({ _id: req.params.postId })
    res.json(getPosts)
  } catch (error) {
    res.json({ message: error })
  }
})

// Get

// Create post
router.post('/createPost', verify, async (req, res) => {
  const { error } = postValidate(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  console.log(verify)

  const newPost = new Post({
    userId: req.user._id,
    // courseId: courseId,
    title: req.body.title,
    content: req.body.content,
    semester: req.body.semester,
    year: req.body.year,
    like: req.body.like,
  })

  //
  try {
    await newPost.save()
    res.send({ newPost: newPost._id })
  } catch (error) {
    res.status(400).send(error)
  }

  // Populate
  Post.findOne({ newPost: newPost._id }).populate('userProfile')
})

// Delete post
router.delete('/deletePost/:postId', verify, async (req, res) => {
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
router.patch('/updatePost/:postId', verify, async (req, res) => {
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
