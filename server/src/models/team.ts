import { Sequelize, DataTypes } from "sequelize";

export default (sequelize: Sequelize) => {
    const Team = sequelize.define("team", {
        name: {
            type: DataTypes.STRING,
            unique: true
        }
    });

    return Team;
};
