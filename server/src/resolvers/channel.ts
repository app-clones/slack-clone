import { Resolvers } from "../generated/graphql";
import { Context } from "../types/types";

import logger from "../utils/logger";

const channelResolver: Resolvers<Context> = {
    Mutation: {
        createChannel: async (_, args, { models }) => {
            try {
                await models.channel.create(args);
                return true;
            } catch (error) {
                logger.error(error);
                return false;
            }
        }
    }
};

export default channelResolver;
