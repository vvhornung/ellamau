import { Container } from "@/app/components/shared/styles/Container.styled";
import ProductCarrousel from "@/app/components/Products/ProductCarrousel";
import Grid from "@/app/components/shared/styles/Grid.styled";
import StyledTitle from "@/app/components/shared/styles/Title.styled";
import { StyledDescription } from "@/app/components/Products/styles/Description.styled";
import { Flex } from "@/app/components/shared/styles/Flex.styled";
import connectDB from "@/app/lib/mongoose";
import { Product } from "@/app/models/Product";
import { getProductsByCategory } from "@/app/lib/fetchProducts";

export default async function ProductPage({ params }) {
  await connectDB();
  const product = await Product.findById(params.productId);
  product.img =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvlsk-SALklbJKn7Cq58x3d_TbiXPsWcPjzQ&s";

  const details = product.details[0].split(";");
  const productName = product.name.split("(")[0];

  const products = await getProductsByCategory(product.category, 4, );

  return (
    <Container>
      <Flex $justify="space-between" $gap="2rem" $align="start">
        <Grid>
          <img src={product.img} alt={product.name} />
        </Grid>

        <StyledTitle>
          <Flex direction="column" $gap="1rem" $align="start">
            <h1>
              {" "}
              <strong>Ellamau</strong>
            </h1>

            <h1>{product.name}</h1>

            <Flex $justify="space-between">
              <h1>
                <strong>COP {product.price}</strong>
              </h1>
              <h1>{product.reference}</h1>
            </Flex>

            <StyledDescription>
              <p>{product.description}</p>
            </StyledDescription>

            <h1>
              <strong>Descripcion</strong>
            </h1>
            <ul>
              {details.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>
          </Flex>
        </StyledTitle>
      </Flex>
      <Container>
        <ProductCarrousel border={"card"} items={products} />
      </Container>
    </Container>
  );
}
