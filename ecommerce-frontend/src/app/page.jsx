import { Container } from "./components/shared/styles/Container.styled";
import { PromoCard } from "./components/shared/styles/PromoCard.styled";
import ProductCarrousel from "./components/Products/ProductCarrousel";
import ActionButton from "./components/shared/styles/Button.styled";
import HeroSection from "./components/shared/HeroSection";
import CollectionCarrousel from "./components/Collections/CollectionCarrousel";
import { Product } from "./models/Product";
import { Category } from "./models/Category";
import connectDB from "./lib/mongoose";
import { getProductsByCategory } from "./lib/fetchProducts";
import Hero from "../../public/mobileHero.jpg";
import heroOg from "../../public/heroOg.jpg";
import Perfume from "../../public/perfumeHero.png";
import PerfumeMobile from "../../public/perfumeHeroMobile.png";
import sportHero from "../../public/sportwearHero.jpg";
import SmallPerfume from "../../public/xsPerfume.jpg";
import Swimwear from "../../public/swimwearHero.jpg";
import xsSwimwear from "../../public/xsSwimHero.jpg";

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


  const latestProducts = await Product.find().sort({ createdAt: -1 }).limit(4);
  


  const swimwearProducts = (await getProductsByCategory(swimwearCategory.id, 4))
    .products;

  return (
    <>
      <Container $bg={"black"}>
        <PromoCard>
          <h2>NEW LINGERIE</h2>
          <p>
            Discover the Collection, featuring classic favorites and new styles.
          </p>
          <ActionButton className="outline secondary">SHOP NOW</ActionButton>
        </PromoCard>
      </Container>

      <HeroSection
        heading="NEW SEASON"
        subHeading="new lingerie"
        text="Discover the collection"
        buttonText="Shop Now"
        imageSrc={heroOg}
        tabletImageSrc={Hero}
        href="/category/lingerie"
      />

      <Container>
        <ProductCarrousel title={'Beauty Collection'} $border={"card"} items={latestProducts} />
      </Container>

      <HeroSection
        heading="NEW SEASON"
        subHeading="beauty"
        text="Discover the collection"
        buttonText="Shop Now"
        imageSrc={Perfume}
        tabletImageSrc={PerfumeMobile}
        mobileImageSrc={SmallPerfume}
        image$positionX="35%"
        image$positionY="40%"
        className="beauty-hero" // Agrega esta clase
        href="/category/beauty"
      />

      <HeroSection
        heading="DISCOVER"
        subHeading="SPORTSWEAR"
        text="Enjoy the pleasure of confort anf style"
        buttonText="Shop Now"
        imageSrc={sportHero}
        brightness={0.7}
        href="/category/sportswear"
      />

      <Container>
        <CollectionCarrousel title=" Our Collections" items={collectionItems} />
      </Container>

      <Container $bg={"#f5e5c5"}>
        <ProductCarrousel title="Swimwear Collection" $bg="#f5e5c5" items={swimwearProducts} />
      </Container>

      <HeroSection
        heading="NEW SEASON"
        subHeading="swimwear"
        text="Discover the collection"
        buttonText="Shop Now"
        image$positionX="40%"
        imageSrc={Swimwear}
        mobileImageSrc={xsSwimwear}
        href="/category/swimwear"
      />
    </>
  );
}
