"use client";
import React from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import styled from "styled-components";
import { prefetchCategoryPage } from "@/app/Hooks/useProducts";

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem 0;
  gap: 0.5rem;
`;

const PageButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid ${(props) => (props.$active ? "#000" : "#ddd")};
  background-color: ${(props) => (props.$active ? "#000" : "white")};
  color: ${(props) => (props.$active ? "white" : "#000")};
  cursor: ${(props) => (props.$active ? "default" : "pointer")};
  border-radius: 4px;
  font-family: inherit;
  font-size: 0.9rem;

  &:hover {
    background-color: ${(props) => (props.$active ? "#000" : "#f5f5f5")};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const PageIndicator = styled.span`
  padding: 0.5rem;
  font-size: 0.9rem;
`;

const Pagination = ({ currentPage, totalPages, categoryId }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Create a function to update the URL with the new page
  const createPageURL = (pageNumber) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  // Handle page change
  const handlePageChange = (pageNumber) => {
    router.push(createPageURL(pageNumber));
  };

  // Handle prefetch on hover
  const handlePrefetch = (pageNumber) => {
    // Extract categoryId from pathname if not provided as prop
    const extractedCategoryId = categoryId || pathname.split("/").pop();
    if (extractedCategoryId) {
      prefetchCategoryPage(extractedCategoryId, pageNumber);
    }
  };

  // Calculate which page numbers to show
  const getPageNumbers = () => {
    const pages = [];

    // Always show first page
    pages.push(1);

    // Calculate range around current page
    let start = Math.max(2, currentPage - 1);
    let end = Math.min(totalPages - 1, currentPage + 1);

    // Add ellipsis after first page if needed
    if (start > 2) {
      pages.push("...");
    }

    // Add pages in the middle
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Add ellipsis before last page if needed
    if (end < totalPages - 1) {
      pages.push("...");
    }

    // Always show last page if there is more than one page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  // Don't show pagination if there's only one page
  if (totalPages <= 1) {
    return null;
  }

  return (
    <PaginationContainer>
      <PageButton
        onClick={() => handlePageChange(currentPage - 1)}
        onMouseEnter={() => handlePrefetch(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        Previous
      </PageButton>

      {getPageNumbers().map((page, index) =>
        typeof page === "number" ? (
          <PageButton
            key={index}
            $active={page === currentPage}
            onClick={() => page !== currentPage && handlePageChange(page)}
            onMouseEnter={() => handlePrefetch(page)}
          >
            {page}
          </PageButton>
        ) : (
          <PageIndicator key={index}>{page}</PageIndicator>
        )
      )}

      <PageButton
        onClick={() => handlePageChange(currentPage + 1)}
        onMouseEnter={() => handlePrefetch(currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        Next
      </PageButton>
    </PaginationContainer>
  );
};

export default Pagination;
