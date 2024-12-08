import dotenv from "dotenv";
import mongoose from "mongoose";

const connectToDB = async () => {

    dotenv.config();
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB Connected");
    } catch (error) {
        console.error("Something went wrong: ", error);

    }
}

connectToDB();