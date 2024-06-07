import { useCommentsContext } from '../hooks/useCommentsContext'
import { useAuthContext } from '../hooks/useAuthContext'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

    const CommentDetails = ({ comment }) => {
        return (
            <div className="comment-details">
                <p>{comment.text}</p>
                <p>Commented by: {comment.user_username}</p>
            </div>
        );
    }

    export default CommentDetails