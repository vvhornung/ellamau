"use client";
import { useState } from "react";
import { Flex } from "../shared/styles/Flex.styled";
import VariantGroup from "./VariantGroup";

export default function ProductVariantSelector({ variants, onVariantSelect }) {
  const [selectedVariants, setSelectedVariants] = useState({
    color: "",
    size: "",
  });

  const variantGroups = {
    color: [...new Set(variants.map((v) => v.color))],
    size: [...new Set(variants.map((v) => v.size))],
  };

  const isOptionAvailable = (type, value) => {
    if (type === "color") {
      return variants.some((v) => v.color === value && v.stock > 0);
    }
    return variants.some(
      (v) =>
        v.color === selectedVariants.color && v.size === value && v.stock > 0
    );
  };

  const handleVariantSelect = (type, value) => {
    if (!isOptionAvailable(type, value)) return;

    const newSelectedVariants = {
      ...selectedVariants,
      [type]: value,
    };

    if (type === "color") {
      newSelectedVariants.size = "";
      onVariantSelect(null);
    } else {
      const variant = variants.find(
        (v) =>
          v.color === newSelectedVariants.color &&
          v.size === newSelectedVariants.size
      );
      onVariantSelect(variant);
    }

    setSelectedVariants(newSelectedVariants);
  };

  return (
    <Flex direction="column" $align="start" $gap="1rem">
      {Object.entries(variantGroups).map(
        ([type, options]) =>
          options.length > 0 && (
            <VariantGroup
              key={type}
              type={type}
              options={options}
              selectedValue={selectedVariants[type]}
              isOptionAvailable={(value) => isOptionAvailable(type, value)}
              onSelect={(value) => handleVariantSelect(type, value)}
            />
          )
      )}
    </Flex>
  );
}
