import { useEffect } from "react";
import { usePostsContext } from "../hooks/usePostsContext";
import { useCommentsContext } from "../hooks/useCommentsContext";
import { useAuthContext } from "../hooks/useAuthContext";

// components
import PostDetails from "../components/PostDetails";
import PostForm from "../components/PostForm";
import CommentForm from "../components/CommentForm";
import CommentDetails from "../components/CommentDetails";

const Posts = () => {
    const { posts, dispatch: postsDispatch } = usePostsContext();
    const { comments, dispatch: commentsDispatch } = useCommentsContext();
    const { user } = useAuthContext();

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('/api/posts', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const json = await response.json();

            if (response.ok) {
                postsDispatch({ type: 'SET_POSTS', payload: json });
            }
        };

        const fetchComments = async () => {
            const response = await fetch('/api/comments', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const json = await response.json();

            if (response.ok) {
                commentsDispatch({ type: 'SET_COMMENTS', payload: json });
            }
        };

        if (user) {
            fetchPosts().then();
            fetchComments().then();
        }
    }, [postsDispatch, commentsDispatch, user]);

    return (
        <div className="home">
            <PostForm />
            <div className="posts">
                {posts && posts.map(post => (
                    <PostDetails post={post} key={post._id}>
                        <CommentForm />
                        <div className="comments">
                            {comments && comments.map(comment => (
                                <CommentDetails post={comment} key={post._id} />
                            ))}
                        </div>
                    </PostDetails>
                ))}
            </div>
        </div>
    );
}

export default Posts;
