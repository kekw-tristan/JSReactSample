import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { PostsContextProvider } from "./context/PostContext";
import { AuthContextProvider } from "./context/AuthContext";
import { CommentsContextProvider} from "./context/CommentContext";
import { GameContextProvider } from "./context/GamesContext";
import {UserStatsContextProvider} from "./context/UserStatsContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <AuthContextProvider>
                <GameContextProvider>
                        <PostsContextProvider>
                                <CommentsContextProvider>
                                    <UserStatsContextProvider>
                                        <App />
                                    </UserStatsContextProvider>
                                </CommentsContextProvider>
                        </PostsContextProvider>
                </GameContextProvider>
        </AuthContextProvider>
    </React.StrictMode>
);