"use client";
import { useContext } from "react";
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
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);

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
                        Shopping Bag  <span>{validCartItems.length} {validCartItems.length > 1 ?  'items' : 'item'} </span>
                    </CartTitle>
            {validCartItems.map((item, index) => (
              <CartItem
                key={`${item.product._id || "unknown"}-${
                  item.variant?._id || index
                }`}
                item={item}
              />
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
