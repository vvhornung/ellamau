import { StyledUserNav } from "./styles/UserNav.styled";
import { CiUser, CiShoppingCart } from "react-icons/ci";
import { Flex } from "./styles/Flex.styled";
import Link from "next/link";

function UserNav() {
  return (
    <StyledUserNav>
      <Flex justify={"end"}>
        <Link href="">
          <CiUser />
        </Link>

        <Link href="">
          <CiShoppingCart />
        </Link>
      </Flex>
    </StyledUserNav>
  );
}

export default UserNav;
