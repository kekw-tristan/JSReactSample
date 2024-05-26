const express = require('express')
const {
    getUsers,
    getUser,
    createUser,
    deleteUser,
    updateUser
} = require('../controllers/userController')

const router = express.Router()

// GET all users
router.get('/', getUsers)

// GET a single user
router.get('/:id', getUser)

// POST a new user
router.post('/', createUser)

// DELETE a user
router.delete('/:id', deleteUser)

// UPDATE a user
router.patch('/:id', updateUser)

module.exports = router

// {
//     "user_id": "123",
//     "username": "example_user",
//     "total_posts": 50,
//     "total_comments": 100,
//     "total_likes_received": 200,
//     "total_games_played": 10,
//     "total_time_in_forum": "50 hours",
//     "activity_by_date": {
//     "2024-01-01": {
//         "posts": 2,
//             "comments": 5,
//             "likes_received": 10
//     },
//
// }