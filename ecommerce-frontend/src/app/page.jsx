"use client";

import { Flex } from "./components/shared/styles/Flex.styled";
import { Container } from "./components/shared/styles/Container.styled";
import { PromoCard } from "./components/shared/styles/PromoCard.styled";
import ProductCarrousel from "./components/Products/ProductCarrousel";
import ActionButton from "./components/shared/styles/ActionButton.styled";
import HeroSection from "./components/shared/HeroSection";
import CollectionCarrousel from "./components/Collections/CollectionCarrousel";
import HeroVideo from "./components/Videos/HeroVideo";

export default function Home() {

    const collections = [
      {
        id: 1,
        title: "Lingerie",
        img: "http://127.0.0.1:5500/landing/images/DescubreLasColecciones/Dise%C3%B1o%20sin%20t%C3%ADtulo%20(3).png",
      },
      {
        id: 2,
        title: "Sport",
        img: "http://127.0.0.1:5500/landing/images/DescubreLasColecciones/sportswear.png",
      },
      {
        id: 3,
        title: "Underwear",
        img: "http://127.0.0.1:5500/landing/images/DescubreLasColecciones/pinklady.png",
      },
      {
        id: 4,
        title: "Swimwear",
        img: "http://127.0.0.1:5500/landing/images/DescubreLasColecciones/swimwear.png",
      },
      {
        id: 5,
        title: "Perfumes",
        img: "http://127.0.0.1:5500/landing/images/DescubreLasColecciones/perfumeRojo.jpg",
      },
    ];


    const products = [
        
    {
      id: 1,
      title: "Intimate Continuous Wire Bra Set - Ideal for daily use",
      img: "http://127.0.0.1:5500/landing/images/landingPage/openart-aebebdd632734dfd875f946031ed5c84_raw.jpg",
      price: "USD 80",
    },
    {
      id: 2,
      title: "Intimate Continuous Wire Bra Set - Ideal for daily use",
      img: "http://127.0.0.1:5500/landing/images/landingPage/carrusel%202.jpg",
      price: "USD 80",
    },
    {
      id: 3,
      title: "Intimate Continuous Wire Bra Set - Ideal for daily use",
      img: "http://127.0.0.1:5500/landing/images/landingPage/enTendencianumero3.jpg",
      price: "USD 80",
    },
    {
      id: 4,
      title: "Intimate Continuous Wire Bra Set - Ideal for daily use",
      img: "http://127.0.0.1:5500/landing/images/landingPage/sport.jpg",
      price: "USD 80",
    },
  ];


  return (
    <>
      <HeroVideo
        bg={"black"}
        src={"http://127.0.0.1:5500/landing/videos/video-ellamau.mp4"}
      />

      <Container bg={"black"}>
        <PromoCard>
          <h2>new lingerie</h2>
          <p>
            Discover the Collection, featuring classic favorites and new styles.
          </p>
          <ActionButton primarycolor={"white"} variant={"underline"}>
            SHOP NOW
          </ActionButton>
        </PromoCard>
      </Container>

      <HeroSection
        heading="NEW SEASON"
        subHeading="new lingerie"
        text="Discover the collection"
        buttonText="Shop Now"
        imageSrc="http://127.0.0.1:5500/landing/images/landingPage/heroImageDouble.png"
        onButtonClick={() => console.log("Shop Now Clicked!")}
      />

      <Container>
        <ProductCarrousel border={"card"} items={products} />
      </Container>

      <HeroSection
        heading="NEW SEASON"
        subHeading="beauty"
        text="Discover the collection"
        buttonText="Shop Now"
        imageSrc="http://127.0.0.1:5500/landing/images/landingPage/perfumeHero.jpg"
        onButtonClick={() => console.log("Shop Now Clicked!")}
        imagepositionx="35%"
        imagepositiony="40%"
      />

      <HeroSection
        subHeading="DISCOVER SPORTSWEAR"
        text="Leave an unforgettable impression with our exclusive fragrances"
        buttonText="Shop Now"
        imageSrc="http://127.0.0.1:5500/landing/images/landingPage/374-(3)-azul.jpg"
        brightness={0.7}
        onButtonClick={() => console.log("Shop Now Clicked!")}
      />

      <Container>
        <CollectionCarrousel items={collections} />
      </Container>

      <Container bg={"#f5e5c5"}>
        <ProductCarrousel bg="#f5e5c5" items={products} />
      </Container>

      <HeroSection
        heading="NEW SEASON"
        subHeading="swimwear"
        text="Discover the collection"
        buttonText="Shop Now"
        imageSrc="http://127.0.0.1:5500/landing/images/landingPage/ladu.jpg"
        onButtonClick={() => console.log("Shop Now Clicked!")}
        imagepositionx="30%"
      />
    </>
  );
}
