import { StyledCarrouselItem } from "../shared/styles/CarrouselItem.styled";
import { Flex } from "../shared/styles/Flex.styled";
import ActionButton from "../shared/styles/ActionButton.styled";
import Image from "next/image";

function CollectionItem({ product, bg }) {
  const { title, img } = product;

  return (
    <StyledCarrouselItem $bg={bg}>
      <Image height={550} width={350} src={img} alt={title} />
      <Flex direction={"column"} $gap={"1rem"} $align={"center"}>
        <ActionButton $primaryColor={"black"} $variant={"underline"}>
          {title}
        </ActionButton>
      </Flex>
    </StyledCarrouselItem>
  );
}

export default CollectionItem;
