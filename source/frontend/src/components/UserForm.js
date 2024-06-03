import { useState } from 'react'
import { useUsersContext } from "../hooks/useUsersContext";

const UserForm = () => {
    const { dispatch } = useUsersContext()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const user = {username, email, password}

        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }

        if (response.ok) {
            setUsername('')
            setEmail('')
            setPassword('')
            setError(null)
            setEmptyFields([])
            console.log('new user added:', json)
            dispatch({type: 'CREATE_USER', payload: json})
        }
    }

    return (
        <div className="user-form">
        <form className="create" onSubmit={handleSubmit}>
            <h3>Registrieren:</h3>

            <input
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                className={emptyFields.includes('username') ? 'error' : ''}
                placeholder="Nutzername:"
            />

            <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className={emptyFields.includes('email') ? 'error' : ''}
                placeholder="Email:"
            />

            <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className={emptyFields.includes('password') ? 'error' : ''}
                placeholder="Passwort:"
            />

            <button>Senden</button>
            {error && <div className="error">{error}</div>}
        </form>
        </div>
    )
}

export default UserForm