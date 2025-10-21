import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
            console.log("MONGO_DB connected successfully to the server");
    } catch (error) {
        console.log("MONGO_DB connection failed", error);
    }
}

export default connection;