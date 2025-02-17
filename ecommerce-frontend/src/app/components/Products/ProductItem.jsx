

import { useContext } from "react";
import { StyledCarrouselItem } from "../shared/styles/CarrouselItem.styled";
import { Flex } from "../shared/styles/Flex.styled";
import { StyledProductItem } from "./styles/ProductItem.styled";
import { CartContext } from "@/app/contexts/CartContext";
import Image from "next/image";

function ProductItem({ product, $bg, $border }) {

  // Ensure we're working with plain object properties
  const { name, images, price, _id, stock } =
    typeof product._doc === "object" ? product._doc : product;
  const img = images?.[0] || "/placeholder-image.jpg";


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
