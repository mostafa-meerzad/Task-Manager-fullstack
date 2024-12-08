import express from 'express';
const router = express.Router();

router.get("/", (req, res) => {

    res.send("get all tasks")
})

router.post("/", (req, res) => {
    res.send("create a new task")
})

export default router
