import { ModelStatic, Model } from "sequelize/types";

export type Context = {
    models: {
        [key: string]: ModelStatic<Model<any, any>>;
    };
    user: {
        id: number;
    };
};
