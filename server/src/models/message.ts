import { Sequelize, DataTypes } from "sequelize";

export default (sequelize: Sequelize) => {
    const Message = sequelize.define("message", {
        text: DataTypes.STRING
    });

    return Message;
};
