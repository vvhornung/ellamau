"use client";

import { Flex } from "../shared/styles/Flex.styled";
import RegionSelector from "./RegionSelector";
import Logo from "../shared/Logo";
import SearchBar from "../shared/SearchBar";
import { Container } from "../shared/styles/Container.styled";
import { StyledSearchNav } from "./styles/SearchNav.styled";
import useScreenWidth from "../../lib/hooks/useScreenWidth";

function SearchNav() {




  return (
    <StyledSearchNav>
    <Container width={"90%"}>
      <Flex $justify={"space-between"}>
        <RegionSelector />
        <Logo />
        <SearchBar />
      </Flex>
    </Container>
    </StyledSearchNav>
  );
}

export default SearchNav;
