import { Container } from "../shared/styles/Container.styled";
import ProductItem from "./ProductItem";
import { Flex } from "../shared/styles/Flex.styled";

function ProductCarrousel({ $bg, $border, items }) {
  return (
    <Container>
      <Flex direction={"column"}>
        <h1>Product Carrousel</h1>
        <Container $scroll={"true"} $bg={$bg}>
          <Flex $justify={"start"}>
            {items?.map((item) => (
              <ProductItem
                key={item._id}
                product={item}
                $bg={$bg}
                $border={$border}
              />
            ))}
          </Flex>
        </Container>
      </Flex>
    </Container>
  );
}

export default ProductCarrousel;
