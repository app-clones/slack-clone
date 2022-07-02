import "semantic-ui-css/semantic.min.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import Routes from "./routes";

const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",

    cache: new InMemoryCache()
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
