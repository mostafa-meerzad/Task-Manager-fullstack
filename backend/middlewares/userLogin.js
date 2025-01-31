import {body} from "express-validator";

export const userLogin = [
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

