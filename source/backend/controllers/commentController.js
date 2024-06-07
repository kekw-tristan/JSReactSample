const Comment = require('../models/commentModel')
const mongoose = require('mongoose')

// get all comments
const getComments = async (req, res) => {
    const comments = await Comment.find({}).sort({createdAt: -1})

    res.status(200).json(comments)
}

// get a single comment
const getComment = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such Comment'})
    }

    const comment = await Comment.findById(id)

    if (!comment) {
        return res.status(404).json({error: 'No such Comment'})
    }

    res.status(200).json(comment)
}

// create a new comment
const createComment = async (req, res) => {
    const {text} = req.body

    let emptyFields = []

    if (!text) {
        emptyFields.push('text')
    }

    if(emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in the field', emptyFields })
    }

    // add to the database
    try {
        const user_id = req.user._id
        const user_username = req.user.username
        const post_id = req.post._id

        // Check if req.user.username exists
        if (!user_username) {
            return res.status(400).json({ error: 'User not found' });
        }

        const comment = await Comment.create({ text, user_id, user_username, post_id })
        res.status(200).json(comment)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// delete a comment
const deleteComment = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'No such Comment'})
    }

    const comment = await Comment.findOneAndDelete({_id: id})

    if(!comment) {
        return res.status(400).json({error: 'No such Comment'})
    }

    res.status(200).json(comment)
}

module.exports = { getComments, getComment, createComment, deleteComment }