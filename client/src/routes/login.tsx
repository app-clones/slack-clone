import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";

import { Container, Header, Button, Form } from "semantic-ui-react";

const loginMutation = gql`
    mutation ($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            ok
            token
            refreshToken
            errors {
                path
                message
            }
        }
    }
`;

const Login = () => {
    const [login, { loading }] = useMutation(loginMutation);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        emailError: "",
        password: "",
        passwordError: ""
    });

    const { email, password } = formData;

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData({ ...formData, [name]: value });
    };

    const onSubmit = async () => {
        const res = await login({ variables: { email, password } });
        const { ok, refreshToken, token, errors } = res.data.login;

        if (ok) {
            localStorage.setItem("token", token);
            localStorage.setItem("refreshToken", refreshToken);
            navigate("/home");
        } else {
            const err = {};

            errors.forEach(
                ({ path, message }: { path: string; message: string }) => {
                    // @ts-ignore
                    err[`${path}Error`] = message;
                }
            );

            setFormData({ ...formData, ...err });
        }
    };

    return (
        <Container text>
            <Header as="h2">Login</Header>
            <Form>
                <Form.Input
                    error={
                        formData.emailError !== ""
                            ? {
                                  content: formData.emailError,
                                  pointing: "below"
                              }
                            : null
                    }
                    name="email"
                    onChange={onChange}
                    value={email}
                    placeholder="Email"
                    fluid
                />

                <Form.Input
                    error={
                        formData.passwordError !== ""
                            ? {
                                  content: formData.passwordError,
                                  pointing: "below"
                              }
                            : null
                    }
                    name="password"
                    onChange={onChange}
                    value={password}
                    placeholder="Password"
                    type="password"
                    fluid
                />

                <Button loading={loading} onClick={onSubmit}>
                    Login
                </Button>
            </Form>
        </Container>
    );
};

export default Login;
