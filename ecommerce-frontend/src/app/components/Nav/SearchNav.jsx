import { Flex } from "../shared/styles/Flex.styled";
import RegionSelector from "./RegionSelector";
import Logo from "../shared/Logo";
import SearchBar from "../shared/SearchBar";
import { Container } from "../shared/styles/Container.styled";

function SearchNav() {
  return (
    <Container width={"90%"}>
      <Flex $justify={"space-between"}>
        <RegionSelector />
        <Logo />
        <SearchBar />
      </Flex>
    </Container>
  );
}

export default SearchNav;
