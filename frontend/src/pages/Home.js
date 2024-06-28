import { useEffect } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import { useGamesContext } from "../hooks/useGamesContext"

// components
import GameDetails from "../components/GameDetails"

const Games = () => {
    const { games, dispatch: gamesDispatch } = useGamesContext()
    const { user } = useAuthContext()

    useEffect(() => {
        const fetchGames = async () => {
            const response = await fetch('/api/games', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const json = await response.json();

            if (response.ok) {
                gamesDispatch({ type: 'SET_GAMES', payload: json });
            }
        }

        if (user) {
            fetchGames().then();
        }
    }, [gamesDispatch, user]);

    return (
        <div className="games">
                {games && games.map(game => (
                    <GameDetails key={game._id} game={game}></GameDetails>
                ))}
        </div>
    );
}

export default Games;
