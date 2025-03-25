import React from "react";
import Filters from "@/app/components/Categories/Filters";
import SubCategoriesCarrousel from "@/app/components/Categories/SubCategoriesCarrousel";
import ProductSection from "@/app/components/Categories/ProductSection";
import StyledTitle from "@/app/components/shared/styles/Title.styled";
import connectDB from "@/app/lib/mongoose";
import { Category } from "@/app/models/Category";


export default async function CategoryPage({ params, searchParams }) {
  await connectDB();
  const { categoryName } = await params;
  const { page } = await searchParams;

  // Find category by name instead of ID
  const decodedCategoryName = decodeURIComponent(categoryName);
  const category = await Category.findOne({
    name: decodedCategoryName,
  });

  if (!category) {
    return <div>Category not found</div>;
  }

  return (
    <>
      <StyledTitle>
        <h1>Ellämäu /</h1>
        <h2>{category.name}</h2>
      </StyledTitle>

      
      {category.name?.toLowerCase() === "lingerie" && (
        <SubCategoriesCarrousel categoryId={category.id} />
      )}

      <Filters categoryId={category.id} />
      <ProductSection
        categoryId={category.id}
        initialPage={page ? parseInt(searchParams.page, 10) : 1}
      />
    </>
  );
}
