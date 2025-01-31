import express from "express";
import Task from "../models/Task.js";
import { validateToken } from "../middlewares/validateToken.js";
import {
  validateTask,
  validateTaskUpdate,
} from "../middlewares/validateTask.js";
import { validationResult } from "express-validator";

const router = express.Router();

router.get("/", validateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const tasks = await Task.find({user: userId});
    res.status(200).json(tasks);
  } catch {
    res.status(404).json({});
  }
});

router.post("/", validateToken, validateTask, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, completed } = req.body;
    const userId = req.user.userId;
    const task = new Task({ title, description, completed, user: userId });

    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/:id", validateToken, validateTaskUpdate, async (req, res) => {
  const id = req.params.id;
  const updates = req.body;
  try {
    const updatedTask = await Task.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", validateToken, async (req, res) => {
  const id = req.params.id;
  try {
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
export default router;
