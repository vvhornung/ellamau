"use client";
import { useContext, Fragment, useEffect, useState } from "react";
import { CartContext } from "@/app/contexts/CartContext";
import { Container } from "@/app/components/shared/styles/Container.styled";
import CartItem from "@/app/components/Cart/CartItem";
import CartSummary from "@/app/components/Cart/CartSummary";
import EmptyCart from "@/app/components/Cart/EmptyCart";
import {
  CartContainer,
  CartTitle,
  CartLayout,
  CartItemsSection,
  CartSummarySection,
} from "@/app/components/Cart/styles/CartPage.styled";



export default function CartPage() {
  const { cart } = useContext(CartContext);




  // Filter out invalid cart items
  const validCartItems = cart
    ? cart.filter((item) => item && item.product)
    : [];

  if (!validCartItems || validCartItems.length === 0) {
    return (
      <Container>
        <CartContainer>
          <CartTitle>Your Cart</CartTitle>
          
          <EmptyCart />
        </CartContainer>
      </Container>
    );
  }

  return (
    <Container>
      <CartContainer>
        <CartLayout>
          <CartItemsSection>
            <CartTitle>
              Shopping Bag{" "}
              <p>
                {validCartItems.length}{" "}
                {validCartItems.length > 1 ? "items" : "item"}{" "}
              </p>
            </CartTitle>

      

            {validCartItems.map((item, index) => (
              <Fragment
                key={`${item.product._id || "unknown"}-${
                  item.variant?._id || index
                }`}
              >
                <CartItem item={item} />
                {index < validCartItems.length - 1 && <hr />}
              </Fragment>
            ))}
          </CartItemsSection>

          <CartSummarySection>
            <CartSummary />
          </CartSummarySection>
        </CartLayout>
      </CartContainer>
    </Container>
  );
}
