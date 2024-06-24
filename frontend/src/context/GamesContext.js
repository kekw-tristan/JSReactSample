import { createContext, useReducer } from "react";

export const GamesContext = createContext();

export const gamesReducer = (state, action) => {
    switch (action.type) {
        case 'SET_GAMES':
            return {
                games: action.payload
            };

        case 'CREATE_GAME':
            return {
                games: [action.payload, ...state.games]
            };

        case 'DELETE_GAME':
            return {
                games: state.games.filter((game) => game._id !== action.payload._id)
            };

        case 'UPDATE_GAME':
            return {
                games: state.games.map((game) => game._id === action.payload._id ? action.payload : game)
            };

        default:
            return state;
    }
}

export const GameContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(gamesReducer, {
        games: []
    });

    return (
        <GamesContext.Provider value={{ ...state, dispatch }}>
            {children}
        </GamesContext.Provider>
    );
};
