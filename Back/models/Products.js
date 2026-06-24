import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
    {
        nameOfProduct: {
            type: String,
            required: true,
            trim: true
        },
        priceOfProduct: {
            type: Number,
            required: true,
            trim: true
        },
        amount: {
            type: Number,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true,
            trim: true
        },
        available: {
            type: Boolean,
            required: true,
            trim: true
        },
        category: {
            type: Array,
            required: true,
            trim: true
        },
        observations: {
            type: String,
            required: true,
            trim: true
        },
        main: {
            type: Boolean,
            required: true
        }
    },
    {
        collection: "products",
        timestamps: true
    }
)

export default mongoose.model("Product", ProductSchema);