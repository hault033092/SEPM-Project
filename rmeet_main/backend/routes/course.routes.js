const router = require('express').Router()
import verify from './verifyToken'
import Course, { find, deleteOne } from '../model/course.model'
import { postValidate } from '../validation'

// Get all course
router.get('/getCourses', verify, async (req, res) => {
  try {
    const getCourses = await find()
    res.json(getCourses)
  } catch (error) {
    res.json({ message: error })
  }
})

// Get course by id
router.get('/getCourse/:courseId', verify, async (req, res) => {
  try {
    const getPosts = await Post.findOne({ _id: req.body.courseId })
    res.json(getPosts)
  } catch (error) {
    res.json({ message: error })
  }
})

// Create course
router.post('/createCourse', verify, async (req, res) => {
  //   const { error } = postValidate(req.body)
  //   if (error) return res.status(400).send(error.details[0].message)

  const course = new Course({
    courseId: req.body.courseId,
    courseName: req.body.courseName,
  })

  try {
    const savePost = await course.save()
    res.send('Course created successfully!')
  } catch (error) {
    res.status(400).send(error)
  }
})

// Delete course by id
router.delete('/deleteCourse/:courseId', verify, async (req, res) => {
  try {
    const removedCourse = await deleteOne({
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
    const updatedPost = await Post.updateOne(
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

export default router
