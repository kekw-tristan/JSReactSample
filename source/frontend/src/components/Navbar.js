import { Link } from 'react-router-dom'
import myLogo from './logo.png'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import {NavbarOffcanvas} from "react-bootstrap";

function Header() {
    return (
        <Navbar className="nav">
            <Container>
                < img src={myLogo} alt="Logo" />
            </Container>
            <Container>
                <Navbar.Brand href="../pages/Home">Home</Navbar.Brand>
            </Container>
            <Container>
                <Navbar.Brand href="../pages/Login">Login</Navbar.Brand>
            </Container>
        </Navbar>
    );
}

export default Header;