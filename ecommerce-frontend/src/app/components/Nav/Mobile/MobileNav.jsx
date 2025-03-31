"use client";

import { useContext, useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Flex } from "../../shared/styles/Flex.styled";
import { CiMenuFries, CiShoppingCart, CiSearch } from "react-icons/ci";

import Link from "next/link";
import {
  StyledMobileNav,
  OverlayScreen,
  CloseButton,
  SearchOverlay,
  SearchForm,
  SearchInput,
} from "./styles/MobileNav.styled";
import Logo from "../../shared/Logo";
import { CartContext } from "@/app/contexts/CartContext";
import { CartIconWrapper, CartBadge } from "../styles/CartBadge.styled";
import { IoClose } from "react-icons/io5";

function MobileNav({ categories = [] }) {
  const { cart } = useContext(CartContext);
  const cartCount = cart?.length || 0;
  const router = useRouter();
  const searchInputRef = useRef(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    // Focus the search input when search overlay opens
    if (!isSearchOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  // Control body scroll when menu or search is open
  useEffect(() => {
    if (isMenuOpen || isSearchOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen, isSearchOpen]);

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
          <CiSearch
            fill="black"
            name="Search"
            alt="Search Icon"
            onClick={toggleSearch}
          />

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

      {/* Menu Overlay */}
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

      {/* Search Overlay */}
      <SearchOverlay className={isSearchOpen ? "open" : ""}>
        <CloseButton onClick={toggleSearch}>
          <IoClose size={24} />
        </CloseButton>

        <SearchForm onSubmit={handleSearchSubmit}>
          <SearchInput
            ref={searchInputRef}
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" aria-label="Search">
            <CiSearch size={24} fill="black" />
          </button>
          
        </SearchForm>
      </SearchOverlay>
    </StyledMobileNav>
  );
}

export default MobileNav;
