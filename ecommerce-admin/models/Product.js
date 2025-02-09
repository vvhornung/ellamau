import mongoose, { model, Schema, models } from "mongoose";

const VariantSchema = new Schema({
  color: String, // Optional (For clothing, shoes, etc.)
  size: String, // Optional (For clothing, shoes, etc.)
  stock: {
    type: Number,
    required: true,
    default: 0,
  },
  images: [String], // Multiple images per variant
});

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      unique: true,
      maxlength: [200, "Name cannot be more than 200 characters"],
    },
    reference: {
      type: String,
      required: [true, "Please add a reference"],
      maxlength: [50, "Reference cannot be more than 50 characters"],
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
      maxlength: [500, "Description cannot be more than 500 characters"],
    },
    details: [String], // Additional details for the product
    images: [String], // Multiple images for the main product

    // For Simple Products (Perfumes, Electronics, etc.)
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      default: function () {
        return this.variants.length === 0 ? 0 : undefined; // Stock only for simple products
      },
    },
    // For Variant-Based Products (Clothing, Shoes, etc.)
    variants: {
      type: [VariantSchema],
      default: [], // Empty by default
    },
  },
  { timestamps: true }
);

// Optimize common queries with indexes
ProductSchema.index({ name: "text" });
ProductSchema.index({ category: 1 });
ProductSchema.index({ price: 1 });
ProductSchema.index({ createdAt: -1 });

// Compound index for category + name searches
ProductSchema.index({ category: 1, name: 1 });

export const Product = models.Product || model("Product", ProductSchema);
