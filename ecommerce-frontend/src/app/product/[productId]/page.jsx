import { Container } from "@/app/components/shared/styles/Container.styled";
import ProductCarrousel from "@/app/components/Products/ProductCarrousel";
import Grid from "@/app/components/shared/styles/Grid.styled";
import { Flex } from "@/app/components/shared/styles/Flex.styled";
import ProductDetails from "@/app/components/Products/ProductDetails";
import { getProductData } from "@/app/actions/productActions";



export default async function ProductPage({ params }) {
  const { productId } = params;
  const { product, relatedProducts } = await getProductData(productId, true);


  return (
    <Container>
      <Flex $justify="space-between" $gap="2rem" $align="start">
        <Grid>
          <img src={product.images[0]} alt={product.name} />
        </Grid>
        <ProductDetails product={product} />
      </Flex>
      <Container>
        <ProductCarrousel border={"card"} items={relatedProducts.products} />
      </Container>
    </Container>
  );
}
