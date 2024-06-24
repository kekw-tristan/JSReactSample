import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { PostsContextProvider } from "./context/PostContext";
import { AuthContextProvider } from "./context/AuthContext";
import { CommentsContextProvider} from "./context/CommentContext";
import { GameContextProvider } from "./context/GamesContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <AuthContextProvider>
                <GameContextProvider>
                        <PostsContextProvider>
                                <CommentsContextProvider>
                                    <App />
                                </CommentsContextProvider>
                        </PostsContextProvider>
                </GameContextProvider>
        </AuthContextProvider>
    </React.StrictMode>
);