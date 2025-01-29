"use client";

import React from "react";
import styled from "styled-components";
import Filters from "@/app/components/Categories/Filters";
import SubCategoriesCarrousel from "@/app/components/Categories/SubCategoriesCarrousel";
import ProductSection from "@/app/components/Categories/ProductSection";

export default function CategoryPage({ params }) {
  const collections = [
    {
      id: 1,
      title: "Lingerie",
      img: "http://127.0.0.1:5500/landing/images/PicksParaTi/Dise%C3%B1o%20sin%20t%C3%ADtulo%20(15).png",
    },
    {
      id: 2,
      title: "Sport",
      img: "http://127.0.0.1:5500/landing/images/PicksParaTi/Dise%C3%B1o%20sin%20t%C3%ADtulo%20(15).png",
    },
    {
      id: 3,
      title: "Underwear",
      img: "http://127.0.0.1:5500/landing/images/PicksParaTi/Dise%C3%B1o%20sin%20t%C3%ADtulo%20(15).png",
    },
    {
      id: 4,
      title: "Swimwear",
      img: "http://127.0.0.1:5500/landing/images/PicksParaTi/Dise%C3%B1o%20sin%20t%C3%ADtulo%20(15).png",
    },
    {
      id: 5,
      title: "Perfumes",
      img: "http://127.0.0.1:5500/landing/images/PicksParaTi/Dise%C3%B1o%20sin%20t%C3%ADtulo%20(15).png",
    },
    {
      id: 6,
      title: "Perfumes",
      img: "http://127.0.0.1:5500/landing/images/PicksParaTi/Dise%C3%B1o%20sin%20t%C3%ADtulo%20(15).png",
    },
  ];

  const StyledCategoryTitle = styled.div`
    padding: 1rem;

    h1 {
      line-height: 0.8;
      font-size: 0.8rem;
      color: black;
      opacity: 0.8;
      padding: 1rem;
      font-family: Cinzel, serif;
      margin-bottom: 0.2rem;
      padding: 0;
      overflow: visible;
    }

    h2 {
      text-transform: capitalize;
    }
  `;

  const { categoryName } = React.use(params);

  return (
    <>
      <StyledCategoryTitle>
        <h1>Ellämäu /</h1>
        <h2>{categoryName}</h2>
      </StyledCategoryTitle>

      {categoryName?.toLowerCase() === "lingerie" && (
        <SubCategoriesCarrousel items={collections} />
      )}

      <Filters />
      <ProductSection />
    </>
  );
}
