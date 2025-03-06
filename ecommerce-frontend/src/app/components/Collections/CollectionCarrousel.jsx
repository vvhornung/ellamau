
import { Container } from "../shared/styles/Container.styled";
import { Flex } from "../shared/styles/Flex.styled";
import CollectionItem from "./CollectionItem";
async function CollectionCarrousel({ bg, items }) {



  items.forEach((item) => {
    item.product.categoryName = item.categoryName;
  }
  );



  return (
    <Container>
      <Flex direction={"column"}>
        <h1>Collection Carrousel</h1>
        <Container width="fit-content" $scroll={"true"} $bg={bg}>
          <Flex $justify={"start"} $gap={"0.1rem"}>
            {items?.map(({product}) => (
              <CollectionItem key={product.products[0]['_id']} product={product} bg={bg} />
            ))}

          </Flex>
        </Container>
      </Flex>
    </Container>
  );
}

export default CollectionCarrousel;
