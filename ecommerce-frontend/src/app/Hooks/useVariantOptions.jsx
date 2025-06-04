"use client";

import { useQuery } from "@tanstack/react-query";
import { productService } from "../services/api";

export function useVariantOptions(categoryId) {
  return useQuery({
    queryKey: ["variantOptions", categoryId],
    queryFn: () => productService.getVariantOptions({ categoryId }),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}
