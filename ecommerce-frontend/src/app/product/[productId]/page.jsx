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
  const [isMobile, setIsMobile] = useState(false);

  // Effect to fetch product data
  useEffect(() => {
    const fetchData = async () => {
      const { product, relatedProducts } = await getProductData(
        productId,
        true
      );
      setProduct(product);
      setRelatedProducts(relatedProducts);
      setSelectedImage(
        product.images[0] ||
          "https://ellamau-bucket.s3.us-east-2.amazonaws.com/1741938485530.jpg"
      );
    };

    fetchData();
  }, [productId]);

  // Effect to handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1000);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      <Flex
        $justify="space-between"
        $align={isMobile ? "center" : "flex-start"}
        direction={isMobile ? "column" : "row"}
      >
        <Flex
          direction="column"
          $gap="1rem"
          width={isMobile ? "700px" : "40%"}
          style={{ maxWidth: isMobile ? "100%" : "100%" }}
        >
          <Container
            width="100%"
            height={isMobile ? "auto" : "50%"}
            style={{
              position: "relative",
              maxHeight: "700px",
              overflow: "hidden",
            }}
          >
            <Image
              src={selectedImage}
              alt={product.name}
              layout="intrinsic" // Permite definir width y height exactos
              width={500} // Ajusta según sea necesario
              height={300} // Reduce la altura
              objectFit="contain" // Para que la imagen se ajuste sin recortarse
              priority
            />
          </Container>

          <Container width="100%" $align="start" $scroll>
            <Flex
              $gap="1rem"
              $justify="start"
              $align="start"
              width="fit-content"
            >
              {product.images.map((img, i) => (
                <div
                  style={{
                    width: "100px",
                    height: "100px",
                    position: "relative",
                  }}
                  key={i}
                >
                  <Image
                    src={img}
                    alt={product.name}
                    layout="fill"
                    objectFit="cover"
                    style={{
                      filter:
                        selectedImage === img ? "none" : "brightness(0.8)",
                      cursor: "pointer",
                      transition: "filter 0.4s",
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
