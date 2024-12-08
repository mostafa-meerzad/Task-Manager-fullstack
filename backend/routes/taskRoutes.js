import express from 'express';
import Task from "../models/Task.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const tasks = await Task.find()
        res.status(200).json(tasks);
    } catch {
        res.status(404).json({})
    }
})

router.post("/", async (req, res) => {
    try {
        const task = new Task(req.body);
        await task.save();
        res.status(201).json(task);
    } catch (err) {

        res.status(400).json({message: err.message});
    }
})

export default router
