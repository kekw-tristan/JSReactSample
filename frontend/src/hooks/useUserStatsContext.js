import { UserStatsContext } from "../context/UserStatsContext";
import { useContext } from "react";

export const useUserStatsContext = () => {
    const context = useContext(UserStatsContext)

    if (!context) {
        throw Error('useUserStatsContext must be used inside a UserStatsContextProvider')
    }

    return context
}