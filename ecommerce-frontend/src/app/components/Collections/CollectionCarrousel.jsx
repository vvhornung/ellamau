import { Container } from "../shared/styles/Container.styled";
import { Flex } from "../shared/styles/Flex.styled";
import CollectionItem from "./CollectionItem";
async function CollectionCarrousel({ bg, items }) {

  console.log(items);

  return (
    <Container>
      <Flex direction={"column"}>
        <h1>Collection Carrousel</h1>
        <Container width="fit-content" $scroll={"true"} $bg={bg}>
          <Flex $justify={"start"} $gap={"0.1rem"}>
            {items.map((item) => (
              <CollectionItem
                key={item.id}
                product={item.product[0]}
                name={item.categoryName}
                $bg={bg}
              />
            ))}
          </Flex>
        </Container>
      </Flex>
    </Container>
  );
}

export default CollectionCarrousel;
