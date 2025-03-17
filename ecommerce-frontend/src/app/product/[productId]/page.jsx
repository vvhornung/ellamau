"use client";

import { useState, useEffect } from "react";
import { Container } from "@/app/components/shared/styles/Container.styled";
import ProductCarrousel from "@/app/components/Products/ProductCarrousel";
import { Flex } from "@/app/components/shared/styles/Flex.styled";
import ProductDetails from "@/app/components/Products/ProductDetails";
import { getProductData } from "@/app/actions/productActions";
import { useParams } from "next/navigation";
import Image from "next/image";
import Spinner from "@/app/components/shared/Spinner";

export default function ProductPage({ params }) {
  // Get product ID from URL
  const { productId } = useParams();
  // State to hold product and related products
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  // Effect to fetch product data
  useEffect(() => {
    const fetchData = async () => {
      const { product, relatedProducts } = await getProductData(
        productId,
        true
      );
      setProduct(product);
      setRelatedProducts(relatedProducts);
      setSelectedImage(product.images[0]);
    };

    fetchData();
  }, [productId]);

  // If product data is not yet loaded, return a loading state
  if (!product || !relatedProducts) {
    return (
      <Container>
        <Spinner />
      </Container>
    );
  }

  return (
    <Container>
      <Flex $justify="space-around" $gap="0" $align="start">
        <Flex
          direction="column"
          $gap="1rem"
          $align="end"
          width="50%"
          style={{ maxWidth: "500px" }}
        >
          <Container
            width="80%"
            height="535px"
            style={{ position: "relative" }}
          >
            <Image
              src={selectedImage}
              alt={product.name}
              sizes="100%"
              fill
              style={{ objectFit: "cover" }}
              priority
            />
          </Container>
          <Container width="80%" $align="start" $scroll>
            <Flex
              $gap="1rem"
              $justify="start"
              $align="start"
              width="fit-content"
            >
              {product.images.map((img, i) => (
                <div style={{width: '100px', height:'100px', position:'relative'}} key={i}>
                  <Image
                    src={img}
                    alt={product.name}
                    fill
                    style={{
                      filter:
                        selectedImage === img ? "none" : "brightness(0.8)",
                      cursor: "pointer",
                      transition: "filter 0.4s",
                      objectFit: "cover",
                    }}
                    onClick={() => setSelectedImage(img)} // Update selected image on click
                  />
                </div>
              ))}
            </Flex>
          </Container>
        </Flex>
        <ProductDetails product={product} />
      </Flex>
      <Container>
        <ProductCarrousel border={"card"} items={relatedProducts.products} />
      </Container>
    </Container>
  );
}
