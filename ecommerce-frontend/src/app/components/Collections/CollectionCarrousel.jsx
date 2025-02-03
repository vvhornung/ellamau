import { Container } from "../shared/styles/Container.styled";
import { Flex } from "../shared/styles/Flex.styled";
import CollectionItem from "./CollectionItem";
function CollectionCarrousel({ bg, items }) {
  return (
    <Container>
      <Flex direction={"column"}>
        <h1>Collection Carrousel</h1>
        <Container width="fit-content" $scroll={"true"} $bg={bg}>
          <Flex $justify={"start"} $gap={"0.1rem"}>
            {items.map((item) => (
              <CollectionItem key={item.id} product={item} $bg={bg} />
            ))}
          </Flex>
        </Container>
      </Flex>
    </Container>
  );
}

export default CollectionCarrousel;
