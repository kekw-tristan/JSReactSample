import { useEffect } from "react";
import { useUserStatsContext } from "../hooks/useUserStatsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import UserStatsDetails from "../components/UserStatsDetails";

const UserStats = () => {
    const { userStats, mostActiveUser, dispatch: userStatsDispatch } = useUserStatsContext();
    const { user } = useAuthContext();

    useEffect(() => {
        const fetchUserStats = async () => {
            try {
                const response = await fetch('/api/userStats', {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });

                if (!response.ok) {
                    console.error('Failed to fetch user stats:', response.statusText);
                    return;
                }

                const json = await response.json();
                console.log('API response:', json);

                if (json && Array.isArray(json.userStats)) {
                    userStatsDispatch({
                        type: 'SET_USERSTATS',
                        payload: { userStats: json.userStats, mostActiveUser: json.mostActiveUser }
                    });
                } else {
                    console.error('API response does not contain userStats array:', json);
                    userStatsDispatch({ type: 'SET_USERSTATS', payload: { userStats: [], mostActiveUser: null } });
                }
            } catch (error) {
                console.error('Error fetching user stats:', error);
                userStatsDispatch({ type: 'SET_USERSTATS', payload: { userStats: [], mostActiveUser: null } });
            }
        };

        if (user) {
            fetchUserStats().then();
        }
    }, [userStatsDispatch, user]);

    console.log('userStats state:', userStats);

    return (
        <div className="userStats">
            {mostActiveUser && (
                <div className="most-active-user">
                    <h3>Most Active User</h3>
                    <UserStatsDetails userStat={mostActiveUser} isMostActive={true} />
                </div>
            )}
            {Array.isArray(userStats) && userStats.length > 0 ? (
                userStats.map(userStat => (
                    <UserStatsDetails key={userStat.user_id} userStat={userStat} isMostActive={false} />
                ))
            ) : (
                <p>No user stats available</p>
            )}
        </div>
    );
}

export default UserStats