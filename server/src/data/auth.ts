import SQ from "sequelize";
import { sequelize } from "../db/database.js";

type UserType = {
  username: string;
  password: string;
  name: string;
  email: string;
  url?: string;
};

const DataTypes = SQ.DataTypes;

export const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    url: DataTypes.TEXT,
  },
  { timestamps: false }
);

type UserInstance = InstanceType<typeof User>;

export async function findByUsername(
  username: string
): Promise<UserInstance | null> {
  return User.findOne({ where: { username } });
}

export async function findById(id: string): Promise<UserInstance | null> {
  return User.findByPk(id);
}

export async function createUser(user: UserType): Promise<string> {
  return User.create(user).then((data: UserInstance) => data.dataValues.id);
}
