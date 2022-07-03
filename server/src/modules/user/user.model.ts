import { Sequelize, DataTypes } from "sequelize";
import argon2 from "argon2";

export default (sequelize: Sequelize) => {
    const User = sequelize.define(
        "user",
        {
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
                type: DataTypes.STRING,
                validate: {
                    len: {
                        args: [6, 50],
                        msg: "Password length must be between 6 and 50 characters"
                    }
                }
            }
        },
        {
            hooks: {
                afterValidate: async (user: any) => {
                    const hashedPassword = await argon2.hash(user.password);
                    // eslint-disable-next-line no-param-reassign
                    user.password = hashedPassword;
                }
            }
        }
    );

    return User;
};
