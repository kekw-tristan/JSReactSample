import { useState, useEffect } from 'react'
import CommentForm from './CommentForm'
import CommentDetails from './CommentDetails'
import formatDistanceToNow from "date-fns/formatDistanceToNow"
import { usePostsContext } from '../hooks/usePostsContext'
import { useAuthContext } from '../hooks/useAuthContext'


const PostDetails = ({ post, comments }) => {
    const [showCommentForm, setShowCommentForm] = useState(false)
        const [upvotes, setUpvotes] = useState(post.upvotes);
        const [downvotes, setDownvotes] = useState(post.downvotes);
    const { dispatch } = usePostsContext()
    const { user } = useAuthContext()

    // remove comments of other posts
    if(comments)
    {
        for(let index = 0; index < comments.length; index++)
        {
            if(comments[index].post_id !== post._id)
            {
                comments.splice(index,index)
            }
        }
    }

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

    useEffect(() => {
        setUpvotes(post.upvotes);
        setDownvotes(post.downvotes);
    }, [post]);

    const handleUpvote = async () => {
        if (!user) {
            return
        }

        try {
            const response = await fetch(`/api/posts/${post._id}/upvote`, {
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
        setUpvotes(upvotes + 1);
    }

    const handleDownvote = async () => {
        if (!user) {
            return
        }

        try {
            const response = await fetch(`/api/posts/${post._id}/downvote`, {
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
        setDownvotes(downvotes + 1);
    }

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
                {comments && comments.map(comment => (
                    <CommentDetails comment={comment}/>
                ))}
            </div>
        </div>
    );
};

export default PostDetails;