
import { StyledCarrouselItem } from "../shared/styles/CarrouselItem.styled";
import { Flex } from "../shared/styles/Flex.styled";
import { StyledProductItem } from "./styles/ProductItem.styled";
import Image from "next/image";

function ProductItem({ product, $bg, $border }) {

  // Ensure we're working with plain object properties
  const { name, images, price, _id, stock } =
    typeof product._doc === "object" ? product._doc : product;
  const img =
    images?.[0] ||
    "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg";


  return (
    <a href={`/product/${_id}`}>
      <StyledProductItem $variant={"hover"} $border={$border}>
        <StyledCarrouselItem $bg={$bg}>
          <Image
            height={550}
            width={350}
            src={img}
            alt={name}
            priority={true}
          />
          <Flex direction={"column"} $gap={"1rem"} $align={"start"}>
            <p>{name}</p>
            <span>${price.toFixed(2)}</span>
          </Flex>
        </StyledCarrouselItem>
      </StyledProductItem>
    </a>
  );
}

export default ProductItem;
