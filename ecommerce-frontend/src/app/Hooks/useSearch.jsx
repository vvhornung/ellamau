"use client";
import { useState, useEffect, useMemo } from "react";
import { searchProducts } from "@/app/lib/fetchProducts";

export function useSearch(query, page = 1, limit = 6, filters = {}) {
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
    if (!query) {
      setState({
        products: [],
        total: 0,
        pages: 0,
        isLoading: false,
        isValidating: false,
      });
      return;
    }

    let isMounted = true;
    const fetchData = async () => {
      if (!isMounted) return;

      setState((prevState) => ({
        ...prevState,
        isLoading: true,
        isValidating: true,
      }));

      try {
        const result = await searchProducts(query, limit, page, filters);

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
        console.error("Error searching products:", error);
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
  }, [query, page, limit, filtersString]);

  return state;
}

export async function prefetchSearchPage(query, page, limit = 6, filters = {}) {
  return searchProducts(query, limit, page, filters).then((result) => result);
}
