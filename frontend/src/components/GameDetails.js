import { useGamesContext } from '../hooks/useGamesContext'
import { useAuthContext } from '../hooks/useAuthContext'

const GameDetails = ({ game }) => {
    const { user } = useAuthContext()
    const { dispatch } = useGamesContext()

   let likes = game.likes.length - game.dislikes.length

    const handleUpvote = async () => {
        if (!user) {
            return;
        }

        try {
            const response = await fetch(`/api/games/${game._id}/upvote`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })

            const json = await response.json()
            dispatch({ type: 'UPDATE_GAME', payload: json })
            likes = game.likes.length - game.dislikes.length

        } catch (error) {
            console.error('Failed to upvote the game:', error)
        }
    }

    const handleDownvote = async () => {
        if (!user) {
            return;
        }

        try {
            const response = await fetch(`/api/games/${game._id}/downvote`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });

            const json = await response.json();
            dispatch({ type: 'UPDATE_GAME', payload: json });
            likes = game.likes.length - game.dislikes.length

        } catch (error) {
            console.error('Failed to downvote the game:', error);
        }
    }

    return (
        <div className="game-details">
            <h4>{game.title}</h4>
            <div className="important">Beschreibung:{game.description}</div>
            <div className="important">Entwickler:{game.developer}</div>
            <div className="important">Genre:{game.genre}</div>
            <div className="important">Erschienen am: {game.releaseDate}</div>
            <div className="action-icons">
                <span className="material-symbols-outlined" onClick={handleUpvote}>arrow_upward</span>
                <span>{likes}</span>
                <span className="material-symbols-outlined" onClick={handleDownvote}>arrow_downward</span>
            </div>
        </div>)}

export default GameDetails;