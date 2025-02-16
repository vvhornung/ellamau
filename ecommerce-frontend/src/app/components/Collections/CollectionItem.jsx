import { StyledCarrouselItem } from "../shared/styles/CarrouselItem.styled";
import { Flex } from "../shared/styles/Flex.styled";
import ActionButton from "../shared/styles/ActionButton.styled";
import Image from "next/image";
import Link from "next/link";

async function CollectionItem({ product, bg }) {


  const { images, id } = product || {
    images: [
      "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg",
    ],
    id: 0,
  };

  const img =
    images[0] ||
    "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg";



  return (
    <Link href={`/product/${id}`}>
      <StyledCarrouselItem $bg={bg}>
        <Image height={550} width={350} src={img} alt={product.categoryName} />
        <Flex direction={"column"} $gap={"1rem"} $align={"center"}>
          <ActionButton $primaryColor={"black"} $variant={"underline"}>
            {product.categoryName } 
          </ActionButton>
        </Flex>
      </StyledCarrouselItem>
    </Link>
  );
}

export default CollectionItem;
