const Post = require('../models/postModel')
const mongoose = require('mongoose')
const {request} = require("express")

// get all posts
const getPosts = async (req, res) => {
    const user_id = req.user._id

    const posts = await Post.find({user_id}).sort({createdAt: -1})

    res.status(200).json(posts)
}

// get a single post
const getPost = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such Post'})
    }

    const post = await Post.findById(id)

    if (!post) {
        return res.status(404).json({error: 'No such Post'})
    }

    res.status(200).json(post)
}

// create a new post
const createPost = async (req, res) => {
    const {title, text} = req.body

    let emptyFields = []

    if (!title) {
        emptyFields.push('title')
    }

    if (!text) {
        emptyFields.push('text')
    }

    if(emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
    }

    // add to the database
    try {
        const user_id = req.user._id
        const post = await Post.create({ title, text, user_id })
        res.status(200).json(post)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// delete a post
const deletePost = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'No such Post'})
    }

    const post = await Post.findOneAndDelete({_id: id})

    if(!post) {
        return res.status(400).json({error: 'No such Post'})
    }

    res.status(200).json(post)
}

// update a post
const updatePost = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'No such Post'})
    }

    const post = await Post.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!post) {
        return res.status(400).json({error: 'No such Post'})
    }

    res.status(200).json(post)
}

module.exports = {
    getPosts,
    getPost,
    createPost,
    deletePost,
    updatePost
}