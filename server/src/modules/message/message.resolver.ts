import { Resolvers } from "../../types/graphql";
import { Context } from "../../types/types";

import logger from "../../utils/logger";

const messageResolver: Resolvers<Context> = {
    Mutation: {
        createMessage: async (_, args, { models, user }) => {
            try {
                await models.message.create({ ...args, userId: user.id });
                return true;
            } catch (error) {
                logger.error(error);
                return false;
            }
        }
    }
};

export default messageResolver;
