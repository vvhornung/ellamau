import { StyledCarrouselItem } from "../shared/styles/CarrouselItem.styled";
import { Flex } from "../shared/styles/Flex.styled";
import {UnderlineButton} from "../shared/styles/Button.styled";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

async function CollectionItem({ product, bg }) {
  const { images, _id: id, categoryName } = product

  const image =images[0]

  return (
    <Link href={`/category/${categoryName}`} style={{ width: "100%" }} passHref>
      <StyledCarrouselItem $bg={bg}>
        <Image
          height={550}
          width={700}
          src={images[0] || 'http://localhost:3001/_next/image?url=https%3A%2F%2Fellamau-bucket.s3.us-east-2.amazonaws.com%2F1741938485530.jpg&w=640&q=75'}
          alt={categoryName}
        />
        <Flex direction={"column"} $gap={"1rem"} $align={"center"}>
          <UnderlineButton >
            {categoryName}
          </UnderlineButton>
        </Flex>
      </StyledCarrouselItem>
    </Link>
  );
}

export default CollectionItem;
