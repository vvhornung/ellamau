import { Flex } from "../shared/styles/Flex.styled";
import { FilterOption } from "./styles/FilterOption.styled";
import { Container } from "../shared/styles/Container.styled";

function Filters() {
  return (
    <Container>
      <Flex justify={"start"}>
        <h4>Filtrar Por: </h4>
        <Flex width={"fit-content"} gap={"1rem"}>
          <FilterOption>Color</FilterOption>
          <FilterOption>Talla</FilterOption>
          <FilterOption>Marca</FilterOption>
        </Flex>
      </Flex>
    </Container>
  );
}

export default Filters;
