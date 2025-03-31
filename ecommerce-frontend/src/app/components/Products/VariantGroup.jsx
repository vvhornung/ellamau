import { Flex } from "../shared/styles/Flex.styled";
import { VariantButton } from "./styles/VariantButton.styled";

export default function VariantGroup({
  type,
  options,
  selectedValue,
  isOptionAvailable,
  onSelect,
}) {
  return (
    <div >
      <h3>
        <strong>{type.charAt(0).toUpperCase() + type.slice(1)}</strong>
      </h3>
      <Flex $wrap $justify={'start'} $gap="0.5rem">
        {options.map((option) => (
          <VariantButton
            key={option}
            $selected={option === selectedValue}
            $disabled={!isOptionAvailable(option)}
            onClick={() => onSelect(option)}
          >
            {option}
          </VariantButton>
        ))}
      </Flex>
    </div>
  );
}
