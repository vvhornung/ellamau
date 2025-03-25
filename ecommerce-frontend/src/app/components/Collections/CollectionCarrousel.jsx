
import { Container } from "../shared/styles/Container.styled";
import { Flex } from "../shared/styles/Flex.styled";
import CollectionItem from "./CollectionItem";
async function CollectionCarrousel({ bg, items, title='Collection Carousel' }) {



  items.forEach((item) => {
    item.product.categoryName = item.categoryName;
  }
  );



  return (
    <Container>
      
      <Flex direction={"column"}>
        <h1 className="carrousel-title">{title}</h1>
      
        <Container   $scroll={"true"} $bg={bg}>
          <Flex $justify={"space-around"} $gap={"0.1rem"}>
            {items?.map(({product}) => (
              <CollectionItem key={product['_id']} product={product} bg={bg} />
            ))}

          </Flex>
        </Container>
      </Flex>
    </Container>
  );
}

export default CollectionCarrousel;
