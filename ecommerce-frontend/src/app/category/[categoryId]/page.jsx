import React from "react";
import Filters from "@/app/components/Categories/Filters";
import SubCategoriesCarrousel from "@/app/components/Categories/SubCategoriesCarrousel";
import ProductSection from "@/app/components/Categories/ProductSection";
import StyledTitle  from "@/app/components/shared/styles/Title.styled";
import connectDB from "@/app/lib/mongoose";
import { Category } from "@/app/models/Category";

export default async function CategoryPage({ params }) {
  


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
