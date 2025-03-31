"use client";
import Grid from "./styles/Grid.styled";
import ProductItem from "../Products/ProductItem";
import Pagination from "./Pagination";
import Spinner from "./Spinner";

export default function ProductGrid({
  products,
  pages,
  isLoading,
  isValidating,
  currentPage,
  emptyMessage = "No products found.",
  columns = 4,
  paginationThreshold = 1, // Show pagination if pages > paginationThreshold
  children, // For any additional content (like header)
}) {
  return (
    <>
      {children}

      {isLoading ? (
        <Spinner />
      ) : products?.length === 0 ? (
        <p>{emptyMessage}</p>
      ) : (
        <>
          <Grid $columns={columns} $gap="1rem">
            <div style={{ gridColumn: "span 2" }}></div>
            {products?.map((product) => (
              <ProductItem
                key={product._id}
                product={product}
                isProductSection
                $border={"card"}
              />
            ))}
          </Grid>

          {isValidating && (
            <div style={{ textAlign: "center", color: "#888" }}>
              <Spinner />
            </div>
          )}

          {pages > paginationThreshold && (
            <Pagination currentPage={currentPage} totalPages={pages} />
          )}
        </>
      )}
    </>
  );
}
