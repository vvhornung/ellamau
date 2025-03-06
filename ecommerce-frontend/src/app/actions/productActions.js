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


export async function getVariantData(productId, variantId) {
  try {
    await connectDB();

    // Find the product by ID
    const product = await Product.findById(productId);

    if (!product) {
      throw new Error("Product not found");
    }

    // Find the specific variant within the product
    const variant = product.variants.id(variantId);

    if (!variant) {
      throw new Error("Variant not found");
    }

    // Return both product and variant information
    return {
      variant: JSON.parse(JSON.stringify(variant)),
    };
  } catch (error) {
    console.error("Error fetching variant data:", error);
    throw error;
  }
}


