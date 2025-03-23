import { StyledCarrouselItem } from "../shared/styles/CarrouselItem.styled";
import { Flex } from "../shared/styles/Flex.styled";
import { StyledProductItem } from "./styles/ProductItem.styled";
import Link from "next/link";
import Image from "next/image";
import { skeletonKeyframes } from "../shared/styles/Skeleton.styled";

function ProductItem({ product, $bg, $border }) {
  // Ensure we're working with plain object properties
  const { name, images, price, _id, stock } =
    typeof product._doc === "object" ? product._doc : product;
  const img =
    images?.[0] ||
    "https://ellamau-bucket.s3.us-east-2.amazonaws.com/1741938485530.jpg";

  return (
    <Link href={`/product/${_id}`} style={{ maxWidth: "100%" }} passHref>
      <StyledProductItem
        $variant={"hover"}
        $border={$border}
        style={{ width: "100%" }}
      >
        <StyledCarrouselItem $bg={$bg} style={{ width: "100%" }}>
          <Image
            height={550}
            width={350}
            src={img}
            alt={name}
            style={{
              backgroundImage:
                "background-image: linear-gradient(90deg, #eee, #f5f5f5, #eee)",
              animation: "skeletonKeyframes 1300ms ease-in-out infinite",
              backgroundColor: "#eee",
              backgroundSize: "200px 100%",
              backgroundRepeat: "no-repeat",
              borderRadius: "4px",
            }}
          />

          <Flex
            direction={"column"}
            $gap={"1rem"}
            $align={"start"}
            style={{ maxWidth: "100%" }}
          >
            <p
              style={{
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 1,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                maxWidth: "100%",
                whiteSpace: "normal",
                lineHeight: "1.4em",
                maxHeight: "2.8em", 
                textAlign: "left",
              }}
            >
              {name}
            </p>

            <span>${price.toFixed(2)}</span>
          </Flex>
        </StyledCarrouselItem>
      </StyledProductItem>
    </Link>
  );

}

export default ProductItem;
