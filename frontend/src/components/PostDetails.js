import { useState, useEffect } from 'react';
import CommentForm from './CommentForm';
import CommentDetails from './CommentDetails';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { usePostsContext } from '../hooks/usePostsContext';
import { useAuthContext } from '../hooks/useAuthContext';

const PostDetails = ({ post, comments }) => {
    const [showCommentForm, setShowCommentForm] = useState(false);
    const [upvotes, setUpvotes] = useState(post.upvotes);
    const [downvotes, setDownvotes] = useState(post.downvotes);
    const { dispatch } = usePostsContext();
    const { user } = useAuthContext();

    useEffect(() => {
        setUpvotes(post.upvotes);
        setDownvotes(post.downvotes);
    }, [post]);

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
            setUpvotes(upvotes + 1);
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

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const json = await response.json();
            dispatch({ type: 'UPDATE_POST', payload: json });
            setDownvotes(downvotes + 1);
        } catch (error) {
            console.error('Failed to downvote the post:', error);
        }
    };

    const handleClick = async () => {
        if (!user) {
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
        }
    };

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
                <span className="material-symbols-outlined" onClick={handleUpvote}>arrow_upward</span>
                <span>{upvotes}</span>
                <span className="material-symbols-outlined" onClick={handleDownvote}>arrow_downward</span>
                <span>{downvotes}</span>
                <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
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
                    <p>Keine Kommentare verfügbar.</p>
                )}
            </div>
        </div>
    );
};

export default PostDetails;
