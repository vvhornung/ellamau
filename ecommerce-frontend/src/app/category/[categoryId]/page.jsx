import React from "react";
import Filters from "@/app/components/Categories/Filters";
import SubCategoriesCarrousel from "@/app/components/Categories/SubCategoriesCarrousel";
import ProductSection from "@/app/components/Categories/ProductSection";
import StyledTitle  from "@/app/components/shared/styles/Title.styled";
import connectDB from "@/app/lib/mongoose";
import { Category } from "@/app/models/Category";

export default async function CategoryPage({ params }) {
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


  await connectDB();
  const { categoryId } = params;
  const category = await Category.findById((categoryId));

  

  return (
    <>
      <StyledTitle>
        <h1>Ellämäu /</h1>
        <h2>{category.name}</h2>
      </StyledTitle>

      {category.name?.toLowerCase() === "lingerie" && (
        <SubCategoriesCarrousel categoryId={categoryId} />
      )}

      <Filters />
      <ProductSection categoryId={categoryId} />
    </>
  );
}
