"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const apollo_server_express_1 = require("apollo-server-express");
const apollo_server_core_1 = require("apollo-server-core");
const express_1 = tslib_1.__importDefault(require("express"));
const http_1 = tslib_1.__importDefault(require("http"));
const logger_1 = tslib_1.__importDefault(require("./utils/logger"));
async function startApolloServer(typeDefs, resolvers) {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    const httpServer = http_1.default.createServer(app);
    const server = new apollo_server_express_1.ApolloServer({
        typeDefs,
        resolvers,
        csrfPrevention: true,
        cache: "bounded",
        plugins: [(0, apollo_server_core_1.ApolloServerPluginDrainHttpServer)({ httpServer })]
    });
    await server.start();
    server.applyMiddleware({ app });
    await new Promise((resolve) => httpServer.listen({ port: process.env.PORT || 4000 }, resolve));
    logger_1.default.info(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}
exports.default = startApolloServer;
