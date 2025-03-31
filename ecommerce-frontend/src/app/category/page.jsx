"use client";
import { useSearchParams } from "next/navigation";
import { Container } from "@/app/components/shared/styles/Container.styled";
import CategoryProductsContainer from "@/app/components/Categories/CategoryProductsContainer";

//Deployment ready and cagetory corrected

export default function CategoryPage() {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("id");

  if (!categoryId) {
    return (
      <Container>
        <h1>Category</h1>
        <p>Please select a category to view products</p>
      </Container>
    );
  }

  return <CategoryProductsContainer categoryId={categoryId} initialPage={1} />;
}
