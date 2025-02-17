"use client";
import styled from "styled-components";

const StyledButton = styled.button`
  background: #000;
  color: #fff;
  padding: 1rem 2rem;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  width: 100%;
  margin-top: 1rem;

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

export default function AddToCartButton({ onClick, disabled }) {
  return (
    <StyledButton onClick={onClick} disabled={disabled}>
      Add to Cart
    </StyledButton>
  );
}
