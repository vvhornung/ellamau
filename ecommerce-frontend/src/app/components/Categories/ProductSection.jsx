import { Container } from "../shared/styles/Container.styled";
import Grid  from "../shared/styles/Grid.styled";
import CarrouselItem from "../Products/ProductItem";

function ProductSection() {
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
    {
      id: 5,
      title: "Intimate Continuous Wire Bra Set - Ideal for daily use",
      img: "http://127.0.0.1:5500/landing/images/landingPage/enTendencianumero3.jpg",
      price: "USD 80",
    },
    {
      id: 6,
      title: "Intimate Continuous Wire Bra Set - Ideal for daily use",
      img: "http://127.0.0.1:5500/landing/images/landingPage/sport.jpg",
      price: "USD 80",
    },
  ];


  return (
    <Container>
      <h1>Recomendados</h1>
      <Grid $columns={4} $gap="1rem">
        {/* Product cards go here */}
        <div style={{ gridColumn: "span 2" }}></div>
        {products.map((product) => (
          <CarrouselItem key={product.id} product={product} $border={"card"} />
        ))}
      </Grid>
    </Container>
  );

}

export default ProductSection;
