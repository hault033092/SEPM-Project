const express = require('express')
const PORT = 8080
const app = express()
const mongoose = require('mongoose')
// const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv/config')

//Import route
const authRoute = require('./routes/register')
const getUsers = require('./routes/getUser')

const deleteUser = require('./routes/deleteUser')
const updateUser = require('./routes/updateUser')

const postRoute = require('./routes/posts')


//Middlewares
app.use(cors())
app.use(express.json())
app.use('/api/user', authRoute)
app.use('/api/user', getUsers)

app.use('/api/user', deleteUser)
app.use('/api/user', updateUser)

app.use('/api/posts', postRoute)

//

//

//Connect to db
mongoose.connect(process.env.DB_CONNECTION)

//Listen to port
app.listen(`${PORT}`, () => console.log('It is working!'))
