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
        type: Number,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Post', postSchema)