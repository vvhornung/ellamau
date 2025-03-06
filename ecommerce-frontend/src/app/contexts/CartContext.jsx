"use client";
import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        // Filter out invalid items from saved cart
        const validCart = parsedCart.filter((item) => item && item.product);
        setCart(validCart);
      }
    } catch (error) {
      console.error("Failed to load cart from localStorage:", error);
    }
    setIsInitialized(true);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, isInitialized]);

  const addToCart = (product, variant, quantity) => {
    // Validate that product exists before adding to cart
    if (!product) {
      console.error("Attempted to add undefined product to cart");
      return;
    }

    setCart((prevCart) => {
      // Check if product (and variant if applicable) is already in cart
      const existingItemIndex = prevCart.findIndex(
        (item) =>
          item.product?._id === product._id &&
          (!variant || item.variant?._id === variant?._id)
      );

      if (existingItemIndex !== -1) {
        // Update quantity of existing item
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += quantity;
        return updatedCart;
      } else {
        // Add new item
        return [...prevCart, { product, variant, quantity }];
      }
    });
  };

  const updateQuantity = (productId, variantId, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (
          item.product?._id === productId &&
          (!variantId || item.variant?._id === variantId)
        ) {
          return {
            ...item,
            quantity: Math.min(
              newQuantity,
              item.variant?.stock || item.product?.stock
            ),
          };
        }
        return item;
      })
    );
  };

  const removeFromCart = (productId, variantId) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) =>
          !(
            item.product?._id === productId &&
            (!variantId || item.variant?._id === variantId)
          )
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      // Add null check for product
      if (!item.product) return total;
      return total + (item.product.price || 0) * (item.quantity || 1);
    }, 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + (item.quantity || 0), 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
