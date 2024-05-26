const User = require('../models/userModel')
const mongoose = require('mongoose')

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

// create a new user
const createUser = async (req, res) => {
    const {username, email, password} = req.body

    let emptyFields = []

    if (!username) {
        emptyFields.push('username')
    }

    if (!email) {
        emptyFields.push('email')
    }

    if (!password) {
        emptyFields.push('password')
    }

    if(emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
    }

    // add to the database
    try {
        const user = await User.create({ username, email, password })
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// delete a user
const deleteUser = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'No such User'})
    }

    const user = await User.findOneAndDelete({_id: id})

    if(!user) {
        return res.status(400).json({error: 'No such User'})
    }

    res.status(200).json(user)
}

// update a user
const updateUser = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'No such User'})
    }

    const user = await User.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!user) {
        return res.status(400).json({error: 'No such User'})
    }

    res.status(200).json(user)
}

module.exports = {
    getUsers,
    getUser,
    createUser,
    deleteUser,
    updateUser
}