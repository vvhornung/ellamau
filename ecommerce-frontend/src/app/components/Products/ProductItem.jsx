import { StyledCarrouselItem } from "../shared/styles/CarrouselItem.styled";
import { Flex } from "../shared/styles/Flex.styled";
import { StyledProductItem } from "./styles/ProductItem.styled";
import Image from "next/image";

function ProductItem({ product, $bg, $border }) {
  const { name, images, price, _id, stock } = product;
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
            {stock <= 0 && <span className="out-of-stock">Agotado</span>}
          </Flex>
        </StyledCarrouselItem>
      </StyledProductItem>
    </a>
  );
}

export default ProductItem;
