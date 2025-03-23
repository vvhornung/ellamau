import { StyledCategoryItem } from "../shared/styles/CategoryItem.styled";
import { Flex } from "../shared/styles/Flex.styled";
import Image from "next/image";
import { getProductsByCategory } from "@/app/lib/fetchProducts";

async function SubCategoryItem({ category, bg }) {

  

  const { name, _id } = category;

  const product = (await getProductsByCategory(_id, 1)).products[0];
  const image =
    product.images[0] ||
    "https://ellamau-bucket.s3.us-east-2.amazonaws.com/1741938485530.jpg";

  return (
    <StyledCategoryItem $bg={bg}>
      <Flex direction={"column"} $gap={"0"} $align={"center"}>
        <Image height={550} width={350} src={image} alt={name} />
        <p>{name}</p>
      </Flex>
    </StyledCategoryItem>
  );
}

export default SubCategoryItem;
