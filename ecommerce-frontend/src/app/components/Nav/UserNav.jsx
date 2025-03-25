'use client'

import { useContext } from "react";
import { StyledUserNav } from "./styles/UserNav.styled";
import { CiUser, CiShoppingCart } from "react-icons/ci";
import { Flex } from "../shared/styles/Flex.styled";
import { Container } from "../shared/styles/Container.styled";
import Link from "next/link";
import { CartContext } from "@/app/contexts/CartContext";
import { CartIconWrapper, CartBadge } from "./styles/CartBadge.styled";

function UserNav() {
  const { cart } = useContext(CartContext);
  const cartCount = cart?.length || 0;
  console.log(cart)

  return (
    <StyledUserNav>
      <Container>
        <Flex $justify={"end"}>
          <Link href={"/cart"}>
            <CartIconWrapper>
              <CiShoppingCart
                size={24}
                fill="black"
                name="Shopping Cart"
                alt="Shopping Cart Icon"
              />
              {cartCount > 0 && <CartBadge>{cartCount}</CartBadge>}
            </CartIconWrapper>
          </Link>
        </Flex>
      </Container>
    </StyledUserNav>
  );
}

export default UserNav;
