import mongoose from "mongoose";
import { Category } from "@/app/models/Category";
import { Product } from "@/app/models/Product";
import connectDB from "@/app/lib/mongoose";

export async function getProductsByCategory(categoryId, limit = 6, name='') {
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
      ...subcategories.map((sub) => sub._id),
    ];

    // 4️⃣ Query products that belong to any of these categories
    const products = await Product.find({
      category: { $in: categoryIds },
    }).limit(limit);

    products.forEach((product) => {
      product.img =
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvlsk-SALklbJKn7Cq58x3d_TbiXPsWcPjzQ&s";
    });

    if(name){
      return products.filter(product => product.name.toLowerCase().includes(name.toLowerCase()));
    }

    return products;
  } catch (error) {
    console.error("🚨 Error fetching products:", error);
    return [];
  }
}
