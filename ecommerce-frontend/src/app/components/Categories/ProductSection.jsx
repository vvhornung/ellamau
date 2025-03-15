"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Container } from "../shared/styles/Container.styled";
import Grid from "../shared/styles/Grid.styled";
import ProductItem from "../Products/ProductItem";
import Pagination from "../shared/Pagination";
import { useProducts, prefetchCategoryPage } from "@/app/Hooks/useProducts";

function ProductSection({ categoryId, initialPage = 1 }) {
  const searchParams = useSearchParams();
  // Use the URL parameter if available, otherwise fall back to initialPage
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
  const { products, total, pages, isLoading, isValidating } = useProducts(
    categoryId,
    currentPage,
    6, // limit
    filters // Pass extracted filters
  );

  // Prefetch adjacent pages for faster navigation
  useEffect(() => {
    // Pass the same filters to prefetch
    if (currentPage < pages) {
      prefetchCategoryPage(categoryId, currentPage + 1, 6, filters);
    }
    if (currentPage > 1) {
      prefetchCategoryPage(categoryId, currentPage - 1, 6, filters);
    }
  }, [categoryId, currentPage, pages, filters]);

  return (
    <Container>
      <h1>Recomendados</h1>

      {isLoading ? (
        <div
          style={{ display: "flex", justifyContent: "center", padding: "3rem" }}
        >
          Loading...
        </div>
      ) : products?.length === 0 ? (
        <p>No hay productos disponibles.</p>
      ) : (
        <>
          <Grid $columns={4} $gap="1rem">
            <div style={{ gridColumn: "span 2" }}></div>
            {products?.map((product) => (
              <ProductItem
                key={product._id}
                product={product}
                $border={"card"}
              />
            ))}
          </Grid>

          {isValidating && (
            <div
              style={{ textAlign: "center", padding: "10px", color: "#888" }}
            >
              Updating products...
            </div>
          )}

          <Pagination currentPage={currentPage} totalPages={pages} />
        </>
      )}
    </Container>
  );
}

export default ProductSection;
