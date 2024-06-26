import { useUserStatsContext } from '../hooks/useUserStatsContext'
import { useAuthContext } from '../hooks/useAuthContext'

const UserStatsDetails = ({ userStat }) => {
    const { dispatch } = useUserStatsContext()
    const { user } = useAuthContext()

    return (
        <div className="userStats-details">
            <h4>{userStat.user_id}</h4>
            <div className="important">{userStat.likesOnPosts}</div>
            <div className="important">{userStat.dislikesOnPosts}</div>
            <div className="important">{userStat.commentsWritten}</div>
            <div className="important">{userStat.postsWritten}</div>
            <div className="important">{userStat.gamesLiked}</div>
            <div className="important">{userStat.gamesDisliked}</div>
        </div>
    )
}

export default UserStatsDetails