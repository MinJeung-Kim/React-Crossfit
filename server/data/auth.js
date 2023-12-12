import SQ from "sequelize";
import { sequelize } from "../db/database.js";

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
    phone: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM,
      values: ["M", "F"],
      allowNull: false,
    },
    birthDay: {
      type: DataTypes.STRING(128),
    },
    membership: {
      type: DataTypes.ENUM,
      values: ["1", "3"],
      allowNull: false,
    },
    lockerYn: {
      type: DataTypes.ENUM,
      values: ["Y", "N"],
      allowNull: false,
    },
    locker: {
      type: DataTypes.ENUM,
      values: ["1", "3"],
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userAgmtYn: {
      type: DataTypes.ENUM("Y"), 
      allowNull: false,
    },
  }
  // { timestamps: false }
);

export async function findByUsername(username) {
  return User.findOne({ where: { username } });
}

export async function findById(id) {
  return User.findByPk(id);
}

export async function createUser(user) {
  return User.create(user).then((data) => data.dataValues.id);
}
