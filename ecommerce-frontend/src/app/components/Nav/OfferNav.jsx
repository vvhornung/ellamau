import HoverButton from "../shared/HoverButton";
import { StyledOfferNav } from "./styles/OfferNav.styled";
import { Flex } from "./styles/Flex.styled";

function OfferNav() {
  return (
    <StyledOfferNav>
      <Flex gap={"4rem"}>
        <p>Shop Online RIGHT Now AND Enjoy Free Shipping</p>
        <HoverButton>SEE OFFERS</HoverButton>
      </Flex>
    </StyledOfferNav>
  );
}

export default OfferNav;
