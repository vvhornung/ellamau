import { Container } from "./components/shared/styles/Container.styled";
import { PromoCard } from "./components/shared/styles/PromoCard.styled";
import ProductCarrousel from "./components/Products/ProductCarrousel";
import ActionButton from "./components/shared/styles/ActionButton.styled";
import HeroSection from "./components/shared/HeroSection";
import CollectionCarrousel from "./components/Collections/CollectionCarrousel";
import HeroVideo from "./components/Videos/HeroVideo";
import { Product } from "./models/Product";
import { Category } from "./models/Category";
import connectDB from "./lib/mongoose";
import { getProductsByCategory } from "./lib/fetchProducts";
import Hero from "../../public/mobileHero.jpg";
import heroOg from "../../public/heroOg.jpg";
import Perfume from "../../public/perfumeHero.png";
import PerfumeMobile from "../../public/perfumeHeroMobile.png";

export default async function Home() {
  connectDB();

  const categories = await Category.find({ parentCategory: null });

  const swimwearCategory = await categories.find(
    (category) => category.name.toLowerCase() === "swimwear"
  );

  const collectionItems = await Promise.all(
    categories.map(async (category) => ({
      product: (await getProductsByCategory(category.id, 1)).products[0],
      categoryName: category.name,
    }))
  );

  collectionItems.forEach((item) => {
    item.product.img =
      "https://ellamau-bucket.s3.us-east-2.amazonaws.com/1741938485530.jpg";
  });

  const latestProducts = await Product.find().sort({ createdAt: -1 }).limit(4);
  latestProducts.forEach((product) => {
    product.img =
      "https://ellamau-bucket.s3.us-east-2.amazonaws.com/1741938485530.jpg";
  });
  //ellamau-bucket.s3.us-east-2.amazonaws.com/1741938485530.jpg


  const swimwearProducts = (await getProductsByCategory(swimwearCategory.id, 4))
    .products;

  return (
    <>
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
        imageSrc={heroOg}
        tabletImageSrc={Hero}
      />

      <Container>
        <ProductCarrousel $border={"card"} items={latestProducts} />
      </Container>

      <HeroSection
        heading="NEW SEASON"
        subHeading="beauty"
        text="Discover the collection"
        buttonText="Shop Now"
        imageSrc={Perfume}
        mobileImageSrc={PerfumeMobile}
        image$positionX="35%"
        image$positionY="40%"
      />

      <HeroSection
        subHeading="DISCOVER SPORTSWEAR"
        text="Leave an unforgettable impression with our exclusive fragrances"
        buttonText="Shop Now"
        imageSrc="https://ellamau-bucket.s3.us-east-2.amazonaws.com/1741938485530.jpg"
        brightness={0.7}
      />

      <Container>
        <CollectionCarrousel items={collectionItems} />
      </Container>

      <Container $bg={"#f5e5c5"}>
        <ProductCarrousel $bg="#f5e5c5" items={swimwearProducts} />
      </Container>

      <HeroSection
        heading="NEW SEASON"
        subHeading="swimwear"
        text="Discover the collection"
        buttonText="Shop Now"
        image$positionX="30%"
        imageSrc="https://ellamau-bucket.s3.us-east-2.amazonaws.com/1741938485530.jpg"
      />
    </>
  );
}
