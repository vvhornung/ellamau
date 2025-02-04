"use client";

import React from "react";

import { Container } from "@/app/components/shared/styles/Container.styled";
import ProductCarrousel from "@/app/components/Products/ProductCarrousel";
import Grid from "@/app/components/shared/styles/Grid.styled";
import StyledTitle from "@/app/components/shared/styles/Title.styled";
import { StyledDescription } from "@/app/components/Products/styles/Description.styled";
import { Flex } from "@/app/components/shared/styles/Flex.styled";

export default function CategoryPage({ params }) {
  const products = [
    {
      id: 1,
      title: "Lingerie",
      img: "http://127.0.0.1:5500/landing/images/PicksParaTi/Dise%C3%B1o%20sin%20t%C3%ADtulo%20(15).png",
    },
  ];

  const { productId } = React.use(params);

  return (
    <Container>
      <Flex justify="space-between" gap="2rem" >

        <Grid>
            
        </Grid>

        <StyledTitle>
          <Flex  direction="column" gap="1rem" align="flex-start">
            <h1>
              {" "}
              <strong>Ellamau</strong>
            </h1>

            <h1>
              SEXY AND ELEGANT INTIMATE SET - NATURAL ENHANCEMENT BRASSIER AND
              ADJUSTABLE PANTY
            </h1>

            <Flex justify="space-between">
              <h1>
                <strong>COP 200.000</strong>
              </h1>
              <h1>80031</h1>
            </Flex>

            <StyledDescription>
              <p>
                The perfect set to make you feel sexy and elegant. The bra is
                designed to enhance your natural shape and the panty is
                adjustable to fit your body perfectly.
              </p>
            </StyledDescription>

            <h1><strong>Descripcion</strong></h1>
            <ul>
              <li>Material: Polyester</li>
              <li>Color: Black</li>
              <li>Size: S, M, L</li>
            </ul>
          </Flex>
        </StyledTitle>
      </Flex>

      <Container>
        <ProductCarrousel border={"card"} items={products} />
      </Container>
    </Container>
  );
}
