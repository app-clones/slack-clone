import { ApolloServer } from "apollo-server-express";

import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";

import express from "express";

import http from "http";
import logger from "./utils/logger";
import sequelize from "./models";

export default async function startApolloServer(typeDefs: any, resolvers: any) {
    const app = express();

    app.use(express.json());

    const httpServer = http.createServer(app);

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        csrfPrevention: true,
        cache: "bounded",
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
