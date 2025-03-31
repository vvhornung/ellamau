"use client";
import { useSearchParams } from "next/navigation";
import { Container } from "@/app/components/shared/styles/Container.styled";
import ProductGrid from "@/app/components/shared/ProductGrid";
import { useSearch, prefetchSearchPage } from "@/app/Hooks/useSearch";
import { useEffect, useState, useMemo } from "react";
import Filters from "@/app/components/Categories/Filters";
import { useRouter } from "next/navigation";

function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  // Extract filter values from URL params for API fetching
  const filters = {
    color: searchParams.get("color") || undefined,
    size: searchParams.get("size") || undefined,
  };

  // Clean up undefined values
  Object.keys(filters).forEach(
    (key) => filters[key] === undefined && delete filters[key]
  );

  // Use our custom hook with search query and filters from URL
  const { products, total, pages, isLoading, isValidating } = useSearch(
    query,
    currentPage,
    6, // limit
    filters
  );

  // State for client-side filters
  const [activeFilters, setActiveFilters] = useState({});

  // Apply client-side filtering to search results
  const filteredProducts = useMemo(() => {
    if (!products || products.length === 0) return [];
    if (!activeFilters.color && !activeFilters.size) return products;

    return products.filter((product) => {
      // For products without variants, they can't be filtered by color/size
      if (!product.variants || product.variants.length === 0) return false;

      // Check if any variant matches all active filters
      return product.variants.some((variant) => {
        let colorMatch =
          !activeFilters.color || variant.color === activeFilters.color;
        let sizeMatch =
          !activeFilters.size || variant.size === activeFilters.size;
        return colorMatch && sizeMatch;
      });
    });
  }, [products, activeFilters]);

  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    // Update client-side filters
    setActiveFilters(newFilters);

    // Reset pagination by updating URL
    const params = new URLSearchParams(searchParams);

    // First, remove all existing filter params to start fresh
    params.delete("color");
    params.delete("size");

    // Then only apply filters that exist in newFilters
    Object.keys(newFilters).forEach((key) => {
      if (newFilters[key]) {
        params.set(key, newFilters[key]);
      }
    });

    // Always reset to page 1 when filters change
    params.set("page", "1");

    // Maintain the search query
    if (query) {
      params.set("q", query);
    }

    // Update URL to reflect new filters and reset page
    router.push(`?${params.toString()}`);
  };

  // Prefetch adjacent pages for faster navigation
  useEffect(() => {
    if (!query) return;

    if (currentPage < pages) {
      prefetchSearchPage(query, currentPage + 1, 6, filters);
    }
    if (currentPage > 1) {
      prefetchSearchPage(query, currentPage - 1, 6, filters);
    }
  }, [query, currentPage, pages, filters]);

  if (!query) {
    return (
      <Container>
        <h1>Search</h1>
        <p>Please enter a search term</p>
      </Container>
    );
  }

  return (
    <Container>
      <h1 style={{ marginBottom: "2rem" }}>
        Search Results for "{query}" {total > 0 && `(${total} results)`}
      </h1>

      {/* Client-side filtering */}
      {!isLoading && products?.length > 0 && (
        <Filters
          products={products}
          onFilterChange={handleFilterChange}
          initialFilters={filters} // Pass current filters to maintain state
        />
      )}

      <ProductGrid
        products={filteredProducts}
        pages={pages}
        isLoading={isLoading}
        isValidating={isValidating}
        currentPage={currentPage}
        emptyMessage={
          filteredProducts.length === 0 && products.length > 0
            ? "No products match the selected filters."
            : "No products found matching your search."
        }
      />
    </Container>
  );
}

export default SearchPage;
