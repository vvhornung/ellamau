"use server";
import connectDB from "@/app/lib/mongoose";
import { Product } from "@/app/models/Product";
import { getProductsByCategory } from "@/app/lib/fetchProducts";

export async function getProductData(productId, fullProduct = false) {
  await connectDB();
  const fieldsToSelect = fullProduct
    ? {}
    : {
        variants: 0,
        details: 0,
        description: 0,
        reference: 0,
      };

  const product = await Product.findById(productId).select(fieldsToSelect);
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
