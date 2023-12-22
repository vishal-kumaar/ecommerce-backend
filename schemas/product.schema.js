import mongoose from "mongoose";

// Create the product schema
const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please provide a product name"],
            trim: true,
            maxLength: [120, "Product name should be a max of 120 characters"],
        },
        price: {
            type: Number,
            required: [true, "Please provide a product price"],
            maxLength: [5, "Product name should not more than 5 digits"],
        },
        description: {
            type: String,
        },
        images: [
            {
                secure_url: {
                    type: String,
                    required: true,
                }
            }
        ],
        stock: {
            type: Number,
            min: 0,
            default: 0,
        },
        sold: {
            type: Number,
            default: 0,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
        },
    },
    {
        timestamps: true
    }
)

// Export the product schema
export default mongoose.model("Product", productSchema);