"use client";

import { Container } from "./components/shared/styles/Container.styled";
import { Flex } from "./components/shared/styles/Flex.styled";
import SocialMedia from "./components/shared/SocialMedia";
import { Footer as StyledFooter } from "./components/shared/styles/Footer.styled";
import ActionButton from "./components/shared/styles/ActionButton.styled";

function Footer() {
  return (
    <footer>
      <StyledFooter>
        <Container width={"fit-content"}>
          <Flex direction={"column"}>
            <ActionButton $primaryColor={"black"} $secondarycolor={"white"}>
              FOLLOW US TO STAY INFORMED
            </ActionButton>
            <SocialMedia />
          </Flex>
        </Container>

        <Container width={"fit-content"}>
          <Flex direction={"column"} $align={"start"} $gap={"0.5rem"}>
            <h3>Sections</h3>
            <ul>
              <li>
                <a href="#">Lingerie</a>
              </li>
              <li>
                <a href="#">Swimwear</a>
              </li>
              <li>
                <a href="#">Sportswear</a>
              </li>
              <li>
                <a href="#">Beauty</a>
              </li>
            </ul>
          </Flex>
        </Container>

        <Container width={"fit-content"}>
          <Flex direction={"column"} $align={"start"} $gap={"0.5rem"}>
            <h3>Orders</h3>
            <ul>
              <li>
                <a href="#">Payment Information</a>
              </li>
              <li>
                <a href="#">Shipping Information</a>
              </li>
              <li>
                <a href="#">Return Policy</a>
              </li>
            </ul>
          </Flex>
        </Container>
      </StyledFooter>
    </footer>
  );
}

export default Footer;
