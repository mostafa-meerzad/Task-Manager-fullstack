import { body } from "express-validator";

const userRegistration = [
  body("email")
    .normalizeEmail()
    .trim()
    .isEmail()
    .withMessage("Please provide a valid email"),
  body("password")
    .trim()
    .isLength({ min: 8, max: 16 })
    .withMessage("Password must be at least 8 characters"),
  body("name")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Name is required")
    .isAlphanumeric()
    .withMessage("Name must contain only letters and numbers"),
];

const userLogin = [
  body("email")
    .normalizeEmail()
    .trim()
    .isEmail()
    .withMessage("Please provide a valid email"),
  body("password")
    .trim()
    .isLength({ min: 8, max: 16 })
    .withMessage("Password must be at least 8 characters"),
];

export { userLogin, userRegistration };
