import { Request } from "express";
import { ModelStatic, Model } from "sequelize/types";
import { User } from "./graphql";

export type Context = {
    models: {
        [key: string]: ModelStatic<Model<any, any>>;
    };
    user: ResolverUser;
    SECRET: string;
    REFRESH_TOKEN_SECRET: string;
};

export type ResolverUser = {
    id: number;
    isAdmin: boolean;
};

export interface MyRequest extends Request {
    user?: User;
}
