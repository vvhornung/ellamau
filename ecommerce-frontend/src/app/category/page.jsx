"use client";
import { Suspense } from "react";
import { Container } from "@/app/components/shared/styles/Container.styled";
import Spinner from "@/app/components/shared/Spinner";
import CategoryContent from "@/app/components/Categories/CategoryContent";

export default function CategoryPage() {
  return (
    <Suspense
      fallback={
        <Container>
          <Spinner fullscreen />
        </Container>
      }
    >
      <CategoryContent />
    </Suspense>
  );
}
