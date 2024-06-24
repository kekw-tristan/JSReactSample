import { useState } from 'react';
import CommentForm from './CommentForm';
import CommentDetails from './CommentDetails';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { usePostsContext } from '../hooks/usePostsContext';
import { useAuthContext } from '../hooks/useAuthContext';

const PostDetails = ({ post, comments }) => {
    const [showCommentForm, setShowCommentForm] = useState(false);
    const { dispatch } = usePostsContext();
    const { user } = useAuthContext();

    let likes = post.likes.length - post.dislikes.length
    let colorLike
    let colorDislike

    if(post.likes.indexOf(user.username) === -1)
        colorLike = "#f1f1f1"
    else
        colorLike = "#618264"

    if(post.dislikes.indexOf(user.username) === -1)
        colorDislike = "#f1f1f1"
    else
        colorDislike = "#618264"

    const handleUpvote = async () => {
        if (!user) {
            return;
        }

        try {
            const response = await fetch(`/api/posts/${post._id}/upvote`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });

            const json = await response.json();
            dispatch({ type: 'UPDATE_POST', payload: json });
            likes = post.likes.length - post.dislikes.length
            console.log(user)
            if(post.dislikes.indexOf(user.username) === -1)
                colorDislike = "#f1f1f1"
            else
                colorDislike = "#618264"



        } catch (error) {
            console.error('Failed to upvote the post:', error);
        }
    };

    const handleDownvote = async () => {
        if (!user) {
            return;
        }

        try {
            const response = await fetch(`/api/posts/${post._id}/downvote`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });

            const json = await response.json();
            dispatch({ type: 'UPDATE_POST', payload: json });
            likes = post.likes.length - post.dislikes.length

        } catch (error) {
            console.error('Failed to downvote the post:', error);
        }
    };

    const handleClick = async () => {
        if (!user) {
            return;
        }

        try {
            // Überprüfen, ob der Benutzer der Autor des Posts ist
            if (post.user_username !== user.username) {
                console.error('Nur der Autor kann den Post löschen.');
                return;
            }

            const response = await fetch(`/api/posts/${post._id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });

            const json = await response.json();

            if (response.ok) {
                dispatch({ type: 'DELETE_POST', payload: json });
            } else {
                console.error('Fehler beim Löschen des Posts:', json.error);
            }
        } catch (error) {
            console.error('Fehler beim Löschen des Posts:', error);
        }
    }

    const handleCommentButtonClick = () => {
        setShowCommentForm(!showCommentForm);
    };

    // Filtern der Kommentare, die zur aktuellen Post-ID gehören
    const filteredComments = comments ? comments.filter(comment => comment.post_id === post._id) : [];

    return (
        <div className="post-details">
            <h4>{post.title}</h4>
            <div className="important">{post.text}</div>
            <p>Posted {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })} by @{post.user_username}</p>
            <div className="action-icons">
                <span style={{backgroundColor:colorLike}} className="material-symbols-outlined" onClick={handleUpvote}>arrow_upward</span>
                <span>{likes}</span>
                <span style={{backgroundColor:colorDislike}} className="material-symbols-outlined" onClick={handleDownvote}>arrow_downward</span>
                {post.user_username === user.username && (
                    <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
                )}
            </div>
            <button className="comment-button" onClick={handleCommentButtonClick}>
                {showCommentForm ? 'Abbrechen' : 'Kommentieren'}
            </button>
            {post._id && showCommentForm && <CommentForm post_id={post._id.toString()} />}
            <div className="comments">
                {filteredComments.length > 0 ? (
                    filteredComments.map(comment => (
                        <CommentDetails key={comment._id} comment={comment} />
                    ))
                ) : (
                    <p></p>
                )}
            </div>
        </div>
    );
};

export default PostDetails;
