import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";

import sequelize from "../utils/sequilize";
import { refreshTokens } from "../utils/auth";

import { MyRequest } from "../types/types";

const addUser = async (req: MyRequest, res: Response, next: NextFunction) => {
    const token = req.headers["x-token"] as string;

    if (token) {
        try {
            const { user } = jwt.verify(token, process.env.JWT_SECRET!) as any;
            req.user = user;
        } catch (err) {
            const refreshToken = req.headers["x-refresh-token"];
            const newTokens = await refreshTokens(
                token,
                `${refreshToken}`,
                sequelize.models,
                process.env.JWT_SECRET!,
                process.env.REFRESH_TOKEN_SECRET!
            );

            if (newTokens.token && newTokens.refreshToken) {
                res.set(
                    "Access-Control-Expose-Headers",
                    "x-token, x-refresh-token"
                );
                res.set("x-token", newTokens.token);
                res.set("x-refresh-token", newTokens.refreshToken);
            }
            req.user = newTokens.user;
        }
    }
    next();
};

export default addUser;
