const express = require('express')
const { getGames, getGame, createGame, deleteGame, upvoteGame, downvoteGame } = require('../controllers/gameController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all post routes
router.use(requireAuth)

// GET all games
router.get('/', getGames)

// GET a single game
router.get('/:id', getGame)

// POST a new game
router.post('/', createGame)

// DELETE a game
router.delete('/:id', deleteGame)

// Route für Upvote
router.patch('/:id/upvote', upvoteGame);

// Route für Downvote
router.patch('/:id/downvote', downvoteGame);

module.exports = router