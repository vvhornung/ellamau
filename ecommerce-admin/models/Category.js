import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    parentCategory: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      default: null,
    },
    children: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Category",
      },
    ],
    properties: [{ type: Object }],
  },
  {
    timestamps: true,
  }
);

// Add indexes for better query performance
CategorySchema.index({ name: 1 });
CategorySchema.index({ parentCategory: 1 });
CategorySchema.index({ children: 1 });

export const Category =
  mongoose.models?.Category || mongoose.model("Category", CategorySchema);
