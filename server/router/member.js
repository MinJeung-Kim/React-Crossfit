import express from "express";
import "express-async-errors";
import { body } from "express-validator";
import * as memberController from "../controller/member.js";
import { validate } from "../middleware/validator.js";
import { isAuth } from "../middleware/auth.js";

const router = express.Router();

const validateMember = [
  body("rezDate")
    .isDate()
    .isAfter("2020-01-01")
    .isBefore("2023-12-31")
    .withMessage("rezDate must be a valid date"),
  body("rezTime")
    .matches(
      /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]-([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
    )
    .withMessage("rezTime must be in HH:MM-HH:MM format"),
  body("week")
    .isIn([
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ])
    .withMessage("week must be a valid day of the week"),
  body("desc")
    .optional({ checkFalsy: true }) // 빈 문자열과 null을 허용
    .isLength({ min: 3 })
    .withMessage("desc should be at least 3 characters when provided"),
 validate,
];

router.get("/", isAuth, memberController.getMembers);

router.get("/:id", isAuth, memberController.getMember);

router.post("/", isAuth,  memberController.createMember);

router.put("/:id", isAuth, validateMember, memberController.updateMember);

router.delete("/:id", isAuth, memberController.deleteMember);

export default router;
