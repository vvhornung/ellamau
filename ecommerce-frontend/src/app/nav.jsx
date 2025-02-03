"use client";

import styled from "styled-components";
import MainNav from "./components/Nav/MainNav";
import OfferNav from "./components/Nav/OfferNav";
import SearchNav from "./components/Nav/SearchNav";
import UserNav from "./components/Nav/UserNav";
import { Flex } from "./components/shared/styles/Flex.styled";
import MobileNav from "./components/Nav/Mobile/MobileNav";

const StyledNav = styled.div`
  font-size: 10px;
  background-color: white;
  width: 100%;
  position: sticky;
  z-index: 10;
  top: 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

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
