import { useNavigate } from "react-router-dom";
import { ChangeEvent, useState } from "react";

import { gql, useMutation } from "@apollo/client";

import { Button, Container, Header, Input, Message } from "semantic-ui-react";

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

    const errors = [];

    if (formData.usernameError) {
        errors.push(formData.usernameError);
    }

    if (formData.emailError) {
        errors.push(formData.emailError);
    }

    if (formData.passwordError) {
        errors.push(formData.passwordError);
    }

    return (
        <Container text>
            <Header as="h2">Register</Header>
            <Input
                name="username"
                onChange={onChange}
                value={formData.username}
                placeholder="Username"
                fluid
                error={formData.usernameError !== ""}
            />
            <Input
                name="email"
                onChange={onChange}
                value={formData.email}
                placeholder="Email"
                fluid
                error={formData.emailError !== ""}
            />
            <Input
                name="password"
                onChange={onChange}
                value={formData.password}
                placeholder="Password"
                type="password"
                fluid
                error={formData.passwordError !== ""}
            />

            <Button loading={loading} onClick={onSubmit}>
                Register
            </Button>

            {errors.length > 0 && (
                <Message error header="Error" list={errors} />
            )}
        </Container>
    );
};

export default Register;
