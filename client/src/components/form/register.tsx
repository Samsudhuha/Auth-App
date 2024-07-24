import { useForm } from "react-hook-form";
import { User } from "../../models/User";
import { RegisterCredentials } from "../../containers/user";
import * as UserApi from "../../containers/user";
import { Button, Form, Modal } from "react-bootstrap";
import TextInputField from "./TextInputField";

interface RegisterProps {
    onDismiss: () => void,
    onRegisterSuccessful: (user: User) => void,
}

const Register = ({ onDismiss, onRegisterSuccessful }: RegisterProps) => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterCredentials>();

    async function onSubmit(credentials: RegisterCredentials) {
        try {
            const newUser = await UserApi.Register(credentials);
            onRegisterSuccessful(newUser);
        } catch (error) {
            alert(error);
            
        }
    }
    return (
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                Register
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <TextInputField
                        name="name"
                        label="Username"
                        type="text"
                        placeholder="Username"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.name}
                    />
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
                        Register
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default Register;