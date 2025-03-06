"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Container } from "../shared/styles/Container.styled";
import Grid from "../shared/styles/Grid.styled";
import ProductItem from "../Products/ProductItem";
import Pagination from "../shared/Pagination";
import { getProductsByCategory } from "@/app/lib/fetchProducts";

function ProductSection({ categoryId, initialPage = 1 }) {
  const searchParams = useSearchParams();
  // Use the URL parameter if available, otherwise fall back to initialPage
  const currentPage = parseInt(
    searchParams.get("page") || initialPage.toString(),
    10
  );

  const [productData, setProductData] = useState({
    products: [],
    total: 0,
    pages: 0,
    currentPage: currentPage,
    isLoading: true,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      setProductData((prev) => ({ ...prev, isLoading: true }));

      try {
        const result = await getProductsByCategory(
          categoryId,
          6,
          "",
          false,
          currentPage
        );
        setProductData({
          products: result.products,
          total: result.total,
          pages: result.pages,
          currentPage: result.currentPage,
          isLoading: false,
        });
      } catch (error) {
        console.error("Error fetching products:", error);
        setProductData((prev) => ({ ...prev, isLoading: false }));
      }
    };

    fetchProducts();
  }, [categoryId, currentPage]);

  return (
    <Container>
      <h1>Recomendados</h1>

      {productData.isLoading ? (
        <div>Loading products...</div>
      ) : productData.products?.length === 0 ? (
        <p>No hay productos disponibles.</p>
      ) : (
        <>
          <Grid $columns={4} $gap="1rem">
            <div style={{ gridColumn: "span 2" }}></div>
            {productData.products?.map((product) => (
              <ProductItem
                key={product._id}
                product={product}
                $border={"card"}
              />
            ))}
          </Grid>

          <Pagination
            currentPage={productData.currentPage}
            totalPages={productData.pages}
          />
        </>
      )}
    </Container>
  );
}

export default ProductSection;
