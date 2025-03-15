"use client";
import { useEffect, useState, useRef } from "react";
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

function Filters({ categoryId }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { colors, sizes, isLoading } = useVariantOptions(categoryId);

  // Get current filter values from URL or set to empty
  const currentColor = searchParams.get("color") || "";
  const currentSize = searchParams.get("size") || "";

  // Track which dropdown is open
  const [openDropdown, setOpenDropdown] = useState(null);

  // Refs for dropdown components
  const colorRef = useRef(null);
  const sizeRef = useRef(null);

  // Function to update the URL when a filter is selected
  const applyFilter = (type, value) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set(type, value);
    } else {
      params.delete(type);
    }

    // Reset to page 1 when filters change
    params.set("page", "1");

    router.push(`?${params.toString()}`);
    setOpenDropdown(null);
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
        <h4>Filtrar Por: </h4>
        <Flex width={"fit-content"} $gap={"1rem"}>
          {/* Color Filter */}
          <div ref={colorRef}>
            <FilterOption
              className={openDropdown === "color" ? "active" : ""}
              onClick={() => toggleDropdown("color")}
            >
              Color
              {currentColor && <FilterBadge>{currentColor}</FilterBadge>}
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
                ) : (
                  colors.map((color) => (
                    <FilterItem
                      key={color}
                      className={currentColor === color ? "selected" : ""}
                      onClick={() => applyFilter("color", color)}
                    >
                      {color}
                    </FilterItem>
                  ))
                )}
              </FilterDropdown>
            </FilterOption>
          </div>

          {/* Size Filter */}
          {/* how to add relative positioning to a div nextjs */}

          <div ref={sizeRef}>
            <FilterOption
              className={openDropdown === "size" ? "active" : ""}
              onClick={() => toggleDropdown("size")}
            >
              Size
              {currentSize && <FilterBadge>{currentSize}</FilterBadge>}
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
                ) : (
                  sizes.map((size) => (
                    <FilterItem
                      key={size}
                      className={currentSize === size ? "selected" : ""}
                      onClick={() => applyFilter("size", size)}
                    >
                      {size}
                    </FilterItem>
                  ))
                )}
              </FilterDropdown>
            </FilterOption>
          </div>
        </Flex>
      </Flex>
    </Container>
  );
}

export default Filters;
