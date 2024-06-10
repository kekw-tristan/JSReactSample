import { useState } from 'react'
import { usePostsContext } from '../hooks/usePostsContext'
import { useAuthContext } from '../hooks/useAuthContext'

const PostForm = () => {
    const { dispatch } = usePostsContext()
    const { user } = useAuthContext()

    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
            setError('You must be logged in')
            return
        }

        const post = {title, text}

        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify(post),
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
            setTitle('')
            setText('')
            setError(null)
            setEmptyFields([])
            console.log('new post added:', json)
            dispatch({type: 'CREATE_POST', payload: json})
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Schreibe einen neuen Post:</h3>

            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''}
                placeholder="Titel"
            />

            <input
                type="text"
                onChange={(e) => setText(e.target.value)}
                value={text}
                className={emptyFields.includes('text') ? 'error' : ''}
                placeholder="Text"
            />

            <button>Senden</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default PostForm