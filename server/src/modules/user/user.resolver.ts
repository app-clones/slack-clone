import argon2 from "argon2";

import { Resolvers, User } from "../../types/graphql";

import { Context } from "../../types/types";
import logger from "../../utils/logger";

const userResolver: Resolvers<Context> = {
    Query: {
        getUser: async (_, { id }, { models }) => {
            const user = (await models.user.findOne({
                where: { id }
            })) as unknown as User;
            return user;
        },
        allUsers: async (_, __, { models }) => {
            const allUsers = (await models.user.findAll()) as unknown as User[];
            return allUsers;
        }
    },
    Mutation: {
        register: async (_, args, { models }) => {
            try {
                const hashedPassword = await argon2.hash(args.password);

                await models.user.create({
                    ...args,
                    password: hashedPassword
                });

                return true;
            } catch (error) {
                logger.error(error);
                return false;
            }
        }
    }
};

export default userResolver;
