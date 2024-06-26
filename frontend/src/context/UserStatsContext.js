import { createContext, useReducer } from "react";

export const UserStatsContext = createContext();

export const userStatsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_USERSTATS':
            return {
                userStats: action.payload
            };

        case 'CREATE_USERSTATS':
            return {
                userStats: [action.payload, ...state.userStats]
            };

        case 'DELETE_USERSTATS':
            return {
                userStats: state.userStats.filter((userStats) => userStats._id !== action.payload._id)
            };

        case 'UPDATE_USERSTATS':
            return {
                userStats: state.userStats.map((userStats) => userStats._id === action.payload._id ? action.payload : userStats)
            };

        default:
            return state;
    }
}

export const UserStatsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userStatsReducer, {
        userStats: []
    });

    return (
        <UserStatsContext.Provider value={{ ...state, dispatch }}>
            {children}
        </UserStatsContext.Provider>
    );
};
