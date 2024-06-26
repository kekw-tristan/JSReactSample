import { createContext, useReducer } from "react";

export const UserStatsContext = createContext();

export const userStatsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_USERSTATS':
            return {
                userStats: action.payload
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
