"use client";
import { IoClose } from "react-icons/io5";
import { useContext } from "react";
import Image from "next/image";
import { CartContext } from "@/app/contexts/CartContext";
import {
  CartItemContainer,
  ProductInfo,
  ProductImage,
  ProductDetails,
  ProductName,
  ProductPrice,
  ProductVariant,
  QuantityControls,
  RemoveButton,
  CartTitle,
EllamauName,
} from "./styles/CartItem.styled";
import { Flex } from "../shared/styles/Flex.styled";

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useContext(CartContext);

  // Safety check for invalid items
  if (!item || !item.product) {
    return null;
  }

  const { product, variant, quantity } = item;

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantity(product._id, variant?._id, newQuantity);
  };

  const handleRemove = () => {
    removeFromCart(product._id, variant?._id);
  };

  // Determine the image source with fallback
  const imageSrc = product.images?.[0] || "/images/placeholder-product.jpg";

  return (
    <CartItemContainer>
      <ProductDetails>
        <Image
          src={imageSrc}
          alt={product.name || "Product"}
          width={300}
          height={350}
          style={{ objectFit: "cover" }}
        />

        <QuantityControls>
          <p>Qty</p>
          <button
            className="qty-selector"
            onClick={() => handleQuantityChange(quantity - 1)}
          >
            -
          </button>
          <span>{quantity}</span>
          <button
            className="qty-selector"
            onClick={() => handleQuantityChange(quantity + 1)}
          >
            +
          </button>
        </QuantityControls>
      </ProductDetails>

      <ProductInfo>
        <ProductDetails>
          <Flex $justify={"space-between"}>
            <EllamauName>Ellamau</EllamauName>
            <RemoveButton onClick={handleRemove}>
              <IoClose />
            </RemoveButton>
          </Flex>
          <ProductName>{product.name || "Unknown Product"}</ProductName>
          {variant && <ProductVariant>{variant.name}</ProductVariant>}
          <ProductPrice>${product.price?.toFixed(2) || "0.00"}</ProductPrice>
        </ProductDetails>
      </ProductInfo>
    </CartItemContainer>
  );
}
