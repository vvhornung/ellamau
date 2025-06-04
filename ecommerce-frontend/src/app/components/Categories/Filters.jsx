"use client";
import { useEffect, useState, useRef, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Flex } from "../shared/styles/Flex.styled";
import {
  FilterOption,
  FilterDropdown,
  FilterItem,
  FilterBadge,
} from "./styles/FilterOption.styled";
import { Container } from "../shared/styles/Container.styled";
import Spinner from "../shared/Spinner";
import { useVariantOptions } from "@/app/Hooks/useVariantOptions";

function Filters({
  categoryId,
  products,
  onFilterChange,
  initialFilters = {},
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isClientSideFiltering = !!products && !!onFilterChange;

  // Always call hooks unconditionally, regardless of whether we use the result
  const { data: variantOptions, isLoading: hookIsLoading } = useVariantOptions(
    categoryId || ""
  );

  // Then use the results conditionally
  const serverColors = !isClientSideFiltering
    ? variantOptions?.colors || []
    : [];
  const serverSizes = !isClientSideFiltering ? variantOptions?.sizes || [] : [];
  const serverIsLoading = !isClientSideFiltering ? hookIsLoading : false;

  // Extract unique colors and sizes from products for client-side filtering
  const { colors: clientColors, sizes: clientSizes } = useMemo(() => {
    if (!products?.length) return { colors: [], sizes: [] };

    const allColors = new Set();
    const allSizes = new Set();

    products.forEach((product) => {
      // Extract colors and sizes from variants
      if (product.variants && Array.isArray(product.variants)) {
        product.variants.forEach((variant) => {
          // Handle both string and object variants
          const color = typeof variant === "object" ? variant.color : variant;
          const size = typeof variant === "object" ? variant.size : null;

          if (color) allColors.add(color);
          if (size) allSizes.add(size);
        });
      }
    });

    return {
      colors: Array.from(allColors).sort(),
      sizes: Array.from(allSizes).sort(),
    };
  }, [products]);

  // Use appropriate data source based on filtering mode
  const colors = isClientSideFiltering ? clientColors : serverColors;
  const sizes = isClientSideFiltering ? clientSizes : serverSizes;
  const isLoading = isClientSideFiltering ? false : serverIsLoading;

  // Get current filter values from URL, initialFilters, or state
  const currentColor =
    isClientSideFiltering && initialFilters.color
      ? initialFilters.color
      : searchParams.get("color") || "";

  const currentSize =
    isClientSideFiltering && initialFilters.size
      ? initialFilters.size
      : searchParams.get("size") || "";

  // Track which dropdown is open
  const [openDropdown, setOpenDropdown] = useState(null);

  // Refs for dropdown components
  const colorRef = useRef(null);
  const sizeRef = useRef(null);

  // Apply filters differently based on mode
  const applyFilter = (type, value) => {
    if (isClientSideFiltering) {
      // Client-side filtering - call the callback with new filter values
      const newFilters = {
        color: type === "color" ? value : currentColor,
        size: type === "size" ? value : currentSize,
      };

      // Remove empty filters
      Object.keys(newFilters).forEach((key) => {
        if (!newFilters[key]) delete newFilters[key];
      });

      onFilterChange(newFilters);
    } else {
      // Server-side filtering - update URL params
      const params = new URLSearchParams(searchParams);

      if (value) {
        params.set(type, value);
      } else {
        params.delete(type);
      }

      // Reset to page 1 when filters change
      params.set("page", "1");
      router.push(`?${params.toString()}`);
    }

    setOpenDropdown(null);
  };

  // Clear a specific filter
  const clearFilter = (type, event) => {
    // Stop the event from propagating to parent elements
    event.stopPropagation();
    event.preventDefault();

    if (isClientSideFiltering) {
      // Create a new filters object without the cleared filter
      const newFilters = { ...initialFilters };
      delete newFilters[type];

      // Update client-side filters through the parent component
      onFilterChange(newFilters);
    } else {
      // Server-side filtering: update URL params directly
      const params = new URLSearchParams(searchParams);
      params.delete(type);
      params.set("page", "1");
      router.push(`?${params.toString()}`);
    }
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        openDropdown === "color" &&
        colorRef.current &&
        !colorRef.current.contains(event.target)
      ) {
        setOpenDropdown(null);
      }

      if (
        openDropdown === "size" &&
        sizeRef.current &&
        !sizeRef.current.contains(event.target)
      ) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openDropdown]);

  // Toggle dropdown open/closed state
  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  return (
    <Container $overflow={"visible"}>
      <Flex $justify={"start"}>
        <h4>Filter By: </h4>
        <Flex $wrap width={"fit-content"} $justify={"start"} $gap={"1rem"}>
          {/* Color Filter */}
          <div ref={colorRef}>
            <FilterOption
              className={openDropdown === "color" ? "active" : ""}
              onClick={() => toggleDropdown("color")}
            >
              Color
              {currentColor && (
                <FilterBadge>
                  {currentColor}
                  <span
                    className="clear-badge"
                    onClick={(e) => clearFilter("color", e)}
                  >
                    ×
                  </span>
                </FilterBadge>
              )}
              <FilterDropdown $isOpen={openDropdown === "color"}>
                <FilterItem
                  className={!currentColor ? "selected" : ""}
                  onClick={() => applyFilter("color", "")}
                >
                  All Colors
                </FilterItem>

                {isLoading ? (
                  <FilterItem>
                    <Spinner />
                  </FilterItem>
                ) : colors && colors.length > 0 ? (
                  colors.map((color) => (
                    <FilterItem
                      key={color}
                      className={currentColor === color ? "selected" : ""}
                      onClick={() => applyFilter("color", color)}
                    >
                      {color}
                    </FilterItem>
                  ))
                ) : (
                  <FilterItem>No colors available</FilterItem>
                )}
              </FilterDropdown>
            </FilterOption>
          </div>

          {/* Size Filter */}
          <div ref={sizeRef}>
            <FilterOption
              className={openDropdown === "size" ? "active" : ""}
              onClick={() => toggleDropdown("size")}
            >
              Size
              {currentSize && (
                <FilterBadge>
                  {currentSize}
                  <span
                    className="clear-badge"
                    onClick={(e) => clearFilter("size", e)}
                  >
                    ×
                  </span>
                </FilterBadge>
              )}
              <FilterDropdown $isOpen={openDropdown === "size"}>
                <FilterItem
                  className={!currentSize ? "selected" : ""}
                  onClick={() => applyFilter("size", "")}
                >
                  All Sizes
                </FilterItem>

                {isLoading ? (
                  <FilterItem>
                    <Spinner />
                  </FilterItem>
                ) : sizes && sizes.length > 0 ? (
                  sizes.map((size) => (
                    <FilterItem
                      key={size}
                      className={currentSize === size ? "selected" : ""}
                      onClick={() => applyFilter("size", size)}
                    >
                      {size}
                    </FilterItem>
                  ))
                ) : (
                  <FilterItem>No sizes available</FilterItem>
                )}
              </FilterDropdown>
            </FilterOption>
          </div>

          {/* Clear All Filters button - only show if any filter is active */}
          {(currentColor || currentSize) && (
            <FilterOption
              className="destructive"
              onClick={() => {
                if (isClientSideFiltering) {
                  onFilterChange({});
                } else {
                  const params = new URLSearchParams(searchParams);
                  params.delete("color");
                  params.delete("size");
                  params.set("page", "1");
                  router.push(`?${params.toString()}`);
                }
              }}
            >
              Clear All Filters
            </FilterOption>
          )}
        </Flex>
      </Flex>
    </Container>
  );
}

export default Filters;
