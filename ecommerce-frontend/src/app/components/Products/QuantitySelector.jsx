
import { Flex } from "../shared/styles/Flex.styled";
import { QuantityInput } from "./styles/QuantityInput.styled";
import { QuantityButton } from "./styles/QuantityButton.styled";




export default function QuantitySelector({
  quantity,
  setQuantity,
  maxQuantity,
}) {
  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < maxQuantity) {
      setQuantity(quantity + 1);
    }
  };

  const handleChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 1 && value <= maxQuantity) {
      setQuantity(value);
    }
  };

  return (
    
    <Flex $gap="0.4rem" $justify="start" $align="center">
      <QuantityButton onClick={handleDecrease} $disabled={quantity <= 1}>
        -
      </QuantityButton>
      <QuantityInput
        type="number"
        min="1"
        max={maxQuantity}
        value={quantity}
        onChange={handleChange}
      />
      <QuantityButton
        onClick={handleIncrease}
        $disabled={quantity >= maxQuantity}
      >
        +
      </QuantityButton>
    </Flex>
  );
}
