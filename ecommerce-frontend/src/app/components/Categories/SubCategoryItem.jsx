import { StyledCategoryItem } from "../shared/styles/CategoryItem.styled";
import { Flex } from "../shared/styles/Flex.styled";
import ActionButton from "../shared/styles/ActionButton.styled";
import Image from "next/image";

function SubCategoryItem({ product, bg }) {
  const { title, img } = product;

  return (
    <StyledCategoryItem $bg={bg}>
      <Flex direction={"column"} $gap={"0"} $align={"center"}>
        <Image height={550} width={350} src={img} alt={title} />
        <p>{title}</p>
      </Flex>
    </StyledCategoryItem>
  );
}

export default SubCategoryItem;
