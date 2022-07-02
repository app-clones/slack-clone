import { Resolvers } from "../../types/graphql";
import { Context } from "../../types/types";

import logger from "../../utils/logger";

const teamResolver: Resolvers<Context> = {
    Mutation: {
        createTeam: async (_, args, { models, user }) => {
            try {
                await models.team.create({ ...args, owner: user.id });
                return true;
            } catch (error) {
                logger.error(error);
                return false;
            }
        }
    }
};

export default teamResolver;
