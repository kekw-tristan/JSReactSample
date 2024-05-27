import { Link } from 'react-router-dom'
import myLogo from './logo.png'

const Navbar = () => {

    return (
        <header>
            <div className="container">
                <Link to="/">
                    <img src={myLogo} alt="Logo" />
                </Link>
            </div>
        </header>
    )
}

export default Navbar