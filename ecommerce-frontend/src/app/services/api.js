import { getProductsByCategory, searchProducts } from "@/app/lib/fetchProducts";
import { getVariantOptions } from "@/app/lib/fetchVariantOptions";
import { getProductData } from "@/app/actions/productActions";

export const productService = {
  getProductsByCategory: async ({
    categoryId,
    page = 1,
    limit = 6,
    filters = {},
  }) => {
    return getProductsByCategory(categoryId, limit, "", false, page, filters);
  },

  searchProducts: async ({ query, page = 1, limit = 6, filters = {} }) => {
    return searchProducts(query, limit, page, filters);
  },

  getVariantOptions: async ({ categoryId }) => {
    return getVariantOptions(categoryId);
  },

  getProductData: async ({ productId, fullProduct = false }) => {
    return getProductData(productId, fullProduct);
  },
};
