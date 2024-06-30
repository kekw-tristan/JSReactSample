import { useGamesContext } from '../hooks/useGamesContext'
import { useAuthContext } from '../hooks/useAuthContext'

const GameDetails = ({ game }) => {
    const { dispatch } = useGamesContext()
    const { user } = useAuthContext()

    let likes = game.likes.length - game.dislikes.length
    let colorLike
    let colorDislike

    if(game.likes.indexOf(user.username) === -1)
        colorLike = "#f1f1f1"
    else
        colorLike = "#618264"

    if(game.dislikes.indexOf(user.username) === -1)
        colorDislike = "#f1f1f1"
    else
        colorDislike = "#618264"

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
            });

            const json = await response.json();
            dispatch({ type: 'UPDATE_GAME', payload: json });
            likes = game.likes.length - game.dislikes.length
            console.log(user)
            if(game.dislikes.indexOf(user.username) === -1)
                colorDislike = "#f1f1f1"
            else
                colorDislike = "#618264"

        } catch (error) {
            console.error('Failed to upvote the game:', error);
        }
    };

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
            <div className="important"><b>Beschreibung: </b>{game.description}</div>
            <div className="important"><b>Entwickler: </b>{game.developer}</div>
            <div className="important"><b>Genre: </b>{game.genre}</div>
            <div className="important"><b>Herausgekommen am: </b>{game.releaseDate}</div>
            <div className="action-icons">
                <span style={{backgroundColor:colorLike}} className="material-symbols-outlined" onClick={handleUpvote}>arrow_upward</span>
                <span>{likes}</span>
                <span style={{backgroundColor:colorDislike}} className="material-symbols-outlined" onClick={handleDownvote}>arrow_downward</span>
            </div>
        </div>
    )
}

export default GameDetails