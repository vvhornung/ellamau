import { StyledUserNav } from "./styles/UserNav.styled";
import { CiUser, CiShoppingCart } from "react-icons/ci";
import { Flex } from "../shared/styles/Flex.styled";
import { Container } from "../shared/styles/Container.styled";
import Link from "next/link";

function UserNav() {
  return (
    <StyledUserNav>
      <Container>
      <Flex justify={"end"}>
        <Link href="">
          <CiUser fill="black" name="User" alt="User Icon" />
        </Link>

        <Link href="">
          <CiShoppingCart fill="black" name="Shopping Cart" alt="Shopping Cart Icon" />
        </Link>
      </Flex>
      </Container>
    </StyledUserNav>
  );
}

export default UserNav;
