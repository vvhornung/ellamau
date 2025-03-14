import { useState, useEffect } from "react";
import { getProductsByCategory } from "@/app/lib/fetchProducts";

// Cache for storing products by category and page
const productCache = {};

// Initial state
const initialState = {
  products: [],
  total: 0,
  pages: 0,
  isLoading: true,
  isValidating: false,
  currentPage: 1,
  error: null,
};

export function useProducts(categoryId, page = 1) {
  const [state, setState] = useState(initialState);
  const cacheKey = `${categoryId}-${page}`;

  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      try {
        // First, check if we already have cached data for this page
        if (productCache[cacheKey]) {
          if (isMounted) {
            setState({
              ...productCache[cacheKey],
              isLoading: false,
              isValidating: true, // Still revalidate in background
              currentPage: page,
            });
          }
        } else {
          // No cache - set loading state
          if (isMounted) {
            setState((prev) => ({
              ...prev,
              isLoading: !productCache[cacheKey], // Only show loading if no cache
              currentPage: page,
            }));
          }
        }

        // Fetch fresh data regardless of cache
        const data = await getProductsByCategory(categoryId, 6, null, page);

        // Update cache
        productCache[cacheKey] = {
          products: data.products,
          total: data.total,
          pages: data.pages,
          currentPage: page,
          error: null,
        };

        // Update state if component is still mounted
        if (isMounted) {
          setState({
            products: data.products,
            total: data.total,
            pages: data.pages,
            isLoading: false,
            isValidating: false,
            currentPage: page,
            error: null,
          });
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        if (isMounted) {
          setState((prev) => ({
            ...prev,
            isLoading: false,
            isValidating: false,
            error: error.message || "Error fetching products",
          }));
        }
      }
    };

    fetchProducts();

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, [categoryId, page, cacheKey]); // Add cacheKey to dependencies

  return state;
}

// Function to prefetch the next/previous page
export async function prefetchCategoryPage(categoryId, page) {
  const cacheKey = `${categoryId}-${page}`;

  // Don't prefetch if already cached
  if (productCache[cacheKey]) return;

  try {
    const data = await getProductsByCategory(categoryId, 6, null, page);
    // Store in cache
    productCache[cacheKey] = {
      products: data.products,
      total: data.total,
      pages: data.pages,
      currentPage: page,
      error: null,
    };
  } catch (error) {
    console.error("Error prefetching page:", error);
  }
}