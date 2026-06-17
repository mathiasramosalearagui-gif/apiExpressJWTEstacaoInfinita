import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors"
import connectDB from "./config/db.js"
        
dotenv.config();
        
const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "API is enabled"})
});

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log('Server running in port ', PORT)
        });
    } catch (error) {
        console.log("ERROR: ", error.message);
    }
};

startServer();