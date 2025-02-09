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
  const { productId } = await params;
  await connectDB();
  const product = await Product.findById(productId);

  product.img =
    "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg";

  const details = product?.details[0]?.split(";");
  const productName = product.name;

  const products = await getProductsByCategory(product.category, 4);

  return (
    <Container>
      <Flex $justify="space-between" $gap="2rem" $align="start">
        <Grid>
          <img src={product.img} alt={productName} />
        </Grid>

        <StyledTitle>
          <Flex direction="column" $gap="1rem" $align="start">
            <h1>
              {" "}
              <strong>Ellamau</strong>
            </h1>

            <h1>{productName}</h1>

            <Flex $justify="space-between">
              <h1>
                <strong>COP {product.price}</strong>
              </h1>
              <h1>{product.reference}</h1>
            </Flex>

            <StyledDescription>
              <p>{product.description}</p>
            </StyledDescription>

            {details &&
              details.map((detail, index) => (
                <>
                  <h1>
                    <strong>Details</strong>
                  </h1>
                  <ul>
                    <li key={index}>{detail}</li>
                  </ul>
                </>
              ))}
          </Flex>
        </StyledTitle>
      </Flex>
      <Container>
        <ProductCarrousel border={"card"} items={products} />
      </Container>
    </Container>
  );
}
