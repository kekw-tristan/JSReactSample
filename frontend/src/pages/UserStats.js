import { useEffect } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import { useUserStatsContext } from "../hooks/useUserStatsContext"

// components
import UserStatsDetails from "../components/UserStatsDetails"

const UserStats = () => {
    const { userStats, dispatch: userStatsDispatch } = useUserStatsContext();
    const { user } = useAuthContext()

    useEffect(() => {
        const fetchUserStats = async () => {
            const response = await fetch('/api/userStats', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const json = await response.json();

            if (response.ok) {
                userStatsDispatch({ type: 'SET_USERSTATS', payload: json });
            }
        }

        if (user) {
            fetchUserStats().then();
        }
    }, [userStatsDispatch, user]);

    return (
        console.log(userStats.user_id)
        //<div className="userStats">
        //    {
        //        <UserStatsDetails userStat={userStats}></UserStatsDetails>
        //    }
        //</div>
    );
}

export default UserStats;
