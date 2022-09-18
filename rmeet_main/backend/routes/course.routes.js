const router = require('express').Router()
const verify = require('./verifyToken')
const Course = require('../model/course.model')
const Review = require('../model/courseReview.model')

// Get all course
router.get('/getCourses', verify, async (req, res) => {
  try {
    const getCourses = await Course.find()
    res.json(getCourses)
  } catch (error) {
    res.json({ message: error })
  }
})

// Get course by id
router.get('/getCourse/:courseId', verify, async (req, res) => {
  try {
    const getCourse = await Course.findOne({ _id: req.body.courseId })
    res.json({
      _id: getCourse._id,
      courseId: getCourse.courseId,
      courseName: getCourse.courseName,
      mode: getCourse.mode,
      type: getCourse.type,
      year: getCourse.year,
      recommendation: getCourse.recommendation,
      lecturerName: getCourse.lecturerName,
    })
  } catch (error) {
    res.json({ message: error })
  }
})

// Create course
router.post('/createCourse', verify, async (req, res) => {
  const newCourse = new Course({
    courseId: req.body.courseId,
    courseName: req.body.courseName,
    mode: req.body.mode,
    type: req.body.type,
    year: req.body.year,
    recommendation: req.body.recommendation,
    lecturerName: req.body.lecturerName,
  })

  try {
    await newCourse.save()
    res.json(newCourse)
  } catch (error) {
    res.status(400).send(error)
  }
})

// Delete course by id
router.delete('/deleteCourse/:courseId', verify, async (req, res) => {
  try {
    const removedCourse = await Course.deleteOne({
      courseId: req.body.courseId,
    })
    res.json('Course delete successfully!')
  } catch (error) {
    res.json({ message: error })
  }
})

// Update course
router.patch('/updateCourse/:courseId', verify, async (req, res) => {
  try {
    const updatedCourse = await Post.updateOne(
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
