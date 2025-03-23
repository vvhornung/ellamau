import { StyledCarrouselItem } from "../shared/styles/CarrouselItem.styled";
import { Flex } from "../shared/styles/Flex.styled";
import ActionButton from "../shared/styles/ActionButton.styled";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

async function CollectionItem({ product, bg }) {
  const { images, _id:id } = product || {
    images: [
      "https://ellamau-bucket.s3.us-east-2.amazonaws.com/1741938485530.jpg",
    ],
    id: 0,
  };

  const image =
    images[0] ||
    "https://ellamau-bucket.s3.us-east-2.amazonaws.com/1741938485530.jpg";

  return (
    <Link href={`/product/${id}`} style={{ width: "100%" }} passHref>
      <StyledCarrouselItem $bg={bg}>
        <Image
          height={550}
          width={700}
          src={image}
          alt={product.categoryName}
        />
        <Flex direction={"column"} $gap={"1rem"} $align={"center"}>
          <ActionButton $primaryColor={"black"} $variant={"underline"}>
            {product.categoryName}
          </ActionButton>
        </Flex>
      </StyledCarrouselItem>
    </Link>
  );
}

export default CollectionItem;
