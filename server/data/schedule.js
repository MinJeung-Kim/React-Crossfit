import SQ from "sequelize";
import { sequelize } from "../db/database.js";
import { User } from "./auth.js";

const DataTypes = SQ.DataTypes;
const Sequelize = SQ.Sequelize;

const Schedule = sequelize.define("schedule", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  rezDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  rezTime: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  week: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  desc: {
    type: DataTypes.TEXT,
  },
});
Schedule.belongsTo(User);

const INCLUDE_USER = {
  attributes: [
    "id",
    "rezDate",
    "rezTime",
    "week",
    "desc",
    "createdAt",
    "userId",
    [Sequelize.col("user.name"), "name"],
    [Sequelize.col("user.username"), "username"], 
  ],
  include: {
    model: User,
    attributes: [],
  },
};

const ORDER_DESC = { order: [["createdAt", "DESC"]] };

export async function getAll() {
  return Schedule.findAll({ ...INCLUDE_USER, ...ORDER_DESC });
}

export async function getAllByUsername(username) {
  return Schedule.findAll({
    ...INCLUDE_USER,
    ...ORDER_DESC,
    include: {
      ...INCLUDE_USER.include,
      where: { username },
    },
  });
}

export async function getById(id) {
  return Schedule.findOne({
    where: { id },
    ...INCLUDE_USER,
  });
}

export async function create(rezDate, rezTime, week, desc, userId) {
  return Schedule.create({ rezDate, rezTime, week, desc, userId }).then(
    (data) => this.getById(data.dataValues.id)
  );
}

export async function update(id, rezDate, rezTime, week, desc) {
  return Schedule.findByPk(id, INCLUDE_USER).then((schedule) => {
    schedule.rezDate = rezDate;
    schedule.rezTime = rezTime;
    schedule.week = week;
    schedule.desc = desc;
    return schedule.save(); 
  });
}

export async function remove(id) {
  return Schedule.findByPk(id).then(
    (schedule) => schedule.destroy() // 삭제, 파괴
  );
}
