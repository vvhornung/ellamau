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
  ];



  const { productId } = React.use(params);

  return (
    <>
      {productId?.toLowerCase() === "lingerie" && (
        <SubCategoriesCarrousel items={collections} />
      )}

      <Filters />
      <ProductSection />
    </>
  );
}
