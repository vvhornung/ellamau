'use client';

import React from "react";
import Filters from "@/app/components/Categories/Filters";
import SubCategoriesCarrousel from "@/app/components/Categories/SubCategoriesCarrousel";
import ProductSection from "@/app/components/Categories/ProductSection";
import StyledTitle  from "@/app/components/shared/styles/Title.styled";

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



  const { categoryName } = React.use(params);

  return (
    <>
      <StyledTitle>
        <h1>Ellämäu /</h1>
        <h2>{categoryName}</h2>
      </StyledTitle>

      {categoryName?.toLowerCase() === "lingerie" && (
        <SubCategoriesCarrousel items={collections} />
      )}

      <Filters />
      <ProductSection />
    </>
  );
}
