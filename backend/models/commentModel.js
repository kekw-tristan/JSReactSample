const mongoose = require('mongoose')

const Schema = mongoose.Schema

const commentSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    post_id: {
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

module.exports = mongoose.model('Comment', commentSchema)