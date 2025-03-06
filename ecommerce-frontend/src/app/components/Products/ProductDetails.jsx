"use client";
import { useContext, useState } from "react";
import { CartContext } from "@/app/contexts/CartContext";
import { Flex } from "../shared/styles/Flex.styled";
import { StyledDescription } from "./styles/Description.styled";
import { SoldOutBanner } from "./styles/SoldOutBanner.styled";
import ProductVariantSelector from "./ProductVariantSelector";
import AddToCartButton from "./AddToCartButton";
import QuantitySelector from "./QuantitySelector";
import StyledProduct from "../shared/styles/Title.styled";

export default function ProductDetails({ product }) {
  const { addToCart } = useContext(CartContext);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const details = product?.details[0]?.split(";");

  // Check if product is sold out (all variants have 0 stock)
  const isSoldOut =
    product.variants.length > 0 &&
    product.variants.every((variant) => variant.stock === 0);

  const handleVariantSelect = (variant) => {
    setSelectedVariant(variant);
    setQuantity(1);
  };

  const handleAddToCart = () => {
    if (product.variants && !selectedVariant) {
      alert("Please select all options");
      return;
    }
    addToCart(product, selectedVariant, quantity);
  };

  return (
    <StyledProduct>
      <Flex direction="column" $gap="1rem" $align="start">
        <h1>Ellamau</h1>
        <h2>{product.name}</h2>

        {isSoldOut && <SoldOutBanner>Sold Out</SoldOutBanner>}

        <Flex $justify="space-between">
          <p>
            <strong>COP {product.price}</strong>
          </p>
          <p>
            <em>{product.reference}</em>
          </p>
        </Flex>

        <StyledDescription>
          <p>{product.description}</p>
        </StyledDescription>

        {details && (
          <>
            <h3>
              <strong>Details</strong>
            </h3>
            <ul>
              {details.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>
          </>
        )}

        {product.variants.length > 0 && (
          <ProductVariantSelector
            variants={product.variants}
            onVariantSelect={handleVariantSelect}
          />
        )}

        {selectedVariant && (
          <>
            <h3>
              <strong>Quantity</strong>
            </h3>
            <QuantitySelector
              quantity={quantity}
              setQuantity={setQuantity}
              maxQuantity={selectedVariant.stock}
            />
          </>
        )}

        <AddToCartButton
          onClick={handleAddToCart}
          disabled={
            isSoldOut || (product.variants.length > 0 && !selectedVariant)
          }
        />
      </Flex>
    </StyledProduct>
  );
}
