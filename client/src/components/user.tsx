import { Card }  from 'react-bootstrap';
import { User as UserModel } from "../models/User";

interface UserProps {
    user: UserModel
}

const User = ({ user }: UserProps) => {
    return (
        <Card body> Your name is { user.data.name } </Card>
    )
}

export default User;