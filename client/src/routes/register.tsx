import { gql, useMutation } from "@apollo/client";

import { ChangeEvent, useState } from "react";

import { Button, Container, Header, Input } from "semantic-ui-react";

const registerMutation = gql`
    mutation ($username: String!, $email: String!, $password: String!) {
        register(username: $username, email: $email, password: $password)
    }
`;

const Register = () => {
    const [registerUser, { loading }] = useMutation(registerMutation);

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData({ ...formData, [name]: value });
    };

    const onSubmit = async () => {
        const res = await registerUser({ variables: formData });
        console.log(res);
    };

    return (
        <Container text>
            <Header as="h2">Register</Header>
            <Input
                name="username"
                onChange={onChange}
                value={formData.username}
                placeholder="Username"
                fluid
            />
            <Input
                name="email"
                onChange={onChange}
                value={formData.email}
                placeholder="Email"
                fluid
            />
            <Input
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
        </Container>
    );
};

export default Register;
