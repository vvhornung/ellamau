import { StyledCarrouselItem } from "../shared/styles/CarrouselItem.styled";
import { Flex } from "../shared/styles/Flex.styled";
import ActionButton from "../shared/styles/ActionButton.styled";
import Image from "next/image";
import Link from "next/link";

async function CollectionItem({ product, bg }) {
  const { img, id } = product || {
    images: [
      "https://ellamau-bucket.s3.us-east-2.amazonaws.com/1741938485530.jpg",
    ],
    id: 0,
  };

  const image =
    img ||
    "https://ellamau-bucket.s3.us-east-2.amazonaws.com/1741938485530.jpg";

  return (
    <Link href={`/product/${id}`}>
      <StyledCarrouselItem $bg={bg}>
        <Image
          height={550}
          width={350}
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
