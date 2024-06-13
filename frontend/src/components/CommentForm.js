import { useState } from 'react'
import { useCommentsContext } from '../hooks/useCommentsContext'
import { useAuthContext } from '../hooks/useAuthContext'

const CommentForm = post_idobj => {
    const { dispatch } = useCommentsContext()
    const { user } = useAuthContext()


    let post_id = JSON.stringify(post_idobj)

    const [text, setText] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
            setError('You must be logged in')
            return
        }

        const comment = {text, post_id, }

        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify(comment),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (!response.ok) {

            setError(json.error)
            setEmptyFields(json.emptyFields || [])
        }

        if (response.ok) {
            console.log("asd")
            setText('')
            setError(null)
            setEmptyFields([])
            console.log('new comment added:', json)
            dispatch({type: 'CREATE_COMMENT', payload: json})
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <input
                type="text"
                onChange={(e) => setText(e.target.value)}
                value={text}
                className={emptyFields.includes('text') ? 'error' : ''}
                placeholder="Kommentar"
            />

            <button>Senden</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default CommentForm