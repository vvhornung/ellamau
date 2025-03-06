import styled from "styled-components";

export const CartContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
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

  span {
    font-size: 20px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.422);
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
`;

export const CartSummarySection = styled.div``;
