const Post = require('../models/postModel');
const Comment = require('../models/commentModel');
const Game = require('../models/gameModel');
const User = require('../models/userModel');

// Get user statistics
const getUserStats = async (req, res) => {
    try {
        const users = await User.find({});

        let userStats = [];

        for (const user of users) {
            const userId = user._id;
            const username = user.username;

            // Number of posts
            const postCount = await Post.countDocuments({ user_id: userId });

            // Number of comments
            const commentCount = await Comment.countDocuments({ user_id: userId });

            // Number of likes on posts
            const likedPostsCount = await Post.countDocuments({ likes: username });

            // Number of dislikes on posts
            const dislikedPostsCount = await Post.countDocuments({ dislikes: username });

            // Number of liked games
            const likedGamesCount = await Game.countDocuments({ likes: username });

            // Number of disliked games
            const dislikedGamesCount = await Game.countDocuments({ dislikes: username });

            userStats.push({
                userId,
                username,
                postCount,
                commentCount,
                likedPostsCount,
                dislikedPostsCount,
                likedGamesCount,
                dislikedGamesCount
            });
        }

        // Determine the most active user
        let mostActiveUser = null;
        let maxActivityScore = 0;

        userStats.forEach(user => {
            const activityScore = user.postCount + user.commentCount + user.likedPostsCount + user.dislikedPostsCount + user.likedGamesCount + user.dislikedGamesCount;
            if (activityScore > maxActivityScore) {
                maxActivityScore = activityScore;
                mostActiveUser = user;
            }
        });

        res.status(200).json({ userStats, mostActiveUser });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { getUserStats };
