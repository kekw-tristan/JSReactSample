import { createContext, useReducer } from "react";

export const PostsContext = createContext();

export const postsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_POSTS':
            return {
                posts: action.payload
            };

        case 'CREATE_POST':
            return {
                posts: [action.payload, ...state.posts]
            };

        case 'DELETE_POST':
            return {
                posts: state.posts.filter((post) => post._id !== action.payload._id)
            };

        case 'UPDATE_POST':
            return {
                posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post)
            };

        default:
            return state;
    }
}

export const PostsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(postsReducer, {
        posts: []
    });

    return (
        <PostsContext.Provider value={{ ...state, dispatch }}>
            {children}
        </PostsContext.Provider>
    );
};
