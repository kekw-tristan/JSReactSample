require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const postRoutes = require('./routes/posts')
const userRoutes = require('./routes/user')
const gameRoutes = require('./routes/games')
const commentRoutes = require('./routes/comments')
const userStatsRoutes = require('./routes/userStats');

// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/posts', postRoutes)
app.use('/api/user', userRoutes)
app.use('/api/games', gameRoutes)
app.use('/api/comments', commentRoutes)
app.use('/api/userStats', userStatsRoutes)


// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('connected to database')
        // listen to port
        app.listen(process.env.PORT, () => {
            console.log('listening for requests on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })