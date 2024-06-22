import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { useCommentsContext } from "../hooks/useCommentsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const CommentDetails = ({ comment }) => {
    const { dispatch } = useCommentsContext();
    const { user } = useAuthContext();

    const handleClick = async () => {
        if (!user) {
            return;
        }

        try {
            if (comment.user_username !== user.username) {
                console.error('Nur der Autor kann den Kommentar löschen.');
                return;
            }

            const response = await fetch(`/api/comments/${comment._id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // const json = await response.json();
            dispatch({ type: 'DELETE_COMMENT', payload: { _id: comment._id } });

        } catch (error) {
            console.error('Fehler beim Löschen des Kommentars:', error);
        }
    }

    return (
        <div className="comment-details">
            <div className="comment-content">
                <div className="comment-text">{comment.text}</div>
                <p>Posted {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })} by @{comment.user_username}</p>
            </div>
            {user.username === comment.user_username && (
                <span className="material-symbols-outlined delete-icon" onClick={handleClick}>delete</span>
            )}
        </div>
    );
}

export default CommentDetails;
