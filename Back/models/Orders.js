import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const OrdersSchema = new mongoose.Schema(
    {
        status: {
            type: String,
            required: true,
            trim: true
        },
        paymentMethod: {
            type: String,
            required: true,
            trim: true
        },
        idUser: {
            type: ObjectId,
            required: true,
            trim: true
        },
        products: {
            type: Array,
            required: true,
            trim: true
        },
        totalQuantity: {
            type: Number,
            required: true,
            trim: true
        },
        totalPrice: {
            type: Number,
            required: true,
            trim: true
        }
    

 },
    {
        collection: "orders",
        timestamps: true
    }
)

export default mongoose.model("Orders", OrdersSchema);