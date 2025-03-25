import Image from "next/image";
import { useRouter } from "next/navigation";
import { FiCheckCircle } from "react-icons/fi";
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ProductInfo,
  ProductName,
  ProductVariant,
  ProductPrice,
  ModalButtons,
  ModalButton,
  ImageContainer,
} from "./styles/AddToCartModal.styled";

export default function AddToCartModal({
  isOpen,
  onClose,
  product,
  variant,
  quantity,
}) {
  const router = useRouter();

  if (!isOpen) return null;

  const handleViewCart = () => {
    router.push("/cart");
  };

  const handleContinueShopping = () => {
    onClose();
  };

  // Get image from product or use placeholder
  const imageSrc = product?.images?.[0] || "/images/placeholder-product.jpg";

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>
            <FiCheckCircle color="green" size={20} />
            Added to Cart
          </ModalTitle>
        </ModalHeader>
        <ModalBody>
          <ImageContainer>
            <Image
              src={imageSrc}
              alt={product?.name || "Product"}
              fill
              style={{ objectFit: "cover" }}
            />
          </ImageContainer>
          <ProductInfo>
            <ProductName>{product?.name}</ProductName>
            {variant && (
              <ProductVariant>
                {variant.color && `Color: ${variant.color} `}
                {variant.size && `Size: ${variant.size}`}
              </ProductVariant>
            )}
            <ProductVariant>Quantity: {quantity}</ProductVariant>
            <ProductPrice>${product?.price?.toFixed(2)}</ProductPrice>
          </ProductInfo>
        </ModalBody>
        <ModalButtons>
          <ModalButton className="secondary" onClick={handleContinueShopping}>
            Continue Shopping
          </ModalButton>
          <ModalButton className="primary" onClick={handleViewCart}>
            View Cart
          </ModalButton>
        </ModalButtons>
      </ModalContent>
    </ModalOverlay>
  );
}
