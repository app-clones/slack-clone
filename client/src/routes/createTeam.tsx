import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";

import { Container, Header, Button, Form } from "semantic-ui-react";

const createTeamMutation = gql`
    mutation ($name: String!) {
        createTeam(name: $name) {
            ok
            errors {
                path
                message
            }
        }
    }
`;

const CreateTeam = () => {
    const [createTeam, { loading }] = useMutation(createTeamMutation);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        nameError: ""
    });

    const { name, nameError } = formData;

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData({ ...formData, [name]: value });
    };

    const onSubmit = async () => {
        const res = await createTeam({ variables: { name } });
        const { ok, errors } = res.data.createTeam;

        if (ok) {
            navigate("/");
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
            <Header as="h2">Create Team</Header>
            <Form>
                <Form.Input
                    error={
                        formData.nameError !== "" && {
                            content: nameError,
                            pointing: "below"
                        }
                    }
                    name="name"
                    onChange={onChange}
                    value={name}
                    placeholder="Team Name"
                    fluid
                />

                <Button loading={loading} onClick={onSubmit}>
                    Create Team
                </Button>
            </Form>
        </Container>
    );
};

export default CreateTeam;
