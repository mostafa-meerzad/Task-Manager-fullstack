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

router.put("/:id", async (req, res) => {
    const id = req.params.id;
    const updates = req.body;
    try {
        const updatedTask = await Task.findByIdAndUpdate(id, updates, {new: true})
        if (!updatedTask) {
            return res.status(404).json({message: "Task not found"});
        }

        return res.status(200).json(updatedTask);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
})

router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    try{
        const deletedTask = await Task.findByIdAndDelete(id)
        if (!deletedTask) { return res.status(404).json({message: "Task not found"}); }

        res.status(200).json({message:"Task deleted successfully"});
    }
    catch(err){
        res.status(400).json({message: err.message});
    }
})
export default router
