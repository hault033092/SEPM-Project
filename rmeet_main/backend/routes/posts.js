// const router = require('express').Router()
// const verify = require('./verifyToken')

// router.get('/', verify, (req, res) => {
//   res.json({
//     posts: {
//       title: 'my first post',
//       description: 'random data you shouldnt access',
//     },
//   })
// })

//Anh them thu vo thoi may cai CRUD con lai
//add posts
// router.post('/',verify, (req, res) => {
//   res.json()
// })
const findPost = (posts, postId) => new Promise((resolve) => resolve(posts[postId]))
const createPost =  (posts, newPost) => new Promise((resolve) => resolve(posts.push(newPost)))
const amendPost = (existingPost, passedUpdatedPost) => new Promise((resolve) => {
   let updatedPost = Object.assign(existingPost, passedUpdatedPost)
   console.log("updatedPost is", updatedPost)
   return resolve(updatedPost)
  })
const removePost = (posts, postId) => new Promise((resolve) => {
  console.log("removePost called")
   posts.splice(postId, 1)
  return resolve(posts)
})


const posts = {
  getPost(req, res) {
    findPost(req.store.posts, req.params.postId).then((post) => {
      return res.status(200).send(post)})
  },
  getPosts(req, res) {
    res.status(200).send(req.store.posts)
  },
  addPost(req, res) {
    createPost(req.store.posts, req.body).then((length) => {
      return res.status(201).send({postId: length})
    })
  },
  updatePost(req, res) {
    amendPost(req.store.posts[req.params.postId], req.body).then((updatedPost) => {
      return res.status(200).send(updatedPost)
    })
  },
  removePost(req, res) {
    removePost(req.store.posts, req.params.postId).then((_) => res.status(204).send())
  }
}

export default posts 
// module.exports = router
