const mongoose = require('mongoose')

const Schema = mongoose.Schema

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    user_username: {
        type: String,
        required: false
    }
}, { timestamps: true })

module.exports = mongoose.model('Post', postSchema)