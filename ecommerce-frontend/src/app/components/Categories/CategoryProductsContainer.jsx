"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Container } from "../shared/styles/Container.styled";
import ProductGrid from "../shared/ProductGrid";
import { useProducts } from "@/app/Hooks/useProducts";

// This component uses useSearchParams and will be wrapped in Suspense
function CategoryProductsContent({
  categoryId,
  initialPage = 1,
  categoryName,
}) {
  const searchParams = useSearchParams();
  const currentPage = parseInt(
    searchParams.get("page") || initialPage.toString(),
    10
  );

  // Extract filter values from URL params
  const filters = {
    color: searchParams.get("color") || undefined,
    size: searchParams.get("size") || undefined,
    // Add any other filters here
  };

  // Clean up undefined values
  Object.keys(filters).forEach(
    (key) => filters[key] === undefined && delete filters[key]
  );

  // Use our custom hook with filters from URL
  const { data, isLoading, isFetching } = useProducts(
    categoryId,
    currentPage,
    6, // limit
    filters
  );

  return (
    <ProductGrid
      products={data?.products || []}
      pages={data?.pages || 0}
      isLoading={isLoading}
      isValidating={isFetching}
      currentPage={currentPage}
      emptyMessage="No products available."
      paginationThreshold={0}
    >
      <h1 style={{ marginBottom: "2rem" }}>
        {categoryName
          ? `${categoryName.toUpperCase()} PRODUCTS`
          : "RECOMMENDED"}
      </h1>
    </ProductGrid>
  );
}

// Main container component with Suspense boundary
function CategoryProductsContainer(props) {
  return (
    <Container>
      <Suspense fallback={<div>Loading products...</div>}>
        <CategoryProductsContent {...props} />
      </Suspense>
    </Container>
  );
}

export default CategoryProductsContainer;
