"use client";
import { createContext } from "react";

export const CartContext = createContext({
  cartProducts: [],
  setCartProducts: () => {},
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  cartTotal: 0,
});
