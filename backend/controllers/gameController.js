const Game = require('../models/gameModel')
const mongoose = require('mongoose')

// get all games
const getGames = async (req, res) => {
    const games = await Game.find({}).sort({createdAt: -1})

    res.status(200).json(games)
}

// get a single game
const getGame = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such Game'})
    }

    const game = await Game.findById(id)

    if (!game) {
        return res.status(404).json({error: 'No such Game'})
    }

    res.status(200).json(game)
}

// create a new game
const createGame = async (req, res) => {
    const {title, description, releaseDate, developer, genre} = req.body

    let emptyFields = []

    if (!title) {
        emptyFields.push('title')
    }

    if (!description) {
        emptyFields.push('description')
    }

    if (!releaseDate) {
        emptyFields.push('releaseDate')
    }

    if (!developer) {
        emptyFields.push('developer')
    }

    if (!genre) {
        emptyFields.push('genre')
    }

    if(emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
    }

    // add to the database
    try {
        const game = await Game.create({ title, description, releaseDate, developer, genre })
        res.status(200).json(game)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// delete a game
const deleteGame = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'No such Game'})
    }

    const game = await Game.findOneAndDelete({_id: id})

    if(!game) {
        return res.status(400).json({error: 'No such Game'})
    }

    res.status(200).json(game)
}

// upvote a game
const upvoteGame = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Invalid game ID' });
    }

    try {
        const game = await Game.findById(id);
        if (!game) {
            return res.status(404).json({ error: 'Game not found' });
        }

        if (game.likes.indexOf(req.user.username) === -1 && game.dislikes.indexOf(req.user.username) === -1){
            console.log(req.user.username)
            game.likes.push(req.user.username)
        }
        else if (game.likes.indexOf(req.user.username) === -1 && game.dislikes.indexOf(req.user.username) > -1) {
            game.dislikes.splice(game.dislikes.indexOf(req.user.username), 1)
            game.likes.push(req.user.username)
        }
        else if (game.likes.indexOf(req.user.username) > -1 && game.dislikes.indexOf(req.user.username) === -1){
            game.likes.splice(game.likes.indexOf(req.user.username), 1)
        }

        await game.save();

        res.status(200).json(game)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// downvote a game
const downvoteGame = async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Invalid game ID'});
    }

    try {
        const game = await Game.findById(id);

        if (!game) {
            return res.status(404).json({error: 'Game not found'});
        }

        if (game.likes.indexOf(req.user.username) === -1 && game.dislikes.indexOf(req.user.username) === -1) {
            console.log(req.user.username)
            game.dislikes.push(req.user.username)
        } else if (game.dislikes.indexOf(req.user.username) === -1 && game.likes.indexOf(req.user.username) > -1) {
            game.likes.splice(game.likes.indexOf(req.user.username), 1)
            game.dislikes.push(req.user.username)
        } else if (game.dislikes.indexOf(req.user.username) > -1 && game.likes.indexOf(req.user.username) === -1) {
            game.dislikes.splice(game.dislikes.indexOf(req.user.username), 1)
        }

        await game.save();

        res.status(200).json(game);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = { getGames, getGame, createGame, deleteGame, upvoteGame, downvoteGame }