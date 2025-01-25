import { StyledOfferNav } from "./styles/OfferNav.styled";
import { Flex } from "../shared/styles/Flex.styled";
import { Container } from "../shared/styles/Container.styled";
import { ActionButton } from "../shared/styles/ActionButton.styled";

function OfferNav() {
  return (
    <StyledOfferNav>
      <Container>
        <Flex gap={"4rem"}>
          <p>Shop Online RIGHT Now AND Enjoy Free Shipping</p>
          <ActionButton>SEE OFFERS</ActionButton>
        </Flex>
      </Container>
    </StyledOfferNav>
  );
}

export default OfferNav;
