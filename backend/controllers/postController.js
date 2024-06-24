const Post = require('../models/postModel')
const mongoose = require('mongoose')

// get all posts
const getPosts = async (req, res) => {

    const posts = await Post.find({}).sort({createdAt: -1})

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
        const user_username = req.user.username

        // Check if req.user.username exists
        if (!user_username) {
            return res.status(400).json({ error: 'User not found' });
        }

        const post = await Post.create({ title, text, user_id, user_username })
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

// upvote a post
const upvotePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Invalid post ID' });
    }

    try {
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        if (post.likes.indexOf(req.user.username) === -1 && post.dislikes.indexOf(req.user.username) === -1){
            console.log(req.user.username)
            post.likes.push(req.user.username)
        }
        else if (post.likes.indexOf(req.user.username) === -1 && post.dislikes.indexOf(req.user.username) > -1) {
            post.dislikes.splice(post.dislikes.indexOf(req.user.username), 1)
            post.likes.push(req.user.username)
        }
        else if (post.likes.indexOf(req.user.username) > -1 && post.dislikes.indexOf(req.user.username) === -1){
            post.likes.splice(post.likes.indexOf(req.user.username), 1)
        }

        await post.save();

        res.status(200).json(post)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// downvote a post
const downvotePost = async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Invalid post ID'});
    }

    try {
        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({error: 'Post not found'});
        }

        if (post.likes.indexOf(req.user.username) === -1 && post.dislikes.indexOf(req.user.username) === -1){
            console.log(req.user.username)
            post.dislikes.push(req.user.username)
        }
        else if (post.dislikes.indexOf(req.user.username) === -1 && post.likes.indexOf(req.user.username) > -1) {
            post.likes.splice(post.likes.indexOf(req.user.username), 1)
            post.dislikes.push(req.user.username)
        }
        else if (post.dislikes.indexOf(req.user.username) > -1 && post.likes.indexOf(req.user.username) === -1){
            post.dislikes.splice(post.dislikes.indexOf(req.user.username), 1)
        }

        await post.save();

        res.status(200).json(post);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = { getPosts, getPost, createPost, deletePost, upvotePost, downvotePost }