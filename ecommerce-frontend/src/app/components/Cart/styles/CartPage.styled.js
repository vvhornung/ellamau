import styled from "styled-components";

export const CartContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 0;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const CartTitle = styled.h1`
  font-size: 28px;
  font-weight: 600;
  margin: 0;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;

  p {
    font-size: 20px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.422);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const CartLayout = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const CartItemsSection = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.223);
  border-radius: 0.2rem;
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.107);
  padding: 2rem 3rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  hr {
    border: 1px solid #eaeaea; /* Set the border color */
    margin: 20px 0; /* Optional: Add some margin for spacing */
    width: 100%; /* Optional: Set the width to 100% */
    background-color: transparent; /* Ensure background is transparent */
  }
`;

export const CartSummarySection = styled.div``;
