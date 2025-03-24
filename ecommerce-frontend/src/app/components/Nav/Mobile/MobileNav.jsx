'use client'

import { useEffect, useState } from "react";
import { Flex } from "../../shared/styles/Flex.styled";
import { CiMenuFries, CiUser, CiShoppingCart, CiSearch } from "react-icons/ci";
import Link from "next/link";
import OfferNav from "../OfferNav";
import { StyledMobileNav, OverlayScreen, CloseButton } from "./styles/MobileNav.styled";
import Logo from "../../shared/Logo";
import useScreenWidth from "@/app/lib/hooks/useScreenWidth";


function  MobileNav({categories}) {


  const [isMenuOpen, setIsMenuOpen] = useState(false);


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };



  return (
    <StyledMobileNav>
      <Flex $gap={"15px"} direction={"column"}>
     
        <Logo />
        <Flex $justify={"space-around"}>
          <CiMenuFries
            fill="black"
            name="Menu"
            alt="Menu Icon"
            onClick={toggleMenu}
          />
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
      {isMenuOpen && (
        <OverlayScreen>
          <CloseButton onClick={toggleMenu}>X</CloseButton>
          <ul>
            {categories?.map((category) => (
              <li key={category._id}>
                <Link href={`/category/${category._id}`} passHref>
                  <button onClick={toggleMenu}>{category.name}</button>
                </Link>
              </li>
            ))}
          </ul>
        </OverlayScreen>
      )}
    </StyledMobileNav>
  );
}

export default MobileNav;
