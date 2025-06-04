"use client";

import { useQuery } from "@tanstack/react-query";
import { productService } from "../services/api";

export function useProducts(categoryId, page = 1, limit = 6, filters = {}) {
  return useQuery({
    queryKey: ["products", categoryId, page, limit, filters],
    queryFn: () =>
      productService.getProductsByCategory({
        categoryId,
        page,
        limit,
        filters,
      }),
    staleTime: 1000 * 60 * 5, // 5 minutes
    keepPreviousData: true,
  });
}

export function useSearch(query, page = 1, limit = 6, filters = {}) {
  return useQuery({
    queryKey: ["search", query, page, limit, filters],
    queryFn: () =>
      productService.searchProducts({ query, page, limit, filters }),
    enabled: !!query,
    staleTime: 1000 * 60 * 5, // 5 minutes
    keepPreviousData: true,
  });
}

export function useVariantOptions(categoryId) {
  return useQuery({
    queryKey: ["variantOptions", categoryId],
    queryFn: () => productService.getVariantOptions({ categoryId }),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}

export function useProductData(productId, fullProduct = false) {
  return useQuery({
    queryKey: ["product", productId, fullProduct],
    queryFn: () => productService.getProductData({ productId, fullProduct }),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
