"use client";
import { useSearchParams } from "next/navigation";
import { Container } from "@/app/components/shared/styles/Container.styled";
import ProductSection from "@/app/components/Categories/ProductSection";

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

  return <ProductSection categoryId={categoryId} initialPage={1} />;
}
