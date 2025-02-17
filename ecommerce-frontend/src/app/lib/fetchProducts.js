import mongoose from "mongoose";
import { Category } from "@/app/models/Category";
import { Product } from "@/app/models/Product";
import connectDB from "@/app/lib/mongoose";
import serialize from "../utils/serializer";

export async function getProductsByCategory(categoryId, limit = 6, filterId='') {
  await connectDB();

  try {
    // 1️⃣ Find the parent category
    const parentCategory = await Category.findById(categoryId);
    if (!parentCategory) {
      console.error("❌ Category not found:", categoryId);
      return [];
    }

    // 2️⃣ Get all subcategories that have this category as parent
    const subcategories = await Category.find({ parentCategory: categoryId });

    // 3️⃣ Extract category IDs (parent + subcategories)
    const categoryIds = [
      new mongoose.Types.ObjectId(categoryId),
      ...subcategories.map((sub) => sub.id),
    ];

    // 4️⃣ Query products that belong to any of these categories
    const products = await Product.find({
      category: { $in: categoryIds },
      ...(filterId && { _id: { $ne: filterId } })
    }).limit(limit);

    products.forEach((product) => {
      product.img =
        "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg";
    });



    return serialize(products);
  } catch (error) {
    console.error("🚨 Error fetching products:", error);
    return [];
  }
}


