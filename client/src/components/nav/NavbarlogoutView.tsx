import { User } from "../../models/User";
import * as UserApi from "../../containers/user";
import { Button, Navbar } from "react-bootstrap";

interface NavbarLogoutViewProps {
    onSignUpClicked: () => void,
    onLoginClicked: () => void,
}

const NavbarLogoutView = ({ onSignUpClicked, onLoginClicked }: NavbarLogoutViewProps) => {
    return (
        <>
            <Button onClick={onSignUpClicked}>Register</Button>
            <Button onClick={onLoginClicked}>Log In</Button>
        </>
    );
}

export default NavbarLogoutView;