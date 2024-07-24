import { useForm } from "react-hook-form";
import { User } from "../../models/User";
import { LoginCredentials } from "../../containers/user";
import * as UserApi from "../../containers/user";
import { Button, Form, Modal } from "react-bootstrap";
import TextInputField from "./TextInputField";

interface LoginProps {
    onDismiss: () => void,
    onLoginSuccessful: (user: User) => void,
}

const Login = ({ onDismiss, onLoginSuccessful }: LoginProps) => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginCredentials>();

    async function onSubmit(credentials: LoginCredentials) {
        try {
            const newUser = await UserApi.Login(credentials);

            if (!newUser.data) {
                return alert("Email atau Password salah")
            }

            localStorage.setItem('jwtToken', newUser.data.token);
            onLoginSuccessful(newUser);
            
        } catch (error) {
            console.log(error);
            
            alert(error);
            
        }
    }
    return (
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                Login
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <TextInputField
                        name="email"
                        label="Email"
                        type="email"
                        placeholder="Email"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.email}
                    />
                    <TextInputField
                        name="password"
                        label="Password"
                        type="password"
                        placeholder="Password"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.password}
                    />
                    <Button type="submit" disabled={isSubmitting}>
                        Login
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default Login;