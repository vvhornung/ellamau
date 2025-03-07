import { IoClose } from "react-icons/io5";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { CartContext } from "@/app/contexts/CartContext";
import {
  CartItemContainer,
  ProductInfo,
  ProductDetails,
  ProductName,
  ProductPrice,
  ProductVariant,
  QuantityControls,
  RemoveButton,
  StockStatus,
  EllamauName,
} from "./styles/CartItem.styled";
import { Flex } from "../shared/styles/Flex.styled";
import stockService from "@/app/services/StockService";

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useContext(CartContext);
  const [currentStock, setCurrentStock] = useState(item?.variant?.stock || 0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!item || !item.product?._id || !item.variant?._id) return;

    // Use a flag to prevent state updates after unmount
    let isMounted = true;
    setIsLoading(true);

    // Use the stock service instead of direct API call
    stockService
      .getVariantStock(item.product._id, item.variant._id)
      .then(stock => {
        if (!isMounted) return;

        setCurrentStock(stock);

        // Handle out-of-stock or quantity adjustment
        if (stock === 0) {
          removeFromCart(item.product._id, item.variant._id);
        } else if (stock < item.quantity) {
          updateQuantity(item.product._id, item.variant._id, stock);
        }
      })
      .catch(error => {
        console.error("Error fetching stock data:", error);
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    // Cleanup function to prevent updates after unmount
    return () => {
      isMounted = false;
    };
  }, [item?.product?._id, item?.variant?._id, removeFromCart, updateQuantity]);

  if (!item || !item.product) return null;

  const { product, variant, quantity } = item;

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1 || newQuantity > currentStock) return;
    updateQuantity(product._id, variant?._id, newQuantity);
  };

  const handleRemove = () => {
    removeFromCart(product._id, variant?._id);
  };

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
          <Flex $gap={"0.5rem"} $align={"center"} $justify={"start"}>
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
          </Flex>
        </QuantityControls>
      </ProductDetails>

      <ProductDetails>
        <Flex direction={"column"} $gap={"0.2rem"} $align={"start"}>
          <Flex $justify={"space-between"}>
            <EllamauName>Ellamau</EllamauName>
            <RemoveButton onClick={handleRemove}>
              <IoClose />
            </RemoveButton>
          </Flex>
          <ProductName>{product.name || "Unknown Product"}</ProductName>
          {variant && <ProductVariant>{variant.name}</ProductVariant>}
        </Flex>

        <StockStatus
          $status={
            isLoading
            ? "loadingStock":
             currentStock <= 5
              ? "lowStock"
              : "inStock"
          }
        >
          {isLoading
            ? "Updating..."
            : currentStock <= 5
            ? "Low Stock"
            : "In Stock"}
        </StockStatus>

        <Flex direction={"column"} $justify={"start"} $align={"start"}>
          <ProductVariant>
            {variant?.color && `Color: `}
            <span>{variant?.color?.toLowerCase()}</span>
          </ProductVariant>
          <ProductVariant>
            {variant?.size && `Size: `}
            <span>{variant?.size?.toLowerCase()}</span>
          </ProductVariant>
        </Flex>
        <ProductPrice>$ {product.price?.toFixed(2) || "0.00"}</ProductPrice>
      </ProductDetails>
    </CartItemContainer>
  );
}
