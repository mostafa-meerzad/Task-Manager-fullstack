import express from "express";
import User from "../models/User.js";
import {
  userLogin,
  userRegistration,
} from "../middlewares/userRegistration.js";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register", userRegistration, async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, name } = req.body;

    let user = await User.findOne({ email: email });

    if (user) {
      return res.status(400).json({ errors: [{ msg: "user already exists" }] });
    }
    user = new User({ email, password, name });
    await user.save();

    res
      .status(201)
      .json({ user: { name: user.name, email: user.email, id: user._id } });
  } catch (err) {
    res.status(500).json({ errors: [{ mag: "Internal server error" }] });
  }
});

router.post("/login", userLogin, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(400)
        .json({ errors: { msg: "Invalid email or password" } });
    }

    const isMatch = await user.comparePassword(req.body.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Invalid email or password" }] });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json(token);
  } catch (err) {
    res.status(500).json({ errors: [{ msg: "Internal server error" }] });
  }
});
export default router;
