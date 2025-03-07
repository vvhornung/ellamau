"use client";
import { useState, useEffect } from "react";
import { getProductsByCategory } from "@/app/lib/fetchProducts";

// In-memory cache for products by category and page
const productCache = new Map();

export function useProducts(categoryId, page = 1, limit = 6, filters = {}) {
  const [state, setState] = useState({
    products: [],
    total: 0,
    pages: 0,
    currentPage: page,
    isLoading: true,
    isValidating: false,
  });

  // Generate a cache key based on category, page, and filters
  const filtersKey = Object.entries(filters)
    .filter(([_, value]) => value)
    .map(([key, value]) => `${key}-${value}`)
    .join('_');
    
  const cacheKey = `${categoryId}-${page}-${limit}-${filtersKey}`;

  useEffect(() => {
    // Check if we have cached data
    const cachedData = productCache.get(cacheKey);

    // If we have cached data, use it immediately
    if (cachedData) {
      setState({
        ...cachedData,
        isLoading: false,
        isValidating: true, // Still validate in background
      });
    } else {
      // If no cached data, show loading state
      setState((prev) => ({
        ...prev,
        isLoading: true,
        currentPage: page,
      }));
    }

    // Fetch data (either for first load or revalidation)
    const fetchData = async () => {
      try {
        const result = await getProductsByCategory(
          categoryId,
          limit,
          "",
          false,
          page,
          filters
        );

        // Update state with fresh data
        setState({
          products: result.products,
          total: result.total,
          pages: result.pages,
          currentPage: result.currentPage,
          isLoading: false,
          isValidating: false,
        });

        // Update cache
        productCache.set(cacheKey, {
          products: result.products,
          total: result.total,
          pages: result.pages,
          currentPage: result.currentPage,
          timestamp: Date.now(),
        });
      } catch (error) {
        console.error("Error fetching products:", error);
        setState((prev) => ({
          ...prev,
          isLoading: false,
          isValidating: false,
        }));
      }
    };

    fetchData();

    // Auto-invalidation after 5 minutes
    const intervalId = setInterval(() => {
      const cachedItem = productCache.get(cacheKey);
      if (cachedItem && Date.now() - cachedItem.timestamp > 5 * 60 * 1000) {
        productCache.delete(cacheKey);
      }
    }, 60 * 1000); // Check every minute

    return () => clearInterval(intervalId);
  }, [categoryId, page, limit,  filters, cacheKey]);

  // Method to manually invalidate cache
  const invalidateCache = () => {
    // Clear specific page
    productCache.delete(cacheKey);

    // Or clear entire category
    for (const key of productCache.keys()) {
      if (key.startsWith(`${categoryId}-`)) {
        productCache.delete(key);
      }
    }
  };

  return {
    ...state,
    invalidateCache,
  };
}

// Function to prefetch next/prev pages
export function prefetchCategoryPage(categoryId, page, limit = 6, filters = {}) {
  const filtersKey = Object.entries(filters)
    .filter(([_, value]) => value)
    .map(([key, value]) => `${key}-${value}`)
    .join('_');
  
  const cacheKey = `${categoryId}-${page}-${limit}-${filtersKey}`;

  // If already in cache, don't refetch
  if (productCache.has(cacheKey)) return Promise.resolve();

  return getProductsByCategory(categoryId, limit, "", false, page, filters).then(
    (result) => {
      productCache.set(cacheKey, {
        products: result.products,
        total: result.total,
        pages: result.pages,
        currentPage: result.currentPage,
        timestamp: Date.now(),
      });
      return result;
    }
  );
}

export function prefetchProductPage(productId) {}
