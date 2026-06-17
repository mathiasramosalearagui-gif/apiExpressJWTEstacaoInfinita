import mongoose from "mongoose";

const UserScherma = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            trim: true,
            select: false
        },
        age: {
            type: Number,
            trim: true,
            required: true
        },
        address: {
            type: Array,
            trim: true,
            required: true
        },
        active: {
            type: Boolean,
            required: true,
            default: true
        },
        cpf: {
            type: String,
            required: true,
            trim: true
        },
        telephone: {
            type: String,
            required: true,
            trim: true
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user"
        },
        cart: {
            type: Array
        }
    },
    {
        collection: "users",
        timestamps: true
    }
)

export default mongoose.model("User", UserScherma)