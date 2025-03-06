"use server"

import mongoose from "mongoose";
import { Category } from "@/app/models/Category";
import { Product } from "@/app/models/Product";
import connectDB from "@/app/lib/mongoose";
import serialize from "../utils/serializer";

export async function getProductsByCategory(
  categoryId,
  limit = 6,
  filterId = "",
  fullProduct = false,
  page = 1
) {
  
  await connectDB();

  try {
    const parentCategory = await Category.findById(categoryId);
    if (!parentCategory) {
      console.error("❌ Category not found:", categoryId);
      return { products: [], total: 0, pages: 0 };
    }

    const subcategories = await Category.find({ parentCategory: categoryId });
    const categoryIds = [
      new mongoose.Types.ObjectId(categoryId),
      ...subcategories.map((sub) => sub.id),
    ];

    // Calculate skip value for pagination
    const skip = (page - 1) * limit;

    // Select only necessary fields when not requesting full product
    const fieldsToSelect = fullProduct
      ? {}
      : {
          variants: 0,
          details: 0,
          description: 0,
          reference: 0,
        };

    // Query filter
    const filter = {
      category: { $in: categoryIds },
      ...(filterId && { _id: { $ne: filterId } }),
    };

    // Get total count for pagination
    const total = await Product.countDocuments(filter);
    
    // Calculate total pages
    const pages = Math.ceil(total / limit);

    // Get products for current page
    const products = await Product.find(filter)
      .select(fieldsToSelect)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }); // Sort by newest first

    products.forEach((product) => {
      product.img =
        "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg";
    });

    // Return pagination data along with products
    return {
      products: serialize(products),
      total,
      pages,
      currentPage: page
    };
  } catch (error) {
    console.error("🚨 Error fetching products:", error);
    return { products: [], total: 0, pages: 0, currentPage: page };
  }
}
