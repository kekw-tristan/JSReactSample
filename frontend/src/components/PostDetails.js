import { useState } from 'react'
import CommentForm from './CommentForm'
import CommentDetails from './CommentDetails'
import formatDistanceToNow from "date-fns/formatDistanceToNow"
import { usePostsContext } from '../hooks/usePostsContext'
import { useAuthContext } from '../hooks/useAuthContext'


const PostDetails = ({ post }) => {
    const [showCommentForm, setShowCommentForm] = useState(false)
    const { dispatch } = usePostsContext()
    const { user } = useAuthContext()

    const handleCommentButtonClick = () => {
        setShowCommentForm(!showCommentForm)
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
        const json = await response.json();

        if (response.ok) {
            dispatch({type: 'DELETE_POST', payload: json});
        }
    }

    const handleUpvote = async () => {
        if (!user) {
            return
        }

        try {
            const response = await fetch(`/api/posts/${post._id}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })

            const json = await response.json();
            dispatch({ type: 'UPDATE_POST', payload: json })
        } catch (error) {
            console.error('Failed to upvote the post:', error)
        }
    }

    const handleDownvote = async () => {
        if (!user) {
            return
        }

        try {
            const response = await fetch(`/api/posts/${post._id}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const json = await response.json();
            dispatch({ type: 'UPDATE_POST', payload: json })
        } catch (error) {
            console.error('Failed to downvote the post:', error)
        }
    }

    return (
        <div className="post-details">
            <h4>{post.title}</h4>
            <div className="important">{post.text}</div>
            <p>Posted {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })} by @{post.user_username}</p>
            <div>
                <button onClick={handleUpvote}>Upvote</button>
                <span>{post.upvotes}</span>
                <button onClick={handleDownvote}>Downvote</button>
                <span>{post.downvotes}</span>
            </div>
            <button className="comment-button" onClick={handleCommentButtonClick}>
                {showCommentForm ? 'Abbrechen' : 'Kommentieren'}
            </button>
            {showCommentForm && <CommentForm post_id={post._id} />}
            <div className="comments">
                {post.comments && post.comments.map(comment => (
                    <CommentDetails comment={comment} key={comment._id} />
                ))}
            </div>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
    );
};

export default PostDetails;