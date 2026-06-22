import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import connectDB from "./config/db.js"
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js"
import userRoutes from "./routes/userRoutes.js"

dotenv.config();
        
const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "API is enabled"})
});

app.use("/auth", authRoutes)
app.use("/product", productRoutes)
app.use("/users", userRoutes)

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