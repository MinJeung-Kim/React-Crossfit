import { validationResult } from "express-validator";

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  // 오류 메시지가 있는지 확인
  const errorMessages = errors.array();
  if (errorMessages.length > 0 && errorMessages[0].msg) {
    return res.status(400).json({ message: errorMessages[0].msg });
  } else {
    return res.status(400).json({ message: "Validation error" });
  }
};
