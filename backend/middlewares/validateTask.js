import { body } from "express-validator";

const validateTask = [
  body("title").notEmpty().withMessage("Title is required").trim().escape(),
  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string")
    .trim()
    .escape(),
];

const validateTaskUpdate = [
  body("title")
    .optional()
    .notEmpty()
    .withMessage("Title is required")
    .trim()
    .escape(),
  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string")
    .trim()
    .escape(),
  body("completed")
    .optional()
    .isBoolean()
    .withMessage("Completed must be true or false"),
];

export { validateTask, validateTaskUpdate };
