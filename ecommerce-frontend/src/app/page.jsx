import { Container } from "./components/shared/styles/Container.styled";
import { PromoCard } from "./components/shared/styles/PromoCard.styled";
import ProductCarrousel from "./components/Products/ProductCarrousel";
import ActionButton from "./components/shared/styles/ActionButton.styled";
import HeroSection from "./components/shared/HeroSection";
import CollectionCarrousel from "./components/Collections/CollectionCarrousel";
import HeroVideo from "./components/Videos/HeroVideo";
import { Product } from "./models/Product";
import connectDB from "./lib/mongoose";

export default async function Home() {
  const heroProduct = "6748ff47225c34b37fdd846d";
  connectDB();
  const product = await Product.findById(heroProduct);
console.log("hi product: ", product);
  const item = [
    {
      title: "hi",
      img: "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg",
      price: 90,
      id: 1,
    },
  ];

  

  return (
    <>
      <HeroVideo
        $bg={"black"}
        src={"https://www.youtube.com/watch?v=3A-ynQmWIA0"}
      />

      <Container $bg={"black"}>
        <PromoCard>
          <h2>new lingerie</h2>
          <p>
            Discover the Collection, featuring classic favorites and new styles.
          </p>
          <ActionButton $primaryColor={"white"} $variant={"underline"}>
            SHOP NOW
          </ActionButton>
        </PromoCard>
      </Container>

      <HeroSection
        heading="NEW SEASON"
        subHeading="new lingerie"
        text="Discover the collection"
        buttonText="Shop Now"
        imageSrc={product.images[0]}
      />

      <Container>
        <ProductCarrousel $border={"card"} items={item} />
      </Container>

      <HeroSection
        heading="NEW SEASON"
        subHeading="beauty"
        text="Discover the collection"
        buttonText="Shop Now"
        imageSrc="https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg"
        image$positionX="35%"
        image$positionY="40%"
      />

      <HeroSection
        subHeading="DISCOVER SPORTSWEAR"
        text="Leave an unforgettable impression with our exclusive fragrances"
        buttonText="Shop Now"
        imageSrc="https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg"
        brightness={0.7}
      />

      <Container>
        <CollectionCarrousel items={item} />
      </Container>

      <Container $bg={"#f5e5c5"}>
        <ProductCarrousel $bg="#f5e5c5" items={item} />
      </Container>

      <HeroSection
        heading="NEW SEASON"
        subHeading="swimwear"
        text="Discover the collection"
        buttonText="Shop Now"
        image$positionX="30%"
        imageSrc="https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg"
      />
    </>
  );
}

