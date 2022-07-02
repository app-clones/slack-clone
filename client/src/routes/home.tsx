import { gql, useQuery } from "@apollo/client";

const allUsersQuery = gql`
    {
        allUsers {
            id
            email
        }
    }
`;

const Home = () => {
    const { loading, data } = useQuery(allUsersQuery);

    return loading
        ? null
        : data.allUsers.map((u: any) => <h1 key={u.id}>{u.email}</h1>);
};

export default Home;
