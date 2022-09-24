import { Request } from "express";
import { ModelStatic, Model } from "sequelize/types";
import { User } from "./graphql";

export type Context = {
    models: {
        [key: string]: ModelStatic<Model<any, any>>;
    };
    user: {
        id: number;
    };
    SECRET: string;
    REFRESH_TOKEN_SECRET: string;
};

export interface MyRequest extends Request {
    user?: User;
}
