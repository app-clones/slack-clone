import { Sequelize } from "sequelize";
import logger from "../utils/logger";

import channel from "./channel";
import message from "./message";
import team from "./team";
import user from "./user";

const sequelize = new Sequelize({
    dialect: "postgres",
    database: "slack",
    username: "beatzoid",
    password: "beatzoid",
    logging: (sql) =>
        process.env.NODE_ENV !== "production" ? logger.debug(sql) : undefined
});

const { models } = sequelize;

const modelDefiners = [channel, message, team, user];

for (const modelDefiner of modelDefiners) {
    modelDefiner(sequelize);
}

// Relationships

models.user.belongsToMany(models.team, {
    through: "member",
    foreignKey: "userId"
});

models.team.belongsToMany(models.user, {
    through: "member",
    foreignKey: "teamId"
});

models.team.belongsTo(models.user, {
    foreignKey: "owner"
});

models.message.belongsTo(models.channel, {
    foreignKey: "channelId"
});

models.message.belongsTo(models.user, {
    foreignKey: "userId"
});

models.channel.belongsTo(models.team, {
    foreignKey: "teamId"
});

export default sequelize;
