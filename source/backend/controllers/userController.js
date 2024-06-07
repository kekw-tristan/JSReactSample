const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

// get all users
const getUsers = async (req, res) => {

    const users = await User.find({}).sort({createdAt: -1})

    res.status(200).json(users)
}

// get a single user
const getUser = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such User'})
    }

    const user = await User.findById(id)

    if (!user) {
        return res.status(404).json({error: 'No such User'})
    }

    res.status(200).json(user)
}

// login a user
const loginUser = async (req, res) => {
    const {username, email, password} = req.body

    try {
        const user = await User.login(username, email, password)

        // create a token
        const token = createToken(user._id)

        res.status(200).json({username, email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// signup a user
const signupUser = async (req, res) => {
    const {username, email, password} = req.body

    try {
        const user = await User.signup(username, email, password)

        // create a token
        const token = createToken(user._id)

        res.status(200).json({username, email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = { getUsers, getUser, signupUser, loginUser }