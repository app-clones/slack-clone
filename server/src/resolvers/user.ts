import { Resolvers, User } from "../generated/graphql";

import { Context } from "../types/types";

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
        createUser: async (_, args, { models }) => {
            const createdUser = (await models.user.create(
                args
            )) as unknown as User;
            return createdUser;
        }
    }
};

export default userResolver;
