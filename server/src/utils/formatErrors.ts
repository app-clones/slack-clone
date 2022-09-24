import { pick } from "lodash";
import { ValidationError } from "sequelize";

const formatErrors = (e: any) => {
    if (e instanceof ValidationError) {
        //  _.pick({a: 1, b: 2}, 'a') => {a: 1}
        return e.errors.map((x) => pick(x, ["path", "message"]));
    }

    return [{ path: "name", message: "something went wrong" }];
};

export default formatErrors;
