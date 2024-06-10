const express = require('express')

// controller functions
const { loginUser, signupUser, getUser, getUsers, deleteUser } = require('../controllers/userController')

const router = express.Router()

// GET all users
router.get('/', getUsers)

// GET a single user
router.get('/:id', getUser)

// DELETE a user
router.delete('/:id', deleteUser)

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)

module.exports = router
