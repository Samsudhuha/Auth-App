import { User } from "../../models/User";
import * as UserApi from "../../containers/user";
import { Button, Navbar } from "react-bootstrap";

interface NavbarLoginViewProps {
    user: User,
    onLogoutSuccessful: () => void,
}

const NavbarLoginView = ({ user, onLogoutSuccessful }: NavbarLoginViewProps) => {
    async function logout() {
        try {
            await UserApi.Logout();
            onLogoutSuccessful();
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }
    return (
        <>
            <Navbar.Text className="me-2">
                Signed in as: {user.data.name}
            </Navbar.Text>
            <Button onClick={logout}>Log Out</Button>
        </>
    );
}

export default NavbarLoginView;