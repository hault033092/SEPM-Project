const express = require('express')
const PORT = 8080
const app = express()
const mongoose = require('mongoose')
// const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv/config')

//Import route
const authRoute = require('./routes/users.routes')
const postRoute = require('./routes/posts.routes')
const courseRoute = require('./routes/course.routes')
const profileRoute = require('./routes/profile.routes')

//Middlewares
app.use(cors())
app.use(express.json())
app.use('/api/user', authRoute)
app.use('/api/posts', postRoute)
app.use('/api/course', courseRoute)
app.use('/api/user/profile', profileRoute)

//Connect to db
mongoose.connect(process.env.DB_CONNECTION, () => console.log('DB connected!'))
//Listen to port
app.listen(`${PORT}`, () => console.log('It is working!'))

//

// const getUsers = require('./routes/getUser')
// const deleteUser = require('./routes/deleteUser')
// const updateUser = require('./routes/updateUser')
// app.use('/api/user', getUsers)
// app.use('/api/user', deleteUser)
// app.use('/api/user', updateUser)
