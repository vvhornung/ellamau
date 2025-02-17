import mongoose from "mongoose";
import { Category } from "@/app/models/Category";
import { Product } from "@/app/models/Product";
import connectDB from "@/app/lib/mongoose";
import serialize from "../utils/serializer";

export async function getProductsByCategory(
  categoryId,
  limit = 6,
  filterId = "",
  fullProduct = false
) {
  await connectDB();

  try {
    const parentCategory = await Category.findById(categoryId);
    if (!parentCategory) {
      console.error("❌ Category not found:", categoryId);
      return [];
    }

    const subcategories = await Category.find({ parentCategory: categoryId });
    const categoryIds = [
      new mongoose.Types.ObjectId(categoryId),
      ...subcategories.map((sub) => sub.id),
    ];

    // Select only necessary fields when not requesting full product
    const fieldsToSelect = fullProduct
      ? {}
      : {
          variants: 0,
          details: 0,
          description: 0,
          reference: 0,
        };

    const products = await Product.find({
      category: { $in: categoryIds },
      ...(filterId && { _id: { $ne: filterId } }),
    })
      .select(fieldsToSelect)
      .limit(limit);

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
