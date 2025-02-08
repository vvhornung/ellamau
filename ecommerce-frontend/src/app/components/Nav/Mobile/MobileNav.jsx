import { Flex } from "../../shared/styles/Flex.styled";
import { CiMenuFries, CiUser, CiShoppingCart, CiSearch } from "react-icons/ci";
import Link from "next/link";
import OfferNav from "../OfferNav";
import { StyledMobileNav } from "./styles/MobileNav.styled";
import Logo from "../../shared/Logo";

function MobileNav() {
  return (
    <StyledMobileNav>
      <Flex $gap={"15px"} direction={"column"}>
        <OfferNav />
        <Logo />
        <Flex $justify={"space-around"}>
          {/* <!-- Navigation link to the Lingerie section --> */}
          <CiMenuFries fill="black" name="Menu" alt="Menu Icon" />
          <CiSearch fill="black" name="Search" alt="Search Icon" />
          <Link href="">
            <CiUser fill="black" name="User" alt="User Icon" />
          </Link>

          <Link href="">
            <CiShoppingCart
              fill="black"
              name="Shopping Cart"
              alt="Shopping Cart Icon"
            />
          </Link>
        </Flex>
      </Flex>
    </StyledMobileNav>
  );
}

export default MobileNav;
