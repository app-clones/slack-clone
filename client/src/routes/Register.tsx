import { useNavigate } from "react-router-dom";
import { ChangeEvent, useState } from "react";

import { gql, useMutation } from "@apollo/client";

import { Button, Header, Form, Container } from "semantic-ui-react";

const registerMutation = gql`
    mutation ($username: String!, $email: String!, $password: String!) {
        register(username: $username, email: $email, password: $password) {
            ok
            errors {
                path
                message
            }
        }
    }
`;

const Register = () => {
    const navigate = useNavigate();

    const [registerUser, { loading }] = useMutation(registerMutation);

    const [formData, setFormData] = useState({
        username: "",
        usernameError: "",
        email: "",
        emailError: "",
        password: "",
        passwordError: ""
    });

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
            [`${name}Error`]: ""
        });
    };

    const onSubmit = async () => {
        const { username, email, password } = formData;

        const res = await registerUser({
            variables: { username, email, password }
        });

        const { ok, errors } = res.data.register;

        if (ok) {
            navigate("/");
        } else {
            const err: Record<string, any> = {};

            errors.forEach(
                ({ path, message }: { path: string; message: string }) => {
                    err[`${path}Error`] = message;
                }
            );

            setFormData({ ...formData, ...err });
        }
    };

    return (
        <Container text>
            <Header as="h2">Register</Header>
            <Form>
                <Form.Input
                    error={
                        formData.usernameError !== "" && {
                            content: formData.usernameError,
                            pointing: "above"
                        }
                    }
                    name="username"
                    onChange={onChange}
                    value={formData.username}
                    placeholder="Username"
                    fluid
                />

                <Form.Input
                    error={
                        formData.emailError !== "" && {
                            content: formData.emailError,
                            pointing: "above"
                        }
                    }
                    name="email"
                    onChange={onChange}
                    value={formData.email}
                    placeholder="Email"
                    fluid
                />

                <Form.Input
                    error={
                        formData.passwordError !== "" && {
                            content: formData.passwordError,
                            pointing: "above"
                        }
                    }
                    name="password"
                    onChange={onChange}
                    value={formData.password}
                    placeholder="Password"
                    type="password"
                    fluid
                />

                <Button loading={loading} onClick={onSubmit}>
                    Register
                </Button>
            </Form>
        </Container>
    );
};

export default Register;
