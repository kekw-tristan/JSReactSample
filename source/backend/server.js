require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const gameRoutes = require('./routes/games')
const postRoutes = require('./routes/posts')
const userRoutes = require('./routes/users')

// express app
const app = express()

// middleware
app.use(express.json())
app.use ((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/games', gameRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/users', userRoutes)

// connect to database
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('connected to database')
        // listen to port
        app.listen(process.env.PORT, () => {
            console.log('listening for requests on port', process.env.PORT)
        })
    })
    .catch((err) => {
        console.log(err)
    })