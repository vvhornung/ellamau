
import React from "react";
import Filters from "@/app/components/Categories/Filters";
import SubCategoriesCarrousel from "@/app/components/Categories/SubCategoriesCarrousel";
import ProductSection from "@/app/components/Categories/ProductSection";
import StyledTitle from "@/app/components/shared/styles/Title.styled";
import connectDB from "@/app/lib/mongoose";
import { Category } from "@/app/models/Category";

// Make this page generate dynamically based on search params
export const dynamic = "force-dynamic";

export default async function CategoryPage({ params, searchParams }) {
  await connectDB();
  const { categoryId } = await params;
  const {page} = await searchParams
  const category = await Category.findById(categoryId);

  // Fix: Don't try to parse searchParams directly
  // Instead, pass the entire searchParams object to the client component
  // and let it handle the parsing

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
      <ProductSection
        categoryId={categoryId}
        initialPage={page ? parseInt(searchParams.page, 10) : 1}
      />
    </>
  );
}
