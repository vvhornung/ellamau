"use client";
import { useState, useEffect } from "react";
import { getVariantOptions } from "@/app/lib/fetchVariantOptions";

// Cache for variant options by category
const optionsCache = new Map();

export function useVariantOptions(categoryId) {
  const [options, setOptions] = useState({
    colors: [],
    sizes: [],
    isLoading: true
  });

  useEffect(() => {
    const cachedOptions = optionsCache.get(categoryId);
    
    if (cachedOptions) {
      setOptions({
        ...cachedOptions,
        isLoading: false
      });
      return;
    }

    const fetchOptions = async () => {
      try {
        const result = await getVariantOptions(categoryId);
        
        setOptions({
          colors: result.colors,
          sizes: result.sizes,
          isLoading: false
        });
        
        // Cache the results
        optionsCache.set(categoryId, {
          colors: result.colors,
          sizes: result.sizes,
          timestamp: Date.now()
        });
      } catch (error) {
        console.error("Error fetching variant options:", error);
        setOptions(prev => ({
          ...prev,
          isLoading: false
        }));
      }
    };

    fetchOptions();
    
    // Auto-invalidate after 10 minutes
    return () => {
      const cachedItem = optionsCache.get(categoryId);
      if (cachedItem && Date.now() - cachedItem.timestamp > 10 * 60 * 1000) {
        optionsCache.delete(categoryId);
      }
    };
  }, [categoryId]);

  return options;
}
