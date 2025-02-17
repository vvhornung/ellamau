import mongoose from "mongoose";
import { Container } from "../shared/styles/Container.styled";
import  Grid  from "../shared/styles/Grid.styled";
import ProductItem from "../Products/ProductItem";
import connectDB from "@/app/lib/mongoose";
import { Category } from "@/app/models/Category";
import { Product } from "@/app/models/Product";
import { getProductsByCategory } from "@/app/lib/fetchProducts";

async function ProductSection({ categoryId }) {
  await connectDB();
  const products = await getProductsByCategory(categoryId, 6);

  return (
    <Container>
      <h1>Recomendados</h1>
      <Grid $columns={4} $gap="1rem">
        <div style={{ gridColumn: "span 2" }}></div>
        {products?.length === 0 ? (
          <p>No hay productos disponibles.</p>
        ) : (
          products?.map((product) => (
            <ProductItem key={product._id} product={product} $border={"card"} />
          ))
        )}
      </Grid>
    </Container>
  );
}

export default ProductSection;
