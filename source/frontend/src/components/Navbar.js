// import { Link } from 'react-router-dom'
// import myLogo from './logo.png'
//
// const Navbar = () => {
//
//     return (
//         <header>
//             <div className="container">
//                 <Link to="/">
//                     <img src={myLogo} alt="Logo" />
//                 </Link>
//                 <Link to="./pages/Home"></Link>
//                 <Link to="./pages/Login"></Link>
//             </div>
//         </header>
//     )
// }
//
// export default Navbar

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function TextLinkExample() {
    return (
        <Navbar className="nav">
            <Container>
                <Navbar.Brand href="/pages/Home">Home</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end"></Navbar.Collapse>
            </Container>
            <Container>
                <Navbar.Brand href="/pages/Login">Login</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end"></Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default TextLinkExample;