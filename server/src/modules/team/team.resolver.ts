import { Resolvers } from "../../types/graphql";
import { Context } from "../../types/types";

import formatErrors from "../../utils/formatErrors";
import logger from "../../utils/logger";

const teamResolver: Resolvers<Context> = {
    Mutation: {
        createTeam: async (_, args, { models, user }) => {
            try {
                await models.team.create({ ...args, owner: user.id });
                return { ok: true };
            } catch (error) {
                logger.error(error);
                return { ok: false, errors: formatErrors(error) };
            }
        }
    }
};

export default teamResolver;
