
import { useContext, useState } from "react";
import { CartContext } from "@/app/contexts/CartContext";
import CheckoutPage from "../Checkout/CheckoutPage";
import {
  SummaryContainer,
  SummaryRow,
  CheckoutButton,
} from "./styles/CartSummary.styled";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import convertToSubCurrency from "@/app/lib/convertToSubCurrency";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function CartSummary() {
  const { cart } = useContext(CartContext);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => {
    return sum + item.product.price * item.quantity;
  }, 0);

  const shippingCost = subtotal > 100 ? 0 : 10; // Free shipping over $100
  const tax = subtotal * 0.19; // 19% tax rate
  const total = subtotal + shippingCost + tax;

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Here you would typically redirect to a checkout page or process
    // For now, just simulate with a timeout
    setTimeout(() => {
      alert("Checkout functionality would go here!");
      setIsCheckingOut(false);
    }, 1000);
  };

  return (
    <SummaryContainer>
      <SummaryRow $withBorder>
        <h2>Order Summary</h2>
      </SummaryRow>
      <SummaryRow>
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </SummaryRow>
      <SummaryRow>
        <span>Shipping</span>
        <span>
          {shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}
        </span>
      </SummaryRow>
      <SummaryRow $withBorder>
        <span>Tax (19%)</span>
        <span>${tax.toFixed(2)}</span>
      </SummaryRow>
      <SummaryRow $bold $large>
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </SummaryRow>

      <SummaryRow $withBorder>
        <h2>Payment Method</h2>
      </SummaryRow>
      <SummaryRow>
        <Elements
          stripe={stripePromise}
          options={{
            mode: "payment",
            amount: convertToSubCurrency(total),
            currency: "usd",
          }}
        >
          <CheckoutPage amount={(total)} />
        </Elements>
      </SummaryRow>

    </SummaryContainer>
  );
}
