// import { useCommentsContext } from '../hooks/useCommentsContext'
// import { useAuthContext } from '../hooks/useAuthContext'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

// for later use : <p>Posted {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })} by @{comment.user_username}</p>
const CommentDetails = ({comment}) => {

    return (
        <div className="comment-details">
            <div className="comment-text">{comment.text}</div>
            <p>Posted {formatDistanceToNow(new Date(comment.createdAt), {addSuffix: true})} by
                @{comment.user_username}</p>
        </div>
    );
}

export default CommentDetails