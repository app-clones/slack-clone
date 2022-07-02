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

// User

models.user.belongsToMany(models.team, {
    through: "member",
    foreignKey: { name: "userId", field: "user_id" }
});

models.user.belongsToMany(models.channel, {
    through: "channel_member",
    foreignKey: { name: "userId", field: "user_id" }
});

// Team

models.team.belongsToMany(models.user, {
    through: "member",
    foreignKey: { name: "teamId", field: "team_id" }
});

models.team.belongsTo(models.user, {
    foreignKey: "owner"
});

// Message

models.message.belongsTo(models.channel, {
    foreignKey: { name: "channelId", field: "channel_id" }
});

models.message.belongsTo(models.user, {
    foreignKey: { name: "userId", field: "user_id" }
});

// Channel

models.channel.belongsTo(models.team, {
    foreignKey: { name: "teamId", field: "team_id" }
});

models.channel.belongsToMany(models.user, {
    through: "channel_member",
    foreignKey: { name: "channelId", field: "channel_id" }
});

export default sequelize;
