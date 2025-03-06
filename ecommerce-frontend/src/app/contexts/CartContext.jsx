"use client";
import { createContext, useState, useEffect, useCallback } from "react";
import stockService from "../services/StockService";

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

  // Validate stock before critical operations (like checkout)
  const validateCartStock = useCallback(async () => {
    const validatedItems = await stockService.validateCartItems(cart);
    const itemsToRemove = [];
    const itemsToUpdate = [];

    validatedItems.forEach((item) => {
      if (!item.isValid) {
        // Out of stock items to be removed
        itemsToRemove.push(item);
      } else if (item.quantityAdjusted) {
        // Items that need quantity adjustment
        itemsToUpdate.push({
          ...item,
          quantity: item.quantityAdjusted,
        });
      }
    });

    // Update cart if needed
    if (itemsToRemove.length || itemsToUpdate.length) {
      // Remove out-of-stock items
      const newCart = cart.filter(
        (item) =>
          !itemsToRemove.some(
            (i) =>
              i.product?._id === item.product?._id &&
              i.variant?._id === item.variant?._id
          )
      );

      // Update quantities for items that need adjustment
      itemsToUpdate.forEach((updateItem) => {
        const index = newCart.findIndex(
          (item) =>
            item.product?._id === updateItem.product?._id &&
            item.variant?._id === updateItem.variant?._id
        );
        if (index !== -1) {
          newCart[index].quantity = updateItem.quantity;
        }
      });

      setCart(newCart);

 

      return {
        valid: newCart.length > 0,
        removedItems: itemsToRemove,
        updatedItems: itemsToUpdate,
      };
    }

    return { valid: true, removedItems: [], updatedItems: [] };
  }, [cart]);

  // Add to cart with stock validation
  const addToCart = async (product, variant, quantity) => {
    if (!product) {
      console.error("Attempted to add undefined product to cart");
      return { success: false };
    }

    // Check stock before adding
    if (variant?._id) {
      const availableStock = await stockService.getVariantStock(
        product._id,
        variant._id
      );
      if (availableStock < quantity) {
        if (availableStock <= 0) {
          return { success: false, reason: "outOfStock" };
        }
        quantity = availableStock; // Adjust quantity
      }
    }

    setCart((prevCart) => {
      // Check if product is already in cart
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

    return { success: true };
  };

  // Update quantity with stock validation
  const updateQuantity = async (productId, variantId, newQuantity) => {
    if (newQuantity <= 0) return;

    // Validate stock before updating
    const availableStock = await stockService.getVariantStock(
      productId,
      variantId
    );
    if (newQuantity > availableStock) {
      newQuantity = availableStock;
    }

    setCart((prevCart) =>
      prevCart.map((item) => {
        if (
          item.product?._id === productId &&
          (!variantId || item.variant?._id === variantId)
        ) {
          return {
            ...item,
            quantity: newQuantity,
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

    // Clear cache for this item
    stockService.clearCache(productId, variantId);
  };

  const clearCart = () => {
    setCart([]);
    stockService.clearCache();
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
        validateCartStock,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
