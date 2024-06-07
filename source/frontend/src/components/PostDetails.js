import { useState } from 'react';
import CommentForm from './CommentForm';
import CommentDetails from './CommentDetails';
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { usePostsContext } from '../hooks/usePostsContext'
import { useAuthContext } from '../hooks/useAuthContext'

const PostDetails = ({ post }) => {
    const [showCommentForm, setShowCommentForm] = useState(false)
    const { dispatch } = usePostsContext()
    const { user } = useAuthContext()

    const handleCommentButtonClick = () => {
        setShowCommentForm(!showCommentForm);
    }

    const handleClick = async () => {
        if (!user) {
            return
        }

        const response = await fetch('/api/posts/' + post._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_POST', payload: json})
        }
    }

    return (
        <div className="post-details">
            <h4>{post.title}</h4>
            <div className="important">{post.text}</div>
            <p>Posted {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })} by @{post.user_username}</p>
            <button className="comment-button" onClick={handleCommentButtonClick}>
                {showCommentForm ? 'Abbrechen' : 'Kommentieren'}
            </button>
            {showCommentForm && <CommentForm postId={post._id} />}
            <div className="comments">
                {post.comments && post.comments.map(comment => (
                    <CommentDetails comment={comment} key={comment._id} />
                ))}
            </div>

            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
    );
}

export default PostDetails;