import { Sequelize, DataTypes } from "sequelize";

export default (sequelize: Sequelize) => {
    const User = sequelize.define("user", {
        username: {
            type: DataTypes.STRING,
            unique: {
                name: "username",
                msg: "Username already in use"
            },
            validate: {
                isAlphanumeric: {
                    msg: "Username can only contain letters and numbers"
                },
                len: {
                    args: [3, 25],
                    msg: "Username must be between 3 and 25 characters long"
                }
            }
        },
        email: {
            type: DataTypes.STRING,
            unique: { name: "email", msg: "Email already in use" },
            validate: {
                isEmail: {
                    msg: "Email must be a valid email"
                }
            }
        },
        password: {
            type: DataTypes.STRING
        }
    });

    return User;
};
