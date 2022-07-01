import resolvers from "./resolvers/resolvers";
import schema from "./schemas/schema";
import startApolloServer from "./startServer";

startApolloServer(schema, resolvers);
