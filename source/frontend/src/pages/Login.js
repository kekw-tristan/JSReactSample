import { useEffect } from "react"
import { useUsersContext } from "../hooks/useUsersContext";

// components
import UserForm from "../components/UserForm"
import UserDetails from "../components/UserDetails";

const Login = () => {
    const { users, dispatch } = useUsersContext()

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch('/api/users')
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_USERS', payload: json})
            }
        }

        fetchUsers().then()
    }, [dispatch])

    return (
        <div className="login">
            <UserForm />
        </div>
    )
}

export default Login;