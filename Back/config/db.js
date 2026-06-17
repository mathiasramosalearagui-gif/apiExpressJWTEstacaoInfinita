import mongoose from "mongoose"

const connectDB = async () => {
    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI was not found.")
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB is connected.")
}
export default connectDB