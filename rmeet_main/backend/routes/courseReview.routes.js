const router = require('express').Router()
const verify = require('./verifyToken')
const Course = require('../model/course.model')
const Review = require('../model/courseReview.model')

// Get all course
router.get('/getReviews', verify, async (req, res) => {
  try {
    const gotReviews = await Course.find()
    res.json(gotReviews)
  } catch (error) {
    res.json({ message: error })
  }
})

// Get course by id
router.get('/getReview/:reviewId', verify, async (req, res) => {
  try {
    const gotReview = await Post.findOne({ _id: req.body.reviewId })
    res.json(gotReview)
  } catch (error) {
    res.json({ message: error })
  }
})

// assignments: [
// {
//   type: req.body.type,
//   quantity: req.body.quantity,
// },
// ],

// Create review
router.post('/createReview/:courseId', verify, async (req, res) => {
  const foundCourse = await Course.findOne({ _id: req.params.courseId })

  const newReview = new Review({
    userId: req.user._id,
    userName: req.user.name,
    userImgUrl: req.user.profileImg,
    courseId: req.params.courseId,
    content: req.body.content,
    rating: req.body.rating,
  })

  try {
    await newReview.save()
    foundCourse.reviews.push(newReview)
    res.send('Review created successfully!')
  } catch (error) {
    res.status(400).send(error)
  }
})

// Delete course by id
router.delete('/deleteReview/:reviewId', verify, async (req, res) => {
  try {
    await Course.deleteOne({
      courseId: req.body.courseId,
    })
    res.send('Course delete successfully!')
  } catch (error) {
    res.json({ message: error })
  }
})

// Update course
router.patch('/updateCourse/:courseId', verify, async (req, res) => {
  try {
    await Post.updateOne(
      {
        courseId: req.params.courseId,
      },
      {
        $set: {
          courseId: req.body.courseId,
        },
      }
    )
    res.json('Course updated successfully!')
  } catch (error) {
    res.json({ message: error })
  }
})

module.exports = router
