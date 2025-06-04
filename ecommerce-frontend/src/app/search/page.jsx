"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Container } from "@/app/components/shared/styles/Container.styled";
import ProductGrid from "@/app/components/shared/ProductGrid";
import { useSearch } from "@/app/Hooks/useProducts";
import { useState } from "react";
import Filters from "@/app/components/Categories/Filters";
import { useRouter } from "next/navigation";

// Create a content component that uses useSearchParams
function SearchContent() {
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
  const { data, isLoading, isFetching } = useSearch(
    query,
    currentPage,
    6,
    filters
  );

  // State for client-side filters
  const [activeFilters, setActiveFilters] = useState({});

  return (
    <Container>
      <Filters
        activeFilters={activeFilters}
        setActiveFilters={setActiveFilters}
        categoryId={null}
      />
      <ProductGrid
        products={data?.products || []}
        pages={data?.pages || 0}
        isLoading={isLoading}
        isValidating={isFetching}
        currentPage={currentPage}
        emptyMessage="No products found."
        paginationThreshold={0}
      >
        <h1 style={{ marginBottom: "2rem" }}>
          {query ? `SEARCH RESULTS FOR "${query.toUpperCase()}"` : "SEARCH"}
        </h1>
      </ProductGrid>
    </Container>
  );
}

// Main search page component with Suspense boundary
export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchContent />
    </Suspense>
  );
}
