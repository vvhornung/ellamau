

import MainNav from "./components/Nav/MainNav";
import OfferNav from "./components/Nav/OfferNav";
import SearchNav from "./components/Nav/SearchNav";
import UserNav from "./components/Nav/UserNav";
import { Flex } from "./components/shared/styles/Flex.styled";
import MobileNav from "./components/Nav/Mobile/MobileNav";
import StyledNav from "./components/Nav/styles/Nav.styled";

import connectDB from "./lib/mongoose";
import { Category } from "./models/Category";
import { isMobile } from "./lib/utils/breakpoints";

async function Nav() {
  await connectDB();
  const categories = await Category.find({ parentCategory: null });


  return (
    <StyledNav>
      <Flex direction={"column"} $gap={"0"}>
        <OfferNav />
        <UserNav />
        <SearchNav />
        <MainNav categories={categories} />
      </Flex>
      <MobileNav
        categories={JSON.parse(JSON.stringify(categories))}
      ></MobileNav>

    </StyledNav>
  );
}

export default Nav;
