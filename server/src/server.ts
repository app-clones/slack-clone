import path from "path";

import { ApolloServer } from "apollo-server-express";

import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import expressPlayground from "graphql-playground-middleware-express";

import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { loadFilesSync } from "@graphql-tools/load-files";

import express from "express";

import http from "http";
import logger from "./utils/logger";
import sequelize from "./utils/sequilize";

export default async function startApolloServer() {
    const app = express();

    app.use(express.json());

    app.get(
        "/playground",
        expressPlayground({
            endpoint: "/graphql"
        })
    );

    const httpServer = http.createServer(app);

    const typeDefs = mergeTypeDefs(
        loadFilesSync(path.join(__dirname, "./modules/**/**.schema.ts"))
    );

    const resolverFiles = loadFilesSync(
        path.join(__dirname, "./modules/**/**.resolver.ts")
    );

    const resolvers = mergeResolvers(resolverFiles);

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        csrfPrevention: true,
        cache: "bounded",
        context: {
            models: sequelize.models,
            user: {
                id: 1
            }
        },
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
    });

    await server.start();

    server.applyMiddleware({ app });

    sequelize.sync().then(async () => {
        await new Promise<void>((resolve) =>
            httpServer.listen({ port: process.env.PORT || 4000 }, resolve)
        );

        logger.info(
            `🚀 Server ready at http://localhost:4000${server.graphqlPath}`
        );
    });
}
