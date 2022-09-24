import jwt from "jsonwebtoken";
import _ from "lodash";
import argon2 from "argon2";

import { User } from "../types/graphql";

export const createTokens = async (
    user: User,
    secret: string,
    secret2: string
) => {
    const createToken = jwt.sign(
        {
            user: _.pick(user, ["id"])
        },
        secret,
        {
            expiresIn: "1h"
        }
    );

    const createRefreshToken = jwt.sign(
        {
            user: _.pick(user, "id")
        },
        secret2,
        {
            expiresIn: "7d"
        }
    );

    return [createToken, createRefreshToken];
};

export const refreshTokens = async (
    __: any,
    refreshToken: string,
    models: any,
    SECRET: string,
    SECRET2: string
) => {
    let userId = -1;

    try {
        const {
            user: { id }
        } = jwt.decode(refreshToken) as { user: { id: number } };

        userId = id;
    } catch (err) {
        return {};
    }

    if (!userId) return {};

    const user = await models.user.findOne({
        where: { id: userId },
        raw: true
    });

    if (!user) return {};

    const refreshSecret = user.password + SECRET2;

    try {
        jwt.verify(refreshToken, refreshSecret);
    } catch (err) {
        return {};
    }

    const [newToken, newRefreshToken] = await createTokens(
        user,
        SECRET,
        refreshSecret
    );
    return {
        token: newToken,
        refreshToken: newRefreshToken,
        user
    };
};

export const login = async (
    email: string,
    password: string,
    models: any,
    SECRET: string,
    SECRET2: string
) => {
    const user = await models.user.findOne({ where: { email }, raw: true });

    if (!user) {
        // user with provided email not found
        return {
            ok: false,
            errors: [{ path: "email", message: "Incorrect email" }]
        };
    }

    const valid = await argon2.verify(user.password, password);

    if (!valid) {
        // bad password
        return {
            ok: false,
            errors: [{ path: "password", message: "Incorrect password" }]
        };
    }

    const refreshTokenSecret = user.password + SECRET2;

    const [token, refreshToken] = await createTokens(
        user,
        SECRET,
        refreshTokenSecret
    );

    return {
        ok: true,
        token,
        refreshToken
    };
};
