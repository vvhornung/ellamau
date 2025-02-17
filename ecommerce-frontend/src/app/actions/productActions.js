"use server";
import connectDB from "@/app/lib/mongoose";
import { Product } from "@/app/models/Product";
import { getProductsByCategory } from "@/app/lib/fetchProducts";

export async function getProductData(productId) {
  await connectDB();
  const product = await Product.findById(productId);
  const relatedProducts = await getProductsByCategory(
    product.category,
    4,
    productId
  );

  return {
    product: JSON.parse(JSON.stringify(product)),
    relatedProducts: relatedProducts,
  };
}
