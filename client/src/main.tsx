import "semantic-ui-css/semantic.min.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import {
    ApolloClient,
    ApolloLink,
    ApolloProvider,
    createHttpLink,
    from,
    InMemoryCache
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import Routes from "./routes";

const httpLink = createHttpLink({
    uri: "http://localhost:4000/graphql"
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");

    return {
        headers: {
            ...headers,
            "x-token": token ?? "",
            "x-refresh-token": refreshToken ?? ""
        }
    };
});

const setToken = new ApolloLink((operation, forward) => {
    return forward(operation).map((response) => {
        const context = operation.getContext();

        const token = context.response.headers.get["x-token"];
        const refreshToken = context.response.headers.get["x-refresh-token"];

        if (token) localStorage.setItem("token", token);
        if (refreshToken) localStorage.setItem("refreshToken", refreshToken);

        return response;
    });
});

const client = new ApolloClient({
    link: from([authLink, setToken, httpLink]),
    cache: new InMemoryCache(),
    credentials: "include"
});

const App = (
    <React.StrictMode>
        <BrowserRouter>
            <ApolloProvider client={client}>
                <Routes />
            </ApolloProvider>
        </BrowserRouter>
    </React.StrictMode>
);

ReactDOM.createRoot(document.getElementById("root")!).render(App);
