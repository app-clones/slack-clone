import { pick } from "lodash";
import argon2 from "argon2";
import { ValidationError } from "sequelize";

import { Resolvers, User } from "../../types/graphql";

import { Context } from "../../types/types";
import logger from "../../utils/logger";

const formatErrors = (e: any) => {
    if (e instanceof ValidationError) {
        //  _.pick({a: 1, b: 2}, 'a') => {a: 1}
        return e.errors.map((x) => pick(x, ["path", "message"]));
    }

    return [{ path: "name", message: "something went wrong" }];
};

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
        // @ts-ignore
        register: async (__, args, { models }) => {
            try {
                if (args.password.length < 5 || args.password.length > 50) {
                    return {
                        ok: false,
                        errors: [
                            {
                                path: "password",
                                message:
                                    "Password length must be between 5 and 50 characters"
                            }
                        ]
                    };
                }

                const hashedPassword = await argon2.hash(args.password);

                const user = (await models.user.create({
                    ...args,
                    password: hashedPassword
                })) as unknown as User;

                return { ok: true, user };
            } catch (error) {
                logger.error(error);
                return { ok: false, errors: formatErrors(error) };
            }
        }
    }
};

export default userResolver;
