"use client";
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({});

export function CartContextProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("cart");
      if (stored) {
        setCartProducts(JSON.parse(stored));
      }
    }
  }, []);

  useEffect(() => {
    if (cartProducts?.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cartProducts));
    }
  }, [cartProducts]);

  function addToCart(product, selectedVariants = null, quantity = 1) {
    setCartProducts((prev) => {
      const cartId = selectedVariants
        ? `${product._id}-${JSON.stringify(selectedVariants)}`
        : product._id;

      const existingProduct = prev.find((item) => item.cartId === cartId);

      if (existingProduct) {
        return prev.map((item) =>
          item.cartId === cartId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [
        ...prev,
        {
          ...product,
          cartId,
          selectedVariants,
          quantity,
        },
      ];
    });
  }

  async function removeFromCart(productId) {
    setCartProducts((prev) => prev.filter((item) => item._id !== productId));
    if (cartProducts.length === 1) {
      localStorage.removeItem("cart");
    }
  }

  function updateQuantity(productId, newQuantity) {
    setCartProducts((prev) =>
      prev.map((item) =>
        item._id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  }

  function clearCart() {
    setCartProducts([]);
    localStorage.removeItem("cart");
  }

  const cartTotal = cartProducts.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        setCartProducts,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
