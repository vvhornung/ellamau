"use server";

import mongoose from "mongoose";
import { Category } from "@/app/models/Category";
import { Product } from "@/app/models/Product";
import connectDB from "@/app/lib/mongoose";

export async function getVariantOptions(categoryId) {
  await connectDB();

  try {
    const parentCategory = await Category.findById(categoryId);
    if (!parentCategory) {
      console.error("❌ Category not found:", categoryId);
      return { colors: [], sizes: [] };
    }

    // Get subcategories
    const subcategories = await Category.find({ parentCategory: categoryId });
    const categoryIds = [
      new mongoose.Types.ObjectId(categoryId),
      ...subcategories.map((sub) => sub._id),
    ];

    // Find all products in this category and its subcategories
    const products = await Product.find({ category: { $in: categoryIds } });

    // Extract unique variant options
    const colors = new Set();
    const sizes = new Set();

    products.forEach((product) => {
      if (product.variants && Array.isArray(product.variants)) {
        product.variants.forEach((variant) => {
          if (variant.color) colors.add(variant.color);
          if (variant.size) sizes.add(variant.size);
        });
      }
    });

    console.log([...colors], [...sizes]);

    return {
      colors: [...colors].sort(),
      sizes: [...sizes].sort(),
    };
  } catch (error) {
    console.error("🚨 Error fetching variant options:", error);
    return { colors: [], sizes: [] };
  }
}
