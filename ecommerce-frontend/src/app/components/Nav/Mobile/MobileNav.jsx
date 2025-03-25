"use client";

import { useContext, useState, useEffect } from "react";
import { Flex } from "../../shared/styles/Flex.styled";
import { CiMenuFries, CiUser, CiShoppingCart, CiSearch } from "react-icons/ci";
import Link from "next/link";
import {
  StyledMobileNav,
  OverlayScreen,
  CloseButton,
} from "./styles/MobileNav.styled";
import Logo from "../../shared/Logo";
import { CartContext } from "@/app/contexts/CartContext";
import { CartIconWrapper, CartBadge } from "../styles/CartBadge.styled";
import { IoClose } from "react-icons/io5";

function MobileNav({ categories = [] }) {
  const { cart } = useContext(CartContext);
  const cartCount = cart?.length || 0;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Control body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

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

          <Link href="/cart">
            <CartIconWrapper>
              <CiShoppingCart
                size={24}
                fill="black"
                name="Shopping Cart"
                alt="Shopping Cart Icon"
              />
              {cartCount > 0 && (
                <CartBadge className="mobile">{cartCount}</CartBadge>
              )}
            </CartIconWrapper>
          </Link>
        </Flex>
      </Flex>

      {/* Apply the "open" class conditionally to trigger the slide animation */}

      <OverlayScreen className={isMenuOpen ? "open" : ""}>
        <CloseButton onClick={toggleMenu}>
          <IoClose size={24} />
        </CloseButton>

        {categories?.map((category) => (
          <Link
            key={category._id}
            href={`/category/${encodeURIComponent(category.name)}`}
            passHref
            onClick={toggleMenu}
          >
            {category.name}
          </Link>
        ))}
      </OverlayScreen>
    </StyledMobileNav>
  );
}

export default MobileNav;
