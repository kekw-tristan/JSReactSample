const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userStatsSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    likesOnPosts: {
        type: Number,
        default: 0
    },
    dislikesOnPosts: {
        type: Number,
        default: 0
    },
    commentsWritten: {
        type: Number,
        default: 0
    },
    postsWritten: {
        type: Number,
        default: 0
    },
    gamesLiked: {
        type: Number,
        default: 0
    },
    gamesDisliked: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('UserStats', userStatsSchema);
