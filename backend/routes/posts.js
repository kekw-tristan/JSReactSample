const express = require('express')
const { getPosts, getPost, createPost, deletePost, upvotePost, downvotePost } = require('../controllers/postController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all post routes
router.use(requireAuth)

// GET all posts
router.get('/', getPosts)

// GET a single post
router.get('/:id', getPost)

// POST a new post
router.post('/', createPost)

// DELETE a post
router.delete('/:id', deletePost)

// Route für Upvote
router.patch('/:id/upvote', upvotePost);

// Route für Downvote
router.patch('/:id/downvote', downvotePost);

module.exports = router