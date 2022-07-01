import { Sequelize, DataTypes } from "sequelize";

export default (sequelize: Sequelize) => {
    const Channel = sequelize.define("channel", {
        name: DataTypes.STRING,
        public: DataTypes.BOOLEAN
    });

    return Channel;
};
