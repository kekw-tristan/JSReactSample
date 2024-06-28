import myLogo from './logo.png'
import { Link } from 'react-router-dom'
import {useLogout} from "../hooks/useLogout"
import {useAuthContext} from "../hooks/useAuthContext";

const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()

    const handleClick = () => {
        logout()
    }

    return (
        <header>
            <div className="container">
                <Link to="/home">
                    < img src={myLogo} alt="Logo" />
                </Link>
                <nav>
                    <div className="nav-components">
                        <Link to="/home">Home</Link>
                        <Link to="/posts">Posts</Link>
                        <Link to="/statistics">Statistics</Link>
                    </div>

                    {user && (
                        <div className="user-details">
                            <span>@{user.username}</span>
                            <button onClick={handleClick}>Log out</button>
                        </div>
                    )}
                    {!user && (
                        <div className="user-details">
                            <Link to="/login">Einloggen</Link>
                            <Link to="/signup">Registrieren</Link>
                        </div>
                    )}

                </nav>
            </div>
        </header>
    )
}

export default Navbar