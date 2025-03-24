"use client";
import React, { useEffect, useState, useContext } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import convertToSubCurrency from "@/app/lib/convertToSubCurrency";
import { CheckoutButton } from "../Cart/styles/CartSummary.styled";
import CheckoutModal from "./CheckoutModal";
import ErrorModal from "./ErrorModal";
import styled from "styled-components";
import { CartContext } from "@/app/contexts/CartContext";

// Add some styling to make the payment element look better
const PaymentContainer = styled.div`
  margin-bottom: 20px;

  & .StripeElement {
    margin-bottom: 16px;
  }
`;

const ProcessingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;

  div {
    background: white;
    padding: 20px 40px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    font-weight: bold;
  }
`;

const CheckoutPage = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { clearCart, cart } = useContext(CartContext);

  const [errorMessage, setErrorMessage] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);

  // Modal states
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [orderData, setOrderData] = useState(null);

  console.log(cart);

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const response = await fetch("/api/create-payment-intent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: convertToSubCurrency(amount) }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    fetchClientSecret();
  }, [amount]);

  // Show error modal when error message changes
  useEffect(() => {
    if (errorMessage) {
      setIsErrorModalOpen(true);
    }
  }, [errorMessage]);

  const handleSubmit = async (event, directOrderData = null) => {
    if (event) event.preventDefault();
    setLoading(true);
    setProcessing(true);

    if (!stripe || !elements) {
      setErrorMessage(
        "Payment processing is not available. Please try again later."
      );
      setLoading(false);
      setProcessing(false);
      return;
    }

    try {
      const { error: submitError } = await elements.submit();

      if (submitError) {
        setErrorMessage(submitError.message);
        setLoading(false);
        setProcessing(false);
        return;
      }

      // Use directly passed data or fall back to state
      const currentOrderData = directOrderData || orderData;

      if (!currentOrderData) {
        setErrorMessage("Order information is missing. Please try again.");
        setLoading(false);
        setProcessing(false);
        return;
      }

      // Format cart items to match the LineItemSchema structure
      const formattedLineItems =
        cart?.map((item) => ({
          productId: item.product._id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          variant: {
            color: item.variant?.color,
            size: item.variant?.size,
          },
          image: item.product.images?.[0],
        })) || [];

      // Add line_items to the order data
      const orderWithItems = {
        ...currentOrderData,
        line_items: formattedLineItems,
        paid: false,
      };

      // Create an order in your database before payment
      const orderResponse = await fetch("/api/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderWithItems),
      });

      if (!orderResponse.ok) {
        throw new Error("Failed to create order");
      }

      const { orderId } = await orderResponse.json();

      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/success?order_id=${orderId}`,
          receipt_email: currentOrderData?.email,
          payment_method_data: {
            billing_details: {
              name: currentOrderData?.name,
              email: currentOrderData?.email,
              address: { ...currentOrderData?.address },
              phone: currentOrderData?.phone,
            },
          },
        },
      });

      if (error) {
        setErrorMessage(error.message);
        setLoading(false);
        setProcessing(false);
        setIsErrorModalOpen(true);
        return;
      }

      // If we get here without redirect, it's likely because of manual confirmation
      if (paymentIntent && paymentIntent.status === "succeeded") {
        // Update the order in your database as paid
        await fetch(`/api/update-order?id=${orderId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ paid: true }),
        });

        // Clear the cart and redirect to success page
        clearCart();
        window.location.href = `/success?order_id=${orderId}`;
      }
    } catch (err) {
            setIsErrorModalOpen(true);
      setErrorMessage(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
      setProcessing(false);
    }
  };

  const handleCheckoutClick = () => {
    setIsCheckoutModalOpen(true);
  };

  const handleModalSubmit = (formData) => {
    setOrderData(formData); // Still update state for any future use
    setIsCheckoutModalOpen(false);
    // Pass the form data directly to handleSubmit instead of relying on state updates
    handleSubmit(null, formData);
  };

  return (
    <div>
      <PaymentContainer>
        <PaymentElement />
      </PaymentContainer>

      <CheckoutButton
        onClick={handleCheckoutClick}
        type="button"
        disabled={!stripe || loading}
      >
        {loading ? "Processing..." : `Checkout - $${amount}`}
      </CheckoutButton>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        onSubmit={handleModalSubmit}
        amount={amount}
      />

      {/* Error Modal */}
      <ErrorModal
        isOpen={isErrorModalOpen}
        onClose={() => setIsErrorModalOpen(false)}
        errorMessage={errorMessage}
      />

      {/* Processing Overlay */}
      {processing && (
        <ProcessingOverlay>
          <div>Processing your payment...</div>
        </ProcessingOverlay>
      )}
    </div>
  );
};

export default CheckoutPage;
