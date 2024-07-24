import { Container, Nav, Navbar } from "react-bootstrap";
import { User } from "../../models/User";
import NavbarLoginView from "./NavbarloginView";
import NavbarLogoutView from "./NavbarlogoutView";

interface NavbarProps {
    loggedInUser: User | null,
    onSignUpClicked: () => void,
    onLoginClicked: () => void,
    onLogoutSuccessful: () => void,
}

const NavBar = ({loggedInUser, onSignUpClicked, onLoginClicked, onLogoutSuccessful} : NavbarProps) => {
    return (
        <Navbar bg="secondary" variant="dark" expand="lg" sticky="top">
            <Container>
                <Navbar.Brand>
                    Auth App
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="main-navbar" />
                <Navbar.Collapse id="main-navbar">
                    <Nav className="ms-auto">
                        { loggedInUser ? < NavbarLoginView user={loggedInUser} onLogoutSuccessful={onLogoutSuccessful} /> : <NavbarLogoutView onLoginClicked={onLoginClicked} onSignUpClicked={onSignUpClicked} /> }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;