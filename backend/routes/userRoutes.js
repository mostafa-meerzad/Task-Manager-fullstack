import express from "express";
import User from "../models/User.js";
import { validation } from "../middlewares/validation.js";
import { validationResult } from "express-validator";

const router = express.Router();

router.post("/register", validation, async (req, res) => {
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

    res.status(201).json({ user });
  } catch (err) {
    res.status(500).json({ errors: [{ mag: "Internal server error" }] });
  }
});

export default router;
