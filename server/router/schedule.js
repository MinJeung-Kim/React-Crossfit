import express from "express";
import "express-async-errors";
import { body } from "express-validator";
import * as scheduleController from "../controller/schedule.js";
import { validate } from "../middleware/validator.js";
import { isAuth } from "../middleware/auth.js";

const router = express.Router();

const validateSchedule = [
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

  // body("rezTime")  
  //   .trim()
  //   .isLength({ min: 3 })
  //   .withMessage("rezTime should be at least 3 characters"),
  // body("week")
  //   .trim()
  //   .isLength({ min: 3 })
  //   .withMessage("week should be at least 3 characters"),
  // body("desc")
  //   .withMessage("invalid desc")
  //   .optional({ nullable: true, checkFalsy: true }),
  validate,
];

router.get("/", isAuth, scheduleController.getSchedules);

router.get("/:id", isAuth, scheduleController.getSchedule);

router.post("/", isAuth,  scheduleController.createSchedule);

router.put("/:id", isAuth, validateSchedule, scheduleController.updateSchedule);

router.delete("/:id", isAuth, scheduleController.deleteSchedule);

export default router;
