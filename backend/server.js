import express from 'express';
import dotenv from 'dotenv';
import "./startup/db.js";
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();

const app = express()

app.use(express.json())
app.use("/api/tasks", taskRoutes)

app.get('/', (req, res) => {
    res.send("Backend is running!")
})

const port = process.env.PORT || 3001;
console.log(`Server started on port ${port}`)
app.listen(port, () => {

})