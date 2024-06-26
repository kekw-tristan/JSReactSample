const UserStatsDetails = ({ userStat }) => {
    return (

        <div className="userStats-details">
            <h4>User: {userStat.username}</h4>
            <div className="important">Aktivster User: {userStat.mostActiveUser}</div>
            <div className="important">Likes on Posts: {userStat.likedPostsCount}</div>
            <div className="important">Dislikes on Posts: {userStat.dislikedPostsCount}</div>
            <div className="important">Comments Written: {userStat.commentCount}</div>
            <div className="important">Posts Written: {userStat.postCount}</div>
            <div className="important">Games Liked: {userStat.likedGamesCount}</div>
            <div className="important">Games Disliked: {userStat.dislikedGamesCount}</div>
        </div>
    )
}

export default UserStatsDetails;
