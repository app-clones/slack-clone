import { Sequelize, DataTypes } from "sequelize";

export default (sequelize: Sequelize) => {
    const Team = sequelize.define("team", {
        name: {
            type: DataTypes.STRING,
            unique: {
                name: "name",
                msg: "Team name already in use"
            }
        }
    });

    return Team;
};
