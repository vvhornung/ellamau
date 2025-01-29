import { StyledCarrouselItem } from "../shared/styles/CarrouselItem.styled";
import { Flex } from "../shared/styles/Flex.styled";
import { StyledProductItem } from "./styles/ProductItem.styled";
import Image from "next/image";

function CarrouselItem({ product, bg, border }) {
  const { title, img, price, id } = product;

  return (
    <a href={`/product/${id}`}>
      <StyledProductItem variant={"hover"} border={border}>
        <StyledCarrouselItem bg={bg}>
          <Image height={550} width={350} src={img} alt={title} />
          <Flex direction={"column"} gap={"1rem"} align={"start"}>
            <p>{title}</p>
            <span>{price}</span>
          </Flex>
        </StyledCarrouselItem>
      </StyledProductItem>
    </a>
  );
}

export default CarrouselItem;
