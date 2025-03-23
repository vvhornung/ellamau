"use client";
import { useState, useEffect, useMemo } from "react";
import { getProductsByCategory } from "@/app/lib/fetchProducts";

export function useProducts(categoryId, page = 1, limit = 6, filters = {}) {
  // Simplified initial state without cache
  const [state, setState] = useState({
    products: [],
    total: 0,
    pages: 0,
    isLoading: true,
    isValidating: false,
  });

  // Create a stable string representation of filters
  const filtersString = useMemo(() => JSON.stringify(filters), [filters]);

  // Use useEffect with a stable reference for filters
  useEffect(() => {
    // Log to debug the filters values


    let isMounted = true;
    const fetchData = async () => {
      if (!isMounted) return;

      setState((prevState) => ({
        ...prevState,
        isLoading: true,
        isValidating: true,
      }));

      try {
        const result = await getProductsByCategory(
          categoryId,
          limit,
          "",
          false,
          page,
          filters // Use filters directly
        );

        if (!isMounted) return;

        // Update state with fresh data
        setState({
          products: result.products,
          total: result.total,
          pages: result.pages,
          currentPage: result.currentPage,
          isLoading: false,
          isValidating: false,
        });
      } catch (error) {
        console.error("Error fetching products:", error);
        if (isMounted) {
          setState((prev) => ({
            ...prev,
            isLoading: false,
            isValidating: false,
          }));
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [categoryId, page, limit, filtersString]); // Use filtersString instead of dynamic array

  return state;
}

// No changes needed to prefetchCategoryPage function
export async function prefetchCategoryPage(
  categoryId,
  page,
  limit = 6,
  filters = {}
) {

  return getProductsByCategory(
    categoryId,
    limit,
    "",
    false,
    page,
    filters
  ).then((result) => result);
}
