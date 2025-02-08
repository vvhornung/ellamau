

import MainNav from "./components/Nav/MainNav";
import OfferNav from "./components/Nav/OfferNav";
import SearchNav from "./components/Nav/SearchNav";
import UserNav from "./components/Nav/UserNav";
import { Flex } from "./components/shared/styles/Flex.styled";
import MobileNav from "./components/Nav/Mobile/MobileNav";
import StyledNav from "./components/Nav/styles/Nav.styled";



function Nav() {
  const isMobile = false;

  return (
    <StyledNav>
      {!isMobile ? (
        <Flex direction={"column"} $gap={"0"}>
          <OfferNav />
          <UserNav />
          <SearchNav />
          <MainNav />
        </Flex>
      ) : (
        <MobileNav></MobileNav>
      )}
    </StyledNav>
  );
}

export default Nav;
