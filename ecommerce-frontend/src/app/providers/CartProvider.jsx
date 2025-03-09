"use client";
import { useEffect, useState } from "react";
import { CartContext } from "../contexts/CartContext";

export function CartProvider({ children }) {
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
    const cartId = selectedVariants
      ? `${product._id}-${JSON.stringify(selectedVariants)}`
      : product._id;

    setCartProducts((prev) => {
      const existingProduct = prev.find((item) => item.cartId === cartId);

      if (existingProduct) {
        return prev.map((item) =>
          item.cartId === cartId
            ? {
                ...item,
                quantity: Math.min(
                  item.quantity + quantity,
                  selectedVariants?.stock || product.stock
                ),
              }
            : item
        );
      }

      // Only include essential product information
      const cartProduct = {
        _id: product._id,
        cartId,
        name: product.name,
        reference: product.reference,
        price: product.price,
        image: product.images[0],
        quantity,
      };

      // Add variant information if selected
      if (selectedVariants) {
        cartProduct.selectedVariants = {
          color: selectedVariants.color,
          size: selectedVariants.size,
          stock: selectedVariants.stock,
        };
      }

      return [...prev, cartProduct];
    });
  }

  function updateQuantity(productId, newQuantity) {
    if (newQuantity < 1) return;

    setCartProducts((prev) =>
      prev.map((item) =>
        item._id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  }

  function removeFromCart(productId) {
    setCartProducts((prev) => {
      const newCart = prev.filter((item) => item._id !== productId);
      if (newCart.length === 0) {
        localStorage.removeItem("cart");
      }
      return newCart;
    });
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
