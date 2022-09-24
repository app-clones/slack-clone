import { Resolvers, User } from "../../types/graphql";
import { Context } from "../../types/types";
import formatErrors from "../../utils/formatErrors";

import logger from "../../utils/logger";

import { login } from "../../utils/auth";

const userResolver: Resolvers<Context> = {
    Query: {
        getUser: async (__, { id }, { models }) => {
            const user = (await models.user.findOne({
                where: { id }
            })) as unknown as User;
            return user;
        },
        allUsers: async (__, ___, { models }) => {
            const allUsers = (await models.user.findAll()) as unknown as User[];
            return allUsers;
        }
    },
    Mutation: {
        login: (
            __,
            { email, password },
            { models, SECRET, REFRESH_TOKEN_SECRET }
        ) => login(email, password, models, SECRET, REFRESH_TOKEN_SECRET),
        // @ts-ignore
        register: async (__, args, { models }) => {
            try {
                const user = (await models.user.create(
                    args
                )) as unknown as User;

                return { ok: true, user };
            } catch (error) {
                logger.error(error);
                return { ok: false, errors: formatErrors(error) };
            }
        }
    }
};

export default userResolver;
