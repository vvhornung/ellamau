
import { useRouter } from "next/navigation";
import {
  EmptyCartContainer,
  EmptyCartMessage,
  ContinueShoppingButton,
} from "./styles/EmptyCart.styled";

export default function EmptyCart() {
  const router = useRouter();

  const handleContinueShopping = () => {
    router.push("/");
  };

  return (
    <EmptyCartContainer>
      <EmptyCartMessage>
        Your cart is empty. Add some products to get started!
      </EmptyCartMessage>
      <ContinueShoppingButton onClick={handleContinueShopping}>
        Continue Shopping
      </ContinueShoppingButton>
    </EmptyCartContainer>
  );
}
