import SQ from "sequelize";
import { sequelize } from "../db/database.js";
import { User } from "./auth.js";

const DataTypes = SQ.DataTypes;
const Sequelize = SQ.Sequelize;

const Member = sequelize.define("member", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  paymentTerm: {
    // 계약 기간
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  extendedPeriod: {
    // 연장 기간
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalPeriod: {
    // 총 기간
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  locker: {
    // 사물함 사용 기간
    type: DataTypes.INTEGER,
  },
  desc: {
    type: DataTypes.TEXT,
  },
});
Member.belongsTo(User);

const INCLUDE_USER = {
  attributes: [
    "id",
    "paymentTerm",
    "extendedPeriod",
    "totalPeriod",
    "locker",
    "desc",
    "createdAt",
    "userId",
    [Sequelize.col("user.name"), "name"],
    [Sequelize.col("user.username"), "username"],
    [Sequelize.col("user.email"), "email"],
    [Sequelize.col("user.phone"), "phone"],
  ],
  include: {
    model: User,
    attributes: [],
  },
};

const ORDER_DESC = { order: [["createdAt", "DESC"]] };

export async function getAll() {
  return Member.findAll({ ...INCLUDE_USER, ...ORDER_DESC });
}

export async function getAllByUsername(username) {
  return Member.findAll({
    ...INCLUDE_USER,
    ...ORDER_DESC,
    include: {
      ...INCLUDE_USER.include,
      where: { username },
    },
  });
}

export async function getById(id) {
  return Member.findOne({
    where: { id },
    ...INCLUDE_USER,
  });
}

export async function create(
  paymentTerm,
  extendedPeriod,
  totalPeriod,
  locker,
  desc,
  userId
) {
  return Member.create({
    paymentTerm,
    extendedPeriod,
    totalPeriod,
    locker,
    desc,
    userId,
  }).then((data) => this.getById(data.dataValues.id));
}

export async function update(id, rezDate, rezTime, week, desc) {
  return Member.findByPk(id, INCLUDE_USER).then((member) => {
    member.rezDate = rezDate;
    member.rezTime = rezTime;
    member.week = week;
    member.desc = desc;
    return member.save();
  });
}

export async function remove(id) {
  return Member.findByPk(id).then((member) => member.destroy());
}
